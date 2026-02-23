'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { LoginForm } from '@/components/auth/LoginForm';
import { SocialAuth } from '@/components/auth/SocialAuth';
import { useAuth } from '@/hooks/useAuth';
import { ToastProvider } from '@/lib/utils/ToastProvider';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, login, isLoading } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (username: string, password: string) => {
    setLoginError(null);
    const success = await login(username, password);
    if (!success) {
      setLoginError('Invalid username or password');
    }
  };

  return (
    <>
      <ToastProvider />
      <AuthLayout
        title="Welcome Back"
        subtitle="Sign in to your account to continue"
      >
        <LoginForm 
          onSubmit={handleLogin}
          isLoading={isLoading}
          error={loginError}
        />
        <div className="mt-6">
          <SocialAuth />
        </div>
      </AuthLayout>
    </>
  );
}