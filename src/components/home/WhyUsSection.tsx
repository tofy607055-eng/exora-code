'use client'
import { useEffect, useRef } from 'react'
import { Zap, Shield, Users, Clock, Star, CheckCircle } from 'lucide-react'

const reasons = [
  {
    icon: <Zap size={26} />,
    title: 'أداء استثنائي',
    desc: 'مواقع تحقق 95+ على Google PageSpeed Insights',
    color: '#FFD93D',
    bg: 'rgba(255,217,61,0.08)',
    border: 'rgba(255,217,61,0.2)',
    num: '95+',
    numLabel: 'PageSpeed',
  },
  {
    icon: <Shield size={26} />,
    title: 'أمان متكامل',
    desc: 'حماية عالية المستوى لبياناتك وبيانات عملائك',
    color: '#4ECDC4',
    bg: 'rgba(78,205,196,0.08)',
    border: 'rgba(78,205,196,0.2)',
    num: '100%',
    numLabel: 'آمن',
  },
  {
    icon: <Users size={26} />,
    title: 'فريق محترف',
    desc: 'مطورون ومصممون متخصصون بخبرة سنوات',
    color: '#A066FF',
    bg: 'rgba(160,102,255,0.08)',
    border: 'rgba(160,102,255,0.2)',
    num: '10+',
    numLabel: 'خبير',
  },
  {
    icon: <Clock size={26} />,
    title: 'التسليم في الوقت',
    desc: 'نلتزم بالمواعيد المحددة دون تأخير أو مبررات',
    color: '#FF6B6B',
    bg: 'rgba(255,107,107,0.08)',
    border: 'rgba(255,107,107,0.2)',
    num: '0',
    numLabel: 'تأخير',
  },
  {
    icon: <Star size={26} />,
    title: 'جودة لا تُنسى',
    desc: 'تصاميم فاخرة تبقى في ذهن الزائر وتعكس احترافيتك',
    color: '#F7C59F',
    bg: 'rgba(247,197,159,0.08)',
    border: 'rgba(247,197,159,0.2)',
    num: '★★★★★',
    numLabel: 'تقييم',
  },
  {
    icon: <CheckCircle size={26} />,
    title: 'دعم مستمر',
    desc: 'نكون بجانبك قبل وبعد إطلاق مشروعك دائماً',
    color: '#6BCB77',
    bg: 'rgba(107,203,119,0.08)',
    border: 'rgba(107,203,119,0.2)',
    num: '24/7',
    numLabel: 'دعم',
  },
]

