// src/stores/auth.ts
import { defineStore } from 'pinia';
import { supabase } from '@/lib/supabase';
import { ref, computed } from 'vue';
export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);
    const profile = ref(null);
    const loading = ref(false);
    const error = ref(null);
    const isAuthenticated = computed(() => !!user.value);
    async function initialize() {
        error.value = null;
        try {
            const { data: { session }, error: initError } = await supabase.auth.getSession();
            if (initError)
                throw initError;
            user.value = session?.user ?? null;
            profile.value = null; // Reset profile if no user found
            if (user.value) {
                await fetchProfile();
            }
        }
        catch (err) {
            error.value = `Initialization error: ${err.message}`;
        }
    }
    async function login(email, password) {
        loading.value = true;
        error.value = null;
        try {
            const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password });
            if (loginError)
                throw loginError;
            user.value = data.user;
            await fetchProfile();
        }
        catch (err) {
            error.value = `Login error: ${err.message}`;
        }
        finally {
            loading.value = false;
        }
    }
    async function register(email, password) {
        loading.value = true;
        error.value = null;
        try {
            const { data, error: registerError } = await supabase.auth.signUp({ email, password });
            if (registerError)
                throw registerError;
            user.value = data.user;
            // If user registration is successful, create a profile
            if (user.value) {
                const profileData = {
                    id: user.value.id, // Use the authenticated user's ID for the profile
                    email: user.value.email,
                    full_name: "", // Optional: Can be updated later in Profile Setup
                    user_type: "planner", // Optional: Set a default user type or prompt during setup
                    location: "", // Optional: Set location later in Profile Setup
                };
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert(profileData);
                if (profileError)
                    throw profileError;
            }
        }
        catch (err) {
            error.value = `Registration error: ${err.message}`;
        }
        finally {
            loading.value = false;
        }
    }
    async function logout() {
        loading.value = true;
        error.value = null;
        try {
            const { error: logoutError } = await supabase.auth.signOut();
            if (logoutError)
                throw logoutError;
            user.value = null;
            profile.value = null;
        }
        catch (err) {
            error.value = `Logout error: ${err.message}`;
        }
        finally {
            loading.value = false;
        }
    }
    async function fetchProfile() {
        error.value = null;
        try {
            if (!user.value)
                return;
            console.log("Fetching profile for user ID:", user.value.id); // Debug log
            const { data, error: fetchError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.value.id)
                .single();
            if (fetchError)
                throw fetchError;
            console.log("Fetched profile data:", data); // Debug log
            profile.value = data;
        }
        catch (err) {
            console.error("Fetch profile error:", err); // Debug log
            error.value = `Fetch profile error: ${err.message}`;
        }
    }
    async function updateProfile(updates) {
        loading.value = true;
        error.value = null;
        try {
            if (!user.value)
                return;
            // Update the profile in the database
            console.log('Updating profile with:', updates);
            const { data, error: updateError } = await supabase
                .from('profiles')
                .update(updates)
                .eq('id', user.value.id)
                .select()
                .single();
            if (updateError)
                throw updateError;
            console.log('Profile updated successfully:', data);
            profile.value = data;
            // If the updated profile is a vendor and no vendor record exists, create a vendor record
            if (updates.user_type === 'vendor') {
                console.log('User type is vendor, checking for existing vendor record...');
                const { data: existingVendor, error: fetchVendorError } = await supabase
                    .from('vendors')
                    .select('*')
                    .eq('profile_id', user.value.id)
                    .single();
                if (fetchVendorError && fetchVendorError.code !== 'PGRST116') {
                    console.error('Error while fetching vendor record:', fetchVendorError);
                    throw fetchVendorError;
                }
                if (!existingVendor) {
                    console.log('No existing vendor record found, creating new vendor...');
                    const { error: createVendorError } = await supabase.from('vendors').insert({
                        profile_id: user.value.id,
                        business_name: updates.business_name || '',
                        service_type: updates.service_type || '',
                        location: updates.location || '',
                        is_verified: false, // Default to unverified
                    });
                    if (createVendorError) {
                        console.error('Error while creating vendor record:', createVendorError);
                        throw createVendorError;
                    }
                    console.log('Vendor record created successfully for profile ID:', user.value.id);
                }
                else {
                    console.log('Vendor record already exists:', existingVendor);
                }
            }
        }
        catch (err) {
            console.error('Update profile error:', err);
            error.value = `Update profile error: ${err.message}`;
        }
        finally {
            loading.value = false;
        }
    }
    return {
        user,
        profile,
        loading,
        error,
        isAuthenticated,
        initialize,
        login,
        register,
        logout,
        updateProfile,
    };
});
