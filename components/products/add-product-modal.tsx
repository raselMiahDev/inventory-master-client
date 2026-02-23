"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const CATEGORIES = [
  "Grains",
  "Oils",
  "Sweeteners",
  "Spices",
  "Pulses",
  "Canned",
  "Condiments",
  "Dairy",
  "Beverages",
  "Baking",
]

interface AddProductModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddProductModal({ open, onOpenChange }: AddProductModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    category: "",
    packSize: "",
    unitPrice: "",
    stock: "",
  })

  function handleChange(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // In production, this would POST to an API
    onOpenChange(false)
    setFormData({ name: "", code: "", category: "", packSize: "", unitPrice: "", stock: "" })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill in the product details below. All fields are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-2">
          {/* Product Name */}
          <div className="grid gap-2">
            <Label htmlFor="product-name">Product Name</Label>
            <Input
              id="product-name"
              placeholder="e.g. Premium Basmati Rice"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
          </div>

          {/* Code + Category */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="product-code">Product Code</Label>
              <Input
                id="product-code"
                placeholder="e.g. PBR-001"
                value={formData.code}
                onChange={(e) => handleChange("code", e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="product-category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(v) => handleChange("category", v)}
                required
              >
                <SelectTrigger className="w-full" id="product-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Pack Size + Unit Price + Opening Stock */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="pack-size">Pack Size (KG)</Label>
              <Input
                id="pack-size"
                type="number"
                min="0"
                step="0.1"
                placeholder="0"
                value={formData.packSize}
                onChange={(e) => handleChange("packSize", e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="unit-price">Unit Price ($)</Label>
              <Input
                id="unit-price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={formData.unitPrice}
                onChange={(e) => handleChange("unitPrice", e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="opening-stock">Opening Stock</Label>
              <Input
                id="opening-stock"
                type="number"
                min="0"
                step="1"
                placeholder="0"
                value={formData.stock}
                onChange={(e) => handleChange("stock", e.target.value)}
                required
              />
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
