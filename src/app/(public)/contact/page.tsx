'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  Mail, Phone, MapPin, Send, MessageCircle,
  Clock, Shield, CheckCircle2, ChevronDown,
  Sparkles, Zap, ArrowLeft
} from 'lucide-react'
import HeroBackground from '@/components/HeroBackground'

const SERVICES = [
  'تطوير موقع إلكتروني',
  'تطوير تطبيق جوال',
  'تصميم UI/UX',
  'متجر إلكتروني',
  'حل رقمي مخصص',
  'نظام إدارة (ERP/POS)',
  'تحسين محركات البحث (SEO)',
  'أخرى',
]
const BUDGETS = [
  'أقل من 500 دولار',
  '500 - 1,500 دولار',
  '1,500 - 5,000 دولار',
  '5,000 - 15,000 دولار',
  'أكثر من 15,000 دولار',
]

const PERKS = [
  { icon: <MessageCircle size={20} />, title: 'رد خلال 24 ساعة', desc: 'نرد على جميع الرسائل سريعاً', color: '#7B3EFF' },
  { icon: <Clock size={20} />,         title: 'استشارة مجانية',   desc: '30 دقيقة بلا تكلفة',        color: '#4ECDC4' },
  { icon: <Shield size={20} />,        title: 'سرية تامة',         desc: 'بياناتك محفوظة آمنة',        color: '#FFD93D' },
  { icon: <Zap size={20} />,           title: 'تنفيذ احترافي',    desc: 'جودة عالمية بفهم محلي',       color: '#FF6B6B' },
]

const CONTACT_INFO = [
  { icon: <Mail size={20} />,    label: 'البريد الإلكتروني', value: 'hello@exoracode.com',  href: 'mailto:hello@exoracode.com', color: '#7B3EFF' },
  { icon: <Phone size={20} />,   label: 'رقم الجوال',        value: '+967 XXX XXX XXX',      href: 'tel:+967000000000',          color: '#4ECDC4' },
  { icon: <MapPin size={20} />,  label: 'الموقع',             value: 'عدن، اليمن',            href: '#',                          color: '#FFD93D' },
]

