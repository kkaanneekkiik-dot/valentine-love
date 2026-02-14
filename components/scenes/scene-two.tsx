"use client"

import { motion, useMotionValue } from "framer-motion"
import { useEffect, useRef, useState } from "react"

interface SceneTwoProps {
  onAdvance: () => void
}

const lines = [
  "Some stories aren't told.",
  "They're felt.",
  "This is one of those.",
  "Stay close...",
]

export function SceneTwo({ onAdvance }: SceneTwoProps) {
  const [currentLine, setCurrentLine] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [typing, setTyping] = useState(true)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width)
        mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height)
      }
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  useEffect(() => {
    if (currentLine >= lines.length) {
      const timeout = setTimeout(onAdvance, 1500)
      return () => clearTimeout(timeout)
    }

    const line = lines[currentLine]
    let charIndex = 0
    setDisplayText("")
    setTyping(true)

    const interval = setInterval(() => {
      charIndex++
      setDisplayText(line.slice(0, charIndex))
      if (charIndex >= line.length) {
        clearInterval(interval)
        setTyping(false)
        setTimeout(() => setCurrentLine((prev) => prev + 1), 1200)
      }
    }, 60)

    return () => clearInterval(interval)
  }, [currentLine, onAdvance])

  return (
    <motion.div
      ref={containerRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
      initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, x: -100, filter: "blur(10px)" }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      {/* Floating abstract shapes */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 60 + i * 40,
            height: 60 + i * 40,
            background: `radial-gradient(circle, hsl(0 70% 50% / ${0.06 - i * 0.008}) 0%, transparent 70%)`,
            left: `${15 + i * 16}%`,
            top: `${20 + ((i * 17) % 50)}%`,
          }}
          animate={{
            x: [0, 20 * (i % 2 === 0 ? 1 : -1), 0],
            y: [0, 15 * (i % 2 === 0 ? -1 : 1), 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Red light streaks */}
      <motion.div
        className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(0 80% 50% / 0.15), transparent)",
        }}
        animate={{ opacity: [0, 0.6, 0], scaleX: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-0 top-[45%] h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(0 80% 50% / 0.08), transparent)",
        }}
        animate={{ opacity: [0.3, 0, 0.3], scaleX: [0.8, 0.3, 0.8] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Typing text */}
      <div className="relative z-10 flex flex-col items-center px-6">
        <motion.p
          className="min-h-[3rem] text-center font-serif text-2xl leading-relaxed text-foreground/90 md:text-4xl"
          key={currentLine}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {displayText}
          {typing && (
            <motion.span
              className="ml-0.5 inline-block h-6 w-[2px] bg-primary align-middle md:h-8"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
          )}
        </motion.p>

        {/* Progress dots */}
        <div className="mt-12 flex gap-3">
          {lines.map((_, i) => (
            <motion.div
              key={i}
              className="h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor:
                  i <= currentLine
                    ? "hsl(0 72% 51%)"
                    : "hsl(0 0% 25%)",
              }}
              animate={
                i === currentLine
                  ? { scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }
                  : {}
              }
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
