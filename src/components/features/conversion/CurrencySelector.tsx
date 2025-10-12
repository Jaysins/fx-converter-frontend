import { Select, SelectOption } from '../../ui/Select';
import { SUPPORTED_CURRENCIES, CURRENCY_NAMES, CURRENCY_SYMBOLS } from '../../../utils/constants';
import type { Currency } from '../../../types/currency.types';

interface CurrencySelectorProps {
  label: string;
  value: Currency | '';
  onChange: (currency: Currency) => void;
  error?: string;
  disabled?: boolean;
  excludeCurrency?: Currency; // Don't show this currency in options
}

export function CurrencySelector({
  label,
  value,
  onChange,
  error,
  disabled,
  excludeCurrency,
}: CurrencySelectorProps) {
  // Build options from supported currencies
  const options: SelectOption[] = SUPPORTED_CURRENCIES
    .filter(currency => currency !== excludeCurrency)
    .map(currency => ({
      value: currency,
      label: `${currency} - ${CURRENCY_NAMES[currency]} (${CURRENCY_SYMBOLS[currency]})`,
    }));

  return (
    <Select
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value as Currency)}
      options={options}
      placeholder="Select currency"
      error={error}
      disabled={disabled}
    />
  );
}