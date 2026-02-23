'use client';

import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  return <>{children}</>;
}