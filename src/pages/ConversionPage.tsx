import { DashboardLayout } from '../components/layout/DashboardLayout';
import { ConversionForm } from '../components/features/conversion/ConversionForm';
import { Card, CardContent } from '../components/ui/Card';

export function ConversionPage() {
  const handleConversionSuccess = () => {
    // Optional: Add toast notification or navigate to transactions
    console.log('Conversion created successfully!');
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Create Conversion
          </h1>
          <p className="text-gray-600 mt-1">
            Convert between supported currencies with real-time exchange rates
          </p>
        </div>

        {/* Conversion Form */}
        <ConversionForm onSuccess={handleConversionSuccess} />

        {/* Help Card */}
        <Card variant="bordered">
          <CardContent className="py-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              💡 Quick Tips
            </h3>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Enter the amount you want to convert</li>
              <li>Select your source and target currencies</li>
              <li>Click the swap button to quickly reverse currencies</li>
              <li>Exchange rates are updated in real-time</li>
              <li>All conversions are saved to your transaction history</li>
            </ul>
          </CardContent>
        </Card>

        {/* Supported Currencies Info */}
        <Card variant="bordered">
          <CardContent className="py-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              🌍 Supported Currencies
            </h3>
            <div className="flex flex-wrap gap-2">
              {['USD', 'EUR', 'GBP', 'NGN', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR'].map(
                (currency) => (
                  <span
                    key={currency}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded"
                  >
                    {currency}
                  </span>
                )
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}