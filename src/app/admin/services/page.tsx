'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'
import { useToast } from '@/components/ToastProvider'

type Item = { id: string; title: string; description: string; icon?: string; order: number; visible: boolean }
const ICONS = ['Globe', 'Smartphone', 'Layers', 'ShoppingCart', 'Code2', 'Zap', 'Star', 'Heart', 'Shield']

export default function ServicesAdminPage() {
  const toast = useToast()
  const [items, setItems] = useState<Item[]>([])
  const [editing, setEditing] = useState<Partial<Item> | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const load = () =>
    fetch('/api/services').then(r => r.json())
      .then(d => { setItems(d); setLoading(false) })
      .catch(() => { setLoading(false); toast.error('خطأ في التحميل', 'تعذّر جلب البيانات') })

  useEffect(() => { load() }, [])

  const save = async () => {
    if (!editing) return
    if (!editing.title?.trim()) { toast.warning('حقل مطلوب', 'يرجى إدخال عنوان الخدمة'); return }
    setSaving(true)
    try {
      const method = editing.id ? 'PUT' : 'POST'
      const url = editing.id ? `/api/services/${editing.id}` : '/api/services'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) })
      if (!res.ok) throw new Error()
      toast.success(editing.id ? 'تم التحديث!' : 'تمت الإضافة!', `تم حفظ الخدمة "${editing.title}" بنجاح`)
      setEditing(null)
      load()
    } catch {
      toast.error('فشل الحفظ', 'حدث خطأ أثناء حفظ البيانات، يرجى المحاولة مجدداً')
    } finally {
      setSaving(false)
    }
  }

  const del = async (id: string, title: string) => {
    if (!confirm(`حذف خدمة "${title}"؟`)) return
    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      toast.success('تم الحذف', `تم حذف "${title}" بنجاح`)
      load()
    } catch {
      toast.error('فشل الحذف', 'حدث خطأ أثناء الحذف')
    }
  }

  const toggle = async (item: Item) => {
    try {
      await fetch(`/api/services/${item.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ visible: !item.visible }) })
      toast.info(item.visible ? 'تم الإخفاء' : 'تم الإظهار', `"${item.title}" الآن ${item.visible ? 'مخفية' : 'ظاهرة'}`)
      load()
    } catch {
      toast.error('فشل التحديث')
    }
  }

  const inp: React.CSSProperties = { width: '100%', padding: '0.75rem', borderRadius: '0.625rem', background: 'rgba(30,0,64,0.5)', border: '1px solid rgba(123,62,255,0.2)', color: 'white', fontFamily: 'Cairo, sans-serif', boxSizing: 'border-box' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ color: 'white', fontWeight: 800, fontSize: 'clamp(1.1rem, 3vw, 1.5rem)' }}>إدارة الخدمات</h1>
        <button onClick={() => setEditing({ title: '', description: '', icon: 'Globe', order: 0, visible: true })} className="btn-primary">
          <Plus size={18} /> إضافة خدمة
        </button>
      </div>

      {editing && (
        <div className="admin-card" style={{ padding: '2rem', borderRadius: '1rem', marginBottom: '2rem' }}>
          <h3 style={{ color: 'white', fontWeight: 700, marginBottom: '1.5rem' }}>{editing.id ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}</h3>
          <div className="grid-form-2" style={{ marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#B8B8C7', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>عنوان الخدمة *</label>
              <input style={inp} value={editing.title || ''} onChange={e => setEditing({ ...editing, title: e.target.value })} placeholder="مثال: تطوير المواقع" />
            </div>
            <div>
              <label style={{ color: '#B8B8C7', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>الأيقونة</label>
              <select style={{ ...inp, cursor: 'pointer' }} value={editing.icon || 'Globe'} onChange={e => setEditing({ ...editing, icon: e.target.value })}>
                {ICONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#B8B8C7', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>الوصف</label>
            <textarea rows={3} style={{ ...inp, resize: 'vertical' }} value={editing.description || ''} onChange={e => setEditing({ ...editing, description: e.target.value })} placeholder="وصف مختصر للخدمة..." />
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button onClick={save} disabled={saving} className="btn-primary" style={{ opacity: saving ? 0.7 : 1 }}>
              {saving ? <div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> : <Check size={16} />}
              {saving ? 'جاري الحفظ...' : 'حفظ'}
            </button>
            <button onClick={() => setEditing(null)} className="btn-outline"><X size={16} /> إلغاء</button>
          </div>
        </div>
      )}

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[1, 2, 3].map(i => <div key={i} className="skeleton" style={{ height: '80px', borderRadius: '1rem' }} />)}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {items.map(item => (
            <div key={item.id} className="admin-card" style={{ padding: '1.25rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <p style={{ color: 'white', fontWeight: 600, marginBottom: '0.25rem' }}>{item.title}</p>
                <p style={{ color: '#B8B8C7', fontSize: '0.85rem' }}>{item.description?.slice(0, 80)}...</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexShrink: 0 }}>
                <button onClick={() => toggle(item)} style={{ padding: '0.4rem 0.875rem', borderRadius: '1rem', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'Cairo, sans-serif', background: item.visible ? 'rgba(78,205,196,0.15)' : 'rgba(184,184,199,0.1)', color: item.visible ? '#4ECDC4' : '#B8B8C7', transition: 'all 0.2s' }}>
                  {item.visible ? '● ظاهر' : '○ مخفي'}
                </button>
                <button onClick={() => setEditing(item)} style={{ padding: '0.5rem', borderRadius: '0.5rem', background: 'rgba(123,62,255,0.1)', border: 'none', color: '#A066FF', cursor: 'pointer' }}><Pencil size={16} /></button>
                <button onClick={() => del(item.id, item.title)} style={{ padding: '0.5rem', borderRadius: '0.5rem', background: 'rgba(255,107,107,0.1)', border: 'none', color: '#FF6B6B', cursor: 'pointer' }}><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p style={{ color: '#B8B8C7', textAlign: 'center', padding: '3rem' }}>لا توجد خدمات. أضف خدمة جديدة.</p>}
        </div>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
