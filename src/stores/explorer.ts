import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { supabase } from "@/lib/supabase"; // Ensure correct path to your supabase config
import { transformVenueData } from "@/utils/cloudinary"; // Import your utility function for transforming the data
import { Logger } from "@/utils/logger"; // You may use your logger utility to log errors or info

// Define the store for managing venue data
export const useExplorerStore = defineStore("explorer", () => {
  // State for storing venue data
  const venues = ref<any[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  // Computed Property to check if there are venues
  const hasVenues = computed(() => venues.value.length > 0);

  // Method to fetch venue data and transform it
  // Method to fetch venue data and transform it
  async function fetchAllVenues() {
    loading.value = true;
    error.value = null;
    console.log("Fetching venues...");

    try {
      // Fetch all venues from Supabase without filtering by managerId
      const { data, error: fetchError } = await supabase.from("venues").select("*");

      if (fetchError) {
        console.error("Supabase fetch error:", fetchError);
        throw fetchError;
      }

      console.log("Data fetched from Supabase initially before transforming:", data);

      // If data exists, transform it using the utility function
      venues.value = transformVenueData(data?.slice(0, 10) || []);
      console.log("Transformed 10 1st venues:", venues.value);

      Logger.info("Venues fetched and transformed 1st 10", { count: venues.value.length });

    } catch (err) {
      error.value = `Error fetching venues: ${(err as Error).message}`;
      Logger.error("Error fetching venues", err);
      console.error("Error fetching venues:", err);
    } finally {
      loading.value = false;
      console.log("Fetching complete, loading set to false.");
    }
  }

    // Method to fetch a specific page of venues for pagination
  // Fetch paginated venues
  // async function fetchVenuesPage(page: number, perPage: number) {
  //   const offset = (page - 1) * perPage;
  //   console.log(`Fetching venues from Supabase for page ${page} with offset ${offset}...`); // Log the page and offset
  //   try {
  //     const { data, error: fetchError } = await supabase
  //       .from("venues")
  //       .select("*")
  //       .range(offset, offset + perPage - 1);
  
  //     if (fetchError) throw fetchError;
  //     console.log("Fetched venues from Supabase:", data); // Log the fetched data
  //     return transformVenueData(data || []); // Log transformed data before returning
  //   } catch (err) {
  //     console.error("Error fetching venues page:", err);
  //     throw err;
  //   }
  // }
  // In your store
async function fetchVenuesPage(page: number, perPage: number) {
  const offset = (page - 1) * perPage;
  console.log(`Fetching venues from Supabase for page ${page} with offset ${offset}...`);
  try {
    const { data, error: fetchError } = await supabase
      .from("venues")
      .select("*")
      .range(offset, offset + perPage - 1);

    if (fetchError) throw fetchError;

    console.log("Fetched venues from Supabase:", data);
    const transformedData = transformVenueData(data || []); // Transform the data
    return transformedData;
  } catch (err) {
    console.error("Error fetching venues page:", err);
    throw err;
  }
}

  

  // Return the reactive state, computed properties, and actions for use in components
  return {
    venues,
    loading,
    error,
    hasVenues,
    fetchAllVenues,
    fetchVenuesPage,
  };
});
