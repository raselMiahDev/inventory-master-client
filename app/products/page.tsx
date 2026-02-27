"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { ProductTable } from "@/components/products/product-table"
import { AddProductModal } from "@/components/products/add-product-modal"

export default function ProductsPage() {
  const [addOpen, setAddOpen] = useState(false)

  return (
    <DashboardShell activeItem="All Products">
      <div className="ml-10">
       <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground text-balance">
          All Products
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your product inventory, pricing, and stock levels.
        </p>
      </div>

      <ProductTable onAddProduct={() => setAddOpen(true)} />
      <AddProductModal open={addOpen} onOpenChange={setAddOpen} />
      </div>
    </DashboardShell>
  )
}
