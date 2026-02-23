import { StatsCard } from '@/components/ui/stats-card';
import { Users, UserCheck, ShoppingBag, TrendingUp, CreditCard, Award } from 'lucide-react';

interface CustomerStatsProps {
  stats: {
    totalCustomers: number;
    activeCustomers: number;
    wholesaleCustomers: number;
    retailCustomers: number;
    totalRevenue: number;
    averagePurchase: number;
  };
}

export function CustomerStats({ stats }: CustomerStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatsCard
        title="Total Customers"
        value={stats.totalCustomers}
        icon={Users}
        trend={{ value: 15, label: 'vs last month' }}
        color="emerald"
      />
      <StatsCard
        title="Active Customers"
        value={stats.activeCustomers}
        icon={UserCheck}
        trend={{ value: 8, label: 'new this month' }}
        color="blue"
      />
      <StatsCard
        title="Wholesale"
        value={stats.wholesaleCustomers}
        icon={ShoppingBag}
        color="purple"
      />
      <StatsCard
        title="Retail"
        value={stats.retailCustomers}
        icon={Users}
        color="amber"
      />
      <StatsCard
        title="Total Revenue"
        value={`₹${stats.totalRevenue.toLocaleString()}`}
        icon={TrendingUp}
        trend={{ value: 22, label: 'growth' }}
        color="emerald"
      />
      <StatsCard
        title="Avg. Purchase"
        value={`₹${stats.averagePurchase.toLocaleString()}`}
        icon={CreditCard}
        color="blue"
      />
    </div>
  );
}