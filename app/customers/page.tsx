'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { CustomerStats } from '@/components/customers/CustomerStats';
import { CustomerTable } from '@/components/customers/CustomerTable';
import { CustomerCard } from '@/components/customers/CustomerCard';
import { CustomerFilters } from '@/components/customers/CustomerFilters';
import { CustomerForm } from '@/components/customers/CustomerForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Grid3x3, List, UserPlus } from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';

// Mock data - replace with API calls
const mockCustomers = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh.k@example.com',
    phone: '+91 98765 43210',
    address: '123 Main St',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    gstin: '27ABCDE1234F1Z5',
    customerType: 'wholesale',
    loyaltyPoints: 1250,
    totalPurchases: 45,
    totalSpent: 125000,
    lastPurchaseDate: '2026-02-15',
    creditLimit: 50000,
    creditBalance: 15000,
    paymentTerms: 'net30',
    status: 'active',
    tags: ['vip', 'regular'],
    notes: 'Preferred customer'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya.s@example.com',
    phone: '+91 98765 43211',
    city: 'Delhi',
    state: 'Delhi',
    customerType: 'retail',
    loyaltyPoints: 350,
    totalPurchases: 12,
    totalSpent: 35000,
    lastPurchaseDate: '2026-02-10',
    status: 'active',
    tags: ['new']
  },
  {
    id: '3',
    name: 'Amit Patel',
    email: 'amit.p@example.com',
    phone: '+91 98765 43212',
    city: 'Ahmedabad',
    state: 'Gujarat',
    customerType: 'distributor',
    loyaltyPoints: 2500,
    totalPurchases: 89,
    totalSpent: 450000,
    lastPurchaseDate: '2026-02-14',
    creditLimit: 100000,
    creditBalance: 45000,
    paymentTerms: 'net15',
    status: 'active',
    tags: ['vip', 'distributor']
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    email: 'sneha.r@example.com',
    phone: '+91 98765 43213',
    city: 'Hyderabad',
    state: 'Telangana',
    customerType: 'retail',
    loyaltyPoints: 180,
    totalPurchases: 5,
    totalSpent: 12500,
    lastPurchaseDate: '2026-02-01',
    status: 'inactive'
  }
];

const mockStats = {
  totalCustomers: 156,
  activeCustomers: 142,
  wholesaleCustomers: 45,
  retailCustomers: 98,
  totalRevenue: 2450000,
  averagePurchase: 15705
};

const mockCities = ['Mumbai', 'Delhi', 'Ahmedabad', 'Hyderabad', 'Bangalore', 'Chennai'];

export default function CustomersPage() {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [customerForm, setCustomerForm] = useState<{ open: boolean; mode: 'create' | 'edit'; data: any }>({ open: false, mode: 'create', data: null });
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    status: 'all',
    city: ''
  });
  const [filteredCustomers, setFilteredCustomers] = useState(mockCustomers);

  useEffect(() => {
    let filtered = [...mockCustomers];
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(searchLower) ||
        c.email.toLowerCase().includes(searchLower) ||
        c.phone.includes(searchLower)
      );
    }
    
    if (filters.type !== 'all') {
      filtered = filtered.filter(c => c.customerType === filters.type);
    }
    
    if (filters.status !== 'all') {
      filtered = filtered.filter(c => 
        filters.status === 'active' ? c.status === 'active' : c.status !== 'active'
      );
    }
    
    if (filters.city) {
      filtered = filtered.filter(c => c.city === filters.city);
    }
    
    setFilteredCustomers(filtered);
  }, [filters]);

  const handleCreateCustomer = (data: any) => {
    console.log('Create customer:', data);
    setCustomerForm({ open: false, mode: 'create', data: null });
  };

  const handleViewCustomer = (id: string) => {
    window.location.href = `/customers/${id}`;
  };

  const handleEditCustomer = (id: string) => {
    const customer = mockCustomers.find(c => c.id === id);
    if (customer) {
      setCustomerForm({ open: true, mode: 'edit', data: customer });
    }
  };

  const handleViewLoyalty = (id: string) => {
    console.log('View loyalty for:', id);
    // Open loyalty modal or navigate
  };

  return (
    <DashboardShell>
            <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      <div className="p-6">
        {/* Header */}
        <PageHeader
          title="Customer Management"
          description="Manage your customers and track their purchase history"
          action={{
            label: 'Add Customer',
            onClick: () => setCustomerForm({ open: true, mode: 'create', data: null })
          }}
        />

        {/* Stats */}
        <div className="mb-6">
          <CustomerStats stats={mockStats} />
        </div>

        {/* Filters */}
        <div className="mb-6">
          <CustomerFilters
            filters={filters}
            onFilterChange={(key, value) => setFilters({ ...filters, [key]: value })}
            onClear={() => setFilters({ search: '', type: 'all', status: 'all', city: '' })}
            cities={mockCities}
          />
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-500">
            Showing {filteredCustomers.length} of {mockCustomers.length} customers
          </p>
          <div className="flex items-center gap-2 border rounded-lg">
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

        {/* View */}
        {viewMode === 'table' ? (
          <CustomerTable
            customers={filteredCustomers}
            onView={handleViewCustomer}
            onEdit={handleEditCustomer}
            onViewLoyalty={handleViewLoyalty}
            pagination={{ page: 1, totalPages: 1, onPageChange: () => {} }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCustomers.map(customer => (
              <CustomerCard 
                key={customer.id}
                customer={customer}
                onView={handleViewCustomer}
                onEdit={handleEditCustomer}
              />
            ))}
          </div>
        )}

        {/* Forms */}
        <CustomerForm
          open={customerForm.open}
          onClose={() => setCustomerForm({ open: false, mode: 'create', data: null })}
          onSubmit={handleCreateCustomer}
          initialData={customerForm.data}
          mode={customerForm.mode}
        />
      </div>
    </div>
    </DashboardShell>
  );
}