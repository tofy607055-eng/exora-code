import type { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Check, ArrowLeft, Zap, Shield, Star, Rocket, MessageCircle } from 'lucide-react'
import HeroBackground from '@/components/HeroBackground'

export const metadata: Metadata = {
  title: 'الأسعار والباقات | إكسورا كود',
  description: 'باقات مرنة تناسب جميع الميزانيات والاحتياجات لمشاريع التطوير الرقمي.',
}

async function getPricing() {
  try { return await prisma.pricing.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }) }
  catch { return [] }
}

const DEFAULTS = [
  {
    id: '1', name: 'باقة البداية', price: 'من 3,000', currency: 'ريال',
    subtitle: 'للمشاريع الناشئة',
    features: JSON.stringify([
      'موقع تعريفي احترافي',
      'تصميم متجاوب لكل الشاشات',
      'لوحة تحكم بسيطة',
      'حتى 5 صفحات',
      'تحسين SEO أساسي',
      'نموذج تواصل',
      'دعم فني لمدة شهر',
    ]),
    duration: '2-3 أسابيع', featured: false,
  },
  {
    id: '2', name: 'باقة الأعمال', price: 'من 8,000', currency: 'ريال',
    subtitle: 'للشركات المتنامية',
    features: JSON.stringify([
      'موقع متكامل بلا حدود للصفحات',
      'تصميم UI/UX احترافي',
      'لوحة تحكم متقدمة',
      'نظام مدونة كامل',
      'تكامل مع السوشيال ميديا',
      'تحسين SEO متقدم',
      'تقارير وإحصائيات',
      'دعم فني 3 أشهر',
      'شهادة SSL مجانية',
    ]),
    duration: '4-5 أسابيع', featured: true,
  },
  {
    id: '3', name: 'باقة الشركات', price: 'حسب المتطلبات', currency: '',
    subtitle: 'للحلول المخصصة',
    features: JSON.stringify([
      'حل رقمي مخصص بالكامل',
      'تطوير تطبيق جوال',
      'لوحة تحكم متقدمة',
      'تكامل مع APIs خارجية',
      'نظام دفع إلكتروني',
      'أمان متقدم',
      'أداء عالٍ وسرعة قصوى',
      'تدريب الفريق',
      'دعم فني سنوي',
      'تحديثات دورية',
    ]),
    duration: 'حسب المتطلبات', featured: false,
  },
]

const PALETTES = [
  { color: '#4ECDC4', glow: 'rgba(78,205,196,0.15)', icon: <Shield size={22} /> },
  { color: '#7B3EFF', glow: 'rgba(123,62,255,0.2)',  icon: <Star size={22} /> },
  { color: '#FFD93D', glow: 'rgba(255,217,61,0.15)', icon: <Zap size={22} /> },
]

