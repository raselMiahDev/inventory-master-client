// lib/api/client.ts
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { storage } from '../utils/storage';
import { handleApiError } from '../utils/errorHandler';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 🔍 DEBUG: Check all possible token sources
        if (typeof window !== 'undefined') {
          console.log('🔍 Checking token sources:');
          console.log('- Direct localStorage:', localStorage.getItem('auth_token'));
          
          const authStorage = localStorage.getItem('auth-storage');
          if (authStorage) {
            try {
              const parsed = JSON.parse(authStorage);
              console.log('- Zustand storage:', parsed?.state?.token);
            } catch (e) {
              console.log('- Zustand storage: Error parsing');
            }
          }
        }

        const token = storage.getToken();
        
        if (token) {
          console.log('✅ Token found:', token.substring(0, 20) + '...');
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          console.log('❌ No token found in storage');
        }
        
        return config;
      },
      (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`✅ API Success [${response.config.method?.toUpperCase()}] ${response.config.url}:`, response.status);
        return response;
      },
      (error) => {
        console.error('❌ API Error:', {
          url: error.config?.url,
          method: error.config?.method,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.config?.headers,
        });

        const appError = handleApiError(error);
        
        // Handle 401 Unauthorized
        if (appError.statusCode === 401) {
          console.log('🔄 401 detected - clearing auth and redirecting');
          storage.clearAuth();
          
          // Redirect to login if not already there
          if (typeof window !== 'undefined' && !window.location.pathname.includes('/auth')) {
            window.location.href = '/auth/login';
          }
        }
        
        return Promise.reject(appError);
      }
    );
  }

  public async get<T>(url: string, params?: any): Promise<T> {
    try {
      console.log(`🚀 GET Request: ${url}`, params);
      const response = await this.client.get<T>(url, { params });
      return response.data;
    } catch (error) {
      console.error(`GET Failed: ${url}`, error);
      throw error;
    }
  }

  public async post<T>(url: string, data?: any): Promise<T> {
    try {
      console.log(`🚀 POST Request: ${url}`, data);
      const response = await this.client.post<T>(url, data);
      return response.data;
    } catch (error) {
      console.error(`POST Failed: ${url}`, error);
      throw error;
    }
  }

  public async put<T>(url: string, data?: any): Promise<T> {
    try {
      console.log(`🚀 PUT Request: ${url}`, data);
      const response = await this.client.put<T>(url, data);
      return response.data;
    } catch (error) {
      console.error(`PUT Failed: ${url}`, error);
      throw error;
    }
  }

  public async patch<T>(url: string, data?: any): Promise<T> {
    try {
      console.log(`🚀 PATCH Request: ${url}`, data);
      const response = await this.client.patch<T>(url, data);
      return response.data;
    } catch (error) {
      console.error(`PATCH Failed: ${url}`, error);
      throw error;
    }
  }

  public async delete<T>(url: string): Promise<T> {
    try {
      console.log(`🚀 DELETE Request: ${url}`);
      const response = await this.client.delete<T>(url);
      return response.data;
    } catch (error) {
      console.error(`DELETE Failed: ${url}`, error);
      throw error;
    }
  }
}

export const apiClient = new ApiClient();