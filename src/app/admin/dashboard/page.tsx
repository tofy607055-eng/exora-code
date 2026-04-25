import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { MessageSquare, Briefcase, Wrench, BookOpen, ArrowLeft } from 'lucide-react'

async function getStats() {
  try {
    const [messages, projects, services, posts] = await Promise.all([
      prisma.message.count(),
      prisma.project.count(),
      prisma.service.count(),
      prisma.blogPost.count(),
    ])
    const newMessages = await prisma.message.count({ where: { status: 'new' } })
    const recentMessages = await prisma.message.findMany({ take: 5, orderBy: { createdAt: 'desc' } })
    return { messages, projects, services, posts, newMessages, recentMessages }
  } catch {
    return { messages: 0, projects: 0, services: 0, posts: 0, newMessages: 0, recentMessages: [] }
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const cards = [
    { label: 'إجمالي الرسائل', value: stats.messages, icon: <MessageSquare size={24} />, badge: stats.newMessages > 0 ? `${stats.newMessages} جديدة` : null, href: '/admin/messages' },
    { label: 'المشاريع', value: stats.projects, icon: <Briefcase size={24} />, href: '/admin/portfolio' },
    { label: 'الخدمات', value: stats.services, icon: <Wrench size={24} />, href: '/admin/services' },
    { label: 'المقالات', value: stats.posts, icon: <BookOpen size={24} />, href: '/admin/blog' },
  ]

  const statusColors: Record<string, string> = { new: '#A066FF', following: '#FFD93D', replied: '#4ECDC4', closed: '#B8B8C7' }
  const statusLabels: Record<string, string> = { new: 'جديدة', following: 'قيد المتابعة', replied: 'تم الرد', closed: 'مغلقة' }

  return (
    <div>
      <h1 style={{ color: 'white', fontWeight: 800, fontSize: '1.75rem', marginBottom: '0.5rem' }}>مرحباً بك 👋</h1>
      <p style={{ color: '#B8B8C7', marginBottom: '2.5rem' }}>هذه نظرة عامة على موقع إكسورا كود</p>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {cards.map(card => (
          <Link key={card.href} href={card.href} style={{ textDecoration: 'none' }}>
            <div className="admin-card" style={{ padding: '1.5rem', borderRadius: '1rem', transition: 'all 0.2s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ width: '3rem', height: '3rem', borderRadius: '0.75rem', background: 'rgba(123,62,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A066FF' }}>
                  {card.icon}
                </div>
                {card.badge && <span style={{ background: 'rgba(123,62,255,0.2)', color: '#A066FF', fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '1rem' }}>{card.badge}</span>}
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: 'white', marginBottom: '0.25rem' }}>{card.value}</div>
              <div style={{ color: '#B8B8C7', fontSize: '0.9rem' }}>{card.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Messages */}
      <div className="admin-card" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>آخر الرسائل</h2>
          <Link href="/admin/messages" style={{ color: '#A066FF', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            عرض الكل <ArrowLeft size={14} />
          </Link>
        </div>
        {stats.recentMessages.length === 0 ? (
          <p style={{ color: '#B8B8C7', textAlign: 'center', padding: '2rem' }}>لا توجد رسائل بعد</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {stats.recentMessages.map((msg: { id: string; name: string; email: string; service?: string | null; status: string; createdAt: Date }) => (
              <Link key={msg.id} href="/admin/messages" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '0.75rem', background: 'rgba(255,255,255,0.03)', textDecoration: 'none', border: '1px solid rgba(123,62,255,0.1)' }}>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'linear-gradient(135deg, #7B3EFF, #A066FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, flexShrink: 0 }}>
                  {msg.name.charAt(0)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: 'white', fontWeight: 600, fontSize: '0.925rem', marginBottom: '0.2rem' }}>{msg.name}</p>
                  <p style={{ color: '#B8B8C7', fontSize: '0.8rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.email} • {msg.service || 'غير محدد'}</p>
                </div>
                <span style={{ background: `${statusColors[msg.status] || '#B8B8C7'}22`, color: statusColors[msg.status] || '#B8B8C7', fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '1rem', flexShrink: 0 }}>
                  {statusLabels[msg.status] || msg.status}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
