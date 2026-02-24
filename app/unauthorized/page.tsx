// app/unauthorized/page.tsx
'use client';

import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShieldAlert, Home } from 'lucide-react';
import Link from 'next/link';

export default function UnauthorizedPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
            <ShieldAlert className="h-12 w-12 text-red-600 dark:text-red-400" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Access Denied
        </h1>
        
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          You don't have permission to access this page.
          {user && (
            <> Your role is <span className="font-medium capitalize">{user.role}</span>.</>
          )}
        </p>

        <Link href={user?.role === 'admin' ? '/dashboard/admin' : `/dashboard/depot/${user?.depotId}`}>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
            <Home className="mr-2 h-4 w-4" />
            Go to Dashboard
          </Button>
        </Link>
      </Card>
    </div>
  );
}