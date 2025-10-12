import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { Spinner } from '../../ui/Spinner';
import { ErrorMessage } from '../../ui/ErrorMessage';
import { EmptyState } from '../../ui/EmptyState';
import { useChartData } from '../../../hooks/useChartData';
import { formatChartDate } from '../../../utils/formatDate';
import type { ChartDataPoint } from '../../../types/dashboard.types';

interface ConversionsChartProps {
  initialDays?: 7 | 30 | 90;
}

export function ConversionsChart({ initialDays = 7 }: ConversionsChartProps) {
  const { chartData, loading, error, selectedDays, updateTimePeriod, refresh } = 
    useChartData(initialDays);
  
  const [activeMetric, setActiveMetric] = useState<'count' | 'amount'>('count');

  // Custom tooltip for chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as ChartDataPoint;
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium text-gray-900 mb-2">
            {formatChartDate(data.date)}
          </p>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">
              Conversions: <span className="font-medium text-blue-600">{data.count}</span>
            </p>
            <p className="text-sm text-gray-600">
              Total Amount: <span className="font-medium text-green-600">
                ${data.totalAmount.toLocaleString()}
              </span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  // Format chart data with readable dates
  const formattedData = chartData.map(item => ({
    ...item,
    dateLabel: formatChartDate(item.date),
  }));

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <CardTitle>Conversion Trends</CardTitle>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
            {/* Metric Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveMetric('count')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  activeMetric === 'count'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Conversions
              </button>
              <button
                onClick={() => setActiveMetric('amount')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  activeMetric === 'amount'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Amount
              </button>
            </div>

            {/* Time Filter - Limited to 7, 30, 90 days for charts */}
            <div className="flex gap-2">
              {[7, 30, 90].map((days) => (
                <button
                  key={days}
                  onClick={() => updateTimePeriod(days as 7 | 30 | 90)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    selectedDays === days
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {days}d
                </button>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Spinner size="lg" />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <ErrorMessage message={error} onRetry={refresh} />
        )}

        {/* Empty State */}
        {!loading && !error && chartData.length === 0 && (
          <EmptyState
            icon={
              <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            }
            title="No data for this period"
            description="Create some conversions to see trends over time"
          />
        )}

        {/* Chart */}
        {!loading && !error && chartData.length > 0 && (
          <div className="mt-4">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={formattedData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                
                <XAxis
                  dataKey="dateLabel"
                  stroke="#6b7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                
                <YAxis
                  stroke="#6b7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickFormatter={(value) => 
                    activeMetric === 'amount' ? `$${value}` : value
                  }
                />
                
                <Tooltip content={<CustomTooltip />} />
                
                <Legend
                  wrapperStyle={{ fontSize: '14px', paddingTop: '20px' }}
                  iconType="line"
                />

                {/* Conversions Line */}
                {activeMetric === 'count' && (
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Conversions"
                  />
                )}

                {/* Total Amount Line */}
                {activeMetric === 'amount' && (
                  <Line
                    type="monotone"
                    dataKey="totalAmount"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: '#10b981', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Total Amount ($)"
                  />
                )}
              </LineChart>
            </ResponsiveContainer>

            {/* Chart Legend Info */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-600">Total Days</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {chartData.length}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Total Conversions</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {chartData.reduce((sum, item) => sum + item.count, 0)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Peak Day</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {Math.max(...chartData.map(item => item.count))}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Average/Day</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {(chartData.reduce((sum, item) => sum + item.count, 0) / 
                      chartData.length).toFixed(1)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}