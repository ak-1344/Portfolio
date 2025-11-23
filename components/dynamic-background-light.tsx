"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

export function DynamicBackgroundLight() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      const particles: Particle[] = []
      const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 15000))

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.3 + 0.1,
        })
      }
      particlesRef.current = particles
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Define colorful particles for light theme
      const lightColors = [
        { r: 59, g: 130, b: 246 },   // Blue
        { r: 168, g: 85, b: 247 },   // Purple
        { r: 239, g: 68, b: 68 },    // Red
        { r: 34, g: 197, b: 94 },    // Green
        { r: 251, g: 191, b: 36 },   // Yellow
        { r: 236, g: 72, b: 153 },   // Pink
      ]

      // Draw particles
      particlesRef.current.forEach((particle, index) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        
        // Colorful light theme particles
        const color = lightColors[index % lightColors.length]
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${particle.opacity * 1.5})`
        ctx.shadowBlur = 10
        ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.5)`
        ctx.fill()
        ctx.shadowBlur = 0

        // Draw connections
        particlesRef.current.forEach((otherParticle, otherIndex) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            
            // Colorful light theme connections
            const color = lightColors[index % lightColors.length]
            ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${0.15 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })

        // Update particle position
        particle.x += particle.vx
        particle.y += particle.vy

        // Mouse interaction
        const mouseDistance = Math.sqrt((particle.x - mouseRef.current.x) ** 2 + (particle.y - mouseRef.current.y) ** 2)
        if (mouseDistance < 100) {
          const force = (100 - mouseDistance) / 100
          particle.vx += (particle.x - mouseRef.current.x) * force * 0.001
          particle.vy += (particle.y - mouseRef.current.y) * force * 0.001
        }

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))
      })
    }

    const animate = () => {
      drawParticles()
      requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleResize = () => {
      resizeCanvas()
      createParticles()
    }

    resizeCanvas()
    createParticles()
    animate()

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <>
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(-45deg,#f0f9ff,#fef3f9,#f0fdf4,#fefce8)] animate-gradient-xy" />
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ background: "transparent" }} />
    </>
  )
}
