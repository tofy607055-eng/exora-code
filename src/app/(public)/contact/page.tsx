'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Shield } from 'lucide-react'
import HeroBackground from '@/components/HeroBackground'

const SERVICES = ['تطوير موقع إلكتروني', 'تطوير تطبيق جوال', 'تصميم UI/UX', 'متجر إلكتروني', 'حل رقمي مخصص', 'تحسين الأداء', 'أخرى']
const BUDGETS = ['أقل من 5,000 ريال', '5,000 - 15,000 ريال', '15,000 - 30,000 ريال', '30,000 - 60,000 ريال', 'أكثر من 60,000 ريال']

const perks = [
  { icon: <MessageCircle size={18} />, title: 'رد سريع', desc: 'خلال 24 ساعة', color: '#7B3EFF' },
  { icon: <Clock size={18} />, title: 'استشارة مجانية', desc: '30 دقيقة بلا تكلفة', color: '#4ECDC4' },
  { icon: <Shield size={18} />, title: 'سرية تامة', desc: 'بياناتك محفوظة', color: '#FFD93D' },
]

export default function ContactPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', budget: '', message: '', website: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      })
      if (res.ok) router.push('/success')
      else setError('حدث خطأ أثناء الإرسال. حاول مرة أخرى.')
    } catch { setError('حدث خطأ في الاتصال بالخادم.') }
    setLoading(false)
  }

  const inp: React.CSSProperties = {
    width: '100%', padding: '0.875rem 1rem', borderRadius: '0.75rem',
    background: 'rgba(20,0,50,0.6)', border: '1px solid rgba(123,62,255,0.2)',
    color: 'white', fontFamily: 'Cairo, sans-serif', fontSize: '0.95rem',
    outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box',
  }
  const lbl: React.CSSProperties = { display: 'block', color: '#B8B8C7', fontFamily: 'Cairo, sans-serif', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500 }

  return (
    <>
      {/* ── Hero ── */}
      <section style={{ paddingTop: '7rem', paddingBottom: '4.5rem', background: 'linear-gradient(135deg, #0A001F 0%, #12002B 100%)', position: 'relative', overflow: 'hidden' }}>
        <HeroBackground />
        <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '400px', background: 'radial-gradient(ellipse, rgba(123,62,255,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(123,62,255,0.1)', border: '1px solid rgba(123,62,255,0.25)', borderRadius: '2rem', padding: '0.4rem 1.25rem', marginBottom: '1.5rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A066FF', display: 'block' }} />
            <span style={{ color: '#A066FF', fontSize: '0.85rem', fontFamily: 'Cairo, sans-serif', fontWeight: 600 }}>تواصل معنا</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, fontFamily: 'Cairo, sans-serif', color: 'white', marginBottom: '1.25rem', lineHeight: 1.2 }}>
            لنبني{' '}
            <span style={{ background: 'linear-gradient(135deg, #7B3EFF, #A066FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>مشروعك معاً</span>
          </h1>
          <p style={{ color: '#B8B8C7', fontSize: '1.05rem', fontFamily: 'Cairo, sans-serif', maxWidth: '500px', margin: '0 auto 2.5rem', lineHeight: 1.9 }}>
            أخبرنا عن فكرتك وسيتواصل معك فريقنا خلال 24 ساعة لمناقشة التفاصيل
          </p>
          {/* Perks */}
          <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {perks.map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.5rem 1.25rem', borderRadius: '2rem', background: `${p.color}10`, border: `1px solid ${p.color}25` }}>
                <span style={{ color: p.color }}>{p.icon}</span>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: 'white', fontSize: '0.82rem', fontWeight: 700, fontFamily: 'Cairo, sans-serif' }}>{p.title}</div>
                  <div style={{ color: p.color, fontSize: '0.72rem', fontFamily: 'Cairo, sans-serif' }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form + Info ── */}
      <section className="section" style={{ background: 'linear-gradient(180deg, #12002B 0%, #0A001F 100%)' }}>
        <div className="container">
          <div className="grid-sidebar">

            {/* Info */}
            <div>
              <h2 style={{ color: 'white', fontWeight: 800, fontFamily: 'Cairo, sans-serif', marginBottom: '0.5rem', fontSize: '1.3rem' }}>معلومات التواصل</h2>
              <p style={{ color: '#9090A8', fontFamily: 'Cairo, sans-serif', fontSize: '0.875rem', lineHeight: 1.8, marginBottom: '2rem' }}>تواصل معنا بالطريقة الأنسب لك</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
                {[
                  { icon: <Mail size={18} />, label: 'البريد الإلكتروني', value: 'hello@exoracode.com', href: 'mailto:hello@exoracode.com', color: '#7B3EFF' },
                  { icon: <Phone size={18} />, label: 'رقم الجوال', value: '+967 XXX XXX XXX', href: 'tel:+967000000000', color: '#4ECDC4' },
                  { icon: <MapPin size={18} />, label: 'الموقع', value: 'عدن، اليمن', href: '#', color: '#FFD93D' },
                ].map((item, i) => (
                  <a key={i} href={item.href} style={{ display: 'flex', gap: '1rem', textDecoration: 'none', alignItems: 'flex-start', padding: '1rem', borderRadius: '1rem', background: `${item.color}08`, border: `1px solid ${item.color}20`, transition: 'all 0.2s' }}>
                    <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '0.75rem', background: `${item.color}18`, border: `1px solid ${item.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color, flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <p style={{ color: '#9090A8', fontSize: '0.78rem', fontFamily: 'Cairo, sans-serif', marginBottom: '0.2rem' }}>{item.label}</p>
                      <p style={{ color: 'white', fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: '0.9rem' }}>{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Quote box */}
              <div style={{ background: 'linear-gradient(145deg, rgba(123,62,255,0.12), rgba(10,0,31,0.5))', border: '1px solid rgba(123,62,255,0.25)', borderRadius: '1rem', padding: '1.5rem' }}>
                <p style={{ color: '#B8B8C7', fontFamily: 'Cairo, sans-serif', fontSize: '0.875rem', lineHeight: 1.9, margin: 0 }}>
                  "كل مشروع عظيم يبدأ بمحادثة بسيطة. نحن هنا للاستماع."
                </p>
                <p style={{ color: '#A066FF', fontSize: '0.8rem', fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginTop: '0.75rem', margin: '0.75rem 0 0' }}>— فريق إكسورا كود</p>
              </div>
            </div>

            {/* Form */}
            <div style={{ background: 'linear-gradient(145deg, rgba(20,0,50,0.7), rgba(10,0,31,0.4))', border: '1px solid rgba(123,62,255,0.2)', borderRadius: '1.5rem', padding: '2.5rem' }}>
              <h3 style={{ color: 'white', fontWeight: 800, fontFamily: 'Cairo, sans-serif', marginBottom: '1.75rem', fontSize: '1.15rem' }}>أرسل لنا تفاصيل مشروعك</h3>
              <form onSubmit={handleSubmit}>
                <div className="grid-form-2" style={{ marginBottom: '1rem' }}>
                  <div><label style={lbl}>الاسم الكامل *</label><input required style={inp} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="أدخل اسمك" /></div>
                  <div><label style={lbl}>البريد الإلكتروني *</label><input required type="email" style={inp} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" /></div>
                </div>
                <div className="grid-form-2" style={{ marginBottom: '1rem' }}>
                  <div><label style={lbl}>رقم الجوال</label><input style={inp} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+967 7XX XXX XXX" /></div>
                  <div>
                    <label style={lbl}>نوع الخدمة</label>
                    <select style={{ ...inp, cursor: 'pointer' }} value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                      <option value="">اختر الخدمة</option>
                      {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={lbl}>الميزانية المتوقعة</label>
                  <select style={{ ...inp, cursor: 'pointer' }} value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}>
                    <option value="">اختر نطاق الميزانية</option>
                    {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={lbl}>تفاصيل المشروع *</label>
                  <textarea required rows={5} style={{ ...inp, resize: 'vertical' }} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="أخبرنا عن مشروعك، أهدافك، والنتيجة التي تتوقعها..." />
                </div>
                {error && <p style={{ color: '#FF6B6B', marginBottom: '1rem', fontFamily: 'Cairo, sans-serif', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>⚠️ {error}</p>}
                <input type="text" name="website" value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} tabIndex={-1} autoComplete="off" />
                <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.7 : 1, fontSize: '1rem', padding: '0.9rem' }}>
                  {loading ? 'جاري الإرسال...' : <><Send size={18} /> إرسال الطلب</>}
                </button>
              </form>
            </div>
          </div>
        </div>
        <style>{`
          input:focus, select:focus, textarea:focus { border-color: rgba(123,62,255,0.6) !important; box-shadow: 0 0 0 3px rgba(123,62,255,0.12); }
        `}</style>
      </section>
    </>
  )
}
