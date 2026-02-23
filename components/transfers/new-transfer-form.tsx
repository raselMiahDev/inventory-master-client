"use client"

import { useState, useMemo } from "react"
import {
  ArrowRight,
  Plus,
  Trash2,
  Package,
  Warehouse,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { DEPOTS, TRANSFER_PRODUCTS, type Priority, type TransferItem } from "@/lib/transfer.data"
import { PriorityBadge } from "@/components/transfers/priority-badge"

interface NewTransferFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewTransferForm({ open, onOpenChange }: NewTransferFormProps) {
  const [sourceDepot, setSourceDepot] = useState("")
  const [destDepot, setDestDepot] = useState("")
  const [priority, setPriority] = useState<Priority>("Normal")
  const [notes, setNotes] = useState("")
  const [items, setItems] = useState<(TransferItem & { id: string })[]>([])
  const [addingProduct, setAddingProduct] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState("")
  const [quantity, setQuantity] = useState("")

  const availableDestDepots = DEPOTS.filter((d) => d.name !== sourceDepot)
  const availableProducts = TRANSFER_PRODUCTS.filter(
    (p) => !items.some((i) => i.productId === p.id)
  )

  const totalItems = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items])
  const totalWeight = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity * i.packSize, 0),
    [items]
  )

  function handleAddItem() {
    const product = TRANSFER_PRODUCTS.find((p) => p.id === selectedProduct)
    if (!product || !quantity) return
    const qty = Math.min(Number(quantity), product.available)
    if (qty <= 0) return

    setItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        productId: product.id,
        productName: product.name,
        code: product.code,
        quantity: qty,
        packSize: product.packSize,
      },
    ])
    setSelectedProduct("")
    setQuantity("")
    setAddingProduct(false)
  }

  function handleRemoveItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  function handleReset() {
    setSourceDepot("")
    setDestDepot("")
    setPriority("Normal")
    setNotes("")
    setItems([])
    setAddingProduct(false)
    setSelectedProduct("")
    setQuantity("")
  }

  function handleSubmit() {
    handleReset()
    onOpenChange(false)
  }

  const canSubmit = sourceDepot && destDepot && sourceDepot !== destDepot && items.length > 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Create New Transfer</DialogTitle>
          <DialogDescription>
            Transfer products between depots. Select source, destination, and add items.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left: Form fields */}
          <div className="flex flex-col gap-5 lg:col-span-2">
            {/* Depot selectors */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="flex-1 space-y-2">
                <Label className="flex items-center gap-1.5 text-sm font-medium">
                  <Warehouse className="size-3.5 text-muted-foreground" />
                  Source Depot
                </Label>
                <Select value={sourceDepot} onValueChange={(v) => {
                  setSourceDepot(v)
                  if (destDepot === v) setDestDepot("")
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select source..." />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPOTS.map((d) => (
                      <SelectItem key={d.id} value={d.name}>
                        {d.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="hidden sm:flex sm:items-center sm:pb-1">
                <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                  <ArrowRight className="size-4 text-primary" />
                </div>
              </div>

              <div className="flex-1 space-y-2">
                <Label className="flex items-center gap-1.5 text-sm font-medium">
                  <Warehouse className="size-3.5 text-muted-foreground" />
                  Destination Depot
                </Label>
                <Select value={destDepot} onValueChange={setDestDepot} disabled={!sourceDepot}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDestDepots.map((d) => (
                      <SelectItem key={d.id} value={d.name}>
                        {d.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Priority + Notes */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="w-full space-y-2 sm:w-40">
                <Label className="text-sm font-medium">Priority</Label>
                <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(["Low", "Normal", "High", "Urgent"] as Priority[]).map((p) => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 space-y-2">
                <Label className="text-sm font-medium">Notes (optional)</Label>
                <Input
                  placeholder="Transfer notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>

            {/* Product items */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-1.5 text-sm font-medium">
                  <Package className="size-3.5 text-muted-foreground" />
                  Transfer Items
                </Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAddingProduct(true)}
                  disabled={availableProducts.length === 0}
                >
                  <Plus className="mr-1 size-3.5" />
                  Add Product
                </Button>
              </div>

              {/* Add product inline form */}
              {addingProduct && (
                <div className="flex flex-col gap-3 rounded-lg border border-dashed border-primary/30 bg-primary/5 p-3 sm:flex-row sm:items-end">
                  <div className="flex-1 space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Product</Label>
                    <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                      <SelectTrigger size="sm">
                        <SelectValue placeholder="Select product..." />
                      </SelectTrigger>
                      <SelectContent>
                        {availableProducts.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.name} ({p.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full space-y-1.5 sm:w-24">
                    <Label className="text-xs text-muted-foreground">Qty</Label>
                    <Input
                      type="number"
                      min={1}
                      max={
                        TRANSFER_PRODUCTS.find((p) => p.id === selectedProduct)?.available ?? 999
                      }
                      placeholder="0"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="h-8"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={handleAddItem}
                      disabled={!selectedProduct || !quantity || Number(quantity) <= 0}
                    >
                      Add
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => {
                      setAddingProduct(false)
                      setSelectedProduct("")
                      setQuantity("")
                    }}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* Items list */}
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-8 text-center text-muted-foreground">
                  <Package className="mb-2 size-8 opacity-40" />
                  <p className="text-sm">No items added yet.</p>
                  <p className="text-xs">Click &quot;Add Product&quot; to add items to this transfer.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-lg border border-border bg-card p-3"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-card-foreground">
                          {item.productName}
                        </p>
                        <div className="mt-0.5 flex items-center gap-2">
                          <span className="font-mono text-xs text-primary">{item.code}</span>
                          <span className="text-xs text-muted-foreground">
                            {item.packSize} KG/pack
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="font-mono tabular-nums">
                          {item.quantity} units
                        </Badge>
                        <span className="text-xs text-muted-foreground tabular-nums">
                          {item.quantity * item.packSize} KG
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7 text-destructive hover:text-destructive"
                          onClick={() => handleRemoveItem(item.id)}
                          aria-label={`Remove ${item.productName}`}
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Transfer summary */}
          <div className="lg:col-span-2">
            <Card className="border-border bg-muted/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Transfer Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">From</span>
                    <span className="max-w-[140px] truncate text-right font-medium text-card-foreground">
                      {sourceDepot || "---"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">To</span>
                    <span className="max-w-[140px] truncate text-right font-medium text-card-foreground">
                      {destDepot || "---"}
                    </span>
                  </div>
                </div>

                <div className="h-px bg-border" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Priority</span>
                    <PriorityBadge priority={priority} />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Products</span>
                    <span className="font-medium tabular-nums text-card-foreground">{items.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Units</span>
                    <span className="font-medium tabular-nums text-card-foreground">{totalItems}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Weight</span>
                    <span className="font-medium tabular-nums text-card-foreground">{totalWeight.toLocaleString()} KG</span>
                  </div>
                </div>

                {notes && (
                  <>
                    <div className="h-px bg-border" />
                    <div>
                      <span className="text-xs text-muted-foreground">Notes</span>
                      <p className="mt-0.5 text-sm text-card-foreground">{notes}</p>
                    </div>
                  </>
                )}

                <div className="h-px bg-border" />

                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    disabled={!canSubmit}
                    onClick={handleSubmit}
                  >
                    Submit Transfer
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
