"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { GlobalNavbar } from "@/components/global-navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Trophy, Loader2, BookOpen } from "lucide-react"
import { LessonService } from "@/lib/services/lessonService"
import { QuizService } from "@/lib/services/quizService"
import { QuizComponent } from "@/components/lessons/quiz-component"
import { Lesson, QuizDetail, QuizSubmission } from "@/lib/types"
import { useAuth } from "@/context/auth-context"
import { toast } from "sonner"

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
    try {
      setLoading(true);
      const lessonData = await LessonService.getById(lessonId);
      setLesson(lessonData);

      const quizData = await QuizService.getByLesson(lessonId);
      setQuiz(quizData);
    } catch (err) {
      toast.error("Error al cargar la lección o el quiz.");
      setQuiz(null);
    } finally {
      setLoading(false);
    }
  }
  loadData();
}, [lessonId]);

  async function handleSimpleComplete() {
    try {
      setIsCompleting(true)
      const result = await LessonService.complete(lessonId)
      await refreshUser()
      setPointsEarned(result.points)
      setIsCompleted(true)
    } catch (err) {
      toast.error("No se pudo marcar la lección como completada.")
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
      } else {
        toast.error(result.message || "Revisa tus respuestas.")
      }
    } catch (err) {
      toast.error("Error al validar el examen.")
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
        <main className="container mx-auto flex flex-col items-center justify-center px-4 py-20 text-center">
          <Trophy className="h-16 w-16 text-primary mb-6 animate-bounce" />
          <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter">¡Bite Completado!</h1>
          <p className="text-6xl font-black text-primary mb-12">+{pointsEarned} XP</p>
          <div className="flex gap-4">
            <Button size="lg" asChild><Link href={`/lessons/${categoryId}`}>Continuar</Link></Button>
            <Button variant="outline" size="lg" asChild><Link href="/dashboard">Panel</Link></Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <GlobalNavbar />
      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => showQuiz ? setShowQuiz(false) : router.push(`/lessons/${categoryId}`)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {showQuiz ? "Volver a la teoría" : "Volver al curso"}
        </Button>

        <div className="mx-auto max-w-3xl">
          {!showQuiz ? (
            <>
              <Card className="mb-8 border-border/50 bg-card/50 shadow-2xl">
                <CardHeader className="border-b border-border/10 bg-muted/20 pb-8">
                  <div className="flex items-center justify-between mb-4">
                    {/* 🛠️ FIX: Usamos pointsReward que es el nombre real en el DTO */}
                    <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-black text-primary uppercase border border-primary/20">
                      {lesson?.points} XP 
                    </span>
                    <span className="text-xs font-bold text-muted-foreground uppercase">Teoría</span>
                  </div>
                  <CardTitle className="text-4xl font-black tracking-tighter">{lesson?.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-10">
                  <div className="space-y-6 text-xl leading-relaxed font-medium">
                    {lesson?.content?.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end pb-20">
                {/* 🛠️ FIX: Lógica condicional del botón */}
                {lesson?.id ? (
                  <Button size="lg" className="h-16 px-12 text-xl font-black uppercase" onClick={() => setShowQuiz(true)}>
                    Continuar al Quiz
                  </Button>
                ) : (
                  <Button 
                    size="lg" 
                    className="h-16 px-12 text-xl font-black uppercase" 
                    onClick={handleSimpleComplete}
                    disabled={isCompleting}
                  >
                    {isCompleting ? "Completando..." : "Finalizar Lección"}
                  </Button>
                )}
              </div>
            </>
          ) : (
            // 🛠️ FIX: Aseguramos que el componente del quiz solo se cargue si hay datos
            quiz ? (
                <QuizComponent quiz={quiz} onComplete={handleQuizSubmit} isSubmitting={isCompleting} />
            ) : (
                <div className="text-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                    <p>Cargando preguntas...</p>
                </div>
            )
          )}
        </div>
      </main>
    </div>
  )
}