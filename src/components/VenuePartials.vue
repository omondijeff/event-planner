<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 relative">
        <!-- Close Button -->
        <button @click="closeModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          &times;
        </button>
  
        <!-- Toggle Between Venue Images & Floor Plans -->
        <div class="flex justify-between items-center mb-4">
          <button
            @click="viewMode = 'venue'"
            :class="['px-4 py-2 rounded-md', viewMode === 'venue' ? 'bg-blue-500 text-white' : 'bg-gray-200']"
          >
            Venue Images
          </button>
          <button
            @click="viewMode = 'floorPlan'"
            :class="['px-4 py-2 rounded-md', viewMode === 'floorPlan' ? 'bg-blue-500 text-white' : 'bg-gray-200']"
          >
            Floor Plans
          </button>
        </div>
  
        <!-- Main Image Display -->
        <div class="relative">
          <img :src="mainImage" alt="Venue Image" class="w-full h-96 object-cover rounded-lg" />
          <!-- Navigation Arrows -->
          <button @click="prevImage" class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
            &larr;
          </button>
          <button @click="nextImage" class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
            &rarr;
          </button>
        </div>
  
        <!-- Thumbnail Navigation -->
        <div class="flex space-x-2 mt-4 overflow-x-auto">
          <img
            v-for="(image, index) in currentImages"
            :key="index"
            :src="image"
            @click="setMainImage(image)"
            :class="['w-20 h-20 object-cover rounded-lg cursor-pointer', mainImage === image ? 'border-2 border-blue-500' : '']"
          />
        </div>
  
        <!-- Venue Details -->
        <div class="mt-6">
          <h2 class="text-2xl font-semibold">{{ venue.name }}</h2>
          <p class="text-gray-600">{{ venue.description }}</p>
          <div class="mt-4 space-y-2">
            <p><strong>Capacity:</strong> {{ venue.capacity }}</p>
            <p><strong>Location:</strong> {{ venue.location }}</p>
            <p><strong>Price:</strong> ${{ venue.price_range }}</p>
          </div>
        </div>
  
        <!-- Book Venue Button -->
        <button @click="bookVenue" class="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          Book Venue
        </button>
  
        <!-- Similar Venues Section -->
        <div class="mt-6">
          <h3 class="text-xl font-semibold">Similar Venues</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <div v-for="similarVenue in similarVenues" :key="similarVenue.id" class="p-4 border rounded-lg">
              <h4 class="text-lg font-semibold">{{ similarVenue.name }}</h4>
              <p class="text-sm text-gray-600">{{ similarVenue.description }}</p>
              <p class="text-sm text-gray-500"><strong>Price:</strong> ${{ similarVenue.price_range }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { useExplorerStore } from '@/stores/explorer';
  import { constructCloudinaryUrl } from "@/utils/cloudinary"; // ✅ Import utility function
  
  const props = defineProps({
    venue: {
      type: Object,
      required: true,
    },
  });
  
  const emit = defineEmits(['close']);
  const explorerStore = useExplorerStore();
  
  // Toggle between venue images and floor plans
  const viewMode = ref<'venue' | 'floorPlan'>('venue');
  


  
  // Extract venue images and floor plans
  const venueImages = computed(() => (props.venue.images || []).map(constructCloudinaryUrl));
const floorPlans = computed(() => (props.venue.floor_plan_url || []).map(constructCloudinaryUrl));

  
  // Determine current images based on the selected mode
  const currentImages = computed(() => (viewMode.value === 'venue' ? venueImages.value : floorPlans.value));
  
  // Set default main image
  const mainImage = ref(currentImages.value[0] || '');
  
  // Update main image based on selection
  const setMainImage = (image: string) => {
    mainImage.value = image;
  };
  
  // Navigate images
  const prevImage = () => {
    const currentIndex = currentImages.value.indexOf(mainImage.value);
    const prevIndex = (currentIndex - 1 + currentImages.value.length) % currentImages.value.length;
    mainImage.value = currentImages.value[prevIndex];
  };
  
  const nextImage = () => {
    const currentIndex = currentImages.value.indexOf(mainImage.value);
    const nextIndex = (currentIndex + 1) % currentImages.value.length;
    mainImage.value = currentImages.value[nextIndex];
  };
  
  // Close modal
  const closeModal = () => {
    emit('close');
  };
  
  // Booking logic
  const bookVenue = () => {
    alert(`Booking ${props.venue.name}`);
  };
  
  // Similar venues logic
  const similarVenues = computed(() => {
    return explorerStore.venues.filter(
      (v) =>
        v.id !== props.venue.id &&
        (v.location === props.venue.location || v.capacity === props.venue.capacity)
    );
  });
  </script>
  
  <style scoped>
  /* Additional Styling */
  </style>
  