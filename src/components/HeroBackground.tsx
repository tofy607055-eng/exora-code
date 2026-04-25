'use client'
import { useRef, useEffect } from 'react'

const SYMBOLS = [
  '</>', '{ }', '()', '=>', '[ ]', '//', '/**',
  'fn()', 'API', 'async', 'const', 'return', '&&',
  '===', 'import', 'npm', 'git', '.tsx', 'JSON',
  'HTTP', '<div>', 'export', 'interface', '{ id }',
  'await', 'type', '0xFF', 'GET', 'POST',
]

type P = {
  el: HTMLSpanElement
  baseX: number; baseY: number
  x: number;    y: number
  depth: number
}

export default function HeroBackground() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const spotRef = useRef<HTMLDivElement>(null)
  const pts     = useRef<P[]>([])
  const mouse   = useRef({ x: -9999, y: -9999, inside: false })
  const raf     = useRef<number>(0)

  useEffect(() => {
    const wrap = wrapRef.current
    const spot = spotRef.current
    if (!wrap || !spot) return

    const W = wrap.offsetWidth  || 1200
    const H = wrap.offsetHeight || 300

    /* ── spawn symbols ── */
    const list: P[] = []
    for (let i = 0; i < 28; i++) {
      const el    = document.createElement('span')
      el.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
      const depth = 0.3 + Math.random() * 0.7
      const size  = 11 + depth * 8
      const dur   = 6 + Math.random() * 9

      el.style.cssText = `
        position:absolute;
        font-family:'Fira Code','Courier New',monospace;
        font-size:${size}px;
        color:#C084FC;
        opacity:0.20;
        pointer-events:none;user-select:none;white-space:nowrap;
        animation:float-sym ${dur}s ease-in-out infinite alternate;
        animation-delay:${-Math.random() * dur}s;
        will-change:transform,opacity;
      `
      const bx = Math.random() * W
      const by = Math.random() * H
      el.style.left = bx + 'px'
      el.style.top  = by + 'px'
      wrap.appendChild(el)
      list.push({ el, baseX: bx, baseY: by, x: bx, y: by, depth })
    }
    pts.current = list

    /* ── Listen on the PARENT SECTION (not the wrap div) ──
       This fixes the bug where content elements above the background
       (text, buttons etc.) block mousemove events from reaching the wrapper ── */
    const eventTarget: HTMLElement = (wrap.closest('section') as HTMLElement) ?? document.body

    const onMove = (e: MouseEvent) => {
      // Always compute position relative to the wrap div's bounding box
      const r = wrap.getBoundingClientRect()
      // Use physical coordinates (direction:ltr on wrap ensures no RTL flip)
      const mx = e.clientX - r.left
      const my = e.clientY - r.top
      mouse.current = { x: mx, y: my, inside: true }
      spot.style.opacity = '1'
      spot.style.left = (mx - 220) + 'px'
      spot.style.top  = (my - 220) + 'px'
    }

    const onLeave = () => {
      mouse.current.inside = false
      spot.style.opacity = '0'
    }

    eventTarget.addEventListener('mousemove', onMove)
    eventTarget.addEventListener('mouseleave', onLeave)

    /* ── Animation loop: ATTRACTION toward cursor ── */
    const loop = () => {
      const { x: mx, y: my, inside } = mouse.current
      list.forEach(p => {
        let tx = p.baseX, ty = p.baseY, op = 0.20

        if (inside && mx > -999) {
          const dx   = mx - p.baseX
          const dy   = my - p.baseY
          const dist = Math.sqrt(dx * dx + dy * dy) || 1
          const MAX  = 180
          if (dist < MAX) {
            const strength = (1 - dist / MAX)
            tx = p.baseX + dx * strength * 0.30 * p.depth
            ty = p.baseY + dy * strength * 0.30 * p.depth
            op = Math.min(0.45, 0.20 + strength * 0.28 * p.depth)
          }
        }

        p.x += (tx - p.x) * 0.08
        p.y += (ty - p.y) * 0.08
        p.el.style.left    = p.x + 'px'
        p.el.style.top     = p.y + 'px'
        p.el.style.opacity = op.toFixed(3)
      })
      raf.current = requestAnimationFrame(loop)
    }

    raf.current = requestAnimationFrame(loop)

    return () => {
      eventTarget.removeEventListener('mousemove', onMove)
      eventTarget.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf.current)
      list.forEach(p => p.el.remove())
    }
  }, [])

  return (
    <>
      <style>{`
        @keyframes float-sym {
          from { transform: translateY(0px) rotate(-3deg); }
          to   { transform: translateY(-18px) rotate(3deg); }
        }
      `}</style>

      {/* 
        direction:ltr prevents RTL from flipping translateX/left values.
        pointerEvents:none so mouse events pass through to parent section.
      */}
      <div
        ref={wrapRef}
        style={{
          position: 'absolute', inset: 0, overflow: 'hidden',
          pointerEvents: 'none',   /* ← KEY FIX: don't block mouse events */
          zIndex: 0,
          direction: 'ltr',        /* ← KEY FIX: prevent RTL axis flip */
        }}
      >
        <div
          ref={spotRef}
          style={{
            position: 'absolute', width: '440px', height: '440px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(160,102,255,0.18) 0%, rgba(123,62,255,0.06) 45%, transparent 70%)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
            left: '-9999px', top: '-9999px',
          }}
        />
      </div>
    </>
  )
}
