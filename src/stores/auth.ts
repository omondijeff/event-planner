// src/stores/auth.ts
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase'
import { ref, computed } from 'vue'
import type { User } from '@supabase/supabase-js'
import type { Database } from '@/lib/database.types'

type Profile = Database['public']['Tables']['profiles']['Row']

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const profile = ref<Profile | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value)

  async function initialize() {
    error.value = null
    try {
      const { data: { session }, error: initError } = await supabase.auth.getSession()
      if (initError) throw initError

      user.value = session?.user ?? null
      profile.value = null  // Reset profile if no user found
      
      if (user.value) {
        await fetchProfile()
      }
    } catch (err) {
      error.value = `Initialization error: ${(err as Error).message}`
    }
  }

  async function login(email: string, password: string) {
    loading.value = true
    error.value = null
    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password })
      if (loginError) throw loginError

      user.value = data.user
      await fetchProfile()
    } catch (err) {
      error.value = `Login error: ${(err as Error).message}`
    } finally {
      loading.value = false
    }
  }

  async function register(email: string, password: string) {
    loading.value = true
    error.value = null
    try {
      const { data, error: registerError } = await supabase.auth.signUp({ email, password })
      if (registerError) throw registerError
  
      user.value = data.user
  
      // If user registration is successful, create a profile
      if (user.value) {
        const profileData = {
          id: user.value.id,  // Use the authenticated user's ID for the profile
          email: user.value.email,
          full_name: "",  // Optional: Can be updated later in Profile Setup
          user_type: "planner",  // Optional: Set a default user type or prompt during setup
          location: "",   // Optional: Set location later in Profile Setup
        }
  
        const { error: profileError } = await supabase
          .from('profiles')
          .insert(profileData)
  
        if (profileError) throw profileError
      }
    } catch (err) {
      error.value = `Registration error: ${(err as Error).message}`
    } finally {
      loading.value = false
    }
  }
  

  async function logout() {
    loading.value = true
    error.value = null
    try {
      const { error: logoutError } = await supabase.auth.signOut()
      if (logoutError) throw logoutError

      user.value = null
      profile.value = null
    } catch (err) {
      error.value = `Logout error: ${(err as Error).message}`
    } finally {
      loading.value = false
    }
  }

  async function fetchProfile() {
    error.value = null
    try {
      if (!user.value) return
      console.log("Fetching profile for user ID:", user.value.id) // Debug log
  
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.value.id)
        .single()
      if (fetchError) throw fetchError
  
      console.log("Fetched profile data:", data) // Debug log
      profile.value = data
    } catch (err) {
      console.error("Fetch profile error:", err) // Debug log
      error.value = `Fetch profile error: ${(err as Error).message}`
    }
  }
  

  async function updateProfile(updates: Partial<Profile>) {
    loading.value = true
    error.value = null
    try {
      if (!user.value) return

      const { data, error: updateError } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.value.id)
        .select()
        .single()
      if (updateError) throw updateError

      profile.value = data
    } catch (err) {
      error.value = `Update profile error: ${(err as Error).message}`
    } finally {
      loading.value = false
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
  }
})
