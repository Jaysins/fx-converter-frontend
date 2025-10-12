import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DashboardOverview } from '../components/features/dashboard/DashboardOverview';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export function DashboardPage() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Track your currency conversion activity and insights
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => navigate('/conversion')}
          >
            <svg
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Conversion
          </Button>
        </div>

        {/* Dashboard Content */}
        <DashboardOverview />
      </div>
    </DashboardLayout>
  );
}