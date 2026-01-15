"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Play } from "lucide-react"
import type { Category } from "@/lib/types"
import { cn } from "@/lib/utils"
import { SiDotnet, SiReact, SiMysql, SiTypescript, SiPython, SiGit } from "react-icons/si"
import type { IconType } from "react-icons"

interface LearningPathCardProps {
  category: Category
}

const categoryThemes: Record<
  string,
  { icon: IconType; color: string; bgClass: string; borderClass: string; shadowClass: string; progressClass: string }
> = {
  csharp: {
    icon: SiDotnet,
    color: "#512BD4",
    bgClass: "bg-purple-500/15",
    borderClass: "border-purple-500/30",
    shadowClass: "shadow-purple-500/20",
    progressClass: "bg-purple-500",
  },
  react: {
    icon: SiReact,
    color: "#61DAFB",
    bgClass: "bg-cyan-500/15",
    borderClass: "border-cyan-500/30",
    shadowClass: "shadow-cyan-500/20",
    progressClass: "bg-cyan-400",
  },
  sql: {
    icon: SiMysql,
    color: "#F29111",
    bgClass: "bg-orange-500/15",
    borderClass: "border-orange-500/30",
    shadowClass: "shadow-orange-500/20",
    progressClass: "bg-orange-500",
  },
  typescript: {
    icon: SiTypescript,
    color: "#3178C6",
    bgClass: "bg-blue-500/15",
    borderClass: "border-blue-500/30",
    shadowClass: "shadow-blue-500/20",
    progressClass: "bg-blue-500",
  },
  python: {
    icon: SiPython,
    color: "#FFD43B",
    bgClass: "bg-yellow-500/15",
    borderClass: "border-yellow-500/30",
    shadowClass: "shadow-yellow-500/20",
    progressClass: "bg-yellow-400",
  },
  git: {
    icon: SiGit,
    color: "#F05032",
    bgClass: "bg-red-500/15",
    borderClass: "border-red-500/30",
    shadowClass: "shadow-red-500/20",
    progressClass: "bg-red-500",
  },
}

const defaultTheme = {
  icon: SiReact,
  color: "#10B981",
  bgClass: "bg-emerald-500/15",
  borderClass: "border-emerald-500/30",
  shadowClass: "shadow-emerald-500/20",
  progressClass: "bg-emerald-500",
}

export function LearningPathCard({ category }: LearningPathCardProps) {
  const theme = categoryThemes[category.id] || defaultTheme
  const IconComponent = theme.icon

  return (
    <Card
      className={cn(
        "group border-2 bg-card",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:shadow-lg",
        theme.borderClass,
        theme.shadowClass,
      )}
    >
      <CardContent className="p-5">
        <div className="mb-4 flex items-start justify-between">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl",
              "transition-all duration-300 group-hover:scale-110",
              theme.bgClass,
            )}
          >
            <IconComponent className="h-6 w-6" style={{ color: theme.color }} />
          </div>
          <span
            className="rounded-full px-2 py-0.5 text-xs font-medium"
            style={{ backgroundColor: `${theme.color}20`, color: theme.color }}
          >
            Following
          </span>
        </div>

        <h3 className="mb-1 text-lg font-semibold">{category.name}</h3>
        <p className="mb-4 line-clamp-1 text-sm text-muted-foreground">{category.description}</p>

        {/* Progress Section */}
        <div className="mb-4 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">
              {category.completedLessons} / {category.lessonsCount} lessons
            </span>
            <span className="font-semibold" style={{ color: theme.color }}>
              {category.progressPercentage}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted/50">
            <div
              className={cn("h-full rounded-full transition-all duration-500", theme.progressClass)}
              style={{ width: `${category.progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Continue Button */}
        <Link href={`/lessons/${category.id}`}>
          <Button
            className="w-full gap-2 transition-all duration-300 group-hover:gap-3"
            style={{ backgroundColor: theme.color }}
          >
            <Play className="h-4 w-4" />
            Continue
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
