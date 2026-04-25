'use client'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'

type FAQ = { id: string; question: string; answer: string; order: number; visible: boolean }

export default function FAQAdminPage() {
  const [items, setItems] = useState<FAQ[]>([])
  const [editing, setEditing] = useState<Partial<FAQ> | null>(null)
  const [loading, setLoading] = useState(true)

  const load = () => fetch('/api/faq?all=true').then(r => r.json()).then(d => { setItems(d); setLoading(false) }).catch(() => setLoading(false))
  useEffect(() => { load() }, [])

  const save = async () => {
    if (!editing?.question) return
    const method = editing.id ? 'PUT' : 'POST'
    const url = editing.id ? `/api/faq/${editing.id}` : '/api/faq'
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) })
    setEditing(null); load()
  }
  const del = async (id: string) => { if (!confirm('حذف؟')) return; await fetch(`/api/faq/${id}`, { method: 'DELETE' }); load() }
  const toggle = async (item: FAQ) => {
    await fetch(`/api/faq/${item.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ visible: !item.visible }) })
    load()
  }
  const inputStyle: React.CSSProperties = { width: '100%', padding: '0.75rem', borderRadius: '0.625rem', background: 'rgba(30,0,64,0.5)', border: '1px solid rgba(123,62,255,0.2)', color: 'white', fontFamily: 'Cairo, sans-serif', boxSizing: 'border-box' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'white', fontWeight: 800, fontSize: '1.5rem' }}>إدارة الأسئلة الشائعة</h1>
        <button onClick={() => setEditing({ question: '', answer: '', visible: true, order: 0 })} className="btn-primary"><Plus size={18} /> إضافة سؤال</button>
      </div>
      {editing && (
        <div className="admin-card" style={{ padding: '2rem', borderRadius: '1rem', marginBottom: '2rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#B8B8C7', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>السؤال</label>
            <input style={inputStyle} value={editing.question || ''} onChange={e => setEditing({ ...editing, question: e.target.value })} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#B8B8C7', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>الجواب</label>
            <textarea rows={4} style={{ ...inputStyle, resize: 'vertical' }} value={editing.answer || ''} onChange={e => setEditing({ ...editing, answer: e.target.value })} />
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
            <div key={item.id} className="admin-card" style={{ padding: '1.25rem', borderRadius: '1rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <p style={{ color: 'white', fontWeight: 600, marginBottom: '0.25rem' }}>{item.question}</p>
                <p style={{ color: '#B8B8C7', fontSize: '0.85rem' }}>{item.answer?.slice(0, 80)}...</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                <button onClick={() => toggle(item)} style={{ padding: '0.4rem 0.75rem', borderRadius: '1rem', border: 'none', cursor: 'pointer', fontSize: '0.8rem', background: item.visible ? 'rgba(78,205,196,0.15)' : 'rgba(184,184,199,0.1)', color: item.visible ? '#4ECDC4' : '#B8B8C7' }}>
                  {item.visible ? 'ظاهر' : 'مخفي'}
                </button>
                <button onClick={() => setEditing(item)} style={{ padding: '0.5rem', borderRadius: '0.5rem', background: 'rgba(123,62,255,0.1)', border: 'none', color: '#A066FF', cursor: 'pointer' }}><Pencil size={16} /></button>
                <button onClick={() => del(item.id)} style={{ padding: '0.5rem', borderRadius: '0.5rem', background: 'rgba(255,107,107,0.1)', border: 'none', color: '#FF6B6B', cursor: 'pointer' }}><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p style={{ color: '#B8B8C7', textAlign: 'center', padding: '3rem' }}>لا توجد أسئلة.</p>}
        </div>
      )}
    </div>
  )
}
