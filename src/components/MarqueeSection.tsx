'use client'

const clients = [
  {
    name: 'Maven Tech',
    work: 'موقع إلكتروني متكامل',
    type: 'موقع',
    desc: 'بناء هوية رقمية كاملة مع لوحة تحكم',
    color: '#7B3EFF',
    letter: 'M',
  },
  {
    name: 'Sitemark',
    work: 'تطبيق الجوال',
    type: 'تطبيق',
    desc: 'تطبيق iOS و Android لإدارة المواقع',
    color: '#4ECDC4',
    letter: 'S',
  },
  {
    name: 'PreLine Fashion',
    work: 'متجر إلكتروني',
    type: 'متجر',
    desc: 'متجر أزياء متعدد العملات واللغات',
    color: '#FFD93D',
    letter: 'P',
  },
  {
    name: 'Cloudx',
    work: 'لوحة تحكم SaaS',
    type: 'برمجيات',
    desc: 'منصة إدارة سحابية مخصصة بالكامل',
    color: '#FF6B6B',
    letter: 'C',
  },
  {
    name: 'Layers IO',
    work: 'تصميم UI/UX',
    type: 'تصميم',
    desc: 'إعادة تصميم كاملة لمنصة التصميم',
    color: '#A066FF',
    letter: 'L',
  },
  {
    name: 'TechFlow',
    work: 'نظام ERP مخصص',
    type: 'برمجيات',
    desc: 'نظام إدارة متكامل للشركة',
    color: '#6BCB77',
    letter: 'T',
  },
  {
    name: 'NovaBrand',
    work: 'هوية بصرية + موقع',
    type: 'موقع',
    desc: 'هوية كاملة وموقع تعريفي احترافي',
    color: '#FF9F43',
    letter: 'N',
  },
  {
    name: 'ArabDev',
    work: 'منصة تعليمية',
    type: 'تطبيق',
    desc: 'منصة e-learning تفاعلية بالعربية',
    color: '#4ECDC4',
    letter: 'A',
  },
]

const typeBadgeColors: Record<string, string> = {
  'موقع':     '#7B3EFF',
  'تطبيق':    '#4ECDC4',
  'متجر':     '#FFD93D',
  'برمجيات':  '#FF6B6B',
  'تصميم':    '#A066FF',
}

function ClientCard({ client }: { client: typeof clients[0] }) {
  const badgeColor = typeBadgeColors[client.type] || client.color
  return (
    <div style={{
      flexShrink: 0,
      width: '240px',
      padding: '1.25rem',
      borderRadius: '1.125rem',
      background: `linear-gradient(145deg, ${client.color}0D, rgba(10,0,31,0.85))`,
      border: `1px solid ${client.color}28`,
      display: 'flex', flexDirection: 'column', gap: '0.875rem',
      transition: 'transform 0.25s, box-shadow 0.25s',
      cursor: 'default',
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = `0 12px 36px ${client.color}22`
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
      }}
    >
      {/* Header: logo + type */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <div style={{
          width: '3rem', height: '3rem', borderRadius: '0.875rem',
          background: `linear-gradient(135deg, ${client.color}, ${client.color}80)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.25rem', fontWeight: 900, color: 'white',
          fontFamily: 'Cairo, sans-serif',
          boxShadow: `0 4px 16px ${client.color}35`,
        }}>
          {client.letter}
        </div>
        {/* Type badge */}
        <span style={{
          padding: '0.2rem 0.625rem', borderRadius: '1rem',
          background: `${badgeColor}15`, border: `1px solid ${badgeColor}30`,
          color: badgeColor, fontSize: '0.68rem', fontFamily: 'Cairo, sans-serif', fontWeight: 700,
        }}>
          {client.type}
        </span>
      </div>

      {/* Client name */}
      <div>
        <p style={{ color: 'white', fontWeight: 800, fontSize: '0.95rem', fontFamily: 'Cairo, sans-serif', marginBottom: '0.2rem' }}>
          {client.name}
        </p>
        <p style={{ color: client.color, fontSize: '0.78rem', fontFamily: 'Cairo, sans-serif', fontWeight: 600 }}>
          {client.work}
        </p>
      </div>

      {/* Description */}
      <p style={{ color: '#9090A8', fontSize: '0.75rem', fontFamily: 'Cairo, sans-serif', lineHeight: 1.6, margin: 0 }}>
        {client.desc}
      </p>

      {/* Bottom accent */}
      <div style={{ height: '2px', borderRadius: '1px', background: `linear-gradient(90deg, ${client.color}, transparent)` }} />
    </div>
  )
}

export default function MarqueeSection() {
  const doubled = [...clients, ...clients, ...clients]
  return (
    <section style={{
      padding: '4rem 0',
      background: 'linear-gradient(180deg, #0D0022 0%, #0A001F 100%)',
      borderTop:    '1px solid rgba(123,62,255,0.1)',
      borderBottom: '1px solid rgba(123,62,255,0.1)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Fade edges */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(90deg, #0A001F 0%, transparent 8%, transparent 92%, #0A001F 100%)', pointerEvents: 'none' }} />

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem', background: 'rgba(123,62,255,0.1)', border: '1px solid rgba(123,62,255,0.2)', borderRadius: '2rem', padding: '0.35rem 1rem', marginBottom: '0.875rem' }}>
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#A066FF', display: 'block' }} />
          <span style={{ color: '#A066FF', fontSize: '0.8rem', fontFamily: 'Cairo, sans-serif', fontWeight: 600 }}>عملاؤنا يتحدثون عن تجربتهم معنا</span>
        </div>
        <h2 style={{ color: 'white', fontSize: 'clamp(1.3rem, 3vw, 1.875rem)', fontWeight: 900, fontFamily: 'Cairo, sans-serif', lineHeight: 1.2 }}>
          شركاء النجاح{' '}
          <span style={{ background: 'linear-gradient(135deg, #7B3EFF, #A066FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            الذين وثقوا بنا
          </span>
        </h2>
      </div>

      {/* Marquee track */}
      <div style={{ position: 'relative', zIndex: 1, overflow: 'hidden' }}>
        <div style={{
          display: 'flex', gap: '1rem', alignItems: 'stretch',
          animation: 'mq-scroll 22s linear infinite',
          willChange: 'transform',
          paddingBottom: '0.25rem',
        }}>
          {doubled.map((c, i) => <ClientCard key={i} client={c} />)}
        </div>
      </div>

      <style>{`
        @keyframes mq-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  )
}
