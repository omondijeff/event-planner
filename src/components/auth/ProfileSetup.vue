<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Complete your profile
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Tell us a bit about yourself to get started
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="handleSubmit">
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
                @change="resetConditionalFields"
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
              v-if="step === 2"
              type="submit"
              :disabled="authStore.loading"
              class="ml-auto py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              <span v-if="authStore.loading">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Completing Setup...
              </span>
              <span v-else>Complete Setup</span>
            </button>
          </div>

          <!-- Error Message -->
          <div v-if="authStore.error" class="mt-4 rounded-md bg-red-50 p-4">
            <p class="text-sm text-red-700">{{ authStore.error }}</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { z } from 'zod'

const authStore = useAuthStore()
const router = useRouter()

const step = ref(1)
const formData = ref({
  full_name: '',
  user_type: '',
  country: '',
  city_or_town: '',
  business_name: '',
  service_type: '',
})

const errors = ref({
  full_name: '',
  user_type: '',
  country: '',
  city_or_town: '',
  business_name: '',
  service_type: '',
})

const baseSchema = z.object({
  full_name: z.string().min(2, 'Full name must be at least 2 characters'),
  user_type: z.enum(['planner', 'vendor', 'venue_manager'], {
    errorMap: () => ({ message: 'Please select a valid user type' }),
  }),
  country: z.string().min(2, 'Please enter a valid country'),
  city_or_town: z.string().min(2, 'Please enter a valid city or town'),
})

const vendorSchema = baseSchema.extend({
  business_name: z.string().min(2, 'Business name must be at least 2 characters'),
  service_type: z.string().min(1, 'Please select a service type'),
})

const validateForm = () => {
  clearErrors()
  const schema = formData.value.user_type === 'vendor' ? vendorSchema : baseSchema
  try {
    schema.parse(formData.value)
    return true
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach(err => {
        errors.value[err.path[0]] = err.message
      })
    }
    return false
  }
}

const clearErrors = () => {
  Object.keys(errors.value).forEach(key => {
    errors.value[key] = ''
  })
}

const resetConditionalFields = () => {
  if (formData.value.user_type !== 'vendor') {
    formData.value.business_name = ''
    formData.value.service_type = ''
  }
}

const nextStep = () => {
  if (step.value === 1 && validateForm()) {
    step.value++
  }
}

const handleSubmit = async () => {
  if (!validateForm()) return

  try {
    await authStore.updateProfile({
      full_name: formData.value.full_name,
      user_type: formData.value.user_type,
      country: formData.value.country,
      city_or_town: formData.value.city_or_town,
    })

    if (formData.value.user_type === 'vendor') {
      await authStore.createVendorProfile({
        business_name: formData.value.business_name,
        service_type: formData.value.service_type,
      })
    }

    router.push('/dashboard')
  } catch (error) {
    authStore.error = error instanceof Error ? error.message : 'An error occurred'
  }
}
</script>
