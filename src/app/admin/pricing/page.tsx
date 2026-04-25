'use client'
import { useState, useEffect } from 'react'
import { Plus, Trash2, Check, X, Pencil, ChevronDown, ChevronUp, Star, GripVertical } from 'lucide-react'

type Feature = { text: string; included: boolean }
type Plan = {
  id?: string
  name: string
  price: string
  duration?: string
  features: Feature[]
  featured: boolean
  visible: boolean
  order: number
}

const FEATURE_TEMPLATES = [
  'تصميم احترافي',
  'موقع متجاوب مع الجوال',
  'لوحة تحكم',
  'دعم فني',
  'تحسين SEO',
  'نموذج تواصل',
  'شهادة SSL',
  'استضافة مجانية لسنة',
  'ربط سوشيال ميديا',
  'تقارير تحليلية',
  'متجر إلكتروني',
  'دفع إلكتروني',
]

const PLAN_TEMPLATES = [
  {
    name: 'باقة البداية',
    price: 'تبدأ من 3,000 ريال',
    duration: '2-3 أسابيع',
    features: [
      { text: 'موقع تعريفي احترافي', included: true },
      { text: 'تصميم متجاوب مع الجوال', included: true },
      { text: 'لوحة تحكم بسيطة', included: true },
      { text: '5 صفحات رئيسية', included: true },
      { text: 'تحسين SEO أساسي', included: true },
      { text: 'نموذج تواصل', included: true },
      { text: 'دعم فني لمدة شهر', included: true },
      { text: 'متجر إلكتروني', included: false },
      { text: 'لوحة تحكم متقدمة', included: false },
    ],
    featured: false,
  },
  {
    name: 'باقة الأعمال',
    price: 'تبدأ من 8,000 ريال',
    duration: '4-6 أسابيع',
    features: [
      { text: 'موقع متكامل متعدد الصفحات', included: true },
      { text: 'تصميم UI/UX احترافي', included: true },
      { text: 'لوحة تحكم متقدمة', included: true },
      { text: 'صفحات غير محدودة', included: true },
      { text: 'تحسين SEO متقدم', included: true },
      { text: 'متجر إلكتروني بسيط', included: true },
      { text: 'دعم فني 3 أشهر', included: true },
      { text: 'تكامل مع أنظمة الدفع', included: false },
    ],
    featured: true,
  },
  {
    name: 'باقة المتجر',
    price: 'تبدأ من 15,000 ريال',
    duration: '6-10 أسابيع',
    features: [
      { text: 'متجر إلكتروني متكامل', included: true },
      { text: 'بوابة دفع إلكتروني', included: true },
      { text: 'إدارة المخزون', included: true },
      { text: 'تطبيق جوال (iOS & Android)', included: true },
      { text: 'لوحة تحكم متقدمة', included: true },
      { text: 'تقارير المبيعات', included: true },
      { text: 'دعم فني سنة كاملة', included: true },
    ],
    featured: false,
  },
]

