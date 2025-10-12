import { useState, useCallback, useEffect } from 'react';
import { transactionService } from '../services/transaction.service';
import { ChartData } from '../types/dashboard.types';
import type { TimeFilterValue } from '../types/dashboard.types';

/**
 * Hook for managing chart data
 * Fetches conversion trends over time
 */
export function useChartData(initialDays: TimeFilterValue = 7) {
  const [chartData, setChartData] = useState<ChartData>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDays, setSelectedDays] = useState<TimeFilterValue>(initialDays);

  /**
   * Fetch chart data for specified time period
   */
  const fetchChartData = useCallback(async (days: TimeFilterValue) => {
    setLoading(true);
    setError(null);

    try {
      const data = await transactionService.getChartData(days);
      setChartData(data);
      setSelectedDays(days);
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to fetch chart data';
      setError(errorMessage);
      setChartData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update time period and refetch
   */
  const updateTimePeriod = useCallback((days: TimeFilterValue) => {
    fetchChartData(days);
  }, [fetchChartData]);

  /**
   * Refresh current chart data
   */
  const refresh = useCallback(() => {
    fetchChartData(selectedDays);
  }, [fetchChartData, selectedDays]);

  // Initial fetch on mount
  useEffect(() => {
    fetchChartData(selectedDays);
  }, []); // Empty deps - only fetch once on mount

  return {
    chartData,
    loading,
    error,
    selectedDays,
    updateTimePeriod,
    refresh,
  };
}