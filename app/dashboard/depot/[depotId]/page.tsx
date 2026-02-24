'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import { useParams } from 'next/navigation';
import {authApi } from "@/lib/api/auth"
import { useEffect, useState } from 'react';

export default function DepotDashboard() {
  const { user } = useAuth();
  const params = useParams();


    const result = authApi.getDepoById("69840cd5ce4cc77ec8f2cda7")
    console.log(result)



  return (
    <ProtectedRoute requiredRole="in_charge">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Depot Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Welcome back, {user?.username}!
        </p>
        <p className="text-sm text-slate-500">
          Managing Depot: {params.depotId}
        </p>
      </div>
    </ProtectedRoute>
  );
}