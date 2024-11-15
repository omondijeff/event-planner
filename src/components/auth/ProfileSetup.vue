<template>
  <div class="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-4xl font-extrabold text-blue-900">
        {{ viewMode ? 'Your Profile' : 'Update Your Profile' }}
      </h2>
      <p class="mt-2 text-center text-sm text-blue-700">
        {{ viewMode
          ? 'Here is your current profile information.'
          : 'Update your profile to keep it accurate and complete.' }}
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Profile Summary -->
        <div v-if="viewMode" class="p-8 space-y-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-800">Personal Information</h3>
            <div class="mt-4 space-y-2">
              <p><strong>Full Name:</strong> {{ authStore.profile?.full_name || 'N/A' }}</p>
              <p><strong>Location:</strong> {{ authStore.profile?.location || 'N/A' }}</p>
              <p><strong>Role:</strong> {{ authStore.profile?.user_type || 'N/A' }}</p>
            </div>
          </div>

          <div v-if="authStore.profile?.user_type === 'vendor'">
            <h3 class="text-lg font-semibold text-gray-800">Vendor Details</h3>
            <div class="mt-4 space-y-2">
              <p><strong>Business Name:</strong> {{ authStore.profile?.business_name || 'N/A' }}</p>
              <p><strong>Service Type:</strong> {{ authStore.profile?.service_type || 'N/A' }}</p>
            </div>
          </div>

          <div class="mt-6 flex justify-center">
            <button
              @click="toggleEditMode"
              class="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Edit Profile
            </button>
          </div>
        </div>

        <!-- Profile Form -->
        <form v-else @submit.prevent="handleSubmit" class="p-8 space-y-6">
          <div>
            <label for="full-name" class="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              id="full-name"
              v-model="formData.full_name"
              type="text"
              placeholder="Enter your full name"
              required
              class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :class="{ 'border-red-500': errors.full_name }"
            />
            <p v-if="errors.full_name" class="mt-1 text-sm text-red-600">{{ errors.full_name }}</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
              <input
                id="country"
                v-model="formData.country"
                type="text"
                placeholder="Enter your country"
                required
                class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :class="{ 'border-red-500': errors.country }"
              />
              <p v-if="errors.country" class="mt-1 text-sm text-red-600">{{ errors.country }}</p>
            </div>

            <div>
              <label for="city-or-town" class="block text-sm font-medium text-gray-700">City/Town</label>
              <input
                id="city-or-town"
                v-model="formData.city_or_town"
                type="text"
                placeholder="Enter your city or town"
                required
                class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :class="{ 'border-red-500': errors.city_or_town }"
              />
              <p v-if="errors.city_or_town" class="mt-1 text-sm text-red-600">{{ errors.city_or_town }}</p>
            </div>
          </div>

          <div>
            <label for="user-type" class="block text-sm font-medium text-gray-700">I am a...</label>
            <select
              id="user-type"
              v-model="formData.user_type"
              required
              class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :class="{ 'border-red-500': errors.user_type }"
            >
              <option value="" disabled>Select your role</option>
              <option value="planner">Event Planner</option>
              <option value="vendor">Vendor</option>
              <option value="venue_manager">Venue Manager</option>
            </select>
            <p v-if="errors.user_type" class="mt-1 text-sm text-red-600">{{ errors.user_type }}</p>
          </div>

          <div v-if="formData.user_type === 'vendor'" class="space-y-6">
            <div>
              <label for="business-name" class="block text-sm font-medium text-gray-700">Business Name</label>
              <input
                id="business-name"
                v-model="formData.business_name"
                type="text"
                placeholder="Enter your business name"
                required
                class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :class="{ 'border-red-500': errors.business_name }"
              />
              <p v-if="errors.business_name" class="mt-1 text-sm text-red-600">{{ errors.business_name }}</p>
            </div>

            <div>
              <label for="service-type" class="block text-sm font-medium text-gray-700">Service Type</label>
              <select
                id="service-type"
                v-model="formData.service_type"
                required
                class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :class="{ 'border-red-500': errors.service_type }"
              >
                <option value="" disabled>Select service type</option>
                <option value="catering">Catering</option>
                <option value="photography">Photography</option>
                <option value="music">Music & Entertainment</option>
                <option value="decor">Decoration</option>
                <option value="planning">Planning & Coordination</option>
                <option value="other">Other</option>
              </select>
              <p v-if="errors.service_type" class="mt-1 text-sm text-red-600">{{ errors.service_type }}</p>
            </div>
          </div>

          <div class="mt-6 flex justify-between">
            <button
              type="button"
              @click="toggleEditMode"
              class="px-6 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const viewMode = ref(true); // Toggle between view and edit modes

const formData = ref({
  full_name: authStore.profile?.full_name || '',
  user_type: authStore.profile?.user_type || '',
  country: authStore.profile?.location?.split(', ')[1] || '',
  city_or_town: authStore.profile?.location?.split(', ')[0] || '',
  business_name: authStore.profile?.business_name || '',
  service_type: authStore.profile?.service_type || '',
});

const errors = ref({
  full_name: '',
  user_type: '',
  country: '',
  city_or_town: '',
  business_name: '',
  service_type: '',
});

const toggleEditMode = () => {
  viewMode.value = !viewMode.value;
};

const validateForm = () => {
  Object.keys(errors.value).forEach(key => (errors.value[key] = ''));
  let valid = true;

  if (!formData.value.full_name) {
    errors.value.full_name = 'Full name is required.';
    valid = false;
  }
  if (!formData.value.country) {
    errors.value.country = 'Country is required.';
    valid = false;
  }
  if (!formData.value.city_or_town) {
    errors.value.city_or_town = 'City or town is required.';
    valid = false;
  }
  if (formData.value.user_type === 'vendor') {
    if (!formData.value.business_name) {
      errors.value.business_name = 'Business name is required for vendors.';
      valid = false;
    }
    if (!formData.value.service_type) {
      errors.value.service_type = 'Service type is required for vendors.';
      valid = false;
    }
  }
  return valid;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  try {
    const updates = {
      full_name: formData.value.full_name,
      user_type: formData.value.user_type,
      location: `${formData.value.city_or_town}, ${formData.value.country}`,
      business_name: formData.value.business_name,
      service_type: formData.value.service_type,
    };

    await authStore.updateProfile(updates);
    alert('Profile updated successfully!');
    toggleEditMode();
  } catch (error) {
    console.error('Failed to update profile:', error);
    alert('Something went wrong. Please try again later.');
  }
};
</script>
