import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { Star } from 'lucide-react'

export const metadata: Metadata = { title: 'آراء العملاء | إكسورا كود' }

async function getTestimonials() {
  try { return await prisma.testimonial.findMany({ where: { visible: true }, orderBy: { createdAt: 'desc' } }) }
  catch { return [] }
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials()
  const list = testimonials.length ? testimonials : [
    { id: '1', clientName: 'أحمد العمري', projectType: 'موقع إلكتروني', rating: 5, text: 'تجربة رائعة مع إكسورا كود! الفريق محترف جداً.' },
    { id: '2', clientName: 'سارة الزهراني', projectType: 'تطبيق جوال', rating: 5, text: 'طوّروا لي تطبيقاً رائعاً بتصميم احترافي.' },
    { id: '3', clientName: 'محمد القحطاني', projectType: 'متجر إلكتروني', rating: 5, text: 'المتجر الذي بنوه زاد مبيعاتي بشكل ملحوظ.' },
  ]

  return (
    <>
      <section style={{ paddingTop: '8rem', paddingBottom: '4rem', background: 'linear-gradient(135deg, #0A001F 0%, #12002B 100%)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
          <div className="accent-line" />
          <h1 className="section-title" style={{ marginBottom: '1rem', fontFamily: 'Cairo, sans-serif' }}>آراء عملاؤنا</h1>
          <p className="section-subtitle" style={{ maxWidth: '500px', margin: '0 auto', fontFamily: 'Cairo, sans-serif' }}>
            تجارب حقيقية من عملاء يثقون بنا ويؤمنون بجودة عملنا
          </p>
        </div>
      </section>
      <section style={{ padding: '4rem 0', background: '#0A001F' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {list.map((t: { id: string; clientName: string; projectType?: string | null; rating: number; text: string }) => (
              <div key={t.id} className="card-dark" style={{ padding: '2rem', borderRadius: '1rem' }}>
                <div style={{ display: 'flex', marginBottom: '1rem' }}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="#FFD700" color="#FFD700" />
                  ))}
                </div>
                <p style={{ color: '#B8B8C7', lineHeight: 1.8, marginBottom: '1.5rem', fontFamily: 'Cairo, sans-serif' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'linear-gradient(135deg, #7B3EFF, #A066FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontFamily: 'Cairo, sans-serif' }}>
                    {t.clientName.charAt(0)}
                  </div>
                  <div>
                    <p style={{ color: 'white', fontWeight: 700, fontFamily: 'Cairo, sans-serif' }}>{t.clientName}</p>
                    <p style={{ color: '#A066FF', fontSize: '0.8rem', fontFamily: 'Cairo, sans-serif' }}>{t.projectType}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
