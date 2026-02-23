"use client"

import { useState } from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  Package,
  ChevronDown,
  FileText,
  Users,
  Zap,
  UserCog,
  Receipt,
  ArrowLeftRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NavSection {
  icon: React.ComponentType<{ className?: string }>
  label: string
  href?: string
  children?: { label: string; href?: string; logout?: () => void }[]
}

const navSections: NavSection[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Package,
    label: "Inventory",
    children: [
      { label: "All Products", href: "/products" },
    ],
  },
  {
    icon: FileText,
    label: "Depo Manage",
    children: [
      { label: "All Depots", href: "/depots" },
    ],
  },
  {
    icon: Receipt,
    label: "Invoices & Sales",
    children: [
      { label: "Sales Reports", href: "/sales" },
    ],
  },
  {
    icon: ArrowLeftRight,
    label: "Transfers",
    children: [
      { label: "All Transfers", href: "/transfers" },
      { label: "New Transfer", href: "/transfers?new=true" },
    ],
  },
  {
    icon: Users,
    label: "Customers",
    href: "/customers",
  },
  {
    icon: Zap,
    label: "Integrations",
    href: "#",
  },
]

const adminSection: NavSection = {
  icon: UserCog,
  label: "Admin",
  children: [
    { label: "Settings", href: "#" },
    { label: "Users", href: "#" },
  ],
}

interface SidebarNavProps {
  activeItem?: string
}

export function SidebarNav({ activeItem = "Dashboard" }: SidebarNavProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(() => {
    const parentOfActive = [...navSections, adminSection].find((s) =>
      s.children?.some((c) => c.label === activeItem)
    )
    return parentOfActive ? [parentOfActive.label] : []
  })

  function toggleSection(label: string) {
    setExpandedSections((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    )
  }

  function renderNavItem(section: NavSection) {
    const Icon = section.icon
    const isActive = activeItem === section.label
    const isExpanded = expandedSections.includes(section.label)
    const hasChildren = section.children && section.children.length > 0
    const hasActiveChild = hasChildren && section.children!.some((c) => c.label === activeItem)

    return (
      <div key={section.label}>
        {!hasChildren && section.href ? (
          <Link
            href={section.href}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent"
            )}
          >
            <Icon className="size-4 shrink-0" />
            <span>{section.label}</span>
          </Link>
        ) : (
          <button
            onClick={() => toggleSection(section.label)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              hasActiveChild
                ? "text-primary"
                : "text-sidebar-foreground hover:bg-sidebar-accent"
            )}
          >
            <Icon className="size-4 shrink-0" />
            <span className="flex-1 text-left">{section.label}</span>
            <ChevronDown
              className={cn(
                "size-4 shrink-0 transition-transform duration-200",
                isExpanded && "rotate-180"
              )}
            />
          </button>
        )}
        {hasChildren && isExpanded && (
          <div className="ml-7 mt-1 flex flex-col gap-0.5 border-l border-sidebar-border pl-3">
            {section.children!.map((child) => {
              const isChildActive = activeItem === child.label
              if (child.logout) {
                return (
                  <button
                    key={child.label}
                    onClick={child.logout}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-left text-sm transition-colors",
                      "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
                    )}
                  >
                    {child.label}
                  </button>
                )
              }
              return (
                <Link
                  key={child.label}
                  href={child.href!}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-left text-sm transition-colors",
                    isChildActive
                      ? "bg-primary text-primary-foreground font-medium"
                      : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
                  )}
                >
                  {child.label}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-56 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex h-16 items-center px-5">
        <Link href="/" className="text-xl font-bold italic text-primary tracking-tight">
          InventoryPro
        </Link>
      </div>
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-2">
        {navSections.map(renderNavItem)}
      </nav>
      <div className="border-t border-sidebar-border px-3 py-3">
        {renderNavItem(adminSection)}
      </div>
    </aside>
  )
}
