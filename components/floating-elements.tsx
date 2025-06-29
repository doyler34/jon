"use client"

import { useEffect, useState } from "react"

export function FloatingElements() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating particles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-purple-400/20 rounded-full animate-pulse"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
            transform: `translate(${mousePosition.x * (0.02 + i * 0.01)}px, ${mousePosition.y * (0.01 + i * 0.005)}px)`,
            transition: "transform 0.3s ease-out",
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
    </div>
  )
}
