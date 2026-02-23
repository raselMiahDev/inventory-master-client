export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  password: string;
  role: 'admin' | 'in_charge';
  depotId?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      username: string;
      role: 'admin' | 'in_charge';
      depotId?: string;
      isActive: boolean;
      createdAt: string;
      updatedAt: string;
    };
    token: string;
  };
}

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'in_charge';
  depotId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: any;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}