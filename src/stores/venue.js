import { defineStore } from 'pinia';
import { supabase } from '@/lib/supabase';
export const useVenueStore = defineStore('venue', {
    state: () => ({
        venues: [],
        venue: null,
        loading: false,
        error: null,
    }),
    actions: {
        async fetchVenues(managerId) {
            this.loading = true;
            this.error = null;
            try {
                const { data, error } = await supabase
                    .from('venues')
                    .select('*')
                    .eq('manager_id', managerId);
                if (error)
                    throw error;
                this.venues = data;
            }
            catch (err) {
                this.error = err.message;
            }
            finally {
                this.loading = false;
            }
        },
        async fetchVenue(venueId) {
            this.loading = true;
            this.error = null;
            try {
                const { data, error } = await supabase
                    .from('venues')
                    .select('*')
                    .eq('id', venueId)
                    .single();
                if (error)
                    throw error;
                this.venue = data;
            }
            catch (err) {
                this.error = err.message;
            }
            finally {
                this.loading = false;
            }
        },
        async createVenue(venueData) {
            this.loading = true;
            this.error = null;
            try {
                const { error } = await supabase.from('venues').insert(venueData);
                if (error)
                    throw error;
                // Optionally, fetch venues again to update the state
                if (this.venues.length)
                    await this.fetchVenues(venueData.manager_id);
            }
            catch (err) {
                this.error = err.message;
            }
            finally {
                this.loading = false;
            }
        },
        async updateVenue(venueId, updates) {
            this.loading = true;
            this.error = null;
            try {
                const { error } = await supabase
                    .from('venues')
                    .update(updates)
                    .eq('id', venueId);
                if (error)
                    throw error;
                // Optionally, fetch the updated venue
                if (this.venue)
                    await this.fetchVenue(venueId);
            }
            catch (err) {
                this.error = err.message;
            }
            finally {
                this.loading = false;
            }
        },
        async deleteVenue(venueId) {
            this.loading = true;
            this.error = null;
            try {
                const { error } = await supabase
                    .from('venues')
                    .delete()
                    .eq('id', venueId);
                if (error)
                    throw error;
                // Optionally, remove the venue from the state
                this.venues = this.venues.filter(venue => venue.id !== venueId);
            }
            catch (err) {
                this.error = err.message;
            }
            finally {
                this.loading = false;
            }
        },
    },
});
