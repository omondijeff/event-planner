<!-- src/components/Sidebar.vue -->
<template>
    <div class="h-screen flex flex-col bg-gray-900 text-white w-64">
      <!-- Logo Section -->
      <div class="flex items-center justify-center h-20 border-b border-gray-700">
        <img src="@/assets/logo.png" alt="Logo" class="h-12" />
      </div>
  
      <!-- Navigation Links -->
      <nav class="flex-1 px-4 py-6 space-y-2">
        <RouterLink to="/dashboard" class="flex items-center px-3 py-2 rounded-md hover:bg-gray-700">
          <span class="ml-3">Dashboard</span>
        </RouterLink>
        <RouterLink to="/profile-setup" class="flex items-center px-3 py-2 rounded-md hover:bg-gray-700">
          <span class="ml-3">Profile Setup</span>
        </RouterLink>
      </nav>
  
      <!-- Logout Button -->
      <div class="px-4 py-6 border-t border-gray-700">
        <button
          @click="logout"
          class="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useAuthStore } from '@/stores/auth'
  import { useRouter } from 'vue-router'
  
  const authStore = useAuthStore()
  const router = useRouter()
  
  function logout() {
    authStore.logout()
    router.push('/')
  }
  </script>
  