import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { supabase } from "@/lib/supabase";
import { Logger } from "@/utils/logger";
import type { Database } from "@/lib/database.types";

type InventoryItem = Database["public"]["Tables"]["inventory"]["Row"];

export const useInventoryStore = defineStore("inventory", () => {
  // State
  const inventory = ref<InventoryItem[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Computed Properties
  const hasInventory = computed(() => inventory.value.length > 0);

  // Fetch Inventory
  async function fetchInventory(vendorId: string | null = null) {
    loading.value = true;
    error.value = null;
    Logger.info("Fetching inventory items...", { vendorId });

    try {
      let query = supabase.from("inventory").select("*");
      if (vendorId) query = query.eq("vendor_id", vendorId);

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      inventory.value = data || [];
      Logger.info("Successfully fetched inventory items", { count: inventory.value.length });
    } catch (err) {
      error.value = `Error fetching inventory: ${(err as Error).message}`;
      Logger.error("Failed to fetch inventory", err, { vendorId });
    } finally {
      loading.value = false;
    }
  }

  // Add Inventory Item
  async function addInventoryItem(item: Omit<InventoryItem, "id" | "created_at" | "updated_at">) {
    loading.value = true;
    error.value = null;
    Logger.info("Adding inventory item...", { item });

    try {
      const { data, error: insertError } = await supabase
        .from("inventory")
        .insert(item)
        .select()
        .single();

      if (insertError) throw insertError;

      inventory.value.push(data);
      Logger.info("Inventory item added successfully", { itemId: data.id });
    } catch (err) {
      error.value = `Error adding inventory item: ${(err as Error).message}`;
      Logger.error("Failed to add inventory item", err, { item });
    } finally {
      loading.value = false;
    }
  }

  // Update Inventory Item
  async function updateInventoryItem(
    itemId: string,
    updates: Partial<InventoryItem>
  ) {
    loading.value = true;
    error.value = null;
    Logger.info("Updating inventory item...", { itemId, updates });

    try {
      const { data, error: updateError } = await supabase
        .from("inventory")
        .update(updates)
        .eq("id", itemId)
        .select()
        .single();

      if (updateError) throw updateError;

      const index = inventory.value.findIndex((item) => item.id === itemId);
      if (index !== -1) inventory.value[index] = data;

      Logger.info("Inventory item updated successfully", { itemId });
    } catch (err) {
      error.value = `Error updating inventory item: ${(err as Error).message}`;
      Logger.error("Failed to update inventory item", err, { itemId, updates });
    } finally {
      loading.value = false;
    }
  }

  // Delete Inventory Item
  async function deleteInventoryItem(itemId: string) {
    loading.value = true;
    error.value = null;
    Logger.info("Deleting inventory item...", { itemId });

    try {
      const { error: deleteError } = await supabase
        .from("inventory")
        .delete()
        .eq("id", itemId);

      if (deleteError) throw deleteError;

      inventory.value = inventory.value.filter((item) => item.id !== itemId);
      Logger.info("Inventory item deleted successfully", { itemId });
    } catch (err) {
      error.value = `Error deleting inventory item: ${(err as Error).message}`;
      Logger.error("Failed to delete inventory item", err, { itemId });
    } finally {
      loading.value = false;
    }
  }

  return {
    inventory,
    loading,
    error,
    hasInventory,
    fetchInventory,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
  };
});
