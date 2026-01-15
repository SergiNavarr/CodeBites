import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import type { Category } from "@/lib/types"
import { cn } from "@/lib/utils"
import { SiDotnet, SiReact, SiMysql, SiTypescript, SiPython, SiGit } from "react-icons/si"
import type { IconType } from "react-icons"

interface CategoryCardProps {
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
    borderClass: "hover:border-purple-500/50",
    shadowClass: "hover:shadow-purple-500/20",
    progressClass: "bg-purple-500",
  },
  react: {
    icon: SiReact,
    color: "#61DAFB",
    bgClass: "bg-cyan-500/15",
    borderClass: "hover:border-cyan-500/50",
    shadowClass: "hover:shadow-cyan-500/20",
    progressClass: "bg-cyan-400",
  },
  sql: {
    icon: SiMysql,
    color: "#F29111",
    bgClass: "bg-orange-500/15",
    borderClass: "hover:border-orange-500/50",
    shadowClass: "hover:shadow-orange-500/20",
    progressClass: "bg-orange-500",
  },
  typescript: {
    icon: SiTypescript,
    color: "#3178C6",
    bgClass: "bg-blue-500/15",
    borderClass: "hover:border-blue-500/50",
    shadowClass: "hover:shadow-blue-500/20",
    progressClass: "bg-blue-500",
  },
  python: {
    icon: SiPython,
    color: "#FFD43B",
    bgClass: "bg-yellow-500/15",
    borderClass: "hover:border-yellow-500/50",
    shadowClass: "hover:shadow-yellow-500/20",
    progressClass: "bg-yellow-400",
  },
  git: {
    icon: SiGit,
    color: "#F05032",
    bgClass: "bg-red-500/15",
    borderClass: "hover:border-red-500/50",
    shadowClass: "hover:shadow-red-500/20",
    progressClass: "bg-red-500",
  },
}

// Default theme for unknown categories
const defaultTheme = {
  icon: SiReact,
  color: "#10B981",
  bgClass: "bg-emerald-500/15",
  borderClass: "hover:border-emerald-500/50",
  shadowClass: "hover:shadow-emerald-500/20",
  progressClass: "bg-emerald-500",
}

export function CategoryCard({ category }: CategoryCardProps) {
  const progress = category.lessonsCount > 0 ? Math.round((category.completedLessons / category.lessonsCount) * 100) : 0

  const theme = categoryThemes[category.id] || defaultTheme
  const IconComponent = theme.icon

  return (
    <Link href={`/lessons/${category.id}`}>
      <Card
        className={cn(
          "group cursor-pointer border-border/50 bg-card",
          "transition-all duration-300 ease-out",
          "hover:-translate-y-2 hover:shadow-lg",
          theme.borderClass,
          theme.shadowClass,
        )}
      >
        <CardContent className="p-5">
          <div className="mb-4 flex items-start justify-between">
            <div
              className={cn(
                "flex h-14 w-14 items-center justify-center rounded-xl",
                "transition-all duration-300 group-hover:scale-110",
                theme.bgClass,
              )}
            >
              <IconComponent className="h-7 w-7" style={{ color: theme.color }} />
            </div>
            <ChevronRight
              className={cn(
                "h-5 w-5 text-muted-foreground",
                "opacity-0 transition-all duration-300",
                "group-hover:translate-x-1 group-hover:opacity-100",
              )}
            />
          </div>

          <h3 className="mb-1 text-lg font-semibold">{category.name}</h3>
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{category.description}</p>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold" style={{ color: theme.color }}>
                {progress}%
              </span>
            </div>
            {/* Custom progress bar with category theme color */}
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted/50">
              <div
                className={cn("h-full rounded-full transition-all duration-500", theme.progressClass)}
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {category.completedLessons} / {category.lessonsCount} lessons
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
