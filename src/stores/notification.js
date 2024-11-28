// src/stores/notification.js
import { ref } from 'vue';

export const useNotificationStore = () => {
  const messages = ref([]); // Queue of messages for toasts

  const addMessage = (message) => {
    messages.value.push(message);
    setTimeout(() => {
      messages.value.shift(); // Remove message after timeout (toast life span)
    }, 3000); // Toast duration (3 seconds)
  };

  const success = (message) => {
    addMessage(`Success: ${message}`);
  };

  const error = (message) => {
    addMessage(`Error: ${message}`);
  };

  const info = (message) => {
    addMessage(`Info: ${message}`);
  };

  return {
    messages,
    success,
    error,
    info,
  };
};
