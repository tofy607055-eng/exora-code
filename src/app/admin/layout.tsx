'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { Menu } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  // صفحة تسجيل الدخول لها تصميمها المستقل بدون sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0A001F', fontFamily: 'Cairo, sans-serif' }}>
      {/* Desktop Sidebar */}
      <div className="admin-sidebar-desktop">
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex' }}>
          <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)' }} />
          <div style={{ position: 'relative', zIndex: 51 }}>
            <AdminSidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden' }}>
        {/* Header */}
        <header style={{ background: 'rgba(10,0,31,0.8)', borderBottom: '1px solid rgba(123,62,255,0.15)', padding: '0 1.5rem', height: '4rem', display: 'flex', alignItems: 'center', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 40 }}>
          <button onClick={() => setSidebarOpen(true)} className="admin-mobile-menu" style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', marginLeft: '1rem', padding: '0.5rem', display: 'none' }}>
            <Menu size={22} />
          </button>
          <h2 style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>لوحة التحكم</h2>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
          {children}
        </main>
      </div>

      <style>{`
        .admin-sidebar-desktop { display: block; }
        .admin-mobile-menu { display: none !important; }
        @media (max-width: 768px) {
          .admin-sidebar-desktop { display: none; }
          .admin-mobile-menu { display: flex !important; }
        }
      `}</style>
    </div>
  )
}

