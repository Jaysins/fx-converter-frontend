import { Transaction } from './transaction.types';

/**
 * Currency pair statistics
 */
export interface CurrencyPairStats {
  currencyPair: string;
  totalAmount: number;
  totalConverted: number;
  count: number;
}

/**
 * Dashboard summary data
 */
export interface DashboardSummary {
  totalConversions: number;
  totalAmount: number;
  uniqueCurrencyPairs: number;
}

/**
 * Complete dashboard stats response
 */
export interface DashboardStats {
  totalByCurrency: CurrencyPairStats[];
  recentTransactions: Transaction[];
  summary: DashboardSummary;
}

/**
 * Chart data point
 */
export interface ChartDataPoint {
  date: string;
  count: number;
  totalAmount: number;
}

/**
 * Chart data array
 */
export type ChartData = ChartDataPoint[];

/**
 * Time filter value
 */
export type TimeFilterValue = 7 | 30 | 90 | 365;