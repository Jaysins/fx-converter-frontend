import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { TransactionList } from '../transactions/TransactionList';
import { useNavigate } from 'react-router-dom';
import type { Transaction } from '../../../types/transaction.types';

interface RecentTransactionsProps {
  transactions: Transaction[];
  loading?: boolean;
  error?: string | null;
}

export function RecentTransactions({ 
  transactions, 
  loading,
  error 
}: RecentTransactionsProps) {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Transactions</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/conversions')}
          >
            View All
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <TransactionList
          transactions={transactions.slice(0, 10)}
          loading={loading}
          error={error}
          showDetailsModal={true}
        />
      </CardContent>
    </Card>
  );
}