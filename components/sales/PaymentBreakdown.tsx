// app/sales/components/PaymentBreakdown.tsx
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const payments = [
  {
    method: 'Cash',
    amount: '₹28,450',
    percentage: 62,
    color: 'bg-emerald-500',
    lightColor: 'bg-emerald-100 text-emerald-600'
  },
  {
    method: 'Card',
    amount: '₹9,820',
    percentage: 22,
    color: 'bg-blue-500',
    lightColor: 'bg-blue-100 text-blue-600'
  },
  {
    method: 'UPI',
    amount: '₹5,210',
    percentage: 12,
    color: 'bg-purple-500',
    lightColor: 'bg-purple-100 text-purple-600'
  },
  {
    method: 'Credit',
    amount: '₹1,800',
    percentage: 4,
    color: 'bg-amber-500',
    lightColor: 'bg-amber-100 text-amber-600'
  }
];

export function PaymentBreakdown() {
  const total = payments.reduce((sum, p) => {
    const amount = parseInt(p.amount.replace(/[₹,]/g, ''));
    return sum + amount;
  }, 0);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Payment Breakdown
        </h2>
        <span className="text-2xl font-bold text-slate-900 dark:text-white">
          ₹{total.toLocaleString()}
        </span>
      </div>

      <div className="space-y-4">
        {payments.map((payment, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${payment.color}`} />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {payment.method}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-slate-900 dark:text-white">
                  {payment.amount}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 w-10">
                  {payment.percentage}%
                </span>
              </div>
            </div>
            <Progress value={payment.percentage} className="h-2" />
          </div>
        ))}
      </div>
    </Card>
  );
}