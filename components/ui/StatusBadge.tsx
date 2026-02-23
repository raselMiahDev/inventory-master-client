// app/components/ui/StatusBadge.tsx
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: boolean | string;
  type?: 'active' | 'stock' | 'priority' | 'payment';
}

const statusStyles = {
  active: {
    true: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
    false: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700'
  },
  stock: {
    low: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200',
    out: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200',
    normal: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200'
  },
  priority: {
    low: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400',
    normal: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    high: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    urgent: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  },
  payment: {
    Cash: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    Card: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    UPI: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    Credit: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
  }
};

export function StatusBadge({ status, type = 'active' }: StatusBadgeProps) {
  const getStatusText = () => {
    if (type === 'active') {
      return status ? 'Active' : 'Inactive';
    }
    return status;
  };

  const getStatusValue = () => {
    if (type === 'active') return status ? 'true' : 'false';
    if (type === 'stock') {
      if (status === 'low') return 'low';
      if (status === 'out') return 'out';
      return 'normal';
    }
    return status as string;
  };

  return (
    <Badge 
      variant="outline" 
      className={cn(
        'font-medium px-2.5 py-0.5',
        statusStyles[type]?.[getStatusValue() as keyof typeof statusStyles[typeof type]]
      )}
    >
      {getStatusText()}
    </Badge>
  );
}