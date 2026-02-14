"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface SceneFiveProps {
  onRestart: () => void
}

const storyLines = [
  "I wanted to create something different.",
  "",
  "Not a website.",
  "Not a product.",
  "Not a pitch.",
  "",
  "Just... a feeling.",
  "",
  "Something that slows you down",
  "in a world that never stops moving.",
  "",
  "Something that reminds you",
  "that beauty lives in the quiet spaces.",
  "",
  "In the pause between breaths.",
  "In the glow between stars.",
  "In the silence between words.",
  "",
  "If you made it this far,",
  "you chose curiosity over speed.",
  "Attention over distraction.",
  "Presence over productivity.",
  "",
  "And that...",
  "that is something rare.",
  "",
  "Thank you for being here.",
  "Thank you for staying.",
  "",
  "This was made for you.",
]

export function SceneFive({ onRestart }: SceneFiveProps) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [showEnd, setShowEnd] = useState(false)

  useEffect(() => {
    if (visibleLines >= storyLines.length) {
      const timer = setTimeout(() => setShowEnd(true), 2000)
      return () => clearTimeout(timer)
    }

    const line = storyLines[visibleLines]
    const delay = line === "" ? 600 : 900

    const timer = setTimeout(() => {
      setVisibleLines((prev) => prev + 1)
    }, delay)

    return () => clearTimeout(timer)
  }, [visibleLines])

  return (
    <motion.div
      className="relative flex h-screen w-full flex-col items-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {/* Very subtle ambient glow */}
      <motion.div
        className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, hsl(0 60% 40% / 0.04) 0%, transparent 60%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Scrollable story text */}
      <div className="relative z-10 flex max-h-[80vh] w-full max-w-xl flex-col items-center overflow-y-auto px-6 pt-20 pb-32 scrollbar-hide md:pt-24">
        <AnimatePresence>
          {storyLines.slice(0, visibleLines).map((line, i) => (
            <motion.p
              key={i}
              className={`w-full text-center font-serif leading-relaxed ${
                line === ""
                  ? "h-6"
                  : i >= storyLines.length - 2
                    ? "text-lg text-foreground/80 md:text-xl"
                    : "text-base text-foreground/55 md:text-lg"
              }`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {line}
            </motion.p>
          ))}
        </AnimatePresence>
      </div>

      {/* End section */}
      <AnimatePresence>
        {showEnd && (
          <motion.div
            className="absolute bottom-12 z-10 flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {/* Small red heart glow */}
            <motion.div
              className="rounded-full"
              style={{
                width: 8,
                height: 8,
                background: "hsl(0 75% 50%)",
                boxShadow:
                  "0 0 20px hsl(0 80% 50% / 0.6), 0 0 40px hsl(0 80% 50% / 0.3)",
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            <motion.button
              onClick={onRestart}
              className="cursor-none rounded-full border border-border/20 bg-secondary/30 px-8 py-3 font-sans text-sm tracking-[0.2em] text-foreground/50 uppercase backdrop-blur-sm transition-all hover:border-primary/30 hover:text-primary focus:outline-none"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px hsl(0 80% 50% / 0.2)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              Restart experience
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
