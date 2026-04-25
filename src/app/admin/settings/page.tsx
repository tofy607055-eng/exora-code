'use client'
import { useState, useEffect } from 'react'
import { Save } from 'lucide-react'

const FIELDS = [
  { key: 'site_name', label: 'اسم الموقع' },
  { key: 'site_description', label: 'وصف الموقع' },
  { key: 'site_email', label: 'البريد الإلكتروني' },
  { key: 'site_phone', label: 'رقم الجوال' },
  { key: 'site_whatsapp', label: 'رابط واتساب' },
  { key: 'social_twitter', label: 'تويتر/X' },
  { key: 'social_instagram', label: 'إنستغرام' },
  { key: 'social_linkedin', label: 'لينكدإن' },
  { key: 'meta_title', label: 'Meta Title (SEO)' },
  { key: 'meta_description', label: 'Meta Description (SEO)' },
]

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(d => { setSettings(d); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    await fetch('/api/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const inputStyle: React.CSSProperties = { width: '100%', padding: '0.75rem', borderRadius: '0.625rem', background: 'rgba(30,0,64,0.5)', border: '1px solid rgba(123,62,255,0.2)', color: 'white', fontFamily: 'Cairo, sans-serif', boxSizing: 'border-box' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'white', fontWeight: 800, fontSize: '1.5rem' }}>إعدادات الموقع</h1>
        <button onClick={handleSave} disabled={saving} className="btn-primary">
          <Save size={18} /> {saving ? 'جاري الحفظ...' : saved ? 'تم الحفظ ✓' : 'حفظ الإعدادات'}
        </button>
      </div>

      {loading ? <p style={{ color: '#B8B8C7', textAlign: 'center', padding: '3rem' }}>جاري التحميل...</p> : (
        <div className="admin-card" style={{ padding: '2rem', borderRadius: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {FIELDS.map(field => (
              <div key={field.key}>
                <label style={{ display: 'block', color: '#B8B8C7', fontSize: '0.85rem', marginBottom: '0.4rem' }}>{field.label}</label>
                {field.key === 'site_description' || field.key === 'meta_description' ? (
                  <textarea rows={3} style={{ ...inputStyle, resize: 'vertical' }} value={settings[field.key] || ''} onChange={e => setSettings({ ...settings, [field.key]: e.target.value })} />
                ) : (
                  <input style={inputStyle} value={settings[field.key] || ''} onChange={e => setSettings({ ...settings, [field.key]: e.target.value })} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
