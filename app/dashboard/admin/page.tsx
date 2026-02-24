// app/(dashboard)/dashboard/admin/page.tsx
'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <ProtectedRoute requiredRole="admin">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Admin Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Welcome back, {user?.username}!
        </p>
      </div>
    </ProtectedRoute>
  );
}