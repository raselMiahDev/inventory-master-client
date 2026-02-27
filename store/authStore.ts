// lib/store/authStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { apiClient } from '@/lib/api/client';
import { storage } from '@/lib/utils/storage';
import toast from 'react-hot-toast';

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'in_charge';
  depotId?: string;
  isActive: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: true, // Start with true to check auth
      error: null,

      login: async (username: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await apiClient.post<any>('/auth/login', {
            username,
            password,
          });

          console.log('Login response:', response);

          if (response.success && response.data) {
            const { user, token } = response.data;
            
            // IMPORTANT: Store token in both Zustand and direct localStorage
            set({ 
              user, 
              token, 
              isLoading: false,
              error: null 
            });
            
            // Also store directly for API client
            storage.setToken(token);
            storage.setUser(user);
            
            console.log('✅ Login successful:', { user, token: token?.substring(0, 20) + '...' });
            
            return true;
          } else {
            throw new Error(response.message || 'Login failed');
          }
        } catch (error: any) {
          console.error('Login error:', error);
          const message = error.response?.data?.message || error.message || 'Login failed';
          set({ error: message, isLoading: false });
          toast.error(message);
          return false;
        }
      },

      logout: async () => {
        try {
          // Call logout API if needed
          await apiClient.post('/auth/logout').catch(() => {});
        } finally {
          // Clear all storage
          storage.clearAuth();
          set({ user: null, token: null, isLoading: false });
          toast.success('Logged out successfully');
          
          // Redirect to login
          if (typeof window !== 'undefined') {
            window.location.href = '/auth/login';
          }
        }
      },

      checkAuth: async () => {
        const token = storage.getToken();
        const storedUser = storage.getUser<User>();
        
        console.log('Checking auth - Token:', token ? 'exists' : 'none');
        console.log('Checking auth - User:', storedUser);
        
        if (!token || !storedUser) {
          set({ user: null, token: null, isLoading: false });
          return;
        }

        // Set from storage first (fast UI update)
        set({ user: storedUser, token, isLoading: false });

        // Verify with backend
        try {
          const response = await apiClient.get<any>('/auth/profile');
          if (response.success && response.data) {
            const user = response.data.user || response.data;
            set({ user });
            storage.setUser(user);
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          // Don't logout on error - maybe token is still valid
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        user: state.user,
        token: state.token 
      }),
    }
  )
);