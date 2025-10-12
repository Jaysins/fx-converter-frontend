import { Currency } from './currency.types';

/**
 * Conversion request payload
 */
export interface ConversionRequest {
  amount: number;
  fromCurrency: Currency;
  toCurrency: Currency;
}

/**
 * Conversion response from backend
 */
export interface Conversion {
  id: string;
  amount: number;
  fromCurrency: Currency;
  toCurrency: Currency;
  conversionRate: number;
  convertedAmount: number;
  timestamp: string;
}

/**
 * Conversion form state
 */
export interface ConversionFormData {
  amount: string;
  fromCurrency: Currency;
  toCurrency: Currency;
}