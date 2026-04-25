'use client'
import Link from 'next/link'
import { ArrowLeft, MessageSquare, Calendar } from 'lucide-react'

export default function CTASection() {
  return (
    <section style={{
      padding: '6rem 0',
      background: 'linear-gradient(180deg, #12002B 0%, #0A001F 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* خلفية decorative */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '400px', background: 'radial-gradient(ellipse, rgba(123,62,255,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '10%', right: '5%', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(78,205,196,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(255,107,107,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* خطوط زخرفية */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.02, backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center', position: 'relative' }}>
        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(78,205,196,0.1)', border: '1px solid rgba(78,205,196,0.3)', borderRadius: '2rem', padding: '0.4rem 1.25rem', marginBottom: '2rem' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4ECDC4', display: 'block', animation: 'pulse 2s infinite' }} />
          <span style={{ color: '#4ECDC4', fontSize: '0.85rem', fontFamily: 'Cairo, sans-serif', fontWeight: 600 }}>متاح لمشاريع جديدة ✨</span>
        </div>

        {/* Heading */}
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, fontFamily: 'Cairo, sans-serif', color: 'white', marginBottom: '1.5rem', lineHeight: 1.2 }}>
          مشروعك القادم{' '}
          <span style={{ background: 'linear-gradient(135deg, #7B3EFF, #A066FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            يبدأ هنا
          </span>
        </h2>

        <p style={{ color: '#B8B8C7', fontSize: '1.1rem', lineHeight: 1.9, fontFamily: 'Cairo, sans-serif', maxWidth: '560px', margin: '0 auto 3rem' }}>
          تواصل معنا اليوم للحصول على استشارة مجانية وعرض سعر مخصص لمشروعك. فريقنا جاهز لمساعدتك.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
          <Link href="/contact" className="btn-primary" style={{ textDecoration: 'none', fontSize: '1rem', padding: '0.875rem 2rem' }}>
            <MessageSquare size={18} /> ابدأ مشروعك الآن
          </Link>
          <Link href="/portfolio" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.875rem 2rem', borderRadius: '0.875rem',
            border: '1px solid rgba(123,62,255,0.35)', color: '#A066FF',
            textDecoration: 'none', fontFamily: 'Cairo, sans-serif',
            fontWeight: 600, fontSize: '1rem', transition: 'all 0.3s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(123,62,255,0.1)'
            ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(123,62,255,0.5)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = 'transparent'
            ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(123,62,255,0.35)'
          }}>
            <Calendar size={18} /> شاهد أعمالنا <ArrowLeft size={14} />
          </Link>
        </div>

        {/* Trust badges */}
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { icon: '⚡', label: 'رد خلال 24 ساعة' },
            { icon: '🛡️', label: 'ضمان 30 يوم' },
            { icon: '💬', label: 'استشارة مجانية' },
          ].map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#B8B8C7', fontSize: '0.875rem', fontFamily: 'Cairo, sans-serif' }}>
              <span>{b.icon}</span>
              <span>{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </section>
  )
}
