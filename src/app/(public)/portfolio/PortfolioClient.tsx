'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ExternalLink, Sparkles, Filter } from 'lucide-react'
import HeroBackground from '@/components/HeroBackground'

const CATEGORIES = ['الكل', 'مواقع', 'تطبيقات', 'UI/UX', 'متاجر', 'هوية بصرية']
const catColors: Record<string, string> = {
  'مواقع': '#7B3EFF', 'تطبيقات': '#FF6B6B', 'UI/UX': '#4ECDC4',
  'متاجر': '#FFD93D', 'هوية بصرية': '#A066FF',
}
const catEmoji: Record<string, string> = {
  'مواقع': '🌐', 'تطبيقات': '📱', 'UI/UX': '🎨', 'متاجر': '🛒', 'هوية بصرية': '✨',
}

type Project = { id: string; title: string; category: string; description: string; slug: string; imageUrl?: string }

export default function PortfolioPageClient() {
  const [projects, setProjects] = useState<Project[]>([])
  const [active, setActive] = useState('الكل')
  const [loading, setLoading] = useState(true)
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/portfolio')
      .then(r => r.json())
      .then(data => { setProjects(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = active === 'الكل' ? projects : projects.filter(p => p.category === active)

  return (
    <>
      {/* ── Hero ── */}
      <section style={{ paddingTop: '7rem', paddingBottom: '5rem', background: 'linear-gradient(135deg, #0A001F 0%, #12002B 100%)', position: 'relative', overflow: 'hidden' }}>
        <HeroBackground />
        <div style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '400px', background: 'radial-gradient(ellipse, rgba(123,62,255,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(123,62,255,0.1)', border: '1px solid rgba(123,62,255,0.25)', borderRadius: '2rem', padding: '0.4rem 1.25rem', marginBottom: '1.5rem' }}>
            <Sparkles size={12} color="#A066FF" />
            <span style={{ color: '#A066FF', fontSize: '0.85rem', fontFamily: 'Cairo, sans-serif', fontWeight: 600 }}>معرض أعمالنا</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, fontFamily: 'Cairo, sans-serif', color: 'white', marginBottom: '1.25rem', lineHeight: 1.2 }}>
            مشاريع{' '}
            <span style={{ background: 'linear-gradient(135deg, #7B3EFF, #A066FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              نفخر بها
            </span>
          </h1>
          <p style={{ color: '#B8B8C7', fontSize: '1.05rem', fontFamily: 'Cairo, sans-serif', maxWidth: '520px', margin: '0 auto', lineHeight: 1.9 }}>
            كل مشروع قصة نجاح. نختار بعناية ما يعكس تنوع خبرتنا وجودة تنفيذنا.
          </p>
        </div>
      </section>

      {/* ── Work ── */}
      <section style={{ padding: '5rem 0', background: 'linear-gradient(180deg, #12002B 0%, #0A001F 100%)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          {/* Filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#9090A8', fontSize: '0.82rem', fontFamily: 'Cairo, sans-serif', marginLeft: '0.5rem' }}>
              <Filter size={13} /> تصفية:
            </div>
            {CATEGORIES.map(cat => {
              const col = catColors[cat] || '#7B3EFF'
              const isActive = active === cat
              return (
                <button key={cat} onClick={() => setActive(cat)} style={{
                  padding: '0.5rem 1.25rem', borderRadius: '2rem', cursor: 'pointer', fontFamily: 'Cairo, sans-serif',
                  fontWeight: 600, fontSize: '0.875rem', transition: 'all 0.25s', border: 'none',
                  background: isActive ? `linear-gradient(135deg, ${col}, ${col}CC)` : `${col}12`,
                  color: isActive ? 'white' : '#B8B8C7',
                  boxShadow: isActive ? `0 4px 16px ${col}30` : 'none',
                  transform: isActive ? 'translateY(-1px)' : 'none',
                }}>
                  {cat !== 'الكل' && <span style={{ marginLeft: '0.3rem' }}>{catEmoji[cat]}</span>}{cat}
                </button>
              )
            })}
          </div>

          {/* Loading */}
          {loading && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} style={{ borderRadius: '1.25rem', overflow: 'hidden', background: 'rgba(20,0,50,0.4)', border: '1px solid rgba(123,62,255,0.1)', height: '360px', animation: 'pulse 2s infinite' }} />
              ))}
            </div>
          )}

          {/* Empty */}
          {!loading && filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '6rem 2rem', color: '#9090A8', fontFamily: 'Cairo, sans-serif' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <p>لا توجد مشاريع في هذا التصنيف حالياً.</p>
            </div>
          )}

          {/* Grid */}
          {!loading && filtered.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
              {filtered.map((project, idx) => {
                const color = catColors[project.category] || '#7B3EFF'
                const emoji = catEmoji[project.category] || '✨'
                const isHov = hovered === project.id
                return (
                  <Link key={project.id} href={`/portfolio/${project.slug}`} style={{ textDecoration: 'none' }}>
                    <article
                      onMouseEnter={() => setHovered(project.id)}
                      onMouseLeave={() => setHovered(null)}
                      style={{
                        borderRadius: '1.25rem', overflow: 'hidden', cursor: 'pointer',
                        background: `linear-gradient(145deg, ${color}10, rgba(10,0,31,0.7))`,
                        border: `1px solid ${isHov ? color + '50' : color + '20'}`,
                        transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        transform: isHov ? 'translateY(-8px)' : 'translateY(0)',
                        boxShadow: isHov ? `0 24px 60px ${color}20` : 'none',
                      }}>
                      {/* Image */}
                      <div style={{ height: '220px', background: `linear-gradient(135deg, ${color}22, ${color}08)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                        {/* BG pattern */}
                        <div style={{ position: 'absolute', inset: 0, opacity: isHov ? 0.08 : 0.04, backgroundImage: `linear-gradient(${color}80 1px, transparent 1px), linear-gradient(90deg, ${color}80 1px, transparent 1px)`, backgroundSize: '30px 30px', transition: 'opacity 0.3s' }} />
                        <span style={{ fontSize: '4rem', filter: isHov ? `drop-shadow(0 0 20px ${color})` : 'none', transition: 'all 0.3s', transform: isHov ? 'scale(1.15)' : 'scale(1)' }}>
                          {emoji}
                        </span>
                        {/* Category badge */}
                        <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: `${color}25`, border: `1px solid ${color}50`, borderRadius: '1rem', padding: '0.25rem 0.75rem', color, fontSize: '0.75rem', fontFamily: 'Cairo, sans-serif', fontWeight: 700, backdropFilter: 'blur(8px)' }}>
                          {project.category}
                        </div>
                        {/* Number */}
                        <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', fontFamily: 'monospace', fontSize: '0.7rem', color: color + '60', fontWeight: 700 }}>
                          #{String(idx + 1).padStart(2, '0')}
                        </div>
                        {/* Hover overlay */}
                        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at center, ${color}20, transparent)`, opacity: isHov ? 1 : 0, transition: 'opacity 0.3s' }} />
                      </div>

                      {/* Content */}
                      <div style={{ padding: '1.75rem' }}>
                        <h3 style={{ color: 'white', fontWeight: 800, fontSize: '1.05rem', fontFamily: 'Cairo, sans-serif', marginBottom: '0.625rem', lineHeight: 1.4 }}>
                          {project.title}
                        </h3>
                        <p style={{ color: '#9090A8', fontSize: '0.875rem', lineHeight: 1.75, fontFamily: 'Cairo, sans-serif', marginBottom: '1.25rem' }}>
                          {project.description?.slice(0, 100)}{project.description?.length > 100 ? '...' : ''}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${color}18`, paddingTop: '1rem' }}>
                          <span style={{ color, fontSize: '0.875rem', fontWeight: 700, fontFamily: 'Cairo, sans-serif', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'gap 0.2s' }}>
                            عرض التفاصيل <ExternalLink size={14} style={{ transform: isHov ? 'translate(2px, -2px)' : 'none', transition: 'transform 0.2s' }} />
                          </span>
                          <div style={{ width: '3rem', height: '2px', background: `linear-gradient(90deg, transparent, ${color})`, borderRadius: '1px', transition: 'width 0.3s', width: isHov ? '4.5rem' : '3rem' as any }} />
                        </div>
                      </div>

                      {/* Bottom accent */}
                      <div style={{ height: '2px', background: `linear-gradient(90deg, transparent, ${color}, transparent)`, opacity: isHov ? 1 : 0.4, transition: 'opacity 0.3s' }} />
                    </article>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
        <style>{`
          @keyframes pulse { 0%,100%{opacity:.4} 50%{opacity:.7} }
          @media(max-width:640px){ section > div > div[style*="340px"]{ grid-template-columns:1fr!important } }
        `}</style>
      </section>
    </>
  )
}
