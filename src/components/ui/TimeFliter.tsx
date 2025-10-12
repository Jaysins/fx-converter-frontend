import { TIME_FILTER_OPTIONS } from '../../utils/constants';
import type { TimeFilterValue } from '../../types/dashboard.types';
import { cn } from '../../utils/cn';

interface TimeFilterProps {
  selectedDays: TimeFilterValue;
  onChange: (days: TimeFilterValue) => void;
  className?: string;
}

export function TimeFilter({ selectedDays, onChange, className }: TimeFilterProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {TIME_FILTER_OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            selectedDays === option.value
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}