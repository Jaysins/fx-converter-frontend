/**
 * Application-wide constants
 */

// Supported currencies for FX conversion
export const SUPPORTED_CURRENCIES = [
  'USD',
  'EUR', 
  'GBP',
  'NGN',
  'JPY',
  'CAD',
  'AUD',
  'CHF',
  'CNY',
  'INR',
] as const;

export type SupportedCurrency = typeof SUPPORTED_CURRENCIES[number];

// Currency symbols mapping
export const CURRENCY_SYMBOLS: Record<SupportedCurrency, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  NGN: '₦',
  JPY: '¥',
  CAD: 'C$',
  AUD: 'A$',
  CHF: 'CHF',
  CNY: '¥',
  INR: '₹',
};

// Currency names for display
export const CURRENCY_NAMES: Record<SupportedCurrency, string> = {
  USD: 'US Dollar',
  EUR: 'Euro',
  GBP: 'British Pound',
  NGN: 'Nigerian Naira',
  JPY: 'Japanese Yen',
  CAD: 'Canadian Dollar',
  AUD: 'Australian Dollar',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan',
  INR: 'Indian Rupee',
};

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Time filter options for dashboard
export const TIME_FILTER_OPTIONS = [
  { label: 'Last 7 Days', value: 7 },
  { label: 'Last 30 Days', value: 30 },
  { label: 'Last 90 Days', value: 90 },
  { label: 'Last Year', value: 365 },
] as const;

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 50;

// Rate limit messages
export const RATE_LIMIT_MESSAGE = 'Too many requests. Please try again later.';
export const SESSION_EXPIRED_MESSAGE = 'Your session has expired. Please login again.';