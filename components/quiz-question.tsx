"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { QuizQuestion as QuizQuestionType } from "@/lib/quiz-data"
import { playSound } from "@/lib/sound-effects"

interface QuizQuestionProps {
  question: QuizQuestionType
  onAnswer: (isCorrect: boolean) => void
}

export default function QuizQuestion({ question, onAnswer }: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const handleSubmit = () => {
    if (selectedAnswer === null) return
    playSound("BUTTON_CLICK")
    onAnswer(selectedAnswer === question.correctAnswer)
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      <h3 className="text-lg sm:text-xl font-semibold text-amber-900">{question.question}</h3>

      <RadioGroup value={selectedAnswer || ""} onValueChange={setSelectedAnswer} className="space-y-2 sm:space-y-3">
        {question.options.map((option, index) => (
          <div
            key={index}
            className={`flex items-center space-x-2 rounded-lg border p-2 sm:p-3 transition-colors cursor-pointer text-sm sm:text-base
              ${selectedAnswer === option ? "bg-amber-100 border-amber-300" : "hover:bg-amber-50 border-amber-200"}`}
            onClick={() => setSelectedAnswer(option)}
          >
            <RadioGroupItem value={option} id={`option-${index}`} className="text-amber-600" />
            <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>

      <div className="pt-3 sm:pt-4">
        <Button
          onClick={handleSubmit}
          disabled={selectedAnswer === null}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white text-sm sm:text-base py-1.5 sm:py-2"
        >
          Submit Answer
        </Button>
      </div>
    </div>
  )
}