export default function PricingAdminPage() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [editing, setEditing] = useState<Plan | null>(null)
  const [editingIdx, setEditingIdx] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [newFeature, setNewFeature] = useState('')
  const [showTemplates, setShowTemplates] = useState(false)

  const load = () =>
    fetch('/api/pricing').then(r => r.json())
      .then((d: Plan[]) => {
        setPlans(d.map(p => ({
          ...p,
          features: (() => { try { const f = JSON.parse(p.features as unknown as string); return Array.isArray(f) ? (typeof f[0] === 'string' ? f.map((t: string) => ({ text: t, included: true })) : f) : [] } catch { return [] } })()
        })))
        setLoading(false)
      })
      .catch(() => setLoading(false))

  useEffect(() => { load() }, [])

  const openNew = () => {
    setEditing({ name: '', price: '', duration: '', features: [], featured: false, visible: true, order: plans.length })
    setEditingIdx(null)
    setShowTemplates(false)
  }

  const openEdit = (plan: Plan, idx: number) => {
    setEditing({ ...plan })
    setEditingIdx(idx)
  }

  const applyTemplate = (tpl: typeof PLAN_TEMPLATES[0]) => {
    setEditing(e => e ? ({ ...e, name: tpl.name, price: tpl.price, duration: tpl.duration, features: [...tpl.features], featured: tpl.featured }) : e)
    setShowTemplates(false)
  }

  const addFeature = () => {
    if (!newFeature.trim() || !editing) return
    setEditing({ ...editing, features: [...editing.features, { text: newFeature.trim(), included: true }] })
    setNewFeature('')
  }

  const toggleFeature = (i: number) => {
    if (!editing) return
    setEditing({ ...editing, features: editing.features.map((f, j) => j === i ? { ...f, included: !f.included } : f) })
  }

  const removeFeature = (i: number) => {
    if (!editing) return
    setEditing({ ...editing, features: editing.features.filter((_, j) => j !== i) })
  }

  const save = async () => {
    if (!editing?.name) return
    setSaving(true)
    const body = { ...editing, features: JSON.stringify(editing.features) }
    const method = editing.id ? 'PUT' : 'POST'
    const url = editing.id ? `/api/pricing/${editing.id}` : '/api/pricing'
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    setSaving(false); setEditing(null); setEditingIdx(null); load()
  }

  const del = async (id: string) => {
    if (!confirm('حذف هذه الباقة؟')) return
    await fetch(`/api/pricing/${id}`, { method: 'DELETE' }); load()
  }

  const inp: React.CSSProperties = {
    width: '100%', padding: '0.7rem 1rem', borderRadius: '0.625rem',
    background: 'rgba(30,0,64,0.6)', border: '1px solid rgba(123,62,255,0.25)',
    color: 'white', fontFamily: 'Cairo, sans-serif', boxSizing: 'border-box', outline: 'none',
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ color: 'white', fontWeight: 800, fontSize: '1.6rem', fontFamily: 'Cairo, sans-serif' }}>
            💰 إدارة الباقات والأسعار
          </h1>
          <p style={{ color: '#9090A8', fontSize: '0.875rem', fontFamily: 'Cairo, sans-serif', marginTop: '0.25rem' }}>
            أضف وعدّل الباقات مع التحكم الكامل في الميزات (✓ / ✗)
          </p>
        </div>
        <button onClick={openNew} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={18} /> إضافة باقة جديدة
        </button>
      </div>

      {/* Editor Panel */}
      {editing && (
        <div className="admin-card" style={{ padding: '2rem', borderRadius: '1.25rem', marginBottom: '2rem', border: '1px solid rgba(123,62,255,0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h3 style={{ color: 'white', fontWeight: 700, fontFamily: 'Cairo, sans-serif', fontSize: '1.1rem' }}>
              {editing.id ? '✏️ تعديل الباقة' : '🆕 إنشاء باقة جديدة'}
            </h3>

            {/* Template picker */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowTemplates(!showTemplates)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 1rem', borderRadius: '0.625rem', border: '1px solid rgba(123,62,255,0.3)', background: 'rgba(123,62,255,0.1)', color: '#A066FF', cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontWeight: 600, fontSize: '0.85rem' }}
              >
                📋 اختر قالب جاهز {showTemplates ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
              {showTemplates && (
                <div style={{ position: 'absolute', top: '110%', right: 0, zIndex: 100, background: 'rgba(18,0,43,0.98)', border: '1px solid rgba(123,62,255,0.3)', borderRadius: '1rem', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '220px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
                  {PLAN_TEMPLATES.map((t, i) => (
                    <button key={i} onClick={() => applyTemplate(t)}
                      style={{ padding: '0.75rem 1rem', borderRadius: '0.625rem', border: 'none', background: 'rgba(123,62,255,0.08)', cursor: 'pointer', textAlign: 'right' }}
                    >
                      <div style={{ color: 'white', fontWeight: 700, fontFamily: 'Cairo, sans-serif', fontSize: '0.9rem' }}>{t.name}</div>
                      <div style={{ color: '#7070A0', fontFamily: 'Cairo, sans-serif', fontSize: '0.78rem' }}>{t.price} • {t.features.length} ميزة</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ color: '#B8B8C7', fontSize: '0.82rem', display: 'block', marginBottom: '0.4rem', fontFamily: 'Cairo, sans-serif' }}>اسم الباقة *</label>
              <input style={inp} value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} placeholder="مثال: باقة البداية" />
            </div>
            <div>
              <label style={{ color: '#B8B8C7', fontSize: '0.82rem', display: 'block', marginBottom: '0.4rem', fontFamily: 'Cairo, sans-serif' }}>السعر *</label>
              <input style={inp} value={editing.price} onChange={e => setEditing({ ...editing, price: e.target.value })} placeholder="تبدأ من 5,000 ريال" />
            </div>
            <div>
              <label style={{ color: '#B8B8C7', fontSize: '0.82rem', display: 'block', marginBottom: '0.4rem', fontFamily: 'Cairo, sans-serif' }}>مدة التنفيذ</label>
              <input style={inp} value={editing.duration || ''} onChange={e => setEditing({ ...editing, duration: e.target.value })} placeholder="2-3 أسابيع" />
            </div>
          </div>

          {/* Features builder */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ color: '#B8B8C7', fontSize: '0.82rem', display: 'block', marginBottom: '0.75rem', fontFamily: 'Cairo, sans-serif', fontWeight: 600 }}>
              ⚡ الميزات — اضغط على ✓/✗ للتبديل
            </label>

            {/* Quick add from suggestions */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
              {FEATURE_TEMPLATES.filter(f => !editing.features.some(ef => ef.text === f)).slice(0, 6).map((f, i) => (
                <button key={i}
                  onClick={() => setEditing({ ...editing, features: [...editing.features, { text: f, included: true }] })}
                  style={{ padding: '0.3rem 0.65rem', borderRadius: '2rem', border: '1px solid rgba(123,62,255,0.2)', background: 'rgba(123,62,255,0.05)', color: '#8080C0', cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontSize: '0.78rem' }}
                >
                  + {f}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
              {editing.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <GripVertical size={14} style={{ color: '#5050A0', flexShrink: 0 }} />
                  <button
                    onClick={() => toggleFeature(i)}
                    style={{
                      width: '1.75rem', height: '1.75rem', borderRadius: '50%', border: 'none', cursor: 'pointer', flexShrink: 0,
                      background: f.included ? 'rgba(78,205,196,0.2)' : 'rgba(255,107,107,0.15)',
                      color: f.included ? '#4ECDC4' : '#FF6B6B',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    {f.included ? <Check size={12} /> : <X size={12} />}
                  </button>
                  <span style={{ flex: 1, color: f.included ? '#E0E0F0' : '#6060A0', fontFamily: 'Cairo, sans-serif', fontSize: '0.9rem', textDecoration: f.included ? 'none' : 'line-through' }}>
                    {f.text}
                  </span>
                  <button onClick={() => removeFeature(i)} style={{ padding: '0.35rem', borderRadius: '0.4rem', background: 'rgba(255,107,107,0.1)', border: 'none', color: '#FF6B6B', cursor: 'pointer' }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input style={{ ...inp, flex: 1 }} placeholder="أضف ميزة مخصصة..." value={newFeature} onChange={e => setNewFeature(e.target.value)} onKeyDown={e => e.key === 'Enter' && addFeature()} />
              <button onClick={addFeature} style={{ padding: '0.7rem 1rem', borderRadius: '0.625rem', border: 'none', background: 'rgba(123,62,255,0.2)', color: '#A066FF', cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>
                + إضافة
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
              <div
                onClick={() => setEditing({ ...editing, featured: !editing.featured })}
                style={{ width: '2.5rem', height: '1.4rem', borderRadius: '1rem', background: editing.featured ? '#7B3EFF' : 'rgba(123,62,255,0.2)', position: 'relative', transition: 'background 0.2s', cursor: 'pointer' }}
              >
                <div style={{ position: 'absolute', top: '0.2rem', right: editing.featured ? '0.2rem' : '1.2rem', width: '1rem', height: '1rem', borderRadius: '50%', background: 'white', transition: 'right 0.2s' }} />
              </div>
              <span style={{ color: '#B8B8C7', fontFamily: 'Cairo, sans-serif', fontSize: '0.9rem' }}>⭐ الأكثر طلباً (مميزة)</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
              <div
                onClick={() => setEditing({ ...editing, visible: !editing.visible })}
                style={{ width: '2.5rem', height: '1.4rem', borderRadius: '1rem', background: editing.visible ? '#4ECDC4' : 'rgba(78,205,196,0.2)', position: 'relative', transition: 'background 0.2s', cursor: 'pointer' }}
              >
                <div style={{ position: 'absolute', top: '0.2rem', right: editing.visible ? '0.2rem' : '1.2rem', width: '1rem', height: '1rem', borderRadius: '50%', background: 'white', transition: 'right 0.2s' }} />
              </div>
              <span style={{ color: '#B8B8C7', fontFamily: 'Cairo, sans-serif', fontSize: '0.9rem' }}>ظاهرة بالموقع</span>
            </label>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={save} disabled={saving} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Check size={16} /> {saving ? 'جاري الحفظ...' : 'حفظ الباقة'}
            </button>
            <button onClick={() => setEditing(null)} className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <X size={16} /> إلغاء
            </button>
          </div>
        </div>
      )}

      {/* Plans list */}
      {loading ? (
        <p style={{ color: '#B8B8C7', textAlign: 'center', padding: '3rem', fontFamily: 'Cairo, sans-serif' }}>جاري التحميل...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
          {plans.map((plan, idx) => {
            const feats = plan.features
            const inc = feats.filter(f => f.included).length
            return (
              <div key={plan.id ?? idx} className="hover-card admin-card" style={{ padding: '1.5rem', borderRadius: '1.25rem', border: plan.featured ? '1px solid rgba(123,62,255,0.5)' : undefined, position: 'relative' }}>
                {plan.featured && (
                  <div style={{ position: 'absolute', top: '-0.6rem', right: '1rem', background: 'linear-gradient(135deg,#7B3EFF,#A066FF)', padding: '0.2rem 0.75rem', borderRadius: '1rem', fontSize: '0.72rem', color: 'white', fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>
                    <Star size={10} style={{ marginLeft: '0.25rem' }} /> الأكثر طلباً
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div>
                    <h3 style={{ color: 'white', fontWeight: 700, fontFamily: 'Cairo, sans-serif', fontSize: '1rem' }}>{plan.name}</h3>
                    <p style={{ color: '#A066FF', fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: '0.9rem' }}>{plan.price}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button onClick={() => openEdit(plan, idx)} style={{ padding: '0.45rem', borderRadius: '0.5rem', background: 'rgba(123,62,255,0.1)', border: 'none', color: '#A066FF', cursor: 'pointer' }}>
                      <Pencil size={14} />
                    </button>
                    {plan.id && <button onClick={() => del(plan.id!)} style={{ padding: '0.45rem', borderRadius: '0.5rem', background: 'rgba(255,107,107,0.1)', border: 'none', color: '#FF6B6B', cursor: 'pointer' }}>
                      <Trash2 size={14} />
                    </button>}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <span style={{ background: 'rgba(78,205,196,0.1)', color: '#4ECDC4', fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '0.4rem', fontFamily: 'Cairo, sans-serif' }}>✓ {inc} ميزة</span>
                  {feats.length - inc > 0 && <span style={{ background: 'rgba(255,107,107,0.1)', color: '#FF6B6B', fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '0.4rem', fontFamily: 'Cairo, sans-serif' }}>✗ {feats.length - inc} محدودة</span>}
                  {plan.duration && <span style={{ background: 'rgba(255,215,0,0.1)', color: '#FFD700', fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '0.4rem', fontFamily: 'Cairo, sans-serif' }}>⏱ {plan.duration}</span>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {feats.slice(0, 4).map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: f.included ? '#4ECDC4' : '#FF6B6B', fontSize: '0.75rem' }}>{f.included ? '✓' : '✗'}</span>
                      <span style={{ color: f.included ? '#C8C8D8' : '#5050A0', fontFamily: 'Cairo, sans-serif', fontSize: '0.8rem' }}>{f.text}</span>
                    </div>
                  ))}
                  {feats.length > 4 && <span style={{ color: '#6060A0', fontFamily: 'Cairo, sans-serif', fontSize: '0.78rem', marginTop: '0.2rem' }}>+ {feats.length - 4} ميزة أخرى...</span>}
                </div>
              </div>
            )
          })}
          {plans.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: '#6060A0', fontFamily: 'Cairo, sans-serif' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💰</div>
              <p>لا توجد باقات بعد. اضغط "إضافة باقة جديدة" أو اختر قالباً جاهزاً.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
