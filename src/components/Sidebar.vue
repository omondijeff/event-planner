<template>
  <div class="h-screen flex flex-col bg-gray-900 text-white w-64">
    <!-- Logo Section -->
    <div class="flex items-center justify-center h-20 border-b border-gray-700">
      <img src="@/assets/logo.png" alt="Logo" class="h-12" />
    </div>

    <!-- Navigation Links -->
    <nav class="flex-1 px-4 py-6 space-y-2">
      <!-- Dashboard -->
      <RouterLink
        to="/dashboard"
        class="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
        :class="{ 'bg-gray-800': $route.path === '/dashboard' }"
      >
        <HomeIcon class="w-5 h-5 text-gray-400" />
        <span class="ml-3">Dashboard</span>
      </RouterLink>

      <!-- Vendor-Specific Links -->
      <div v-if="authStore.profile?.user_type === 'vendor' || authStore.profile?.user_type === 'admin'">
        <RouterLink
          to="/vendor-dashboard"
          class="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
          :class="{ 'bg-gray-800': $route.path === '/vendor-dashboard' }"
        >
          <ShoppingBagIcon class="w-5 h-5 text-gray-400" />
          <span class="ml-3">Vendor Dashboard</span>
        </RouterLink>
        <RouterLink
          to="/inventory"
          class="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
          :class="{ 'bg-gray-800': $route.path === '/vendor-dashboard' }"
        >
          <ShoppingBagIcon class="w-5 h-5 text-gray-400" />
          <span class="ml-3">Inventory</span>
        </RouterLink>
        <RouterLink
          to="/venues"
          class="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
          :class="{ 'bg-gray-800': $route.path === '/venues' }"
        >
          <BuildingStorefrontIcon class="w-5 h-5 text-gray-400" />
          <span class="ml-3">Manage Venues</span>
        </RouterLink>
      </div>

      <!-- Planner-Specific Links -->
      <div v-if="authStore.profile?.user_type === 'planner' || authStore.profile?.user_type === 'admin'">
        <RouterLink
          to="/bookings"
          class="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
          :class="{ 'bg-gray-800': $route.path === '/bookings' }"
        >
          <ClipboardDocumentIcon class="w-5 h-5 text-gray-400" />
          <span class="ml-3">Manage Bookings</span>
        </RouterLink>
      </div>

      <!-- Venue Manager-Specific Links -->
      <div v-if="authStore.profile?.user_type === 'venue_manager' || authStore.profile?.user_type === 'admin'">
        <RouterLink
          to="/venues"
          class="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
          :class="{ 'bg-gray-800': $route.path === '/venues' }"
        >
          <BuildingOfficeIcon class="w-5 h-5 text-gray-400" />
          <span class="ml-3">Venue Management</span>
        </RouterLink>
      </div>
    </nav>

    <!-- Logout Button -->
    <div class="px-4 py-6 border-t border-gray-700">
      <button
        @click="logout"
        class="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        <ArrowRightOnRectangleIcon class="w-5 h-5 mr-2 text-white" />
        Logout
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

// Correct Heroicons imports
import {
  HomeIcon,
  ShoppingBagIcon,
  BuildingStorefrontIcon,
  ClipboardDocumentIcon,
  BuildingOfficeIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/vue/24/solid';

const authStore = useAuthStore();
const router = useRouter();

function logout() {
  authStore.logout();
  router.push('/login');
}
</script>
