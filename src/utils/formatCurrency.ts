import { CURRENCY_SYMBOLS, type SupportedCurrency } from './constants';

/**
 * Format a number as currency with proper symbol and decimals
 */
export function formatCurrency(
  amount: number,
  currency: SupportedCurrency,
  options?: {
    showSymbol?: boolean;
    decimals?: number;
  }
): string {
  const { showSymbol = true, decimals = 2 } = options || {};
  
  const formattedAmount = amount.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  if (showSymbol) {
    const symbol = CURRENCY_SYMBOLS[currency];
    return `${symbol}${formattedAmount}`;
  }

  return formattedAmount;
}

/**
 * Format currency pair for display (e.g., "USD → NGN")
 */
export function formatCurrencyPair(
  fromCurrency: SupportedCurrency,
  toCurrency: SupportedCurrency
): string {
  return `${fromCurrency} → ${toCurrency}`;
}

/**
 * Parse string to number, handling invalid inputs
 */
export function parseCurrencyInput(value: string): number | null {
  const cleaned = value.replace(/[^0-9.]/g, '');
  const parsed = parseFloat(cleaned);
  
  return isNaN(parsed) ? null : parsed;
}

/**
 * Validate currency amount
 */
export function isValidAmount(amount: number): boolean {
  return amount > 0 && isFinite(amount) && !isNaN(amount);
}