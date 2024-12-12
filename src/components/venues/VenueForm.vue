<template>
    <div class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h2 class="text-xl font-bold mb-4">
          {{ venue ? "Edit Venue" : "Add New Venue" }}
        </h2>
  
        <!-- Form -->
        <form @submit.prevent="saveVenue">
          <div class="mb-4">
            <label class="block text-gray-700">Venue Name</label>
            <input
              v-model="form.name"
              type="text"
              class="w-full border rounded px-3 py-2"
              required
            />
          </div>
  
          <div class="mb-4">
            <label class="block text-gray-700">Description</label>
            <textarea
              v-model="form.description"
              class="w-full border rounded px-3 py-2"
            ></textarea>
          </div>
  
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-gray-700">Capacity</label>
              <input
                v-model="form.capacity"
                type="number"
                class="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label class="block text-gray-700">Size (m²)</label>
              <input
                v-model="form.size"
                type="number"
                class="w-full border rounded px-3 py-2"
                required
              />
            </div>
          </div>
  
          <div class="mb-4">
            <label class="block text-gray-700">Location</label>
            <input
              v-model="form.location"
              type="text"
              class="w-full border rounded px-3 py-2"
              required
            />
          </div>
  
          <div class="mb-4">
            <label class="block text-gray-700">Price Range</label>
            <input
              v-model="form.price_range"
              type="number"
              class="w-full border rounded px-3 py-2"
            />
          </div>
  
          <div class="flex justify-end space-x-2">
            <button
              type="button"
              class="bg-gray-500 text-white py-2 px-4 rounded"
              @click="$emit('close')"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-blue-500 text-white py-2 px-4 rounded"
              :disabled="loading"
            >
              {{ loading ? "Saving..." : "Save" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import { useVenueStore } from "@/stores/venue";
  
  export default {
    props: {
      venue: {
        type: Object,
        default: null,
      },
    },
    setup(props, { emit }) {
      const venueStore = useVenueStore();
      const { createVenue, updateVenue, loading } = venueStore;
  
      const form = ref({
        name: "",
        description: "",
        capacity: null,
        size: null,
        location: "",
        price_range: null,
      });
  
      onMounted(() => {
        if (props.venue) {
          form.value = { ...props.venue };
        }
      });
  
      const saveVenue = async () => {
        if (props.venue) {
          await updateVenue(props.venue.id, form.value);
        } else {
          await createVenue(form.value);
        }
        emit("saved");
        emit("close");
      };
  
      return {
        form,
        saveVenue,
        loading,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add any custom styling here */
  </style>
  