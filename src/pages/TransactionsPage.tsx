import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { TransactionList } from '../components/features/transactions/TransactionList';
import { TransactionFilters } from '../components/features/transactions/TransactionFilters';
import { Pagination } from '../components/ui/Pagination';
import { Button } from '../components/ui/Button';
import { useTransactions } from '../hooks/useTransactions';
import { Badge } from '../components/ui/Badge';

export function TransactionsPage() {
  const {
    transactions,
    loading,
    error,
    pagination,
    filters,
    nextPage,
    prevPage,
    updateFilters,
    clearFilters,
    refresh,
  } = useTransactions(1, 10);

  const hasActiveFilters = Object.values(filters).some(
    value => value !== undefined && value !== '' && value !== null
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Transaction History
            </h1>
            <p className="text-gray-600 mt-1">
              View and manage all your currency conversions
            </p>
          </div>
          <Button
            variant="outline"
            onClick={refresh}
            disabled={loading}
          >
            <svg
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </Button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="py-4">
              <p className="text-sm text-gray-600">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {pagination.total}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <p className="text-sm text-gray-600">Current Page</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {pagination.page} / {pagination.totalPages}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <p className="text-sm text-gray-600">Active Filters</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {hasActiveFilters ? (
                  <Badge variant="info">
                    {Object.values(filters).filter(v => v).length}
                  </Badge>
                ) : (
                  '0'
                )}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <TransactionFilters
          onApplyFilters={updateFilters}
          onClearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionList
              transactions={transactions}
              loading={loading}
              error={error}
              onRetry={refresh}
              showDetailsModal={true}
            />

            {/* Pagination */}
            {transactions.length > 0 && (
              <div className="mt-6 pt-6 border-t">
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  hasNextPage={pagination.hasNextPage}
                  hasPrevPage={pagination.hasPrevPage}
                  onPageChange={(page) => {
                    if (page > pagination.page) {
                      nextPage();
                    } else {
                      prevPage();
                    }
                  }}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}