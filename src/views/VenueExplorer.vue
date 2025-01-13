<template>
  <div class="container py-8 mx-auto">
    <div class="space-y-6">
      <!-- Filters Section -->
       <!-- Search Filter -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search venues by name or location"
        class="w-full px-4 py-2 border rounded-md md:w-1/3"
      />

      <!-- Capacity Filter -->
      <select
        v-model="selectedCapacity"
        class="w-full px-4 py-2 border rounded-md md:w-1/4"
      >
        <option value="">All Capacities</option>
        <option v-for="cap in capacities" :key="cap" :value="cap">{{ cap }} Capacity</option>
      </select>

      <!-- Location Filter -->
      <select
        v-model="selectedLocation"
        class="w-full px-4 py-2 border rounded-md md:w-1/4"
      >
        <option value="">All Locations</option>
        <option v-for="loc in locations" :key="loc" :value="loc">{{ loc }} Location</option>
      </select>
    </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center">Loading venues...</div>

      <!-- Error State -->
      <div v-if="error" class="text-red-500">{{ error }}</div>

      <!-- Venues Section -->
      <div v-if="!loading && !error" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div
          v-for="venue in filteredVenues"
          :key="venue.id"
          class="p-6 transition duration-300 ease-in-out transform border rounded-lg shadow-lg hover:shadow-xl hover:scale-105"
        >
          <div class="space-y-4">
            <!-- Venue Name -->
            <h2 class="text-xl font-semibold text-gray-800 transition duration-200 hover:text-blue-600">{{ venue.name }}</h2>
            <!-- Venue Description -->
            <p class="text-sm text-gray-600">{{ venue.description }}</p>
            <!-- Venue Info -->
            <div class="flex justify-between text-sm text-gray-500">
              <p><strong>Capacity:</strong> {{ venue.capacity }}</p>
              <p><strong>Location:</strong> {{ venue.location }}</p>
              <p><strong>Price:</strong> ${{ venue.price_range }}</p>
            </div>
            
            <!-- Venue Images -->
            <div class="space-y-2">
              <img
                v-for="url in venue.images"
                :src="url"
                :key="url"
                alt="Venue Image"
                class="object-cover w-full h-40 rounded-md"
              />
            </div>

            <!-- Floor Plans -->
            <h3 class="text-lg font-medium text-gray-800">Floor Plans</h3>
            <div class="space-y-2">
              <img
                v-for="url in venue.floor_plan_url"
                :src="url"
                :key="url"
                alt="Floor Plan"
                class="object-cover w-full h-40 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>

    <!-- Pagination Section -->
    <div v-if="!loading && !error && venues.length > 0" class="flex justify-center py-4 space-x-4">
      <button
        @click="loadMoreVenues"
        class="px-6 py-2 text-white transition duration-300 bg-blue-500 rounded-full shadow-md hover:bg-blue-600"
      >
        Load More
      </button>
    </div>

    </div>

</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useExplorerStore } from '@/stores/explorer'; // Import your store
import { useAuthStore } from '@/stores/auth'; // Import your auth store
import { hasAccess } from '@/utils/accessControl'; // Utility for access control

// Stores
const venueStore = useExplorerStore();
const authStore = useAuthStore();



// Reactive State
const searchQuery = ref('');
const selectedCapacity = ref<string | null>(null);
const selectedLocation = ref<string | null>(null);
// Access reactive state directly from the store
const venues = computed(() => venueStore.venues); // Reactive venues
const loading = computed(() => venueStore.loading); // Loading indicator
const error = computed(() => venueStore.error); // Error state

// Pagination State
const currentPage = ref(1);
const venuesPerPage = 10; // Number of venues to fetch per page


const { user, isAuthenticated, profile } = authStore;

// Static Options
const capacities = ref([100, 200, 300, 400, 500]); // Example capacity options
const locations = ref(['Location1', 'Location2', 'Location3']); // Example locations

// Fetch All Venues on Initial Load
const loadVenues = async () => {
  try {
    console.log('Starting to fetch venues...');
    await venueStore.fetchAllVenues(); // Fetch venues via store
    console.log('Fetched venues:', venues.value);
  } catch (err) {
    console.error('Error fetching venues:', err);
  }
};

// const loadMoreVenues = async () => {
//   currentPage.value += 1; // Increment current page
//   console.log(`Attempting to fetch venues for page ${currentPage.value}...`); // Log the page being fetched
  
//   try {
//     console.log("venues before fetching more:", venueStore.venues.value); // Check if venues is an array before fetching

//     // Fetch new venues for the next page
//     const newVenues = await venueStore.fetchVenuesPage(currentPage.value, venuesPerPage);
//     console.log(`Fetched ${newVenues.length} more venues.`); // Check how many venues were fetched

//     // Ensure venues is always an array before appending
//     console.log("Old venues before update:", venueStore.venues.value); // Log existing venues before appending new ones
    
//     // Check if venueStore.venues.value is an array before updating
//     if (Array.isArray(venueStore.venues.value)) {
//       // Append new venues to the existing list
//       venueStore.venues.value = [...venueStore.venues.value, ...newVenues]; // Dynamically update the venue list
//       console.log("New venues after update:", venueStore.venues.value); // Log the new venue list after update
//       console.log("Transformed data for new venues:", newVenues); // Check the new venues before appending

//     } else {
//       console.error("venues.value is not an array"); // Log an error if venues is not an array
//     }
//   } catch (err) {
//     console.error('Error fetching more venues:', err); // Log any errors encountered during the fetch
//   }
// };
const loadMoreVenues = async () => {
  currentPage.value += 1; // Increment current page
  console.log(`Attempting to fetch venues for page ${currentPage.value}...`);

  try {
    console.log("venues before fetching more:", venueStore.venues.value); // Check if venues is an array before fetching

    if (!Array.isArray(venueStore.venues.value)) {
      console.error("venues.value is not an array, initializing to an empty array");
      venueStore.venues.value = []; // Ensure venues is initialized as an empty array if undefined
    }

    // Fetch new venues for the next page
    const newVenues = await venueStore.fetchVenuesPage(currentPage.value, venuesPerPage);
    console.log(`Fetched ${newVenues.length} more venues.`);

    venueStore.venues.value = [...venueStore.venues.value, ...newVenues]; // Append new venues to the existing list
    console.log("New venues after update:", venueStore.venues.value);

  } catch (err) {
    console.error("Error fetching more venues:", err);
  }
};





// Filters & Search Logic
const filteredVenues = computed(() => {
  console.log("Filtering venues...");
  console.log("Search Query:", searchQuery.value);
  console.log("Selected Capacity:", selectedCapacity.value);
  console.log("Selected Location:", selectedLocation.value);
  console.log("Current venues list before filtering...", venues.value);

  const venueList = venues.value || [];

  return venueList.filter((venue) => {
    const matchesQuery = venue.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          venue.location.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          venue.description.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCapacity = !selectedCapacity.value || venue.capacity === Number(selectedCapacity.value);
    const matchesLocation = !selectedLocation.value || venue.location === selectedLocation.value;
    return matchesQuery && matchesCapacity && matchesLocation;
  });
});

// Access Control (Only venues managers or authorized roles can manage venues)
const canManageVenues = computed(() => {
  return hasAccess(profile?.user_type, ['venue_manager', 'vendor', 'planner', 'admin']);
});

// Lifecycle Hook
onMounted(() => {
  venueStore.fetchAllVenues();
  console.log("Initial venues data on mount:", venueStore.venues.value);
});
</script>

