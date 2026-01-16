"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { GlobalNavbar } from "@/components/global-navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, CheckCircle2, Circle, Lock, Loader2 } from "lucide-react"
import { CategoryService } from "@/lib/services/categoryService"
import { CategoryDetail } from "@/lib/types"
import { cn } from "@/lib/utils"

export default function CategoryLessonsPage() {
  const params = useParams()
  const categoryId = params.categoryId as string

  const [category, setCategory] = useState<CategoryDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLessons() {
      try {
        setLoading(true)
        const data = await CategoryService.getByIdWithDetails(categoryId)
        setCategory(data)
      } catch (error) {
        console.error("Error loading lessons:", error)
      } finally {
        setLoading(false)
      }
    }

    if (categoryId) fetchLessons()
  }, [categoryId])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Cargando tu ruta de aprendizaje...</p>
      </div>
    )
  }

  if (!category) return null

  const completedCount = category.lessons.filter((l) => l.isCompleted).length

  return (
    <div className="min-h-screen bg-background">
      <GlobalNavbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4 -ml-2 text-muted-foreground">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Dashboard
            </Link>
          </Button>
          <h1 className="text-4xl font-bold tracking-tight">{category.name}</h1>
          <p className="mt-2 text-muted-foreground">
            {completedCount} de {category.lessons.length} lecciones completadas
          </p>
        </div>

        <div className="grid gap-3 max-w-4xl">
          {category.lessons.sort((a, b) => a.order - b.order).map((lesson, index) => {
            const isLocked = 
              index > 0 && 
              !category.lessons[index - 1].isCompleted && 
              !lesson.isCompleted

            return (
              <Link
                key={lesson.id}
                href={isLocked ? "#" : `/lessons/${categoryId}/${lesson.id}`}
                className={cn(
                  "block transition-all",
                  isLocked ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                )}
              >
                <Card
                  className={cn(
                    "border-border/50 transition-all duration-300",
                    isLocked
                      ? "bg-muted/20"
                      : lesson.isCompleted
                        ? "bg-emerald-500/5 hover:border-emerald-500/50"
                        : "hover:border-primary/50 hover:shadow-md"
                  )}
                >
                  <CardContent className="flex items-center justify-between p-5">
                    <div className="flex items-center gap-5">
                      <div className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold",
                        lesson.isCompleted ? "bg-emerald-500 text-white" : "bg-secondary"
                      )}>
                        {index + 1}
                      </div>
                      <div>
                        <h3 className={cn(
                          "font-semibold text-lg",
                          isLocked && "text-muted-foreground"
                        )}>
                          {lesson.title}
                        </h3>
                        <p className="text-xs font-medium text-amber-500 uppercase tracking-wider">
                          +{lesson.points} XP
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      {isLocked ? (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      ) : lesson.isCompleted ? (
                        <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                      ) : (
                        <Circle className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}