import { cn } from "@/lib/utils"
import type { Priority } from "@/lib/transfer-data"

const priorityConfig: Record<Priority, { className: string }> = {
  Low: {
    className: "bg-muted text-muted-foreground border-border",
  },
  Normal: {
    className: "bg-primary/10 text-primary border-primary/20",
  },
  High: {
    className: "bg-warning/15 text-warning-foreground border-warning/25",
  },
  Urgent: {
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
}

interface PriorityBadgeProps {
  priority: Priority
  className?: string
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const config = priorityConfig[priority]
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        config.className,
        className
      )}
    >
      {priority}
    </span>
  )
}
