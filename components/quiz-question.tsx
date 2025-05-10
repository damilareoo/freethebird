"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { QuizQuestion as QuizQuestionType } from "@/lib/quiz-data"
// import { playSound } from "@/lib/sounds" // Removed

interface QuizQuestionProps {
  question: QuizQuestionType
  onAnswer: (isCorrect: boolean) => void
} // Removed soundEnabled

export default function QuizQuestion({ question, onAnswer }: QuizQuestionProps) {
  // Removed soundEnabled
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer)
    // Play click sound
    // if (soundEnabled) { // Removed
    //   playSound("BUTTON_CLICK") // Removed
    // } // Removed
  }

  const handleSubmit = () => {
    if (selectedAnswer === null) return

    setIsSubmitting(true)

    // Small delay for better UX
    setTimeout(() => {
      onAnswer(selectedAnswer === question.correctAnswer)
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
    <motion.div className="space-y-2 sm:space-y-3" variants={containerVariants} initial="hidden" animate="visible">
      <motion.h3 variants={itemVariants} className="text-cage-dark mb-1.5 sm:mb-2 text-lg">
        {question.question}
      </motion.h3>

      <RadioGroup value={selectedAnswer || ""} onValueChange={handleSelectAnswer} className="space-y-1.5 sm:space-y-2">
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
              className={selectedAnswer === option ? "text-freedom-primary" : "text-cage-medium"}
            />
            <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer text-sm">
              {option}
            </Label>
          </motion.div>
        ))}
      </RadioGroup>

      <motion.div variants={itemVariants} className="pt-1.5 sm:pt-2">
        <Button
          onClick={handleSubmit}
          disabled={selectedAnswer === null || isSubmitting}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
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
