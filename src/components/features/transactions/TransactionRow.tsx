import { Transaction } from '../../../types/transaction.types';
import { formatCurrency, formatCurrencyPair } from '../../../utils/formatCurrency';
import { formatTimestamp } from '../../../utils/formatDate';
import { Badge } from '../../ui/Badge';
import { TableCell, TableRow } from '../../ui/Table';

interface TransactionRowProps {
  transaction: Transaction;
  onClick?: () => void;
}

export function TransactionRowDesktop({ transaction, onClick }: TransactionRowProps) {
  return (
    <TableRow 
      className={onClick ? 'cursor-pointer' : ''}
      onClick={onClick}
    >
      <TableCell>
        <span className="font-medium">
          {formatCurrencyPair(transaction.fromCurrency, transaction.toCurrency)}
        </span>
      </TableCell>
      <TableCell>
        {formatCurrency(transaction.amount, transaction.fromCurrency)}
      </TableCell>
      <TableCell>
        {formatCurrency(transaction.convertedAmount, transaction.toCurrency)}
      </TableCell>
      <TableCell>
        <span className="text-sm text-gray-600">
          {transaction.conversionRate.toFixed(4)}
        </span>
      </TableCell>
      <TableCell>
        <span className="text-sm text-gray-600">
          {formatTimestamp(transaction.timestamp)}
        </span>
      </TableCell>
      <TableCell>
        <Badge variant="success" size="sm">
          Completed
        </Badge>
      </TableCell>
    </TableRow>
  );
}

export function TransactionRowMobile({ transaction, onClick }: TransactionRowProps) {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg p-4 space-y-3 ${
        onClick ? 'cursor-pointer hover:border-blue-300 transition-colors' : ''
      }`}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="font-semibold text-gray-900">
          {formatCurrencyPair(transaction.fromCurrency, transaction.toCurrency)}
        </span>
        <Badge variant="success" size="sm">
          Completed
        </Badge>
      </div>

      {/* Amounts */}
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">From:</span>
          <span className="font-medium text-gray-900">
            {formatCurrency(transaction.amount, transaction.fromCurrency)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">To:</span>
          <span className="font-medium text-gray-900">
            {formatCurrency(transaction.convertedAmount, transaction.toCurrency)}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center text-xs text-gray-600 pt-2 border-t">
        <span>Rate: {transaction.conversionRate.toFixed(4)}</span>
        <span>{formatTimestamp(transaction.timestamp)}</span>
      </div>
    </div>
  );
}