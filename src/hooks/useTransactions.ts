import { useState, useCallback, useEffect } from 'react';
import { transactionService } from '../services/transaction.service';
import { Transaction, TransactionFilters } from '../types/transaction.types';
import { PaginationMeta } from '../types/api.types';

/**
 * Hook for managing transaction list with pagination and filters
 */
export function useTransactions(initialPage: number = 1, initialLimit: number = 10) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationMeta>({
    page: initialPage,
    limit: initialLimit,
    total: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [filters, setFilters] = useState<Partial<TransactionFilters>>({});

  /**
   * Fetch transactions with current page and filters
   */
  const fetchTransactions = useCallback(async (
    page?: number,
    customFilters?: Partial<TransactionFilters>
  ) => {
    setLoading(true);
    setError(null);

    try {
      const currentPage = page ?? pagination.page;
      const currentFilters = customFilters ?? filters;

      const response = await transactionService.getTransactions(
        currentPage,
        pagination.limit,
        currentFilters
      );

      setTransactions(response.data);
      setPagination(response.pagination);
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to fetch transactions';
      setError(errorMessage);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, filters]);

  /**
   * Go to specific page
   */
  const goToPage = useCallback((page: number) => {
    fetchTransactions(page);
  }, [fetchTransactions]);

  /**
   * Go to next page
   */
  const nextPage = useCallback(() => {
    if (pagination.hasNextPage) {
      goToPage(pagination.page + 1);
    }
  }, [pagination.hasNextPage, pagination.page, goToPage]);

  /**
   * Go to previous page
   */

  console.log(pagination)
  const prevPage = useCallback(() => {
    if (pagination.hasPrevPage) {
      goToPage(pagination.page - 1);
    }
  }, [pagination.hasPrevPage, pagination.page, goToPage]);

  /**
   * Update filters and refetch
   */
  const updateFilters = useCallback((newFilters: Partial<TransactionFilters>) => {
    setFilters(newFilters);
    fetchTransactions(1, newFilters); // Reset to page 1 when filters change
  }, [fetchTransactions]);

  /**
   * Clear filters and refetch
   */
  const clearFilters = useCallback(() => {
    setFilters({});
    fetchTransactions(1, {});
  }, [fetchTransactions]);

  /**
   * Refresh current page
   */
  const refresh = useCallback(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Initial fetch on mount
  useEffect(() => {
    fetchTransactions();
  }, []); // Empty deps - only fetch once on mount

  return {
    transactions,
    loading,
    error,
    pagination,
    filters,
    goToPage,
    nextPage,
    prevPage,
    updateFilters,
    clearFilters,
    refresh,
  };
}

/**
 * Hook for fetching a single transaction
 */
export function useTransaction(id: string) {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransaction = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const data = await transactionService.getTransactionById(id);
      setTransaction(data);
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to fetch transaction';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchTransaction();
  }, [fetchTransaction]);

  return {
    transaction,
    loading,
    error,
    refresh: fetchTransaction,
  };
}