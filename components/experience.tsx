"use client"

import { useState, useCallback } from "react"
import { AnimatePresence } from "framer-motion"
import { CursorGlow } from "@/components/cursor-glow"
import { AmbientParticles } from "@/components/ambient-particles"
import { SceneOne } from "@/components/scenes/scene-one"
import { SceneTwo } from "@/components/scenes/scene-two"
import { SceneThree } from "@/components/scenes/scene-three"
import { SceneFour } from "@/components/scenes/scene-four"
import { SceneFive } from "@/components/scenes/scene-five"

export function Experience() {
  const [scene, setScene] = useState(1)

  const goToScene = useCallback((n: number) => {
    setScene(n)
  }, [])

  const restart = useCallback(() => {
    setScene(0)
    setTimeout(() => setScene(1), 100)
  }, [])

  const particleIntensity =
    scene === 1 ? 0.8 : scene === 2 ? 1 : scene === 3 ? 1.2 : scene === 4 ? 0.5 : 0.3

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-background">
      <AmbientParticles intensity={particleIntensity} />
      <CursorGlow />

      <AnimatePresence mode="wait">
        {scene === 1 && (
          <SceneOne key="scene-1" onAdvance={() => goToScene(2)} />
        )}
        {scene === 2 && (
          <SceneTwo key="scene-2" onAdvance={() => goToScene(3)} />
        )}
        {scene === 3 && (
          <SceneThree key="scene-3" onAdvance={() => goToScene(4)} />
        )}
        {scene === 4 && (
          <SceneFour key="scene-4" onAdvance={() => goToScene(5)} />
        )}
        {scene === 5 && (
          <SceneFive key="scene-5" onRestart={restart} />
        )}
      </AnimatePresence>

      {/* Scene indicator */}
      {scene > 0 && scene <= 5 && (
        <div className="fixed right-6 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-3" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className="flex h-2 w-2 items-center justify-center rounded-full transition-all duration-500"
              style={{
                backgroundColor:
                  s === scene
                    ? "hsl(0 72% 51%)"
                    : s < scene
                      ? "hsl(0 40% 35%)"
                      : "hsl(0 0% 20%)",
                boxShadow:
                  s === scene
                    ? "0 0 10px hsl(0 80% 50% / 0.6)"
                    : "none",
                transform: s === scene ? "scale(1.3)" : "scale(1)",
              }}
            />
          ))}
        </div>
      )}
    </main>
  )
}
