import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function SuccessPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0A001F 0%, #12002B 100%)', padding: '2rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '500px' }}>
        <div style={{ width: '5rem', height: '5rem', borderRadius: '50%', background: 'rgba(123,62,255,0.2)', border: '1px solid rgba(123,62,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
          <CheckCircle size={40} color="#A066FF" />
        </div>
        <h1 style={{ color: 'white', fontWeight: 900, fontSize: '2rem', fontFamily: 'Cairo, sans-serif', marginBottom: '1rem' }}>
          تم إرسال طلبك بنجاح
        </h1>
        <p style={{ color: '#B8B8C7', lineHeight: 1.8, fontFamily: 'Cairo, sans-serif', marginBottom: '2.5rem' }}>
          وصلتنا رسالتك، وسيتواصل معك فريق إكسورا كود في أقرب وقت.
        </p>
        <Link href="/" className="btn-primary" style={{ textDecoration: 'none' }}>العودة للرئيسية</Link>
      </div>
    </div>
  )
}
