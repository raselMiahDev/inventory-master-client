'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { StatsCard } from '@/components/ui/stats-card';
import { DepotForm } from '@/components/depots/DepotForm';
import { apiClient } from '@/lib/api/client';
import { ApiDepot } from '@/types/depo-types';
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

// Define the API response type
interface ApiResponse {
  data: ApiDepot;
  success: boolean;
}

export default function SingleDepotPage() {
  const [loading, setLoading] = useState(true);
  const [depot, setDepot] = useState<ApiDepot | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const router = useRouter();
  const [editForm, setEditForm] = useState(false);

  const fetchDepot = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Type the response properly
      const response = await apiClient.get<ApiResponse>(`/depots/${id}`);
      console.log('API Response:', response.data);
      
      // Access the nested data property
      setDepot(response.data)
    } catch (error) {
      console.error('Error fetching depot:', error);
      setError('Failed to load depot details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDepot();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading depot details...</p>
        </div>
      </div>
    );
  }

  if (error || !depot) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
        <Button 
          variant="ghost" 
          onClick={() => router.push('/depots')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Depots
        </Button>
        <Card className="p-6 text-center">
          <p className="text-red-500">{error || 'Depot not found'}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/depots')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Depots
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {depot.name}
                </h1>
                <StatusBadge status={depot.isActive} />
              </div>
              <p className="text-sm text-slate-500">Code: {depot.code}</p>
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

        {/* Stats Cards - Note: Using _id instead of id for any references */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Total Products"
            value={depot.stats?.products || 0}
            icon={Package}
            color="blue"
          />
          <StatsCard
            title="Total Stock"
            value={`${depot.stats?.totalStock || 0} KG`}
            icon={TrendingUp}
            color="purple"
          />
          <StatsCard
            title="Stock Value"
            value={`₹${depot.stats?.totalValue?.toLocaleString() || 0}`}
            icon={TrendingUp}
            color="emerald"
          />
          <StatsCard
            title="Monthly Sales"
            value={`₹${depot.stats?.monthlySales?.toLocaleString() || 0}`}
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
                    <p className="font-medium">{depot.code}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-500">Address</p>
                    <p className="font-medium">{depot.address}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-500">Contact Person</p>
                    <p className="font-medium">{depot.contactPerson}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-500">Contact Number</p>
                    <p className="font-medium">{depot.contactNumber}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Optional: Display MongoDB ID if needed */}
            <div className="mt-4 pt-4 border-t text-xs text-slate-400">
              Depot ID: {depot._id}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Button 
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={() => router.push(`/depots/${depot._id}/inventory`)}
              >
                View Inventory
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => router.push(`/depots/${depot._id}/transfers`)}
              >
                View Transfers
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => router.push(`/depots/${depot._id}/sales`)}
              >
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
        </Tabs>

        {/* Edit Form */}
        <DepotForm
          open={editForm}
          onClose={() => setEditForm(false)}
          onSubmit={async (data) => {
            try {
              // Update the depot - Note: using _id from depot object
              await apiClient.put(`/depots/${depot._id}`, data);
              // Refresh depot data
              await fetchDepot();
              setEditForm(false);
            } catch (error) {
              console.error('Error updating depot:', error);
            }
          }}
          initialData={depot}
          mode="edit"
        />
      </div>
    </div>
  );
}