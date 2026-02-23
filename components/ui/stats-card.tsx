// app/components/ui/StatsCard.tsx
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  color?: 'emerald' | 'blue' | 'amber' | 'purple';
}

const colorVariants = {
  emerald: {
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    text: 'text-emerald-600 dark:text-emerald-400',
    icon: 'text-emerald-600 dark:text-emerald-400'
  },
  blue: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-600 dark:text-blue-400',
    icon: 'text-blue-600 dark:text-blue-400'
  },
  amber: {
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    text: 'text-amber-600 dark:text-amber-400',
    icon: 'text-amber-600 dark:text-amber-400'
  },
  purple: {
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    text: 'text-purple-600 dark:text-purple-400',
    icon: 'text-purple-600 dark:text-purple-400'
  }
};

export function StatsCard({ title, value, icon: Icon, trend, color = 'emerald' }: StatsCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{value}</h3>
          {trend && (
            <p className={`text-xs mt-2 ${trend.value > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {trend.value > 0 ? '↑' : '↓'} {Math.abs(trend.value)}% {trend.label}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorVariants[color].bg}`}>
          <Icon className={`h-5 w-5 ${colorVariants[color].icon}`} />
        </div>
      </div>
    </Card>
  );
}