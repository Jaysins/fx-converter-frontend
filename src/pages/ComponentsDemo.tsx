import { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { EmptyState } from '../components/ui/EmptyState';
import { Spinner } from '../components/ui/Spinner';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../components/ui/Table';
import { Pagination } from '../components/ui/Pagination';

export function ComponentsDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">UI Components Demo</h1>

        {/* Cards */}
        <Card>
          <CardHeader>
            <CardTitle>Card Component</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              This is a card with header and content sections.
            </p>
          </CardContent>
        </Card>

        {/* Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button isLoading>Loading</Button>
              <Button disabled>Disabled</Button>
            </div>
          </CardContent>
        </Card>

        {/* Form Elements */}
        <Card>
          <CardHeader>
            <CardTitle>Form Elements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Email" type="email" placeholder="you@example.com" />
            <Input label="With Error" error="This field is required" />
            <Select
              label="Select Currency"
              options={[
                { value: 'USD', label: 'US Dollar' },
                { value: 'EUR', label: 'Euro' },
                { value: 'GBP', label: 'British Pound' },
              ]}
              placeholder="Choose a currency"
            />
          </CardContent>
        </Card>

        {/* Badges */}
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="info">Info</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Table</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Currency Pair</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>USD → NGN</TableCell>
                  <TableCell>$100</TableCell>
                  <TableCell>
                    <Badge variant="success">Complete</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>EUR → USD</TableCell>
                  <TableCell>€50</TableCell>
                  <TableCell>
                    <Badge variant="info">Pending</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        <Card>
          <CardHeader>
            <CardTitle>Pagination</CardTitle>
          </CardHeader>
          <CardContent>
            <Pagination
              currentPage={2}
              totalPages={10}
              hasNextPage={true}
              hasPrevPage={true}
              onPageChange={(page) => console.log('Go to page:', page)}
            />
          </CardContent>
        </Card>

        {/* Modal */}
        <Card>
          <CardHeader>
            <CardTitle>Modal</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Example Modal"
            >
              <p>This is modal content. Press ESC or click outside to close.</p>
            </Modal>
          </CardContent>
        </Card>

        {/* Error Message */}
        <ErrorMessage
          message="This is an error message"
          onRetry={() => alert('Retry clicked')}
        />

        {/* Empty State */}
        <Card>
          <CardContent>
            <EmptyState
              title="No data found"
              description="There are no conversions to display yet"
              action={<Button>Create Conversion</Button>}
            />
          </CardContent>
        </Card>

        {/* Spinner */}
        <Card>
          <CardHeader>
            <CardTitle>Loading States</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}