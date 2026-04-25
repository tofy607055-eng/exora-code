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
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      canvas.width = parent.offsetWidth
      canvas.height = parent.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const COLORS = [
      'rgba(123,62,255,', 'rgba(160,102,255,', 'rgba(200,150,255,',
      'rgba(255,255,255,', 'rgba(90,40,200,', 'rgba(180,80,255,',
    ]
    // كثير من الجسيمات
    const COUNT = Math.min(300, Math.floor(window.innerWidth / 6))

    particles.current = Array.from({ length: COUNT }, () => {
      const speed = Math.random() * 0.8 + 0.2
      const angle = Math.random() * Math.PI * 2
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        baseVx: Math.cos(angle) * speed,
        baseVy: Math.sin(angle) * speed,
        radius: Math.random() * 3 + 1,
        opacity: Math.random() * 0.7 + 0.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }
    })

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const mx = mouse.current.x
      const my = mouse.current.y

      particles.current.forEach(p => {
        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        // تأثير قوي جداً للماوس
        if (dist < 180 && dist > 0) {
          const force = (180 - dist) / 180
          const pushX = (dx / dist) * force * 3
          const pushY = (dy / dist) * force * 3
          p.vx -= pushX
          p.vy -= pushY
        }

        // إرجاع تدريجي للسرعة الأصلية
        p.vx += (p.baseVx - p.vx) * 0.02
        p.vy += (p.baseVy - p.vy) * 0.02

        // حد أقصى للسرعة
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > 7) {
          p.vx = (p.vx / speed) * 7
          p.vy = (p.vy / speed) * 7
        }

        p.x += p.vx
        p.y += p.vy

        // الارتداد من الحواف
        if (p.x < 0) { p.x = 0; p.vx *= -0.8; p.baseVx *= -1 }
        if (p.x > canvas.width) { p.x = canvas.width; p.vx *= -0.8; p.baseVx *= -1 }
        if (p.y < 0) { p.y = 0; p.vy *= -0.8; p.baseVy *= -1 }
        if (p.y > canvas.height) { p.y = canvas.height; p.vy *= -0.8; p.baseVy *= -1 }

        // رسم الجسيم مع glow
        ctx.save()
        ctx.shadowBlur = 8
        ctx.shadowColor = `${p.color}0.8)`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${p.opacity})`
        ctx.fill()
        ctx.restore()
      })

      // خطوط التوصيل
      const CONNECT_DIST = 90
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const a = particles.current[i]
          const b = particles.current[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < CONNECT_DIST) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(123,62,255,${(1 - d / CONNECT_DIST) * 0.3})`
            ctx.lineWidth = 0.8
            ctx.stroke()
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

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
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
