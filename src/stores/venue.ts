import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { supabase } from "@/lib/supabase";
import { Logger } from "@/utils/logger";
import type { Venue } from "@/lib/database.types";

export const useVenueStore = defineStore("venue", () => {
  // State
  const venues = ref<Venue[]>([]);
  const venue = ref<Venue | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

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
      const { data, error: insertError } = await supabase
        .from("venues")
        .insert(venueData)
        .select()
        .single();

      if (insertError) throw insertError;

      if (data) {
        Logger.info("Successfully created venue", { venueId: data.id });

        // Fetch fresh data from the backend to avoid inconsistencies
        await fetchVenues(null, true);
      }
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
      const { data, error: updateError } = await supabase
        .from("venues")
        .update(updates)
        .eq("id", venueId)
        .select()
        .single();

      if (updateError) throw updateError;

      if (data) {
        Logger.info("Successfully updated venue", { venueId });

        // Fetch fresh data from the backend to avoid inconsistencies
        await fetchVenues(null, true);
      }
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
  };
});
