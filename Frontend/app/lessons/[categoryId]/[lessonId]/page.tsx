"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { GlobalNavbar } from "@/components/global-navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle2, Trophy, Loader2, AlertCircle } from "lucide-react"
import { LessonService } from "@/lib/services/lessonService"
import { Lesson } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useAuth } from "@/context/auth-context"

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const {refreshUser} = useAuth()
  
  // Estados de carga y datos
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Estados de acción
  const [isCompleting, setIsCompleting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [pointsEarned, setPointsEarned] = useState(0)

  const categoryId = params.categoryId as string
  const lessonId = params.lessonId as string

  useEffect(() => {
    async function loadLesson() {
      try {
        setLoading(true)
        setError(null)
        const data = await LessonService.getById(lessonId)
        setLesson(data)
        
      } catch (err: any) {
        setError("No se pudo cargar la lección. Intenta de nuevo más tarde.")
      } finally {
        setLoading(false)
      }
    }

    if (lessonId) loadLesson()
  }, [lessonId])

  async function handleComplete() {
    if (!lesson) return
    
    try {
      setIsCompleting(true)
      const result = await LessonService.complete(lesson.id)
      
      await refreshUser()

      setPointsEarned(result.points)
      setIsCompleted(true)
    } catch (err: any) {
      console.error("Error al completar:", err)
    } finally {
      setIsCompleting(false)
    }
  }

  // --- RENDERS CONDICIONALES ---

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Cargando contenido...</p>
      </div>
    )
  }

  if (error || !lesson) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h1 className="text-xl font-bold">{error || "Lección no encontrada"}</h1>
        <Button variant="outline" className="mt-4" onClick={() => router.back()}>
          Volver atrás
        </Button>
      </div>
    )
  }

  // Vista de éxito
  if (isCompleted) {
    return (
      <div className="min-h-screen bg-background">
        <GlobalNavbar />
        <main className="container mx-auto flex flex-col items-center justify-center px-4 py-16 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20">
            <Trophy className="h-10 w-10 text-emerald-500" />
          </div>
          <h1 className="mb-2 text-3xl font-bold">¡Lección Completada!</h1>
          <p className="mb-2 text-muted-foreground">Has ganado</p>
          <p className="mb-8 text-5xl font-bold text-amber-500">+{pointsEarned} pts</p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" size="lg" asChild>
              <Link href={`/lessons/${categoryId}`}>Volver al curso</Link>
            </Button>
            
            {lesson.nextLessonId ? (
              <Button size="lg" className="shadow-lg shadow-primary/25" asChild>
                <Link href={`/lessons/${categoryId}/${lesson.nextLessonId}`}>
                  Siguiente Lección
                </Link>
              </Button>
            ) : (
              <Button size="lg" variant="secondary" asChild>
                <Link href="/dashboard">¡Curso Terminado! Ir al Dashboard</Link>
              </Button>
            )}
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <GlobalNavbar />

      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6 -ml-2 text-muted-foreground">
          <Link href={`/lessons/${categoryId}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a la ruta
          </Link>
        </Button>

        <div className="mx-auto max-w-3xl">
          <Card className="mb-8 border-border/50 bg-card overflow-hidden">
            <CardHeader className="border-b border-border/10 bg-muted/20 pb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-500 uppercase tracking-wider">
                  +{lesson.points} XP
                </span>
                {lesson.isCompleted && (
                  <span className="flex items-center gap-1 text-xs text-emerald-500 font-medium">
                    <CheckCircle2 className="h-3 w-3" /> Completada
                  </span>
                )}
              </div>
              <CardTitle className="text-3xl font-bold">{lesson.title}</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-8 pt-8">
              {/* Contenido de texto */}
              <div className="space-y-4 text-lg text-muted-foreground/90 leading-relaxed">
                {lesson.content.split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* Ejemplo de Código */}
              {lesson.codeExample && (
                <div className="overflow-hidden rounded-xl border border-border/50 bg-[#1e1e1e] shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2">
                    <span className="text-xs font-mono text-white/50">csharp_example.cs</span>
                    <div className="flex gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
                      <div className="h-2.5 w-2.5 rounded-full bg-amber-500/50" />
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/50" />
                    </div>
                  </div>
                  <pre className="overflow-x-auto p-5 font-mono text-sm text-emerald-400">
                    <code>{lesson.codeExample}</code>
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Botón de Acción */}
          <div className="flex justify-end pb-20">
            <Button 
              size="lg" 
              onClick={handleComplete} 
              disabled={isCompleting || lesson.isCompleted} 
              className={cn(
                "h-14 px-8 text-lg font-bold shadow-xl transition-all",
                lesson.isCompleted ? "bg-emerald-600 hover:bg-emerald-600" : "shadow-primary/20"
              )}
            >
              {isCompleting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Procesando...
                </>
              ) : lesson.isCompleted ? (
                <>
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Lección Completada
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Marcar como terminada
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}