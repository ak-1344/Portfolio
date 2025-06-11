"use client"

import { useRef, useEffect, type ReactNode } from "react"

interface ParallaxCardProps {
  children: ReactNode
  className?: string
  intensity?: number
  disableTilt?: boolean
}

export function ParallaxCard({ children, className = "", intensity = 10, disableTilt = false }: ParallaxCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card || disableTilt) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / intensity
      const rotateY = (centerX - x) / intensity

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`
    }

    const handleMouseLeave = () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)"
    }

    card.addEventListener("mousemove", handleMouseMove)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mousemove", handleMouseMove)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [intensity, disableTilt])

  return (
    <div
      ref={cardRef}
      className={`${disableTilt ? "" : "transition-transform duration-200 ease-out"} ${className}`}
      style={disableTilt ? {} : { transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  )
}
