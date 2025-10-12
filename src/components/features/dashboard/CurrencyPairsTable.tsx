import { CurrencyPairStats } from '../../../types/dashboard.types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/Card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../../ui/Table';
import { EmptyState } from '../../ui/EmptyState';
import { Spinner } from '../../ui/Spinner';
import { Badge } from '../../ui/Badge';

interface CurrencyPairsTableProps {
  currencyPairs: CurrencyPairStats[];
  loading?: boolean;
}

export function CurrencyPairsTable({ currencyPairs, loading }: CurrencyPairsTableProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Currency Pairs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!currencyPairs || currencyPairs.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Currency Pairs</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            title="No currency pairs yet"
            description="Create your first conversion to see statistics"
          />
        </CardContent>
      </Card>
    );
  }

  // Sort by count descending
  const sortedPairs = [...currencyPairs].sort((a, b) => b.count - a.count);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Currency Pairs</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Desktop Table */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Currency Pair</TableHead>
                <TableHead>Conversions</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Avg. Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedPairs.map((pair, index) => (
                <TableRow key={pair.currencyPair}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {index < 3 && (
                        <Badge 
                          variant={index === 0 ? 'warning' : 'default'}
                          size="sm"
                        >
                          #{index + 1}
                        </Badge>
                      )}
                      <span className="font-medium">{pair.currencyPair}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="info">{pair.count}</Badge>
                  </TableCell>
                  <TableCell>
                    ${pair.totalAmount.toLocaleString(undefined, { 
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2 
                    })}
                  </TableCell>
                  <TableCell>
                    ${(pair.totalAmount / pair.count).toLocaleString(undefined, { 
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2 
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {sortedPairs.map((pair, index) => (
            <div
              key={pair.currencyPair}
              className="bg-gray-50 rounded-lg p-4 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {index < 3 && (
                    <Badge 
                      variant={index === 0 ? 'warning' : 'default'}
                      size="sm"
                    >
                      #{index + 1}
                    </Badge>
                  )}
                  <span className="font-semibold text-gray-900">
                    {pair.currencyPair}
                  </span>
                </div>
                <Badge variant="info">{pair.count}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-600">Total</p>
                  <p className="font-medium text-gray-900">
                    ${pair.totalAmount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Average</p>
                  <p className="font-medium text-gray-900">
                    ${(pair.totalAmount / pair.count).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}