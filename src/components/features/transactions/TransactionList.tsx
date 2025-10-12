import { Transaction } from '../../../types/transaction.types';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead 
} from '../../ui/Table';
import { TransactionRowDesktop, TransactionRowMobile } from './TransactionRow';
import { EmptyState } from '../../ui/EmptyState';
import { Spinner } from '../../ui/Spinner';
import { ErrorMessage } from '../../ui/ErrorMessage';
import { useState } from 'react';
import { Modal } from '../../ui/Modal';
import { ConversionSummary } from '../conversion/ConversionSummary';
import type { Conversion } from '../../../types/conversion.types';

interface TransactionListProps {
  transactions: Transaction[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  showDetailsModal?: boolean;
}

export function TransactionList({ 
  transactions, 
  loading, 
  error,
  onRetry,
  showDetailsModal = true,
}: TransactionListProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const handleRowClick = (transaction: Transaction) => {
    if (showDetailsModal) {
      setSelectedTransaction(transaction);
    }
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
  };

  // Convert Transaction to Conversion format for summary
  const transactionToConversion = (transaction: Transaction): Conversion => ({
    id: transaction._id,
    amount: transaction.amount,
    fromCurrency: transaction.fromCurrency,
    toCurrency: transaction.toCurrency,
    conversionRate: transaction.conversionRate,
    convertedAmount: transaction.convertedAmount,
    timestamp: transaction.timestamp,
  });

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  // Error state
  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  // Empty state
  if (transactions.length === 0) {
    return (
      <EmptyState
        icon={
          <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        }
        title="No transactions yet"
        description="Start by creating your first currency conversion"
      />
    );
  }

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Currency Pair</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Converted</TableHead>
              <TableHead>Rate</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TransactionRowDesktop
                key={transaction._id}
                transaction={transaction}
                onClick={showDetailsModal ? () => handleRowClick(transaction) : undefined}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {transactions.map((transaction) => (
          <TransactionRowMobile
            key={transaction._id}
            transaction={transaction}
            onClick={showDetailsModal ? () => handleRowClick(transaction) : undefined}
          />
        ))}
      </div>

      {/* Transaction Details Modal */}
      {showDetailsModal && selectedTransaction && (
        <Modal
          isOpen={!!selectedTransaction}
          onClose={handleCloseModal}
          title="Transaction Details"
          size="md"
        >
          <ConversionSummary
            conversion={transactionToConversion(selectedTransaction)}
            showCopyButton={true}
          />
        </Modal>
      )}
    </>
  );
}