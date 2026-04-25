'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'

type Project = { id: string; title: string; slug: string; category: string; description: string; details?: string; problem?: string; solution?: string; result?: string; technologies?: string; link?: string; featured: boolean; published: boolean }
const CATS = ['مواقع', 'تطبيقات', 'UI/UX', 'متاجر', 'هوية بصرية']

export default function PortfolioAdminPage() {
  const [items, setItems] = useState<Project[]>([])
  const [editing, setEditing] = useState<Partial<Project> | null>(null)
  const [loading, setLoading] = useState(true)

  const load = () => fetch('/api/portfolio').then(r => r.json()).then(d => { setItems(d); setLoading(false) }).catch(() => setLoading(false))
  useEffect(() => { load() }, [])

  const slugify = (t: string) => t.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')

  const save = async () => {
    if (!editing || !editing.title) return
    const data = { ...editing, slug: editing.slug || slugify(editing.title || '') }
    const method = editing.id ? 'PUT' : 'POST'
    const url = editing.id ? `/api/portfolio/${editing.id}` : '/api/portfolio'
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    setEditing(null); load()
  }

  const del = async (id: string) => { if (!confirm('حذف؟')) return; await fetch(`/api/portfolio/${id}`, { method: 'DELETE' }); load() }
  const inputStyle: React.CSSProperties = { width: '100%', padding: '0.75rem', borderRadius: '0.625rem', background: 'rgba(30,0,64,0.5)', border: '1px solid rgba(123,62,255,0.2)', color: 'white', fontFamily: 'Cairo, sans-serif', boxSizing: 'border-box' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'white', fontWeight: 800, fontSize: '1.5rem' }}>إدارة الأعمال</h1>
        <button onClick={() => setEditing({ title: '', category: 'مواقع', description: '', featured: false, published: true })} className="btn-primary">
          <Plus size={18} /> إضافة مشروع
        </button>
      </div>

      {editing && (
        <div className="admin-card" style={{ padding: '2rem', borderRadius: '1rem', marginBottom: '2rem' }}>
          <h3 style={{ color: 'white', fontWeight: 700, marginBottom: '1.5rem' }}>{editing.id ? 'تعديل المشروع' : 'مشروع جديد'}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#B8B8C7', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>اسم المشروع</label>
              <input style={inputStyle} value={editing.title || ''} onChange={e => setEditing({ ...editing, title: e.target.value })} />
            </div>
            <div>
              <label style={{ color: '#B8B8C7', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>التصنيف</label>
              <select style={{ ...inputStyle, cursor: 'pointer' }} value={editing.category || 'مواقع'} onChange={e => setEditing({ ...editing, category: e.target.value })}>
                {CATS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#B8B8C7', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>وصف مختصر</label>
            <input style={inputStyle} value={editing.description || ''} onChange={e => setEditing({ ...editing, description: e.target.value })} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#B8B8C7', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>المشكلة</label>
              <textarea rows={3} style={{ ...inputStyle, resize: 'vertical' }} value={editing.problem || ''} onChange={e => setEditing({ ...editing, problem: e.target.value })} />
            </div>
            <div>
              <label style={{ color: '#B8B8C7', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>الحل</label>
              <textarea rows={3} style={{ ...inputStyle, resize: 'vertical' }} value={editing.solution || ''} onChange={e => setEditing({ ...editing, solution: e.target.value })} />
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#B8B8C7', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>النتيجة</label>
            <textarea rows={2} style={{ ...inputStyle, resize: 'vertical' }} value={editing.result || ''} onChange={e => setEditing({ ...editing, result: e.target.value })} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#B8B8C7', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>التقنيات (JSON مصفوفة)</label>
            <input style={inputStyle} value={editing.technologies || ''} onChange={e => setEditing({ ...editing, technologies: e.target.value })} placeholder='["Next.js","React"]' />
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#B8B8C7', cursor: 'pointer' }}>
              <input type="checkbox" checked={editing.featured || false} onChange={e => setEditing({ ...editing, featured: e.target.checked })} />
              مميز في الرئيسية
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#B8B8C7', cursor: 'pointer' }}>
              <input type="checkbox" checked={editing.published !== false} onChange={e => setEditing({ ...editing, published: e.target.checked })} />
              منشور
            </label>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={save} className="btn-primary"><Check size={16} /> حفظ</button>
            <button onClick={() => setEditing(null)} className="btn-outline"><X size={16} /> إلغاء</button>
          </div>
        </div>
      )}

      {loading ? <p style={{ color: '#B8B8C7', textAlign: 'center', padding: '3rem' }}>جاري التحميل...</p> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {items.map(item => (
            <div key={item.id} className="admin-card" style={{ padding: '1.25rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <p style={{ color: 'white', fontWeight: 600 }}>{item.title}</p>
                  {item.featured && <span style={{ background: 'rgba(255,215,0,0.15)', color: '#FFD700', fontSize: '0.7rem', padding: '0.1rem 0.5rem', borderRadius: '1rem' }}>مميز</span>}
                  {!item.published && <span style={{ background: 'rgba(184,184,199,0.1)', color: '#B8B8C7', fontSize: '0.7rem', padding: '0.1rem 0.5rem', borderRadius: '1rem' }}>مسودة</span>}
                </div>
                <p style={{ color: '#B8B8C7', fontSize: '0.85rem' }}>{item.category} • {item.description?.slice(0, 60)}...</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => setEditing(item)} style={{ padding: '0.5rem', borderRadius: '0.5rem', background: 'rgba(123,62,255,0.1)', border: 'none', color: '#A066FF', cursor: 'pointer' }}><Pencil size={16} /></button>
                <button onClick={() => del(item.id)} style={{ padding: '0.5rem', borderRadius: '0.5rem', background: 'rgba(255,107,107,0.1)', border: 'none', color: '#FF6B6B', cursor: 'pointer' }}><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p style={{ color: '#B8B8C7', textAlign: 'center', padding: '3rem' }}>لا توجد مشاريع.</p>}
        </div>
      )}
    </div>
  )
}
