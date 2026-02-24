// components/SidebarNav.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  ChevronDown,
  FileText,
  Users,
  UserCog,
  Receipt,
  ArrowLeftRight,
  LogOut,
  Building2,
  ShoppingCart,
  Settings,
} from 'lucide-react';

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
  roles?: ('admin' | 'in_charge')[];
}

export function SidebarNav() {
  const pathname = usePathname();
  const { user, logout, hasPermission } = useAuth();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  // Define navigation items with role-based access
  const navItems: NavItem[] = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      href: user?.role === 'admin' ? '/dashboard/admin' : `/dashboard/depot/${user?.depotId}`,
      roles: ['admin', 'in_charge'],
    },
    {
      icon: Package,
      label: 'Inventory',
      roles: ['admin', 'in_charge'],
      children: [
        { label: 'All Products', href: '/products' },
        ...(user?.role === 'in_charge' && user.depotId
          ? [{ label: 'My Depot Stock', href: `/depots/${user.depotId}/inventory` }]
          : []),
      ],
    },
    {
      icon: FileText,
      label: 'Depots',
      roles: ['admin'],
      children: [
        { label: 'All Depots', href: '/depots' },
        { label: 'Create Depot', href: '/depots/new' },
      ],
    },
    {
      icon: Building2,
      label: 'My Depot',
      href: user?.role === 'in_charge' && user.depotId ? `/depots/${user.depotId}` : undefined,
      roles: ['in_charge'],
    },
    {
      icon: Receipt,
      label: 'Sales',
      roles: ['admin', 'in_charge'],
      children: [
        { label: 'Sales Reports', href: '/sales' },
        ...(user?.role === 'in_charge' && user.depotId
          ? [{ label: 'New Sale', href: `/sales/new?depot=${user.depotId}` }]
          : []),
      ],
    },
    {
      icon: ArrowLeftRight,
      label: 'Transfers',
      roles: ['admin', 'in_charge'],
      children: [
        { label: 'All Transfers', href: '/transfers' },
        ...(user?.role === 'in_charge' && user.depotId
          ? [{ label: 'New Transfer', href: `/transfers/new?from=${user.depotId}` }]
          : []),
      ],
    },
    {
      icon: Users,
      label: 'Customers',
      href: '/customers',
      roles: ['admin', 'in_charge'],
    },
    {
      icon: ShoppingCart,
      label: 'Products',
      href: '/products',
      roles: ['admin', 'in_charge'],
    },
    {
      icon: Settings,
      label: 'Settings',
      roles: ['admin'],
      children: [
        { label: 'Users', href: '/users' },
        { label: 'System', href: '/settings' },
      ],
    },
  ];

  // Filter items based on user role
  const filteredNavItems = navItems.filter(
    item => !item.roles || item.roles.includes(user?.role as any)
  );

  // Auto-expand sections based on active route
  useEffect(() => {
    const activeParent = filteredNavItems.find(item =>
      item.children?.some(child => pathname.startsWith(child.href))
    );
    
    if (activeParent && !expandedSections.includes(activeParent.label)) {
      setExpandedSections(prev => [...prev, activeParent.label]);
    }
  }, [pathname, filteredNavItems]);

  const toggleSection = (label: string) => {
    setExpandedSections(prev =>
      prev.includes(label) ? prev.filter(s => s !== label) : [...prev, label]
    );
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  if (!user) return null;

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-slate-200 dark:border-slate-700">
        <Link 
          href={user.role === 'admin' ? '/dashboard/admin' : `/dashboard/depot/${user.depotId}`}
          className="text-xl font-bold text-emerald-600"
        >
          InventoryMS
        </Link>
      </div>

      {/* User Info */}
      <div className="px-4 py-4 border-b border-slate-200 dark:border-slate-700">
        <p className="text-sm font-medium text-slate-900 dark:text-white">
          {user.username}
        </p>
        <div className="flex items-center justify-between mt-1">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
            {user.role}
          </span>
          {user.depotId && user.role === 'in_charge' && (
            <span className="text-xs text-slate-500">
              Depot: {user.depotId.slice(-4)}
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = expandedSections.includes(item.label);
          const isItemActive = item.href ? isActive(item.href) : false;
          const hasActiveChild = hasChildren && item.children!.some(child => 
            pathname.startsWith(child.href)
          );

          return (
            <div key={item.label}>
              {!hasChildren && item.href ? (
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isItemActive || hasActiveChild
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700/50'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ) : hasChildren ? (
                <>
                  <button
                    onClick={() => toggleSection(item.label)}
                    className={cn(
                      'flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      hasActiveChild
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700/50'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="flex-1 text-left">{item.label}</span>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition-transform',
                        isExpanded && 'rotate-180'
                      )}
                    />
                  </button>
                  {isExpanded && (
                    <div className="ml-7 mt-1 space-y-0.5 pl-3 border-l border-slate-200 dark:border-slate-700">
                      {item.children!.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className={cn(
                            'block px-3 py-1.5 rounded-md text-sm transition-colors',
                            pathname === child.href
                              ? 'bg-emerald-100 text-emerald-700 font-medium dark:bg-emerald-900/30 dark:text-emerald-400'
                              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-300 dark:hover:bg-slate-700/50'
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : null}
            </div>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="border-t border-slate-200 dark:border-slate-700 p-3">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}