const features = [
  'تصاميم عربية احترافية 100%',
  'لوحة تحكم سهلة الاستخدام',
  'متوافق مع جميع الأجهزة',
  'تحسين محركات البحث SEO',
  'ضمان لمدة 30 يوم',
]

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.why-card')
    if (!cards) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            (entry.target as HTMLElement).style.opacity = '1'
            ;(entry.target as HTMLElement).style.transform = 'translateY(0)'
          }, i * 80)
        }
      })
    }, { threshold: 0.1 })
    cards.forEach(c => observer.observe(c))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} style={{
      padding: '3.5rem 0 5rem',
      background: 'linear-gradient(180deg, #0A001F 0%, #12002B 60%, #0A001F 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* خلفية زخرفية */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '800px', height: '800px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(123,62,255,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(123,62,255,0.1)', border: '1px solid rgba(123,62,255,0.25)', borderRadius: '2rem', padding: '0.4rem 1.25rem', marginBottom: '1.5rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A066FF', display: 'block' }} />
            <span style={{ color: '#A066FF', fontSize: '0.85rem', fontFamily: 'Cairo, sans-serif', fontWeight: 600 }}>لماذا نحن؟</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, fontFamily: 'Cairo, sans-serif', color: 'white', marginBottom: '1rem', lineHeight: 1.2 }}>
            لأن النجاح يبدأ بـ{' '}
            <span style={{ background: 'linear-gradient(135deg, #7B3EFF, #A066FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              الشريك الصحيح
            </span>
          </h2>
          <p style={{ color: '#B8B8C7', fontFamily: 'Cairo, sans-serif', fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.8 }}>
            لا نبني مجرد مواقع، نبني تجارب رقمية متكاملة تحقق أهدافك وتنمو معك.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '4rem', alignItems: 'center' }}>
          {/* Left: Features list */}
          <div>
            <div style={{
              background: 'linear-gradient(135deg, rgba(123,62,255,0.12), rgba(160,102,255,0.05))',
              border: '1px solid rgba(123,62,255,0.2)',
              borderRadius: '1.5rem', padding: '2.5rem',
              marginBottom: '2rem',
            }}>
              <h3 style={{ color: 'white', fontWeight: 800, fontSize: '1.25rem', fontFamily: 'Cairo, sans-serif', marginBottom: '1.75rem' }}>
                ما يميزنا عن غيرنا
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', borderRadius: '0.75rem', background: 'rgba(123,62,255,0.06)', border: '1px solid rgba(123,62,255,0.1)', transition: 'all 0.2s' }}>
                    <div style={{ width: '1.75rem', height: '1.75rem', borderRadius: '50%', background: 'linear-gradient(135deg, #7B3EFF, #A066FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CheckCircle size={12} color="white" />
                    </div>
                    <span style={{ color: '#D0D0E0', fontFamily: 'Cairo, sans-serif', fontSize: '0.95rem', fontWeight: 500 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust numbers */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              {[{ n: '120+', l: 'مشروع' }, { n: '95+', l: 'عميل' }, { n: '5+', l: 'سنوات' }].map((s, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '1.25rem 0.75rem', background: 'rgba(123,62,255,0.08)', border: '1px solid rgba(123,62,255,0.15)', borderRadius: '1rem' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 900, fontFamily: 'Cairo, sans-serif', color: '#A066FF' }}>{s.n}</div>
                  <div style={{ color: '#B8B8C7', fontSize: '0.8rem', fontFamily: 'Cairo, sans-serif', marginTop: '0.25rem' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Reason cards - bento grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {reasons.map((r, i) => (
              <div
                key={i}
                className="why-card"
                style={{
                  padding: '1.5rem',
                  borderRadius: '1.25rem',
                  background: r.bg,
                  border: `1px solid ${r.border}`,
                  cursor: 'default',
                  opacity: 0,
                  transform: 'translateY(20px)',
                  transition: 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${r.color}22`
                  ;(e.currentTarget as HTMLElement).style.borderColor = `${r.color}50`
                  ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none'
                  ;(e.currentTarget as HTMLElement).style.borderColor = r.border
                  ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                }}
              >
                {/* Number watermark */}
                <div style={{ position: 'absolute', top: '-0.5rem', left: '1rem', fontSize: '3rem', fontWeight: 900, color: r.color, opacity: 0.07, fontFamily: 'Cairo, sans-serif', pointerEvents: 'none', lineHeight: 1 }}>
                  {r.num}
                </div>
                <div style={{ color: r.color, marginBottom: '0.875rem' }}>{r.icon}</div>
                <h4 style={{ color: 'white', fontWeight: 700, fontFamily: 'Cairo, sans-serif', fontSize: '1rem', marginBottom: '0.4rem' }}>
                  {r.title}
                </h4>
                <p style={{ color: '#B8B8C7', fontSize: '0.82rem', fontFamily: 'Cairo, sans-serif', lineHeight: 1.7 }}>
                  {r.desc}
                </p>
                {/* Bottom badge */}
                <div style={{ marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: `${r.color}15`, borderRadius: '1rem', padding: '0.2rem 0.6rem' }}>
                  <span style={{ color: r.color, fontSize: '0.78rem', fontWeight: 700, fontFamily: 'Cairo, sans-serif' }}>{r.num}</span>
                  <span style={{ color: r.color, fontSize: '0.72rem', opacity: 0.8, fontFamily: 'Cairo, sans-serif' }}>{r.numLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section > div > div:last-child { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
        @media (max-width: 600px) {
          .why-card-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
