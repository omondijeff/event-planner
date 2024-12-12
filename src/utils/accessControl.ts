// src/utils/accessControl.ts

// Define the valid user roles
export type UserRole = "admin" | "venue_manager" | "planner" | "vendor";

// Function to check if a user has access based on their role
/**
 * Determines if a user has access to a resource based on their role.
 * @param userType - The type of the authenticated user (e.g., "admin", "venue_manager").
 * @param allowedRoles - List of roles allowed to access the resource.
 * @returns True if the user has access, otherwise false.
 */
export function hasAccess(userType: UserRole | null, allowedRoles: UserRole[]): boolean {
  if (!userType) return false; // If userType is null, access is denied
  return allowedRoles.includes(userType);
}
