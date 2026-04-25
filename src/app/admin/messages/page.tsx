'use client'
import { useState, useEffect } from 'react'
import { Trash2, Eye, Mail, Phone, ChevronDown } from 'lucide-react'

type Message = { id: string; name: string; email: string; phone?: string; service?: string; budget?: string; message: string; status: string; notes?: string; createdAt: string }

const STATUS = { new: 'جديدة', following: 'قيد المتابعة', replied: 'تم الرد', closed: 'مغلقة' }
const STATUS_COLORS: Record<string, string> = { new: '#A066FF', following: '#FFD93D', replied: '#4ECDC4', closed: '#B8B8C7' }

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [selected, setSelected] = useState<Message | null>(null)
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  const load = () => fetch('/api/messages').then(r => r.json()).then(d => { setMessages(d); setLoading(false) }).catch(() => setLoading(false))
  useEffect(() => { load() }, [])

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/messages/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
    load()
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null)
  }

  const deleteMsg = async (id: string) => {
    if (!confirm('هل تريد حذف هذه الرسالة؟')) return
    await fetch(`/api/messages/${id}`, { method: 'DELETE' })
    setSelected(null); load()
  }

  const filtered = filter === 'all' ? messages : messages.filter(m => m.status === filter)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'white', fontWeight: 800, fontSize: '1.5rem' }}>إدارة الرسائل</h1>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {[['all', 'الكل'], ...Object.entries(STATUS)].map(([val, label]) => (
            <button key={val} onClick={() => setFilter(val)} style={{ padding: '0.4rem 1rem', borderRadius: '1rem', border: 'none', cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontSize: '0.85rem', background: filter === val ? 'linear-gradient(135deg, #7B3EFF, #A066FF)' : 'rgba(123,62,255,0.1)', color: filter === val ? 'white' : '#B8B8C7' }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {loading && <p style={{ color: '#B8B8C7', textAlign: 'center', padding: '3rem' }}>جاري التحميل...</p>}
      {!loading && filtered.length === 0 && <p style={{ color: '#B8B8C7', textAlign: 'center', padding: '3rem' }}>لا توجد رسائل</p>}

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filtered.map(msg => (
            <div key={msg.id} onClick={() => setSelected(msg)} className="admin-card" style={{ padding: '1.25rem', borderRadius: '1rem', cursor: 'pointer', border: selected?.id === msg.id ? '1px solid rgba(123,62,255,0.5)' : '1px solid rgba(123,62,255,0.15)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div>
                  <p style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>{msg.name}</p>
                  <p style={{ color: '#B8B8C7', fontSize: '0.8rem' }}>{msg.email}</p>
                </div>
                <span style={{ background: `${STATUS_COLORS[msg.status]}22`, color: STATUS_COLORS[msg.status], fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '1rem', flexShrink: 0 }}>
                  {STATUS[msg.status as keyof typeof STATUS] || msg.status}
                </span>
              </div>
              <p style={{ color: '#B8B8C7', fontSize: '0.85rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.message}</p>
              <p style={{ color: '#B8B8C7', fontSize: '0.75rem', marginTop: '0.5rem' }}>{new Date(msg.createdAt).toLocaleDateString('ar-SA')}</p>
            </div>
          ))}
        </div>

        {selected && (
          <div className="admin-card" style={{ padding: '1.5rem', borderRadius: '1rem', position: 'sticky', top: '1rem', maxHeight: 'calc(100vh - 8rem)', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ color: 'white', fontWeight: 700 }}>تفاصيل الرسالة</h3>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: '#B8B8C7', cursor: 'pointer', fontSize: '1.25rem' }}>×</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <div><p style={{ color: '#B8B8C7', fontSize: '0.8rem', marginBottom: '0.25rem' }}>الاسم</p><p style={{ color: 'white', fontWeight: 600 }}>{selected.name}</p></div>
              <div><p style={{ color: '#B8B8C7', fontSize: '0.8rem', marginBottom: '0.25rem' }}>البريد</p>
                <a href={`mailto:${selected.email}`} style={{ color: '#A066FF', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}><Mail size={14} />{selected.email}</a>
              </div>
              {selected.phone && <div><p style={{ color: '#B8B8C7', fontSize: '0.8rem', marginBottom: '0.25rem' }}>الجوال</p>
                <a href={`tel:${selected.phone}`} style={{ color: '#A066FF', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}><Phone size={14} />{selected.phone}</a>
              </div>}
              {selected.service && <div><p style={{ color: '#B8B8C7', fontSize: '0.8rem', marginBottom: '0.25rem' }}>الخدمة</p><p style={{ color: 'white' }}>{selected.service}</p></div>}
              {selected.budget && <div><p style={{ color: '#B8B8C7', fontSize: '0.8rem', marginBottom: '0.25rem' }}>الميزانية</p><p style={{ color: 'white' }}>{selected.budget}</p></div>}
              <div><p style={{ color: '#B8B8C7', fontSize: '0.8rem', marginBottom: '0.25rem' }}>الرسالة</p><p style={{ color: 'white', lineHeight: 1.8 }}>{selected.message}</p></div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ color: '#B8B8C7', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem' }}>تغيير الحالة</label>
              <select value={selected.status} onChange={e => updateStatus(selected.id, e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.75rem', background: 'rgba(30,0,64,0.5)', border: '1px solid rgba(123,62,255,0.25)', color: 'white', fontFamily: 'Cairo, sans-serif', cursor: 'pointer' }}>
                {Object.entries(STATUS).map(([val, label]) => <option key={val} value={val}>{label}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {selected.phone && (
                <a href={`https://wa.me/${selected.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: '0.75rem', borderRadius: '0.75rem', background: 'rgba(37,211,102,0.15)', border: '1px solid rgba(37,211,102,0.3)', color: '#25D366', textDecoration: 'none', textAlign: 'center', fontSize: '0.9rem' }}>
                  واتساب
                </a>
              )}
              <button onClick={() => deleteMsg(selected.id)} style={{ padding: '0.75rem', borderRadius: '0.75rem', background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)', color: '#FF6B6B', cursor: 'pointer' }}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
