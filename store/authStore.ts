// lib/store/authStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthResponse, User } from '@/types/auth';
import { apiClient } from '@/lib/api/client';
interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  //getProfile: () => Promise<void>;
  setUser: (user: User | null) => void;
  clearError: () => void;
  
  // Helpers
  isAdmin: boolean;
  isInCharge: boolean;
  hasPermission: (requiredRole?: 'admin' | 'in_charge') => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      // Computed properties
      get isAdmin() {
        return get().user?.role === 'admin';
      },

      get isInCharge() {
        return get().user?.role === 'in_charge';
      },

      hasPermission: (requiredRole?: 'admin' | 'in_charge') => {
        const user = get().user;
        if (!user) return false;
        if (!requiredRole) return true;
        return user.role === requiredRole;
      },

      login: async (username: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await apiClient.post<AuthResponse>('/auth/login', {
            username,
            password,
          });

          if (response.success) {
            const { user, token } = response.data;
            
            // Store in localStorage (persist middleware handles this)
            set({ 
              user, 
              token, 
              isLoading: false, 
              error: null 
            });
            
            // Also store token separately for easy access
            localStorage.setItem('auth_token', token);
            
            return true;
          } else {
            set({ 
              error: response.message || 'Login failed', 
              isLoading: false 
            });
            return false;
          }
        } catch (error: any) {
          const message = error.response?.data?.message || 'Login failed';
          set({ error: message, isLoading: false });
          return false;
        }
      },

      logout: async () => {
        try {
          // Call logout API if needed
          await apiClient.post('/auth/logout');
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          // Clear local storage
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth-storage'); // Zustand persist storage
          
          // Reset state
          set({ user: null, token: null, error: null });
        }
      },

      setUser: (user) => set({ user }),
      
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