import type { Metadata } from 'next'
import Link from 'next/link'
import { Globe, Smartphone, Layers, ShoppingCart, Code2, Zap, ArrowLeft, CheckCircle } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import HeroBackground from '@/components/HeroBackground'

export const metadata: Metadata = {
  title: 'خدماتنا | تطوير مواقع وتطبيقات في عدن اليمن | إكسورا كود',
  description: 'نقدم خدمات تطوير مواقع وتطبيقات وتصميم UI/UX وحلول رقمية متكاملة في عدن واليمن. إكسورا كود شركتك التقنية اليمنية المتخصصة.',
  keywords: 'خدمات برمجة اليمن, تطوير مواقع عدن, تطبيقات جوال اليمن, تصميم مواقع عدن, إكسورا كود, اكسورا, برمجة يمنية, متجر إلكتروني عدن',
  openGraph: { title: 'خدماتنا | إكسورا كود — عدن، اليمن', locale: 'ar_YE' },
}

const colors = ['#7B3EFF', '#FF6B6B', '#4ECDC4', '#FFD93D', '#A066FF', '#6BCB77']
const tags: Record<string, string[]> = {
  'Globe': ['Next.js', 'React', 'TypeScript'],
  'Smartphone': ['Flutter', 'React Native', 'iOS/Android'],
  'Layers': ['Figma', 'Prototyping', 'UX Research'],
  'ShoppingCart': ['Shopify', 'WooCommerce', 'Salla'],
  'Code2': ['APIs', 'SaaS', 'Automation'],
  'Zap': ['SEO', 'Core Web Vitals', 'Analytics'],
}
const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe size={28} />, Smartphone: <Smartphone size={28} />, Layers: <Layers size={28} />,
  ShoppingCart: <ShoppingCart size={28} />, Code2: <Code2 size={28} />, Zap: <Zap size={28} />,
}

async function getServices() {
  try { return await prisma.service.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }) }
  catch { return [] }
}

