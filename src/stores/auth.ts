import { defineStore } from "pinia";
import { supabase } from "@/lib/supabase";
import { ref, computed } from "vue";
import adminEmails from "@/config/adminEmails.json"; // Admin email list
import { Logger } from "@/utils/logger"; // Import Logger
import type { User } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";
import { hasAccess, UserRole } from "@/utils/accessControl";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export const useAuthStore = defineStore("auth", () => {
  // State
  const user = ref<User | null>(null);
  const profile = ref<Profile | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Computed Properties
  const isAuthenticated = computed(() => !!user.value);
  const userRole = computed<UserRole | null>(() => profile.value?.user_type || null);

  const hasPermission = (allowedRoles: UserRole[]): boolean => {
    return hasAccess(userRole.value, allowedRoles);
  };

  // Initialize Session
  async function initialize() {
    Logger.info("Initializing session...");
    error.value = null;

    try {
      const { data: { session }, error: initError } = await supabase.auth.getSession();
      if (initError) throw initError;

      user.value = session?.user ?? null;
      profile.value = null;

      if (user.value) {
        await fetchProfile();
      }

      Logger.info("Session initialized successfully.", { user: user.value });
    } catch (err) {
      error.value = `Initialization error: ${(err as Error).message}`;
      Logger.error("Failed to initialize session", err);
    }
  }

  // User Registration
  async function register(email: string, password: string) {
    Logger.info("Attempting user registration", { email });
    loading.value = true;
    error.value = null;

    try {
      const { data, error: registerError } = await supabase.auth.signUp({ email, password });
      if (registerError) throw registerError;

      user.value = data.user;

      if (user.value) {
        const isAdmin = adminEmails.adminEmails.includes(email);
        const profileData: Omit<Profile, "created_at"> = {
          id: user.value.id,
          email: user.value.email || "",
          full_name: "",
          user_type: isAdmin ? "admin" : "planner",
          location: "",
        };

        const { error: profileError } = await supabase.from("profiles").insert(profileData);
        if (profileError) throw profileError;

        Logger.info("User registered successfully", { email, isAdmin });
      }
    } catch (err) {
      error.value = `Registration error: ${(err as Error).message}`;
      Logger.error("Failed to register user", err, { email });
    } finally {
      loading.value = false;
    }
  }

  // User Logout
  async function logout() {
    Logger.info("Logging out user...");
    loading.value = true;
    error.value = null;

    try {
      const { error: logoutError } = await supabase.auth.signOut();
      if (logoutError) throw logoutError;

      user.value = null;
      profile.value = null;

      Logger.info("User logged out successfully.");
    } catch (err) {
      error.value = `Logout error: ${(err as Error).message}`;
      Logger.error("Failed to log out user", err);
    } finally {
      loading.value = false;
    }
  }

  // Fetch Profile
  async function fetchProfile() {
    Logger.info("Fetching user profile...");
    error.value = null;

    try {
      if (!user.value) return;

      const { data, error: fetchError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.value.id)
        .single();
      if (fetchError) throw fetchError;

      profile.value = data;
      Logger.info("Fetched profile successfully", { profile: data });
    } catch (err) {
      error.value = `Fetch profile error: ${(err as Error).message}`;
      Logger.error("Failed to fetch profile", err, { userId: user.value?.id });
    }
  }

  // Update Profile
  async function updateProfile(updates: Partial<Profile>) {
    Logger.info("Attempting to update profile", { updates });
    loading.value = true;
    error.value = null;

    try {
      if (!user.value) throw new Error("No user is logged in.");

      // Ensure admin emails always result in an admin role
      const isAdmin = adminEmails.adminEmails.includes(user.value.email);
      if (isAdmin) {
        updates.user_type = "admin";
      }

      const { data, error: updateError } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user.value.id)
        .select()
        .single();

      if (updateError) throw updateError;

      profile.value = data;
      Logger.info("Profile updated successfully", { profile: data });
    } catch (err) {
      error.value = `Update profile error: ${(err as Error).message}`;
      Logger.error("Failed to update profile", err, { updates });
      throw err; // Ensure the error propagates to the caller
    } finally {
      loading.value = false;
    }
  }

  return {
    user,
    profile,
    loading,
    error,
    isAuthenticated,
    userRole,
    hasPermission,
    initialize,
    register,
    logout,
    fetchProfile,
    updateProfile, // Ensure this is exported
  };
});
