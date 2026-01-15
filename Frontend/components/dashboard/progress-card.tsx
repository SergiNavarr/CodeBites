import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProgressCardProps {
  title: string
  value: string | number
  subtitle: string
  icon: LucideIcon
  color: "success" | "progress" | "achievement"
}

const colorStyles = {
  success: {
    container: "bg-gradient-to-br from-card to-emerald-950/30",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
    glow: "shadow-emerald-500/20",
    border: "hover:border-emerald-500/50",
  },
  progress: {
    container: "bg-gradient-to-br from-card to-blue-950/30",
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-400",
    glow: "shadow-blue-500/20",
    border: "hover:border-blue-500/50",
  },
  achievement: {
    container: "bg-gradient-to-br from-card to-yellow-950/30",
    iconBg: "bg-yellow-500/15",
    iconColor: "text-yellow-400",
    glow: "shadow-yellow-500/20",
    border: "hover:border-yellow-500/50",
  },
}

export function ProgressCard({ title, value, subtitle, icon: Icon, color }: ProgressCardProps) {
  const styles = colorStyles[color]

  return (
    <Card
      className={cn(
        "border-border/50 transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-lg",
        styles.container,
        styles.glow,
        styles.border,
      )}
    >
      <CardContent className="flex items-center gap-5 p-6">
        <div
          className={cn(
            "flex h-16 w-16 items-center justify-center rounded-2xl",
            "shadow-lg transition-transform duration-300",
            styles.iconBg,
            styles.glow,
          )}
        >
          <Icon className={cn("h-8 w-8", styles.iconColor)} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className={cn("text-3xl font-bold tracking-tight", styles.iconColor)}>{value}</p>
          <p className="text-xs text-muted-foreground/80">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  )
}
