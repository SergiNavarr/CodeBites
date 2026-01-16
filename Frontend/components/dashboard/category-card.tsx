import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Terminal, Database, Layout, Code, BookOpen } from "lucide-react"
import type { Category } from "@/lib/types"
import { cn } from "@/lib/utils"

interface CategoryCardProps {
  category: Category
}

const iconMap: Record<string, any> = {
  terminal: Terminal,
  database: Database,
  layout: Layout,
  code: Code,
  book: BookOpen,
}

export function CategoryCard({ category }: CategoryCardProps) {
  const progress = category.lessonsCount > 0 
    ? Math.round((category.completedLessons / category.lessonsCount) * 100) 
    : 0

  const IconComponent = iconMap[category.icon.toLowerCase()] || Code
  
  const brandColor = category.color || "#3b82f6"

  return (
    <Link href={`/lessons/${category.id}`}>
      <Card
        className={cn(
          "group cursor-pointer border-border/50 bg-card",
          "transition-all duration-300 ease-out",
          "hover:-translate-y-2 hover:shadow-lg"
        )}
      
        style={{ 
          borderColor: `${brandColor}40` 
        } as any}
      >
        <CardContent className="p-5">
          <div className="mb-4 flex items-start justify-between">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
              style={{ backgroundColor: `${brandColor}15` }}
            >
              <IconComponent className="h-7 w-7" style={{ color: brandColor }} />
            </div>
            <ChevronRight
              className="h-5 w-5 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
            />
          </div>

          <h3 className="mb-1 text-lg font-semibold">{category.name}</h3>
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{category.description}</p>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progreso</span>
              <span className="font-semibold" style={{ color: brandColor }}>
                {progress}%
              </span>
            </div>
            
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted/50">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${progress}%`,
                  backgroundColor: brandColor 
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {category.completedLessons} / {category.lessonsCount} lecciones
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}