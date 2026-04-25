'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { Globe, Smartphone, Layers, ShoppingCart, Code2, Zap, ArrowLeft } from 'lucide-react'

const services = [
  {
    id: '1',
    icon: <Globe size={28} />,
    title: 'تطوير المواقع الإلكترونية',
    desc: 'نبني مواقع احترافية وسريعة بأحدث التقنيات مع تصميم استثنائي يعكس هويتك ويحقق أهدافك.',
    color: '#7B3EFF',
    tags: ['Next.js', 'React', 'TypeScript'],
    stat: '120+ موقع',
  },
  {
    id: '2',
    icon: <Smartphone size={28} />,
    title: 'تطوير تطبيقات الجوال',
    desc: 'نطور تطبيقات iOS و Android بتجربة مستخدم سلسة وأداء عالي يلبي احتياجات عملائك.',
    color: '#FF6B6B',
    tags: ['Flutter', 'React Native', 'iOS/Android'],
    stat: '50+ تطبيق',
  },
  {
    id: '3',
    icon: <Layers size={28} />,
    title: 'تصميم UI/UX',
    desc: 'نصمم واجهات مستخدم جذابة وتجارب رقمية متميزة تجمع بين الجمال والوظيفة والسهولة.',
    color: '#4ECDC4',
    tags: ['Figma', 'Prototyping', 'User Research'],
    stat: '200+ تصميم',
  },
  {
    id: '4',
    icon: <ShoppingCart size={28} />,
    title: 'تطوير المتاجر الإلكترونية',
    desc: 'نبني متاجر إلكترونية قوية وآمنة مع تجربة تسوق مثالية تزيد مبيعاتك وتكسب ثقة عملائك.',
    color: '#FFD93D',
    tags: ['Shopify', 'WooCommerce', 'Salla'],
    stat: '30+ متجر',
  },
  {
    id: '5',
    icon: <Code2 size={28} />,
    title: 'حلول رقمية مخصصة',
    desc: 'نطور برمجيات مخصصة تماماً لاحتياجات شركتك وتساعدها على النمو والتوسع بكفاءة.',
    color: '#A066FF',
    tags: ['APIs', 'SaaS', 'Automation'],
    stat: '40+ حل',
  },
  {
    id: '6',
    icon: <Zap size={28} />,
    title: 'تحسين الأداء وتجربة المستخدم',
    desc: 'نحلل ونحسّن أداء مشاريعك الرقمية لضمان سرعة استثنائية وتجربة مستخدم لا تُنسى.',
    color: '#6BCB77',
    tags: ['SEO', 'Core Web Vitals', 'Analytics'],
    stat: '95+ نقاط',
  },
]

