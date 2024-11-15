<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">Manage Your Venues</h1>
  
      <div v-if="loading" class="text-gray-500 flex items-center justify-center">
        <ArrowPathIcon class="w-6 h-6 animate-spin mr-2" />
        <span>Loading venues...</span>
      </div>
  
      <div v-else-if="error" class="text-red-500 text-center">
        <ExclamationCircleIcon class="w-6 h-6 text-red-500 mx-auto mb-2" />
        <p>{{ error }}</p>
      </div>
  
      <div v-else>
        <!-- Venue List -->
        <div v-if="venues.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="venue in venues"
            :key="venue.id"
            class="bg-white shadow rounded-lg p-4"
          >
            <h3 class="text-lg font-semibold text-gray-800">{{ venue.name }}</h3>
            <p class="text-sm text-gray-500">{{ venue.location }}</p>
            <p class="text-sm text-gray-500">Capacity: {{ venue.capacity }}</p>
  
            <div class="mt-4 flex justify-between">
              <button
                @click="editVenue(venue)"
                class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                @click="deleteVenue(venue.id)"
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
  
        <!-- Add Venue Button -->
        <button
          @click="openCreateForm"
          class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Add New Venue
        </button>
  
        <!-- Venue Form -->
        <div v-if="showForm" class="mt-6 bg-white shadow rounded-lg p-6">
          <h2 class="text-xl font-semibold text-gray-800">{{ formData.id ? 'Edit Venue' : 'Add New Venue' }}</h2>
          <form @submit.prevent="saveVenue">
            <div class="mt-4">
              <label for="name" class="block text-sm font-medium text-gray-700">Venue Name</label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div class="mt-4">
              <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
              <input
                id="location"
                v-model="formData.location"
                type="text"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div class="mt-4">
              <label for="capacity" class="block text-sm font-medium text-gray-700">Capacity</label>
              <input
                id="capacity"
                v-model.number="formData.capacity"
                type="number"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div class="mt-6 flex justify-end">
              <button
                type="button"
                @click="closeForm"
                class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useVenueStore } from '@/stores/venue';
  
  // Heroicons
  import { ArrowPathIcon, ExclamationCircleIcon } from '@heroicons/vue/24/solid';
  
  const venueStore = useVenueStore();
  const venues = ref(venueStore.venues);
  const loading = ref(false);
  const error = ref<string | null>(null);
  
  const showForm = ref(false);
  const formData = ref({ id: '', name: '', location: '', capacity: null });
  
  async function fetchVenues() {
    loading.value = true;
    try {
      await venueStore.fetchVenues('manager_id'); // Replace with actual manager ID
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unexpected error occurred';
    } finally {
      loading.value = false;
    }
  }
  
  function openCreateForm() {
    formData.value = { id: '', name: '', location: '', capacity: null };
    showForm.value = true;
  }
  
  function editVenue(venue) {
    formData.value = { ...venue };
    showForm.value = true;
  }
  
  async function saveVenue() {
    if (formData.value.id) {
      await venueStore.updateVenue(formData.value.id, formData.value);
    } else {
      await venueStore.createVenue({ ...formData.value, manager_id: 'manager_id' }); // Replace with manager ID
    }
    showForm.value = false;
  }
  
  async function deleteVenue(venueId) {
    await venueStore.deleteVenue(venueId);
  }
  
  function closeForm() {
    showForm.value = false;
  }
  
  onMounted(fetchVenues);
  </script>
  