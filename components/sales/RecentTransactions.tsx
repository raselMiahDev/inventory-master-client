// app/sales/components/RecentTransactions.tsx
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

const transactions = [
  {
    id: 'SALE-20260217-001',
    customer: 'Rajesh Kumar',
    amount: '₹2,450',
    paymentMethod: 'Cash',
    time: '10:30 AM',
    status: 'completed',
    items: 3
  },
  {
    id: 'SALE-20260217-002',
    customer: 'Priya Sharma',
    amount: '₹3,820',
    paymentMethod: 'Card',
    time: '11:15 AM',
    status: 'completed',
    items: 2
  },
  {
    id: 'SALE-20260217-003',
    customer: 'Amit Patel',
    amount: '₹1,250',
    paymentMethod: 'UPI',
    time: '12:00 PM',
    status: 'completed',
    items: 1
  },
  {
    id: 'SALE-20260217-004',
    customer: 'Sneha Reddy',
    amount: '₹4,560',
    paymentMethod: 'Cash',
    time: '1:30 PM',
    status: 'completed',
    items: 4
  },
  {
    id: 'SALE-20260217-005',
    customer: 'Vikram Singh',
    amount: '₹2,890',
    paymentMethod: 'Credit',
    time: '2:45 PM',
    status: 'pending_deposit',
    items: 2
  }
];

const getPaymentBadgeColor = (method: string) => {
  const colors: Record<string, string> = {
    Cash: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    Card: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    UPI: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    Credit: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
  };
  return colors[method] || 'bg-slate-100 text-slate-700';
};

export function RecentTransactions() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Recent Transactions
        </h2>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10 bg-slate-200 dark:bg-slate-700">
                <AvatarFallback className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {transaction.customer.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-medium text-slate-900 dark:text-white">
                    {transaction.customer}
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {transaction.time}
                  </span>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {transaction.amount}
                  </span>
                  <span className="text-slate-400">•</span>
                  <Badge variant="secondary" className={getPaymentBadgeColor(transaction.paymentMethod)}>
                    {transaction.paymentMethod}
                  </Badge>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-600 dark:text-slate-400">
                    {transaction.items} items
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant={transaction.status === 'pending_deposit' ? 'destructive' : 'secondary'}>
                {transaction.status === 'pending_deposit' ? 'Pending Deposit' : 'Completed'}
              </Badge>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}