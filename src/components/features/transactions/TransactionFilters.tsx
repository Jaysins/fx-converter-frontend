import { useState } from 'react';
import { Card, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Select } from '../../ui/Select';
import { SUPPORTED_CURRENCIES } from '../../../utils/constants';
import type { Currency } from '../../../types/currency.types';

interface TransactionFiltersProps {
  onApplyFilters: (filters: {
    fromCurrency?: Currency;
    toCurrency?: Currency;
  }) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export function TransactionFilters({
  onApplyFilters,
  onClearFilters,
  hasActiveFilters,
}: TransactionFiltersProps) {
  const [fromCurrency, setFromCurrency] = useState<Currency | ''>('');
  const [toCurrency, setToCurrency] = useState<Currency | ''>('');

  const currencyOptions = [
    { value: '', label: 'All Currencies' },
    ...SUPPORTED_CURRENCIES.map(currency => ({
      value: currency,
      label: currency,
    })),
  ];

  const handleApply = () => {
    onApplyFilters({
      fromCurrency: fromCurrency || undefined,
      toCurrency: toCurrency || undefined,
    });
  };

  const handleClear = () => {
    setFromCurrency('');
    setToCurrency('');
    onClearFilters();
  };

  return (
    <Card variant="bordered">
      <CardContent className="py-4">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="From Currency"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value as Currency | '')}
              options={currencyOptions}
            />
            <Select
              label="To Currency"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value as Currency | '')}
              options={currencyOptions}
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={handleApply}
            >
              Apply Filters
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              disabled={!hasActiveFilters}
            >
              Clear
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}