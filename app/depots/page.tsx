// app/depots/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { DepotStats } from '@/components/depots/DepotStats';
import { DepotTable } from '@/components/depots/DepotTable';
import { DepotFilters } from '@/components/depots//DepotFilters';
import { DepotForm } from '@/components/depots//DepotForm';
import { InchargeForm } from '@/components/depots//InchargeForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { UserPlus, Grid3x3, List } from 'lucide-react';
import { DepotCard } from '@/components/depots//DepotCard';
import { Card } from '@/components/ui/card';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';

// Mock data - replace with API calls
const mockDepots = [
  {
    id: '1',
    name: 'Main Warehouse',
    code: 'WH001',
    address: '123 Industrial Area, Sector A, City',
    contactPerson: 'John Doe',
    contactNumber: '+1234567890',
    isActive: true,
    stats: { products: 45, value: 1250000 }
  },
  {
    id: '2',
    name: 'North Depot',
    code: 'ND002',
    address: '456 Northern Area, Sector B, City',
    contactPerson: 'Jane Smith',
    contactNumber: '+1234567891',
    isActive: true,
    stats: { products: 32, value: 890000 }
  },
  {
    id: '3',
    name: 'South Depot',
    code: 'SD003',
    address: '789 Southern Area, Sector C, City',
    contactPerson: 'Bob Johnson',
    contactNumber: '+1234567892',
    isActive: false,
    stats: { products: 28, value: 670000 }
  }
];

const mockStats = {
  totalDepots: 12,
  activeDepots: 9,
  totalProducts: 245,
  totalValue: 3250000,
  totalIncharge: 8
};

const mockDepotsForSelect = [
  { id: '1', name: 'Main Warehouse', code: 'WH001' },
  { id: '2', name: 'North Depot', code: 'ND002' },
  { id: '3', name: 'South Depot', code: 'SD003' }
];

export default function DepotsPage() {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [depotForm, setDepotForm] = useState<{ open: boolean; mode: 'create' | 'edit'; data: any | null }>({ open: false, mode: 'create', data: null });
  const [inchargeForm, setInchargeForm] = useState(false);
  const [filters, setFilters] = useState({ search: '', status: 'all' });
  const [filteredDepots, setFilteredDepots] = useState(mockDepots);

  useEffect(() => {
    let filtered = [...mockDepots];
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(d => 
        d.name.toLowerCase().includes(searchLower) ||
        d.code.toLowerCase().includes(searchLower) ||
        d.address.toLowerCase().includes(searchLower)
      );
    }
    
    if (filters.status !== 'all') {
      filtered = filtered.filter(d => 
        filters.status === 'active' ? d.isActive : !d.isActive
      );
    }
    
    setFilteredDepots(filtered);
  }, [filters]);

  const handleCreateDepot = (data: any) => {
    console.log('Create depot:', data);
    setDepotForm({ open: false, mode: 'create', data: null });
  };

  const handleCreateIncharge = (data: any) => {
    console.log('Create incharge:', data);
    setInchargeForm(false);
  };

  const handleViewDepot = (id: string) => {
    window.location.href = `/depots/${id}`;
  };

  return (
    <DashboardShell>
          <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="p-6">
        {/* Header */}
        <PageHeader
          title="Depot Management"
          description="Manage your warehouses and distribution centers"
          action={{
            label: 'New Depot',
            onClick: () => setDepotForm({ open: true, mode: 'create', data: null })
          }}
        />

        {/* Stats */}
        <div className="mb-6">
          <DepotStats stats={mockStats} />
        </div>

        {/* Tabs for main sections */}
        <Tabs defaultValue="depots" className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="depots">Depots</TabsTrigger>
              <TabsTrigger value="incharges">In-charges</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setInchargeForm(true)}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Add In-charge
              </Button>
              
              <div className="flex items-center border rounded-lg">
                <Button
                  variant={viewMode === 'table' ? 'secondary' : 'ghost'}
                  size="sm"
                  className="rounded-r-none"
                  onClick={() => setViewMode('table')}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="sm"
                  className="rounded-l-none"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <TabsContent value="depots" className="space-y-4">
            {/* Filters */}
            <DepotFilters
              filters={filters}
              onFilterChange={(key, value) => setFilters({ ...filters, [key]: value })}
              onClear={() => setFilters({ search: '', status: 'all' })}
            />

            {/* View */}
            {viewMode === 'table' ? (
              <DepotTable
                depots={filteredDepots}
                onView={handleViewDepot}
                onEdit={(id) => {
                  const depot = mockDepots.find(d => d.id === id);
                  if (depot) {
                    setDepotForm({ open: true, mode: 'edit', data: depot });
                  }
                }}
                onDelete={(id) => console.log('Delete:', id)}
                pagination={{ page: 1, totalPages: 1, onPageChange: () => {} }}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDepots.map(depot => (
                  <DepotCard
                    key={depot.id}
                    depot={depot}
                    onView={handleViewDepot}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="incharges">
            <Card className="p-6">
              <p className="text-center text-slate-500">In-charge list will appear here</p>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Forms */}
        <DepotForm
          open={depotForm.open}
          onClose={() => setDepotForm({ open: false, mode: 'create', data: null })}
          onSubmit={handleCreateDepot}
          initialData={depotForm.data}
          mode={depotForm.mode}
        />

        <InchargeForm
          open={inchargeForm}
          onClose={() => setInchargeForm(false)}
          onSubmit={handleCreateIncharge}
          depots={mockDepotsForSelect}
        />
      </div>
    </div>
    </DashboardShell>
  );
}