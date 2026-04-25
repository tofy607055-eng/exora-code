import type { Metadata } from 'next'
import Link from 'next/link'
import { Globe, Smartphone, Layers, ShoppingCart, Code2, Zap, ArrowLeft, CheckCircle } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import HeroBackground from '@/components/HeroBackground'
import React from 'react'

export const metadata: Metadata = {
  title: 'خدماتنا | تطوير مواقع وتطبيقات في عدن اليمن | إكسورا كود',
  description: 'نقدم خدمات تطوير مواقع وتطبيقات وتصميم UI/UX وحلول رقمية متكاملة في عدن واليمن.',
  keywords: 'خدمات برمجة اليمن, تطوير مواقع عدن, تطبيقات جوال اليمن, إكسورا كود',
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
  Globe: <Globe size={26} />, Smartphone: <Smartphone size={26} />, Layers: <Layers size={26} />,
  ShoppingCart: <ShoppingCart size={26} />, Code2: <Code2 size={26} />, Zap: <Zap size={26} />,
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
      <section className="section-hero" style={{ background: 'linear-gradient(135deg, #0A001F 0%, #12002B 100%)' }}>
        <HeroBackground />
        <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
          <div className="badge" style={{ marginBottom: '1.5rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A066FF', display: 'block' }} />
            خدماتنا
          </div>
          <h1 className="section-title" style={{ color: 'white', marginBottom: '1.25rem' }}>
            ماذا نقدم <span className="text-gradient">لك؟</span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '520px', margin: '0 auto' }}>
            حلول رقمية متكاملة تلبي احتياجات عملك وتحقق أهدافك بأعلى معايير الجودة
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section" style={{ background: 'linear-gradient(180deg, #12002B 0%, #0A001F 100%)' }}>
        <div className="container">
          <div className="grid-3">
            {list.map((s: any, i: number) => {
              const color = colors[i % colors.length]
              const serviceTags = tags[s.icon || 'Globe'] || []
              return (
                <div key={s.id} className="hover-card" style={{
                  padding: 'clamp(1.25rem, 4vw, 2rem)',
                  borderRadius: '1.25rem',
                  background: `linear-gradient(145deg, ${color}10, rgba(10,0,31,0.6))`,
                  border: `1px solid ${color}25`,
                  position: 'relative', overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}>
                  <div style={{ position: 'absolute', top: '-0.5rem', left: '1rem', fontSize: '3.5rem', fontWeight: 900, color, opacity: 0.05, fontFamily: 'Cairo, sans-serif', lineHeight: 1, pointerEvents: 'none' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div style={{ width: '3rem', height: '3rem', borderRadius: '0.875rem', background: `${color}18`, border: `1px solid ${color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, marginBottom: '1.25rem', boxShadow: `0 4px 20px ${color}25` }}>
                    {iconMap[s.icon || 'Globe'] || <Globe size={26} />}
                  </div>
                  <h2 style={{ color: 'white', fontWeight: 800, fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', fontFamily: 'Cairo, sans-serif', marginBottom: '0.625rem' }}>{s.title}</h2>
                  <p style={{ color: '#B8B8C7', fontSize: '0.875rem', lineHeight: 1.8, fontFamily: 'Cairo, sans-serif', marginBottom: '1.25rem' }}>{s.description}</p>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
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
      </section>

      {/* CTA */}
      <section className="section" style={{ background: '#0A001F' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <div style={{ background: 'linear-gradient(145deg, rgba(123,62,255,0.12), rgba(10,0,31,0.8))', border: '1px solid rgba(123,62,255,0.2)', borderRadius: '1.5rem', padding: 'clamp(1.5rem, 6vw, 3rem)', textAlign: 'center' }}>
            <h2 style={{ color: 'white', fontWeight: 900, fontFamily: 'Cairo, sans-serif', fontSize: 'clamp(1.25rem, 4vw, 1.5rem)', marginBottom: '1rem' }}>
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
