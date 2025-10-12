import { CurrencyPairsTable } from './CurrencyPairsTable';
import { RecentTransactions } from './RecentTransactions';

import { Card, CardContent } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { ErrorMessage } from '../../ui/ErrorMessage';
import { useDashboardStats } from '../../../hooks/useDashboard';
import { StatsCards } from './StatCards';
import { TimeFilter } from '../../ui/TimeFliter';
import { ConversionsChart } from './ConverstionsChart';

export function DashboardOverview() {
  const { 
    stats, 
    loading, 
    error, 
    selectedDays, 
    updateTimePeriod, 
    refresh 
  } = useDashboardStats(30);

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={refresh}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Time Filter */}
      <Card variant="bordered">
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Time Period</h3>
              <p className="text-xs text-gray-600 mt-1">
                Filter dashboard data by time range
              </p>
            </div>
            <div className="flex items-center gap-4">
              <TimeFilter
                selectedDays={selectedDays}
                onChange={updateTimePeriod}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={refresh}
                disabled={loading}
              >
                <svg
                  className="h-4 w-4"
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
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <StatsCards
        summary={stats?.summary ?? null}
        loading={loading}
      />

      <ConversionsChart initialDays={7} />

      {/* Currency Pairs Table */}
      <CurrencyPairsTable
        currencyPairs={stats?.totalByCurrency ?? []}
        loading={loading}
      />

      {/* Recent Transactions */}
      <RecentTransactions
        transactions={stats?.recentTransactions ?? []}
        loading={loading}
      />
    </div>
  );
}