"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface BirdCageProps {
  freedomLevel: number
  maxLevel: number
  gameState: "intro" | "playing" | "completed"
}

export default function BirdCage({ freedomLevel, maxLevel, gameState }: BirdCageProps) {
  const isFree = freedomLevel === maxLevel && gameState === "completed"
  const [hasAnimated, setHasAnimated] = useState(false)

  // Calculate progress percentage
  const progressPercent = (freedomLevel / maxLevel) * 100

  // Colors with better design
  const cageColor = "#8B4513" // Rich brown
  const birdBodyColor = "#FFD700" // Gold
  const birdAccentColor = "#FF8C00" // Dark orange

  // Set animation flag after initial render
  useEffect(() => {
    setHasAnimated(true)
  }, [])

  // Bird animation variants
  const birdVariants = {
    idle: {
      y: [0, -5, 0],
      transition: {
        y: {
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        },
      },
    },
    free: {
      y: -100,
      scale: 1.2,
      transition: {
        duration: 1.5,
        ease: [0.34, 1.56, 0.64, 1], // Spring-like effect
      },
    },
  }

  // Wing animation variants
  const wingVariants = {
    idle: {
      rotate: [0, 5, 0],
      transition: {
        rotate: {
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        },
      },
    },
    free: {
      rotate: [0, 15, -15, 10, -10, 0],
      transition: {
        rotate: {
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        },
      },
    },
  }

  return (
    <div className="relative w-full max-w-[160px] sm:max-w-[180px] md:max-w-[200px] aspect-square mx-auto">
      {/* Background sky effect - only visible when bird is free */}
      {isFree && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-radial from-sky-300 to-sky-100 opacity-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.8, scale: 1.2 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      )}

      {/* Cage */}
      <motion.div
        className={`absolute inset-0 flex items-center justify-center ${isFree ? "opacity-50" : ""}`}
        initial={hasAnimated ? {} : { opacity: 0, scale: 0.9 }}
        animate={{
          opacity: isFree ? 0.5 : 1,
          scale: isFree ? 0.9 : 1,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-md">
          {/* Cage top */}
          <motion.path
            d="M40,40 C40,20 160,20 160,40"
            stroke={cageColor}
            strokeWidth="4"
            fill="none"
            initial={hasAnimated ? {} : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          {/* Cage hook */}
          <motion.path
            d="M100,20 L100,5"
            stroke={cageColor}
            strokeWidth="3"
            fill="none"
            initial={hasAnimated ? {} : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <motion.circle
            cx="100"
            cy="5"
            r="3"
            fill={cageColor}
            initial={hasAnimated ? {} : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          />

          {/* Cage bars */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const x = 40 + i * 20
            // Bars disappear progressively as freedom level increases
            const opacity = freedomLevel > 0 && i % 2 === 0 ? 0.3 : freedomLevel > 1 && i % 2 === 1 ? 0.3 : 1

            return (
              <motion.line
                key={i}
                x1={x}
                y1="40"
                x2={x}
                y2="200"
                stroke={cageColor}
                strokeWidth="3"
                initial={hasAnimated ? {} : { pathLength: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: isFree ? 0.3 : opacity,
                }}
                transition={{
                  pathLength: { duration: 0.8, delay: 0.4 + i * 0.1 },
                  opacity: { duration: 0.8, delay: i * 0.1 },
                }}
              />
            )
          })}

          {/* Cage bottom */}
          <motion.path
            d="M40,200 C40,220 160,220 160,200"
            stroke={cageColor}
            strokeWidth="4"
            fill="none"
            initial={hasAnimated ? {} : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 1.2 }}
          />

          {/* Freedom glow - appears as the bird gets closer to freedom */}
          {progressPercent > 0 && (
            <motion.circle
              cx="100"
              cy="120"
              r="70"
              fill={`url(#freedomGradient)`}
              initial={{ opacity: 0 }}
              animate={{ opacity: progressPercent / 200 }}
              transition={{ duration: 1 }}
            />
          )}

          {/* Define gradient for freedom glow */}
          <defs>
            <radialGradient id="freedomGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#32CD32" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#32CD32" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Bird */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={hasAnimated ? {} : { opacity: 0, scale: 0.8 }}
        animate={isFree ? "free" : "idle"}
        variants={birdVariants}
      >
        <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 drop-shadow-lg">
          {/* Bird body */}
          <motion.ellipse
            cx="50"
            cy="50"
            rx="25"
            ry="20"
            fill={birdBodyColor}
            initial={hasAnimated ? {} : { scale: 0 }}
            animate={{
              scale: 1,
              fill: isFree ? birdBodyColor : [birdBodyColor, birdAccentColor, birdBodyColor],
            }}
            transition={{
              scale: { duration: 0.5, delay: 1.5 },
              fill: { duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 2 },
            }}
          />

          {/* Bird head */}
          <motion.circle
            cx="75"
            cy="40"
            r="12"
            fill={birdBodyColor}
            initial={hasAnimated ? {} : { scale: 0 }}
            animate={{
              scale: 1,
              fill: isFree ? birdBodyColor : [birdBodyColor, birdAccentColor, birdBodyColor],
            }}
            transition={{
              scale: { duration: 0.5, delay: 1.7 },
              fill: { duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 2 },
            }}
          />

          {/* Bird eye */}
          <motion.circle
            cx="80"
            cy="37"
            r="2"
            fill="#000"
            initial={hasAnimated ? {} : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 2 }}
          />

          {/* Bird beak */}
          <motion.path
            d="M85,40 L95,38 L85,43"
            fill="#FF6B00"
            initial={hasAnimated ? {} : { scale: 0 }}
            animate={{
              scale: 1,
              rotate: isFree ? [0, 5, 0] : 0,
            }}
            transition={{
              scale: { duration: 0.3, delay: 1.9 },
              rotate: { duration: 0.5, repeat: isFree ? Number.POSITIVE_INFINITY : 0, repeatDelay: 1, delay: 2 },
            }}
          />

          {/* Bird wing */}
          <motion.path
            d="M50,40 Q60,25 40,30 Q50,40 50,40"
            fill={birdAccentColor}
            initial={hasAnimated ? {} : { scale: 0 }}
            animate={isFree ? "free" : "idle"}
            variants={wingVariants}
            style={{ originX: 50, originY: 40 }}
          />

          {/* Bird tail */}
          <motion.path
            d="M25,50 L10,40 L10,60 Z"
            fill={birdAccentColor}
            initial={hasAnimated ? {} : { scale: 0 }}
            animate={{
              scale: 1,
              rotate: isFree ? [0, 5, -5, 0] : 0,
            }}
            transition={{
              scale: { duration: 0.3, delay: 1.6 },
              rotate: { duration: 1, repeat: isFree ? Number.POSITIVE_INFINITY : 0, delay: 2 },
            }}
          />
        </svg>
      </motion.div>

      {/* Freedom message */}
      {isFree && (
        <motion.div
          className="absolute top-full left-0 right-0 text-center mt-2 text-indigo-700 font-bold text-xs sm:text-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
        >
          <span className="bg-white/80 px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">Free at last!</span>
        </motion.div>
      )}
    </div>
  )
}
