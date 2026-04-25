'use client'
import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number; vx: number; vy: number
  radius: number; opacity: number; color: string; baseVx: number; baseVy: number
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -999, y: -999 })
  const particles = useRef<Particle[]>([])
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    // Detect mobile for performance
    const isMobile = window.innerWidth < 768

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      canvas.width = parent.offsetWidth
      canvas.height = parent.offsetHeight
    }
    resize()

    const resizeObs = new ResizeObserver(resize)
    if (canvas.parentElement) resizeObs.observe(canvas.parentElement)

    const COLORS = [
      'rgba(123,62,255,', 'rgba(160,102,255,', 'rgba(200,150,255,',
      'rgba(255,255,255,', 'rgba(90,40,200,',
    ]

    // Significantly fewer particles on mobile for performance
    const COUNT = isMobile
      ? Math.min(40, Math.floor(window.innerWidth / 12))
      : Math.min(120, Math.floor(window.innerWidth / 10))

    particles.current = Array.from({ length: COUNT }, () => {
      const speed = Math.random() * 0.5 + 0.1
      const angle = Math.random() * Math.PI * 2
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        baseVx: Math.cos(angle) * speed,
        baseVy: Math.sin(angle) * speed,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.6 + 0.15,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }
    })

    // Reduce connection distance on mobile
    const CONNECT_DIST = isMobile ? 60 : 85

    let frameCount = 0
    const draw = () => {
      frameCount++
      // Skip every other frame on mobile for 30fps instead of 60fps
      if (isMobile && frameCount % 2 !== 0) {
        animRef.current = requestAnimationFrame(draw)
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const mx = mouse.current.x
      const my = mouse.current.y

      for (const p of particles.current) {
        // Mouse repulsion (skip on mobile touch)
        if (!isMobile) {
          const dx = mx - p.x
          const dy = my - p.y
          const distSq = dx * dx + dy * dy
          if (distSq < 150 * 150 && distSq > 0) {
            const dist = Math.sqrt(distSq)
            const force = (150 - dist) / 150
            p.vx -= (dx / dist) * force * 2
            p.vy -= (dy / dist) * force * 2
          }
        }

        // Lerp back to base velocity
        p.vx += (p.baseVx - p.vx) * 0.03
        p.vy += (p.baseVy - p.vy) * 0.03

        p.x += p.vx
        p.y += p.vy

        // Wrap around edges (cheaper than bounce)
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Draw particle (no shadow on mobile = big perf gain)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${p.opacity})`
        ctx.fill()
      }

      // Connection lines (skip on small mobile)
      if (!isMobile || COUNT > 30) {
        const len = particles.current.length
        for (let i = 0; i < len; i++) {
          for (let j = i + 1; j < len; j++) {
            const a = particles.current[i]
            const b = particles.current[j]
            const dx = a.x - b.x
            const dy = a.y - b.y
            const dSq = dx * dx + dy * dy
            if (dSq < CONNECT_DIST * CONNECT_DIST) {
              const d = Math.sqrt(dSq)
              ctx.beginPath()
              ctx.moveTo(a.x, a.y)
              ctx.lineTo(b.x, b.y)
              ctx.strokeStyle = `rgba(123,62,255,${(1 - d / CONNECT_DIST) * 0.25})`
              ctx.lineWidth = 0.6
              ctx.stroke()
            }
          }
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => { mouse.current = { x: -999, y: -999 } }

    if (!isMobile) {
      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseleave', onLeave)
    }

    return () => {
      cancelAnimationFrame(animRef.current)
      resizeObs.disconnect()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
