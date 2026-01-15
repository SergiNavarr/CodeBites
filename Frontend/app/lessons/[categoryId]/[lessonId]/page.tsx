"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle2, Trophy, Loader2 } from "lucide-react"

// Mock lesson content
const mockLesson = {
  id: "4",
  title: "Control Flow: If Statements",
  content: `If statements allow you to execute code conditionally based on whether a condition evaluates to true or false.

The basic syntax is straightforward: you check a condition, and if it's true, the code block inside the if statement runs.

You can also add else clauses to handle cases when the condition is false, and else if for multiple conditions.`,
  codeExample: `// Basic if statement
int age = 18;

if (age >= 18)
{
    Console.WriteLine("You are an adult");
}
else
{
    Console.WriteLine("You are a minor");
}

// Multiple conditions with else if
int score = 85;

if (score >= 90)
{
    Console.WriteLine("Grade: A");
}
else if (score >= 80)
{
    Console.WriteLine("Grade: B");
}
else if (score >= 70)
{
    Console.WriteLine("Grade: C");
}
else
{
    Console.WriteLine("Grade: F");
}`,
  points: 20,
}

export default function LessonPage() {
  const router = useRouter()
  const params = useParams()
  const [isCompleting, setIsCompleting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const categoryId = params.categoryId as string

  async function handleComplete() {
    setIsCompleting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsCompleted(true)
    setIsCompleting(false)
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto flex flex-col items-center justify-center px-4 py-16 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/20">
            <Trophy className="h-10 w-10 text-success" />
          </div>
          <h1 className="mb-2 text-3xl font-bold">Lesson Complete!</h1>
          <p className="mb-2 text-muted-foreground">You earned</p>
          <p className="mb-8 text-4xl font-bold text-achievement">+{mockLesson.points} points</p>
          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <Link href={`/lessons/${categoryId}`}>Back to Lessons</Link>
            </Button>
            <Button asChild className="shadow-lg shadow-primary/25">
              <Link href={`/lessons/${categoryId}/5`}>Next Lesson</Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6 -ml-2">
          <Link href={`/lessons/${categoryId}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Lessons
          </Link>
        </Button>

        <div className="mx-auto max-w-3xl">
          <Card className="mb-6 border-border/50 bg-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="rounded-full bg-achievement/10 px-3 py-1 font-medium text-achievement">
                    +{mockLesson.points} pts
                  </span>
                </div>
              </div>
              <CardTitle className="text-2xl">{mockLesson.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 text-muted-foreground">
                {mockLesson.content.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {mockLesson.codeExample && (
                <div className="overflow-hidden rounded-lg border border-border/50 bg-secondary/50">
                  <div className="border-b border-border/50 bg-secondary px-4 py-2">
                    <span className="text-sm font-medium text-muted-foreground">Example</span>
                  </div>
                  <pre className="overflow-x-auto p-4 font-mono text-sm">
                    <code>{mockLesson.codeExample}</code>
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button size="lg" onClick={handleComplete} disabled={isCompleting} className="shadow-lg shadow-primary/25">
              {isCompleting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Completing...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Mark as Complete
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
