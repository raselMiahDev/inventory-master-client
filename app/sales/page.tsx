// app/sales/page.tsx
import { SalesStats } from '../../components/sales/SalesStats';
import { PaymentBreakdown } from '../../components/sales/PaymentBreakdown';
import { RecentTransactions } from '../../components/sales/RecentTransactions';
import { SalesChart } from '../../components/sales/SalesChart';
import { BankDepositStatus } from '../../components/sales/BankDepositStatus';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';

export default function SalesDashboard() {
  return (
    <DashboardShell>
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="border-b bg-white dark:bg-slate-800">
        <div className="flex h-16 items-center px-6">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
            Sales Dashboard
          </h1>
          <div className="ml-auto flex items-center gap-4">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Plus className="mr-2 h-4 w-4" /> New Sale
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Stats Cards Row */}
        <SalesStats />
        
        {/* Payment Breakdown + Bank Deposit */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PaymentBreakdown />
          </div>
          <div className="lg:col-span-1">
            <BankDepositStatus />
          </div>
        </div>

        {/* Sales Chart */}
        <SalesChart />

        {/* Recent Transactions */}
        <RecentTransactions />
      </div>
    </div>
    </DashboardShell>
  );
}