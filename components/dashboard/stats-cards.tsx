"use client"

import { Package, FileText, DollarSign, Users, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const stats = [
  {
    title: "Total Products",
    value: "1,248",
    change: "+12%",
    trend: "up" as const,
    icon: Package,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    title: "Active Quotations",
    value: "43",
    change: "+8%",
    trend: "up" as const,
    icon: FileText,
    iconBg: "bg-[oklch(0.55_0.16_195)]/10",
    iconColor: "text-[oklch(0.55_0.16_195)]",
  },
  {
    title: "Monthly Revenue",
    value: "$45,231",
    change: "+23%",
    trend: "up" as const,
    icon: DollarSign,
    iconBg: "bg-success/10",
    iconColor: "text-success",
  },
  {
    title: "Total Customers",
    value: "892",
    change: "-3%",
    trend: "down" as const,
    icon: Users,
    iconBg: "bg-muted",
    iconColor: "text-muted-foreground",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className="border-border bg-card transition-shadow hover:shadow-md"
        >
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div
                className={cn(
                  "flex size-10 items-center justify-center rounded-lg",
                  stat.iconBg
                )}
              >
                <stat.icon className={cn("size-5", stat.iconColor)} />
              </div>
              <div className="flex items-center gap-1">
                {stat.trend === "up" ? (
                  <TrendingUp className="size-4 text-success" />
                ) : (
                  <TrendingDown className="size-4 text-destructive" />
                )}
                <span
                  className={cn(
                    "text-sm font-semibold",
                    stat.trend === "up" ? "text-success" : "text-destructive"
                  )}
                >
                  {stat.change}
                </span>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-0.5">
              <span className="text-sm text-muted-foreground">
                {stat.title}
              </span>
              <span className="text-2xl font-bold tracking-tight text-card-foreground">
                {stat.value}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
