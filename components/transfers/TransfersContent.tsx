"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { TransferList } from "@/components/transfers/transfer-list"
import { NewTransferForm } from "@/components/transfers/new-transfer-form"
import {
  ArrowLeftRight,
  Clock,
  Truck,
  PackageCheck,
} from "lucide-react"
import { SAMPLE_TRANSFERS } from "@/lib/transfer.data"

const stats = [
  {
    label: "Total Transfers",
    value: SAMPLE_TRANSFERS.length,
    icon: ArrowLeftRight,
    color: "bg-primary/10 text-primary",
  },
  {
    label: "Pending",
    value: SAMPLE_TRANSFERS.filter((t) => t.status === "Pending").length,
    icon: Clock,
    color: "bg-warning/15 text-warning-foreground",
  },
  {
    label: "In Transit",
    value: SAMPLE_TRANSFERS.filter((t) => t.status === "Shipped").length,
    icon: Truck,
    color: "bg-chart-2/15 text-chart-2",
  },
  {
    label: "Received",
    value: SAMPLE_TRANSFERS.filter((t) => t.status === "Received").length,
    icon: PackageCheck,
    color: "bg-success/15 text-success",
  },
]

export function TransfersContent() {
  const searchParams = useSearchParams()
  const [newOpen, setNewOpen] = useState(false)

  useEffect(() => {
    if (searchParams.get("new") === "true") {
      setNewOpen(true)
    }
  }, [searchParams])

  return (
    <DashboardShell activeItem="All Transfers">
      <div className="ml-10">
              <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">
          Inter-Depot Transfers
        </h1>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-lg border bg-card p-4"
            >
              <div className={`flex size-10 items-center justify-center rounded-lg ${stat.color}`}>
                <Icon className="size-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </div>
          )
        })}
      </div>

      <TransferList onNewTransfer={() => setNewOpen(true)} />
      <NewTransferForm open={newOpen} onOpenChange={setNewOpen} />
      </div>
    </DashboardShell>
  )
}