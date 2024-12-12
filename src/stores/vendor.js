import { defineStore } from 'pinia';
import { supabase } from '@/lib/supabase';
export const useVendorStore = defineStore('vendor', {
    state: () => ({
        vendor: null,
        vendors: [],
        loading: false,
        error: null,
    }),
    actions: {
        async fetchVendor(profileId) {
            this.loading = true;
            this.error = null;
            try {
                const { data, error } = await supabase
                    .from('vendors')
                    .select('*')
                    .eq('profile_id', profileId)
                    .single();
                if (error)
                    throw error;
                this.vendor = data;
            }
            catch (err) {
                this.error = err.message;
            }
            finally {
                this.loading = false;
            }
        },
        async createVendor(vendorData) {
            this.loading = true;
            this.error = null;
            try {
                const { error } = await supabase.from('vendors').insert(vendorData);
                if (error)
                    throw error;
                // Optionally, fetch the vendor again to update the state
                await this.fetchVendor(vendorData.profile_id);
            }
            catch (err) {
                this.error = err.message;
            }
            finally {
                this.loading = false;
            }
        },
        async updateVendor(vendorId, updates) {
            this.loading = true;
            this.error = null;
            try {
                const { error } = await supabase
                    .from('vendors')
                    .update(updates)
                    .eq('id', vendorId);
                if (error)
                    throw error;
                // Optionally, fetch the updated vendor
                if (this.vendor)
                    await this.fetchVendor(this.vendor.profile_id);
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
