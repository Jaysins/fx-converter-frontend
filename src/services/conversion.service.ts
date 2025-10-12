import api from './api';
import { ApiResponse } from '../types/api.types';
import { Conversion, ConversionRequest } from '../types/conversion.types';
import { SUPPORTED_CURRENCIES } from '../utils/constants';
import type { Currency } from '../types/currency.types';

/**
 * Conversion service - handles currency conversion API calls
 */
class ConversionService {
  /**
   * Create a new currency conversion
   */
  async createConversion(data: ConversionRequest): Promise<Conversion> {
    const response = await api.post<ApiResponse<Conversion>>(
      '/conversions',
      data
    );
    return response.data.data;
  }

  /**
   * Get list of supported currencies
   * (Hardcoded as per backend documentation)
   */
  getSupportedCurrencies(): Currency[] {
    return [...SUPPORTED_CURRENCIES];
  }

  /**
   * Validate conversion request data
   */
  validateConversionRequest(data: ConversionRequest): {
    isValid: boolean;
    errors: Record<string, string>;
  } {
    const errors: Record<string, string> = {};

    // Validate amount
    if (!data.amount || data.amount <= 0) {
      errors.amount = 'Amount must be greater than 0';
    }

    if (!isFinite(data.amount)) {
      errors.amount = 'Amount must be a valid number';
    }

    // Validate currencies
    if (!data.fromCurrency) {
      errors.fromCurrency = 'Source currency is required';
    } else if (!SUPPORTED_CURRENCIES.includes(data.fromCurrency as any)) {
      errors.fromCurrency = 'Unsupported source currency';
    }

    if (!data.toCurrency) {
      errors.toCurrency = 'Target currency is required';
    } else if (!SUPPORTED_CURRENCIES.includes(data.toCurrency as any)) {
      errors.toCurrency = 'Unsupported target currency';
    }

    // Check if currencies are the same
    if (data.fromCurrency === data.toCurrency) {
      errors.toCurrency = 'Target currency must be different from source currency';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}

// Export singleton instance
export const conversionService = new ConversionService();