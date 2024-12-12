<template>
    <div class="p-6">
      <h1 class="mb-4 text-2xl font-bold text-gray-900">Manage Your Venues</h1>
  
      <div v-if="loading" class="flex items-center justify-center text-gray-500">
        <ArrowPathIcon class="w-6 h-6 mr-2 animate-spin" />
        <span>Loading venues...</span>
      </div>
  
      <div v-else-if="error" class="text-center text-red-500">
        <ExclamationCircleIcon class="w-6 h-6 mx-auto mb-2 text-red-500" />
        <p>{{ error }}</p>
      </div>
  
      <div v-else>
        <!-- Venue List -->
        <div v-if="venues.length" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="venue in venues"
            :key="venue.id"
            class="p-4 bg-white rounded-lg shadow"
          >
            <h3 class="text-lg font-semibold text-gray-800">{{ venue.name }}</h3>
            <p class="text-sm text-gray-500">{{ venue.location }}</p>
            <p class="text-sm text-gray-500">Capacity: {{ venue.capacity }}</p>
  
            <div class="flex justify-between mt-4">
              <button
                @click="editVenue(venue)"
                class="px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                @click="deleteVenue(venue.id)"
                class="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
  
        <!-- Add Venue Button -->
        <button
          @click="openCreateForm"
          class="px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700"
        >
          Add New Venue
        </button>
  
        <!-- Venue Form -->
        <div v-if="showForm" class="p-6 mt-6 bg-white rounded-lg shadow">
          <h2 class="text-xl font-semibold text-gray-800">{{ formData.id ? 'Edit Venue' : 'Add New Venue' }}</h2>
          <form @submit.prevent="saveVenue">
            <div class="mt-4">
              <label for="name" class="block text-sm font-medium text-gray-700">Venue Name</label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                required
                class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
              />
            </div>
            <div class="mt-4">
              <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
              <input
                id="location"
                v-model="formData.location"
                type="text"
                required
                class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
              />
            </div>
            <div class="mt-4">
              <label for="capacity" class="block text-sm font-medium text-gray-700">Capacity</label>
              <input
                id="capacity"
                v-model.number="formData.capacity"
                type="number"
                required
                class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
              />
            </div>
            <div class="flex justify-end mt-6">
              <button
                type="button"
                @click="closeForm"
                class="px-4 py-2 mr-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
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
  import { ref, watch, onMounted } from 'vue';
  import { useVenueStore } from '@/stores/venue';
  import { useAuthStore } from '@/stores/auth';
  import { v4 as uuidv4 } from 'uuid';
  
  // Heroicons
  import { ArrowPathIcon, ExclamationCircleIcon } from '@heroicons/vue/24/solid';
  
  const authStore = useAuthStore();
  const venueStore = useVenueStore();
  
  // const venues = ref(venueStore.venues);ßß
  const venues = ref([]); 
  const loading = ref(false);
  const error = ref<string | null>(null);
  
  
  const showForm = ref(false);
  const formData = ref({ id: '', name: '', location: '', capacity: null });
  
  async function fetchVenues() {
  loading.value = true;
  try {
    const managerId = authStore.user?.id;
    if (!managerId) throw new Error("Manager ID not found");
    await venueStore.fetchVenues(managerId);
  } catch (err) {
    error.value = err instanceof Error ? err.message : "An unexpected error occurred";
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
  
 

//   async function saveVenue() {
//   const managerId = authStore.user?.id;

//   if (formData.value.id) {
//     await venueStore.updateVenue(formData.value.id, formData.value);
//   } else {
//     formData.value.id = uuidv4();  // Generate UUID
//     await venueStore.createVenue({ ...formData.value, manager_id: managerId });
//   }
//   showForm.value = false;
// }
async function saveVenue() {
  const managerId = authStore.user?.id;

  if (!managerId) {
    alert("Manager ID is required.");
    return;
  }

  if (!formData.value.name || !formData.value.location || formData.value.capacity == null) {
    alert("All fields are required.");
    return;
  }

  if (formData.value.id) {
    await venueStore.updateVenue(formData.value.id, formData.value);
  } else {
    formData.value.id = uuidv4();  // Generate UUID
    await venueStore.createVenue({ ...formData.value, manager_id: managerId });
  }
  showForm.value = false;
}


  // async function deleteVenue(venueId) {
  //   await venueStore.deleteVenue(venueId);
  // }
  

  async function deleteVenue(venueId) {
  try {
    if (confirm("Are you sure you want to delete this venue?")) {
      await venueStore.deleteVenue(venueId);
      fetchVenues(); // Refresh the list
    }
  } catch (err) {
    alert("Failed to delete venue: " + err.message);
  }
}

  function closeForm() {
    showForm.value = false;
  }
  
  onMounted(async () => {
  await fetchVenues();
  venues.value = venueStore.venues; // Update the reactive reference after fetching
});
watch(() => venueStore.venues, (newVenues) => {
    venues.value = newVenues;
});
  </script>
  