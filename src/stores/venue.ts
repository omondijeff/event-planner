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
