
'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { StatsCard } from '@/components/ui/stats-card';
import { DepotForm } from '@/components/depots/DepotForm';
import { 
  Building2, 
  MapPin, 
  Phone, 
  User, 
  Package, 
  TrendingUp,
  Edit2,
  ArrowLeft
} from 'lucide-react';

const mockDepot = {
  id: '1',
  name: 'Main Warehouse',
  code: 'WH001',
  address: '123 Industrial Area, Sector A, City - 400001',
  contactPerson: 'John Doe',
  contactNumber: '+1234567890',
  isActive: true,
  createdAt: '2026-01-15',
  stats: {
    products: 45,
    totalStock: 12500,
    totalValue: 1250000,
    monthlySales: 325000,
    pendingTransfers: 3
  },
  incharges: [
    { id: '1', name: 'John Doe', username: 'john.doe', lastActive: '2026-02-16' }
  ]
};

export default function SingleDepotPage() {
  const { id } = useParams();
  const [editForm, setEditForm] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => window.location.href = '/depots'}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Depots
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {mockDepot.name}
                </h1>
                <StatusBadge status={mockDepot.isActive} />
              </div>
              <p className="text-sm text-slate-500">Code: {mockDepot.code}</p>
            </div>
            <Button 
              onClick={() => setEditForm(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Edit2 className="mr-2 h-4 w-4" />
              Edit Depot
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Total Products"
            value={mockDepot.stats.products}
            icon={Package}
            color="blue"
          />
          <StatsCard
            title="Total Stock"
            value={`${mockDepot.stats.totalStock} KG`}
            icon={TrendingUp}
            color="purple"
          />
          <StatsCard
            title="Stock Value"
            value={`₹${mockDepot.stats.totalValue.toLocaleString()}`}
            icon={TrendingUp}
            color="emerald"
          />
          <StatsCard
            title="Monthly Sales"
            value={`₹${mockDepot.stats.monthlySales.toLocaleString()}`}
            icon={TrendingUp}
            color="amber"
          />
        </div>

        {/* Depot Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Info Card */}
          <Card className="p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Depot Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-500">Depot Code</p>
                    <p className="font-medium">{mockDepot.code}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-500">Address</p>
                    <p className="font-medium">{mockDepot.address}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-500">Contact Person</p>
                    <p className="font-medium">{mockDepot.contactPerson}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-500">Contact Number</p>
                    <p className="font-medium">{mockDepot.contactNumber}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                View Inventory
              </Button>
              <Button variant="outline" className="w-full">
                View Transfers
              </Button>
              <Button variant="outline" className="w-full">
                View Sales
              </Button>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="inventory">
          <TabsList>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="transfers">Transfers</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="incharges">In-charges</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="mt-4">
            <Card className="p-6">
              <p className="text-center text-slate-500">Inventory list will appear here</p>
            </Card>
          </TabsContent>

          <TabsContent value="transfers" className="mt-4">
            <Card className="p-6">
              <p className="text-center text-slate-500">Transfer history will appear here</p>
            </Card>
          </TabsContent>

          <TabsContent value="sales" className="mt-4">
            <Card className="p-6">
              <p className="text-center text-slate-500">Sales report will appear here</p>
            </Card>
          </TabsContent>

          <TabsContent value="incharges" className="mt-4">
            <Card className="p-6">
              <div className="space-y-4">
                {mockDepot.incharges.map(incharge => (
                  <div key={incharge.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{incharge.name}</p>
                      <p className="text-sm text-slate-500">{incharge.username}</p>
                    </div>
                    <p className="text-sm text-slate-500">Last active: {incharge.lastActive}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Form */}
        <DepotForm
          open={editForm}
          onClose={() => setEditForm(false)}
          onSubmit={(data) => {
            console.log('Update depot:', data);
            setEditForm(false);
          }}
          initialData={mockDepot}
          mode="edit"
        />
      </div>
    </div>
  );
}