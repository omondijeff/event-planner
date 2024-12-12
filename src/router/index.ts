import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { hasAccess } from "@/utils/accessControl";
import type { UserRole } from "@/utils/accessControl";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/components/auth/LoginForm.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/components/auth/RegisterForm.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/profile-setup",
    name: "profile-setup",
    component: () => import("@/components/auth/ProfileSetup.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/views/Dashboard.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/inventory",
    name: "inventory",
    component: () => import("@/views/InventoryPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/vendor-dashboard",
    name: "VendorDashboard",
    component: () => import("@/views/VendorDashboard.vue"),
    meta: { requiresAuth: true, allowedRoles: ["vendor"] },
  },
  {
    path: "/venues",
    name: "VenueManagement",
    component: () => import("@/views/VenueDashboard.vue"),
    meta: { requiresAuth: true, allowedRoles: ["venue_manager", "admin"] },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Combined Navigation Guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Ensure the user is authenticated and profile is initialized
  if (!authStore.user && !authStore.profile) {
    await authStore.initialize();
  }

  // Check for authenticated routes
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next("/login");
  }

  // Prevent authenticated users from accessing guest routes
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    return next("/dashboard");
  }

  // Check role-based access control for allowed roles
  if (to.meta.allowedRoles) {
    const userRole = authStore.profile?.user_type as UserRole | null;
    const allowedRoles = to.meta.allowedRoles as UserRole[];
    if (!hasAccess(userRole, allowedRoles)) {
      return next("/dashboard"); // Redirect unauthorized users
    }
  }

  // Proceed to the route
  next();
});

export default router;