const colorMap: Record<string, { glow: string; bg: string; border: string }> = {
  '#7B3EFF': { glow: 'rgba(123,62,255,0.25)', bg: 'rgba(123,62,255,0.08)', border: 'rgba(123,62,255,0.25)' },
  '#FF6B6B': { glow: 'rgba(255,107,107,0.25)', bg: 'rgba(255,107,107,0.06)', border: 'rgba(255,107,107,0.2)' },
  '#4ECDC4': { glow: 'rgba(78,205,196,0.25)', bg: 'rgba(78,205,196,0.06)', border: 'rgba(78,205,196,0.2)' },
  '#FFD93D': { glow: 'rgba(255,217,61,0.25)', bg: 'rgba(255,217,61,0.06)', border: 'rgba(255,217,61,0.2)' },
  '#A066FF': { glow: 'rgba(160,102,255,0.25)', bg: 'rgba(160,102,255,0.08)', border: 'rgba(160,102,255,0.25)' },
  '#6BCB77': { glow: 'rgba(107,203,119,0.25)', bg: 'rgba(107,203,119,0.06)', border: 'rgba(107,203,119,0.2)' },
}

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = ref.current?.querySelectorAll('.srv-card')
    if (!cards) return
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          ;(entry.target as HTMLElement).style.opacity = '1'
          ;(entry.target as HTMLElement).style.transform = 'translateY(0) scale(1)'
        }
      })
    }, { threshold: 0.1 })
    cards.forEach((c, i) => {
      ;(c as HTMLElement).style.transitionDelay = `${i * 80}ms`
      observer.observe(c)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <section style={{
      padding: '5rem 0 3.5rem',
      background: 'linear-gradient(180deg, #12002B 0%, #0A001F 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* خلفية زخرفية */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(123,62,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(78,205,196,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(123,62,255,0.1)', border: '1px solid rgba(123,62,255,0.25)', borderRadius: '2rem', padding: '0.4rem 1.25rem', marginBottom: '1.5rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A066FF', display: 'block' }} />
            <span style={{ color: '#A066FF', fontSize: '0.85rem', fontFamily: 'Cairo, sans-serif', fontWeight: 600 }}>خدماتنا</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', fontWeight: 900, fontFamily: 'Cairo, sans-serif', color: 'white', marginBottom: '1rem', lineHeight: 1.2 }}>
            ماذا نقدم{' '}
            <span style={{ background: 'linear-gradient(135deg, #7B3EFF, #A066FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              لك؟
            </span>
          </h2>
          <p style={{ color: '#B8B8C7', fontFamily: 'Cairo, sans-serif', fontSize: '1.05rem', maxWidth: '480px', margin: '0 auto', lineHeight: 1.8 }}>
            حلول رقمية متكاملة تلبي احتياجات عملك وتحقق أهدافك
          </p>
        </div>

        {/* Grid */}
        <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
          {services.map((s, i) => {
            const c = colorMap[s.color]
            return (
              <div
                key={s.id}
                className="srv-card"
                style={{
                  borderRadius: '1.25rem', padding: '2rem',
                  background: `linear-gradient(145deg, ${c.bg}, rgba(10,0,31,0.5))`,
                  border: `1px solid ${c.border}`,
                  cursor: 'default', position: 'relative', overflow: 'hidden',
                  opacity: 0, transform: 'translateY(24px) scale(0.97)',
                  transition: 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s, border-color 0.3s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.boxShadow = `0 16px 48px ${c.glow}`
                  el.style.borderColor = s.color + '55'
                  el.style.transform = 'translateY(-6px) scale(1.01)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.boxShadow = 'none'
                  el.style.borderColor = c.border
                  el.style.transform = 'translateY(0) scale(1)'
                }}
              >
                {/* رقم خافت */}
                <div style={{ position: 'absolute', top: '0.75rem', left: '1.25rem', fontSize: '4rem', fontWeight: 900, color: s.color, opacity: 0.05, fontFamily: 'Cairo, sans-serif', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* أيقونة */}
                <div style={{
                  width: '3.5rem', height: '3.5rem', borderRadius: '1rem',
                  background: `${s.color}18`, border: `1px solid ${s.color}35`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: s.color, marginBottom: '1.5rem',
                  boxShadow: `0 4px 20px ${s.color}25`,
                }}>
                  {s.icon}
                </div>

                {/* عنوان */}
                <h3 style={{ color: 'white', fontWeight: 800, fontSize: '1.05rem', fontFamily: 'Cairo, sans-serif', marginBottom: '0.75rem' }}>
                  {s.title}
                </h3>

                {/* وصف */}
                <p style={{ color: '#B8B8C7', fontSize: '0.875rem', lineHeight: 1.8, fontFamily: 'Cairo, sans-serif', marginBottom: '1.5rem' }}>
                  {s.desc}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                  {s.tags.map(tag => (
                    <span key={tag} style={{
                      padding: '0.2rem 0.6rem', borderRadius: '0.5rem',
                      background: `${s.color}12`, border: `1px solid ${s.color}25`,
                      color: s.color, fontSize: '0.72rem', fontFamily: 'Cairo, sans-serif', fontWeight: 600,
                    }}>{tag}</span>
                  ))}
                </div>

                {/* Footer */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${c.border}`, paddingTop: '1rem' }}>
                  <Link href="/contact" style={{
                    color: s.color, textDecoration: 'none', fontSize: '0.875rem',
                    fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem',
                    fontFamily: 'Cairo, sans-serif',
                  }}>
                    اطلب الخدمة <ArrowLeft size={14} />
                  </Link>
                  <span style={{ color: s.color, fontSize: '0.78rem', fontFamily: 'Cairo, sans-serif', fontWeight: 600, opacity: 0.7 }}>
                    {s.stat}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <Link href="/services" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.875rem 2rem', borderRadius: '0.875rem',
            border: '1px solid rgba(123,62,255,0.35)',
            color: '#A066FF', textDecoration: 'none', fontFamily: 'Cairo, sans-serif',
            fontWeight: 600, fontSize: '0.95rem', transition: 'all 0.3s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(123,62,255,0.1)'
            ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(123,62,255,0.5)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = 'transparent'
            ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(123,62,255,0.35)'
          }}>
            عرض جميع الخدمات <ArrowLeft size={16} />
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          section > div > div[style*="grid-template-columns: repeat(3"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          section > div > div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
