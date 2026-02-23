import { Card } from '@/components/ui/card';
import { Building2 } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-slate-700 [mask-image:linear-gradient(0deg,transparent,black)] opacity-20" />
      
      {/* Main Card */}
      <Card className="w-full max-w-md p-8 shadow-xl border-emerald-100 dark:border-emerald-900/20 relative">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl">
            <Building2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>

        {/* Form */}
        {children}
      </Card>
    </div>
  );
}