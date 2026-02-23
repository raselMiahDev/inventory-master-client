"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type ActivityType = "Invoice" | "Quotation" | "Stock"
type ActivityStatus = "Paid" | "Pending" | "Added"

interface ActivityItem {
  type: ActivityType
  reference: string
  company: string
  value: string
  valueLabel?: string
  status: ActivityStatus
  time: string
}

const activities: ActivityItem[] = [
  {
    type: "Invoice",
    reference: "INV-1234",
    company: "Acme Corp",
    value: "$2,340",
    status: "Paid",
    time: "2 hours ago",
  },
  {
    type: "Quotation",
    reference: "QUO-5678",
    company: "Tech Solutions",
    value: "$4,580",
    status: "Pending",
    time: "5 hours ago",
  },
  {
    type: "Stock",
    reference: "Product #234",
    company: "Warehouse A",
    value: "50 units",
    status: "Added",
    time: "1 day ago",
  },
  {
    type: "Invoice",
    reference: "INV-1235",
    company: "Global Inc",
    value: "$1,200",
    status: "Paid",
    time: "1 day ago",
  },
]

const statusStyles: Record<ActivityStatus, string> = {
  Paid: "bg-success/10 text-success border-success/20",
  Pending: "bg-warning/10 text-warning border-warning/20",
  Added: "bg-success/10 text-success border-success/20",
}

const typeStyles: Record<ActivityType, string> = {
  Invoice: "text-primary",
  Quotation: "text-success",
  Stock: "text-primary",
}

export function RecentActivity() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold text-card-foreground">
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-0">
        {activities.map((activity, idx) => (
          <div
            key={`${activity.reference}-${idx}`}
            className={cn(
              "flex items-center justify-between gap-4 px-1 py-4",
              idx !== activities.length - 1 && "border-b border-border"
            )}
          >
            {/* Left: Type + Reference + Company */}
            <div className="flex flex-col gap-0.5 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-card-foreground">
                  {activity.type}
                </span>
                <span className={cn("text-sm font-medium", typeStyles[activity.type])}>
                  {activity.reference}
                </span>
              </div>
              <span className="text-sm text-muted-foreground truncate">
                {activity.company}
              </span>
            </div>

            {/* Right: Value + Status + Time */}
            <div className="flex items-center gap-4 shrink-0">
              <span className="text-sm font-bold text-card-foreground">
                {activity.value}
              </span>
              <Badge
                variant="outline"
                className={cn(
                  "text-xs font-medium border",
                  statusStyles[activity.status]
                )}
              >
                {activity.status}
              </Badge>
              <span className="text-xs text-muted-foreground whitespace-nowrap hidden sm:block">
                {activity.time}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
