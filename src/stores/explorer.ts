import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { supabase } from "@/lib/supabase"; // Supabase config
import { Logger } from "@/utils/logger"; // Logger utility
import { constructCloudinaryUrls } from "@/utils/cloudinary"; // Import your utility function for transforming the data

export const useExplorerStore = defineStore("explorer", () => {
  const venues = ref<any[]>([]); // Store raw venue data
  const loading = ref<boolean>(false);
  const isLoadingMore = ref<boolean>(false); // New flag for pagination loading
  const error = ref<string | null>(null);
  const totalVenues = ref<number>(0); // Track total number of venues for pagination
  const currentPage = ref<number>(1); // Track the current page
  const venuesPerPage = ref<number>(10); // Number of venues to fetch per page

  const venueThumbnails = computed(() => {
    return venues.value.map((venue) => {
      console.log('Venue images:', venue.images); // Log images to verify public IDs
      return {
        ...venue,
        images: Array.isArray(venue.images)
          ? constructCloudinaryUrls(venue.images, { size: 'thumbnail' })
          : [],
      };
    });
  });
  

  // Fetch paginated venues based on current page
  async function fetchVenuesPage(page: number, perPage: number) {
    if (loading.value || isLoadingMore.value) return;
  
    const offset = (page - 1) * perPage;
    if (page === 1) {
      loading.value = true;
      venues.value = []; // Reset only on first page
    } else {
      isLoadingMore.value = true;
    }
  
    error.value = null;
  
    try {
      const { data, count, error: fetchError } = await supabase
        .from("venues")
        .select("*", { count: "exact" })
        .range(offset, offset + perPage - 1);
  
      if (fetchError) throw fetchError;
  
      venues.value = [...venues.value, ...(data || [])];
  
      totalVenues.value = count || 0;
      currentPage.value = page;
  
      Logger.info("Fetched venues page", { page, count: venues.value.length });
    } catch (err) {
      error.value = `Error fetching venues: ${(err as Error).message}`;
      Logger.error("Error fetching venues page", err);
    } finally {
      loading.value = false;
      isLoadingMore.value = false;
    }
  }
  
  
  // Return the store's state and methods
  return {
    venues,
    venueThumbnails,
    loading,
    isLoadingMore,
    error,
    totalVenues,
    currentPage,
    venuesPerPage,
    fetchVenuesPage,
  };
});
