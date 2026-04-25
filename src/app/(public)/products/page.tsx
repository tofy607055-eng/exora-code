'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Check, ArrowLeft, ExternalLink, Star, Gift, Zap, ChevronRight } from 'lucide-react'
import HeroBackground from '@/components/HeroBackground'

type Plan = { id: string; name: string; price: string; period: string; features: string; featured: boolean; cta: string }
type Software = { id: string; name: string; description: string; icon: string; color: string; category: string; plans: Plan[] }

const fallback: Software[] = [
  {
    id: 'f1', name: 'نظام إدارة المحتوى', icon: '🖥️', color: '#7B3EFF', category: 'SaaS',
    description: 'منصة متكاملة لإدارة مواقعك وتطبيقاتك بسهولة وكفاءة عالية.',
    plans: [
      { id: 'p1', name: 'مجاني', price: 'مجاني', period: 'مجاني', featured: false, cta: 'ابدأ مجاناً', features: 'موقع واحد\n5 صفحات\nدعم مجتمعي' },
      { id: 'p2', name: 'احترافي', price: '149', period: 'شهر', featured: true, cta: 'اشترك الآن', features: '5 مواقع\nصفحات غير محدودة\nدعم على مدار الساعة\nتحليلات متقدمة' },
      { id: 'p3', name: 'المؤسسات', price: '499', period: 'شهر', featured: false, cta: 'تواصل معنا', features: 'مواقع غير محدودة\nAPI مخصص\nمدير حساب شخصي\nSLA مضمون' },
    ],
  },
  {
    id: 'f2', name: 'تطبيق إدارة المخزون', icon: '📊', color: '#4ECDC4', category: 'ERP',
    description: 'تتبع مخزونك وإدارة طلباتك بدقة وفعالية من أي مكان.',
    plans: [
      { id: 'p4', name: 'الأساسية', price: '99', period: 'شهر', featured: false, cta: 'ابدأ الآن', features: 'حتى 500 منتج\nتقارير أساسية\n3 مستخدمين' },
      { id: 'p5', name: 'الأعمال', price: '299', period: 'شهر', featured: true, cta: 'اشترك الآن', features: 'منتجات غير محدودة\nتقارير متقدمة\n15 مستخدم\nتكامل مع ERP' },
    ],
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Software[]>([])
  const [selected, setSelected] = useState(0)
  const [loading, setLoading] = useState(true)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(d => { setProducts(Array.isArray(d) && d.length ? d : fallback); setLoading(false) })
      .catch(() => { setProducts(fallback); setLoading(false) })
  }, [])

  const current = products[selected]

  const isFree = (price: string) => price === 'مجاني' || price === '0' || price === ''

  return (
    <>
      {/* ── Hero ── */}
      <section style={{ paddingTop: '7rem', paddingBottom: '5rem', background: 'linear-gradient(135deg, #0A001F 0%, #12002B 100%)', position: 'relative', overflow: 'hidden' }}>
        <HeroBackground />
        <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '400px', background: 'radial-gradient(ellipse, rgba(123,62,255,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(123,62,255,0.1)', border: '1px solid rgba(123,62,255,0.25)', borderRadius: '2rem', padding: '0.4rem 1.25rem', marginBottom: '1.5rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A066FF', display: 'block' }} />
            <span style={{ color: '#A066FF', fontSize: '0.85rem', fontFamily: 'Cairo, sans-serif', fontWeight: 600 }}>برامجنا</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, fontFamily: 'Cairo, sans-serif', color: 'white', marginBottom: '1.25rem', lineHeight: 1.2 }}>
            حلول برمجية{' '}
            <span style={{ background: 'linear-gradient(135deg, #7B3EFF, #A066FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>نبنيها لك</span>
          </h1>
          <p style={{ color: '#B8B8C7', fontSize: '1.05rem', fontFamily: 'Cairo, sans-serif', maxWidth: '560px', margin: '0 auto 2.5rem', lineHeight: 1.9 }}>
            برامج مخصصة طوّرناها لنحل مشاكل حقيقية. اختر الباقة المناسبة وابدأ الآن.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary" style={{ textDecoration: 'none' }}>ابدأ مشروعك <ArrowLeft size={16} /></Link>
            <Link href="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', border: '1px solid rgba(123,62,255,0.3)', color: '#A066FF', textDecoration: 'none', fontFamily: 'Cairo, sans-serif', fontWeight: 600, transition: 'all 0.2s' }}>شاهد أعمالنا</Link>
          </div>
        </div>
      </section>

      {/* ── Products ── */}
      {loading ? (
        <section style={{ padding: '6rem 0', background: '#0A001F', textAlign: 'center' }}>
          <div style={{ color: '#B8B8C7', fontFamily: 'Cairo, sans-serif' }}>جاري التحميل...</div>
        </section>
      ) : (
        <section style={{ padding: '5rem 0', background: 'linear-gradient(180deg, #12002B 0%, #0A001F 100%)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem', alignItems: 'start' }}>

              {/* ── Sidebar nav ── */}
              <div ref={barRef} style={{ position: 'sticky', top: '6rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <p style={{ color: '#9090A8', fontSize: '0.78rem', fontFamily: 'Cairo, sans-serif', marginBottom: '0.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>اختر البرنامج</p>
                {products.map((p, i) => (
                  <button key={p.id} onClick={() => setSelected(i)} style={{
                    display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.875rem 1rem', borderRadius: '0.875rem', border: 'none', cursor: 'pointer', textAlign: 'right', fontFamily: 'Cairo, sans-serif', transition: 'all 0.25s',
                    background: selected === i ? `linear-gradient(135deg, ${p.color}20, rgba(10,0,31,0.5))` : 'rgba(20,0,50,0.4)',
                    borderLeft: selected === i ? `3px solid ${p.color}` : '3px solid transparent',
                    boxShadow: selected === i ? `0 4px 20px ${p.color}20` : 'none',
                  }}>
                    <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{p.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: selected === i ? 'white' : '#B8B8C7' }}>{p.name}</div>
                      <div style={{ fontSize: '0.72rem', color: selected === i ? p.color : '#6060A8', fontWeight: 600 }}>{p.category}</div>
                    </div>
                    {selected === i && <ChevronRight size={14} color={p.color} />}
                  </button>
                ))}
              </div>

              {/* ── Main content ── */}
              {current && (
                <div>
                  {/* Product header */}
                  <div style={{ background: `linear-gradient(145deg, ${current.color}12, rgba(10,0,31,0.6))`, border: `1px solid ${current.color}30`, borderRadius: '1.5rem', padding: '2.5rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
                      <div style={{ width: '4.5rem', height: '4.5rem', borderRadius: '1.25rem', background: current.color + '20', border: `1px solid ${current.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', boxShadow: `0 8px 30px ${current.color}25`, flexShrink: 0 }}>
                        {current.icon}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.375rem' }}>
                          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, fontFamily: 'Cairo, sans-serif', color: 'white', margin: 0 }}>{current.name}</h2>
                          <span style={{ padding: '0.2rem 0.75rem', borderRadius: '1rem', background: current.color + '20', border: `1px solid ${current.color}35`, color: current.color, fontSize: '0.75rem', fontWeight: 700, fontFamily: 'Cairo, sans-serif' }}>{current.category}</span>
                        </div>
                        <p style={{ color: '#B8B8C7', fontFamily: 'Cairo, sans-serif', lineHeight: 1.7, margin: 0 }}>{current.description}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem', borderRadius: '0.625rem', background: `linear-gradient(135deg, ${current.color}, ${current.color}CC)`, color: 'white', textDecoration: 'none', fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: '0.9rem' }}>
                        تواصل للتفاصيل <ExternalLink size={14} />
                      </Link>
                    </div>
                  </div>

                  {/* Plans */}
                  <h3 style={{ fontWeight: 800, fontFamily: 'Cairo, sans-serif', color: '#B8B8C7', fontSize: '0.875rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>اختر باقتك</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
                    {current.plans?.length ? current.plans.map(plan => (
                      <div key={plan.id} style={{
                        borderRadius: '1.25rem', padding: '2rem', position: 'relative', transition: 'transform 0.25s, box-shadow 0.25s',
                        background: plan.featured ? `linear-gradient(145deg, ${current.color}20, rgba(10,0,31,0.6))` : 'rgba(20,0,50,0.5)',
                        border: `1px solid ${plan.featured ? current.color + '50' : 'rgba(123,62,255,0.2)'}`,
                        boxShadow: plan.featured ? `0 8px 40px ${current.color}20` : 'none',
                      }} className="hover-card">
                        {plan.featured && (
                          <div style={{ position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)', padding: '0.25rem 1rem', borderRadius: '2rem', background: `linear-gradient(135deg, ${current.color}, ${current.color}CC)`, color: 'white', fontSize: '0.72rem', fontWeight: 800, fontFamily: 'Cairo, sans-serif', whiteSpace: 'nowrap' }}>
                            <Star size={11} style={{ display: 'inline', marginLeft: '0.3rem' }} />الأكثر طلباً
                          </div>
                        )}
                        <div style={{ marginBottom: '1.25rem' }}>
                          <h4 style={{ fontWeight: 800, fontFamily: 'Cairo, sans-serif', fontSize: '1.1rem', marginBottom: '0.75rem', color: 'white' }}>{plan.name}</h4>
                          {isFree(plan.price) ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6BCB77' }}>
                              <Gift size={20} />
                              <span style={{ fontSize: '2rem', fontWeight: 900, fontFamily: 'Cairo, sans-serif' }}>مجاني</span>
                            </div>
                          ) : (
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                              <span style={{ fontSize: '2.25rem', fontWeight: 900, fontFamily: 'Cairo, sans-serif', color: current.color }}>{plan.price}</span>
                              <span style={{ color: '#9090A8', fontFamily: 'Cairo, sans-serif', fontSize: '0.85rem' }}>ريال / {plan.period}</span>
                            </div>
                          )}
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.75rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                          {(plan.features || '').split('\n').filter(Boolean).map((f, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontFamily: 'Cairo, sans-serif', fontSize: '0.875rem', color: '#C8C8D8' }}>
                              <Check size={15} color={current.color} style={{ marginTop: '2px', flexShrink: 0 }} />{f}
                            </li>
                          ))}
                        </ul>
                        <Link href="/contact" style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.875rem', borderRadius: '0.75rem', textDecoration: 'none', fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: '0.9rem', transition: 'all 0.2s',
                          background: plan.featured ? `linear-gradient(135deg, ${current.color}, ${current.color}CC)` : 'transparent',
                          border: plan.featured ? 'none' : `1px solid ${current.color}50`,
                          color: plan.featured ? 'white' : current.color,
                        }}>
                          {plan.cta || 'اشترك الآن'} <Zap size={14} />
                        </Link>
                      </div>
                    )) : (
                      <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: '#6060A8', fontFamily: 'Cairo, sans-serif' }}>
                        لا توجد باقات لهذا البرنامج حالياً. <Link href="/contact" style={{ color: '#A066FF' }}>تواصل معنا</Link> لمعرفة التفاصيل.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <style>{`
            @media(max-width: 900px) {
              section > div > div[style*="280px"] { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </section>
      )}

      {/* ── CTA ── */}
      <section style={{ padding: '5rem 0', background: '#0A001F' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
          <div style={{ background: 'linear-gradient(145deg, rgba(123,62,255,0.12), rgba(10,0,31,0.6))', border: '1px solid rgba(123,62,255,0.2)', borderRadius: '1.5rem', padding: '3.5rem 2rem' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 900, fontFamily: 'Cairo, sans-serif', color: 'white', marginBottom: '1rem', lineHeight: 1.3 }}>
              تريد برنامجاً{' '}
              <span style={{ background: 'linear-gradient(135deg, #7B3EFF, #A066FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>مخصصاً؟</span>
            </h2>
            <p style={{ color: '#B8B8C7', fontFamily: 'Cairo, sans-serif', lineHeight: 1.8, marginBottom: '2rem', maxWidth: '480px', margin: '0 auto 2rem' }}>
              نبني لك برنامجاً من الصفر بالمواصفات التي تحتاجها بالضبط. فريقنا جاهز للاستماع.
            </p>
            <Link href="/contact" className="btn-primary" style={{ textDecoration: 'none' }}>
              ابدأ محادثة <ArrowLeft size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
