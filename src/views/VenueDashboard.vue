<template>
  <div class="p-6">
    <h1 class="mb-4 text-2xl font-bold">Venue Management</h1>

    <!-- Error Message -->
    <div v-if="error" class="p-4 mb-4 text-red-700 bg-red-100 rounded">
      {{ error }}
    </div>

    <!-- Add Venue Button -->
    <button
      v-if="canManageVenues"
      class="px-4 py-2 mb-6 text-white bg-blue-500 rounded"
      @click="openVenueForm"
    >
      Add New Venue
    </button>

    <!-- Unauthorized Message -->
    <div v-else-if="!loading && !canManageVenues" class="text-gray-700">
      You are not authorized to manage venues. Please log in with the appropriate account.
    </div>

    <!-- Venues List -->
    <div v-if="loading" class="text-gray-500">Loading venues...</div>
    <div v-else-if="venues.length === 0 && canManageVenues" class="text-gray-500">
      No venues found. Add a new venue to get started.
    </div>
    <div v-else class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div
        v-for="venue in venues"
        :key="venue.id"
        class="p-4 border rounded shadow"
      >
        <h2 class="text-lg font-bold">{{ venue.name }}</h2>
        <p class="text-gray-700">{{ venue.description || "No description available" }}</p>
        <p class="text-sm text-gray-500">
          Capacity: {{ venue.capacity || "N/A" }} | Size: {{ venue.size || "N/A" }} m²
        </p>
        <p class="text-sm text-gray-500">Price Range: {{ venue.price_range || "N/A" }}</p>
        <p class="text-sm text-gray-500">
          Floor Plan:
          <a
            v-if="venue.floor_plan_url"
            :href="venue.floor_plan_url"
            class="text-blue-500 underline"
            target="_blank"
          >
            View Sketch
          </a>
          <span v-else>No Sketch Uploaded</span>
        </p>

        <div class="flex mt-4 space-x-2">
          <button
            class="px-3 py-1 text-white bg-green-500 rounded"
            @click="editVenue(venue)"
          >
            Edit
          </button>
          <button
            class="px-3 py-1 text-white bg-red-500 rounded"
            @click="deleteVenueHandler(venue.id)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Venue Form Modal -->
    <VenueForm
      v-if="isFormOpen"
      :venue="selectedVenue"
      @close="closeVenueFormAndRefresh"
      @saved="fetchVenuesOnSave"
    />
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted } from "vue";
import { useVenueStore } from "@/stores/venue";
import { useAuthStore } from "@/stores/auth";
import { hasAccess } from "@/utils/accessControl";
import VenueForm from "@/components/venues/VenueForm.vue";

export default {
  components: { VenueForm },
  setup() {
    // Stores
    const venueStore = useVenueStore();
    const authStore = useAuthStore();

    // Extract data and actions from stores
    const { venues, fetchVenues, deleteVenue, loading } = venueStore;
    const { user, isAuthenticated, profile } = authStore;

    // Reactive state for error messages
    const error = ref<string | null>(null);

    // State for managing the modal and selected venue
    const isFormOpen = ref(false);
    const selectedVenue = ref(null);

    // Computed property to determine if the user can manage venues
    const canManageVenues = computed(() => {
      return hasAccess(profile?.user_type, ["venue_manager", "admin"]);
    });

    // Fetch venues when the component is mounted
    const fetchVenuesOnLoad = async () => {
      try {
        if (isAuthenticated && canManageVenues.value) {
          const managerId = profile?.user_type === "venue_manager" ? user?.id : null;
          await fetchVenues(managerId);
        }
      } catch (err) {
        console.error("Error fetching venues:", err);
        error.value = "Unable to fetch venues. Please try again later.";
      }
    };

    // Fetch venues after saving
    const fetchVenuesOnSave = async () => {
      error.value = null;
      try {
        await fetchVenues(profile?.user_type === "venue_manager" ? user?.id : null);
      } catch (err) {
        console.error("Error refreshing venues:", err);
        error.value = "Unable to refresh venues. Please try again later.";
      }
    };

    // Open the form for adding a new venue
    const openVenueForm = () => {
      selectedVenue.value = null;
      isFormOpen.value = true;
    };

    // Open the form for editing an existing venue
    const editVenue = (venue: any) => {
      selectedVenue.value = venue;
      isFormOpen.value = true;
    };

    // Close the form and refresh the venue list
    const closeVenueFormAndRefresh = async () => {
      isFormOpen.value = false;
      selectedVenue.value = null;
      await fetchVenuesOnSave(); // Refresh the view
    };

    // Delete venue with confirmation
    const deleteVenueHandler = async (venueId: string) => {
      const confirmation = confirm("Are you sure you want to delete this venue?");
      if (!confirmation) return;

      error.value = null;
      try {
        await deleteVenue(venueId);
        await fetchVenuesOnSave();
      } catch (err) {
        console.error("Error deleting venue:", err);
        error.value = "Unable to delete venue. Please try again later.";
      }
    };

    // Initialize data on component mount
    onMounted(fetchVenuesOnLoad);

    return {
      // Data and computed properties
      venues,
      user,
      isAuthenticated,
      canManageVenues,
      error,
      loading,
      isFormOpen,
      selectedVenue,

      // Methods
      openVenueForm,
      editVenue,
      deleteVenueHandler,
      closeVenueFormAndRefresh,
      fetchVenuesOnSave,
    };
  },
};
</script>

<style scoped>
/* Add any custom styling here */
</style>
