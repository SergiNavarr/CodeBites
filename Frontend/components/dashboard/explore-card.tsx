"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, BookOpen, Terminal, Database, Layout, Code, Book } from "lucide-react"
import type { Category } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ExploreCardProps {
  category: Category
  onFollow: (categoryId: string) => void
}

const iconMap: Record<string, any> = {
  terminal: Terminal,
  database: Database,
  layout: Layout,
  code: Code,
  book: Book,
}

export function ExploreCard({ category, onFollow }: ExploreCardProps) {
  const IconComponent = iconMap[category.icon.toLowerCase()] || Code
  
  const brandColor = category.color || "#10B981"

  return (
    <Card
      className={cn(
        "group border-border/30 bg-card/50",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:bg-card hover:shadow-lg",
      )}
      style={{ 
        borderColor: `${brandColor}30` 
      } as any}
    >
      <CardContent className="p-5">
        <div className="mb-4 flex items-start justify-between">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl opacity-70 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100"
            style={{ backgroundColor: `${brandColor}1A` }}
          >
            <IconComponent className="h-6 w-6" style={{ color: brandColor }} />
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <BookOpen className="h-3.5 w-3.5" />
            <span>{category.lessonsCount} lecciones</span>
          </div>
        </div>

        <h3 className="mb-1 text-lg font-semibold">{category.name}</h3>
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{category.description}</p>

        <Button
          variant="outline"
          className="w-full gap-2 border-dashed transition-all duration-300 hover:border-solid"
          style={{
            borderColor: `${brandColor}50`,
            color: brandColor,
            "--hover-bg": `${brandColor}10`,
          } as any}
          onClick={() => onFollow(category.id)}
        >
          <Plus className="h-4 w-4" />
          Empezar a aprender
        </Button>
      </CardContent>
    </Card>
  )
}