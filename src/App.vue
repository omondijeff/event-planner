<!-- src/App.vue -->
<template>
  <div class="flex h-screen">
    <!-- Sidebar Component -->
    <Sidebar v-if="authStore.isAuthenticated" />

    <!-- Main Content Area -->
    <div class="flex-1 overflow-auto bg-gray-100">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<style>
/* Optional: Adjust body background color */
body {
  background-color: #f3f4f6; /* Light gray */
}
</style>
