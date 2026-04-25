'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'

type Post = { id: string; title: string; slug: string; excerpt?: string; content: string; category?: string; status: string; metaTitle?: string; metaDesc?: string }
const CATS = ['تجربة المستخدم', 'تقنية', 'الأداء', 'تصميم', 'برمجة', 'تسويق رقمي']

export default function BlogAdminPage() {
  const [items, setItems] = useState<Post[]>([])
  const [editing, setEditing] = useState<Partial<Post> | null>(null)
  const [loading, setLoading] = useState(true)

  const load = () => fetch('/api/blog').then(r => r.json()).then(d => { setItems(d); setLoading(false) }).catch(() => setLoading(false))
  useEffect(() => { load() }, [])

  const slugify = (t: string) => t.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
  const save = async () => {
    if (!editing?.title) return
    const data = { ...editing, slug: editing.slug || slugify(editing.title || '') }
    const method = editing.id ? 'PUT' : 'POST'
    const url = editing.id ? `/api/blog/${editing.id}` : '/api/blog'
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    setEditing(null); load()
  }
  const del = async (id: string) => { if (!confirm('حذف؟')) return; await fetch(`/api/blog/${id}`, { method: 'DELETE' }); load() }
  const inputStyle: React.CSSProperties = { width: '100%', padding: '0.75rem', borderRadius: '0.625rem', background: 'rgba(30,0,64,0.5)', border: '1px solid rgba(123,62,255,0.2)', color: 'white', fontFamily: 'Cairo, sans-serif', boxSizing: 'border-box' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'white', fontWeight: 800, fontSize: '1.5rem' }}>إدارة المدونة</h1>
        <button onClick={() => setEditing({ title: '', content: '', status: 'draft', category: CATS[0] })} className="btn-primary">
          <Plus size={18} /> مقال جديد
        </button>
      </div>

      {editing && (
        <div className="admin-card" style={{ padding: '2rem', borderRadius: '1rem', marginBottom: '2rem' }}>
          <h3 style={{ color: 'white', fontWeight: 700, marginBottom: '1.5rem' }}>{editing.id ? 'تعديل مقال' : 'مقال جديد'}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#B8B8C7', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>العنوان</label>
              <input style={inputStyle} value={editing.title || ''} onChange={e => setEditing({ ...editing, title: e.target.value })} />
            </div>
            <div>
              <label style={{ color: '#B8B8C7', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>التصنيف</label>
              <select style={{ ...inputStyle, cursor: 'pointer' }} value={editing.category || ''} onChange={e => setEditing({ ...editing, category: e.target.value })}>
                {CATS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#B8B8C7', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>وصف مختصر</label>
            <input style={inputStyle} value={editing.excerpt || ''} onChange={e => setEditing({ ...editing, excerpt: e.target.value })} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#B8B8C7', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>محتوى المقال</label>
            <textarea rows={10} style={{ ...inputStyle, resize: 'vertical' }} value={editing.content || ''} onChange={e => setEditing({ ...editing, content: e.target.value })} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#B8B8C7', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>الحالة</label>
            <select style={{ ...inputStyle, cursor: 'pointer' }} value={editing.status || 'draft'} onChange={e => setEditing({ ...editing, status: e.target.value })}>
              <option value="draft">مسودة</option>
              <option value="published">منشور</option>
            </select>
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
                  <span style={{ background: item.status === 'published' ? 'rgba(78,205,196,0.15)' : 'rgba(184,184,199,0.1)', color: item.status === 'published' ? '#4ECDC4' : '#B8B8C7', fontSize: '0.7rem', padding: '0.1rem 0.5rem', borderRadius: '1rem' }}>
                    {item.status === 'published' ? 'منشور' : 'مسودة'}
                  </span>
                </div>
                <p style={{ color: '#B8B8C7', fontSize: '0.85rem' }}>{item.category} • {item.excerpt?.slice(0, 60)}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => setEditing(item)} style={{ padding: '0.5rem', borderRadius: '0.5rem', background: 'rgba(123,62,255,0.1)', border: 'none', color: '#A066FF', cursor: 'pointer' }}><Pencil size={16} /></button>
                <button onClick={() => del(item.id)} style={{ padding: '0.5rem', borderRadius: '0.5rem', background: 'rgba(255,107,107,0.1)', border: 'none', color: '#FF6B6B', cursor: 'pointer' }}><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p style={{ color: '#B8B8C7', textAlign: 'center', padding: '3rem' }}>لا توجد مقالات.</p>}
        </div>
      )}
    </div>
  )
}
