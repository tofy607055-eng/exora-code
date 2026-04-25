'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, MessageCircle, ArrowLeft } from 'lucide-react'

type FAQ = { id: string; question: string; answer: string; order: number; visible: boolean }

export default function FAQClient({ faqs }: { faqs: FAQ[] }) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null)

  return (
    <section style={{ padding: '6rem 0', background: 'linear-gradient(180deg, #0A001F 0%, #12002B 100%)', position: 'relative' }}>
      {/* Subtle bg glow */}
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(123,62,255,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(123,62,255,0.1)', border: '1px solid rgba(123,62,255,0.25)', borderRadius: '2rem', padding: '0.4rem 1.25rem', marginBottom: '1.25rem' }}>
            <MessageCircle size={14} color="#A066FF" />
            <span style={{ color: '#A066FF', fontSize: '0.85rem', fontFamily: 'Cairo, sans-serif', fontWeight: 600 }}>الأسئلة الشائعة</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 900, fontFamily: 'Cairo, sans-serif', color: 'white', lineHeight: 1.2, marginBottom: '1rem' }}>
            إجابات على{' '}
            <span style={{ background: 'linear-gradient(135deg, #7B3EFF, #C084FC)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              أسئلتك
            </span>
          </h2>
          <p style={{ color: '#9090A8', fontFamily: 'Cairo, sans-serif', fontSize: '1rem', lineHeight: 1.7 }}>
            أكثر الأسئلة التي تردنا من عملائنا — إذا لم تجد ما تبحث عنه تواصل معنا مباشرة
          </p>
        </div>

        {/* Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {faqs.map((faq, i) => {
            const isOpen = openId === faq.id
            return (
              <div
                key={faq.id}
                style={{
                  borderRadius: '1rem',
                  border: `1px solid ${isOpen ? 'rgba(123,62,255,0.4)' : 'rgba(123,62,255,0.12)'}`,
                  background: isOpen
                    ? 'linear-gradient(135deg, rgba(123,62,255,0.1), rgba(10,0,31,0.8))'
                    : 'rgba(18,0,43,0.4)',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s, background 0.3s',
                  boxShadow: isOpen ? '0 4px 24px rgba(123,62,255,0.12)' : 'none',
                }}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '1.25rem 1.5rem', background: 'none', border: 'none', cursor: 'pointer',
                    gap: '1rem', textAlign: 'right',
                  }}
                  id={`faq-btn-${faq.id}`}
                  aria-expanded={isOpen}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', flex: 1 }}>
                    <span style={{
                      width: '2rem', height: '2rem', borderRadius: '0.5rem', flexShrink: 0,
                      background: isOpen ? 'rgba(123,62,255,0.25)' : 'rgba(123,62,255,0.08)',
                      border: `1px solid ${isOpen ? 'rgba(123,62,255,0.5)' : 'rgba(123,62,255,0.15)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: isOpen ? '#A066FF' : '#7070A0',
                      fontSize: '0.75rem', fontWeight: 800, fontFamily: 'Cairo, sans-serif',
                      transition: 'all 0.3s',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{
                      color: isOpen ? 'white' : '#C8C8D8',
                      fontFamily: 'Cairo, sans-serif', fontWeight: isOpen ? 700 : 500,
                      fontSize: '1rem', lineHeight: 1.4, transition: 'color 0.3s',
                    }}>
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    size={18}
                    color={isOpen ? '#A066FF' : '#7070A0'}
                    style={{ flexShrink: 0, transition: 'transform 0.3s', transform: isOpen ? 'rotate(180deg)' : 'none' }}
                  />
                </button>

                <div style={{
                  maxHeight: isOpen ? '400px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
                }}>
                  <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', paddingRight: '4rem' }}>
                    <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(123,62,255,0.3), transparent)', marginBottom: '1rem' }} />
                    <p style={{
                      color: '#B8B8C7', fontFamily: 'Cairo, sans-serif',
                      lineHeight: 1.85, fontSize: '0.925rem',
                    }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem', borderRadius: '1.25rem', background: 'rgba(123,62,255,0.06)', border: '1px solid rgba(123,62,255,0.15)' }}>
          <p style={{ color: '#9090A8', fontFamily: 'Cairo, sans-serif', fontSize: '0.9rem', marginBottom: '1rem' }}>
            لم تجد إجابة سؤالك؟
          </p>
          <Link href="/contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'linear-gradient(135deg, #7B3EFF, #A066FF)',
            color: 'white', textDecoration: 'none',
            padding: '0.75rem 1.75rem', borderRadius: '0.875rem',
            fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: '0.925rem',
          }}>
            تواصل معنا مباشرة <ArrowLeft size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
