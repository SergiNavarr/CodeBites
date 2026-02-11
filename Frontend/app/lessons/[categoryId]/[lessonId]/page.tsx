"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { GlobalNavbar } from "@/components/global-navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Trophy, Loader2, Medal } from "lucide-react" 
import { LessonService } from "@/lib/services/lessonService"
import { QuizService } from "@/lib/services/quizService"
import { QuizComponent } from "@/components/lessons/quiz-component"
import { Lesson, QuizDetail, QuizSubmission } from "@/lib/types"
import { useAuth } from "@/context/auth-context"
import { toast } from "sonner"
import { MarkdownRenderer } from "@/components/markdown-renderer"

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const { user, loading: authLoading, refreshUser } = useAuth()

  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [quiz, setQuiz] = useState<QuizDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [showQuiz, setShowQuiz] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [pointsEarned, setPointsEarned] = useState(0)

  const categoryId = params.categoryId as string
  const lessonId = params.lessonId as string

  useEffect(() => {
    async function loadData() {
      if (!lessonId) return
      try {
        setLoading(true)
        const lessonData = await LessonService.getById(lessonId)
        setLesson(lessonData)

        try {
          const quizData = await QuizService.getByLesson(lessonId)
          setQuiz(quizData)
        } catch (e) {
          setQuiz(null)
        }
      } catch (err) {
        toast.error("Error al cargar la lección.")
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [lessonId])

  async function handleSimpleComplete() {
    try {
      setIsCompleting(true)
      
      const result = await LessonService.complete(lessonId)
      
      await refreshUser()
      setPointsEarned(result.points)
      setIsCompleted(true)

      toast.success("¡Lección completada!", {
        description: `Has ganado +${result.points} XP`
      })

      if (result.newAchievements && result.newAchievements.length > 0) {
        result.newAchievements.forEach((achievement) => {
          toast.success("¡LOGRO DESBLOQUEADO!", {
            description: achievement.name,
            icon: <Trophy className="h-5 w-5 text-yellow-500 fill-yellow-500/20" />,
            duration: 6000,
            style: {
              borderColor: "#eab308",
              backgroundColor: "hsl(var(--background))", 
              borderWidth: "2px"
            },
            action: {
              label: "Ver",
              onClick: () => router.push("/profile") 
            }
          })
        })
      }

    } catch (err) {
      toast.error("No se pudo completar la lección.")
    } finally {
      setIsCompleting(false)
    }
  }

  async function handleQuizSubmit(submission: QuizSubmission) {
    try {
      setIsCompleting(true)
      const result = await QuizService.submit(submission)

      if (result.success) {
        await refreshUser()
        setPointsEarned(result.pointsEarned)
        setIsCompleted(true)

        toast.success("¡Excelente trabajo!", {
          description: `Has ganado +${result.pointsEarned} XP.`,
        })
        

      } else {
        toast.error("Quiz no superado", {
          description: `Acertaste ${result.correctAnswersCount} de ${result.totalQuestions} preguntas. ${result.message || "Inténtalo de nuevo."}`,
          duration: 5000,
        })
      }
    } catch (err) {
      console.error(err)
      toast.error("Error de conexión", {
        description: "No se pudo validar el examen. Intenta nuevamente."
      })
    } finally {
      setIsCompleting(false)
    }
  }

  if (loading || authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-background">
        <GlobalNavbar />
        <main className="container mx-auto flex flex-col items-center justify-center px-4 py-10 md:py-20 text-center animate-in fade-in zoom-in duration-500">
          
          <div className="relative mb-8">
             <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
             <Trophy className="relative h-20 w-20 md:h-24 md:w-24 text-primary animate-bounce" />
          </div>

          <h1 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter italic bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500 break-words max-w-full">
            ¡Bite Completado!
          </h1>
          
          <p className="text-5xl md:text-7xl font-black text-foreground mb-2">
            +{pointsEarned} <span className="text-xl md:text-2xl text-muted-foreground align-top">XP</span>
          </p>
          <p className="text-muted-foreground mb-8 md:mb-12">¡Sigue así, la racha continúa!</p>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <Button size="lg" className="h-12 w-full md:w-auto px-8 shadow-xl shadow-primary/20" asChild>
                <Link href={`/lessons/${categoryId}`}>Continuar Aprendiendo</Link>
            </Button>
            <Button variant="outline" size="lg" className="h-12 w-full md:w-auto px-8" asChild>
                <Link href="/dashboard">Volver al Panel</Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <GlobalNavbar />
      <main className="container mx-auto px-4 py-8">
        
        {/* Header de navegación */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => showQuiz ? setShowQuiz(false) : router.push(`/lessons/${categoryId}`)} 
            className="pl-0 hover:pl-2 transition-all"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {showQuiz ? "Volver a la teoría" : "Volver al curso"}
          </Button>
        </div>

        <div className="mx-auto max-w-4xl">
          {!showQuiz ? (
            <>
              <Card className="mb-8 border-border/50 bg-card/50 shadow-lg md:shadow-2xl overflow-hidden">
                <CardHeader className="border-b border-border/10 bg-muted/20 pb-6 md:pb-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="rounded-full bg-primary/10 px-3 py-1 md:px-4 md:py-1.5 text-xs font-black text-primary uppercase border border-primary/20">
                      {lesson?.points} XP
                    </span>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Teoría</span>
                  </div>
                  <CardTitle className="text-2xl md:text-4xl font-black tracking-tighter italic leading-tight md:leading-none break-words">
                    {lesson?.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 px-4 md:pt-10 md:px-10 prose prose-invert max-w-none">
                  {lesson?.content ? (
                    <MarkdownRenderer content={lesson.content} />
                  ) : (
                    <p className="text-muted-foreground italic">No hay contenido disponible.</p>
                  )}
                </CardContent>
              </Card>

              <div className="flex justify-center md:justify-end pb-10 md:pb-20">
                {quiz ? (
                  <Button
                    size="lg"
                    className="w-full md:w-auto h-14 md:h-16 px-6 md:px-12 text-lg md:text-xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-transform whitespace-normal text-center"
                    onClick={() => setShowQuiz(true)}
                  >
                    Continuar al Quiz
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className="w-full md:w-auto h-14 md:h-16 px-6 md:px-12 text-lg md:text-xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
                    onClick={handleSimpleComplete}
                    disabled={isCompleting}
                  >
                    {isCompleting ? (
                        <>
                            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                            Procesando...
                        </>
                    ) : "Finalizar Lección"}
                  </Button>
                )}
              </div>
            </>
          ) : (
            // Componente de Quiz
            quiz && <QuizComponent quiz={quiz} onComplete={handleQuizSubmit} isSubmitting={isCompleting} />
          )}
        </div>
      </main>
    </div>
  )
}