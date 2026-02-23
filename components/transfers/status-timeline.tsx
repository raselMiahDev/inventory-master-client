"use client"

import { Clock, CheckCircle2, Truck, PackageCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import type { TransferStatus } from "@/lib/transfer-data"

const STEPS: { status: TransferStatus; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { status: "Pending", label: "Pending", icon: Clock },
  { status: "Approved", label: "Approved", icon: CheckCircle2 },
  { status: "Shipped", label: "Shipped", icon: Truck },
  { status: "Received", label: "Received", icon: PackageCheck },
]

const statusIndex: Record<TransferStatus, number> = {
  Pending: 0,
  Approved: 1,
  Shipped: 2,
  Received: 3,
}

interface StatusTimelineProps {
  currentStatus: TransferStatus
  className?: string
}

export function StatusTimeline({ currentStatus, className }: StatusTimelineProps) {
  const currentIdx = statusIndex[currentStatus]

  return (
    <div className={cn("flex items-center", className)}>
      {STEPS.map((step, idx) => {
        const Icon = step.icon
        const isComplete = idx < currentIdx
        const isCurrent = idx === currentIdx
        const isPending = idx > currentIdx

        return (
          <div key={step.status} className="flex flex-1 items-center">
            {/* Step circle + label */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "flex size-9 items-center justify-center rounded-full border-2 transition-colors",
                  isComplete && "border-success bg-success text-success-foreground",
                  isCurrent && "border-primary bg-primary text-primary-foreground",
                  isPending && "border-border bg-muted text-muted-foreground"
                )}
              >
                <Icon className="size-4" />
              </div>
              <span
                className={cn(
                  "text-xs font-medium whitespace-nowrap",
                  isComplete && "text-success",
                  isCurrent && "text-primary",
                  isPending && "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {idx < STEPS.length - 1 && (
              <div
                className={cn(
                  "mx-1 h-0.5 flex-1 rounded-full transition-colors",
                  idx < currentIdx ? "bg-success" : "bg-border"
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
