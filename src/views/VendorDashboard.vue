<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">Vendor Dashboard</h1>
  
      <!-- Loading State -->
      <div v-if="loading" class="text-gray-500 flex items-center justify-center">
        <ArrowPathIcon class="w-6 h-6 animate-spin mr-2" />
        <span>Loading vendor profile...</span>
      </div>
  
      <!-- Error State -->
      <div v-else-if="error" class="text-red-500 text-center">
        <ExclamationCircleIcon class="w-6 h-6 text-red-500 mx-auto mb-2" />
        <p>{{ error }}</p>
      </div>
  
      <!-- Vendor Information -->
      <div v-else-if="vendor" class="bg-white shadow rounded-lg p-6 mb-6">
        <h2 class="text-xl font-semibold text-gray-800">Vendor Information</h2>
        <dl class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt class="text-sm font-medium text-gray-500">Business Name</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ vendor.business_name || 'Not set' }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Service Type</dt>
            <dd class="mt-1 text-sm text-gray-900 capitalize">{{ vendor.service_type || 'Not set' }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Location</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ vendor.location || 'Not set' }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Verified Status</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ vendor.is_verified ? 'Verified' : 'Not Verified' }}</dd>
          </div>
        </dl>
      </div>
  
      <!-- Manage Venues Button -->
      <router-link
        v-if="vendor"
        to="/venues"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Manage Venues
      </router-link>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useVendorStore } from '@/stores/vendor';
  
  // Heroicons
  import { ArrowPathIcon, ExclamationCircleIcon } from '@heroicons/vue/24/solid';
  
  const vendorStore = useVendorStore();
  const vendor = ref(vendorStore.vendor); // Reactive reference to vendor data
  const loading = ref(false);
  const error = ref<string | null>(null);
  
  // Simulate fetching the profile ID from a central store
  const profileId = 'bb57d3d3-7c3d-4120-a708-1c98366e6c86';
  
  onMounted(async () => {
    loading.value = true;
    console.log('Fetching vendor for profile ID:', profileId); // Log the profile ID
    try {
      await vendorStore.fetchVendor(profileId); // Pass the actual profile ID
      vendor.value = vendorStore.vendor; // Update local vendor reference after fetching
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unexpected error occurred';
      console.error('Error fetching vendor:', err); // Log errors if any
    } finally {
      loading.value = false;
    }
  });
  </script>
  