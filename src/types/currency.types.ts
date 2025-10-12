import { SUPPORTED_CURRENCIES } from '../utils/constants';

/**
 * Currency type based on supported currencies
 */
export type Currency = typeof SUPPORTED_CURRENCIES[number];

/**
 * Currency pair structure
 */
export interface CurrencyPair {
  from: Currency;
  to: Currency;
}

/**
 * Currency option for dropdowns
 */
export interface CurrencyOption {
  value: Currency;
  label: string;
  symbol: string;
}