'use client'
import { useEffect, useRef, useState } from 'react'
import { Code2, Users, Star, Briefcase } from 'lucide-react'

const stats = [
  { num: 120, suffix: '+', label: 'مشروع منجز', icon: <Briefcase size={22} />, color: '#7B3EFF', desc: 'موقع وتطبيق ومنصة' },
  { num: 95,  suffix: '+', label: 'عميل سعيد',  icon: <Users size={22} />,    color: '#4ECDC4', desc: 'في السوق العربي' },
  { num: 5,   suffix: '+', label: 'سنوات خبرة', icon: <Star size={22} />,     color: '#FFD93D', desc: 'في التطوير الرقمي' },
  { num: 30,  suffix: '+', label: 'حل رقمي',    icon: <Code2 size={22} />,    color: '#FF6B6B', desc: 'برمجيات مخصصة' },
]

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 1800
        const steps = 60
        const step = target / steps
        let current = 0
        const timer = setInterval(() => {
          current = Math.min(current + step, target)
          setVal(Math.floor(current))
          if (current >= target) clearInterval(timer)
        }, duration / steps)
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{val}{suffix}</span>
}

export default function StatsSection() {
  return (
    <section style={{
      padding: '5rem 0',
      background: 'linear-gradient(180deg, #12002B 0%, #0A001F 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* خلفية */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(123,62,255,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(123,62,255,0.1)', border: '1px solid rgba(123,62,255,0.25)', borderRadius: '2rem', padding: '0.4rem 1.25rem', marginBottom: '1rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A066FF', display: 'block' }} />
            <span style={{ color: '#A066FF', fontSize: '0.85rem', fontFamily: 'Cairo, sans-serif', fontWeight: 600 }}>أرقامنا تتحدث</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', fontWeight: 900, fontFamily: 'Cairo, sans-serif', color: 'white', lineHeight: 1.2 }}>
            إنجازات{' '}
            <span style={{ background: 'linear-gradient(135deg, #7B3EFF, #A066FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              نفخر بها
            </span>
          </h2>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
          {stats.map((s, i) => (
            <div
              key={i}
              className="hover-card"
              style={{
                '--spotlight-color': `${s.color}20`,
                borderRadius: '1.25rem', padding: '2rem 1.5rem',
                background: `linear-gradient(145deg, ${s.color}10, rgba(10,0,31,0.6))`,
                border: `1px solid ${s.color}25`,
                textAlign: 'center', position: 'relative', overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'default',
              } as React.CSSProperties}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = `0 16px 40px ${s.color}25`
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}
            >
              {/* Watermark رقم */}
              <div style={{ position: 'absolute', bottom: '-0.5rem', left: '0.5rem', fontSize: '5rem', fontWeight: 900, color: s.color, opacity: 0.05, fontFamily: 'Cairo, sans-serif', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>
                {s.num}
              </div>

              {/* Icon */}
              <div style={{
                width: '3.5rem', height: '3.5rem', borderRadius: '1rem',
                background: `${s.color}18`, border: `1px solid ${s.color}35`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: s.color, margin: '0 auto 1.5rem',
                boxShadow: `0 4px 20px ${s.color}25`,
              }}>
                {s.icon}
              </div>

              {/* Number */}
              <div style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, fontFamily: 'Cairo, sans-serif', color: 'white', marginBottom: '0.5rem', lineHeight: 1 }}>
                <span style={{ background: `linear-gradient(135deg, white, ${s.color})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  <Counter target={s.num} suffix={s.suffix} />
                </span>
              </div>

              {/* Label */}
              <div style={{ color: 'white', fontWeight: 700, fontSize: '1rem', fontFamily: 'Cairo, sans-serif', marginBottom: '0.4rem' }}>
                {s.label}
              </div>

              {/* Desc */}
              <div style={{ color: `${s.color}99`, fontSize: '0.78rem', fontFamily: 'Cairo, sans-serif' }}>
                {s.desc}
              </div>

              {/* Bottom accent line */}
              <div style={{ position: 'absolute', bottom: 0, left: '20%', right: '20%', height: '2px', background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`, borderRadius: '1px' }} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section > div > div[style*="grid-template-columns: repeat(4"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 500px) {
          section > div > div[style*="grid-template-columns: repeat(4"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
