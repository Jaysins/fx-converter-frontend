import { Currency } from './currency.types';

/**
 * Transaction object (same as Conversion but with additional fields)
 */
export interface Transaction {
  _id: string;
  userId?: string;
  amount: number;
  fromCurrency: Currency;
  toCurrency: Currency;
  conversionRate: number;
  convertedAmount: number;
  timestamp: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Transaction filters for querying
 */
export interface TransactionFilters {
  page?: number;
  limit?: number;
  fromCurrency?: Currency;
  toCurrency?: Currency;
  startDate?: string;
  endDate?: string;
}

/**
 * Transaction list state
 */
export interface TransactionListState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}