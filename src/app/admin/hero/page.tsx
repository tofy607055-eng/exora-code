'use client'
import { useState, useEffect, useRef } from 'react'
import { Plus, Trash2, Save, Check, GripVertical, Play } from 'lucide-react'

const ANIMATIONS: { id: string; label: string; desc: string }[] = [
  { id: 'fadeUp',      label: 'ارتفاع ناعم',     desc: 'يطلع من الأسفل بهدوء' },
  { id: 'fadeDown',    label: 'نزول ناعم',        desc: 'ينزل من الأعلى بهدوء' },
  { id: 'slideRight',  label: 'انزلاق يمين',      desc: 'يدخل من اليمين' },
  { id: 'slideLeft',   label: 'انزلاق يسار',      desc: 'يدخل من اليسار' },
  { id: 'zoomIn',      label: 'تكبير',            desc: 'يظهر بتكبير من المركز' },
  { id: 'flipX',       label: 'قلب أفقي',         desc: 'يقلب على المحور الأفقي' },
  { id: 'glitch',      label: 'جلتش إلكتروني',   desc: 'تأثير تقني متقطع' },
  { id: 'typewriter',  label: 'آلة كاتبة',        desc: 'يكتب حرفاً بحرف' },
  { id: 'wave',        label: 'موجة حروف',        desc: 'كل حرف يتحرك كموجة' },
]

const ANIMATION_CSS: Record<string,string> = {
  fadeUp:     'animation: __anim_fadeUp 0.6s ease forwards',
  fadeDown:   'animation: __anim_fadeDown 0.6s ease forwards',
  slideRight: 'animation: __anim_slideRight 0.5s ease forwards',
  slideLeft:  'animation: __anim_slideLeft 0.5s ease forwards',
  zoomIn:     'animation: __anim_zoomIn 0.5s ease forwards',
  flipX:      'animation: __anim_flipX 0.6s ease forwards',
  glitch:     'animation: __anim_glitch 0.4s steps(2) forwards',
  typewriter: 'animation: __anim_typewriter 1.2s steps(20) forwards',
  wave:       'animation: __anim_wave 0.7s ease forwards',
}

const KEYFRAMES = `
@keyframes __anim_fadeUp    { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
@keyframes __anim_fadeDown  { from{opacity:0;transform:translateY(-24px)} to{opacity:1;transform:translateY(0)} }
@keyframes __anim_slideRight{ from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
@keyframes __anim_slideLeft { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
@keyframes __anim_zoomIn    { from{opacity:0;transform:scale(0.5)} to{opacity:1;transform:scale(1)} }
@keyframes __anim_flipX     { from{opacity:0;transform:rotateX(90deg)} to{opacity:1;transform:rotateX(0)} }
@keyframes __anim_glitch    { 0%{opacity:0;transform:skewX(20deg) scale(1.1)} 50%{opacity:1;transform:skewX(-5deg)} 100%{opacity:1;transform:skewX(0)} }
@keyframes __anim_typewriter{ from{opacity:1;width:0;overflow:hidden} to{opacity:1;width:100%;overflow:hidden} }
@keyframes __anim_wave      { from{opacity:0;transform:translateY(20px) scale(0.8)} to{opacity:1;transform:translateY(0) scale(1)} }
`

