"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  LayoutDashboard,
  Package,
  FileText,
  Users,
  Zap,
  UserCog,
  Receipt,
  ChevronDown,
  ArrowLeftRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NavSection {
  icon: React.ComponentType<{ className?: string }>
  label: string
  href?: string
  children?: { label: string; href: string }[]
}

const navSections: NavSection[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  {
    icon: Package,
    label: "Inventory",
    children: [
      { label: "All Products", href: "/products" },
      { label: "Add Product", href: "/products?add=true" },
      { label: "Stock Movements", href: "#" },
    ],
  },
  {
    icon: FileText,
    label: "Quotations",
    children: [
      { label: "All Quotations", href: "#" },
      { label: "Create Quotation", href: "#" },
    ],
  },
  {
    icon: Receipt,
    label: "Invoices & Sales",
    children: [
      { label: "All Invoices", href: "#" },
      { label: "Create Invoice", href: "#" },
      { label: "Sales Reports", href: "#" },
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
  { icon: Users, label: "Customers", href: "#" },
  { icon: Zap, label: "Integrations", href: "#" },
  {
    icon: UserCog,
    label: "Admin",
    children: [
      { label: "Settings", href: "#" },
      { label: "Users", href: "#" },
    ],
  },
]

interface MobileSidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  activeItem?: string
}

export function MobileSidebar({ open, onOpenChange, activeItem = "Dashboard" }: MobileSidebarProps) {
  const [expanded, setExpanded] = useState<string[]>(() => {
    const parent = navSections.find((s) => s.children?.some((c) => c.label === activeItem))
    return parent ? [parent.label] : []
  })

  function toggleSection(label: string) {
    setExpanded((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    )
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-64 bg-sidebar p-0 border-sidebar-border">
        <SheetHeader className="flex h-16 items-center px-5 flex-row border-b border-sidebar-border">
          <SheetTitle className="text-xl font-bold italic text-primary tracking-tight">
            InventoryPro
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-3 py-3 overflow-y-auto">
          {navSections.map((section) => {
            const Icon = section.icon
            const isActive = activeItem === section.label
            const isExpanded = expanded.includes(section.label)
            const hasChildren = !!section.children?.length
            const hasActiveChild = hasChildren && section.children!.some((c) => c.label === activeItem)

            return (
              <div key={section.label}>
                {!hasChildren && section.href ? (
                  <Link
                    href={section.href}
                    onClick={() => onOpenChange(false)}
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
                        "size-4 transition-transform",
                        isExpanded && "rotate-180"
                      )}
                    />
                  </button>
                )}
                {hasChildren && isExpanded && (
                  <div className="ml-7 mt-1 flex flex-col gap-0.5 border-l border-sidebar-border pl-3">
                    {section.children!.map((child) => {
                      const isChildActive = activeItem === child.label
                      return (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => onOpenChange(false)}
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
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
