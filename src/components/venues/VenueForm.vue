<template>
    <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="w-full max-w-lg p-6 bg-white rounded shadow-md">
        <h2 class="mb-4 text-xl font-bold">
          {{ venue ? "Edit Venue" : "Add New Venue" }}
        </h2>
  
        <!-- Form -->
        <form @submit.prevent="saveVenue">
          <div class="mb-4">
            <label class="block text-gray-700">Venue Name</label>
            <input
              v-model="form.name"
              type="text"
              class="w-full px-3 py-2 border rounded"
              required
            />
          </div>
  
          <div class="mb-4">
            <label class="block text-gray-700">Description</label>
            <textarea
              v-model="form.description"
              class="w-full px-3 py-2 border rounded"
            ></textarea>
          </div>
  
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-gray-700">Capacity</label>
              <input
                v-model="form.capacity"
                type="number"
                class="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label class="block text-gray-700">Size (m²)</label>
              <input
                v-model="form.size"
                type="number"
                class="w-full px-3 py-2 border rounded"
                required
              />
            </div>
          </div>
  
          <div class="mb-4">
            <label class="block text-gray-700">Location</label>
            <input
              v-model="form.location"
              type="text"
              class="w-full px-3 py-2 border rounded"
              required
            />
          </div>
  
          <div class="mb-4">
            <label class="block text-gray-700">Price Range</label>
            <input
              v-model="form.price_range"
              type="number"
              class="w-full px-3 py-2 border rounded"
            />
          </div>
  

          <!-- Image Upload Section -->
      <div class="mb-4">
        <h3 class="mb-2 text-lg font-bold">Upload Venue Images</h3>
        <input
          type="file"
          accept="image/*"
          multiple
          @change="handleImageUpload"
          class="mb-4"
        />
        <div class="flex space-x-2">
          <img
            v-for="(image, index) in previewImages"
            :key="index"
            :src="image"
            alt="Preview"
            class="object-cover w-16 h-16 rounded"
          />
        </div>
      </div>

      <!-- Floor Plan Upload Section -->
      <div class="mb-4">
        <h3 class="mb-2 text-lg font-bold">Upload Floor Plans</h3>
        <input
          type="file"
          accept="image/*"
          multiple
          @change="handleFloorPlanUpload"
          class="mb-4"
        />
        <div class="flex space-x-2">
          <img
            v-for="(floorPlan, index) in previewFloorPlans"
            :key="index"
            :src="floorPlan"
            alt="Preview"
            class="object-cover w-16 h-16 rounded"
          />
        </div>
      </div>


          
          <div class="flex justify-end space-x-2">
            <button
              type="button"
              class="px-4 py-2 text-white bg-gray-500 rounded"
              @click="$emit('close')"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-white bg-blue-500 rounded"
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
  import { supabase } from "@/lib/supabase";
 // import { uploadFilesToCloudinary } from "@/stores/venue";   // Import the cloudinary upload function
  
  export default {
    props: {
      venue: {
        type: Object,
        default: null,
      },
    },
    setup(props, { emit }) {
      const venueStore = useVenueStore();
      const { createVenue, updateVenue} = venueStore;

       // Initialize `loading` and `error` as refs
    const loading = ref(false);
    const error = ref(null);
  
      const form = ref({
        name: "",
        description: "",
        capacity: null,
        size: null,
        location: "",
        price_range: null,
      });


    // Images and Floor Plans
    const previewImages = ref([]);
    const previewFloorPlans = ref([]);
    const uploadedFiles = ref([]);
    const uploadedFloorPlans = ref([]);
    
    onMounted(() => {
      console.log("onMounted: venue prop", props.venue);
      if (props.venue) {
        form.value = { ...props.venue };
        console.log("onMounted: Form populated with venue data", form.value);
      }
    });
  // Handle Image Upload
const handleImageUpload = (event) => {
  const files = event.target.files;
  previewImages.value = []; // Clear previous previews

  if (files.length > 0) {
    // Create preview URLs for image display
    Array.from(files).forEach((file) => {
      previewImages.value.push(URL.createObjectURL(file));
    });

    // Directly mutate the uploadedFiles array
    uploadedFiles.value.push(...Array.from(files));
  }
  console.log("Images to be uploaded:", uploadedFiles.value);
};



    
// Handle Floor Plan Upload
const handleFloorPlanUpload = (event) => {
  const files = event.target.files;
  previewFloorPlans.value = []; // Clear previous floor plan previews

  if (files.length > 0) {
    // Create preview URLs for floor plan display
    Array.from(files).forEach((file) => {
      previewFloorPlans.value.push(URL.createObjectURL(file));
    });

    // Directly mutate the uploadedFloorPlans array
    uploadedFloorPlans.value.push(...Array.from(files));
  }
  console.log("Floor Plans to be uploaded:", uploadedFloorPlans.value);
};



const saveVenue = async () => {
  loading.value = true; // Start loading indicator
  error.value = null; // Reset any previous errors
  const venueStore = useVenueStore();  // Create an instance of the store

  const venueData = { ...form.value }; // Extract form data

  console.log("Image files:", uploadedFiles.value.length);
console.log("Floor plan files:", uploadedFloorPlans.value.length);


  try {
    // Conditionally upload image files if selected
    const imageUrls = uploadedFiles.value.length
      ? await venueStore.uploadFilesToCloudinary(uploadedFiles.value, 'venue_images', import.meta.env.VITE_CLOUDINARY_VENUE_IMAGES_PRESET)
      : [];
      console.log("Uploaded files for images:", uploadedFiles.value);

    // Conditionally upload floor plan files if selected
    const floorPlanUrls = uploadedFloorPlans.value.length
      ? await venueStore.uploadFilesToCloudinary(uploadedFloorPlans.value, 'floor_plan_images', import.meta.env.VITE_CLOUDINARY_FLOOR_PLAN_PRESET)
      : [];
      console.log("Uploaded files for floor plans:", uploadedFloorPlans.value);

    // Combine the form data with the uploaded file URLs
    const updatedVenueData = {
      ...venueData,
      images: imageUrls, // Store image URLs
      floor_plan_url: floorPlanUrls, // Store floor plan URLs
    };

    // Decide whether to create or update the venue
    if (props.venue) {
      console.log('Updating venue:', updatedVenueData);
      await venueStore.updateVenue(props.venue.id, updatedVenueData); // Update existing venue
    } else {
      console.log('Creating new venue:', updatedVenueData);
      await venueStore.createVenue(updatedVenueData); // Create a new venue
    }

    // Emit success event and close modal
    emit('saved', updatedVenueData);
    emit('close');
    console.log('Venue saved successfully');
  } catch (err) {
    // Handle errors gracefully
    error.value = `Error saving venue: ${(err).message}`;
    console.error(error.value);
  } finally {
    loading.value = false; // Reset loading state
  }
  console.log("Uploaded Image URLs:", imageUrls);
  console.log("Uploaded Floor Plan URLs:", floorPlanUrls);
};





    return {
      form,
      saveVenue,
      loading,
      error,
      previewImages,
      previewFloorPlans,
      handleImageUpload,
      handleFloorPlanUpload,
    };
  },
};
  </script>
  
  <style scoped>
  /* Add any custom styling here */
  </style>
  