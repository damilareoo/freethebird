"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TypingTextProps {
  text: string
  className?: string
  speed?: number
  delay?: number
}

export default function TypingText({ text, className = "", speed = 50, delay = 0 }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex >= text.length) {
      setIsComplete(true)
      return
    }

    const timeout = setTimeout(() => {
      setDisplayedText((prev) => prev + text[currentIndex])
      setCurrentIndex((prev) => prev + 1)
    }, speed)

    return () => clearTimeout(timeout)
  }, [currentIndex, text, speed])

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay }}
    >
      {displayedText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
          className="inline-block"
        >
          |
        </motion.span>
      )}
    </motion.span>
  )
}
