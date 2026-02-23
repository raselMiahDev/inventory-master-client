// app/depots/components/DepotStats.tsx
import { StatsCard } from '@/components/ui/stats-card';
import { Building2, Package, Users, TrendingUp } from 'lucide-react';

interface DepotStatsProps {
  stats: {
    totalDepots: number;
    activeDepots: number;
    totalProducts: number;
    totalValue: number;
    totalIncharge: number;
  };
}

export function DepotStats({ stats }: DepotStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Depots"
        value={stats.totalDepots}
        icon={Building2}
        trend={{ value: 12, label: 'vs last month' }}
        color="emerald"
      />
      <StatsCard
        title="Active Depots"
        value={stats.activeDepots}
        icon={Package}
        trend={{ value: 8, label: 'active rate' }}
        color="blue"
      />
      <StatsCard
        title="Total Products"
        value={stats.totalProducts.toLocaleString()}
        icon={TrendingUp}
        color="purple"
      />
      <StatsCard
        title="In-charge Users"
        value={stats.totalIncharge}
        icon={Users}
        color="amber"
      />
    </div>
  );
}