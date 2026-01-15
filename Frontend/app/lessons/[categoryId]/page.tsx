import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, CheckCircle2, Circle, Lock } from "lucide-react"

// Mock lessons data
const mockLessons = [
  { id: "1", title: "Introduction to Variables", points: 10, isCompleted: true },
  { id: "2", title: "Data Types Overview", points: 15, isCompleted: true },
  { id: "3", title: "Working with Strings", points: 15, isCompleted: true },
  { id: "4", title: "Control Flow: If Statements", points: 20, isCompleted: false },
  { id: "5", title: "Loops and Iteration", points: 20, isCompleted: false },
  { id: "6", title: "Functions Basics", points: 25, isCompleted: false },
  { id: "7", title: "Arrays and Collections", points: 25, isCompleted: false },
  { id: "8", title: "Object-Oriented Concepts", points: 30, isCompleted: false },
]

export default async function LessonsPage({ params }: { params: Promise<{ categoryId: string }> }) {
  const { categoryId } = await params
  const categoryName = categoryId.charAt(0).toUpperCase() + categoryId.slice(1)

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4 -ml-2">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{categoryName} Lessons</h1>
          <p className="mt-1 text-muted-foreground">
            {mockLessons.filter((l) => l.isCompleted).length} of {mockLessons.length} completed
          </p>
        </div>

        <div className="space-y-3">
          {mockLessons.map((lesson, index) => {
            const isLocked = index > 0 && !mockLessons[index - 1].isCompleted && !lesson.isCompleted

            return (
              <Link
                key={lesson.id}
                href={isLocked ? "#" : `/lessons/${categoryId}/${lesson.id}`}
                className={isLocked ? "pointer-events-none" : ""}
              >
                <Card
                  className={`border-border/50 transition-all ${
                    isLocked
                      ? "opacity-50"
                      : lesson.isCompleted
                        ? "bg-success/5 hover:border-success/50"
                        : "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                  }`}
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-medium">{lesson.title}</h3>
                        <p className="text-sm text-muted-foreground">+{lesson.points} points</p>
                      </div>
                    </div>
                    {isLocked ? (
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    ) : lesson.isCompleted ? (
                      <CheckCircle2 className="h-6 w-6 text-success" />
                    ) : (
                      <Circle className="h-6 w-6 text-muted-foreground" />
                    )}
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
