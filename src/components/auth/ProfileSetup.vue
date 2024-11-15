<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {{ isProfileComplete ? 'Profile Summary' : 'Complete Your Profile' }}
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        {{ isProfileComplete
          ? 'Your profile is already complete. Update any fields below if needed.'
          : 'Tell us a bit about yourself to get started.' }}
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <!-- Profile Summary -->
        <div v-if="isProfileComplete" class="space-y-4">
          <div>
            <h3 class="text-lg font-medium text-gray-800">Profile Details</h3>
            <p><strong>Full Name:</strong> {{ authStore.profile?.full_name }}</p>
            <p><strong>Location:</strong> {{ authStore.profile?.location }}</p>
            <p><strong>Role:</strong> {{ authStore.profile?.user_type }}</p>
            <p v-if="authStore.profile?.business_name"><strong>Business Name:</strong> {{ authStore.profile.business_name }}</p>
            <p v-if="authStore.profile?.service_type"><strong>Service Type:</strong> {{ authStore.profile.service_type }}</p>
          </div>
          <hr class="my-4">
          <p class="text-center text-gray-600">You can update any of the fields below.</p>
        </div>

        <!-- Profile Form -->
        <form v-if="!isProfileComplete || step === 2" @submit.prevent="handleSubmit">
          <!-- Step 1: Basic Info -->
          <div v-if="step === 1" class="space-y-6">
            <div>
              <label for="full-name" class="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                id="full-name"
                v-model="formData.full_name"
                type="text"
                required
                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                :class="{ 'border-red-500': errors.full_name }"
              />
              <p v-if="errors.full_name" class="mt-1 text-sm text-red-600">{{ errors.full_name }}</p>
            </div>

            <div>
              <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
              <input
                id="country"
                v-model="formData.country"
                type="text"
                required
                placeholder="Enter your country"
                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
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
                required
                placeholder="Enter your city or town"
                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                :class="{ 'border-red-500': errors.city_or_town }"
              />
              <p v-if="errors.city_or_town" class="mt-1 text-sm text-red-600">{{ errors.city_or_town }}</p>
            </div>
          </div>

          <!-- Step 2: User Type -->
          <div v-if="step === 2" class="space-y-6">
            <div>
              <label for="user-type" class="block text-sm font-medium text-gray-700">I am a...</label>
              <select
                id="user-type"
                v-model="formData.user_type"
                required
                class="mt-1 block w-full pl-3 pr-10 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                :class="{ 'border-red-500': errors.user_type }"
              >
                <option value="" disabled>Select your role</option>
                <option value="planner">Event Planner</option>
                <option value="vendor">Vendor</option>
                <option value="venue_manager">Venue Manager</option>
              </select>
              <p v-if="errors.user_type" class="mt-1 text-sm text-red-600">{{ errors.user_type }}</p>
            </div>

            <!-- Vendor-Specific Fields -->
            <div v-if="formData.user_type === 'vendor'">
              <label for="business-name" class="block text-sm font-medium text-gray-700">Business Name</label>
              <input
                id="business-name"
                v-model="formData.business_name"
                type="text"
                required
                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                :class="{ 'border-red-500': errors.business_name }"
              />
              <p v-if="errors.business_name" class="mt-1 text-sm text-red-600">{{ errors.business_name }}</p>

              <label for="service-type" class="block text-sm font-medium text-gray-700">Service Type</label>
              <select
                id="service-type"
                v-model="formData.service_type"
                required
                class="mt-1 block w-full pl-3 pr-10 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
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

          <!-- Navigation Buttons -->
          <div class="mt-6 flex justify-between">
            <button
              v-if="step > 1"
              type="button"
              @click="step--"
              class="py-2 px-4 border border-primary rounded-md shadow-sm text-sm font-medium text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Back
            </button>
            <button
              v-if="step < 2"
              type="button"
              @click="nextStep"
              class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Next
            </button>
            <button
              v-if="step === 2 || isProfileComplete"
              type="submit"
              class="ml-auto py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
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
import { useAuthStore } from '@/stores/auth';
import { ref, computed } from 'vue';
import { z } from 'zod';

const authStore = useAuthStore();

// Form state
const step = ref(1);
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

// Check if profile is complete
const isProfileComplete = computed(() => {
  const profile = authStore.profile;
  return (
    profile?.full_name &&
    profile?.user_type &&
    profile?.location &&
    (profile.user_type !== 'vendor' || (profile.business_name && profile.service_type))
  );
});

// Validation schemas
const baseSchema = z.object({
  full_name: z.string().min(2, 'Full name must be at least 2 characters'),
  country: z.string().min(2, 'Country must be at least 2 characters'),
  city_or_town: z.string().min(2, 'City/Town must be at least 2 characters'),
  user_type: z.union([z.enum(['planner', 'vendor', 'venue_manager']), z.literal('')]),
});

const vendorSchema = baseSchema.extend({
  business_name: z.string().min(2, 'Business name must be at least 2 characters'),
  service_type: z.string().min(1, 'Please select a service type'),
});

// Helper methods
const clearErrors = () => {
  Object.keys(errors.value).forEach(key => {
    errors.value[key] = '';
  });
};

const validateForm = () => {
  clearErrors();
  const schema = step.value === 1
    ? baseSchema.omit({ user_type: true })
    : formData.value.user_type === 'vendor'
    ? vendorSchema
    : baseSchema;

  try {
    schema.parse(formData.value);
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach(err => {
        errors.value[err.path[0]] = err.message;
      });
    }
    return false;
  }
};

const nextStep = () => {
  if (validateForm()) {
    step.value++;
  }
};

const handleSubmit = async () => {
  if (validateForm()) {
    try {
      authStore.loading = true;

      const updates: Record<string, any> = {};
      const newLocation = `${formData.value.city_or_town}, ${formData.value.country}`;

      if (formData.value.full_name !== authStore.profile?.full_name) {
        updates.full_name = formData.value.full_name;
      }
      if (formData.value.user_type !== authStore.profile?.user_type) {
        updates.user_type = formData.value.user_type;
      }
      if (newLocation !== authStore.profile?.location) {
        updates.location = newLocation;
      }
      if (formData.value.business_name !== authStore.profile?.business_name) {
        updates.business_name = formData.value.business_name;
      }
      if (formData.value.service_type !== authStore.profile?.service_type) {
        updates.service_type = formData.value.service_type;
      }

      if (Object.keys(updates).length === 0) {
        alert('No changes detected.');
        return;
      }

      await authStore.updateProfile(updates);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating your profile. Please try again.');
    } finally {
      authStore.loading = false;
    }
  }
};
</script>
