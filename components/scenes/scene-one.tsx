"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FlowerAnimation } from "@/components/flower-animation"

interface SceneOneProps {
  onAdvance: () => void
}

export function SceneOne({ onAdvance }: SceneOneProps) {
  const [phase, setPhase] = useState<"flowers" | "transition" | "cta">("flowers")

  useEffect(() => {
    // Let the flowers play for ~8 seconds, then start fading
    const timer = setTimeout(() => {
      setPhase("transition")
    }, 8000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (phase === "transition") {
      // After the fade-out finishes (~1.5s), show the CTA
      const timer = setTimeout(() => {
        setPhase("cta")
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [phase])

  return (
    <motion.div
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      {/* Phase 1: Flower animation */}
      <AnimatePresence>
        {(phase === "flowers" || phase === "transition") && (
          <motion.div
            className="absolute inset-0 z-10"
            initial={{ opacity: 1 }}
            animate={{ opacity: phase === "transition" ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <FlowerAnimation />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 2: Red orb + CTA (after flowers fade) */}
      <AnimatePresence>
        {phase === "cta" && (
          <motion.div
            className="relative z-20 flex flex-col items-center gap-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {/* Pulsing red orb */}
            <motion.div
              className="relative"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Outer glow */}
              <div className="absolute -inset-8 rounded-full bg-primary/20 blur-2xl" />
              <div className="absolute -inset-4 rounded-full bg-primary/30 blur-xl" />
              {/* Core orb */}
              <motion.div
                className="relative h-16 w-16 rounded-full md:h-20 md:w-20"
                style={{
                  background:
                    "radial-gradient(circle at 40% 40%, hsl(0 90% 65%), hsl(0 72% 51%), hsl(0 72% 30%))",
                  boxShadow:
                    "0 0 60px hsl(0 90% 55% / 0.5), 0 0 120px hsl(0 90% 55% / 0.2), inset 0 0 30px hsl(0 0% 0% / 0.3)",
                }}
                animate={{
                  boxShadow: [
                    "0 0 60px hsl(0 90% 55% / 0.5), 0 0 120px hsl(0 90% 55% / 0.2), inset 0 0 30px hsl(0 0% 0% / 0.3)",
                    "0 0 80px hsl(0 90% 55% / 0.7), 0 0 160px hsl(0 90% 55% / 0.3), inset 0 0 30px hsl(0 0% 0% / 0.3)",
                    "0 0 60px hsl(0 90% 55% / 0.5), 0 0 120px hsl(0 90% 55% / 0.2), inset 0 0 30px hsl(0 0% 0% / 0.3)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* CTA button */}
            <motion.button
              onClick={onAdvance}
              className="cursor-none border-none bg-transparent font-serif text-lg tracking-[0.3em] text-foreground/80 uppercase transition-colors hover:text-foreground focus:outline-none md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.2 }}
              whileHover={{ scale: 1.05, color: "hsl(0, 72%, 51%)" }}
              aria-label="Click to begin the experience"
            >
              Click if you still here
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle hint */}
      <AnimatePresence>
        {phase === "cta" && (
          <motion.p
            className="absolute bottom-10 z-50 font-sans text-xs tracking-[0.2em] text-muted-foreground/40 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          >
            I really miss you
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
