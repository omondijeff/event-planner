<template>
  <div class="container mx-auto py-8 px-4">
    <!-- Filters Section -->
    <div class="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row md:items-center gap-4">
      <!-- Search Input -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="🔍 Search venues by name or location..."
        class="w-full md:w-1/3 px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500"
      />

      <!-- Capacity Dropdown with Search -->
      <div class="relative w-full md:w-1/4">
        <input
          v-model="selectedCapacity"
          list="capacity-options"
          type="text"
          placeholder="🔢 Select or enter capacity"
          class="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500"
        />
        <datalist id="capacity-options">
          <option v-for="cap in uniqueCapacities" :key="cap" :value="cap">{{ cap }} Capacity</option>
        </datalist>
      </div>

      <!-- Location Dropdown with Search -->
      <div class="relative w-full md:w-1/4">
        <input
          v-model="selectedLocation"
          list="location-options"
          type="text"
          placeholder="📍 Select or enter location"
          class="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500"
        />
        <datalist id="location-options">
          <option v-for="loc in uniqueLocations" :key="loc" :value="loc">{{ loc }} Location</option>
        </datalist>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading && currentPage === 1" class="text-center py-4 text-blue-500">Loading venues...</div>

    <!-- Error State -->
    <div v-if="error" class="text-red-500 text-center py-4">{{ error }}</div>

    <!-- Venues Section -->
    <div v-if="!loading && !error" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
      <div
        v-for="venue in filteredVenues"
        :key="venue.id"
        @click="openModal(venue)"
        class="p-6 transition duration-300 ease-in-out transform border rounded-lg shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer"
      >
        <div class="space-y-4">
          <h2 class="text-xl font-semibold text-gray-800 transition duration-200 hover:text-blue-600">
            {{ venue.name }}
          </h2>
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

     <!-- Venue Partials Modal -->
     <VenuePartials v-if="selectedVenue" :venue="selectedVenue" @close="closeModal" />
    

    <!-- Infinite Scroll Sentinel -->
    <div id="scroll-sentinel" class="h-10"></div>

    <!-- Loading more indicator -->
    <div v-if="loading && currentPage > 1" class="text-center py-4 text-blue-500">Loading more venues...</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { useExplorerStore } from '@/stores/explorer';
import VenuePartials from '@/components/VenuePartials.vue';

const venueStore = useExplorerStore();

const searchQuery = ref('');
const selectedCapacity = ref<string | null>(null);
const selectedLocation = ref<string | null>(null);
  const selectedVenue = ref<any | null>(null);

const venues = computed(() => venueStore.venues);
const loading = computed(() => venueStore.loading);
const error = computed(() => venueStore.error);

const currentPage = computed(() => venueStore.currentPage);
const venuesPerPage = computed(() => venueStore.venuesPerPage);
const totalVenues = computed(() => venueStore.totalVenues);

const observer = ref<IntersectionObserver | null>(null);


// Get unique capacities & locations for dropdowns
const uniqueCapacities = computed(() => [...new Set(venues.value.map(venue => venue.capacity))].sort((a, b) => a - b));
const uniqueLocations = computed(() => [...new Set(venues.value.map(venue => venue.location))].sort());


// Computed property for filtering venues
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

// Fetch first page on mount
onMounted(async () => {
  // Always start from the first page on a full refresh
  if (!performance.navigation.type || performance.navigation.type === 1) {
    sessionStorage.removeItem("lastPage");
    sessionStorage.removeItem("scrollPosition");
  }

  // Always start at page 1 on refresh
  await venueStore.fetchVenuesPage(1, venuesPerPage.value);

  // Restore scroll position only if it was saved (e.g., after navigation, but not a full refresh)
  nextTick(() => {
    const savedScroll = sessionStorage.getItem("scrollPosition");
    if (savedScroll) {
      window.scrollTo(0, parseInt(savedScroll, 10));
    }
  });

  observeScroll();
});


onUnmounted(() => {
  if (performance.navigation.type !== 1) {
    sessionStorage.setItem("scrollPosition", window.scrollY.toString());
    sessionStorage.setItem("lastPage", currentPage.value.toString());
  }

  observer.value?.disconnect();
});



// Load More Venues when sentinel is visible
const loadMoreVenues = async () => {
  if (currentPage.value * venuesPerPage.value >= totalVenues.value || loading.value) {
    return;
  }

  await venueStore.fetchVenuesPage(currentPage.value + 1, venuesPerPage.value);
};

// Setup IntersectionObserver
const observeScroll = () => {
  nextTick(() => {
    const sentinel = document.getElementById("scroll-sentinel");
    if (!sentinel) {
      console.warn("Sentinel not found!");
      return;
    }

    // Disconnect any existing observer before creating a new one
    if (observer.value) {
      observer.value.disconnect();
    }

    observer.value = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMoreVenues();
        }
      },
      { rootMargin: "300px" } // Adjust for earlier loading
    );

    observer.value.observe(sentinel);
  });
};

const openModal = (venue: any) => {
  selectedVenue.value = venue;
};

const closeModal = () => {
  selectedVenue.value = null;
};

</script>


<style scoped>
/* Custom styles for better UI */
input, select {
  transition: all 0.3s ease-in-out;
}
input:focus, select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.5);
}
.container {
  max-width: 4000px;
}
</style>