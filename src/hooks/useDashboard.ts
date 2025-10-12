import { useState, useCallback, useEffect } from 'react';
import { transactionService } from '../services/transaction.service';
import { DashboardStats } from '../types/dashboard.types';
import type { TimeFilterValue } from '../types/dashboard.types';

/**
 * Hook for managing dashboard statistics
 * Handles fetching stats with time period filters
 */
export function useDashboardStats(initialDays: TimeFilterValue = 30) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDays, setSelectedDays] = useState<TimeFilterValue>(initialDays);

  /**
   * Fetch dashboard statistics
   */
  const fetchStats = useCallback(async (days: TimeFilterValue) => {
    setLoading(true);
    setError(null);

    try {
      const data = await transactionService.getStats(days);
      setStats(data);
      setSelectedDays(days);
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to fetch dashboard statistics';
      setError(errorMessage);
      setStats(null);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update time period filter
   */
  const updateTimePeriod = useCallback((days: TimeFilterValue) => {
    fetchStats(days);
  }, [fetchStats]);

  /**
   * Refresh current stats
   */
  const refresh = useCallback(() => {
    fetchStats(selectedDays);
  }, [fetchStats, selectedDays]);

  // Initial fetch on mount
  useEffect(() => {
    fetchStats(selectedDays);
  }, []); // Empty deps - only fetch once on mount

  return {
    stats,
    loading,
    error,
    selectedDays,
    updateTimePeriod,
    refresh,
  };
}

/**
 * Hook for fetching recent transactions (dashboard widget)
 */
export function useRecentTransactions(limit: number = 10) {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecent = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await transactionService.getRecentTransactions(limit);
      setTransactions(data);
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to fetch recent transactions';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchRecent();
  }, [fetchRecent]);

  return {
    transactions,
    loading,
    error,
    refresh: fetchRecent,
  };
}