export default function ContactPage() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', budget: '', message: '', website: '',
  })
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        router.push('/success')
      } else {
        const data = await res.json()
        setError(data.error || 'حدث خطأ أثناء الإرسال. حاول مرة أخرى.')
      }
    } catch {
      setError('حدث خطأ في الاتصال بالخادم.')
    }
    setLoading(false)
  }

  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%',
    padding: '0.9rem 1.1rem',
    borderRadius: '0.875rem',
    background: focusedField === field ? 'rgba(123,62,255,0.08)' : 'rgba(10,0,31,0.5)',
    border: `1.5px solid ${focusedField === field ? 'rgba(123,62,255,0.6)' : 'rgba(123,62,255,0.18)'}`,
    color: 'white',
    fontFamily: 'Cairo, sans-serif',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'all 0.25s ease',
    boxSizing: 'border-box',
    boxShadow: focusedField === field ? '0 0 0 3px rgba(123,62,255,0.12)' : 'none',
  })

  const labelStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    color: '#C8C8D8',
    fontFamily: 'Cairo, sans-serif',
    fontSize: '0.875rem',
    marginBottom: '0.5rem',
    fontWeight: 600,
  }

  return (
    <>
      {/* ══════════════ HERO ══════════════ */}
      <section style={{
        paddingTop: '7rem', paddingBottom: '5rem',
        background: 'linear-gradient(160deg, #0A001F 0%, #100025 50%, #0d0020 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <HeroBackground />

        {/* Decorative blobs */}
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(123,62,255,0.1) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '0', left: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(78,205,196,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center', position: 'relative' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(123,62,255,0.1)', border: '1px solid rgba(123,62,255,0.3)',
            borderRadius: '2rem', padding: '0.45rem 1.25rem', marginBottom: '1.75rem',
          }}>
            <Sparkles size={14} color="#A066FF" />
            <span style={{ color: '#A066FF', fontSize: '0.875rem', fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>تواصل معنا</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 5.5vw, 3.75rem)',
            fontWeight: 900,
            fontFamily: 'Cairo, sans-serif',
            color: 'white',
            lineHeight: 1.15,
            marginBottom: '1.25rem',
          }}>
            لنبني{' '}
            <span style={{ background: 'linear-gradient(135deg, #7B3EFF, #A066FF, #C084FC)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              مشروعك معاً
            </span>
          </h1>

          <p style={{
            color: '#9898B0', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
            fontFamily: 'Cairo, sans-serif', maxWidth: '520px', margin: '0 auto 3rem',
            lineHeight: 2,
          }}>
            أخبرنا عن فكرتك وسيتواصل معك فريقنا خلال 24 ساعة لمناقشة التفاصيل وكيف نحول رؤيتك إلى واقع.
          </p>

          {/* Perks row */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {PERKS.map((p, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.6rem 1.25rem', borderRadius: '1rem',
                background: `${p.color}0D`, border: `1px solid ${p.color}28`,
                backdropFilter: 'blur(10px)',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '0.625rem',
                  background: `${p.color}1A`, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: p.color, flexShrink: 0,
                }}>
                  {p.icon}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: 'white', fontSize: '0.85rem', fontWeight: 700, fontFamily: 'Cairo, sans-serif' }}>{p.title}</div>
                  <div style={{ color: p.color, fontSize: '0.73rem', fontFamily: 'Cairo, sans-serif', opacity: 0.85 }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ MAIN CONTENT ══════════════ */}
      <section style={{
        padding: 'clamp(3rem,8vw,5rem) 0',
        background: 'linear-gradient(180deg, #0d0020 0%, #0A001F 40%, #0c0022 100%)',
        position: 'relative',
      }}>
        {/* Grid line decoration */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(123,62,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(123,62,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.8fr)', gap: '3.5rem', alignItems: 'start' }}>

            {/* ─── LEFT: Info ─── */}
            <div>
              <h2 style={{ color: 'white', fontWeight: 800, fontFamily: 'Cairo, sans-serif', fontSize: '1.4rem', marginBottom: '0.5rem' }}>
                معلومات التواصل
              </h2>
              <p style={{ color: '#8888A0', fontFamily: 'Cairo, sans-serif', fontSize: '0.9rem', lineHeight: 1.85, marginBottom: '2rem' }}>
                تواصل معنا بالطريقة الأنسب لك، أو اترك لنا رسالة وسنتواصل معك.
              </p>

              {/* Contact cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                {CONTACT_INFO.map((item, i) => (
                  <a
                    key={i} href={item.href}
                    style={{
                      display: 'flex', gap: '1rem', alignItems: 'center',
                      padding: '1rem 1.25rem', borderRadius: '1rem',
                      background: `${item.color}08`, border: `1px solid ${item.color}20`,
                      textDecoration: 'none', transition: 'all 0.25s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = `${item.color}14`)}
                    onMouseLeave={e => (e.currentTarget.style.background = `${item.color}08`)}
                  >
                    <div style={{
                      width: 44, height: 44, borderRadius: '0.875rem', flexShrink: 0,
                      background: `${item.color}18`, border: `1px solid ${item.color}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color,
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <p style={{ color: '#8080A0', fontSize: '0.78rem', fontFamily: 'Cairo, sans-serif', marginBottom: '0.2rem' }}>
                        {item.label}
                      </p>
                      <p style={{ color: 'white', fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: '0.95rem', direction: 'ltr', textAlign: 'right' }}>
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Steps */}
              <div style={{
                background: 'linear-gradient(145deg, rgba(123,62,255,0.08), rgba(10,0,31,0.4))',
                border: '1px solid rgba(123,62,255,0.2)', borderRadius: '1.25rem', padding: '1.5rem',
              }}>
                <p style={{ color: '#A066FF', fontSize: '0.78rem', fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  كيف نعمل؟
                </p>
                {[
                  { n: '01', title: 'أرسل طلبك', desc: 'أخبرنا عن مشروعك عبر النموذج' },
                  { n: '02', title: 'نتواصل معك', desc: 'فريقنا يرد خلال 24 ساعة' },
                  { n: '03', title: 'نبدأ التنفيذ', desc: 'نحول فكرتك إلى واقع احترافي' },
                ].map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: i < 2 ? '1.25rem' : 0 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #7B3EFF, #A066FF)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.72rem', fontWeight: 800, color: 'white', flexShrink: 0, fontFamily: 'Cairo, sans-serif',
                    }}>{step.n}</div>
                    <div>
                      <p style={{ color: 'white', fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: '0.9rem' }}>{step.title}</p>
                      <p style={{ color: '#8080A0', fontFamily: 'Cairo, sans-serif', fontSize: '0.8rem', lineHeight: 1.6 }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div style={{ marginTop: '1.5rem', padding: '1.25rem', borderRadius: '1rem', background: 'rgba(123,62,255,0.05)', border: '1px solid rgba(123,62,255,0.12)' }}>
                <p style={{ color: '#9898B8', fontFamily: 'Cairo, sans-serif', fontSize: '0.875rem', lineHeight: 1.9, margin: 0, fontStyle: 'italic' }}>
                  "كل مشروع عظيم يبدأ بمحادثة بسيطة. نحن هنا للاستماع."
                </p>
                <p style={{ color: '#7B3EFF', fontSize: '0.8rem', fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginTop: '0.75rem' }}>
                  — فريق إكسورا كود
                </p>
              </div>
            </div>

            {/* ─── RIGHT: Form ─── */}
            <div style={{
              background: 'linear-gradient(145deg, rgba(20,0,50,0.75), rgba(10,0,31,0.5))',
              border: '1px solid rgba(123,62,255,0.22)',
              borderRadius: '1.75rem',
              padding: 'clamp(1.5rem,4vw,2.75rem)',
              backdropFilter: 'blur(20px)',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Top glow line */}
              <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(123,62,255,0.5), transparent)' }} />

              {/* Form header */}
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '0.75rem',
                    background: 'linear-gradient(135deg, #7B3EFF, #A066FF)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Send size={18} color="white" />
                  </div>
                  <h3 style={{ color: 'white', fontWeight: 800, fontFamily: 'Cairo, sans-serif', fontSize: '1.2rem' }}>
                    أرسل لنا تفاصيل مشروعك
                  </h3>
                </div>
                <p style={{ color: '#8080A0', fontFamily: 'Cairo, sans-serif', fontSize: '0.85rem' }}>
                  جميع الحقول المُعلَّمة بـ <span style={{ color: '#FF6B6B' }}>*</span> إلزامية
                </p>
              </div>

              <form ref={formRef} onSubmit={handleSubmit}>
                {/* Row 1: Name + Email */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={labelStyle}>
                      الاسم الكامل <span style={{ color: '#FF6B6B' }}>*</span>
                    </label>
                    <input
                      required
                      style={inputStyle('name')}
                      value={form.name}
                      onChange={set('name')}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>
                      البريد الإلكتروني <span style={{ color: '#FF6B6B' }}>*</span>
                    </label>
                    <input
                      required
                      type="email"
                      style={inputStyle('email')}
                      value={form.email}
                      onChange={set('email')}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="email@example.com"
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* Row 2: Phone + Service */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={labelStyle}>رقم الجوال / واتساب</label>
                    <input
                      style={inputStyle('phone')}
                      value={form.phone}
                      onChange={set('phone')}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="+967 7XX XXX XXX"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>نوع الخدمة</label>
                    <div style={{ position: 'relative' }}>
                      <select
                        style={{ ...inputStyle('service'), paddingLeft: '2.5rem', cursor: 'pointer', appearance: 'none' }}
                        value={form.service}
                        onChange={set('service')}
                        onFocus={() => setFocusedField('service')}
                        onBlur={() => setFocusedField(null)}
                      >
                        <option value="">اختر الخدمة</option>
                        {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <ChevronDown size={15} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#8080A0', pointerEvents: 'none' }} />
                    </div>
                  </div>
                </div>

                {/* Row 3: Budget */}
                <div style={{ marginBottom: '1rem' }}>
                  <label style={labelStyle}>الميزانية المتوقعة</label>
                  <div style={{ position: 'relative' }}>
                    <select
                      style={{ ...inputStyle('budget'), paddingLeft: '2.5rem', cursor: 'pointer', appearance: 'none' }}
                      value={form.budget}
                      onChange={set('budget')}
                      onFocus={() => setFocusedField('budget')}
                      onBlur={() => setFocusedField(null)}
                    >
                      <option value="">اختر نطاق الميزانية</option>
                      {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                    <ChevronDown size={15} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#8080A0', pointerEvents: 'none' }} />
                  </div>
                </div>

                {/* Row 4: Message */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <label style={labelStyle}>
                    تفاصيل المشروع <span style={{ color: '#FF6B6B' }}>*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    style={{ ...inputStyle('message'), resize: 'vertical', minHeight: '130px' }}
                    value={form.message}
                    onChange={set('message')}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="أخبرنا عن مشروعك، أهدافك، والنتيجة التي تتوقعها من هذا المشروع..."
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-left', marginTop: '0.35rem' }}>
                    <span style={{ color: form.message.length > 1800 ? '#FF6B6B' : '#6060808', fontSize: '0.75rem', fontFamily: 'Cairo, sans-serif' }}>
                      {form.message.length}/2000
                    </span>
                  </div>
                </div>

                {/* Honeypot (hidden) */}
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={set('website')}
                  style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Error */}
                {error && (
                  <div style={{
                    marginBottom: '1.25rem', padding: '0.875rem 1rem',
                    borderRadius: '0.875rem',
                    background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.25)',
                    color: '#FF6B6B', fontFamily: 'Cairo, sans-serif', fontSize: '0.875rem',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                  }}>
                    ⚠️ {error}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '1rem 1.5rem',
                    borderRadius: '0.875rem',
                    background: loading
                      ? 'rgba(123,62,255,0.4)'
                      : 'linear-gradient(135deg, #7B3EFF 0%, #A066FF 50%, #7B3EFF 100%)',
                    border: 'none',
                    color: 'white',
                    fontFamily: 'Cairo, sans-serif',
                    fontWeight: 800,
                    fontSize: '1.05rem',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.625rem',
                    transition: 'all 0.3s ease',
                    boxShadow: loading ? 'none' : '0 8px 30px rgba(123,62,255,0.4)',
                  }}
                  onMouseEnter={e => {
                    if (!loading) {
                      e.currentTarget.style.boxShadow = '0 12px 40px rgba(123,62,255,0.55)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(123,62,255,0.4)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  {loading ? (
                    <>
                      <span style={{
                        width: 18, height: 18, borderRadius: '50%',
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderTopColor: 'white',
                        animation: 'spin 0.8s linear infinite',
                        display: 'inline-block',
                      }} />
                      جاري الإرسال...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      إرسال الطلب
                    </>
                  )}
                </button>

                {/* Privacy note */}
                <p style={{
                  textAlign: 'center', marginTop: '1rem',
                  color: '#6060A0', fontFamily: 'Cairo, sans-serif', fontSize: '0.78rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem',
                }}>
                  <Shield size={12} />
                  بياناتك محفوظة بأمان تام ولن تُشارك مع أي طرف ثالث
                </p>
              </form>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
          @media (max-width: 900px) {
            .contact-grid { grid-template-columns: 1fr !important; }
          }
          @media (max-width: 560px) {
            .form-row-2 { grid-template-columns: 1fr !important; }
          }
          select option { background: #1A0040; color: white; }
        `}</style>
      </section>
    </>
  )
}
