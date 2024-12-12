<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Inventory Management</h1>
  
      <!-- Error Message -->
      <div v-if="error" class="bg-red-100 text-red-700 p-4 mb-4 rounded">
        {{ error }}
      </div>
  
      <!-- Add Inventory Button -->
      <button
        class="bg-blue-500 text-white py-2 px-4 rounded mb-6"
        @click="openInventoryForm"
      >
        Add New Item
      </button>
  
      <!-- Inventory List -->
      <div v-if="loading" class="text-gray-500">Loading inventory...</div>
      <div v-else-if="inventory.length === 0" class="text-gray-500">
        No inventory items found. Add new items to get started.
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="item in inventory"
          :key="item.id"
          class="p-4 border rounded shadow"
        >
          <h2 class="text-lg font-bold">{{ item.name }}</h2>
          <p class="text-sm text-gray-500">
            Type: {{ item.type }} | Quantity: {{ item.quantity }}
          </p>
          <p class="text-sm text-gray-500">
            Dimensions: {{ item.dimensions.width }}m x {{ item.dimensions.height }}m x {{ item.dimensions.depth }}m
          </p>
          <p class="text-sm text-gray-500" v-if="item.capacity">
            Capacity: {{ item.capacity }}
          </p>
  
          <div class="mt-4 flex space-x-2">
            <button
              class="bg-green-500 text-white py-1 px-3 rounded"
              @click="editInventoryItem(item)"
            >
              Edit
            </button>
            <button
              class="bg-red-500 text-white py-1 px-3 rounded"
              @click="deleteInventoryItem(item.id)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
  
      <!-- Inventory Form Modal -->
      <InventoryForm
        v-if="isFormOpen"
        :item="selectedItem"
        @close="closeInventoryForm"
        @saved="fetchInventory"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useInventoryStore } from "@/stores/inventory";
  import InventoryForm from "@/components/inventory/InventoryForm.vue";
  
  const inventoryStore = useInventoryStore();
  const { inventory, fetchInventory, deleteInventoryItem, loading, error } = inventoryStore;
  
  const isFormOpen = ref(false);
  const selectedItem = ref(null);
  
  onMounted(() => {
    fetchInventory();
  });
  
  const openInventoryForm = () => {
    selectedItem.value = null;
    isFormOpen.value = true;
  };
  
  const editInventoryItem = (item) => {
    selectedItem.value = item;
    isFormOpen.value = true;
  };
  
  const closeInventoryForm = () => {
    isFormOpen.value = false;
    selectedItem.value = null;
  };
  </script>
  
  <style scoped>
  /* Add page styles here */
  </style>
  