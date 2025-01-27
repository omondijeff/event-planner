<template>
  <div class="container py-8 mx-auto">
    <div class="space-y-6">
      <!-- Filters Section -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search venues by name or location"
        class="w-full px-4 py-2 border rounded-md md:w-1/3"
      />
      <select
        v-model="selectedCapacity"
        class="w-full px-4 py-2 border rounded-md md:w-1/4"
      >
        <option value="">All Capacities</option>
        <option v-for="cap in capacities" :key="cap" :value="cap">{{ cap }} Capacity</option>
      </select>
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
          <h2 class="text-xl font-semibold text-gray-800 transition duration-200 hover:text-blue-600">{{ venue.name }}</h2>
          <p class="text-sm text-gray-600">{{ venue.description }}</p>
          <div class="flex justify-between text-sm text-gray-500">
            <p><strong>Capacity:</strong> {{ venue.capacity }}</p>
            <p><strong>Location:</strong> {{ venue.location }}</p>
            <p><strong>Price:</strong> ${{ venue.price_range }}</p>
          </div>
          <!-- Images Section (Thumbnails) -->
          <div class="space-y-2">
            <img
            v-for="url in venue.images" 
              :src="url"
              :key="url"
              alt="Venue Image"
              class="object-cover w-full h-40 rounded-md"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination Section -->
    <div v-if="!loading && !error && venues.length < totalVenues" class="flex justify-center py-4 space-x-4">
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

const venueStore = useExplorerStore();
const authStore = useAuthStore();

const searchQuery = ref('');
const selectedCapacity = ref<string | null>(null);
const selectedLocation = ref<string | null>(null);
const venues = computed(() => venueStore.venues);
const loading = computed(() => venueStore.loading);
const error = computed(() => venueStore.error);

const currentPage = computed(() => venueStore.currentPage);
const venuesPerPage = computed(() => venueStore.venuesPerPage);
const totalVenues = computed(() => venueStore.totalVenues);

// Filters & Search Logic
const filteredVenues = computed(() => {
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

// Load Venues on Initial Load
onMounted(() => {
  venueStore.fetchVenuesPage(1, venuesPerPage.value); // Fetch the first page of venues
});

// Load More Venues for Pagination
const loadMoreVenues = async () => {
  if (currentPage.value * venuesPerPage.value < totalVenues.value) {
    await venueStore.fetchVenuesPage(currentPage.value + 1, venuesPerPage.value);
  }
};
</script>
