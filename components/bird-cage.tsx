"use client"

import { motion } from "framer-motion"

interface BirdCageProps {
  freedomLevel: number
  maxLevel: number
  gameState: "intro" | "playing" | "completed"
}

export default function BirdCage({ freedomLevel, maxLevel, gameState }: BirdCageProps) {
  const isFree = freedomLevel === maxLevel && gameState === "completed"

  return (
    <div className="relative w-full max-w-[180px] sm:max-w-[220px] md:max-w-xs aspect-square">
      {/* Cage */}
      <motion.div
        className={`absolute inset-0 flex items-center justify-center ${isFree ? "opacity-50" : ""}`}
        animate={{
          scale: isFree ? 0.9 : 1,
          opacity: isFree ? 0.5 : 1,
        }}
        transition={{ duration: 0.5 }}
      >
        <svg viewBox="0 0 200 240" className="w-full h-full">
          {/* Cage top */}
          <motion.path d="M40,40 C40,20 160,20 160,40" stroke="#8B4513" strokeWidth="4" fill="none" />

          {/* Cage hook */}
          <motion.path d="M100,20 L100,5" stroke="#8B4513" strokeWidth="3" fill="none" />
          <motion.circle cx="100" cy="5" r="3" fill="#8B4513" />

          {/* Cage bars */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const x = 40 + i * 20
            const opacity = freedomLevel > 0 && i % 2 === 0 ? 0.3 : freedomLevel > 1 && i % 2 === 1 ? 0.3 : 1

            return (
              <motion.line
                key={i}
                x1={x}
                y1="40"
                x2={x}
                y2="200"
                stroke="#8B4513"
                strokeWidth="3"
                initial={{ opacity: 1 }}
                animate={{ opacity: isFree ? 0.3 : opacity }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              />
            )
          })}

          {/* Cage bottom */}
          <motion.path d="M40,200 C40,220 160,220 160,200" stroke="#8B4513" strokeWidth="4" fill="none" />
        </svg>
      </motion.div>

      {/* Bird */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          y: isFree ? -100 : 0,
          scale: isFree ? 1.2 : 1,
          rotate: isFree ? [0, -10, 10, -5, 5, 0] : 0,
        }}
        transition={{
          y: { duration: 1, delay: 0.5 },
          scale: { duration: 0.5 },
          rotate: { duration: 2, repeat: isFree ? Number.POSITIVE_INFINITY : 0, repeatType: "loop" },
        }}
      >
        <svg viewBox="0 0 100 100" className="w-1/2 h-1/2">
          {/* Bird body */}
          <motion.ellipse
            cx="50"
            cy="50"
            rx="25"
            ry="20"
            fill="#FFD700"
            animate={{
              fill: isFree ? "#FFD700" : ["#FFD700", "#FFC700", "#FFD700"],
              scale: [1, 1.05, 1],
            }}
            transition={{
              fill: { duration: 2, repeat: Number.POSITIVE_INFINITY },
              scale: { duration: 1, repeat: Number.POSITIVE_INFINITY },
            }}
          />

          {/* Bird head */}
          <motion.circle
            cx="75"
            cy="40"
            r="12"
            fill="#FFD700"
            animate={{
              fill: isFree ? "#FFD700" : ["#FFD700", "#FFC700", "#FFD700"],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />

          {/* Bird eye */}
          <circle cx="80" cy="37" r="2" fill="#000" />

          {/* Bird beak */}
          <motion.path
            d="M85,40 L95,38 L85,43"
            fill="#FF6B00"
            animate={{ rotate: isFree ? [0, 5, 0] : 0 }}
            transition={{ duration: 0.5, repeat: isFree ? Number.POSITIVE_INFINITY : 0, repeatDelay: 1 }}
          />

          {/* Bird wing */}
          <motion.path
            d="M50,40 Q60,25 40,30 Q50,40 50,40"
            fill="#FFC700"
            animate={{
              rotate: isFree ? [0, 20, 0, -20, 0] : [0, 5, 0],
              originX: 50,
              originY: 40,
            }}
            transition={{
              duration: isFree ? 0.5 : 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: isFree ? 0 : 1,
            }}
          />

          {/* Bird tail */}
          <motion.path
            d="M25,50 L10,40 L10,60 Z"
            fill="#FFC700"
            animate={{ rotate: isFree ? [0, 5, -5, 0] : 0 }}
            transition={{ duration: 1, repeat: isFree ? Number.POSITIVE_INFINITY : 0 }}
          />
        </svg>
      </motion.div>

      {/* Freedom message */}
      {isFree && (
        <motion.div
          className="absolute top-full left-0 right-0 text-center mt-2 sm:mt-4 text-amber-800 font-bold text-base sm:text-xl"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          Free at last!
        </motion.div>
      )}
    </div>
  )
}

