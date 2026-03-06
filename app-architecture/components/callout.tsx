import { AlertCircle, Info, AlertTriangle, CheckCircle2 } from "lucide-react"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface CalloutProps {
  type?: "note" | "important" | "warning" | "tip"
  title?: ReactNode
  children: ReactNode
}

export function Callout({ type = "note", title, children }: CalloutProps) {
  const icons = {
    note: Info,
    important: AlertCircle,
    warning: AlertTriangle,
    tip: CheckCircle2,
  }

  const styles = {
    note: "bg-accent border-accent-foreground/20",
    important: "bg-red-50 border-red-200",
    warning: "bg-amber-50 border-amber-200",
    tip: "bg-emerald-50 border-emerald-200",
  }

  const iconStyles = {
    note: "text-accent-foreground/60",
    important: "text-red-600",
    warning: "text-amber-600",
    tip: "text-emerald-600",
  }

  const Icon = icons[type]

  return (
    <div className={cn("rounded-lg border p-4", styles[type])}>
      <div className="flex gap-3">
        <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", iconStyles[type])} />
        <div className="flex-1 space-y-2">
          {title && (
            <p className="font-semibold text-foreground">{title}</p>
          )}
          <div className="text-sm leading-relaxed text-foreground/80">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
