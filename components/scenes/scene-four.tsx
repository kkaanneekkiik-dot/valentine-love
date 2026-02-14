"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface SceneFourProps {
  onAdvance: () => void
}

export function SceneFour({ onAdvance }: SceneFourProps) {
  const [breath, setBreath] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setBreath((prev) => !prev)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0, filter: "blur(20px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      {/* Large ambient glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, hsl(0 70% 45% / 0.08) 0%, hsl(0 70% 45% / 0.02) 50%, transparent 70%)",
        }}
        animate={{
          scale: breath ? 1.2 : 0.9,
          opacity: breath ? 0.8 : 0.5,
        }}
        transition={{ duration: 4, ease: "easeInOut" }}
      />

      {/* Concentric rings */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{
            width: 150 + i * 100,
            height: 150 + i * 100,
            borderColor: `hsl(0 60% 50% / ${0.08 - i * 0.015})`,
          }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: i % 2 === 0 ? [0, 360] : [360, 0],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Center orb */}
      <motion.div
        className="relative z-10 rounded-full"
        style={{
          width: 40,
          height: 40,
          background: "hsl(0 75% 48%)",
          boxShadow:
            "0 0 60px hsl(0 80% 50% / 0.6), 0 0 120px hsl(0 80% 50% / 0.3), 0 0 200px hsl(0 80% 50% / 0.15)",
        }}
        animate={{
          scale: breath ? [1, 1.15, 1] : [1, 0.9, 1],
        }}
        transition={{ duration: 4, ease: "easeInOut" }}
      />

      {/* Breathing text */}
      <motion.p
        className="relative z-10 mt-16 font-serif text-lg tracking-[0.15em] text-foreground/50 md:text-2xl"
        animate={{
          opacity: breath ? 0.7 : 0.3,
        }}
        transition={{ duration: 4, ease: "easeInOut" }}
      >
        {breath ? "Breathe in..." : "Breathe out..."}
      </motion.p>

      <motion.p
        className="relative z-10 mt-6 max-w-md px-6 text-center font-serif text-base leading-relaxed text-muted-foreground/40 md:text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 2 }}
      >
        {"Every beautiful thing starts in silence. Every connection begins with a single moment of attention."}
      </motion.p>

      {/* Advance */}
      <motion.button
        onClick={onAdvance}
        className="relative z-10 mt-16 cursor-none border-none bg-transparent font-sans text-sm tracking-[0.25em] text-muted-foreground/30 uppercase transition-colors hover:text-primary focus:outline-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5, duration: 2 }}
        whileHover={{ scale: 1.05, letterSpacing: "0.35em" }}
      >
        {"I'm ready"}
      </motion.button>
    </motion.div>
  )
}
