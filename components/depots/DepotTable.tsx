// app/depots/components/DepotTable.tsx
'use client';

import { DataTable } from '@/components/ui/data-table';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, Eye } from 'lucide-react';

interface DepotTableProps {
  depots: any[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  pagination?: {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
}

export function DepotTable({ depots, onView, onEdit, onDelete, pagination }: DepotTableProps) {
  const columns = [
    {
      key: 'name',
      header: 'Depot Name',
      cell: (item: any) => (
        <div>
          <p className="font-medium text-slate-900 dark:text-white">{item.name}</p>
          <p className="text-xs text-slate-500">{item.code}</p>
        </div>
      )
    },
    {
      key: 'address',
      header: 'Address',
      cell: (item: any) => (
        <p className="text-sm text-slate-600 dark:text-slate-400">{item.address}</p>
      )
    },
    {
      key: 'contactPerson',
      header: 'Contact Person',
      cell: (item: any) => (
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-400">{item.contactPerson}</p>
          <p className="text-xs text-slate-500">{item.contactNumber}</p>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      cell: (item: any) => <StatusBadge status={item.isActive} />
    },
    {
      key: 'stats',
      header: 'Stats',
      cell: (item: any) => (
        <div className="text-sm">
          <p>{item.stats?.products || 0} Products</p>
          <p className="text-emerald-600">₹{(item.stats?.value || 0).toLocaleString()}</p>
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
          <Button variant="ghost" size="icon" onClick={() => onDelete(item.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <DataTable 
      data={depots} 
      columns={columns} 
      pagination={pagination}
    />
  );
}