'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'

type T = { id: string; clientName: string; projectType?: string; rating: number; text: string; visible: boolean }

export default function TestimonialsAdminPage() {
  const [items, setItems] = useState<T[]>([])
  const [editing, setEditing] = useState<Partial<T> | null>(null)
  const [loading, setLoading] = useState(true)

  const load = () => fetch('/api/testimonials').then(r => r.json()).then(d => { setItems(d); setLoading(false) }).catch(() => setLoading(false))
  useEffect(() => { load() }, [])

  const save = async () => {
    if (!editing?.clientName) return
    const method = editing.id ? 'PUT' : 'POST'
    const url = editing.id ? `/api/testimonials/${editing.id}` : '/api/testimonials'
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) })
    setEditing(null); load()
  }
  const del = async (id: string) => { if (!confirm('حذف؟')) return; await fetch(`/api/testimonials/${id}`, { method: 'DELETE' }); load() }
  const inputStyle: React.CSSProperties = { width: '100%', padding: '0.75rem', borderRadius: '0.625rem', background: 'rgba(30,0,64,0.5)', border: '1px solid rgba(123,62,255,0.2)', color: 'white', fontFamily: 'Cairo, sans-serif', boxSizing: 'border-box' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'white', fontWeight: 800, fontSize: '1.5rem' }}>إدارة آراء العملاء</h1>
        <button onClick={() => setEditing({ clientName: '', projectType: '', rating: 5, text: '', visible: true })} className="btn-primary"><Plus size={18} /> إضافة رأي</button>
      </div>
      {editing && (
        <div className="admin-card" style={{ padding: '2rem', borderRadius: '1rem', marginBottom: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#B8B8C7', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>اسم العميل</label>
              <input style={inputStyle} value={editing.clientName || ''} onChange={e => setEditing({ ...editing, clientName: e.target.value })} />
            </div>
            <div>
              <label style={{ color: '#B8B8C7', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>نوع المشروع</label>
              <input style={inputStyle} value={editing.projectType || ''} onChange={e => setEditing({ ...editing, projectType: e.target.value })} />
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#B8B8C7', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>التقييم</label>
            <select style={{ ...inputStyle, cursor: 'pointer' }} value={editing.rating || 5} onChange={e => setEditing({ ...editing, rating: Number(e.target.value) })}>
              {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} نجوم</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#B8B8C7', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>نص الرأي</label>
            <textarea rows={4} style={{ ...inputStyle, resize: 'vertical' }} value={editing.text || ''} onChange={e => setEditing({ ...editing, text: e.target.value })} />
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
            <div key={item.id} className="admin-card" style={{ padding: '1.25rem', borderRadius: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <p style={{ color: 'white', fontWeight: 600 }}>{item.clientName} <span style={{ color: '#A066FF', fontSize: '0.85rem' }}>• {item.projectType}</span></p>
                <p style={{ color: '#B8B8C7', fontSize: '0.85rem' }}>{item.text?.slice(0, 80)}...</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => setEditing(item)} style={{ padding: '0.5rem', borderRadius: '0.5rem', background: 'rgba(123,62,255,0.1)', border: 'none', color: '#A066FF', cursor: 'pointer' }}><Pencil size={16} /></button>
                <button onClick={() => del(item.id)} style={{ padding: '0.5rem', borderRadius: '0.5rem', background: 'rgba(255,107,107,0.1)', border: 'none', color: '#FF6B6B', cursor: 'pointer' }}><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p style={{ color: '#B8B8C7', textAlign: 'center', padding: '3rem' }}>لا توجد آراء.</p>}
        </div>
      )}
    </div>
  )
}
