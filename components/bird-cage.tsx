"use client"

import { motion } from "framer-motion"

interface BirdCageProps {
  freedomLevel: number
  maxLevel: number
  gameState: "intro" | "playing" | "completed"
}

const CAGE    = "#5C3212"
const CAGE_LT = "#7A4520"
const GOLD    = "#EBB820"
const WING    = "#C8920A"
const BEAK    = "#CC4010"

// 7 bars spanning x=42 to x=198 inside viewBox "0 0 240 310"
const BAR_XS = Array.from({ length: 7 }, (_, i) => 42 + i * (156 / 6))

export default function BirdCage({ freedomLevel, maxLevel, gameState }: BirdCageProps) {
  const isFree = freedomLevel === maxLevel && gameState === "completed"

  // Inside-out dissolution: center bar(s) fade first, outer bars last
  const getBarAnim = (i: number) => {
    const fromCenter = Math.abs(i - 3) // distance from center bar (index 3)
    const dir = i < 3 ? -1 : i > 3 ? 1 : 0 // drift direction when dissolving

    if (isFree) return { opacity: 0, x: dir * 20 }

    // dissolveAt: freedomLevel needed to fade this bar
    const dissolveAt = fromCenter <= 1 ? 1 : fromCenter <= 2 ? 2 : 99
    if (freedomLevel >= dissolveAt) return { opacity: 0.08, x: dir * 10 }
    return { opacity: 1, x: 0 }
  }

  const cageGroupAnim = {
    opacity: isFree ? 0.18 : 1,
    scale:   isFree ? 0.88 : 1,
  }

  return (
    <div
      className="relative w-full max-w-[200px] sm:max-w-[260px] md:max-w-[300px] lg:max-w-[340px]"
      style={{ aspectRatio: "3/4" }}
    >
      <svg
        viewBox="0 0 240 310"
        className="w-full h-full"
        style={{ overflow: "visible" }}
      >
        {/* ─────────────────────────────────────────
            CAGE STRUCTURE
        ───────────────────────────────────────── */}

        {/* Chain & hook */}
        <line x1="120" y1="0" x2="120" y2="16"
          stroke={CAGE_LT} strokeWidth="1.5" strokeDasharray="2.5 2.5" strokeLinecap="round" />
        <circle cx="120" cy="21" r="5" fill="none" stroke={CAGE_LT} strokeWidth="1.8" />

        {/* Crown finial */}
        <polygon points="117,28 120,19 123,28 121.4,25.5 120,28 118.6,25.5" fill={CAGE_LT} />
        <circle cx="120" cy="18" r="3" fill={CAGE_LT} />

        {/* Dome arch */}
        <path d="M 42,68 C 42,22 198,22 198,68"
          stroke={CAGE} strokeWidth="3.5" fill="none" strokeLinecap="round" />

        {/* Base arc */}
        <motion.path d="M 42,258 C 42,290 198,290 198,258"
          stroke={CAGE} strokeWidth="3.5" fill="none" strokeLinecap="round"
          animate={{ opacity: isFree ? 0.12 : 1 }}
          transition={{ duration: 0.9 }} />

        {/* Base feet */}
        <motion.g
          animate={{ opacity: isFree ? 0.12 : 1 }}
          transition={{ duration: 0.9 }}
        >
          <line x1="88" y1="290" x2="84" y2="305"  stroke={CAGE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="80" y1="305" x2="92" y2="305"  stroke={CAGE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="152" y1="290" x2="156" y2="305" stroke={CAGE} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="148" y1="305" x2="160" y2="305" stroke={CAGE} strokeWidth="2.5" strokeLinecap="round" />
        </motion.g>

        {/* Perch */}
        <motion.g
          animate={{ opacity: isFree ? 0.1 : 1 }}
          transition={{ duration: 0.9 }}
        >
          <line x1="72"  y1="228" x2="168" y2="228" stroke={CAGE_LT} strokeWidth="3.5" strokeLinecap="round" />
          <line x1="95"  y1="228" x2="93"  y2="244" stroke={CAGE_LT} strokeWidth="2"   strokeLinecap="round" />
          <line x1="145" y1="228" x2="147" y2="244" stroke={CAGE_LT} strokeWidth="2"   strokeLinecap="round" />
        </motion.g>

        {/* ─────────────────────────────────────────
            BIRD — rendered before bars so bars
            appear in front of bird (trapped look)
        ───────────────────────────────────────── */}
        {/* Bird flight: y decelerates (ease-out), x accelerates (ease-in) → natural arc */}
        <motion.g
          animate={{ y: isFree ? -230 : 0, x: isFree ? 22 : 0 }}
          transition={{
            y: { duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] },
            x: { duration: 1.2, delay: 0.3, ease: [0.55, 0, 1, 0.45] },
          }}
        >
          {/* Tail feathers */}
          <motion.path
            d="M 90,213 L 63,196 L 66,228 Z"
            fill={WING}
            animate={{ rotate: isFree ? [0, 14, -14, 0] : 0 }}
            style={{ originX: "90px", originY: "213px" }}
            transition={{ duration: 1.4, repeat: isFree ? Infinity : 0, ease: "easeInOut" }}
          />

          {/* Body */}
          <motion.ellipse
            cx="110" cy="208" rx="24" ry="19" fill={GOLD}
            animate={{ scaleY: [1, 1.05, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Wing */}
          <motion.path
            d="M 110,202 Q 128,176 88,184 Q 102,202 110,202 Z"
            fill={WING}
            animate={{ rotate: isFree ? [0, -34, 6, -34, 6] : [0, 9, 0] }}
            style={{ originX: "110px", originY: "202px" }}
            transition={{
              duration:    isFree ? 0.28 : 2.8,
              repeat:      Infinity,
              repeatDelay: isFree ? 0 : 1.8,
              ease:        "easeInOut",
            }}
          />

          {/* Head + eye + beak group — gentle idle bob when perched */}
          <motion.g
            animate={{ y: !isFree ? [0, -2, 0, -1, 0] : 0 }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
          >
            <circle cx="132" cy="192" r="15" fill={GOLD} />
            <circle cx="138" cy="187" r="3.2" fill="#1C100A" />
            <circle cx="139" cy="186" r="1.3" fill="white" />
            <motion.path
              d="M 144,192 L 161,187 L 144,200 Z"
              fill={BEAK}
              animate={{ rotate: isFree ? [0, 11, 0] : 0 }}
              style={{ originX: "144px", originY: "196px" }}
              transition={{ duration: 0.45, repeat: isFree ? Infinity : 0, repeatDelay: 0.9 }}
            />
          </motion.g>

          {/* Feet — visible only when perched */}
          {!isFree && (
            <g stroke={BEAK} strokeWidth="2" strokeLinecap="round">
              <line x1="104" y1="225" x2="100" y2="228" />
              <line x1="116" y1="225" x2="120" y2="228" />
              <line x1="95"  y1="228" x2="105" y2="228" />
              <line x1="116" y1="228" x2="126" y2="228" />
            </g>
          )}
        </motion.g>

        {/* ─────────────────────────────────────────
            VERTICAL BARS — rendered AFTER bird
            so they appear in front (trapping look)
        ───────────────────────────────────────── */}
        {BAR_XS.map((x, i) => (
          <motion.line
            key={i}
            x1={x} y1="68" x2={x} y2="258"
            stroke={CAGE} strokeWidth="2.5" strokeLinecap="round"
            initial={{ opacity: 1, x: 0 }}
            animate={getBarAnim(i)}
            transition={{ duration: 0.75, delay: i * 0.055, ease: "easeInOut" }}
          />
        ))}

        {/* Ornamental rings — on top of bars */}
        <motion.ellipse cx="120" cy="128" rx="78" ry="7"
          stroke={CAGE} strokeWidth="2.2" fill="none"
          animate={{ opacity: isFree ? 0.05 : 0.85 }}
          transition={{ duration: 0.9 }} />

        <motion.ellipse cx="120" cy="202" rx="78" ry="7"
          stroke={CAGE} strokeWidth="2.2" fill="none"
          animate={{ opacity: isFree ? 0.05 : 0.85 }}
          transition={{ duration: 0.9 }} />
      </svg>

      {/* Freedom label — appears after bird soars */}
      {isFree && (
        <motion.div
          className="absolute top-full left-0 right-0 text-center mt-5"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <span
            className="font-fraunces text-sm sm:text-base font-bold italic text-primary"
            style={{ fontVariationSettings: '"opsz" 24, "SOFT" 20' }}
          >
            Free at last.
          </span>
        </motion.div>
      )}
    </div>
  )
}
