<template>
  <div class="min-h-screen bg-gray-50 py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-blue-900 flex items-center space-x-2">
        <HomeIcon class="w-8 h-8 text-blue-600" />
        <span>Dashboard</span>
      </h1>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div class="bg-white shadow rounded-lg p-6">
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center text-gray-500">
          <ArrowPathIcon class="animate-spin h-6 w-6 text-blue-500 mr-3" />
          <span>Loading profile information...</span>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center text-red-500">
          <ExclamationCircleIcon class="w-8 h-8 text-red-500 mx-auto mb-2" />
          <p>Error loading profile information: {{ error }}</p>
        </div>

        <!-- Profile Information -->
        <div v-else-if="authStore.profile" class="space-y-6">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                <UserCircleIcon class="w-8 h-8 text-blue-500" />
                <span>Welcome, {{ authStore.profile.full_name || 'User' }}</span>
              </h3>
              <p class="text-sm text-gray-500 capitalize">{{ authStore.profile.user_type }}</p>
            </div>
            <router-link
              to="/profile-setup"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Edit Profile
            </router-link>
          </div>

          <div class="border-t pt-4">
            <h4 class="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <InformationCircleIcon class="w-6 h-6 text-blue-500" />
              <span>Your Information</span>
            </h4>
            <dl class="mt-4 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
              <div>
                <dt class="text-sm font-medium text-gray-500 flex items-center space-x-2">
                  <EnvelopeIcon class="w-6 h-6 text-blue-400" />
                  <span>Email</span>
                </dt>
                <dd class="mt-1 text-sm text-gray-900">{{ authStore.profile.email || 'Not set' }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500 flex items-center space-x-2">
                  <MapPinIcon class="w-6 h-6 text-blue-400" />
                  <span>Location</span>
                </dt>
                <dd class="mt-1 text-sm text-gray-900">{{ authStore.profile.location || 'Not set' }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500 flex items-center space-x-2">
                  <TagIcon class="w-6 h-6 text-blue-400" />
                  <span>User Role</span>
                </dt>
                <dd class="mt-1 text-sm text-gray-900 capitalize">{{ authStore.profile.user_type }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500 flex items-center space-x-2">
                  <CalendarIcon class="w-6 h-6 text-blue-400" />
                  <span>Account Created</span>
                </dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ authStore.profile.created_at
                    ? new Date(authStore.profile.created_at).toLocaleDateString()
                    : 'Not available' }}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';

// Import Heroicons
import {
  HomeIcon,
  ArrowPathIcon,
  ExclamationCircleIcon,
  UserCircleIcon,
  InformationCircleIcon,
  EnvelopeIcon,
  MapPinIcon,
  TagIcon,
  CalendarIcon,
} from '@heroicons/vue/24/solid';

const authStore = useAuthStore();
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    await authStore.initialize();
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An unexpected error occurred';
  } finally {
    loading.value = false;
  }
});
</script>
