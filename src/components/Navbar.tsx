'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import ExoraLogo from '@/components/ExoraLogo'

const navLinks = [
  { label: 'الرئيسية', href: '/' },
  { label: 'من نحن', href: '/about' },
  { label: 'خدماتنا', href: '/services' },
  { label: 'أعمالنا', href: '/portfolio' },
  { label: 'برامجنا', href: '/products' },
  { label: 'المدونة', href: '/blog' },
  { label: 'تواصل معنا', href: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header
      style={{
        position: 'fixed', top: 0, right: 0, left: 0, zIndex: 50,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(18, 0, 43, 0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(123,62,255,0.2)' : 'none',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4rem' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', flexShrink: 0 }}>
            <ExoraLogo height={30} />
            <span style={{ color: 'white', fontWeight: 800, fontSize: '1.05rem', fontFamily: 'Cairo, sans-serif', letterSpacing: '-0.01em' }}>
              إكسورا <span style={{ color: '#A066FF' }}>كود</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }} className="navbar-desktop">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} style={{
                padding: '0.45rem 0.75rem', borderRadius: '0.5rem', textDecoration: 'none',
                fontSize: '0.9rem', fontWeight: 500, fontFamily: 'Cairo, sans-serif',
                color: pathname === link.href ? '#A066FF' : '#B8B8C7',
                background: pathname === link.href ? 'rgba(123,62,255,0.1)' : 'transparent',
                transition: 'all 0.2s', whiteSpace: 'nowrap',
              }}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
            <Link href="/contact" className="btn-primary navbar-desktop" style={{ padding: '0.45rem 1.1rem', fontSize: '0.875rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              ابدأ مشروعك
            </Link>
            <button onClick={() => setOpen(!open)} className="navbar-mobile-btn" style={{
              background: 'rgba(123,62,255,0.1)', border: '1px solid rgba(123,62,255,0.25)',
              borderRadius: '0.5rem', color: 'white', cursor: 'pointer', padding: '0.5rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div style={{
            background: 'rgba(12,0,35,0.99)', borderRadius: '1rem', marginBottom: '0.75rem',
            padding: '0.75rem', border: '1px solid rgba(123,62,255,0.2)',
            backdropFilter: 'blur(20px)',
          }}>
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} style={{
                display: 'flex', alignItems: 'center', padding: '0.875rem 1rem', borderRadius: '0.625rem',
                textDecoration: 'none', fontFamily: 'Cairo, sans-serif', fontWeight: 600,
                color: pathname === link.href ? '#A066FF' : '#C8C8D7',
                background: pathname === link.href ? 'rgba(123,62,255,0.1)' : 'transparent',
                marginBottom: '0.2rem', fontSize: '1rem', transition: 'all 0.2s',
              }}>
                {link.label}
              </Link>
            ))}
            <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(123,62,255,0.15)' }}>
              <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary" style={{
                width: '100%', justifyContent: 'center', textDecoration: 'none', fontSize: '0.95rem', padding: '0.75rem',
              }}>
                ابدأ مشروعك 🚀
              </Link>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .navbar-desktop { display: flex; }
        .navbar-mobile-btn { display: none; }
        @media (max-width: 900px) {
          .navbar-desktop { display: none !important; }
          .navbar-mobile-btn { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
