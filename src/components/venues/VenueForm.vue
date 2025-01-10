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
      const files = Array.from(event.target.files).filter(file => file instanceof File);
      
      // Log details about the selected files
      console.log("Selected Image Files:", files);

      // Generate previews for image files
      previewImages.value = files.map(file => {
        console.log(`Creating preview for file: ${file.name}`);
        return URL.createObjectURL(file); 
      });

      // Add the files to the uploadedFiles array
      uploadedFiles.value.push(...files);
      console.log("Updated Image Files for Upload:", uploadedFiles.value);

      // Log details about each file for debugging
      uploadedFiles.value.forEach((file, index) => {
        console.log(`File ${index + 1}:`, {
          name: file.name,
          type: file.type,
          size: file.size,
          valid: file instanceof File,
        });
      });
    };

    // Handle Floor Plan Upload
    const handleFloorPlanUpload = (event) => {
      const files = Array.from(event.target.files).filter(file => file instanceof File);
      
      // Log details about the selected files
      console.log("Selected Floor Plan Files:", files);

      // Generate previews for floor plan files
      previewFloorPlans.value = files.map(file => {
        console.log(`Creating preview for file: ${file.name}`);
        return URL.createObjectURL(file);
      });

      // Add the files to the uploadedFloorPlans array
      uploadedFloorPlans.value.push(...files);
      console.log("Updated Floor Plan Files for Upload:", uploadedFloorPlans.value);

      // Log details about each floor plan file for debugging
      uploadedFloorPlans.value.forEach((file, index) => {
        console.log(`Floor Plan File ${index + 1}:`, {
          name: file.name,
          type: file.type,
          size: file.size,
          valid: file instanceof File,
        });
      });
    };


      const saveVenue = async () => {
    // Start loading state and reset errors
    loading.value = true;
    error.value = null;

    const venueStore = useVenueStore(); // Access the venue store
    const venueData = { ...form.value }; // Clone form data for updates

    console.log("Starting saveVenue process...");
    console.log("Image files to upload:", uploadedFiles.value.length);
    console.log("Floor plan files to upload:", uploadedFloorPlans.value.length);

    // Validate uploaded files
    if (!areValidFiles(uploadedFiles.value)) {
      console.error("Invalid files in uploadedFiles. Ensure all are File objects.");
      loading.value = false;
      return;
    }

    if (!areValidFiles(uploadedFloorPlans.value)) {
      console.error("Invalid files in uploadedFloorPlans. Ensure all are File objects.");
      loading.value = false;
      return;
    }

    console.log("All uploaded files are valid.");

    try {
      // Upload image files if available
      let imagePublicIds = [];
      if (uploadedFiles.value.length) {
        imagePublicIds = await venueStore.uploadFilesToCloudinary(
          uploadedFiles.value,
          "venue_images",
          import.meta.env.VITE_CLOUDINARY_VENUE_IMAGES_PRESET
        );
        console.log("Cloudinary response for Image Upload:", imagePublicIds); // Log the Cloudinary response
      }

      // Upload floor plan files if available
      let floorPlanPublicIds = [];
      if (uploadedFloorPlans.value.length) {
        floorPlanPublicIds = await venueStore.uploadFilesToCloudinary(
          uploadedFloorPlans.value,
          "floor_plan_images",
          import.meta.env.VITE_CLOUDINARY_FLOOR_PLAN_PRESET
        );
        console.log("Cloudinary response for Floor Plan Upload:", floorPlanPublicIds); // Log the Cloudinary response
      }

     // Combine the form data with the uploaded public IDs
    const updatedVenueData = {
      ...venueData,
      images: imagePublicIds.length ? imagePublicIds : [], // Ensure images is always an array
      floor_plan_url: floorPlanPublicIds.length ? floorPlanPublicIds : [], // Ensure floor_plan_url is always an array
    };

    // Log final data before insertion
    console.log("Final Venue Data to be saved:", updatedVenueData);


    // Validate the updated venue data to avoid undefined/null errors
    if (!updatedVenueData.images || !updatedVenueData.floor_plan_url) {
      console.error("Missing required fields in venue data:", updatedVenueData);
      loading.value = false;
      return;
    }
    

    if (imagePublicIds.length === 0 || floorPlanPublicIds.length === 0) {
    console.error("Image or Floor Plan upload failed: No valid public IDs returned.");
    loading.value = false;
    return;
}



      // Determine whether to create a new venue or update an existing one
      if (props.venue) {
        console.log("Updating venue with data:", updatedVenueData);
        const updateResponse = await venueStore.updateVenue(props.venue.id, updatedVenueData);
        console.log("Update Response:", updateResponse); // Log response from updating venue
      } else {
        console.log("Creating new venue with data:", updatedVenueData);
        const createResponse = await venueStore.createVenue(updatedVenueData);
        console.log("Create Response:", createResponse); // Log response from creating venue
      }

      // Emit success event and close modal
      emit("saved", updatedVenueData);
      emit("close");
      console.log("Venue saved successfully.");
    } catch (err) {
      // Capture and log any errors
      error.value = `Error saving venue: ${(err).message}`;
      console.error(error.value);
    } finally {
      // Reset loading state
      loading.value = false;
    }

    console.log("saveVenue process completed.");
  };


  /**
   * Helper function to validate files.
   * Ensures all items in the array are valid File objects.
   * @param {Array} files - Array of files to validate
   * @returns {boolean} - True if all files are valid, otherwise false
   */
  function areValidFiles(files) {
    return Array.isArray(files) && files.every(file => file instanceof File);
  }





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
  