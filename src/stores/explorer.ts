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
  async function fetchAllVenues() {
    loading.value = true;
    error.value = null;
    console.log("Fetching venues...");

    try {
      // Fetch all venues from Supabase without filtering by managerId
      const { data, error: fetchError } = await supabase.from("venues").select("*");

      if (fetchError) {
        throw fetchError;
      }

      console.log("Data fetched from Supabase:", data);

      // If data exists, transform it using the utility function
      venues.value = transformVenueData(data || []);
      console.log("Transformed venues:", venues.value);

      Logger.info("Venues fetched and transformed", { count: venues.value.length });

    } catch (err) {
      error.value = `Error fetching venues: ${(err as Error).message}`;
      Logger.error("Error fetching venues", err);
      console.error("Error fetching venues:", err);
    } finally {
      loading.value = false;
      console.log("Fetching complete, loading set to false.");
    }
  }


  // Return the reactive state, computed properties, and actions for use in components
  return {
    venues,
    loading,
    error,
    hasVenues,
    fetchAllVenues,
  };
});
