import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/authStore';
import { authApi } from '../lib/api/auth';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const router = useRouter();
  const { 
    user, 
    isLoading, 
    error, 
    login, 
    logout, 
    setUser,
    clearError 
  } = useAuthStore();

  /**
   * Handle login with toast notifications
   */
  const handleLogin = async (username: string, password: string) => {
    try {
      await login(username, password);
      toast.success('Login successful!');
      router.push('/');
      return true;
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
      return false;
    }
  };

  /**
   * Handle logout
   */
  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/auth/login');
  };

  /**
   * Check authentication status
   */
  const checkAuth = async () => {
    if (authApi.isAuthenticated() && !user) {
      try {
        const userData = await authApi.getProfile();
        setUser(userData);
      } catch (error) {
        // If profile fetch fails, logout
        handleLogout();
      }
    }
  };

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isInCharge: user?.role === 'in_charge',
    login: handleLogin,
    logout: handleLogout,
    checkAuth,
  };
};