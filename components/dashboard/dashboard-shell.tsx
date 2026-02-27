"use client"

import { useState } from "react"
import SidebarNav  from "@/components/dashboard/sidebar-nav"
import { Header } from "@/components/dashboard/header"
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar"

interface DashboardShellProps {
  children: React.ReactNode
  activeItem?: string
}

export function DashboardShell({ children, activeItem = "Dashboard" }: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <div className="hidden lg:block">
        <SidebarNav />
      </div>
      <MobileSidebar open={mobileOpen} onOpenChange={setMobileOpen} activeItem={activeItem} />
      <div className="flex flex-col transition-all duration-300 lg:ml-56">
        <Header onMenuToggle={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
