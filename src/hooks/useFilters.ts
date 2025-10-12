import { useState, useMemo, useCallback } from 'react';

/**
 * Generic filter state management hook
 * Provides filter state and helpers for updating/clearing filters
 */
export function useFilters<T extends Record<string, any>>(
  initialFilters: T
) {
  const [filters, setFilters] = useState<T>(initialFilters);

  /**
   * Update a single filter
   */
  const updateFilter = useCallback(<K extends keyof T>(
    key: K,
    value: T[K]
  ) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  /**
   * Update multiple filters at once
   */
  const updateFilters = useCallback((newFilters: Partial<T>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
    }));
  }, []);

  /**
   * Clear all filters back to initial state
   */
  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  /**
   * Clear a specific filter
   */
  const clearFilter = useCallback(<K extends keyof T>(key: K) => {
    setFilters(prev => ({
      ...prev,
      [key]: initialFilters[key],
    }));
  }, [initialFilters]);

  /**
   * Check if any filters are active (different from initial)
   */
  const hasActiveFilters = useMemo(() => {
    return Object.keys(filters).some(
      key => filters[key] !== initialFilters[key]
    );
  }, [filters, initialFilters]);

  /**
   * Get count of active filters
   */
  const activeFilterCount = useMemo(() => {
    return Object.keys(filters).filter(
      key => filters[key] !== initialFilters[key] && filters[key] !== '' && filters[key] !== null
    ).length;
  }, [filters, initialFilters]);

  return {
    filters,
    updateFilter,
    updateFilters,
    clearFilters,
    clearFilter,
    hasActiveFilters,
    activeFilterCount,
  };
}

/**
 * Client-side filtering hook for arrays
 * Filters data based on a filter function
 */
export function useClientFilters<T, F extends Record<string, any>>(
  items: T[],
  filters: F,
  filterFunction: (item: T, filters: F) => boolean
) {
  const filteredItems = useMemo(() => {
    return items.filter(item => filterFunction(item, filters));
  }, [items, filters, filterFunction]);

  return filteredItems;
}