export default async function PricingPage() {
  const raw = await getPricing()
  const list: any[] = raw.length ? raw : DEFAULTS

  return (
    <>
      {/* ── Hero ── */}
      <section style={{ paddingTop: '8rem', paddingBottom: '5rem', background: 'linear-gradient(160deg, #0A001F 0%, #12002B 60%, #1A003A 100%)', position: 'relative', overflow: 'hidden' }}>
        <HeroBackground />
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '500px', background: 'radial-gradient(ellipse, rgba(123,62,255,0.1) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(123,62,255,0.1)', border: '1px solid rgba(123,62,255,0.3)', borderRadius: '2rem', padding: '0.45rem 1.25rem', marginBottom: '1.75rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A066FF', display: 'block', animation: 'pulse 2s infinite' }} />
            <span style={{ color: '#A066FF', fontSize: '0.85rem', fontFamily: 'Cairo, sans-serif', fontWeight: 600 }}>باقاتنا وأسعارنا</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.25rem, 5.5vw, 3.75rem)', fontWeight: 900, fontFamily: 'Cairo, sans-serif', color: 'white', lineHeight: 1.15, marginBottom: '1.25rem' }}>
            استثمر في{' '}
            <span style={{ background: 'linear-gradient(135deg, #7B3EFF, #C084FC)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              مشروعك الرقمي
            </span>
          </h1>
          <p style={{ color: '#B8B8C7', fontSize: '1.1rem', fontFamily: 'Cairo, sans-serif', lineHeight: 1.9, maxWidth: '560px', margin: '0 auto 1rem' }}>
            نقدم باقات مصممة لكل مرحلة من مراحل نمو أعمالك — شفافة، مرنة، وبلا مفاجآت
          </p>
          <p style={{ color: '#9090A8', fontSize: '0.875rem', fontFamily: 'Cairo, sans-serif' }}>
            جميع الباقات تشمل دعماً فنياً ومراجعة مجانية قبل الإطلاق
          </p>
        </div>
      </section>

      {/* ── Pricing Cards ── */}
      <section style={{ padding: '0 0 6rem', background: 'linear-gradient(180deg, #12002B 0%, #0A001F 100%)', position: 'relative' }}>
        {/* Cards container — featured card pulled up to overlap hero */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            alignItems: 'end',
            marginTop: '-3rem',
          }}>
            {list.map((pkg: any, i: number) => {
              const features: string[] = (() => { try { return JSON.parse(pkg.features) } catch { return [] } })()
              const { color, glow, icon } = PALETTES[i % PALETTES.length]
              const subtitle = pkg.subtitle || ''
              const currency = pkg.currency ?? 'ريال'

              return (
                <div key={pkg.id} className="hover-card" style={{
                  borderRadius: '1.5rem',
                  overflow: 'hidden',
                  background: pkg.featured
                    ? `linear-gradient(160deg, ${color}20 0%, rgba(18,0,43,0.95) 60%)`
                    : `linear-gradient(160deg, ${color}0C 0%, rgba(10,0,31,0.85) 70%)`,
                  border: `1px solid ${pkg.featured ? color + '50' : color + '28'}`,
                  boxShadow: pkg.featured ? `0 0 60px ${glow}, 0 20px 60px rgba(0,0,0,0.4)` : `0 8px 32px rgba(0,0,0,0.3)`,
                  transform: pkg.featured ? 'translateY(-28px)' : 'none',
                  position: 'relative',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}>
                  {/* Featured badge */}
                  {pkg.featured && (
                    <div style={{ background: `linear-gradient(135deg, ${color}, ${color}99)`, padding: '0.6rem 1rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                      <Rocket size={14} color="white" />
                      <span style={{ color: 'white', fontSize: '0.8rem', fontFamily: 'Cairo, sans-serif', fontWeight: 800, letterSpacing: '0.03em' }}>الأكثر طلباً</span>
                    </div>
                  )}

                  {/* Card body */}
                  <div style={{ padding: '2rem 2rem 1.5rem' }}>
                    {/* Icon + name */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1.5rem' }}>
                      <div style={{ width: '3.25rem', height: '3.25rem', borderRadius: '1rem', background: `${color}15`, border: `1px solid ${color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, flexShrink: 0, boxShadow: `0 4px 20px ${color}20` }}>
                        {icon}
                      </div>
                      <div>
                        <h2 style={{ color: 'white', fontWeight: 900, fontSize: '1.15rem', fontFamily: 'Cairo, sans-serif', lineHeight: 1.2 }}>{pkg.name}</h2>
                        {subtitle && <p style={{ color, fontSize: '0.78rem', fontFamily: 'Cairo, sans-serif', fontWeight: 600, marginTop: '0.2rem' }}>{subtitle}</p>}
                      </div>
                    </div>

                    {/* Price */}
                    <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                      <span style={{ fontSize: pkg.price.includes('حسب') ? '1.4rem' : '2rem', fontWeight: 900, fontFamily: 'Cairo, sans-serif', background: `linear-gradient(135deg, white 30%, ${color})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>
                        {pkg.price}
                      </span>
                      {currency && <span style={{ color: '#9090A8', fontSize: '0.85rem', fontFamily: 'Cairo, sans-serif' }}>{currency}</span>}
                    </div>

                    {pkg.duration && (
                      <p style={{ color: '#7070A0', fontSize: '0.8rem', fontFamily: 'Cairo, sans-serif', marginBottom: '1.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <span style={{ color }}>⏱</span> {pkg.duration}
                      </p>
                    )}

                    {/* Divider */}
                    <div style={{ height: '1px', background: `linear-gradient(90deg, transparent, ${color}40, transparent)`, marginBottom: '1.5rem' }} />

                    {/* Features */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                      {features.map((f: string) => (
                        <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ width: '1.25rem', height: '1.25rem', borderRadius: '50%', background: `${color}15`, border: `1px solid ${color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Check size={10} color={color} />
                          </div>
                          <span style={{ color: '#C8C8D8', fontFamily: 'Cairo, sans-serif', fontSize: '0.875rem', lineHeight: 1.5 }}>{f}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <Link href="/contact" style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                      padding: '0.9rem 1.5rem', borderRadius: '0.875rem', textDecoration: 'none',
                      fontFamily: 'Cairo, sans-serif', fontWeight: 800, fontSize: '0.95rem',
                      background: pkg.featured ? `linear-gradient(135deg, ${color}, ${color}bb)` : 'transparent',
                      border: pkg.featured ? 'none' : `1.5px solid ${color}50`,
                      color: pkg.featured ? 'white' : color,
                      transition: 'all 0.2s',
                      boxShadow: pkg.featured ? `0 8px 24px ${color}40` : 'none',
                    }}>
                      {pkg.featured ? <Rocket size={15} /> : <ArrowLeft size={15} />}
                      {pkg.price.includes('حسب') ? 'تواصل معنا' : 'اطلب الباقة'}
                    </Link>
                  </div>

                  {/* Bottom glow line */}
                  <div style={{ height: '3px', background: `linear-gradient(90deg, transparent 10%, ${color} 50%, transparent 90%)` }} />
                </div>
              )
            })}
          </div>

          {/* Trust bar */}
          <div style={{ marginTop: '4rem', padding: '2rem 2.5rem', borderRadius: '1.25rem', background: 'rgba(123,62,255,0.06)', border: '1px solid rgba(123,62,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
            {[
              { icon: '✅', text: 'ضمان جودة الكود' },
              { icon: '🔒', text: 'أمان واحتراف' },
              { icon: '🚀', text: 'تسليم في الموعد' },
              { icon: '📞', text: 'دعم مستمر' },
              { icon: '♻️', text: 'تعديلات مجانية' },
            ].map(item => (
              <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                <span style={{ color: '#B8B8C7', fontFamily: 'Cairo, sans-serif', fontSize: '0.875rem', fontWeight: 600 }}>{item.text}</span>
              </div>
            ))}
          </div>

          {/* CTA note */}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <p style={{ color: '#7070A0', fontFamily: 'Cairo, sans-serif', fontSize: '0.9rem' }}>
              لديك متطلبات خاصة؟{' '}
              <Link href="/contact" style={{ color: '#A066FF', textDecoration: 'none', fontWeight: 700 }}>تواصل معنا</Link>
              {' '}وسنصمم لك باقة مخصصة — أو{' '}
              <Link href="/faq" style={{ color: '#A066FF', textDecoration: 'none', fontWeight: 700 }}>تصفح الأسئلة الشائعة</Link>
            </p>
          </div>
        </div>

        <style>{`
          @media (max-width: 1024px) {
            .pricing-grid { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 640px) {
            .pricing-grid { grid-template-columns: 1fr !important; }
            .pricing-featured { transform: none !important; }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
          .hover-card:hover { transform: translateY(-6px) !important; box-shadow: 0 24px 60px rgba(123,62,255,0.25) !important; }
        `}</style>
      </section>

      {/* ── Compare / FAQ CTA ── */}
      <section style={{ padding: '5rem 0', background: '#0A001F' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
          <div style={{ background: 'linear-gradient(145deg, rgba(123,62,255,0.1), rgba(10,0,31,0.9))', border: '1px solid rgba(123,62,255,0.2)', borderRadius: '1.75rem', padding: '3.5rem 3rem' }}>
            <div style={{ width: '4rem', height: '4rem', borderRadius: '1.25rem', background: 'rgba(123,62,255,0.15)', border: '1px solid rgba(123,62,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#A066FF' }}>
              <MessageCircle size={26} />
            </div>
            <h2 style={{ color: 'white', fontWeight: 900, fontFamily: 'Cairo, sans-serif', fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem', lineHeight: 1.3 }}>
              مش متأكد من الباقة المناسبة؟
            </h2>
            <p style={{ color: '#B8B8C7', fontFamily: 'Cairo, sans-serif', lineHeight: 1.9, marginBottom: '2.5rem', maxWidth: '480px', margin: '0 auto 2.5rem' }}>
              تحدث معنا مجاناً لمدة 30 دقيقة — نحلل احتياجاتك ونقترح الحل الأمثل لمشروعك بلا أي التزام.
            </p>
            <Link href="/contact" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              احجز استشارة مجانية <ArrowLeft size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
