import { Conversion } from '../../../types/conversion.types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { formatCurrency, formatCurrencyPair } from '../../../utils/formatCurrency';
import { formatTimestamp } from '../../../utils/formatDate';
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard';
import { Button } from '../../ui/Button';

interface ConversionSummaryProps {
  conversion: Conversion;
  showCopyButton?: boolean;
}

export function ConversionSummary({ 
  conversion,
  showCopyButton = true 
}: ConversionSummaryProps) {
  const [isCopied, copyToClipboard] = useCopyToClipboard();

  const handleCopy = () => {
    const text = `
Conversion Summary
------------------
From: ${formatCurrency(conversion.amount, conversion.fromCurrency)}
To: ${formatCurrency(conversion.convertedAmount, conversion.toCurrency)}
Rate: 1 ${conversion.fromCurrency} = ${conversion.conversionRate} ${conversion.toCurrency}
Time: ${formatTimestamp(conversion.timestamp)}
    `.trim();
    
    copyToClipboard(text);
  };

  return (
    <Card variant="elevated">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Conversion Successful</CardTitle>
          <Badge variant="success">Completed</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Currency Pair */}
        <div className="text-center py-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            {formatCurrencyPair(conversion.fromCurrency, conversion.toCurrency)}
          </p>
          <p className="text-3xl font-bold text-gray-900">
            {formatCurrency(conversion.convertedAmount, conversion.toCurrency)}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            from {formatCurrency(conversion.amount, conversion.fromCurrency)}
          </p>
        </div>

        {/* Conversion Details */}
        <div className="space-y-3 border-t pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Exchange Rate:</span>
            <span className="font-medium text-gray-900">
              1 {conversion.fromCurrency} = {conversion.conversionRate.toFixed(4)} {conversion.toCurrency}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Original Amount:</span>
            <span className="font-medium text-gray-900">
              {formatCurrency(conversion.amount, conversion.fromCurrency)}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Converted Amount:</span>
            <span className="font-medium text-gray-900">
              {formatCurrency(conversion.convertedAmount, conversion.toCurrency)}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Timestamp:</span>
            <span className="font-medium text-gray-900">
              {formatTimestamp(conversion.timestamp)}
            </span>
          </div>

          {conversion.id && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="font-mono text-xs text-gray-900">
                {conversion.id}
              </span>
            </div>
          )}
        </div>

        {/* Copy Button */}
        {showCopyButton && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            fullWidth
          >
            {isCopied ? (
              <>
                <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Copied to Clipboard
              </>
            ) : (
              <>
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy Details
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}