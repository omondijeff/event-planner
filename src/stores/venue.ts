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


  const uploadFilesToCloudinary = async (
    files: File[], // Array of files to upload
    folder: string, // The folder in Cloudinary to store the files
    preset: string // The upload preset for Cloudinary
  ): Promise<string[]> => {
    const publicIds: string[] = [];
    
    // Log the number of files to be uploaded and the target folder.
    console.log(`Starting file upload to Cloudinary: ${files.length} files to upload to folder '${folder}'`);
  
    for (const file of files) {
      // Log each file being uploaded
      console.log(`Uploading file: ${file.name}`);
  
      try {
        // Call the existing function to upload the file to Cloudinary
        const publicId = await uploadToCloudinary(file, folder, preset);
  
        // Log the successful upload and the resulting public_id
        console.log(`File uploaded successfully: ${file.name}, public_id: ${publicId}`);
  
        // Validate if the public_id is returned correctly
        if (typeof publicId !== "string") {
          throw new Error("Invalid public_id returned from Cloudinary upload");
        }
  
        // Push the public_id to the array
        publicIds.push(publicId);
      } catch (err) {
        // Log detailed error information
        console.error(`Error uploading file: ${file.name}`, {
          error: (err as Error).message,
          folder,
        });
  
        // Rethrow the error after logging it
        throw new Error(`Failed to upload files to Cloudinary.`);
      }
    }
    if (publicIds.length === 0) {
      throw new Error("No files were successfully uploaded.");
  }
  
    // Log the public_ids of all successfully uploaded files
    console.log(`All files uploaded successfully. Public IDs:`, publicIds);
  
    // Return the array of uploaded file public_ids
    return publicIds;
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
      console.log("Venues fetched:", venues.value);  // Log venues after fetch


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
 * @param updatedVenueData Data for the new venue, including public IDs for images and floor plans.
 */
 async function createVenue(updatedVenueData: Omit<Venue, "id" | "created_at">) {
  loading.value = true;
  error.value = null;
  Logger.info("Starting venue creation", { updatedVenueData });

  // Validate that the images and floor plan URL fields are non-empty
  if (!updatedVenueData.images || !updatedVenueData.floor_plan_url || !updatedVenueData.images.length || !updatedVenueData.floor_plan_url.length) {
      throw new Error("Images or floor plan URLs are missing or empty.");
  }
  console.log("Payload for venue insertion:", updatedVenueData);

  try {
      const { data, error: insertError } = await supabase
          .from('venues')
          .insert([updatedVenueData]);

      // If insertError occurs, throw an error
      if (insertError) {
          throw new Error(insertError.message);
      }

      // Log the full data object (not just data[0])
      Logger.info("Successfully created venue", { venueData: data });

      // Return the full data (array) if necessary
      return data;
  } catch (err) {
      Logger.error("Error creating venue", err);
      error.value = `Error creating venue: ${(err).message}`;
      throw err;
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
