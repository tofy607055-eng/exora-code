import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'
import ExoraLogo from '@/components/ExoraLogo'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{
      background: 'linear-gradient(180deg, #0A001F 0%, #12002B 100%)',
      borderTop: '1px solid rgba(123,62,255,0.15)',
      paddingTop: '4rem', paddingBottom: '2rem',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', marginBottom: '1rem' }}>
              <ExoraLogo height={30} />
              <span style={{ color: 'white', fontWeight: 800, fontSize: '1.1rem', fontFamily: 'Cairo, sans-serif' }}>
                إكسورا <span style={{ color: '#A066FF' }}>كود</span>
              </span>
            </Link>
            <p style={{ color: '#B8B8C7', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              نصنع منتجات رقمية تصنع الفرق. نطوّر مواقع وتطبيقات وتجارب رقمية تجمع بين التصميم الذكي والأداء العالي.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { label: 'X', href: 'https://twitter.com/exoracode' },
                { label: 'IG', href: 'https://instagram.com/exoracode' },
                { label: 'in', href: 'https://linkedin.com/company/exoracode' },
                { label: 'YT', href: '#' },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                  width: '2.25rem', height: '2.25rem', borderRadius: '0.5rem',
                  background: 'rgba(123,62,255,0.15)', border: '1px solid rgba(123,62,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#A066FF', textDecoration: 'none', fontWeight: 700, fontSize: '0.75rem',
                }}>
                  {s.label}
                </a>
              ))}
            </div>

          </div>

          {/* Links */}
          <div>
            <h3 style={{ color: 'white', fontWeight: 700, marginBottom: '1.25rem', fontFamily: 'Cairo, sans-serif' }}>روابط سريعة</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { label: 'من نحن', href: '/about' },
                { label: 'خدماتنا', href: '/services' },
                { label: 'أعمالنا', href: '/portfolio' },
                { label: 'المدونة', href: '/blog' },
                { label: 'الأسئلة الشائعة', href: '/faq' },
              ].map(l => (
                <Link key={l.href} href={l.href} style={{ color: '#B8B8C7', textDecoration: 'none', fontSize: '0.95rem', fontFamily: 'Cairo, sans-serif', transition: 'color 0.2s' }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 style={{ color: 'white', fontWeight: 700, marginBottom: '1.25rem', fontFamily: 'Cairo, sans-serif' }}>خدماتنا</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['تطوير المواقع', 'تطبيقات الجوال', 'تصميم UI/UX', 'المتاجر الإلكترونية', 'حلول رقمية مخصصة'].map(s => (
                <Link key={s} href="/services" style={{ color: '#B8B8C7', textDecoration: 'none', fontSize: '0.95rem', fontFamily: 'Cairo, sans-serif' }}>
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ color: 'white', fontWeight: 700, marginBottom: '1.25rem', fontFamily: 'Cairo, sans-serif' }}>تواصل معنا</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a href="mailto:hello@exoracode.com" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#B8B8C7', textDecoration: 'none' }}>
                <Mail size={16} color="#7B3EFF" /><span style={{ fontFamily: 'Cairo, sans-serif', fontSize: '0.95rem' }}>hello@exoracode.com</span>
              </a>
              <a href="tel:+967000000000" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#B8B8C7', textDecoration: 'none' }}>
                <Phone size={16} color="#7B3EFF" /><span style={{ fontFamily: 'Cairo, sans-serif', fontSize: '0.95rem' }}>+967 XXX XXX XXX</span>
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#B8B8C7' }}>
                <span style={{ fontSize: '0.8rem', color: '#7B3EFF' }}>📍</span>
                <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: '0.875rem' }}>عدن، اليمن</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(123,62,255,0.15)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: '#B8B8C7', fontSize: '0.9rem', fontFamily: 'Cairo, sans-serif' }}>
            © {year} جميع الحقوق محفوظة لدى إكسورا كود — عدن، اليمن.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/privacy" style={{ color: '#B8B8C7', textDecoration: 'none', fontSize: '0.9rem', fontFamily: 'Cairo, sans-serif' }}>سياسة الخصوصية</Link>
            <Link href="/terms" style={{ color: '#B8B8C7', textDecoration: 'none', fontSize: '0.9rem', fontFamily: 'Cairo, sans-serif' }}>الشروط والأحكام</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
