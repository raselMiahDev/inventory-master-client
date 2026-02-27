"use client"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { LowStockAlert } from "@/components/dashboard/low-stock-alert"
import { useAuth } from "@/hooks/useAuth"



export default function DashboardPage() {
  const { isAuthenticated, user } = useAuth();
  return (
    <DashboardShell activeItem="Dashboard">
      <div className="ml-30">
              <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground text-balance">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {"Welcome back! " + (isAuthenticated && user ? `${user.username}` : "Please log in to see your dashboard.") }
        </p>
      </div>

      <StatsCards />

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <RecentActivity />
        </div>
        <div className="lg:col-span-2">
          <LowStockAlert />
        </div>
      </div>
      </div>
    </DashboardShell>
  )
}