export default function HeroAdminPage() {
  const [texts, setTexts] = useState<string[]>([])
  const [animation, setAnimation] = useState('fadeUp')
  const [duration, setDuration] = useState(3)
  const [newText, setNewText] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [previewIdx, setPreviewIdx] = useState(0)
  const [previewKey, setPreviewKey] = useState(0)
  const timerRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    fetch('/api/hero-settings')
      .then(r => r.json())
      .then(d => {
        setTexts(d.texts ?? [])
        setAnimation(d.animation ?? 'fadeUp')
        setDuration(d.duration ?? 3)
      })
  }, [])

  // Auto-rotate preview
  useEffect(() => {
    clearInterval(timerRef.current)
    if (texts.length < 2) return
    timerRef.current = setInterval(() => {
      setPreviewIdx(i => (i + 1) % texts.length)
      setPreviewKey(k => k + 1)
    }, duration * 1000)
    return () => clearInterval(timerRef.current)
  }, [texts, duration, animation])

  const save = async () => {
    setSaving(true)
    await fetch('/api/hero-settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texts, animation, duration }),
    })
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const addText = () => {
    if (!newText.trim()) return
    setTexts([...texts, newText.trim()])
    setNewText('')
  }

  const removeText = (i: number) => setTexts(texts.filter((_, j) => j !== i))
  const updateText = (i: number, v: string) => setTexts(texts.map((t, j) => j === i ? v : t))

  const inp: React.CSSProperties = {
    padding: '0.7rem 1rem', borderRadius: '0.625rem',
    background: 'rgba(30,0,64,0.6)', border: '1px solid rgba(123,62,255,0.25)',
    color: 'white', fontFamily: 'Cairo, sans-serif', fontSize: '0.95rem', outline: 'none',
  }

  return (
    <div>
      <style>{KEYFRAMES}</style>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ color: 'white', fontWeight: 800, fontSize: '1.6rem', fontFamily: 'Cairo, sans-serif' }}>
            🎯 إدارة نصوص الهيرو
          </h1>
          <p style={{ color: '#9090A8', fontSize: '0.875rem', fontFamily: 'Cairo, sans-serif', marginTop: '0.25rem' }}>
            النصوص الدوّارة + نوع الحركة + مدة التبديل — تُحفظ فوراً
          </p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.7rem 1.5rem', borderRadius: '0.75rem', border: 'none', cursor: 'pointer',
            background: saved ? 'linear-gradient(135deg,#4ECDC4,#44B09A)' : 'linear-gradient(135deg,#7B3EFF,#A066FF)',
            color: 'white', fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: '0.9rem',
          }}
        >
          {saved ? <><Check size={16} /> تم الحفظ</> : <><Save size={16} /> {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}</>}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '1.5rem', alignItems: 'start' }}>

        {/* LEFT: Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Texts manager */}
          <div className="admin-card" style={{ padding: '1.75rem', borderRadius: '1.25rem' }}>
            <h2 style={{ color: 'white', fontWeight: 700, fontFamily: 'Cairo, sans-serif', fontSize: '1rem', marginBottom: '1.25rem' }}>
              📝 النصوص الدوّارة
            </h2>

            {/* Existing texts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
              {texts.map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <GripVertical size={16} style={{ color: '#5050A0', flexShrink: 0 }} />
                  <span style={{
                    width: '1.5rem', height: '1.5rem', borderRadius: '50%', flexShrink: 0,
                    background: i === previewIdx ? 'linear-gradient(135deg,#7B3EFF,#A066FF)' : 'rgba(123,62,255,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: i === previewIdx ? 'white' : '#7070A0', fontSize: '0.7rem', fontWeight: 700,
                  }}>{i + 1}</span>
                  <input
                    style={{ ...inp, flex: 1 }}
                    value={t}
                    onChange={e => updateText(i, e.target.value)}
                  />
                  <button
                    onClick={() => removeText(i)}
                    style={{ padding: '0.5rem', borderRadius: '0.5rem', background: 'rgba(255,107,107,0.1)', border: 'none', color: '#FF6B6B', cursor: 'pointer', flexShrink: 0 }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add new text */}
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <input
                style={{ ...inp, flex: 1 }}
                placeholder="أضف نصاً جديداً..."
                value={newText}
                onChange={e => setNewText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addText()}
              />
              <button
                onClick={addText}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.7rem 1rem', borderRadius: '0.625rem', border: 'none', cursor: 'pointer', background: 'rgba(123,62,255,0.2)', color: '#A066FF', fontFamily: 'Cairo, sans-serif', fontWeight: 700, whiteSpace: 'nowrap' }}
              >
                <Plus size={16} /> إضافة
              </button>
            </div>
          </div>

          {/* Animation Picker */}
          <div className="admin-card" style={{ padding: '1.75rem', borderRadius: '1.25rem' }}>
            <h2 style={{ color: 'white', fontWeight: 700, fontFamily: 'Cairo, sans-serif', fontSize: '1rem', marginBottom: '1.25rem' }}>
              ✨ نوع الحركة (الأنيميشن)
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              {ANIMATIONS.map(a => (
                <button
                  key={a.id}
                  onClick={() => { setAnimation(a.id); setPreviewKey(k => k + 1) }}
                  style={{
                    padding: '0.875rem 0.75rem', borderRadius: '0.875rem', cursor: 'pointer', textAlign: 'center',
                    border: `1.5px solid ${animation === a.id ? '#7B3EFF' : 'rgba(123,62,255,0.15)'}`,
                    background: animation === a.id ? 'linear-gradient(135deg,rgba(123,62,255,0.25),rgba(160,102,255,0.1))' : 'rgba(10,0,31,0.4)',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ color: animation === a.id ? '#A066FF' : 'white', fontWeight: 700, fontFamily: 'Cairo, sans-serif', fontSize: '0.85rem', marginBottom: '0.2rem' }}>
                    {a.label}
                  </div>
                  <div style={{ color: '#6060A0', fontFamily: 'Cairo, sans-serif', fontSize: '0.72rem' }}>
                    {a.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div className="admin-card" style={{ padding: '1.75rem', borderRadius: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ color: 'white', fontWeight: 700, fontFamily: 'Cairo, sans-serif', fontSize: '1rem' }}>
                ⏱️ مدة التبديل بين النصوص
              </h2>
              <span style={{ color: '#A066FF', fontWeight: 800, fontFamily: 'Cairo, sans-serif', fontSize: '1.1rem' }}>
                {duration} ثواني
              </span>
            </div>
            <input
              type="range" min={1} max={8} step={0.5}
              value={duration}
              onChange={e => setDuration(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#7B3EFF' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#5050A0', fontFamily: 'Cairo, sans-serif', fontSize: '0.78rem', marginTop: '0.4rem' }}>
              <span>1 ثانية (سريع)</span>
              <span>8 ثواني (بطيء)</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Live Preview */}
        <div style={{ position: 'sticky', top: '5rem' }}>
          <div className="admin-card" style={{ padding: '1.5rem', borderRadius: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ color: 'white', fontWeight: 700, fontFamily: 'Cairo, sans-serif', fontSize: '0.95rem' }}>
                👁️ معاينة مباشرة
              </h2>
              <button
                onClick={() => { setPreviewKey(k => k + 1); setPreviewIdx(i => (i + 1) % Math.max(texts.length, 1)) }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.4rem 0.75rem', borderRadius: '0.5rem', border: '1px solid rgba(123,62,255,0.3)', background: 'rgba(123,62,255,0.1)', color: '#A066FF', cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontSize: '0.8rem' }}
              >
                <Play size={12} /> التالي
              </button>
            </div>

            {/* Mock hero */}
            <div style={{
              borderRadius: '1rem', overflow: 'hidden',
              background: 'linear-gradient(160deg, #0A001F 0%, #12002B 100%)',
              padding: '2rem 1.5rem', textAlign: 'center', minHeight: '180px',
              border: '1px solid rgba(123,62,255,0.2)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
            }}>
              <p style={{ color: '#8888B0', fontFamily: 'Cairo, sans-serif', fontSize: '0.8rem' }}>نبني مستقبلك الرقمي</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 900, fontFamily: 'Cairo, sans-serif', color: 'white' }}>
                <span>نبني</span>
                <span
                  key={`${previewKey}-${animation}`}
                  style={{
                    background: 'linear-gradient(135deg, #7B3EFF, #C084FC)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block',
                    ...(ANIMATION_CSS[animation] ? { animation: ANIMATION_CSS[animation].replace('animation: ', '') } : {}),
                  }}
                >
                  {texts[previewIdx] ?? 'أضف نصاً للمعاينة'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem' }}>
                {texts.map((_, i) => (
                  <div key={i} style={{ width: i === previewIdx ? '1.5rem' : '0.4rem', height: '0.4rem', borderRadius: '1rem', background: i === previewIdx ? '#7B3EFF' : 'rgba(123,62,255,0.3)', transition: 'all 0.3s' }} />
                ))}
              </div>
            </div>

            <div style={{ marginTop: '1rem', padding: '0.75rem', borderRadius: '0.75rem', background: 'rgba(78,205,196,0.05)', border: '1px solid rgba(78,205,196,0.15)' }}>
              <p style={{ color: '#4ECDC4', fontSize: '0.78rem', fontFamily: 'Cairo, sans-serif' }}>
                💡 المعاينة تتبدل تلقائياً كل {duration} ثواني — اضغط "التالي" للمعاينة الفورية
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
