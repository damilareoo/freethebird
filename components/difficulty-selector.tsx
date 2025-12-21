"use client"

import { useGameStore } from "@/lib/game-state"
import type { Difficulty } from "@/lib/game-state"
import { motion } from "framer-motion"

export default function DifficultySelector() {
  const { difficulty, setDifficulty } = useGameStore()

  const difficulties: { value: Difficulty; label: string; questions: number }[] = [
    { value: "easy", label: "Easy", questions: 3 },
    { value: "medium", label: "Medium", questions: 4 },
    { value: "hard", label: "Hard", questions: 5 },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.05,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
      },
    },
    selected: {
      scale: 1,
      backgroundColor: "rgba(79, 70, 229, 0.1)",
      borderColor: "rgba(79, 70, 229, 0.3)",
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <div className="space-y-2">
      <motion.p
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-center text-xs sm:text-sm text-indigo-700 font-medium"
      >
        Select Difficulty:
      </motion.p>
      <motion.div className="flex gap-2 justify-center" variants={containerVariants} initial="hidden" animate="visible">
        {difficulties.map((option, index) => (
          <motion.button
            key={option.value}
            custom={index}
            variants={itemVariants}
            whileHover="hover"
            whileTap="tap"
            animate={difficulty === option.value ? "selected" : "visible"}
            className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
              difficulty === option.value
                ? "bg-indigo-100 text-indigo-700 border border-indigo-200"
                : "bg-white text-indigo-600 border border-gray-200 hover:bg-indigo-50"
            }`}
            onClick={() => setDifficulty(option.value)}
          >
            {option.label}
            <span className="text-xs ml-1 opacity-70">({option.questions})</span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}
