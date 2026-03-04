"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { QuizQuestion as QuizQuestionType } from "@/lib/quiz-data"
import { playSound } from "@/lib/sound-effects"

interface QuizQuestionProps {
  question: QuizQuestionType
  onAnswer: (isCorrect: boolean) => void
}

const LETTERS = ["A", "B", "C", "D"]

export default function QuizQuestion({ question, onAnswer }: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const handleSelect = (option: string) => {
    if (option === selectedAnswer) return
    playSound("OPTION_SELECT")
    setSelectedAnswer(option)
  }

  const handleSubmit = () => {
    if (!selectedAnswer) return
    playSound("BUTTON_CLICK")
    onAnswer(selectedAnswer === question.correctAnswer)
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      <h3
        className="font-fraunces text-lg sm:text-xl font-semibold text-foreground leading-snug italic"
        style={{ fontVariationSettings: '"opsz" 24, "SOFT" 20' }}
      >
        {question.question}
      </h3>

      <RadioGroup
        value={selectedAnswer || ""}
        onValueChange={handleSelect}
        className="divide-y divide-border/50"
      >
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option
          return (
            <motion.div
              key={index}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(option)}
              className={`flex items-center gap-4 py-4 pl-4 cursor-pointer transition-colors duration-150 select-none border-l-2 ${
                isSelected
                  ? "border-primary text-primary"
                  : "border-transparent text-foreground/70 hover:text-foreground hover:border-border"
              }`}
            >
              <span
                className={`shrink-0 w-5 text-xs font-bold transition-colors duration-150 ${
                  isSelected ? "text-primary" : "text-muted-foreground/50"
                }`}
              >
                {LETTERS[index]}
              </span>
              {/* Visually hidden for a11y */}
              <RadioGroupItem value={option} id={`option-${index}`} className="sr-only" />
              <Label
                htmlFor={`option-${index}`}
                className={`flex-grow cursor-pointer text-sm sm:text-base leading-snug transition-colors duration-150 ${
                  isSelected ? "text-primary font-medium" : "text-foreground/70"
                }`}
              >
                {option}
              </Label>
              {isSelected && (
                <motion.span
                  className="shrink-0 size-1.5 rounded-full bg-primary"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 22 }}
                />
              )}
            </motion.div>
          )
        })}
      </RadioGroup>

      <div className="pt-2">
        <motion.button
          onClick={handleSubmit}
          disabled={!selectedAnswer}
          whileTap={selectedAnswer ? { scale: 0.97 } : undefined}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="w-full bg-primary hover:bg-primary/90 active:bg-primary/80 text-primary-foreground text-sm py-3 rounded-sm font-semibold disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer transition-colors duration-150"
        >
          Submit Answer
        </motion.button>
      </div>
    </div>
  )
}
