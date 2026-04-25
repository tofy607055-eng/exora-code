'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useState } from 'react'
import ExoraLogo from '@/components/ExoraLogo'
import {
  LayoutDashboard, MessageSquare, Briefcase, BookOpen,
  DollarSign, Settings, LogOut, ChevronLeft,
  ChevronDown, X, BarChart2, Layers, Home, Users, Wrench,
  HelpCircle, Star, Phone, FileText, Tag, ShieldCheck, Sparkles
} from 'lucide-react'

const navItems = [
  { label: 'الرئيسية',         href: '/admin/dashboard',  icon: <LayoutDashboard size={18} /> },
  { label: 'الإحصائيات',       href: '/admin/analytics',  icon: <BarChart2 size={18} /> },
  { label: 'الرسائل',          href: '/admin/messages',   icon: <MessageSquare size={18} /> },
  { label: 'الأعمال',          href: '/admin/portfolio',  icon: <Briefcase size={18} /> },
  { label: 'المدونة',          href: '/admin/blog',       icon: <BookOpen size={18} /> },
  { label: 'برامجنا 💻',       href: '/admin/products',   icon: <Tag size={18} /> },
  { label: 'الباقات والأسعار', href: '/admin/pricing',    icon: <DollarSign size={18} /> },
  { label: 'نصوص الهيرو 🎯',   href: '/admin/hero',       icon: <Sparkles size={18} /> },
  { label: 'الإعدادات',        href: '/admin/settings',   icon: <Settings size={18} /> },
]

const pageItems = [
  { label: 'الرئيسية', href: '/admin/pages/home', icon: <Home size={16} /> },
  { label: 'من نحن', href: '/admin/pages/about', icon: <Users size={16} /> },
  { label: 'الخدمات', href: '/admin/pages/services', icon: <Wrench size={16} /> },
  { label: 'برامجنا', href: '/admin/pages/products', icon: <Tag size={16} /> },
  { label: 'التواصل', href: '/admin/pages/contact', icon: <Phone size={16} /> },
  { label: 'الأسئلة الشائعة', href: '/admin/pages/faq', icon: <HelpCircle size={16} /> },
  { label: 'آراء العملاء', href: '/admin/pages/testimonials', icon: <Star size={16} /> },
  { label: 'الخصوصية', href: '/admin/pages/privacy', icon: <ShieldCheck size={16} /> },
  { label: 'الشروط', href: '/admin/pages/terms', icon: <FileText size={16} /> },
]

export default function AdminSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()
  const [pagesOpen, setPagesOpen] = useState(pathname.startsWith('/admin/pages'))

  const linkStyle = (href: string, isExact = false): React.CSSProperties => {
    const active = isExact ? pathname === href : (href !== '/admin/dashboard' && pathname.startsWith(href)) || pathname === href
    return {
      display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.875rem',
      borderRadius: '0.75rem', textDecoration: 'none', marginBottom: '0.2rem', transition: 'all 0.2s',
      background: active ? 'rgba(123,62,255,0.2)' : 'transparent',
      border: active ? '1px solid rgba(123,62,255,0.3)' : '1px solid transparent',
      color: active ? '#A066FF' : '#B8B8C7',
      fontWeight: active ? 600 : 400, fontSize: '0.9rem',
    }
  }

  return (
    <div className="admin-sidebar" style={{ width: '256px', height: '100vh', display: 'flex', flexDirection: 'column', padding: '1.5rem 0', position: 'sticky', top: 0, fontFamily: 'Cairo, sans-serif', overflowY: 'auto' }}>
      {/* Logo */}
      <div style={{ padding: '0 1.25rem 1.25rem', borderBottom: '1px solid rgba(123,62,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <ExoraLogo height={26} />
          <span style={{ color: 'white', fontWeight: 800, fontSize: '0.95rem', fontFamily: 'Cairo, sans-serif' }}>
            إكسورا <span style={{ color: '#A066FF' }}>كود</span>
          </span>
        </Link>
        {onClose && <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#B8B8C7', cursor: 'pointer' }}><X size={18} /></button>}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '1rem 0.75rem' }}>
        {navItems.map(item => (
          <Link key={item.href} href={item.href} onClick={onClose} style={linkStyle(item.href, item.href === '/admin/dashboard')}>
            {item.icon} {item.label}
            {(item.href === '/admin/dashboard' ? pathname === item.href : pathname.startsWith(item.href)) && (
              <ChevronLeft size={14} style={{ marginRight: 'auto' }} />
            )}
          </Link>
        ))}

        {/* ─── واجهات النظام ─── */}
        <div style={{ marginTop: '0.75rem', borderTop: '1px solid rgba(123,62,255,0.1)', paddingTop: '0.75rem' }}>
          <button
            onClick={() => setPagesOpen(p => !p)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.65rem 0.875rem', borderRadius: '0.75rem', border: 'none', cursor: 'pointer',
              background: pagesOpen ? 'rgba(123,62,255,0.12)' : 'transparent',
              color: pagesOpen ? '#A066FF' : '#B8B8C7', fontSize: '0.9rem', fontFamily: 'Cairo, sans-serif',
              fontWeight: 600, transition: 'all 0.2s', textAlign: 'right',
            }}
          >
            <Layers size={18} />
            <span style={{ flex: 1 }}>واجهات النظام</span>
            <ChevronDown size={15} style={{ transition: 'transform 0.25s', transform: pagesOpen ? 'rotate(180deg)' : 'none' }} />
          </button>

          {pagesOpen && (
            <div style={{ paddingRight: '1rem', paddingTop: '0.2rem' }}>
              {pageItems.map(item => (
                <Link key={item.href} href={item.href} onClick={onClose} style={{ ...linkStyle(item.href), fontSize: '0.84rem', padding: '0.5rem 0.75rem' }}>
                  {item.icon} {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Logout */}
      <div style={{ padding: '1rem 0.75rem', borderTop: '1px solid rgba(123,62,255,0.15)' }}>
        <button onClick={() => signOut({ callbackUrl: '/admin/login' })} style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
          padding: '0.75rem 1rem', borderRadius: '0.75rem', background: 'rgba(255,107,107,0.1)',
          border: '1px solid rgba(255,107,107,0.2)', color: '#FF6B6B', cursor: 'pointer', fontSize: '0.9rem',
          fontFamily: 'Cairo, sans-serif',
        }}>
          <LogOut size={18} /> تسجيل الخروج
        </button>
      </div>
    </div>
  )
}

