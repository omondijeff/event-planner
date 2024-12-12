import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { supabase } from '@/lib/supabase';

type StagingElement = {
  id: string; // Unique identifier
  type: string; // e.g., 'table', 'chair', 'stage'
  position: { x: number; y: number }; // Position on the canvas
  dimensions: { width: number; height: number }; // Size of the element
  rotation?: number; // Optional rotation angle
};

type Layout = {
  id: string;
  name: string; // Layout name for identification
  elements: StagingElement[];
  venueId: string; // Associated venue ID
  createdAt?: string; // Timestamp
  updatedAt?: string; // Timestamp
};

export const useStagingStore = defineStore('staging', () => {
  const elements = ref<StagingElement[]>([]);
  const currentLayout = ref<Layout | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const hasElements = computed(() => elements.value.length > 0);

  // Fetch all saved layouts for the current user or venue
  async function fetchLayouts(venueId: string) {
    loading.value = true;
    error.value = null;

    try {
      const { data, error: fetchError } = await supabase
        .from('layouts')
        .select('*')
        .eq('venueId', venueId);

      if (fetchError) throw fetchError;

      return data as Layout[];
    } catch (err) {
      error.value = `Error fetching layouts: ${(err as Error).message}`;
      return [];
    } finally {
      loading.value = false;
    }
  }

  // Save a new layout or update an existing one
  async function saveLayout(name: string, venueId: string) {
    loading.value = true;
    error.value = null;

    try {
      const layoutData = {
        name,
        elements: elements.value,
        venueId,
        updatedAt: new Date().toISOString(),
      };

      if (currentLayout.value?.id) {
        // Update existing layout
        const { error: updateError } = await supabase
          .from('layouts')
          .update(layoutData)
          .eq('id', currentLayout.value.id);

        if (updateError) throw updateError;

        currentLayout.value = { ...currentLayout.value, ...layoutData };
      } else {
        // Insert a new layout
        const { data, error: insertError } = await supabase
          .from('layouts')
          .insert(layoutData)
          .select()
          .single();

        if (insertError) throw insertError;

        currentLayout.value = data as Layout;
      }
    } catch (err) {
      error.value = `Error saving layout: ${(err as Error).message}`;
    } finally {
      loading.value = false;
    }
  }

  // Load a layout into the staging tool
  async function loadLayout(layoutId: string) {
    loading.value = true;
    error.value = null;

    try {
      const { data, error: fetchError } = await supabase
        .from('layouts')
        .select('*')
        .eq('id', layoutId)
        .single();

      if (fetchError) throw fetchError;

      currentLayout.value = data as Layout;
      elements.value = currentLayout.value.elements || [];
    } catch (err) {
      error.value = `Error loading layout: ${(err as Error).message}`;
    } finally {
      loading.value = false;
    }
  }

  // Add a new element to the canvas
  function addElement(element: StagingElement) {
    elements.value.push(element);
  }

  // Update an existing element's properties
  function updateElement(id: string, updates: Partial<StagingElement>) {
    const index = elements.value.findIndex((el) => el.id === id);
    if (index !== -1) {
      elements.value[index] = { ...elements.value[index], ...updates };
    }
  }

  // Remove an element from the canvas
  function removeElement(id: string) {
    elements.value = elements.value.filter((el) => el.id !== id);
  }

  // Clear all elements from the canvas
  function clearElements() {
    elements.value = [];
  }

  // Delete a saved layout
  async function deleteLayout(layoutId: string) {
    loading.value = true;
    error.value = null;

    try {
      const { error: deleteError } = await supabase
        .from('layouts')
        .delete()
        .eq('id', layoutId);

      if (deleteError) throw deleteError;

      if (currentLayout.value?.id === layoutId) {
        currentLayout.value = null;
        clearElements();
      }
    } catch (err) {
      error.value = `Error deleting layout: ${(err as Error).message}`;
    } finally {
      loading.value = false;
    }
  }

  return {
    elements,
    currentLayout,
    loading,
    error,
    hasElements,
    fetchLayouts,
    saveLayout,
    loadLayout,
    addElement,
    updateElement,
    removeElement,
    clearElements,
    deleteLayout,
  };
});
