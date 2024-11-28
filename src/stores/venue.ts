import { defineStore } from 'pinia';
import { supabase } from '@/lib/supabase';
import type { Venue } from '@/lib/database.types';

export const useVenueStore = defineStore('venue', {
  state: () => ({
    venues: [] as Venue[],
    venue: null as Venue | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchVenues(managerId: string) {
      this.loading = true;
      this.error = null;
      try {
        const { data, error } = await supabase
          .from('venues')
          .select('*')
          .eq('manager_id', managerId);

        if (error) throw error;
        this.venues = data as Venue[];
      } catch (err) {
        this.error = (err as Error).message;
      } finally {
        this.loading = false;
      }
    },

    async fetchVenue(venueId: string) {
      this.loading = true;
      this.error = null;
      try {
        const { data, error } = await supabase
          .from('venues')
          .select('*')
          .eq('id', venueId)
          .single();

        if (error) throw error;
        this.venue = data as Venue;
      } catch (err) {
        this.error = (err as Error).message;
      } finally {
        this.loading = false;
      }
    },

    async createVenue(venueData: Omit<Venue, 'id' | 'created_at'>) {
      this.loading = true;
      this.error = null;
      try {
        const { error } = await supabase.from('venues').insert(venueData);
        if (error) throw error;

        // Optionally, fetch venues again to update the state
        if (this.venues.length) await this.fetchVenues(venueData.manager_id);
      } catch (err) {
        this.error = (err as Error).message;
      } finally {
        this.loading = false;
      }
    },

    async updateVenue(venueId: string, updates: Partial<Venue>) {
      this.loading = true;
      this.error = null;
      try {
        const { error } = await supabase
          .from('venues')
          .update(updates)
          .eq('id', venueId);
        if (error) throw error;

        // Optionally, fetch the updated venue
        if (this.venue) await this.fetchVenue(venueId);
      } catch (err) {
        this.error = (err as Error).message;
      } finally {
        this.loading = false;
      }
    },

    async deleteVenue(venueId: string) {
      this.loading = true;
      this.error = null;
      try {
        const { error } = await supabase
          .from('venues')
          .delete()
          .eq('id', venueId);
        if (error) throw error;

        // Optionally, remove the venue from the state
        this.venues = this.venues.filter(venue => venue.id !== venueId);
      } catch (err) {
        this.error = (err as Error).message;
      } finally {
        this.loading = false;
      }
    },
  },
});

// import { defineStore } from 'pinia';
// import { ref } from 'vue';
// import { supabase } from '@/lib/supabase';
// import type { Venue } from '@/lib/database.types';

// export const useVenueStore = defineStore('venues', () => {
//   // State variables for venues data, loading state, error state, and a single venue
//   const venues = ref<Venue[]>([]);
//   const venue = ref<Venue | null>(null);
//   const loading = ref(false);
//   const error = ref<string | null>(null);

//   // Helper function to handle setting loading state and catching errors
//   const handleLoadingAndError = (action: () => Promise<any>) => {
//     loading.value = true;
//     error.value = null;

//     return action()
//       .then((data) => data) // Return successful data
//       .catch((err) => {
//         error.value = (err as Error).message; // Capture and set the error message
//         throw err; // Rethrow for further handling
//       })
//       .finally(() => {
//         loading.value = false; // Set loading to false regardless of success or error
//       });
//   };

//   /**
//    * Fetch all venues for a given manager.
//    * @param managerId Optional manager ID to filter venues.
//    */
//   const fetchVenues = async (managerId?: string) => {
//     try {
//       const { data, error: supabaseError } = await supabase
//         .from('venues')
//         .select('*')
//         .eq('manager_id', managerId || ''); // Fetch venues filtered by manager_id

//       if (supabaseError) throw new Error(supabaseError.message); // Handle errors
//       venues.value = data || []; // Set fetched data to venues state
//     } catch (err) {
//       error.value = (err as Error).message; // Set error state
//     } finally {
//       loading.value = false;
//     }
//   };

//   /**
//    * Fetch a specific venue by its ID.
//    * @param venueId ID of the venue to fetch.
//    */
//   const fetchVenue = async (venueId: string) => {
//     try {
//       const { data, error: supabaseError } = await supabase
//         .from('venues')
//         .select('*')
//         .eq('id', venueId)
//         .single(); // Fetch a single venue by its ID

//       if (supabaseError) throw new Error(supabaseError.message); // Handle errors
//       venue.value = data || null; // Set the venue data or null if not found
//     } catch (err) {
//       error.value = (err as Error).message; // Set error state
//     } finally {
//       loading.value = false;
//     }
//   };

//   /**
//    * Create a new venue with the provided data.
//    * @param venueData Data of the venue to create.
//    */
//   const createVenue = async (venueData: Partial<Venue>) => {
//     try {
//       const { data, error: supabaseError } = await supabase
//         .from('venues')
//         .insert(venueData)
//         .select(); // Insert a new venue

//       if (supabaseError) throw new Error(supabaseError.message); // Handle errors
//       if (data) venues.value.push(data[0]); // Add the created venue to the state
//     } catch (err) {
//       error.value = (err as Error).message; // Set error state
//     } finally {
//       loading.value = false;
//     }
//   };

//   /**
//    * Update an existing venue's data.
//    * @param venueId ID of the venue to update.
//    * @param updates Partial updates to apply to the venue.
//    */
//   const updateVenue = async (venueId: string, updates: Partial<Venue>) => {
//     try {
//       const { data, error: supabaseError } = await supabase
//         .from('venues')
//         .update(updates)
//         .eq('id', venueId)
//         .select(); // Update venue data by its ID

//       if (supabaseError) throw new Error(supabaseError.message); // Handle errors
//       const index = venues.value.findIndex((v) => v.id === venueId); // Find the venue by ID
//       if (index !== -1 && data) venues.value[index] = data[0]; // Update the venue in the state
//     } catch (err) {
//       error.value = (err as Error).message; // Set error state
//     } finally {
//       loading.value = false;
//     }
//   };

//   /**
//    * Delete a venue by its ID.
//    * @param venueId ID of the venue to delete.
//    */
//   const deleteVenue = async (venueId: string) => {
//     try {
//       const { error: supabaseError } = await supabase
//         .from('venues')
//         .delete()
//         .eq('id', venueId); // Delete venue by its ID

//       if (supabaseError) throw new Error(supabaseError.message); // Handle errors
//       venues.value = venues.value.filter((v) => v.id !== venueId); // Remove the deleted venue from the state
//     } catch (err) {
//       error.value = (err as Error).message; // Set error state
//     } finally {
//       loading.value = false;
//     }
//   };

//   // Return the state and actions for use in components
//   return {
//     venues,
//     venue,
//     loading,
//     error,
//     fetchVenues,
//     fetchVenue,
//     createVenue,
//     updateVenue,
//     deleteVenue,
//   };
// });
