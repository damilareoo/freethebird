"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function BackgroundElements() {
  const [elements, setElements] = useState<
    Array<{ id: number; x: number; y: number; size: number; delay: number; color: string }>
  >([])

  useEffect(() => {
    // Generate random elements
    const colors = ["bg-indigo-200/20", "bg-sky-200/20", "bg-teal-200/20", "bg-amber-200/20"]

    const newElements = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 3,
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))

    setElements(newElements)
  }, [])

  return (
    <>
      {/* Background color */}
      <div className="absolute inset-0 bg-sky-50 -z-10" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-5">
        {elements.map((element) => (
          <motion.div
            key={element.id}
            className={`absolute rounded-full ${element.color}`}
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: `${element.size}px`,
              height: `${element.size}px`,
            }}
            animate={{
              y: [0, -10, 0, 10, 0],
              x: [0, 5, 0, -5, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8 + element.delay,
              repeat: Number.POSITIVE_INFINITY,
              delay: element.delay,
            }}
          />
        ))}
      </div>
    </>
  )
}
