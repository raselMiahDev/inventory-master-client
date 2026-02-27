"use client"

import Link from "next/link"
import { useAuthStore } from "@/store/authStore"
import { sidebarRoutes } from "@/lib/utils/sidebar.routes"
import { LogOut, ChevronDown } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export default function Sidebar() {
    const user = useAuthStore((s) => s.user)
    const logout = useAuthStore((s) => s.logout)
    const router = useRouter()

    const [expandedSections, setExpandedSections] = useState<string[]>([])

    if (!user) return null

    const toggleSection = (label: string) => {
        setExpandedSections((prev) =>
            prev.includes(label)
                ? prev.filter((s) => s !== label)
                : [...prev, label]
        )
    }

    // 🔥 ROLE FILTERING HERE
    const filteredRoutes = sidebarRoutes
        .map((route) => {
            if (!route.roles.includes(user.role)) return null

            const filteredChildren = route.children?.filter((child) =>
                child.roles.includes(user.role)
            )

            return {
                ...route,
                children: filteredChildren,
            }
        })
        .filter(Boolean)

    return (
        <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">

            {/* Logo */}
            <div className="flex h-14 items-center px-6">
                <Link
                    href={
                        user.role === "admin"
                            ? "/dashboard/admin"
                            : `/dashboard/depot/${user.depotId}`
                    }
                    className="text-xl font-bold italic text-emerald-600"
                >
                    InventoryPro
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">

                {filteredRoutes.map((route: any) => {
                    const Icon = route.icon
                    const hasChildren = route.children && route.children.length > 0
                    const isExpanded = expandedSections.includes(route.label)

                    if (!hasChildren) {
                        return (
                            <Link
                                key={route.label}
                                href={route.href}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700/50"
                            >
                                {Icon && <Icon className="h-4 w-4" />}
                                {route.label}
                            </Link>
                        )
                    }

                    return (
                        <div key={route.label}>
                            <button
                                onClick={() => toggleSection(route.label)}
                                className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700/50"
                            >
                                {Icon && <Icon className="h-4 w-4" />}
                                <span className="flex-1 text-left">{route.label}</span>
                                <ChevronDown
                                    className={cn(
                                        "h-4 w-4 transition-transform",
                                        isExpanded && "rotate-180"
                                    )}
                                />
                            </button>

                            {isExpanded && (
                                <div className="ml-7 mt-1 space-y-1 pl-3 border-l border-slate-200 dark:border-slate-700">
                                    {route.children.map((child: any) => (
                                        <Link
                                            key={child.label}
                                            href={
                                                child.href.includes("new") && user.depotId
                                                    ? `${child.href}?depot=${user.depotId}`
                                                    : child.href
                                            }
                                            className="block px-3 py-1.5 rounded-md text-sm text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700/50"
                                        >
                                            {child.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                })}
            </nav>

            {/* Logout */}
            <div className="border-t border-slate-200 dark:border-slate-700 p-3">
                <button
                    onClick={() => {
                        logout()
                        router.push("/auth/login")
                    }}
                    className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </button>
            </div>
        </aside>
    )
}