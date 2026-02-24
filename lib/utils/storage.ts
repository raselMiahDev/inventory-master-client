// lib/utils/storage.ts
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const storage = {
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    
    // Try to get from multiple sources
    try {
      // First try direct localStorage
      let token = localStorage.getItem(TOKEN_KEY);
      
      // If not found, try to get from Zustand persist storage
      if (!token) {
        const authStorage = localStorage.getItem('auth-storage');
        if (authStorage) {
          const parsed = JSON.parse(authStorage);
          token = parsed?.state?.token || null;
        }
      }
      
      return token;
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  setToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error('Error setting token:', error);
    }
  },

  removeToken: (): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error removing token:', error);
    }
  },

  getUser: <T>(): T | null => {
    if (typeof window === 'undefined') return null;
    try {
      // Try direct user storage first
      let userStr = localStorage.getItem(USER_KEY);
      
      // If not found, try from Zustand
      if (!userStr) {
        const authStorage = localStorage.getItem('auth-storage');
        if (authStorage) {
          const parsed = JSON.parse(authStorage);
          userStr = parsed?.state?.user ? JSON.stringify(parsed.state.user) : null;
        }
      }
      
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  setUser: <T>(user: T): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error setting user:', error);
    }
  },

  removeUser: (): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(USER_KEY);
    } catch (error) {
      console.error('Error removing user:', error);
    }
  },

  clearAuth: (): void => {
    storage.removeToken();
    storage.removeUser();
    
    // Also clear Zustand storage
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('auth-storage');
      } catch (error) {
        console.error('Error clearing auth storage:', error);
      }
    }
  }
};