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
                const { data, error } = await supabase.from('venues').insert(venueData).select('*');
                if (error) throw error;
                if (data) this.venues.push(data[0]); // Add the new venue to the state
            } catch (err) {
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        },
        
        async updateVenue(venueId, updates) {
            this.loading = true;
            this.error = null;
            try {
                const { data, error } = await supabase
                    .from('venues')
                    .update(updates)
                    .eq('id', venueId)
                    .select('*');
                if (error) throw error;
                
                const index = this.venues.findIndex(v => v.id === venueId);
                if (index !== -1 && data) this.venues[index] = { ...this.venues[index], ...data[0] }; // Update state
            } catch (err) {
                this.error = err.message;
            } finally {
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
                if (error) throw error;
                
                this.venues = this.venues.filter(venue => venue.id !== venueId); // Remove from state
            } catch (err) {
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        },
        
    },
});
