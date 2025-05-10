"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { QuizQuestion as QuizQuestionType } from "@/lib/quiz-data"
import { useGameStore } from "@/lib/game-state"

interface QuizQuestionProps {
  question: QuizQuestionType
}

export default function QuizQuestion({ question }: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const answerQuestion = useGameStore((state) => state.answerQuestion)

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer)
  }

  const handleSubmit = () => {
    if (selectedAnswer === null) return

    setIsSubmitting(true)

    // Small delay for better UX
    setTimeout(() => {
      answerQuestion(selectedAnswer === question.correctAnswer)
      setIsSubmitting(false)
    }, 300)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div className="flex flex-col h-full" variants={containerVariants} initial="hidden" animate="visible">
      <motion.h3 variants={itemVariants} className="text-xl font-semibold text-indigo-800 mb-3">
        {question.question}
      </motion.h3>

      <div className="flex-1 mb-4">
        <RadioGroup value={selectedAnswer || ""} onValueChange={handleSelectAnswer} className="space-y-3">
          {question.options.map((option, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`option-card ${selectedAnswer === option ? "selected" : ""}`}
              onClick={() => handleSelectAnswer(option)}
            >
              <RadioGroupItem
                value={option}
                id={`option-${index}`}
                className={selectedAnswer === option ? "text-primary" : "text-indigo-400"}
              />
              <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer text-base text-indigo-700">
                {option}
              </Label>
            </motion.div>
          ))}
        </RadioGroup>
      </div>

      <motion.div variants={itemVariants}>
        <Button
          onClick={handleSubmit}
          disabled={selectedAnswer === null || isSubmitting}
          className="w-full btn-game text-base"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </span>
          ) : (
            "Submit Answer"
          )}
        </Button>
      </motion.div>
    </motion.div>
  )
}
