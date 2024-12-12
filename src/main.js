// src/main.ts
import { createApp } from 'vue'; // Import Vue's createApp function
import { createPinia } from 'pinia'; // Import Pinia for state management
import App from './App.vue'; // Import the root App component
import router from './router'; // Import Vue Router
import './assets/main.css'; // Import global styles, including Tailwind CSS
const app = createApp(App); // Create a new Vue application instance
const pinia = createPinia(); // Create a new Pinia store instance
app.use(pinia); // Use Pinia as a plugin
app.use(router); // Use Vue Router as a plugin
app.mount('#app'); // Mount the app to the #app element in index.html
