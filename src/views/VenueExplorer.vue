<!-- src/views/VenueExplorer.vue -->
<template>
    <div>
      <button @click="openCreateModal" class="button">Add Venue</button>
      <VenueList @edit="openEditModal" @delete="deleteVenue" />
      <CreateVenue v-if="isModalOpen" :venue="selectedVenue" @close="closeModal" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import VenueList from '@/components/venues/VenueList.vue';
  import CreateVenue from '@/components/venues/CreateVenue.vue';
  
  const isModalOpen = ref(false);
  const selectedVenue = ref(null);
  
  // Open modal for creating a new venue
  const openCreateModal = () => {
    selectedVenue.value = null;  // Reset to null for new venue
    isModalOpen.value = true;
  };
  
  // Open modal for editing an existing venue
  const openEditModal = (venue) => {
    selectedVenue.value = venue;
    isModalOpen.value = true;
  };
  
  // Close the modal
  const closeModal = () => {
    isModalOpen.value = false;
  };
  
  // Handle venue deletion (can be passed to VenueList component)
  const deleteVenue = (venueId) => {
    console.log(`Deleted venue with ID: ${venueId}`);
  };
  </script>
  
  <style scoped>
  /* TailwindCSS classes applied in the template */
  </style>
  