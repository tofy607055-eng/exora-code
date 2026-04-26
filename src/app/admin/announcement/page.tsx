'use client'
import { useState, useEffect } from 'react'
import { Save, Megaphone, Link as LinkIcon, ToggleLeft, ToggleRight, Eye, EyeOff } from 'lucide-react'

const PRESETS = [
  '🔴 نقبل مشاريع جديدة لشهر مايو — احجز موعدك الآن',
  '🚀 خصم 20% على تطوير المواقع هذا الشهر — تواصل معنا',
  '🎉 أطلقنا خدمة جديدة: تطوير تطبيقات الجوال — اكتشف التفاصيل',
  '⚡ نقبل مشاريع محدودة — لا تفوّت فرصة بدء مشروعك معنا',
  '💼 هل تريد موقعاً احترافياً؟ استشارة مجانية 30 دقيقة',
]

export default function AnnouncementAdminPage() {
  const [text, setText]     = useState('')
  const [link, setLink]     = useState('/contact')
  const [active, setActive] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving]   = useState(false)
  const [msg, setMsg]         = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    fetch('/api/settings', { credentials: 'include' })
      .then(r => r.json())
      .then(d => {
        setText(d.announcement_text || '')
        setLink(d.announcement_link || '/contact')
        setActive(d.announcement_active === 'true')
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const save = async () => {
    setSaving(true); setMsg(null)
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          announcement_text:   text,
          announcement_link:   link,
          announcement_active: String(active),
        }),
      })
      if (res.ok) setMsg({ type: 'success', text: 'تم حفظ الإعلان بنجاح ✓' })
      else         setMsg({ type: 'error',   text: 'فشل الحفظ، حاول مرة أخرى' })
    } catch {
      setMsg({ type: 'error', text: 'خطأ في الاتصال' })
    }
    setSaving(false)
    setTimeout(() => setMsg(null), 4000)
  }

  const inp: React.CSSProperties = {
    width: '100%', padding: '0.875rem 1.1rem', borderRadius: '0.75rem',
    background: 'rgba(10,0,31,0.5)', border: '1.5px solid rgba(123,62,255,0.2)',
    color: 'white', fontFamily: 'Cairo, sans-serif', fontSize: '0.95rem',
    outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
  }

  if (loading) return <p style={{ color: '#B8B8C7', padding: '3rem', textAlign: 'center' }}>جاري التحميل...</p>

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ color: 'white', fontWeight: 800, fontSize: '1.5rem', fontFamily: 'Cairo, sans-serif' }}>
            شريط الإعلان
          </h1>
          <p style={{ color: '#8080A0', fontFamily: 'Cairo, sans-serif', fontSize: '0.875rem', marginTop: '0.3rem' }}>
            يظهر في أعلى الموقع لجميع الزوار
          </p>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary">
          <Save size={18} />
          {saving ? 'جاري الحفظ...' : 'حفظ'}
        </button>
      </div>

      {/* Preview */}
      <div style={{
        marginBottom: '2rem', borderRadius: '1rem', overflow: 'hidden',
        border: '1px solid rgba(123,62,255,0.2)', opacity: active ? 1 : 0.4,
        transition: 'opacity 0.3s',
      }}>
        <p style={{ color: '#8080A0', fontFamily: 'Cairo, sans-serif', fontSize: '0.78rem', padding: '0.5rem 1rem', background: 'rgba(123,62,255,0.05)', borderBottom: '1px solid rgba(123,62,255,0.1)' }}>
          معاينة
        </p>
        <div style={{
          background: 'linear-gradient(90deg, #4a00b4, #7B3EFF, #9b30ff, #4a00b4)',
          padding: '0.6rem 1.5rem', display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: '0.75rem',
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff4d4d', flexShrink: 0 }} />
          <span style={{ color: 'white', fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: '0.875rem' }}>
            {text || 'اكتب نص الإعلان أدناه...'}
          </span>
        </div>
      </div>

      <div className="admin-card" style={{ padding: '2rem', borderRadius: '1.25rem' }}>

        {/* Toggle on/off */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1rem 1.25rem', borderRadius: '0.875rem',
          background: active ? 'rgba(123,62,255,0.08)' : 'rgba(255,255,255,0.03)',
          border: `1px solid ${active ? 'rgba(123,62,255,0.3)' : 'rgba(255,255,255,0.08)'}`,
          marginBottom: '1.75rem', cursor: 'pointer', transition: 'all 0.25s',
        }} onClick={() => setActive(p => !p)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: 38, height: 38, borderRadius: '0.625rem', flexShrink: 0,
              background: active ? 'rgba(123,62,255,0.2)' : 'rgba(255,255,255,0.05)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: active ? '#A066FF' : '#6060A0',
            }}>
              {active ? <Eye size={18} /> : <EyeOff size={18} />}
            </div>
            <div>
              <p style={{ color: 'white', fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: '0.95rem' }}>
                {active ? 'الشريط مفعّل — يظهر للزوار' : 'الشريط مُعطَّل — لا يظهر للزوار'}
              </p>
              <p style={{ color: '#8080A0', fontFamily: 'Cairo, sans-serif', fontSize: '0.78rem', marginTop: '0.15rem' }}>
                انقر للتبديل
              </p>
            </div>
          </div>
          {active
            ? <ToggleRight size={32} color="#A066FF" />
            : <ToggleLeft  size={32} color="#6060A0" />}
        </div>

        {/* Text input */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#C8C8D8', fontFamily: 'Cairo, sans-serif', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.6rem' }}>
            <Megaphone size={14} /> نص الإعلان
          </label>
          <input
            style={inp}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="مثال: 🔴 نقبل مشاريع جديدة لشهر مايو — احجز موعدك الآن"
            maxLength={150}
          />
          <p style={{ color: text.length > 120 ? '#FF6B6B' : '#6060A0', fontSize: '0.75rem', fontFamily: 'Cairo, sans-serif', marginTop: '0.35rem', textAlign: 'left' }}>
            {text.length}/150
          </p>
        </div>

        {/* Link input */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#C8C8D8', fontFamily: 'Cairo, sans-serif', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.6rem' }}>
            <LinkIcon size={14} /> رابط الإعلان (الوجهة عند النقر)
          </label>
          <input
            style={inp}
            value={link}
            onChange={e => setLink(e.target.value)}
            placeholder="/contact"
            dir="ltr"
          />
        </div>

        {/* Presets */}
        <div>
          <p style={{ color: '#8080A0', fontFamily: 'Cairo, sans-serif', fontSize: '0.82rem', marginBottom: '0.875rem', fontWeight: 600 }}>
            نصوص جاهزة — انقر للاستخدام:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {PRESETS.map((p, i) => (
              <button key={i} onClick={() => setText(p)} style={{
                textAlign: 'right', padding: '0.75rem 1rem', borderRadius: '0.625rem',
                background: text === p ? 'rgba(123,62,255,0.15)' : 'rgba(123,62,255,0.05)',
                border: `1px solid ${text === p ? 'rgba(123,62,255,0.4)' : 'rgba(123,62,255,0.12)'}`,
                color: text === p ? '#A066FF' : '#9898B8',
                fontFamily: 'Cairo, sans-serif', fontSize: '0.875rem', cursor: 'pointer',
                transition: 'all 0.2s',
              }}>
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Status message */}
        {msg && (
          <div style={{
            marginTop: '1.5rem', padding: '0.875rem 1.1rem', borderRadius: '0.75rem',
            background: msg.type === 'success' ? 'rgba(34,197,94,0.08)' : 'rgba(255,107,107,0.08)',
            border: `1px solid ${msg.type === 'success' ? 'rgba(34,197,94,0.25)' : 'rgba(255,107,107,0.25)'}`,
            color: msg.type === 'success' ? '#4ade80' : '#FF6B6B',
            fontFamily: 'Cairo, sans-serif', fontSize: '0.875rem',
          }}>
            {msg.text}
          </div>
        )}
      </div>
    </div>
  )
}
