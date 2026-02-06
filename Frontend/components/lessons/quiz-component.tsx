"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { QuizDetail, QuizSubmission } from "@/lib/types"

interface QuizProps {
  quiz: QuizDetail;
  onComplete: (submission: QuizSubmission) => void;
  isSubmitting: boolean;
}

export function QuizComponent({ quiz, onComplete, isSubmitting }: QuizProps) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})

  const handleSelect = (questionId: string, optionId: string) => {
    setSelectedOptions(prev => ({ ...prev, [questionId]: optionId }))
  }

  const allAnswered = quiz.questions?.length === Object.keys(selectedOptions).length

  const handleSubmit = () => {
    if (!allAnswered) return;

    const submission: QuizSubmission = {
      quizId: quiz.id,
      answers: Object.entries(selectedOptions).map(([qId, oId]) => ({
        questionId: qId,
        selectedOptionId: oId
      }))
    }
    onComplete(submission)
  }

  return (
    <div className="space-y-8 py-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <h2 className="text-3xl font-black tracking-tighter uppercase">¡Hora del Quiz!</h2>
        <p className="text-muted-foreground">Demuestra lo aprendido seleccionando la respuesta correcta.</p>
      </div>

      <div className="grid gap-6">
        {quiz.questions?.map((question, index) => (
          <Card key={question.id} className="border-border/50 bg-card/50 overflow-hidden">
            <CardHeader className="bg-muted/20 pb-4">
              <CardTitle className="text-lg font-bold flex gap-3 italic items-start">
                <span className="text-primary/50 font-mono not-italic shrink-0 select-none">
                  {index + 1}.
                </span>
                <span className="flex-1 break-words">{question.text}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 pt-6">
              {question.options?.map((option) => {
                const isSelected = selectedOptions[question.id] === option.id
                return (
                  <Button
                    key={option.id}
                    variant="outline"
                    className={cn(
                      "justify-start h-auto py-4 px-5 text-left transition-all border-2 whitespace-normal",
                      isSelected 
                        ? "border-primary bg-primary/5 text-primary shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
                        : "hover:border-muted-foreground/50"
                    )}
                    onClick={() => handleSelect(question.id, option.id)}
                    disabled={isSubmitting}
                  >
                    <div className={cn(
                      "mr-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2",
                      isSelected ? "border-primary bg-primary text-white" : "border-muted-foreground/30"
                    )}>
                      {isSelected && <Check className="h-4 w-4 stroke-[3px]" />}
                    </div>
                    <span className="font-medium leading-tight">{option.text}</span>
                  </Button>
                )
              })}
            </CardContent>
          </Card>
        ))}
      </div>

      <Button 
        className="w-full h-16 text-xl font-black uppercase tracking-widest shadow-xl shadow-primary/20" 
        size="lg"
        disabled={!allAnswered || isSubmitting}
        onClick={handleSubmit}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            Validando...
          </>
        ) : (
          "Finalizar Lección"
        )}
      </Button>
    </div>
  )
}