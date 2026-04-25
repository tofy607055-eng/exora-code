import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'
import ExoraLogo from '@/components/ExoraLogo'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ background: 'linear-gradient(180deg, #0A001F 0%, #12002B 100%)', borderTop: '1px solid rgba(123,62,255,0.15)', paddingTop: 'clamp(2.5rem, 6vw, 4rem)', paddingBottom: '2rem' }}>
      <div className="container">
        <div className="footer-grid" style={{ marginBottom: '2.5rem' }}>
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', marginBottom: '1rem' }}>
              <ExoraLogo height={30} />
              <span style={{ color: 'white', fontWeight: 800, fontSize: '1.05rem', fontFamily: 'Cairo, sans-serif' }}>إكسورا <span style={{ color: '#A066FF' }}>كود</span></span>
            </Link>
            <p style={{ color: '#B8B8C7', lineHeight: 1.8, fontSize: '0.9rem', marginBottom: '1.5rem', fontFamily: 'Cairo, sans-serif' }}>نصنع منتجات رقمية تصنع الفرق. نطوّر مواقع وتطبيقات وتجارب رقمية تجمع بين التصميم الذكي والأداء العالي.</p>
            <div style={{ display: 'flex', gap: '0.625rem' }}>
              {[{ label: 'X', href: '#' }, { label: 'IG', href: '#' }, { label: 'in', href: '#' }].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.5rem', background: 'rgba(123,62,255,0.15)', border: '1px solid rgba(123,62,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A066FF', textDecoration: 'none', fontWeight: 700, fontSize: '0.75rem' }}>{s.label}</a>
              ))}
            </div>
          </div>
          <div>
            <h3 style={{ color: 'white', fontWeight: 700, marginBottom: '1.25rem', fontFamily: 'Cairo, sans-serif', fontSize: '0.95rem' }}>روابط سريعة</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {[{ label: 'من نحن', href: '/about' }, { label: 'خدماتنا', href: '/services' }, { label: 'أعمالنا', href: '/portfolio' }, { label: 'المدونة', href: '/blog' }, { label: 'الأسئلة الشائعة', href: '/faq' }].map(l => (
                <Link key={l.href} href={l.href} style={{ color: '#B8B8C7', textDecoration: 'none', fontSize: '0.9rem', fontFamily: 'Cairo, sans-serif' }}>{l.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h3 style={{ color: 'white', fontWeight: 700, marginBottom: '1.25rem', fontFamily: 'Cairo, sans-serif', fontSize: '0.95rem' }}>خدماتنا</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {['تطوير المواقع', 'تطبيقات الجوال', 'تصميم UI/UX', 'المتاجر الإلكترونية', 'حلول رقمية'].map(s => (
                <Link key={s} href="/services" style={{ color: '#B8B8C7', textDecoration: 'none', fontSize: '0.9rem', fontFamily: 'Cairo, sans-serif' }}>{s}</Link>
              ))}
            </div>
          </div>
          <div>
            <h3 style={{ color: 'white', fontWeight: 700, marginBottom: '1.25rem', fontFamily: 'Cairo, sans-serif', fontSize: '0.95rem' }}>تواصل معنا</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <a href="mailto:hello@exoracode.com" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', color: '#B8B8C7', textDecoration: 'none' }}><Mail size={15} color="#7B3EFF" /><span style={{ fontFamily: 'Cairo, sans-serif', fontSize: '0.875rem', wordBreak: 'break-all' }}>hello@exoracode.com</span></a>
              <a href="tel:+967000000000" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', color: '#B8B8C7', textDecoration: 'none' }}><Phone size={15} color="#7B3EFF" /><span style={{ fontFamily: 'Cairo, sans-serif', fontSize: '0.875rem' }}>+967 XXX XXX XXX</span></a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', color: '#B8B8C7' }}><span style={{ fontSize: '0.85rem' }}>📍</span><span style={{ fontFamily: 'Cairo, sans-serif', fontSize: '0.875rem' }}>عدن، اليمن</span></div>
            </div>
          </div>
        </div>
        <div className="footer-bottom" style={{ borderTop: '1px solid rgba(123,62,255,0.15)', paddingTop: '1.5rem' }}>
          <p style={{ color: '#B8B8C7', fontSize: '0.875rem', fontFamily: 'Cairo, sans-serif' }}>© {year} جميع الحقوق محفوظة — إكسورا كود، عدن، اليمن.</p>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <Link href="/privacy" style={{ color: '#B8B8C7', textDecoration: 'none', fontSize: '0.875rem', fontFamily: 'Cairo, sans-serif' }}>سياسة الخصوصية</Link>
            <Link href="/terms" style={{ color: '#B8B8C7', textDecoration: 'none', fontSize: '0.875rem', fontFamily: 'Cairo, sans-serif' }}>الشروط والأحكام</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
