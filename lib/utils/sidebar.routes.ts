import {
    LayoutDashboard,
    Package,
    Users,
    Receipt,
    ArrowLeftRight,
    Building2,
} from "lucide-react"

export type UserRole = "admin" | "in_charge"

export interface SidebarRoute {
    label: string
    icon?: any
    href?: string
    roles: UserRole[]
    children?: {
        label: string
        href: string
        roles: UserRole[]
    }[]
}

export const sidebarRoutes: SidebarRoute[] = [
    {
        label: "Admin Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard/admin",
        roles: ["admin"],
    },
    {
        label: "Depot Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard/depot",
        roles: ["in_charge"],
    },
    {
        label: "Products",
        icon: Package,
        href: "/products",
        roles: ["admin", "in_charge"],
    },
    {
        label: "Depots",
        icon: Building2,
        roles: ["admin"],
        children: [
            { label: "All Depots", href: "/depots", roles: ["admin"] },
            { label: "Create Depot", href: "/depots/new", roles: ["admin"] },
        ],
    },
    {
        label: "Sales",
        icon: Receipt,
        roles: ["admin", "in_charge"],
        children: [
            { label: "Sales Reports", href: "/sales", roles: ["admin", "in_charge"] },
            { label: "New Sale", href: "/sales/new", roles: ["in_charge"] },
        ],
    },
    {
        label: "Transfers",
        icon: ArrowLeftRight,
        roles: ["admin", "in_charge"],
        children: [
            { label: "All Transfers", href: "/transfers", roles: ["admin", "in_charge"] },
            { label: "New Transfer", href: "/transfers/new", roles: ["in_charge"] },
        ],
    },
    {
        label: "Customers",
        icon: Users,
        href: "/customers",
        roles: ["admin", "in_charge"],
    },
]