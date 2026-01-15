"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, BookOpen } from "lucide-react"
import type { Category } from "@/lib/types"
import { cn } from "@/lib/utils"
import { SiDotnet, SiReact, SiMysql, SiTypescript, SiPython, SiGit } from "react-icons/si"
import type { IconType } from "react-icons"

interface ExploreCardProps {
  category: Category
  onFollow: (categoryId: string) => void
}

const categoryThemes: Record<
  string,
  { icon: IconType; color: string; bgClass: string; hoverBorderClass: string; hoverShadowClass: string }
> = {
  csharp: {
    icon: SiDotnet,
    color: "#512BD4",
    bgClass: "bg-purple-500/10",
    hoverBorderClass: "hover:border-purple-500/50",
    hoverShadowClass: "hover:shadow-purple-500/20",
  },
  react: {
    icon: SiReact,
    color: "#61DAFB",
    bgClass: "bg-cyan-500/10",
    hoverBorderClass: "hover:border-cyan-500/50",
    hoverShadowClass: "hover:shadow-cyan-500/20",
  },
  sql: {
    icon: SiMysql,
    color: "#F29111",
    bgClass: "bg-orange-500/10",
    hoverBorderClass: "hover:border-orange-500/50",
    hoverShadowClass: "hover:shadow-orange-500/20",
  },
  typescript: {
    icon: SiTypescript,
    color: "#3178C6",
    bgClass: "bg-blue-500/10",
    hoverBorderClass: "hover:border-blue-500/50",
    hoverShadowClass: "hover:shadow-blue-500/20",
  },
  python: {
    icon: SiPython,
    color: "#FFD43B",
    bgClass: "bg-yellow-500/10",
    hoverBorderClass: "hover:border-yellow-500/50",
    hoverShadowClass: "hover:shadow-yellow-500/20",
  },
  git: {
    icon: SiGit,
    color: "#F05032",
    bgClass: "bg-red-500/10",
    hoverBorderClass: "hover:border-red-500/50",
    hoverShadowClass: "hover:shadow-red-500/20",
  },
}

const defaultTheme = {
  icon: SiReact,
  color: "#10B981",
  bgClass: "bg-emerald-500/10",
  hoverBorderClass: "hover:border-emerald-500/50",
  hoverShadowClass: "hover:shadow-emerald-500/20",
}

export function ExploreCard({ category, onFollow }: ExploreCardProps) {
  const theme = categoryThemes[category.id] || defaultTheme
  const IconComponent = theme.icon

  return (
    <Card
      className={cn(
        "group border-border/30 bg-card/50",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:bg-card hover:shadow-lg",
        theme.hoverBorderClass,
        theme.hoverShadowClass,
      )}
    >
      <CardContent className="p-5">
        <div className="mb-4 flex items-start justify-between">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl",
              "opacity-70 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100",
              theme.bgClass,
            )}
          >
            <IconComponent className="h-6 w-6" style={{ color: theme.color }} />
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <BookOpen className="h-3.5 w-3.5" />
            <span>{category.lessonsCount} lessons</span>
          </div>
        </div>

        <h3 className="mb-1 text-lg font-semibold">{category.name}</h3>
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{category.description}</p>

        {/* Follow Button */}
        <Button
          variant="outline"
          className={cn(
            "w-full gap-2 border-dashed transition-all duration-300",
            "hover:border-solid hover:bg-primary/10",
          )}
          style={{
            borderColor: `${theme.color}50`,
            color: theme.color,
          }}
          onClick={() => onFollow(category.id)}
        >
          <Plus className="h-4 w-4" />
          Start Learning
        </Button>
      </CardContent>
    </Card>
  )
}
