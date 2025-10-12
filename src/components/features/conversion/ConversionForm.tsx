import { useState, FormEvent } from 'react';
import { useConversion } from '../../../hooks/useConversion';
import { useToast } from '../../../hooks/useToast';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { CurrencySelector } from './CurrencySelector';
import { ConversionSummary } from './ConversionSummary';
import { Toast } from '../../ui/Toast';
import type { Currency } from '../../../types/currency.types';
import { parseCurrencyInput } from '../../../utils/formatCurrency';

interface ConversionFormProps {
  onSuccess?: () => void;
}

export function ConversionForm({ onSuccess }: ConversionFormProps) {
  const { conversion, loading, error, validationErrors, createConversion, reset } = useConversion();
  const { toast, hideToast, success, error: showError } = useToast();
  
  const [formData, setFormData] = useState({
    amount: '',
    fromCurrency: '' as Currency | '',
    toCurrency: '' as Currency | '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const parsedAmount = parseCurrencyInput(formData.amount);
    
    if (!parsedAmount) {
      showError('Please enter a valid amount');
      return;
    }

    const result = await createConversion({
      amount: parsedAmount,
      fromCurrency: formData.fromCurrency as Currency,
      toCurrency: formData.toCurrency as Currency,
    });

    if (result) {
      success('Conversion completed successfully!');
      onSuccess?.();
    } else if (error) {
      showError(error);
    }
  };

  const handleReset = () => {
    setFormData({
      amount: '',
      fromCurrency: '' as Currency | '',
      toCurrency: '' as Currency | '',
    });
    reset();
  };

  const handleSwapCurrencies = () => {
    setFormData(prev => ({
      ...prev,
      fromCurrency: prev.toCurrency,
      toCurrency: prev.fromCurrency,
    }));
  };

  // Calculate live preview (optional)
  const hasValidInput = formData.amount && formData.fromCurrency && formData.toCurrency;

  // Show success summary if conversion was created
  if (conversion) {
    return (
      <div className="space-y-4">
        <ConversionSummary conversion={conversion} />
        <Button
          variant="outline"
          onClick={handleReset}
          fullWidth
        >
          Create Another Conversion
        </Button>
      </div>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Currency Conversion</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* API Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Amount Input */}
            <Input
              label="Amount"
              type="number"
              step="0.01"
              min="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              error={validationErrors.amount}
              placeholder="Enter amount"
              disabled={loading}
              helperText="Enter the amount you want to convert"
              autoFocus
            />

            {/* From Currency */}
            <CurrencySelector
              label="From Currency"
              value={formData.fromCurrency}
              onChange={(currency) => setFormData({ ...formData, fromCurrency: currency })}
              error={validationErrors.fromCurrency}
              disabled={loading}
              excludeCurrency={formData.toCurrency as Currency}
            />

            {/* Swap Button */}
            <div className="flex justify-center">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleSwapCurrencies}
                disabled={!formData.fromCurrency || !formData.toCurrency || loading}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                  />
                </svg>
                <span className="ml-2">Swap Currencies</span>
              </Button>
            </div>

            {/* To Currency */}
            <CurrencySelector
              label="To Currency"
              value={formData.toCurrency}
              onChange={(currency) => setFormData({ ...formData, toCurrency: currency })}
              error={validationErrors.toCurrency}
              disabled={loading}
              excludeCurrency={formData.fromCurrency as Currency}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              isLoading={loading}
              disabled={!hasValidInput}
            >
              {loading ? 'Converting...' : 'Convert Currency'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </>
  );
}