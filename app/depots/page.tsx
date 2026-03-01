'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PageHeader } from '@/components/ui/page-header'
import { DepotStats } from '@/components/depots/DepotStats'
import { DepotTable } from '@/components/depots/DepotTable'
import { DepotFilters } from '@/components/depots/DepotFilters'
import { DepotForm } from '@/components/depots/DepotForm'
import { InchargeForm } from '@/components/depots/InchargeForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { UserPlus, Grid3x3, List } from 'lucide-react'
import { DepotCard } from '@/components/depots/DepotCard'
import { Card } from '@/components/ui/card'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { apiClient } from '@/lib/api/client'
import { toastService } from '@/lib/utils/toast-service'
import {ApiDepot,DepotResponse} from"@/types/depo-types"

export default function DepotsPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [depots, setDepots] = useState<ApiDepot[]>([])
  const [filteredDepots, setFilteredDepots] = useState<any[]>([])
  const [stats, setStats] = useState<any>(null)

  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [depotForm, setDepotForm] = useState<{ open: boolean; mode: 'create' | 'edit'; data: any | null }>({ open: false, mode: 'create', data: null })
  const [inchargeForm, setInchargeForm] = useState(false)
  const [filters, setFilters] = useState({ search: '', status: 'all' })



  // ===============================
  // 🔥 FETCH DEPOTS
  // ===============================



  const fetchDepots = async () => {
    try {
      setLoading(true)
      const loadingToast = toastService.loading("Fetching depots...")

      const response = await apiClient.get<DepotResponse>('/depots')

      setDepots(response.data)

      setFilteredDepots(response.data || [])
      setStats(null)

      toastService.dismiss(loadingToast)
    } catch (error) {
      console.error('Error fetching depots:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDepots()
  }, [])

  // ===============================
  // 🔥 FILTER LOGIC
  // ===============================
  useEffect(() => {
    let filtered = [...depots]

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(d =>
        d.name?.toLowerCase().includes(searchLower) ||
        d.code?.toLowerCase().includes(searchLower) ||
        d.address?.toLowerCase().includes(searchLower) ||
        d.contactNumber?.toLowerCase().includes(searchLower) ||
        d.contactPerson?.toLowerCase().includes(searchLower)
      )
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter(d =>
        filters.status === 'active' ? d.isActive : !d.isActive
      )
    }

    setFilteredDepots(filtered)
  }, [filters, depots])

  // ===============================
  // 🔥 CREATE DEPOT
  // ===============================
  const handleCreateDepot = async (data: any) => {
    const loadingToast = toastService.loading('Creating depot...')
    try {
      await apiClient.post('/depots', data)
      toastService.dismiss(loadingToast)
      toastService.success('Depot created successfully')
    } catch (error) {
      toastService.dismiss(loadingToast)
      toastService.error('Failed to create depot')
    }

    setDepotForm({ open: false, mode: 'create', data: null })
    fetchDepots()
  }

  // ===============================
  // 🔥 DELETE DEPOT
  // ===============================
  const handleDeleteDepot = async (id: string) => {
    const loadingToast = toastService.loading('Deleting depot...')
    try {
      await apiClient.delete(`/depots/${id}`)
      toastService.dismiss(loadingToast)
      toastService.success('Depot deleted successfully')
    } catch (error) {
      toastService.dismiss(loadingToast)
      toastService.error('Failed to delete depot')
    }

    fetchDepots()
  }

  const handleViewDepot = (id: string) => {
    router.push(`/depots/${id}`)
  }

  if (loading) {
    return (
      <DashboardShell>
        <div className="p-10 text-center">Loading depots...</div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <div className="min-h-screen dark:bg-slate-900 p-6">

        <PageHeader
          title="Depot Management"
          description="Manage your warehouses and distribution centers"
          action={{
            label: 'New Depot',
            onClick: () => setDepotForm({ open: true, mode: 'create', data: null })
          }}
        />

        {/* Stats From API */}
        {stats && (
          <div className="mb-6">
            <DepotStats stats={stats} />
          </div>
        )}

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
            <DepotFilters
              filters={filters}
              onFilterChange={(key, value) =>
                setFilters({ ...filters, [key]: value })
              }
              onClear={() => setFilters({ search: '', status: 'all' })}
            />

            {viewMode === 'table' ? (
              <DepotTable
                depots={filteredDepots}
                onView={handleViewDepot}
                onEdit={(id) => {
                  const depot = depots.find(d => d._id === id)
                  if (depot) {
                    setDepotForm({ open: true, mode: 'edit', data: depot })
                  }
                }}
                onDelete={handleDeleteDepot}
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
              <p className="text-center text-slate-500">
                In-charge list will appear here
              </p>
            </Card>
          </TabsContent>
        </Tabs>

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
          onSubmit={() => setInchargeForm(false)}
          depots={depots.map(d => ({
            id: d._id,
            name: d.name,
            code: d.code
          }))}
        />

      </div>
    </DashboardShell>
  )
}