export default async function ServicesPage() {
  const raw = await getServices()
  const list = raw.length ? raw : [
    { id: '1', title: 'تطوير المواقع الإلكترونية', description: 'نبني مواقع احترافية وسريعة بأحدث التقنيات مع تصميم يعكس هويتك ويحقق أهدافك.', icon: 'Globe' },
    { id: '2', title: 'تطوير تطبيقات الجوال', description: 'نطور تطبيقات iOS و Android بتجربة مستخدم سلسة وأداء عالي يلبي احتياجات عملائك.', icon: 'Smartphone' },
    { id: '3', title: 'تصميم UI/UX', description: 'نصمم واجهات مستخدم جذابة وتجارب رقمية متميزة تجمع بين الجمال والوظيفة.', icon: 'Layers' },
    { id: '4', title: 'تطوير المتاجر الإلكترونية', description: 'نبني متاجر إلكترونية قوية وآمنة مع تجربة تسوق مثالية تزيد مبيعاتك.', icon: 'ShoppingCart' },
    { id: '5', title: 'حلول رقمية مخصصة', description: 'نطور برمجيات مخصصة تماماً لاحتياجات شركتك وتساعدها على النمو والتوسع.', icon: 'Code2' },
    { id: '6', title: 'تحسين الأداء وتجربة المستخدم', description: 'نحلل ونحسّن أداء مشاريعك الرقمية لضمان سرعة استثنائية وتجربة لا تُنسى.', icon: 'Zap' },
  ]

  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: '7rem', paddingBottom: '4rem', background: 'linear-gradient(135deg, #0A001F 0%, #12002B 100%)', position: 'relative', overflow: 'hidden' }}>
        <HeroBackground />
        <div style={{ position: 'absolute', top: '20%', right: '8%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(123,62,255,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.02, backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '50px 50px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(123,62,255,0.1)', border: '1px solid rgba(123,62,255,0.25)', borderRadius: '2rem', padding: '0.4rem 1.25rem', marginBottom: '1.5rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A066FF', display: 'block' }} />
            <span style={{ color: '#A066FF', fontSize: '0.85rem', fontFamily: 'Cairo, sans-serif', fontWeight: 600 }}>خدماتنا</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, fontFamily: 'Cairo, sans-serif', color: 'white', marginBottom: '1.25rem', lineHeight: 1.2 }}>
            ماذا نقدم <span style={{ background: 'linear-gradient(135deg, #7B3EFF, #A066FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>لك؟</span>
          </h1>
          <p style={{ color: '#B8B8C7', fontSize: '1.05rem', fontFamily: 'Cairo, sans-serif', maxWidth: '500px', margin: '0 auto', lineHeight: 1.8 }}>
            حلول رقمية متكاملة تلبي احتياجات عملك وتحقق أهدافك بأعلى معايير الجودة
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ padding: '5rem 0', background: 'linear-gradient(180deg, #12002B 0%, #0A001F 100%)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {list.map((s: any, i: number) => {
              const color = colors[i % colors.length]
              const serviceTags = tags[s.icon || 'Globe'] || []
              return (
                <div key={s.id} className="hover-card" style={{
                  padding: '2rem', borderRadius: '1.25rem',
                  background: `linear-gradient(145deg, ${color}10, rgba(10,0,31,0.6))`,
                  border: `1px solid ${color}25`, position: 'relative', overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}>
                  <div style={{ position: 'absolute', top: '-0.5rem', left: '1rem', fontSize: '4rem', fontWeight: 900, color, opacity: 0.05, fontFamily: 'Cairo, sans-serif', lineHeight: 1, pointerEvents: 'none' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '1rem', background: `${color}18`, border: `1px solid ${color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, marginBottom: '1.5rem', boxShadow: `0 4px 20px ${color}25` }}>
                    {iconMap[s.icon || 'Globe'] || <Globe size={28} />}
                  </div>
                  <h2 style={{ color: 'white', fontWeight: 800, fontSize: '1.05rem', fontFamily: 'Cairo, sans-serif', marginBottom: '0.75rem' }}>{s.title}</h2>
                  <p style={{ color: '#B8B8C7', fontSize: '0.875rem', lineHeight: 1.8, fontFamily: 'Cairo, sans-serif', marginBottom: '1.5rem' }}>{s.description}</p>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                    {serviceTags.map(t => (
                      <span key={t} style={{ padding: '0.2rem 0.6rem', borderRadius: '0.5rem', background: `${color}12`, border: `1px solid ${color}25`, color, fontSize: '0.72rem', fontFamily: 'Cairo, sans-serif', fontWeight: 600 }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ borderTop: `1px solid ${color}20`, paddingTop: '1rem' }}>
                    <Link href="/contact" style={{ color, textDecoration: 'none', fontSize: '0.875rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'Cairo, sans-serif' }}>
                      اطلب الخدمة <ArrowLeft size={14} />
                    </Link>
                  </div>
                  <div style={{ position: 'absolute', bottom: 0, left: '20%', right: '20%', height: '2px', background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
                </div>
              )
            })}
          </div>
        </div>
        <style>{`
          @media(max-width:1024px){section>div>div[style*="repeat(3, 1fr)"]{grid-template-columns:repeat(2,1fr)!important}}
          @media(max-width:600px){section>div>div[style*="repeat(3, 1fr)"]{grid-template-columns:1fr!important}}
          .hover-card:hover { transform: translateY(-6px) !important; box-shadow: 0 16px 48px rgba(123,62,255,0.2) !important; }
        `}</style>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 0', background: '#0A001F' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
          <div style={{ background: 'linear-gradient(145deg, rgba(123,62,255,0.12), rgba(10,0,31,0.8))', border: '1px solid rgba(123,62,255,0.2)', borderRadius: '1.5rem', padding: '3rem' }}>
            <h2 style={{ color: 'white', fontWeight: 900, fontFamily: 'Cairo, sans-serif', fontSize: '1.5rem', marginBottom: '1rem' }}>
              لا تجد ما تبحث عنه؟
            </h2>
            <p style={{ color: '#B8B8C7', fontFamily: 'Cairo, sans-serif', marginBottom: '2rem', lineHeight: 1.8 }}>
              نقدم حلولاً مخصصة لأي متطلب. تواصل معنا وسنجد لك الحل المثالي.
            </p>
            <Link href="/contact" className="btn-primary" style={{ textDecoration: 'none' }}>
              تواصل معنا الآن <ArrowLeft size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
