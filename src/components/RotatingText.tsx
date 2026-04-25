'use client'
import { useState, useEffect, useRef } from 'react'

export type AnimationType =
  | 'fadeUp' | 'fadeDown' | 'blur' | 'flipX'
  | 'glitch' | 'scale' | 'bounce' | 'slide' | 'typewriter'

interface Props {
  texts: string[]
  animation?: AnimationType
  duration?: number          // seconds between changes
  className?: string
  style?: React.CSSProperties
}

/* ── keyframe strings injected once ── */
const KEYFRAMES = `
@keyframes rt-fadeUp   { from { opacity:0; transform:translateY(24px)  } to { opacity:1; transform:translateY(0) } }
@keyframes rt-fadeDown { from { opacity:0; transform:translateY(-24px) } to { opacity:1; transform:translateY(0) } }
@keyframes rt-blur     { from { opacity:0; filter:blur(14px) } to { opacity:1; filter:blur(0) } }
@keyframes rt-flipX    { from { opacity:0; transform:perspective(400px) rotateX(90deg) } to { opacity:1; transform:perspective(400px) rotateX(0deg) } }
@keyframes rt-scale    { from { opacity:0; transform:scale(0.6) } to { opacity:1; transform:scale(1) } }
@keyframes rt-bounce   { 0%{opacity:0;transform:scale(0.5)} 60%{opacity:1;transform:scale(1.08)} 80%{transform:scale(0.97)} 100%{transform:scale(1)} }
@keyframes rt-slide    { from { opacity:0; transform:translateX(40px) } to { opacity:1; transform:translateX(0) } }
@keyframes rt-glitch1  { 0%,100%{clip-path:inset(0 0 100% 0)} 20%{clip-path:inset(0 0 60% 0);transform:translateX(-4px)} 40%{clip-path:inset(40% 0 30% 0);transform:translateX(4px)} 60%{clip-path:inset(70% 0 0 0);transform:translateX(-2px)} 80%{clip-path:inset(0 0 0 0)} }
@keyframes rt-exit     { from { opacity:1; transform:translateY(0)   } to { opacity:0; transform:translateY(-20px) } }
@keyframes rt-exitDown { from { opacity:1 } to { opacity:0; transform:translateY(20px) } }
@keyframes rt-exitBlur { from { opacity:1; filter:blur(0) } to { opacity:0; filter:blur(12px) } }
`

/* duration for each in animation (ms) */
const ENTRY_DURATION: Record<AnimationType, number> = {
  fadeUp: 500, fadeDown: 500, blur: 550, flipX: 500,
  glitch: 600, scale: 450, bounce: 600, slide: 480, typewriter: 0,
}

export const ANIMATION_LABELS: Record<AnimationType, string> = {
  fadeUp:     'ظهور من الأسفل',
  fadeDown:   'ظهور من الأعلى',
  blur:       'تدرج ضبابي',
  flipX:      'قلب ثلاثي الأبعاد',
  glitch:     'تشويش رقمي',
  scale:      'توسع تدريجي',
  bounce:     'ارتداد مرن',
  slide:      'انزلاق جانبي',
  typewriter: 'كتابة حرفاً بحرف',
}

export default function RotatingText({ texts, animation = 'fadeUp', duration = 3, style }: Props) {
  const [idx, setIdx]         = useState(0)
  const [phase, setPhase]     = useState<'in' | 'out'>('in')
  const [displayed, setDisp]  = useState(texts[0] ?? '')
  const [typed, setTyped]     = useState('')
  const timerRef              = useRef<ReturnType<typeof setTimeout> | null>(null)
  const typingRef             = useRef<ReturnType<typeof setInterval> | null>(null)

  /* inject keyframes once */
  useEffect(() => {
    if (typeof document === 'undefined') return
    const id = '__rt_kf__'
    if (!document.getElementById(id)) {
      const s = document.createElement('style')
      s.id = id; s.textContent = KEYFRAMES
      document.head.appendChild(s)
    }
  }, [])

  /* typewriter helper */
  const startTyping = (text: string) => {
    if (typingRef.current) clearInterval(typingRef.current)
    setTyped('')
    let i = 0
    typingRef.current = setInterval(() => {
      i++
      setTyped(text.slice(0, i))
      if (i >= text.length) clearInterval(typingRef.current!)
    }, 60)
  }

  useEffect(() => {
    if (texts.length < 2) return
    const cycle = () => {
      setPhase('out')
      timerRef.current = setTimeout(() => {
        const next = (idx + 1) % texts.length
        setIdx(next)
        setDisp(texts[next])
        setPhase('in')
        if (animation === 'typewriter') startTyping(texts[next])
      }, 350)
    }
    timerRef.current = setTimeout(cycle, duration * 1000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [idx, texts, duration, animation])

  /* init typewriter */
  useEffect(() => {
    if (animation === 'typewriter') startTyping(texts[0] ?? '')
  }, [animation])

  /* ── animation styles ── */
  const getStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      display: 'inline-block',
      willChange: 'transform, opacity',
      ...style,
    }

    if (phase === 'out') return {
      ...base,
      animation: animation === 'blur'
        ? 'rt-exitBlur 0.3s ease forwards'
        : 'rt-exit 0.3s ease forwards',
    }

    switch (animation) {
      case 'fadeUp':     return { ...base, animation: `rt-fadeUp   ${ENTRY_DURATION.fadeUp}ms cubic-bezier(.22,1,.36,1) forwards` }
      case 'fadeDown':   return { ...base, animation: `rt-fadeDown ${ENTRY_DURATION.fadeDown}ms cubic-bezier(.22,1,.36,1) forwards` }
      case 'blur':       return { ...base, animation: `rt-blur     ${ENTRY_DURATION.blur}ms ease forwards` }
      case 'flipX':      return { ...base, animation: `rt-flipX    ${ENTRY_DURATION.flipX}ms cubic-bezier(.22,1,.36,1) forwards`, transformOrigin: 'center top' }
      case 'scale':      return { ...base, animation: `rt-scale    ${ENTRY_DURATION.scale}ms cubic-bezier(.34,1.56,.64,1) forwards` }
      case 'bounce':     return { ...base, animation: `rt-bounce   ${ENTRY_DURATION.bounce}ms cubic-bezier(.34,1.56,.64,1) forwards` }
      case 'slide':      return { ...base, animation: `rt-slide    ${ENTRY_DURATION.slide}ms cubic-bezier(.22,1,.36,1) forwards` }
      case 'glitch': return {
        ...base,
        position: 'relative',
        animation: 'rt-fadeUp 0.4s ease forwards',
      }
      case 'typewriter': return { ...base, opacity: 1 }
      default:           return { ...base, animation: `rt-fadeUp 0.5s ease forwards` }
    }
  }

  const content = animation === 'typewriter'
    ? <>{typed}<span style={{ borderLeft: '2px solid currentColor', marginLeft: '2px', animation: 'rt-blink 0.7s step-end infinite' }} /></>
    : displayed

  return (
    <>
      {animation === 'typewriter' && (
        <style>{`@keyframes rt-blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
      )}
      <span key={`${idx}-${phase}`} style={getStyle()}>
        {content}
      </span>
    </>
  )
}
