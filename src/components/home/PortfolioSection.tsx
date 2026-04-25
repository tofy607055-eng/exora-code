'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { ArrowLeft, ExternalLink } from 'lucide-react'

const fallbackProjects = [
  {
    id: '1', title: 'منصة التعلم الإلكتروني', slug: 'elearning-platform',
    category: 'تطبيق', description: 'منصة تعليمية متكاملة مع دعم القيم والتفاعل.',
    technologies: 'Next.js, React, Prisma', color: '#7B3EFF',
  },
  {
    id: '2', title: 'تطبيق التوصيل السريع', slug: 'delivery-app',
    category: 'تطبيق', description: 'تطبيق جوال متكامل لخدمات التوصيل مع تتبع فوري.',
    technologies: 'Flutter, Firebase, Maps', color: '#FF6B6B',
  },
  {
    id: '3', title: 'لوحة تحكم تحليلية', slug: 'analytics-dashboard',
    category: 'برمجيات', description: 'لوحة تحكم متكاملة لتحليل البيانات في الوقت الفعلي.',
    technologies: 'React, D3.js, Node.js', color: '#4ECDC4',
  },
  {
    id: '4', title: 'متجر الأزياء العربية', slug: 'fashion-store',
    category: 'متجر', description: 'متجر إلكتروني احترافي متعدد اللغات بتجربة تسوق فريدة.',
    technologies: 'Shopify, Liquid, React', color: '#FFD93D',
  },
  {
    id: '5', title: 'نظام إدارة المطاعم', slug: 'restaurant-system',
    category: 'برمجيات', description: 'نظام متكامل لإدارة الطلبات والمخزون والتقارير.',
    technologies: 'Next.js, PostgreSQL, WebSocket', color: '#A066FF',
  },
  {
    id: '6', title: 'تطبيق الصحة والرياضة', slug: 'fitness-app',
    category: 'تطبيق', description: 'تطبيق جوال للمتابعة الصحية مع AI لخطط التمرين.',
    technologies: 'React Native, TensorFlow', color: '#6BCB77',
  },
]

const categoryColor: Record<string, string> = {
  'تطبيق': '#4ECDC4', 'متجر': '#FFD93D', 'برمجيات': '#A066FF', 'موقع': '#7B3EFF',
}

export default function PortfolioSection() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = ref.current?.querySelectorAll('.pf-card')
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
      ;(c as HTMLElement).style.transitionDelay = `${i * 70}ms`
      observer.observe(c)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <section style={{
      padding: '5rem 0',
      background: 'linear-gradient(180deg, #0A001F 0%, #12002B 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: '30%', right: '-5%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(123,62,255,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '20%', left: '-5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(78,205,196,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(123,62,255,0.1)', border: '1px solid rgba(123,62,255,0.25)', borderRadius: '2rem', padding: '0.4rem 1.25rem', marginBottom: '1.5rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A066FF', display: 'block' }} />
            <span style={{ color: '#A066FF', fontSize: '0.85rem', fontFamily: 'Cairo, sans-serif', fontWeight: 600 }}>أعمالنا</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', fontWeight: 900, fontFamily: 'Cairo, sans-serif', color: 'white', marginBottom: '1rem', lineHeight: 1.2 }}>
            مشاريعنا{' '}
            <span style={{ background: 'linear-gradient(135deg, #7B3EFF, #A066FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              المميزة
            </span>
          </h2>
          <p style={{ color: '#B8B8C7', fontFamily: 'Cairo, sans-serif', fontSize: '1rem', maxWidth: '480px', margin: '0 auto', lineHeight: 1.8 }}>
            نماذج من أعمالنا التي أنجزناها وابتكرناها
          </p>
        </div>

        {/* Grid */}
        <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '3rem' }}>
          {fallbackProjects.map((p, i) => {
            const catColor = categoryColor[p.category] || '#A066FF'
            return (
              <Link
                key={p.id}
                href={`/portfolio/${p.slug}`}
                className="pf-card"
                style={{
                  borderRadius: '1.25rem', overflow: 'hidden',
                  background: `linear-gradient(145deg, ${p.color}10, rgba(10,0,31,0.7))`,
                  border: `1px solid ${p.color}25`,
                  textDecoration: 'none', display: 'block',
                  opacity: 0, transform: 'translateY(24px) scale(0.97)',
                  transition: 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s, border-color 0.3s',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.boxShadow = `0 16px 48px ${p.color}25`
                  el.style.borderColor = `${p.color}55`
                  el.style.transform = 'translateY(-6px) scale(1.01)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.boxShadow = 'none'
                  el.style.borderColor = `${p.color}25`
                  el.style.transform = 'translateY(0) scale(1)'
                }}
              >
                {/* Image area */}
                <div style={{
                  height: '180px', position: 'relative', overflow: 'hidden',
                  background: `linear-gradient(135deg, ${p.color}22, ${p.color}08)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {/* Decorative grid */}
                  <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                  {/* Big number */}
                  <div style={{ fontSize: '5rem', fontWeight: 900, color: p.color, opacity: 0.15, fontFamily: 'Cairo, sans-serif', userSelect: 'none' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  {/* Category badge */}
                  <div style={{
                    position: 'absolute', top: '1rem', right: '1rem',
                    padding: '0.25rem 0.75rem', borderRadius: '1rem',
                    background: `${catColor}20`, border: `1px solid ${catColor}40`,
                    color: catColor, fontSize: '0.75rem', fontFamily: 'Cairo, sans-serif', fontWeight: 700,
                  }}>
                    {p.category}
                  </div>
                  {/* External link icon */}
                  <div style={{
                    position: 'absolute', top: '1rem', left: '1rem',
                    width: '2rem', height: '2rem', borderRadius: '0.5rem',
                    background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.4)',
                  }}>
                    <ExternalLink size={13} />
                  </div>
                  {/* Bottom gradient */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50px', background: 'linear-gradient(transparent, rgba(10,0,31,0.8))' }} />
                </div>

                {/* Content */}
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ color: 'white', fontWeight: 800, fontSize: '1rem', fontFamily: 'Cairo, sans-serif', marginBottom: '0.6rem' }}>
                    {p.title}
                  </h3>
                  <p style={{ color: '#B8B8C7', fontSize: '0.82rem', lineHeight: 1.7, fontFamily: 'Cairo, sans-serif', marginBottom: '1.25rem' }}>
                    {p.description}
                  </p>

                  {/* Tech tags */}
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                    {p.technologies.split(',').map(t => (
                      <span key={t} style={{
                        padding: '0.15rem 0.5rem', borderRadius: '0.4rem', fontSize: '0.7rem',
                        background: `${p.color}12`, border: `1px solid ${p.color}25`,
                        color: p.color, fontFamily: 'Cairo, sans-serif', fontWeight: 600,
                      }}>{t.trim()}</span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${p.color}20`, paddingTop: '1rem' }}>
                    <span style={{ color: p.color, fontSize: '0.85rem', fontWeight: 700, fontFamily: 'Cairo, sans-serif', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      عرض المشروع <ArrowLeft size={14} />
                    </span>
                    <div style={{ width: '2rem', height: '2px', background: `linear-gradient(90deg, transparent, ${p.color})`, borderRadius: '1px' }} />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link href="/portfolio" style={{
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
            عرض جميع الأعمال <ArrowLeft size={16} />
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          section > div > div[style*="grid-template-columns: repeat(3, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          section > div > div[style*="grid-template-columns: repeat(3, 1fr)"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
