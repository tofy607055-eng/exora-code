'use client'
import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

type FAQ = { id: string; question: string; answer: string }

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [open, setOpen] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/faq').then(r => r.json()).then(setFaqs).catch(() => {})
  }, [])

  return (
    <>
      <section style={{ paddingTop: '8rem', paddingBottom: '4rem', background: 'linear-gradient(135deg, #0A001F 0%, #12002B 100%)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
          <div className="accent-line" />
          <h1 className="section-title" style={{ marginBottom: '1rem', fontFamily: 'Cairo, sans-serif' }}>الأسئلة الشائعة</h1>
          <p className="section-subtitle" style={{ maxWidth: '500px', margin: '0 auto', fontFamily: 'Cairo, sans-serif' }}>
            إجابات على أكثر الأسئلة شيوعاً حول خدماتنا وأسلوب عملنا
          </p>
        </div>
      </section>
      <section style={{ padding: '4rem 0', background: '#0A001F' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem' }}>
          {faqs.length === 0 && (
            <div style={{ textAlign: 'center', color: '#B8B8C7', padding: '4rem', fontFamily: 'Cairo, sans-serif' }}>جاري التحميل...</div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map(faq => (
              <div key={faq.id} className="card-dark" style={{ borderRadius: '1rem', overflow: 'hidden' }}>
                <button
                  onClick={() => setOpen(open === faq.id ? null : faq.id)}
                  style={{
                    width: '100%', padding: '1.25rem 1.5rem', background: 'none', border: 'none',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    cursor: 'pointer', gap: '1rem',
                  }}
                >
                  <span style={{ color: 'white', fontWeight: 600, fontFamily: 'Cairo, sans-serif', textAlign: 'right', flex: 1 }}>
                    {faq.question}
                  </span>
                  <ChevronDown size={20} color="#A066FF" style={{ transform: open === faq.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', flexShrink: 0 }} />
                </button>
                {open === faq.id && (
                  <div style={{ padding: '0 1.5rem 1.25rem', borderTop: '1px solid rgba(123,62,255,0.1)' }}>
                    <p style={{ color: '#B8B8C7', lineHeight: 1.8, fontFamily: 'Cairo, sans-serif', paddingTop: '1rem' }}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
