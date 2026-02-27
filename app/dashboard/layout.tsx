'use client';
import { useAuth } from '@/hooks/useAuth';
import {DashboardShell} from "@/components/dashboard/dashboard-shell";

export default function DashboardContent({ children }: { children: React.ReactNode }) {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardShell>
        <div className="min-h-screen bg-green-400 dark:bg-slate-900">
            <main className="p-8 bg-slate-100 dark:bg-slate-800 rounded-lg shadow">
                {children}
            </main>
        </div>
    </DashboardShell>
  );
}