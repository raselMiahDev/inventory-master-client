'use client';

import { DataTable } from '@/components/ui/data-table';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Edit2, Eye, Phone, Mail, Award } from 'lucide-react';

interface CustomerTableProps {
  customers: any[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onViewLoyalty: (id: string) => void;
  pagination?: {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
}

export function CustomerTable({ customers, onView, onEdit, onViewLoyalty, pagination }: CustomerTableProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const columns = [
    {
      key: 'customer',
      header: 'Customer',
      cell: (item: any) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 bg-emerald-100 dark:bg-emerald-900/30">
            <AvatarFallback className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">
              {getInitials(item.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">{item.name}</p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>{item.customerType}</span>
              {item.loyaltyPoints > 0 && (
                <span className="flex items-center gap-1 text-amber-600">
                  <Award className="h-3 w-3" /> {item.loyaltyPoints} pts
                </span>
              )}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'contact',
      header: 'Contact',
      cell: (item: any) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-sm">
            <Mail className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-slate-600 dark:text-slate-400">{item.email}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Phone className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-slate-600 dark:text-slate-400">{item.phone}</span>
          </div>
        </div>
      )
    },
    {
      key: 'location',
      header: 'Location',
      cell: (item: any) => (
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-400">{item.city || 'N/A'}</p>
          {item.gstin && (
            <p className="text-xs text-slate-500">GST: {item.gstin}</p>
          )}
        </div>
      )
    },
    {
      key: 'purchases',
      header: 'Purchases',
      cell: (item: any) => (
        <div>
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            ₹{item.totalSpent.toLocaleString()}
          </p>
          <p className="text-xs text-slate-500">{item.totalPurchases} transactions</p>
        </div>
      )
    },
    {
      key: 'credit',
      header: 'Credit',
      cell: (item: any) => (
        <div>
          {item.creditLimit ? (
            <>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Limit: ₹{item.creditLimit.toLocaleString()}
              </p>
              <p className="text-xs text-amber-600">
                Balance: ₹{item.creditBalance?.toLocaleString() || 0}
              </p>
            </>
          ) : (
            <span className="text-sm text-slate-400">No credit</span>
          )}
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      cell: (item: any) => <StatusBadge status={item.status === 'active'} />
    },
    {
      key: 'lastPurchase',
      header: 'Last Purchase',
      cell: (item: any) => (
        <div>
          {item.lastPurchaseDate ? (
            <>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {new Date(item.lastPurchaseDate).toLocaleDateString()}
              </p>
              <p className="text-xs text-slate-500">
                {Math.floor((new Date().getTime() - new Date(item.lastPurchaseDate).getTime()) / (1000 * 60 * 60 * 24))} days ago
              </p>
            </>
          ) : (
            <span className="text-sm text-slate-400">No purchases</span>
          )}
        </div>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (item: any) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => onView(item.id)}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onEdit(item.id)}>
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onViewLoyalty(item.id)}
            className={item.loyaltyPoints > 0 ? 'text-amber-600' : ''}
          >
            <Award className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <DataTable 
      data={customers} 
      columns={columns} 
      pagination={pagination}
    />
  );
}