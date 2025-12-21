"use client"

import { motion } from "framer-motion"

export default function GameHeader() {
  return (
    <motion.div
      className="text-center mb-4 sm:mb-6 md:mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h1
        className="game-title mb-2 sm:mb-3"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
      >
        Free the Bird
      </motion.h1>
      <motion.p
        className="game-subtitle max-w-md mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Solve brain teasers to free the caged bird!
      </motion.p>
    </motion.div>
  )
}
