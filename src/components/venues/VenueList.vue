<script setup>
import { ref, onMounted } from 'vue';
import { useVenueStore } from '@/stores/venue';
import CreateVenue from './CreateVenue.vue';
import { useToast } from 'vue-toastification'; // For notifications

const venueStore = useVenueStore();
const toast = useToast();
const selectedVenue = ref(null); // Used for both create and edit modes
const isModalOpen = ref(false); // Controls modal visibility

// Fetch all venues on component mount
onMounted(async () => {
  try {
    await venueStore.fetchVenues();
  } catch (error) {
    toast.error('Failed to load venues.');
  }
});

// Open modal for editing a venue
const openEditModal = (venue) => {
  selectedVenue.value = venue;
  isModalOpen.value = true;
};

// Open modal for creating a new venue
const openCreateModal = () => {
  selectedVenue.value = null;
  isModalOpen.value = true;
};

// Delete a venue with confirmation
const deleteVenue = async (venueId) => {
  if (confirm('Are you sure you want to delete this venue?')) {
    try {
      await venueStore.deleteVenue(venueId);
      toast.success('Venue deleted successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete venue. Please try again.');
    }
  }
};
</script>

<template>
  <div>
    <h1 class="mb-4 text-xl font-bold">Venues</h1>
    <button @click="openCreateModal" class="px-4 py-2 mb-4 text-white bg-green-500 rounded">
      Create Venue
    </button>

    <table class="w-full border border-collapse border-gray-300 table-auto">
      <thead>
        <tr class="bg-gray-100">
          <th class="px-4 py-2 border border-gray-300">Name</th>
          <th class="px-4 py-2 border border-gray-300">Capacity</th>
          <th class="px-4 py-2 border border-gray-300">Location</th>
          <th class="px-4 py-2 border border-gray-300">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="venue in venueStore.venues" :key="venue.id">
          <td class="px-4 py-2 border border-gray-300">{{ venue.name }}</td>
          <td class="px-4 py-2 border border-gray-300">{{ venue.capacity }}</td>
          <td class="px-4 py-2 border border-gray-300">{{ venue.location }}</td>
          <td class="px-4 py-2 border border-gray-300">
            <button @click="openEditModal(venue)" class="text-blue-500 underline">Edit</button>
            <button @click="deleteVenue(venue.id)" class="ml-2 text-red-500 underline">Delete</button>
          </td>
        </tr>
        <tr v-if="!venueStore.venues.length">
          <td colspan="4" class="px-4 py-2 text-center text-gray-500">
            No venues found.
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Create/Edit Modal -->
    <CreateVenue
      :venue="selectedVenue"
      :isOpen="isModalOpen"
      @onClose="isModalOpen = false"
      @refresh="venueStore.fetchVenues()"
    />
  </div>
</template>
