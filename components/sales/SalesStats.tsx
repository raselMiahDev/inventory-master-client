import { Card } from '@/components/ui/card';
import { TrendingUp, Package, Clock, CheckCircle } from 'lucide-react';

const stats = [
  {
    title: "Today's Sales",
    value: "₹45,280",
    change: "+12.5%",
    icon: TrendingUp,
    color: "bg-emerald-500",
    lightColor: "bg-emerald-100 text-emerald-600"
  },
  {
    title: "Total Transactions",
    value: "156",
    change: "+8",
    icon: Package,
    color: "bg-blue-500",
    lightColor: "bg-blue-100 text-blue-600"
  },
  {
    title: "Pending Deposit",
    value: "₹12,450",
    change: "2 transactions",
    icon: Clock,
    color: "bg-amber-500",
    lightColor: "bg-amber-100 text-amber-600"
  },
  {
    title: "Completed",
    value: "₹32,830",
    change: "72%",
    icon: CheckCircle,
    color: "bg-emerald-500",
    lightColor: "bg-emerald-100 text-emerald-600"
  }
];

export function SalesStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </h3>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                  {stat.change}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.lightColor}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}