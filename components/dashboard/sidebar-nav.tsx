"use client"

import Link from "next/link"
import { useAuthStore } from "@/store/authStore"
import { sidebarRoutes } from "@/lib/utils/sidebar.routes"
import { LogOut, ChevronDown } from "lucide-react"
import { useState, useEffect, useMemo } from "react"
import { cn } from "@/lib/utils"
import { useRouter, usePathname } from "next/navigation"

export default function Sidebar() {
    const user = useAuthStore((s) => s.user)
    const logout = useAuthStore((s) => s.logout)
    const router = useRouter()
    const pathname = usePathname()

    const [expandedSections, setExpandedSections] = useState<string[]>([])

    if (!user) return null

    const toggleSection = (label: string) => {
        setExpandedSections((prev) =>
            prev.includes(label)
                ? prev.filter((s) => s !== label)
                : [...prev, label]
        )
    }

    // ✅ ROLE FILTERING (optimized)
    const filteredRoutes = useMemo(() => {
        return sidebarRoutes
            .filter((route) => route.roles.includes(user.role))
            .map((route) => ({
                ...route,
                children: route.children?.filter((child) =>
                    child.roles.includes(user.role)
                ),
            }))
    }, [user.role])

    // ✅ Auto expand parent if child active
    useEffect(() => {
        filteredRoutes.forEach((route: any) => {
            route.children?.forEach((child: any) => {
                if (pathname.startsWith(child.href)) {
                    setExpandedSections((prev) =>
                        prev.includes(route.label)
                            ? prev
                            : [...prev, route.label]
                    )
                }
            })
        })
    }, [pathname, filteredRoutes])

    return (
        <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 transition-all duration-300">

            {/* Logo */}
            <div className="flex h-14 items-center px-6 border-b border-slate-200 dark:border-slate-700">
                <Link
                    href={
                        user.role === "admin"
                            ? "/dashboard/admin"
                            : `/dashboard/depot/${user.depotId}`
                    }
                    className="text-xl font-bold italic tracking-wide text-emerald-600"
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
                    const isActive = pathname === route.href

                    // ===============================
                    // 🔹 SINGLE ROUTE
                    // ===============================
                    if (!hasChildren) {
                        return (
                            <Link
                                key={route.label}
                                href={route.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
                                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                                )}
                            >
                                {Icon && <Icon className="h-4 w-4" />}
                                {route.label}
                            </Link>
                        )
                    }

                    // ===============================
                    // 🔹 ROUTE WITH CHILDREN
                    // ===============================
                    return (
                        <div key={route.label}>
                            <button
                                onClick={() => toggleSection(route.label)}
                                className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-all duration-200"
                            >
                                {Icon && <Icon className="h-4 w-4" />}
                                <span className="flex-1 text-left">{route.label}</span>
                                <ChevronDown
                                    className={cn(
                                        "h-4 w-4 transition-transform duration-300",
                                        isExpanded && "rotate-180"
                                    )}
                                />
                            </button>

                            {/* Smooth Dropdown */}
                            <div
                                className={cn(
                                    "overflow-hidden transition-all duration-300 ease-in-out",
                                    isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                )}
                            >
                                <div className="ml-6 mt-1 space-y-1 pl-3 border-l border-slate-200 dark:border-slate-700">
                                    {route.children.map((child: any) => {
                                        const isChildActive =
                                            pathname === child.href ||
                                            pathname.startsWith(child.href)

                                        return (
                                            <Link
                                                key={child.label}
                                                href={
                                                    child.href.includes("new") && user.depotId
                                                        ? `${child.href}?depot=${user.depotId}`
                                                        : child.href
                                                }
                                                className={cn(
                                                    "block px-3 py-1.5 rounded-md text-sm transition-all duration-200",
                                                    isChildActive
                                                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
                                                        : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                                                )}
                                            >
                                                {child.label}
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
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
                    className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-all duration-200"
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </button>
            </div>
        </aside>
    )
}