"use client"

import { motion } from "framer-motion"

export default function GameHeader() {
  return (
    <motion.div
      className="text-center mb-4 sm:mb-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h1 className="game-title mb-1 sm:mb-2">Free the Bird</h1>
      <p className="game-subtitle max-w-md mx-auto">Solve brain teasers to free the caged bird!</p>
    </motion.div>
  )
}
