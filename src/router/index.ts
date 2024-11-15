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
      path: '/venues',
      name: 'VenueManagement',
      component: () => import('@/views/VenueManagement.vue'),
      meta: { requiresAuth: true, requiresVendor: true },
    },
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

  // Proceed to the route
  next();
});

export default router;
