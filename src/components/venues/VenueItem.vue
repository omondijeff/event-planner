<!-- src/components/venues/VenueItem.vue -->
<script setup>
import { defineProps } from 'vue';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import ChevronDownIcon from '@heroicons/vue/solid/ChevronDownIcon';

// Define props to receive venue data
const props = defineProps({
  venue: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <Disclosure>
    <template #default="{ open }">
      <!-- Venue Button with Toggle -->
      <DisclosureButton class="flex items-center justify-between w-full p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200">
        <span class="text-lg font-semibold">{{ props.venue.name }}</span>
        <ChevronDownIcon :class="open ? 'rotate-180' : ''" class="w-5 h-5 transition-transform" />
      </DisclosureButton>

      <!-- Venue Details -->
      <DisclosurePanel class="p-4 bg-gray-50">
        <p class="mb-2"><strong>Description:</strong> {{ props.venue.description || 'No description available.' }}</p>
        <p class="mb-2"><strong>Capacity:</strong> {{ props.venue.capacity || 'N/A' }}</p>
        <p class="mb-2"><strong>Location:</strong> {{ props.venue.location || 'N/A' }}</p>
        <p class="mb-2"><strong>Amenities:</strong> <span v-if="props.venue.amenities && props.venue.amenities.length">{{ props.venue.amenities.join(', ') }}</span> <span v-else>No amenities listed.</span></p>

        <!-- Optional: Add Edit and Delete actions -->
        <button class="px-4 py-2 mr-2 text-white bg-blue-500 rounded" @click="$emit('edit', props.venue)">Edit</button>
        <button class="px-4 py-2 text-white bg-red-500 rounded" @click="$emit('delete', props.venue.id)">Delete</button>
      </DisclosurePanel>
    </template>
  </Disclosure>
</template>
