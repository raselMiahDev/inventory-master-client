import { AxiosError } from 'axios';
import { ApiError } from '../api/types';

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: any
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleApiError = (error: unknown): AppError => {
  if (error instanceof AxiosError) {
    const apiError = error.response?.data as ApiError;
    
    if (error.response?.status === 401) {
      return new AppError('Session expired. Please login again.', 401, error);
    }
    
    if (error.response?.status === 403) {
      return new AppError('You do not have permission to perform this action.', 403, error);
    }
    
    if (error.response?.status === 404) {
      return new AppError('Resource not found.', 404, error);
    }
    
    if (error.response?.status === 422) {
      return new AppError(apiError?.message || 'Validation failed.', 422, apiError?.errors);
    }
    
    if (error.response?.status === 500) {
      return new AppError('Server error. Please try again later.', 500, error);
    }
    
    return new AppError(
      apiError?.message || error.message || 'An unexpected error occurred',
      error.response?.status,
      error
    );
  }
  
  if (error instanceof Error) {
    return new AppError(error.message);
  }
  
  return new AppError('An unexpected error occurred');
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AppError) {
    return error.message;
  }
  
  if (error instanceof AxiosError) {
    return error.response?.data?.message || error.message || 'Request failed';
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
};