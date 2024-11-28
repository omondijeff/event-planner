// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/components/auth/LoginForm.vue'),
            meta: { requiresGuest: true },
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/components/auth/RegisterForm.vue'),
            meta: { requiresGuest: true },
        },
        {
            path: '/profile-setup',
            name: 'profile-setup',
            component: () => import('@/components/auth/ProfileSetup.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('@/views/Dashboard.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/',
            redirect: '/dashboard',
        },
        {
            path: '/vendor-dashboard',
            name: 'VendorDashboard',
            component: () => import('@/views/VendorDashboard.vue'),
            meta: { requiresAuth: true, requiresVendor: true },
        },
       

        {
            path: '/venues',  // Update this path to use the VenueList component
            name: 'VenueManagement',
            component: () => import('@/views/VenueManagement.vue'),  // Import VenueList.vue src\views\VenueManagement.vue
            meta: { requiresAuth: true, requiresVenueManager: true },  // Only Venue Managers
        },


        // {
        //     path: '/event-explorer',
        //     name: 'EventExplorer',
        //     component: () => import('@/components/events/EventExplorer.vue'),
        //     meta: { requiresAuth: true, requiresEventExplorer: true },  // Accessible by Event Planners and Vendors
        // }
        
    ],
});
// Combined Navigation Guard
router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();
    // Ensure the user is authenticated and profile is initialized
    if (!authStore.initialized) {
        await authStore.initialize();
    }
    // Check for authenticated routes
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return next('/login');
    }
    // Prevent authenticated users from accessing guest routes
    if (to.meta.requiresGuest && authStore.isAuthenticated) {
        return next('/dashboard');
    }
    // Restrict vendor-specific routes
    if (to.meta.requiresVendor && authStore.profile?.user_type !== 'vendor') {
        return next('/dashboard'); // Redirect non-vendors to a general dashboard
    }

    // Restrict access to Venue Management for Venue Managers only
    if (to.meta.requiresVenueManager && authStore.profile?.user_type !== 'venue_manager') {
        return next('/dashboard');  // Redirect non-Venue Managers to the dashboard
    }
    
    // You can add similar logic for Event Explorer if needed for Event Planners and Vendors
    if (to.meta.requiresEventExplorer && !['event_planner', 'vendor'].includes(authStore.profile?.user_type)) {
        return next('/dashboard');  // Redirect non-Event Planners or Vendors to the dashboard
    }
    // Proceed to the route
    next();
});
export default router;
