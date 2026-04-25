'use client'
import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import HeroBackground from '@/components/HeroBackground'

type FAQ = { id: string; question: string; answer: string }

const fallbackFaqs: FAQ[] = [
  { id: 'f1', question: 'كم يستغرق بناء موقع ويب احترافي؟', answer: 'يعتمد الوقت على حجم المشروع وتعقيده. الموقع البسيط يستغرق 2-4 أسابيع، بينما المشاريع المتوسطة والكبيرة قد تحتاج من 1-3 أشهر. نحرص دائماً على الالتزام بالموعد المتفق عليه.' },
  { id: 'f2', question: 'ما التقنيات التي تستخدمونها؟', answer: 'نستخدم أحدث التقنيات: Next.js وReact للويب، Flutter وReact Native للجوال، Node.js للخادم، وقواعد بيانات PostgreSQL وMongoDB. نختار التقنية الأنسب لكل مشروع.' },
  { id: 'f3', question: 'هل تقدمون خدمات الصيانة بعد الإطلاق؟', answer: 'نعم، نقدم باقات صيانة شهرية تشمل: تحديثات الأمان، النسخ الاحتياطية، إصلاح الأخطاء، وإضافة تحسينات بسيطة. هدفنا أن تكون شراكة طويلة الأمد.' },
  { id: 'f4', question: 'كيف يتم التواصل خلال المشروع؟', answer: 'نتواصل عبر واتساب والبريد الإلكتروني ومكالمات Zoom الأسبوعية. نوفر تقارير دورية وتحديثات منتظمة حتى تكون على اطلاع دائم بتقدم مشروعك.' },
  { id: 'f5', question: 'هل يمكنني تعديل الموقع بنفسي بعد التسليم؟', answer: 'بالطبع! نبني لوحات تحكم سهلة الاستخدام تتيح لك تعديل المحتوى دون خبرة تقنية. كما نقدم تدريباً مجانياً عند التسليم.' },
]

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [open, setOpen] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/faq')
      .then(r => r.json())
      .then(d => setFaqs(Array.isArray(d) && d.length ? d : fallbackFaqs))
      .catch(() => setFaqs(fallbackFaqs))
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="section-hero" style={{ background: 'linear-gradient(135deg, #0A001F 0%, #12002B 100%)' }}>
        <HeroBackground />
        <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
          <div className="badge" style={{ marginBottom: '1.5rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A066FF', display: 'block' }} />
            الأسئلة الشائعة
          </div>
          <h1 className="section-title" style={{ color: 'white', marginBottom: '1rem' }}>
            كيف <span className="text-gradient">نساعدك؟</span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '500px', margin: '0 auto' }}>
            إجابات على أكثر الأسئلة شيوعاً حول خدماتنا وأسلوب عملنا
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="section" style={{ background: '#0A001F' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          {faqs.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#B8B8C7', padding: '4rem', fontFamily: 'Cairo, sans-serif' }}>
              <div className="skeleton" style={{ height: '80px', borderRadius: '1rem', marginBottom: '1rem' }} />
              <div className="skeleton" style={{ height: '80px', borderRadius: '1rem', marginBottom: '1rem' }} />
              <div className="skeleton" style={{ height: '80px', borderRadius: '1rem' }} />
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {faqs.map((faq, idx) => (
                <div key={faq.id} style={{
                  borderRadius: '1rem', overflow: 'hidden',
                  background: open === faq.id ? 'rgba(123,62,255,0.08)' : 'rgba(30,0,64,0.5)',
                  border: `1px solid ${open === faq.id ? 'rgba(123,62,255,0.35)' : 'rgba(123,62,255,0.15)'}`,
                  transition: 'all 0.25s ease',
                }}>
                  <button
                    onClick={() => setOpen(open === faq.id ? null : faq.id)}
                    style={{
                      width: '100%', padding: 'clamp(1rem, 3vw, 1.375rem) clamp(1rem, 4vw, 1.5rem)',
                      background: 'none', border: 'none',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      cursor: 'pointer', gap: '1rem', textAlign: 'right',
                    }}
                  >
                    <span style={{ color: 'white', fontWeight: 700, fontFamily: 'Cairo, sans-serif', flex: 1, fontSize: 'clamp(0.9rem, 2.5vw, 1rem)', lineHeight: 1.5 }}>
                      <span style={{ color: '#A066FF', fontWeight: 900, marginLeft: '0.5rem', fontSize: '0.85rem' }}>{String(idx + 1).padStart(2, '0')}.</span>
                      {faq.question}
                    </span>
                    <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: open === faq.id ? 'rgba(123,62,255,0.25)' : 'rgba(123,62,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <ChevronDown size={18} color="#A066FF" style={{ transform: open === faq.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                    </div>
                  </button>
                  {open === faq.id && (
                    <div style={{ padding: '0 clamp(1rem, 4vw, 1.5rem) clamp(1rem, 3vw, 1.375rem)', borderTop: '1px solid rgba(123,62,255,0.15)' }}>
                      <p style={{ color: '#C8C8D8', lineHeight: 1.85, fontFamily: 'Cairo, sans-serif', paddingTop: '1rem', fontSize: 'clamp(0.875rem, 2.5vw, 0.975rem)' }}>
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div style={{ marginTop: '3rem', textAlign: 'center', padding: 'clamp(1.5rem, 5vw, 2.5rem)', borderRadius: '1.25rem', background: 'linear-gradient(145deg, rgba(123,62,255,0.1), rgba(10,0,31,0.5))', border: '1px solid rgba(123,62,255,0.2)' }}>
            <p style={{ color: '#B8B8C7', fontFamily: 'Cairo, sans-serif', marginBottom: '1.25rem', fontSize: 'clamp(0.9rem, 2.5vw, 1rem)' }}>
              لم تجد إجابة لسؤالك؟
            </p>
            <a href="/contact" className="btn-primary" style={{ textDecoration: 'none' }}>تواصل معنا مباشرة</a>
          </div>
        </div>
      </section>
    </>
  )
}
