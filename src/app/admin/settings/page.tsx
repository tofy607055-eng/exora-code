'use client'
import { useState, useEffect } from 'react'
import { Save, Lock, Mail, Eye, EyeOff, ShieldCheck, KeyRound } from 'lucide-react'

const FIELDS = [
  { key: 'site_name', label: 'اسم الموقع' },
  { key: 'site_description', label: 'وصف الموقع' },
  { key: 'site_email', label: 'البريد الإلكتروني للتواصل' },
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

  // Credentials state
  const [currentEmail, setCurrentEmail] = useState('')
  const [isStoredInDB, setIsStoredInDB] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPw, setShowCurrentPw] = useState(false)
  const [showNewPw, setShowNewPw] = useState(false)
  const [credSaving, setCredSaving] = useState(false)
  const [credMsg, setCredMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(d => { setSettings(d); setLoading(false) })
      .catch(() => setLoading(false))

    fetch('/api/admin-credentials')
      .then(r => r.json())
      .then(d => {
        setCurrentEmail(d.email || '')
        setIsStoredInDB(d.isStoredInDB)
      })
      .catch(() => {})
  }, [])

  const handleSave = async () => {
    setSaving(true)
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleCredentialsSave = async () => {
    setCredMsg(null)

    if (!currentPassword) {
      setCredMsg({ type: 'error', text: 'يجب إدخال كلمة السر الحالية للتحقق' })
      return
    }
    if (!newEmail && !newPassword) {
      setCredMsg({ type: 'error', text: 'أدخل البريد الجديد أو كلمة السر الجديدة أو كليهما' })
      return
    }
    if (newPassword && newPassword !== confirmPassword) {
      setCredMsg({ type: 'error', text: 'كلمة السر الجديدة وتأكيدها غير متطابقتين' })
      return
    }
    if (newPassword && newPassword.length < 6) {
      setCredMsg({ type: 'error', text: 'كلمة السر يجب أن تكون 6 أحرف على الأقل' })
      return
    }

    setCredSaving(true)
    try {
      const res = await fetch('/api/admin-credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newEmail: newEmail || undefined, newPassword: newPassword || undefined }),
      })
      const data = await res.json()
      if (!res.ok) {
        setCredMsg({ type: 'error', text: data.error || 'حدث خطأ' })
      } else {
        setCredMsg({ type: 'success', text: 'تم تحديث بيانات الدخول بنجاح ✓' })
        if (newEmail) setCurrentEmail(newEmail)
        setIsStoredInDB(true)
        setCurrentPassword('')
        setNewEmail('')
        setNewPassword('')
        setConfirmPassword('')
      }
    } catch {
      setCredMsg({ type: 'error', text: 'فشل الاتصال بالخادم' })
    }
    setCredSaving(false)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '0.625rem',
    background: 'rgba(30,0,64,0.5)',
    border: '1px solid rgba(123,62,255,0.2)',
    color: 'white',
    fontFamily: 'Cairo, sans-serif',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  const credInputWrap: React.CSSProperties = { position: 'relative', width: '100%' }

  return (
    <div>
      {/* ── Site Settings ─────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'white', fontWeight: 800, fontSize: '1.5rem' }}>إعدادات الموقع</h1>
        <button onClick={handleSave} disabled={saving} className="btn-primary">
          <Save size={18} /> {saving ? 'جاري الحفظ...' : saved ? 'تم الحفظ ✓' : 'حفظ الإعدادات'}
        </button>
      </div>

      {loading ? (
        <p style={{ color: '#B8B8C7', textAlign: 'center', padding: '3rem' }}>جاري التحميل...</p>
      ) : (
        <div className="admin-card" style={{ padding: '2rem', borderRadius: '1rem', marginBottom: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {FIELDS.map(field => (
              <div key={field.key}>
                <label style={{ display: 'block', color: '#B8B8C7', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                  {field.label}
                </label>
                {field.key === 'site_description' || field.key === 'meta_description' ? (
                  <textarea
                    rows={3}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    value={settings[field.key] || ''}
                    onChange={e => setSettings({ ...settings, [field.key]: e.target.value })}
                  />
                ) : (
                  <input
                    style={inputStyle}
                    value={settings[field.key] || ''}
                    onChange={e => setSettings({ ...settings, [field.key]: e.target.value })}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Login Credentials ─────────────────────────── */}
      <div className="admin-card" style={{ padding: '2rem', borderRadius: '1rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <div style={{ width: 40, height: 40, borderRadius: '0.625rem', background: 'rgba(123,62,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={20} color="#7B3EFF" />
          </div>
          <div>
            <h2 style={{ color: 'white', fontWeight: 700, fontSize: '1.15rem', margin: 0 }}>بيانات تسجيل الدخول</h2>
            <p style={{ color: '#B8B8C7', fontSize: '0.8rem', margin: 0 }}>تغيير البريد الإلكتروني أو كلمة السر للوحة التحكم</p>
          </div>
        </div>

        {/* Storage badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          padding: '0.3rem 0.75rem', borderRadius: '2rem',
          background: isStoredInDB ? 'rgba(34,197,94,0.1)' : 'rgba(234,179,8,0.1)',
          border: `1px solid ${isStoredInDB ? 'rgba(34,197,94,0.3)' : 'rgba(234,179,8,0.3)'}`,
          color: isStoredInDB ? '#4ade80' : '#facc15',
          fontSize: '0.78rem', marginBottom: '1.5rem', marginTop: '1rem',
        }}>
          <KeyRound size={13} />
          {isStoredInDB
            ? 'البيانات محفوظة في قاعدة البيانات'
            : 'البيانات محفوظة في متغيرات البيئة (بعد التغيير ستُحفظ في قاعدة البيانات)'}
        </div>

        {/* Current email display */}
        <div style={{ marginBottom: '1.5rem', padding: '0.875rem 1rem', borderRadius: '0.625rem', background: 'rgba(123,62,255,0.08)', border: '1px solid rgba(123,62,255,0.15)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Mail size={16} color="#7B3EFF" />
          <span style={{ color: '#B8B8C7', fontSize: '0.85rem' }}>البريد الحالي:</span>
          <span style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem', direction: 'ltr' }}>{currentEmail || '...'}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {/* Current Password (required to verify) */}
          <div>
            <label style={{ display: 'block', color: '#B8B8C7', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
              <Lock size={13} style={{ display: 'inline', marginLeft: '4px' }} />
              كلمة السر الحالية <span style={{ color: '#f87171' }}>*</span>
            </label>
            <div style={credInputWrap}>
              <input
                type={showCurrentPw ? 'text' : 'password'}
                style={{ ...inputStyle, paddingLeft: '2.75rem' }}
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                placeholder="أدخل كلمة السر الحالية للتحقق"
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPw(p => !p)}
                style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#B8B8C7', padding: 0 }}
              >
                {showCurrentPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Spacer */}
          <div style={{ display: 'contents' }} />

          {/* New Email */}
          <div>
            <label style={{ display: 'block', color: '#B8B8C7', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
              <Mail size={13} style={{ display: 'inline', marginLeft: '4px' }} />
              البريد الإلكتروني الجديد (اختياري)
            </label>
            <input
              type="email"
              style={inputStyle}
              value={newEmail}
              onChange={e => setNewEmail(e.target.value)}
              placeholder="اتركه فارغاً إن لم تريد التغيير"
              dir="ltr"
            />
          </div>

          {/* New Password */}
          <div>
            <label style={{ display: 'block', color: '#B8B8C7', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
              <Lock size={13} style={{ display: 'inline', marginLeft: '4px' }} />
              كلمة السر الجديدة (اختياري)
            </label>
            <div style={credInputWrap}>
              <input
                type={showNewPw ? 'text' : 'password'}
                style={{ ...inputStyle, paddingLeft: '2.75rem' }}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="6 أحرف على الأقل"
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => setShowNewPw(p => !p)}
                style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#B8B8C7', padding: 0 }}
              >
                {showNewPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label style={{ display: 'block', color: '#B8B8C7', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
              <Lock size={13} style={{ display: 'inline', marginLeft: '4px' }} />
              تأكيد كلمة السر الجديدة
            </label>
            <input
              type="password"
              style={inputStyle}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="أعد كتابة كلمة السر الجديدة"
              dir="ltr"
            />
          </div>
        </div>

        {/* Status message */}
        {credMsg && (
          <div style={{
            marginTop: '1rem',
            padding: '0.75rem 1rem',
            borderRadius: '0.625rem',
            background: credMsg.type === 'success' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
            border: `1px solid ${credMsg.type === 'success' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
            color: credMsg.type === 'success' ? '#4ade80' : '#f87171',
            fontSize: '0.875rem',
          }}>
            {credMsg.text}
          </div>
        )}

        <button
          onClick={handleCredentialsSave}
          disabled={credSaving}
          className="btn-primary"
          style={{ marginTop: '1.5rem' }}
        >
          <ShieldCheck size={18} />
          {credSaving ? 'جاري الحفظ...' : 'حفظ بيانات الدخول'}
        </button>
      </div>
    </div>
  )
}
