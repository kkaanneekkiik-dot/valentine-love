"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface Trail {
  x: number
  y: number
  id: number
}

export function CursorGlow() {
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const [trails, setTrails] = useState<Trail[]>([])
  const trailId = useRef(0)
  const [isVisible, setIsVisible] = useState(false)

  const springX = useSpring(cursorX, { damping: 25, stiffness: 200 })
  const springY = useSpring(cursorY, { damping: 25, stiffness: 200 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)

      trailId.current += 1
      const newTrail: Trail = {
        x: e.clientX,
        y: e.clientY,
        id: trailId.current,
      }

      setTrails((prev) => [...prev.slice(-12), newTrail])
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [cursorX, cursorY])

  useEffect(() => {
    if (trails.length === 0) return
    const timer = setTimeout(() => {
      setTrails((prev) => prev.slice(1))
    }, 80)
    return () => clearTimeout(timer)
  }, [trails])

  if (typeof window !== "undefined" && "ontouchstart" in window) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden="true"
    >
      {trails.map((trail, i) => (
        <motion.div
          key={trail.id}
          className="absolute rounded-full"
          style={{
            left: trail.x - 4,
            top: trail.y - 4,
            width: 8,
            height: 8,
            background: `radial-gradient(circle, hsl(0 90% 55% / ${0.15 + i * 0.03}), transparent)`,
          }}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      ))}

      <motion.div
        className="absolute rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: 160,
          height: 160,
          background:
            "radial-gradient(circle, hsl(0 90% 55% / 0.12) 0%, hsl(0 90% 55% / 0.04) 40%, transparent 70%)",
          opacity: isVisible ? 1 : 0,
        }}
      />

      <motion.div
        className="absolute rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: 8,
          height: 8,
          backgroundColor: "hsl(0 90% 60%)",
          boxShadow: "0 0 20px hsl(0 90% 55% / 0.8), 0 0 60px hsl(0 90% 55% / 0.3)",
          opacity: isVisible ? 1 : 0,
        }}
      />
    </div>
  )
}
