"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const lowStockItems = [
  { name: "Laptop Stand Pro", sku: "LSP-001", stock: 5, reorder: 20, max: 100 },
  { name: "Wireless Mouse X", sku: "WMX-045", stock: 8, reorder: 25, max: 100 },
  { name: "USB-C Cable 2m", sku: "USC-200", stock: 12, reorder: 50, max: 200 },
]

export function LowStockAlert() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg font-bold text-card-foreground">
          Low Stock Alert
        </CardTitle>
        <Button variant="link" size="sm" className="text-primary text-sm px-0 h-auto">
          View All
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {lowStockItems.map((item) => {
          const percentage = (item.stock / item.max) * 100
          return (
            <div key={item.sku} className="flex flex-col gap-2">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-card-foreground">
                  {item.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {"SKU: "}
                  {item.sku}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-destructive">
                  {"Stock: "}
                  {item.stock}
                </span>
                <span className="text-xs text-muted-foreground">
                  {"Reorder: "}
                  {item.reorder}
                </span>
              </div>
              <Progress
                value={percentage}
                className="h-2 [&>div]:bg-destructive"
              />
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
