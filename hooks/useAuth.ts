// lib/hooks/useAuth.ts
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '../store/authStore';

// Public routes that don't need authentication
const PUBLIC_ROUTES = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
];

// Admin only routes
const ADMIN_ROUTES = [
  '/dashboard/admin',
  '/users',
  '/settings',
  '/depots/new',
  '/reports',
  '/admin',
];

export const useAuth = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, token, isLoading, login, logout, checkAuth, error, clearError } = useAuthStore();

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Handle routing based on auth state
  useEffect(() => {
    if (!isLoading) {
      const isPublicRoute = PUBLIC_ROUTES.some(route => pathname?.startsWith(route));
      
      console.log('Route check:', {
        pathname,
        isPublicRoute,
        isAuthenticated: !!user,
        userRole: user?.role,
        isLoading
      });

      // Case 1: No user and not on public route → redirect to login
      if (!user && !isPublicRoute) {
        console.log('🔴 Not authenticated, redirecting to login');
        router.push('/auth/login');
        return;
      }

      // Case 2: User exists
      if (user) {
        // If on public route (login page) → redirect to appropriate dashboard
        if (isPublicRoute) {
          console.log('🟢 Authenticated user on public route, redirecting to dashboard');
          if (user.role === 'admin') {
            router.push('/dashboard/admin');
          } else if (user.role === 'in_charge' && user.depotId) {
            router.push(`/dashboard/depot/${user.depotId}`);
          }
          return;
        }

        // Check admin routes
        if (ADMIN_ROUTES.some(route => pathname?.startsWith(route))) {
          if (user.role !== 'admin') {
            console.log('🔴 Non-admin trying to access admin route');
            // Redirect in-charge to their depot dashboard
            if (user.role === 'in_charge' && user.depotId) {
              router.push(`/dashboard/depot/${user.depotId}`);
            } else {
              router.push('/unauthorized');
            }
          }
          return;
        }

        // Check in-charge depot routes
        if (pathname?.startsWith('/dashboard/depot/')) {
          const depotIdFromUrl = pathname.split('/dashboard/depot/')[1]?.split('/')[0];
          
          if (user.role === 'in_charge') {
            if (!user.depotId) {
              console.log('🔴 In-charge has no depot assigned');
              router.push('/unauthorized');
            } else if (depotIdFromUrl && depotIdFromUrl !== user.depotId) {
              console.log('🔴 Wrong depot access, redirecting to correct depot');
              router.push(`/dashboard/depot/${user.depotId}`);
            }
          }
          // Admin can access any depot dashboard
          return;
        }

        // Check depot detail pages
        if (pathname?.startsWith('/depots/') && pathname !== '/depots') {
          const depotIdFromUrl = pathname.split('/depots/')[1]?.split('/')[0];
          
          if (user.role === 'in_charge' && user.depotId && depotIdFromUrl !== user.depotId) {
            console.log('🔴 Wrong depot detail access');
            router.push(`/depots/${user.depotId}`);
          }
        }
      }
    }
  }, [user, isLoading, pathname, router]);

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isInCharge: user?.role === 'in_charge',
    login,
    logout,
    checkAuth,
    clearError,
  };
};