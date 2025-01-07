import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { supabase } from "@/lib/supabase";
import { Logger } from "@/utils/logger";
import type { Venue } from "@/lib/database.types";
import { uploadToCloudinary } from "@/utils/cloudinary";

export const useVenueStore = defineStore("venue", () => {
  // State
  const venues = ref<Venue[]>([]);
  const venue = ref<Venue | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);


  const uploadedFiles = ref<File[]>([]);
const uploadedFloorPlans = ref<File[]>([]);

  // Computed Properties
  const hasVenues = computed(() => venues.value.length > 0);

  // Local Storage Helpers
  function saveToLocalStorage() {
    Logger.info("Saving venues to local storage...", { venues: venues.value });
    localStorage.setItem("venues", JSON.stringify(venues.value));
  }

  function loadFromLocalStorage() {
    Logger.info("Loading venues from local storage...");
    const storedVenues = localStorage.getItem("venues");
    if (storedVenues) {
      venues.value = JSON.parse(storedVenues);
      Logger.info("Venues loaded from local storage", { count: venues.value.length });
    }
  }

  // Cache Expiry
  let cacheExpiry = 0;
  function isCacheValid() {
    return Date.now() < cacheExpiry;
  }


/**
 * Helper function to upload files to Cloudinary and return their URLs.
 * @param files Files to upload.
 * @param folder Cloudinary folder for storing the files.
 * @param preset Cloudinary upload preset to use.
 * @returns Array of secure URLs for the uploaded files.
 */
const uploadFilesToCloudinary = async (
  files: File[], // Array of files to upload
  folder: string, // The folder in Cloudinary to store the files
  preset: string // The upload preset for Cloudinary
): Promise<string[]> => {
  const urls: string[] = [];
  
  // Log the number of files to be uploaded
  Logger.info(`Starting file upload`, { folder, fileCount: files.length });

  for (const file of files) {
    Logger.info(`Uploading file`, { fileName: file.name });

    try {
      // Call the existing function to upload the file to Cloudinary
      const fileUrl = await uploadToCloudinary(file, folder, preset);

      // Log the successful upload and the resulting URL
      Logger.info(`Successfully uploaded file`, { fileName: file.name, fileUrl });
      console.log(`File uploaded successfully 2-CHECK URL NOW: ${file.name}, URL: ${fileUrl}`);


      // if (!Array.isArray(urls) || urls.some(url => typeof url !== "string")) {
      //   throw new Error("Invalid URLs returned from Cloudinary upload");
      // }

      // Push the file URL to the array
      urls.push(fileUrl); 
    } catch (err) {
      // Log detailed error information
      Logger.error(`Error uploading file`, {
        fileName: file.name,
        folder,
        error: err,
      });

      // Rethrow the error after logging it
      throw new Error(`Failed to upload files to Cloudinary.`);
    }
  }

  // Log the URLs of all successfully uploaded files
  Logger.info(`All files uploaded successfully`, { urls });

  // Return the array of uploaded file URLs
  return urls;
};

  

  // Actions
  /**
   * Fetch all venues for the specified manager.
   * @param managerId ID of the manager or `null` for all venues.
   * @param forceRefresh Force fetch fresh data from backend.
   */
  async function fetchVenues(managerId: string | null, forceRefresh = false) {
    if (!forceRefresh && isCacheValid() && venues.value.length > 0) {
      Logger.info("Using cached venues", { managerId });
      return;
    }

    loading.value = true;
    error.value = null;
    Logger.info("Starting fetchVenues", { managerId });

    try {
      let query = supabase.from("venues").select("*");
      if (managerId) query = query.eq("manager_id", managerId);

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      venues.value = data || [];
      cacheExpiry = Date.now() + 5 * 60 * 1000; // Cache for 5 minutes
      saveToLocalStorage();
      Logger.info("Successfully fetched venues", { count: venues.value.length });
    } catch (err) {
      error.value = `Error fetching venues: ${(err as Error).message}`;
      Logger.error("Failed to fetch venues", err, { managerId });
    } finally {
      loading.value = false;
    }
  }

  /**
   * Delete a venue.
   * @param venueId ID of the venue to delete.
   */
  async function deleteVenue(venueId: string) {
    loading.value = true;
    error.value = null;
    Logger.info("Starting deleteVenue", { venueId });

    try {
      const { error: deleteError } = await supabase
        .from("venues")
        .delete()
        .eq("id", venueId);

      if (deleteError) throw deleteError;

      // Remove the deleted venue from the state
      venues.value = venues.value.filter((v) => v.id !== venueId);

      Logger.info("Successfully deleted venue", { venueId });

      // Fetch fresh data from the backend to avoid inconsistencies
      await fetchVenues(null, true);
    } catch (err) {
      error.value = `Error deleting venue: ${(err as Error).message}`;
      Logger.error("Failed to delete venue", err, { venueId });
    } finally {
      loading.value = false;
    }
  }

  /**
   * Create a new venue.
   * @param venueData Data for the new venue.
   */
  async function createVenue(venueData: Omit<Venue, "id" | "created_at">) {
    loading.value = true;
    error.value = null;
    Logger.info("Starting createVenue", { venueData });
  
    try {
      // Upload images using the helper functionuploadedFiles.value
      const imageUrls: string[] = await uploadFilesToCloudinary(
        uploadedFiles.value, 
        "venue_images", 
        import.meta.env.VITE_CLOUDINARY_VENUE_IMAGES_PRESET
      );
  
      // Upload floor plans using the helper function
      const floorPlanUrls: string[] = await uploadFilesToCloudinary(
        uploadedFloorPlans.value, 
        "floor_plan_images", 
        import.meta.env.VITE_CLOUDINARY_FLOOR_PLAN_PRESET
      );

      console.log("Image URLs before assignment:", imageUrls);
      console.log("Floor Plan URLs before assignment:", floorPlanUrls);

  
      // Combine the data with the URLs for images and floor plans
      const updatedVenueData = {
        ...venueData,
        images: Array.isArray(imageUrls) ? imageUrls : [],
        floor_plan_url: Array.isArray(floorPlanUrls) ? floorPlanUrls : [],
        
      };
      
      console.log("Updated Venue Data WITH URLS 2 CHECK:", updatedVenueData);
      console.log(Array.isArray(updatedVenueData.images)); // Should be true
      console.log(Array.isArray(updatedVenueData.floor_plan_url)); // Should be true


      if (!imageUrls.every(url => typeof url === "string")) {
        throw new Error("Images array contains invalid data");
      }
      if (!floorPlanUrls.every(url => typeof url === "string")) {
        throw new Error("Floor plan URLs array contains invalid data");
      }
      
  
      // Insert the new venue into Supabase
      const { data, error: insertError } = await supabase
        .from("venues")
        .insert(updatedVenueData)
        .select()
        .single();
  
      if (insertError) throw insertError;  
      console.log("Inserted Venue Data:", data); // Log the data returned from Supabase
      
      Logger.info("Successfully created venue", { venueId: data.id });
      await fetchVenues(null, true); // Refresh venues
  
    } catch (err) {
      error.value = `Error creating venue: ${(err as Error).message}`;
      Logger.error("Failed to create venue", err, { venueData });
    } finally {
      loading.value = false;
    }
  }
  
  

  /**
   * Update an existing venue.
   * @param venueId ID of the venue to update.
   * @param updates Partial updates for the venue.
   */
  async function updateVenue(venueId: string, updates: Partial<Venue>) {
    loading.value = true;
    error.value = null;
    Logger.info("Starting updateVenue", { venueId, updates });
  
    try {
      // Upload images only if there are new files to upload
      const imageUrls: string[] = uploadedFiles.value.length
        ? await uploadFilesToCloudinary(
            uploadedFiles.value,
            "venue_images",
            import.meta.env.VITE_CLOUDINARY_VENUE_IMAGES_PRESET
          )
        : []; // If no new files, set imageUrls to an empty array
  
      // Upload floor plans only if there are new files to upload
      const floorPlanUrls: string[] = uploadedFloorPlans.value.length
        ? await uploadFilesToCloudinary(
            uploadedFloorPlans.value,
            "floor_plan_images",
            import.meta.env.VITE_CLOUDINARY_FLOOR_PLAN_PRESET
          )
        : []; // If no new files, set floorPlanUrls to an empty array
  
      // Update the venue data, including any new images and floor plans
      const updatedVenueData = {
        ...updates,
        ...(imageUrls.length > 0 && { images: imageUrls }),
        ...(floorPlanUrls.length > 0 && { floor_plan_url: floorPlanUrls }),
      };
  
      // Update the venue in Supabase
      const { data, error: updateError } = await supabase
        .from("venues")
        .update(updatedVenueData)
        .eq("id", venueId)
        .select()
        .single();
  
      if (updateError) throw updateError;
  
      Logger.info("Successfully updated venue", { venueId });
      await fetchVenues(null, true); // Refresh venues
  
    } catch (err) {
      error.value = `Error updating venue: ${(err as Error).message}`;
      Logger.error("Failed to update venue", err, { venueId, updates });
    } finally {
      loading.value = false;
    }
  }
  
  


  return {
    venues,
    venue,
    loading,
    error,
    hasVenues,
    fetchVenues,
    deleteVenue,
    createVenue,
    updateVenue,
    uploadedFiles,
    uploadedFloorPlans,
    uploadFilesToCloudinary,
  };
});
