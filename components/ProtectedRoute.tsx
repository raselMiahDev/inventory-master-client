// components/ProtectedRoute.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'in_charge';
  requiredDepot?: boolean; // For routes that need a depot context
}

export function ProtectedRoute({ 
  children, 
  requiredRole,
  requiredDepot = false 
}: ProtectedRouteProps) {
  const router = useRouter();
  const { user, isLoading, isAuthenticated, hasPermission } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/auth/login');
      } else if (requiredRole && !hasPermission(requiredRole)) {
        // Redirect to appropriate dashboard based on role
        if (user?.role === 'admin') {
          router.push('/dashboard/admin');
        } else if (user?.role === 'in_charge' && user.depotId) {
          router.push(`/dashboard/depot/${user.depotId}`);
        } else {
          router.push('/unauthorized');
        }
      } else if (requiredDepot && user?.role === 'in_charge' && !user.depotId) {
        router.push('/unauthorized');
      }
    }
  }, [isLoading, isAuthenticated, user, requiredRole, requiredDepot, router, hasPermission]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-sm text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requiredRole && !hasPermission(requiredRole)) {
    return null;
  }

  return <>{children}</>;
}