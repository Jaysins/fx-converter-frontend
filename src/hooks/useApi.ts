import { useState, useCallback } from 'react';
import { ApiState } from '../types/api.types';

/**
 * Generic hook for managing API call states (loading, error, data)
 * Provides consistent state management across all API interactions
 */
export function useApi<T>() {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  /**
   * Execute an API call with automatic state management
   */
  const execute = useCallback(async (
    apiCall: () => Promise<T>
  ): Promise<T | null> => {
    setState({ data: null, loading: true, error: null });

    try {
      const data = await apiCall();
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred';
      
      setState({ data: null, loading: false, error: errorMessage });
      throw error;
    }
  }, []);

  /**
   * Reset state to initial values
   */
  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  /**
   * Set data manually (useful for optimistic updates)
   */
  const setData = useCallback((data: T | null) => {
    setState(prev => ({ ...prev, data }));
  }, []);

  /**
   * Set error manually
   */
  const setError = useCallback((error: string) => {
    setState(prev => ({ ...prev, error, loading: false }));
  }, []);

  return {
    ...state,
    execute,
    reset,
    setData,
    setError,
  };
}

/**
 * Hook variant for paginated API calls
 * Manages pagination state alongside data/loading/error
 */
export function usePaginatedApi<T>() {
  const api = useApi<T[]>();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
    total: 0,
  });

  const execute = useCallback(async (
    apiCall: () => Promise<{
      data: T[];
      pagination: {
        page: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
        total: number;
      };
    }>
  ) => {
    try {
      api.reset();
      setState(prev => ({ ...prev, loading: true }));
      
      const response = await apiCall();
      
      api.setData(response.data);
      setPagination({
        currentPage: response.pagination.page,
        totalPages: response.pagination.totalPages,
        hasNextPage: response.pagination.hasNextPage,
        hasPrevPage: response.pagination.hasPrevPage,
        total: response.pagination.total,
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred';
      api.setError(errorMessage);
      throw error;
    }
  }, [api]);

  // Fix: Create local state for loading since we need to track it
  const [state, setState] = useState({
    loading: false,
  });

  return {
    data: api.data,
    loading: state.loading,
    error: api.error,
    pagination,
    execute,
    reset: api.reset,
  };
}