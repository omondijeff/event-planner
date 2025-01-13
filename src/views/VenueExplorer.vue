<template>
  <div class="container py-8 mx-auto">
    <div class="space-y-6">
      <!-- Filters Section -->
      <div class="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name or location"
          class="w-full px-4 py-2 border rounded-md md:w-1/3"
        />
        <select
          v-model="selectedCapacity"
          class="w-full px-4 py-2 border rounded-md md:w-1/4"
        >
          <option value="">All Capacities</option>
          <option v-for="cap in capacities" :key="cap" :value="cap">{{ cap }}</option>
        </select>
        <select
          v-model="selectedLocation"
          class="w-full px-4 py-2 border rounded-md md:w-1/4"
        >
          <option value="">All Locations</option>
          <option v-for="loc in locations" :key="loc" :value="loc">{{ loc }}</option>
        </select>
        <select
          v-model="selectedService"
          class="w-full px-4 py-2 border rounded-md md:w-1/4"
        >
          <option value="">All Services</option>
          <option v-for="service in services" :key="service" :value="service">{{ service }}</option>
        </select>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center">Loading venues...</div>

      <!-- Error State -->
      <div v-if="error" class="text-red-500">{{ error }}</div>

      <!-- Venues Section -->
      <div v-if="!loading && !error" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="venue in filteredVenues"
          :key="venue.id"
          class="p-4 space-y-4 transition border rounded-md shadow hover:shadow-lg"
        >
          <h2 class="text-xl font-semibold">{{ venue.name }}</h2>
          <p class="text-gray-500">{{ venue.description }}</p>
          <p><strong>Capacity:</strong> {{ venue.capacity }}</p>
          <p><strong>Location:</strong> {{ venue.location }}</p>
          <p><strong>Price Range:</strong> ${{ venue.price_range }}</p>

          <div class="space-y-2">
            <img
              v-for="url in venue.images"
              :src="url"
              :key="url"
              alt="Venue Image"
              class="object-cover w-full h-40 rounded"
            />
          </div>

          <h3 class="text-lg font-medium">Floor Plans</h3>
          <div class="space-y-2">
            <img
              v-for="url in venue.floor_plan_url"
              :src="url"
              :key="url"
              alt="Floor Plan"
              class="object-cover w-full h-40 rounded"
            />
          </div>
        </div>
      </div>
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
const selectedService = ref<string | null>(null);
const error = ref<string | null>(null);

// Extract data and methods from venue store
const { venues, fetchAllVenues, loading } = venueStore;
const { user, isAuthenticated, profile } = authStore;

// Static Options
const capacities = ref([100, 200, 300, 400, 500]); // Example capacity options
const locations = ref(['Location1', 'Location2', 'Location3']); // Example locations
const services = ref(['Service1', 'Service2', 'Service3']); // Example services


// Load Venues
const loadVenues = async () => {
  try {
    console.log("Loading venues...");
    if (isAuthenticated && canManageVenues.value) {
      await fetchAllVenues(); // Fetch all venues
    }
  } catch (err) {
    console.error('Error fetching venues:', err);
    error.value = 'Unable to fetch venues. Please try again later.';
  }
};


// Filters & Search Logic
const filteredVenues = computed(() => {
  console.log("Filtering venues...");
  console.log("Search Query:", searchQuery.value);
  console.log("Selected Capacity:", selectedCapacity.value);
  console.log("Selected Location:", selectedLocation.value);
  console.log("Selected Service:", selectedService.value);

  // Add a check to make sure venues is not undefined or null
  const venueList = venues.value || [];
  
  return venueList.filter((venue) => {
    const matchesQuery = venue.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          venue.location.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCapacity = !selectedCapacity.value || venue.capacity === Number(selectedCapacity.value);
    const matchesLocation = !selectedLocation.value || venue.location === selectedLocation.value;
    const matchesService = !selectedService.value || (venue.tags && venue.tags.includes(selectedService.value));
    return matchesQuery && matchesCapacity && matchesLocation && matchesService;
  });
});

// Access Control (Only venues managers or authorized roles can manage venues)
const canManageVenues = computed(() => {
  return hasAccess(profile?.user_type, ['venue_manager', 'vendor', 'planner', 'admin']);
});

// Lifecycle Hook
onMounted(() => {
  console.log("Component mounted, loading venues...");
  loadVenues();
});
</script>

