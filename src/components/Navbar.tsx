'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import LangToggle from '@/components/LangToggle'
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

  return (
    <header
      style={{
        position: 'fixed', top: 0, right: 0, left: 0, zIndex: 50,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(18, 0, 43, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(123,62,255,0.2)' : 'none',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4.5rem' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
            <ExoraLogo height={34} />
            <span style={{ color: 'white', fontWeight: 800, fontSize: '1.15rem', fontFamily: 'Cairo, sans-serif', letterSpacing: '-0.01em' }}>
              إكسورا <span style={{ color: '#A066FF' }}>كود</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="hidden-mobile">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} style={{
                padding: '0.5rem 0.875rem', borderRadius: '0.5rem', textDecoration: 'none',
                fontSize: '0.95rem', fontWeight: 500, fontFamily: 'Cairo, sans-serif',
                color: pathname === link.href ? '#A066FF' : '#B8B8C7',
                background: pathname === link.href ? 'rgba(123,62,255,0.1)' : 'transparent',
                transition: 'all 0.2s',
              }}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <LangToggle />
            <Link href="/contact" className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem', textDecoration: 'none' }}>
              ابدأ مشروعك
            </Link>
            <button onClick={() => setOpen(!open)} className="show-mobile" style={{
              background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '0.5rem',
            }}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div style={{
            background: 'rgba(18,0,43,0.98)', borderRadius: '1rem', marginBottom: '1rem',
            padding: '1rem', border: '1px solid rgba(123,62,255,0.2)',
          }}>
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} style={{
                display: 'block', padding: '0.75rem 1rem', borderRadius: '0.5rem',
                textDecoration: 'none', fontFamily: 'Cairo, sans-serif', fontWeight: 500,
                color: pathname === link.href ? '#A066FF' : '#B8B8C7', marginBottom: '0.25rem',
              }}>
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .hidden-mobile { display: flex; }
        .show-mobile { display: none; }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
