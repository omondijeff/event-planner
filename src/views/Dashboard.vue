<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <div class="py-4">
        <div class="bg-white shadow rounded-lg p-6">
          <div v-if="loading" class="flex justify-center items-center text-gray-500">
            Loading profile information...
          </div>

          <div v-else-if="authStore.profile" class="space-y-4">
            <div>
              <h3 class="text-lg font-medium text-gray-900">Welcome, {{ authStore.profile.full_name }}</h3>
              <p class="text-sm text-gray-500 capitalize">{{ authStore.profile.user_type }}</p>
            </div>

            <div class="border-t pt-4">
              <h4 class="text-md font-medium text-gray-900">Your Information</h4>
              <dl class="mt-2 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                <div>
                  <dt class="text-sm font-medium text-gray-500">Email</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ authStore.profile.email }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Location</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ authStore.profile.location || 'Not set' }}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div v-else-if="error" class="text-center text-red-500">
            <p>Error loading profile information: {{ error }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    await authStore.initialize()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An unexpected error occurred'
  } finally {
    loading.value = false
  }
})
</script>
