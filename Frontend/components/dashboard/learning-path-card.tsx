"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Play, Terminal, Database, Layout, Code, BookOpen } from "lucide-react"
import type { Category } from "@/lib/types"
import { cn } from "@/lib/utils"

interface LearningPathCardProps {
  category: Category
}

const iconMap: Record<string, any> = {
  terminal: Terminal,
  database: Database,
  layout: Layout,
  code: Code,
  book: BookOpen,
}

export function LearningPathCard({ category }: LearningPathCardProps) {
  const IconComponent = iconMap[category.icon.toLowerCase()] || Code
  const brandColor = category.color || "#3b82f6"

  return (
    <Card
      className={cn(
        "group border-2 bg-card",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:shadow-lg"
      )}
      style={{ borderColor: `${brandColor}30` }}
    >
      <CardContent className="p-5">
        <div className="mb-4 flex items-start justify-between">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
            style={{ backgroundColor: `${brandColor}15` }}
          >
            <IconComponent className="h-6 w-6" style={{ color: brandColor }} />
          </div>
          <span
            className="rounded-full px-2 py-0.5 text-xs font-medium"
            style={{ backgroundColor: `${brandColor}20`, color: brandColor }}
          >
            Siguiendo
          </span>
        </div>

        <h3 className="mb-1 text-lg font-semibold">{category.name}</h3>
        <p className="mb-4 line-clamp-1 text-sm text-muted-foreground">{category.description}</p>

        <div className="mb-4 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">
              {category.completedLessons} / {category.lessonsCount} lecciones
            </span>
            <span className="font-semibold" style={{ color: brandColor }}>
              {category.progressPercentage}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted/50">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ 
                width: `${category.progressPercentage}%`,
                backgroundColor: brandColor 
              }}
            />
          </div>
        </div>

        <Link href={`/lessons/${category.id}`}>
          <Button
            className="w-full gap-2 transition-all duration-300 group-hover:gap-3"
            style={{ backgroundColor: brandColor }}
          >
            <Play className="h-4 w-4 fill-current" />
            Continuar
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}