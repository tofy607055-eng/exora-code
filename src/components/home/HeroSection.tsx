'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Play } from 'lucide-react'
import dynamic from 'next/dynamic'
import RotatingText, { AnimationType } from '@/components/RotatingText'

const ParticlesBackground = dynamic(() => import('@/components/ParticlesBackground'), { ssr: false })

const DEFAULT_TEXTS = ['تصنع الفرق', 'تُغيّر اللعبة', 'تبني مستقبلك', 'تتجاوز التوقعات', 'تخدم عملاءك']

export default function HeroSection() {
  const [texts, setTexts]         = useState<string[]>(DEFAULT_TEXTS)
  const [animation, setAnimation] = useState<AnimationType>('fadeUp')
  const [duration, setDuration]   = useState(3)

  useEffect(() => {
    fetch('/api/hero-settings')
      .then(r => r.json())
      .then(d => {
        if (d.texts?.length) setTexts(d.texts)
        if (d.animation)     setAnimation(d.animation as AnimationType)
        if (d.duration)      setDuration(d.duration)
      })
      .catch(() => {})
  }, [])

  return (
    <section style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0A001F 0%, #12002B 40%, #1A003A 100%)',
      display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden',
      paddingTop: '5rem',
    }}>
      <ParticlesBackground />

      {/* Background orbs */}
      <div style={{ position: 'absolute', top: '15%', right: '10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(123,62,255,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '20%', left: '5%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(160,102,255,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '50px 50px', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem', width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '820px' }}>
          {/* Badges */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(123,62,255,0.15)', border: '1px solid rgba(123,62,255,0.3)', borderRadius: '2rem', padding: '0.4rem 1rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A066FF', display: 'block' }} />
              <span style={{ color: '#A066FF', fontSize: '0.875rem', fontWeight: 600, fontFamily: 'Cairo, sans-serif' }}>شركة تطوير رقمي احترافية</span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(78,205,196,0.1)', border: '1px solid rgba(78,205,196,0.3)', borderRadius: '2rem', padding: '0.4rem 1rem' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4ECDC4', display: 'block', animation: 'pulse 2s infinite' }} />
              <span style={{ color: '#4ECDC4', fontSize: '0.875rem', fontWeight: 600, fontFamily: 'Cairo, sans-serif' }}>متاح لمشاريع جديدة ✨</span>
            </div>
          </div>

          {/* Heading with RotatingText */}
          <h1 style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4rem)', fontWeight: 900, lineHeight: 1.25, color: 'white', fontFamily: 'Cairo, sans-serif', marginBottom: '1.5rem' }}>
            نصنع منتجات رقمية{' '}
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #7B3EFF, #C084FC)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              display: 'inline-block', minWidth: '200px',
            }}>
              <RotatingText
                texts={texts}
                animation={animation}
                duration={duration}
                style={{
                  background: 'linear-gradient(135deg, #7B3EFF, #C084FC)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              />
            </span>
          </h1>

          {/* Description */}
          <p style={{ fontSize: '1.15rem', color: '#B8B8C7', lineHeight: 1.9, marginBottom: '2.5rem', fontFamily: 'Cairo, sans-serif', maxWidth: '600px' }}>
            في إكسورا كود نطوّر مواقع وتطبيقات وتجارب رقمية تجمع بين التصميم الذكي، الأداء العالي، والحلول البرمجية القابلة للنمو.
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
            <Link href="/contact" className="btn-primary" style={{ textDecoration: 'none', fontSize: '1rem' }}>
              ابدأ مشروعك <ArrowLeft size={18} />
            </Link>
            <Link href="/portfolio" className="btn-outline" style={{ textDecoration: 'none', fontSize: '1rem' }}>
              <Play size={16} /> تصفح أعمالنا
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
            {[{ num: '120+', label: 'مشروع منجز' }, { num: '95+', label: 'عميل سعيد' }, { num: '5+', label: 'سنوات خبرة' }].map((s, i) => (
              <div key={s.label} style={{ borderRight: i < 2 ? '1px solid rgba(123,62,255,0.2)' : 'none', paddingRight: '2rem' }}>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#A066FF', fontFamily: 'Cairo, sans-serif' }}>{s.num}</div>
                <div style={{ color: '#B8B8C7', fontSize: '0.875rem', fontFamily: 'Cairo, sans-serif' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </section>
  )
}
