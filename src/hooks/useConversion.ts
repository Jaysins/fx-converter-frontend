import { useState, useCallback } from 'react';
import { conversionService } from '../services/conversion.service';
import { Conversion, ConversionRequest } from '../types/conversion.types';

/**
 * Hook for managing conversion operations
 * Handles creation, validation, and state management
 */
export function useConversion() {
  const [conversion, setConversion] = useState<Conversion | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  /**
   * Create a new conversion
   */
  const createConversion = useCallback(async (
    data: ConversionRequest
  ): Promise<Conversion | null> => {
    // Validate before sending
    const validation = conversionService.validateConversionRequest(data);
    
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return null;
    }

    setLoading(true);
    setError(null);
    setValidationErrors({});

    try {
      const result = await conversionService.createConversion(data);
      setConversion(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to create conversion';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Reset conversion state
   */
  const reset = useCallback(() => {
    setConversion(null);
    setError(null);
    setValidationErrors({});
  }, []);

  /**
   * Clear only the error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    conversion,
    loading,
    error,
    validationErrors,
    createConversion,
    reset,
    clearError,
  };
}