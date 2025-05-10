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

  return (
    <div className="space-y-3">
      <p className="text-center text-sm text-indigo-700 font-medium">Select Difficulty:</p>
      <div className="flex gap-3 justify-center">
        {difficulties.map((option) => (
          <motion.button
            key={option.value}
            className={`difficulty-option ${difficulty === option.value ? "selected" : ""}`}
            onClick={() => setDifficulty(option.value)}
            whileTap={{ scale: 0.97 }}
          >
            {option.label}
            <span className="text-xs ml-1 opacity-70">({option.questions})</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
