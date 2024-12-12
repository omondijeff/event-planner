<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from "vue";
import { useInventoryStore } from "@/stores/inventory";
import type { Inventory } from "@/lib/database.types";

// Define Props
const props = defineProps<{
  item: Inventory | null;
}>();

// Define Emits
const emit = defineEmits(["close", "saved"]);

const inventoryStore = useInventoryStore();

// Initialize form data
const formData = ref<Partial<Inventory>>({
  name: "",
  type: "table", // Default type
  dimensions: { width: 0, height: 0, depth: 0 },
  quantity: 1,
  capacity: null,
});

// Watch the `props.item` for changes and initialize form data
watch(
  () => props.item,
  (newItem) => {
    if (newItem) {
      formData.value = {
        ...newItem,
        dimensions: { ...newItem.dimensions },
      };
    } else {
      // Reset form data for a new inventory item
      formData.value = {
        name: "",
        type: "table",
        dimensions: { width: 0, height: 0, depth: 0 },
        quantity: 1,
        capacity: null,
      };
    }
  },
  { immediate: true }
);

// Handle form submission
const handleSubmit = async () => {
  try {
    if (props.item) {
      // Update existing inventory item
      await inventoryStore.updateInventoryItem(props.item.id, formData.value as Inventory);
    } else {
      // Add a new inventory item
      await inventoryStore.addInventoryItem(formData.value as Inventory);
    }
    emit("saved");
    emit("close");
  } catch (err) {
    console.error("Failed to save inventory item:", err);
  }
};

// Helper methods to update dimensions reactively
const updateDimension = (key: "width" | "height" | "depth", value: number) => {
  formData.value.dimensions = { ...formData.value.dimensions, [key]: value };
};
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
      <h2 class="text-xl font-bold mb-4">
        {{ props.item ? "Edit Inventory Item" : "Add New Inventory Item" }}
      </h2>

      <!-- Inventory Form -->
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            required
            class="mt-1 block w-full border rounded px-3 py-2"
          />
        </div>

        <div class="mb-4">
          <label for="type" class="block text-sm font-medium text-gray-700">Type</label>
          <select
            id="type"
            v-model="formData.type"
            required
            class="mt-1 block w-full border rounded px-3 py-2"
          >
            <option value="table">Table</option>
            <option value="chair">Chair</option>
            <option value="decoration">Decoration</option>
            <option value="stage">Stage</option>
            <option value="lighting">Lighting</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div class="mb-4">
          <label for="dimensions" class="block text-sm font-medium text-gray-700">Dimensions (m)</label>
          <div class="grid grid-cols-3 gap-2">
            <input
              v-model.number="formData.dimensions.width"
              @input="updateDimension('width', $event.target.valueAsNumber)"
              type="number"
              placeholder="Width"
              class="border rounded px-3 py-2"
              required
            />
            <input
              v-model.number="formData.dimensions.height"
              @input="updateDimension('height', $event.target.valueAsNumber)"
              type="number"
              placeholder="Height"
              class="border rounded px-3 py-2"
              required
            />
            <input
              v-model.number="formData.dimensions.depth"
              @input="updateDimension('depth', $event.target.valueAsNumber)"
              type="number"
              placeholder="Depth"
              class="border rounded px-3 py-2"
              required
            />
          </div>
        </div>

        <div class="mb-4">
          <label for="quantity" class="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            id="quantity"
            v-model.number="formData.quantity"
            type="number"
            min="1"
            required
            class="mt-1 block w-full border rounded px-3 py-2"
          />
        </div>

        <div v-if="formData.type === 'table' || formData.type === 'chair'" class="mb-4">
          <label for="capacity" class="block text-sm font-medium text-gray-700">Capacity</label>
          <input
            id="capacity"
            v-model.number="formData.capacity"
            type="number"
            min="1"
            class="mt-1 block w-full border rounded px-3 py-2"
          />
        </div>

        <div class="flex justify-between">
          <button
            type="button"
            @click="$emit('close')"
            class="bg-gray-500 text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-blue-600 text-white py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Add modal styles here */
</style>
