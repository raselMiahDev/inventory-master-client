import { useState,useCallback } from "react";
import { apiClient } from '../lib/api/client';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../lib/utils/errorHandler';


interface UseApiOptions {
    showSuccessToast?: boolean;
    showErrorToast?: boolean;
    successMessage?: string;
}

export const useApi = <T = any>(options: UseApiOptions = {}) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {showSuccessToast=false,
        showErrorToast=false,
        successMessage="Operation successful"
    } = options;

     const execute = useCallback(async (
    apiCall: () => Promise<T>,
    customOptions?: Partial<UseApiOptions>
  ) => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiCall();
      setData(result);
      
      if (showSuccessToast || customOptions?.showSuccessToast) {
        toast.success(customOptions?.successMessage || successMessage);
      }
      
      return { success: true, data: result };
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      setError(errorMessage);
      
      if (showErrorToast && customOptions?.showErrorToast !== false) {
        toast.error(errorMessage);
      }
      
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [showSuccessToast, showErrorToast, successMessage]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    isLoading: loading,
    error,
    execute,
    reset,
    setData,
  };
}

