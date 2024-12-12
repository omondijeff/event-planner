<script setup>
import { ref, watch, defineProps } from 'vue';
import { useVenueStore } from '@/stores/venue';
import { Dialog } from '@headlessui/vue';

const props = defineProps({
  venue: {
    type: Object,
    default: null, // Determines mode: Create (null) or Edit (Object)
  },
  isOpen: {
    type: Boolean,
    required: true,
  },
  onClose: {
    type: Function,
    required: true,
  },
});

// Venue store for managing data
const venueStore = useVenueStore();

// Local state to manage form data
const localVenue = ref({
  name: '',
  description: '',
  capacity: 0,
  location: '',
  amenities: [],
  images: [],
  price_range: 0,
});

// Watch for changes to `venue` prop and reset the local state accordingly
watch(
  () => props.venue,
  (newVenue) => {
    if (newVenue) {
      // Populate local state with venue data for editing
      localVenue.value = { ...newVenue };
    } else {
      // Reset state for creating a new venue
      localVenue.value = {
        name: '',
        description: '',
        capacity: 0,
        location: '',
        amenities: [],
        images: [],
        price_range: 0,
      };
    }
  },
  { immediate: true }
);

// Form submission handler
const submit = async () => {
  try {
    if (props.venue) {
      // Update existing venue
      await venueStore.updateVenue(props.venue.id, localVenue.value);
    } else {
      // Create new venue
      await venueStore.createVenue(localVenue.value);
    }
    props.onClose(); // Close the modal after success
  } catch (error) {
    console.error('Error submitting venue:', error);
  }
};
</script>

<template>
  <Dialog v-if="isOpen" @close="props.onClose" class="fixed inset-0 z-10 overflow-y-auto">
    <template #overlay>
      <div class="fixed inset-0 bg-black bg-opacity-50"></div>
    </template>

    <div class="relative w-full max-w-lg p-6 mx-auto mt-20 bg-white rounded-lg shadow-lg">
      <!-- Modal Title -->
      <h2 class="mb-4 text-lg font-semibold">
        {{ venue ? 'Edit Venue' : 'Create Venue' }}
      </h2>

      <!-- Venue Form -->
      <form @submit.prevent="submit" class="space-y-4">
        <!-- Name Field -->
        <div>
          <label for="name" class="block text-gray-700">Name:</label>
          <input
            id="name"
            v-model="localVenue.name"
            type="text"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <!-- Description Field -->
        <div>
          <label for="description" class="block text-gray-700">Description:</label>
          <textarea
            id="description"
            v-model="localVenue.description"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          ></textarea>
        </div>

        <!-- Capacity Field -->
        <div>
          <label for="capacity" class="block text-gray-700">Capacity:</label>
          <input
            id="capacity"
            v-model.number="localVenue.capacity"
            type="number"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            min="0"
          />
        </div>

        <!-- Location Field -->
        <div>
          <label for="location" class="block text-gray-700">Location:</label>
          <input
            id="location"
            v-model="localVenue.location"
            type="text"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <!-- Submit and Cancel Buttons -->
        <div class="flex justify-end space-x-2">
          <button
            type="submit"
            class="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            {{ venue ? 'Update' : 'Create' }}
          </button>
          <button
            type="button"
            @click="props.onClose"
            class="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </Dialog>
</template>
