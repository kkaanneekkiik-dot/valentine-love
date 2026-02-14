"use client"

import { motion, useMotionValue, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"

interface SceneThreeProps {
  onAdvance: () => void
}

const funFacts = [
  "Things that keep me company, ur photos, ur name in my walls, ur gifts",
  "Your memories live quietly in the corners of my room",
  "Even when apart , you feels close, in the world I carry",
  "Even in silence, pesence never fades",
]

function FloatingOrb({ index }: { index: number }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [hovered, setHovered] = useState(false)
  const [showFact, setShowFact] = useState(false)

  const orbX = useTransform(mouseX, [-1, 1], [-30 * (index + 1), 30 * (index + 1)])
  const orbY = useTransform(mouseY, [-1, 1], [-20 * (index + 1), 20 * (index + 1)])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1)
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  const positions = [
    { left: "15%", top: "25%" },
    { left: "70%", top: "20%" },
    { left: "25%", top: "65%" },
    { left: "75%", top: "60%" },
  ]

  return (
    <motion.div
      className="absolute cursor-none"
      style={{
        ...positions[index],
        x: orbX,
        y: orbY,
      }}
      onHoverStart={() => {
        setHovered(true)
        setShowFact(true)
      }}
      onHoverEnd={() => {
        setHovered(false)
        setTimeout(() => setShowFact(false), 300)
      }}
    >
      <motion.div
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: 80 + index * 20,
          height: 80 + index * 20,
          background: `radial-gradient(circle, hsl(${index * 5} ${70 + index * 5}% 50% / ${hovered ? 0.5 : 0.15}) 0%, transparent 70%)`,
          border: `1px solid hsl(0 70% 50% / ${hovered ? 0.4 : 0.1})`,
        }}
        animate={
          hovered
            ? { scale: 1.3, rotate: 180 }
            : {
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0],
              }
        }
        transition={
          hovered
            ? { type: "spring", stiffness: 200 }
            : { duration: 4 + index, repeat: Infinity, ease: "easeInOut" }
        }
      >
        {/* Inner glow */}
        <motion.div
          className="rounded-full"
          style={{
            width: 12 + index * 4,
            height: 12 + index * 4,
            backgroundColor: `hsl(0 80% ${55 + index * 3}%)`,
            boxShadow: hovered
              ? "0 0 30px hsl(0 90% 50% / 0.8), 0 0 60px hsl(0 90% 50% / 0.4)"
              : "0 0 15px hsl(0 90% 50% / 0.4)",
          }}
          animate={hovered ? { scale: [1, 1.5, 1] } : {}}
          transition={{ duration: 0.5, repeat: hovered ? Infinity : 0 }}
        />
      </motion.div>

      {/* Fun fact tooltip */}
      {showFact && (
        <motion.div
          className="absolute left-1/2 top-full mt-4 w-48 -translate-x-1/2 rounded-lg border border-border/30 bg-secondary/80 px-3 py-2 text-center font-sans text-xs text-muted-foreground backdrop-blur-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {funFacts[index]}
        </motion.div>
      )}
    </motion.div>
  )
}

export function SceneThree({ onAdvance }: SceneThreeProps) {
  const [clickCount, setClickCount] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    setClickCount((prev) => prev + 1)
  }

  return (
    <motion.div
      ref={containerRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(15px)" }}
      transition={{ duration: 1, ease: "easeInOut" }}
      onClick={handleClick}
    >
      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.03]">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute left-0 h-px w-full bg-foreground"
            style={{ top: `${(i + 1) * 5}%` }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: i * 0.05, duration: 1 }}
          />
        ))}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute top-0 h-full w-px bg-foreground"
            style={{ left: `${(i + 1) * 5}%` }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: i * 0.05, duration: 1 }}
          />
        ))}
      </div>

      {/* Floating interactive orbs */}
      {[0, 1, 2, 3].map((i) => (
        <FloatingOrb key={i} index={i} />
      ))}

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center px-6">
        <motion.h2
          className="text-center font-serif text-3xl tracking-wide text-foreground/80 md:text-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {"Explore the void"}
        </motion.h2>

        <motion.p
          className="mt-4 font-sans text-sm tracking-widest text-muted-foreground/50 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {"Hover the orbs. Discover secrets."}
        </motion.p>

        {/* Click counter - playful element */}
        <motion.div
          className="mt-8 rounded-full border border-border/20 bg-secondary/40 px-4 py-1.5 font-sans text-xs text-muted-foreground/60"
          animate={clickCount > 0 ? { scale: [1, 1.1, 1] } : {}}
          key={clickCount}
        >
          {clickCount === 0
            ? "Click anywhere..."
            : clickCount < 5
              ? `${clickCount} click${clickCount > 1 ? "s" : ""}... keep going`
              : clickCount < 10
                ? "You're persistent..."
                : "Okay, you win."}
        </motion.div>
      </div>

      {/* Advance button */}
      <motion.button
        onClick={(e) => {
          e.stopPropagation()
          onAdvance()
        }}
        className="absolute bottom-12 cursor-none border-none bg-transparent font-sans text-sm tracking-[0.2em] text-muted-foreground/40 uppercase transition-colors hover:text-primary focus:outline-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        whileHover={{ scale: 1.05 }}
      >
        {"Continue the journey"}
      </motion.button>
    </motion.div>
  )
}
