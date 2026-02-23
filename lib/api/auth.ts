import { apiClient } from './client';
import { LoginCredentials, RegisterCredentials, AuthResponse, User } from './types';
import { storage } from '../utils/storage';

export const authApi = {
  /**
   * Login user
   */
  login: async (credentials: LoginCredentials): Promise<User> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    
    if (response.success && response.data) {
      // Store token and user
      storage.setToken(response.data.token);
      storage.setUser(response.data.user);
      return response.data.user;
    }
    
    throw new Error(response.message || 'Login failed');
  },

  /**
   * Register new user (admin only)
   */
  register: async (credentials: RegisterCredentials): Promise<User> => {
    const response = await apiClient.post<AuthResponse>('/auth/register', credentials);
    
    if (response.success && response.data) {
      return response.data.user;
    }
    
    throw new Error(response.message || 'Registration failed');
  },

  /**
   * Get current user profile
   */
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<AuthResponse>('/auth/profile');
    
    if (response.success && response.data) {
      storage.setUser(response.data.user);
      return response.data.user;
    }
    
    throw new Error(response.message || 'Failed to get profile');
  },

  /**
   * Logout user
   */
  logout: (): void => {
    storage.clearAuth();
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!storage.getToken();
  },

  /**
   * Get current user from storage
   */
  getCurrentUser: <T = User>(): T | null => {
    return storage.getUser<T>();
  }
};