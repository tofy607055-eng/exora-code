'use client'
import { useEffect, useRef } from 'react'
import { Star, Quote } from 'lucide-react'

const fallback = [
  { id: '1', clientName: 'أحمد الشمري', projectType: 'موقع إلكتروني', rating: 5, text: 'تجربة احترافية من البداية للنهاية. الفريق التزم بالوقت وقدّم جودة فوق التوقعات.', color: '#7B3EFF' },
  { id: '2', clientName: 'سارة المطيري', projectType: 'تطبيق جوال', rating: 5, text: 'التطبيق تجاوز توقعاتي تماماً. التصميم جميل والأداء رائع. أنصح الجميع بإكسورا كود.', color: '#4ECDC4' },
  { id: '3', clientName: 'خالد العتيبي', projectType: 'متجر إلكتروني', rating: 5, text: 'زادت مبيعاتنا 40% بعد إطلاق المتجر الجديد. شكراً لفريق إكسورا على الاحترافية.', color: '#FFD93D' },
]

function SpotlightCard({ t }: { t: typeof fallback[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    const glow = glowRef.current
    if (!card || !glow) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    glow.style.background = `radial-gradient(300px circle at ${x}px ${y}px, ${t.color}22 0%, transparent 70%)`
    glow.style.opacity = '1'
  }

  const handleMouseLeave = () => {
    if (glowRef.current) glowRef.current.style.opacity = '0'
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        borderRadius: '1.25rem', padding: '2rem',
        background: `linear-gradient(145deg, ${t.color}10, rgba(10,0,31,0.6))`,
        border: `1px solid ${t.color}25`,
        position: 'relative', overflow: 'hidden',
        cursor: 'default',
        transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${t.color}45`
        e.currentTarget.style.transform = 'translateY(-5px)'
        e.currentTarget.style.boxShadow = `0 16px 40px ${t.color}20`
      }}
      // onMouseLeave already bound above, add style reset too
    >
      {/* Spotlight glow layer */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          opacity: 0, transition: 'opacity 0.15s ease',
          zIndex: 0, borderRadius: '1.25rem',
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Quote watermark */}
        <div style={{ position: 'absolute', top: '-0.5rem', left: '0.5rem', color: t.color, opacity: 0.08, pointerEvents: 'none' }}>
          <Quote size={52} />
        </div>

        {/* Stars */}
        <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1.25rem' }}>
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} size={16} fill={t.color} color={t.color} />
          ))}
        </div>

        {/* Text */}
        <p style={{ color: '#D0D0E0', fontSize: '0.9rem', lineHeight: 1.8, fontFamily: 'Cairo, sans-serif', marginBottom: '1.75rem' }}>
          "{t.text}"
        </p>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', borderTop: `1px solid ${t.color}20`, paddingTop: '1.25rem' }}>
          <div style={{
            width: '2.75rem', height: '2.75rem', borderRadius: '50%',
            background: `linear-gradient(135deg, ${t.color}, ${t.color}80)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 800, fontFamily: 'Cairo, sans-serif', fontSize: '1rem', flexShrink: 0,
            boxShadow: `0 4px 16px ${t.color}35`,
          }}>
            {t.clientName.charAt(0)}
          </div>
          <div>
            <div style={{ color: 'white', fontWeight: 700, fontSize: '0.9rem', fontFamily: 'Cairo, sans-serif' }}>{t.clientName}</div>
            <div style={{ color: t.color, fontSize: '0.78rem', fontFamily: 'Cairo, sans-serif', opacity: 0.85 }}>{t.projectType}</div>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div style={{ position: 'absolute', bottom: 0, left: '20%', right: '20%', height: '2px', background: `linear-gradient(90deg, transparent, ${t.color}, transparent)`, zIndex: 1 }} />
    </div>
  )
}

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = ref.current?.querySelectorAll<HTMLElement>('.test-wrap')
    if (!cards) return
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          ;(entry.target as HTMLElement).style.opacity = '1'
          ;(entry.target as HTMLElement).style.transform = 'translateY(0)'
        }
      })
    }, { threshold: 0.1 })
    cards.forEach((c, i) => {
      c.style.transitionDelay = `${i * 100}ms`
      observer.observe(c)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <section style={{ padding: '5rem 0', background: 'linear-gradient(180deg, #0A001F 0%, #12002B 100%)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(123,62,255,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(123,62,255,0.1)', border: '1px solid rgba(123,62,255,0.25)', borderRadius: '2rem', padding: '0.4rem 1.25rem', marginBottom: '1.5rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A066FF', display: 'block' }} />
            <span style={{ color: '#A066FF', fontSize: '0.85rem', fontFamily: 'Cairo, sans-serif', fontWeight: 600 }}>آراء عملائنا</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', fontWeight: 900, fontFamily: 'Cairo, sans-serif', color: 'white', marginBottom: '1rem', lineHeight: 1.2 }}>
            ماذا يقول <span style={{ background: 'linear-gradient(135deg, #7B3EFF, #A066FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>عملاؤنا؟</span>
          </h2>
          <p style={{ color: '#B8B8C7', fontFamily: 'Cairo, sans-serif', fontSize: '1rem', maxWidth: '440px', margin: '0 auto' }}>
            ثقتهم هي أكبر شهادة على جودة عملنا
          </p>
        </div>

        {/* Cards */}
        <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
          {fallback.map((t) => (
            <div key={t.id} className="test-wrap" style={{ opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.5s ease, transform 0.5s ease' }}>
              <SpotlightCard t={t} />
            </div>
          ))}
        </div>
      </div>

      <style>{`@media(max-width:900px){section>div>div[style*="repeat(3, 1fr)"]{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
