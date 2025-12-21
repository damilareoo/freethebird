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
        delayChildren: 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const optionVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + i * 0.08,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.02,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.98,
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
      transition: {
        duration: 0.1,
      },
    },
    selected: {
      backgroundColor: "rgba(79, 70, 229, 0.1)",
      borderColor: "rgba(79, 70, 229, 0.3)",
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <motion.div className="flex flex-col h-full" variants={containerVariants} initial="hidden" animate="visible">
      <motion.h3 variants={itemVariants} className="text-lg sm:text-xl font-semibold text-indigo-800 mb-3">
        {question.question}
      </motion.h3>

      <div className="flex-1 mb-3 sm:mb-4 overflow-y-auto">
        <RadioGroup value={selectedAnswer || ""} onValueChange={handleSelectAnswer} className="space-y-2 sm:space-y-3">
          {question.options.map((option, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={optionVariants}
              whileHover="hover"
              whileTap="tap"
              animate={selectedAnswer === option ? "selected" : "visible"}
              className={`option-card transition-smooth ${selectedAnswer === option ? "selected" : ""}`}
              onClick={() => handleSelectAnswer(option)}
            >
              <RadioGroupItem
                value={option}
                id={`option-${index}`}
                className={selectedAnswer === option ? "text-primary" : "text-indigo-400"}
              />
              <Label
                htmlFor={`option-${index}`}
                className="flex-grow cursor-pointer text-sm sm:text-base text-indigo-700"
              >
                {option}
              </Label>
            </motion.div>
          ))}
        </RadioGroup>
      </div>

      <motion.div
        variants={itemVariants}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Button
          onClick={handleSubmit}
          disabled={selectedAnswer === null || isSubmitting}
          className="w-full btn-game text-sm sm:text-base transition-bounce"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
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
