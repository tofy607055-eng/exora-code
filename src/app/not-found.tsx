import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0A001F 0%, #12002B 100%)', padding: '2rem' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 'clamp(6rem, 15vw, 10rem)', fontWeight: 900, fontFamily: 'Cairo, sans-serif', background: 'linear-gradient(135deg, #7B3EFF, #A066FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1, marginBottom: '1rem' }}>
          404
        </div>
        <h1 style={{ color: 'white', fontWeight: 800, fontSize: '2rem', fontFamily: 'Cairo, sans-serif', marginBottom: '1rem' }}>
          الصفحة غير موجودة
        </h1>
        <p style={{ color: '#B8B8C7', fontFamily: 'Cairo, sans-serif', marginBottom: '2.5rem', fontSize: '1.05rem' }}>
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <Link href="/" className="btn-primary" style={{ textDecoration: 'none' }}>
          العودة للرئيسية
        </Link>
      </div>
    </div>
  )
}
