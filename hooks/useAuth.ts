// lib/hooks/useAuth.ts
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/auth/login',
  '/auth/forgot-password',
  '/auth/reset-password',
];

// Admin-only routes
const ADMIN_ROUTES = [
  '/dashboard/admin',
  '/users',
  '/settings',
  '/depots/new',
  '/reports',
];

export const useAuth = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  const { 
    user, 
    token, 
    isLoading, 
    error,
    login, 
    logout, 
    hasPermission,
    isAdmin,
    isInCharge,
    clearError 
  } = useAuthStore();

  // Check authentication on mount and route changes
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      
    };

    checkAuth();
  }, [pathname]);

  // Role-based route protection
  useEffect(() => {
    if (!isLoading) {
      const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));
      
      // If no user and not on public route → redirect to login
      if (!user && !isPublicRoute) {
        router.push('/auth/login');
        return;
      }

      // If user exists
      if (user) {
        // If on public route (login page) → redirect to dashboard
        if (isPublicRoute) {
          if (user.role === 'admin') {
            router.push('/dashboard/admin');
          } else if (user.role === 'in_charge' && user.depotId) {
            router.push(`/dashboard/depot/${user.depotId}`);
          }
          return;
        }

        // Check admin routes
        if (ADMIN_ROUTES.some(route => pathname.startsWith(route))) {
          if (user.role !== 'admin') {
            // In-charge trying to access admin route
            if (user.role === 'in_charge' && user.depotId) {
              router.push(`/dashboard/depot/${user.depotId}`);
            } else {
              router.push('/unauthorized');
            }
          }
        }

        // Check in-charge routes that require depot access
        if (pathname.startsWith('/dashboard/depot/')) {
          const depotIdFromUrl = pathname.split('/dashboard/depot/')[1]?.split('/')[0];
          
          if (user.role === 'in_charge') {
            if (!user.depotId) {
              router.push('/unauthorized');
            } else if (depotIdFromUrl && depotIdFromUrl !== user.depotId) {
              // Wrong depot - redirect to their depot
              router.push(`/dashboard/depot/${user.depotId}`);
            }
          } else if (user.role === 'admin') {
            // Admin can access any depot dashboard
            // But if no depot specified, redirect to admin dashboard
            if (!depotIdFromUrl) {
              router.push('/dashboard/admin');
            }
          }
        }

        // Check depot detail pages
        if (pathname.startsWith('/depots/') && pathname !== '/depots') {
          const depotIdFromUrl = pathname.split('/depots/')[1]?.split('/')[0];
          
          if (user.role === 'in_charge' && user.depotId && depotIdFromUrl !== user.depotId) {
            // In-charge trying to view wrong depot
            router.push(`/depots/${user.depotId}`);
          }
        }
      }
    }
  }, [user, isLoading, pathname, router]);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleLogin = async (username: string, password: string) => {
    const success = await login(username, password);
    
    if (success) {
      toast.success('Login successful!');
      return true;
    } else {
      toast.error(error || 'Login failed');
      return false;
    }
  };

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    router.push('/auth/login');
  };

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated: !!user,
    isAdmin,
    isInCharge,
    hasPermission: (role?: 'admin' | 'in_charge') => hasPermission(role),
    login: handleLogin,
    logout: handleLogout,
  };
};