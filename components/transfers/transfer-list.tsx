"use client"

import { useState } from "react"
import {
  Search,
  ChevronDown,
  ArrowRight,
  Package,
  Calendar,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { SAMPLE_TRANSFERS, type Transfer, type TransferStatus } from "@/lib/transfer.data"
import { StatusTimeline } from "@/components/transfers/status-timeline"
import { PriorityBadge } from "@/components/transfers/priority-badge"

function statusBadge(status: TransferStatus) {
  const styles: Record<TransferStatus, string> = {
    Pending: "bg-warning/15 text-warning-foreground border-warning/25",
    Approved: "bg-primary/10 text-primary border-primary/20",
    Shipped: "bg-chart-2/15 text-chart-2 border-chart-2/25",
    Received: "bg-success/15 text-success border-success/25",
  }
  return (
    <span className={cn(
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
      styles[status]
    )}>
      {status}
    </span>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

interface TransferListProps {
  onNewTransfer: () => void
}

export function TransferList({ onNewTransfer }: TransferListProps) {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = SAMPLE_TRANSFERS.filter((t) => {
    const q = search.toLowerCase()
    const matchesSearch =
      !q ||
      t.reference.toLowerCase().includes(q) ||
      t.sourceDepot.toLowerCase().includes(q) ||
      t.destinationDepot.toLowerCase().includes(q) ||
      t.items.some((i) => i.productName.toLowerCase().includes(q))

    const matchesStatus = statusFilter === "all" || t.status === statusFilter

    return matchesSearch && matchesStatus
  })

  function toggleExpand(id: string) {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search transfers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Received">Received</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={onNewTransfer} className="shrink-0">
          + New Transfer
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-10" />
              <TableHead>Reference</TableHead>
              <TableHead className="hidden md:table-cell">Route</TableHead>
              <TableHead className="hidden sm:table-cell">Items</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden lg:table-cell">Priority</TableHead>
              <TableHead className="hidden lg:table-cell">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                  No transfers found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((transfer) => (
                <TransferRow
                  key={transfer.id}
                  transfer={transfer}
                  isExpanded={expandedId === transfer.id}
                  onToggle={() => toggleExpand(transfer.id)}
                />
              ))
            )}
          </TableBody>
        </Table>

        {/* Footer count */}
        <div className="border-t border-border px-4 py-3">
          <span className="text-sm text-muted-foreground">
            {filtered.length} transfer{filtered.length !== 1 ? "s" : ""} found
          </span>
        </div>
      </div>
    </div>
  )
}

// ── Expandable Row ─────────────────────────────────────────────
function TransferRow({
  transfer,
  isExpanded,
  onToggle,
}: {
  transfer: Transfer
  isExpanded: boolean
  onToggle: () => void
}) {
  const totalQty = transfer.items.reduce((s, i) => s + i.quantity, 0)

  return (
    <>
      <TableRow
        className="cursor-pointer"
        onClick={onToggle}
      >
        <TableCell>
          <ChevronDown
            className={cn(
              "size-4 text-muted-foreground transition-transform duration-200",
              isExpanded && "rotate-180"
            )}
          />
        </TableCell>
        <TableCell>
          <span className="font-mono text-sm font-semibold text-primary">
            {transfer.reference}
          </span>
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <div className="flex items-center gap-1.5 text-sm">
            <span className="max-w-[120px] truncate text-foreground">{transfer.sourceDepot.split(" - ")[0]}</span>
            <ArrowRight className="size-3 shrink-0 text-muted-foreground" />
            <span className="max-w-[120px] truncate text-foreground">{transfer.destinationDepot.split(" - ")[0]}</span>
          </div>
        </TableCell>
        <TableCell className="hidden sm:table-cell">
          <Badge variant="secondary" className="font-mono tabular-nums text-xs">
            {transfer.items.length} product{transfer.items.length !== 1 ? "s" : ""} / {totalQty} units
          </Badge>
        </TableCell>
        <TableCell>{statusBadge(transfer.status)}</TableCell>
        <TableCell className="hidden lg:table-cell">
          <PriorityBadge priority={transfer.priority} />
        </TableCell>
        <TableCell className="hidden lg:table-cell">
          <span className="text-sm text-muted-foreground">{formatDate(transfer.createdAt)}</span>
        </TableCell>
      </TableRow>

      {/* Expanded details */}
      {isExpanded && (
        <TableRow className="bg-muted/30 hover:bg-muted/30">
          <TableCell colSpan={7} className="p-0">
            <div className="px-4 py-5 sm:px-6">
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Timeline */}
                <div className="lg:col-span-2">
                  <h4 className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Transfer Progress
                  </h4>
                  <StatusTimeline currentStatus={transfer.status} className="mb-6" />

                  {/* Items */}
                  <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Items
                  </h4>
                  <div className="space-y-2">
                    {transfer.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2"
                      >
                        <div className="flex items-center gap-2">
                          <Package className="size-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium text-card-foreground">{item.productName}</p>
                            <p className="font-mono text-xs text-primary">{item.code}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="font-mono text-xs tabular-nums">
                            {item.quantity} units
                          </Badge>
                          <span className="text-xs text-muted-foreground tabular-nums">
                            {item.quantity * item.packSize} KG
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary card */}
                <Card className="border-border bg-card/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold">Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Source</span>
                        <span className="max-w-[140px] truncate text-right font-medium text-card-foreground">
                          {transfer.sourceDepot}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Destination</span>
                        <span className="max-w-[140px] truncate text-right font-medium text-card-foreground">
                          {transfer.destinationDepot}
                        </span>
                      </div>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Priority</span>
                        <PriorityBadge priority={transfer.priority} />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Products</span>
                        <span className="font-medium tabular-nums text-card-foreground">{transfer.items.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Units</span>
                        <span className="font-medium tabular-nums text-card-foreground">{totalQty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Weight</span>
                        <span className="font-medium tabular-nums text-card-foreground">
                          {transfer.items.reduce((s, i) => s + i.quantity * i.packSize, 0).toLocaleString()} KG
                        </span>
                      </div>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="size-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          Created: {formatDate(transfer.createdAt)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="size-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          Updated: {formatDate(transfer.updatedAt)}
                        </span>
                      </div>
                    </div>
                    {transfer.notes && (
                      <>
                        <div className="h-px bg-border" />
                        <div>
                          <span className="text-xs text-muted-foreground">Notes</span>
                          <p className="mt-0.5 text-sm text-card-foreground">{transfer.notes}</p>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  )
}
