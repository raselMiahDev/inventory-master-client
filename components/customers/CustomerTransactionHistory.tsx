// app/customers/components/CustomerTransactionHistory.tsx
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Eye } from 'lucide-react';

interface CustomerTransactionHistoryProps {
  transactions: Array<{
    id: string;
    date: string;
    invoiceNo: string;
    amount: number;
    paymentMethod: string;
    items: number;
    status: string;
  }>;
}

export function CustomerTransactionHistory({ transactions }: CustomerTransactionHistoryProps) {
  const getPaymentBadgeColor = (method: string) => {
    const colors = {
      cash: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
      card: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      upi: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      credit: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
    };
    return colors[method as keyof typeof colors] || colors.cash;
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
      pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
      cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    };
    return colors[status as keyof typeof colors] || colors.completed;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Transaction History</h3>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <p className="font-medium text-slate-900 dark:text-white">
                    {transaction.invoiceNo}
                  </p>
                  <Badge variant="outline" className={getStatusBadge(transaction.status)}>
                    {transaction.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-slate-600 dark:text-slate-400">
                    {new Date(transaction.date).toLocaleDateString()}
                  </span>
                  <span className="text-slate-400">•</span>
                  <Badge variant="outline" className={getPaymentBadgeColor(transaction.paymentMethod)}>
                    {transaction.paymentMethod}
                  </Badge>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-600 dark:text-slate-400">
                    {transaction.items} items
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                  ₹{transaction.amount.toLocaleString()}
                </p>
              </div>
              <Button variant="ghost" size="icon">
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}