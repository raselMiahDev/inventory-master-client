
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const storage = {
  // Get token from localStorage
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    
    try {
      // First try direct token storage 
      let token = localStorage.getItem(TOKEN_KEY);
      
      // If not found, try to get from Zustand persist storage
      if (!token) {
        const authStorage = localStorage.getItem('auth-storage');
        if (authStorage) {
          const parsed = JSON.parse(authStorage);
          token = parsed?.state?.token || null;
          
          // If found in Zustand, also save directly for easier access
          if (token) {
            localStorage.setItem(TOKEN_KEY, token);
          }
        }
      }
      
      return token;
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  // Set token in both locations
  setToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error('Error setting token:', error);
    }
  },

  // Remove token
  removeToken: (): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error removing token:', error);
    }
  },

  // Get user
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
          
          // If found in Zustand, save directly
          if (userStr) {
            localStorage.setItem(USER_KEY, userStr);
          }
        }
      }
      
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  // Set user
  setUser: <T>(user: T): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error setting user:', error);
    }
  },

  // Clear all auth data
  clearAuth: (): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem('auth-storage');
    } catch (error) {
      console.error('Error clearing auth:', error);
    }
  }
};
