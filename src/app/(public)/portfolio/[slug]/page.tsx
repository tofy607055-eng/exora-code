import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { ArrowRight, ExternalLink, MessageSquare } from 'lucide-react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

const categoryColors: Record<string, string> = {
  'مواقع': '#7B3EFF', 'تطبيقات': '#FF6B6B', 'UI/UX': '#4ECDC4',
  'متاجر': '#FFD93D', 'هوية بصرية': '#A066FF',
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  try {
    const project = await prisma.project.findUnique({ where: { slug } })
    return {
      title: project ? `${project.title} | إكسورا كود` : 'مشروع | إكسورا كود',
      description: project?.description,
    }
  } catch {
    return { title: 'مشروع | إكسورا كود' }
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let project
  try {
    project = await prisma.project.findUnique({ where: { slug, published: true } })
  } catch { return notFound() }
  if (!project) return notFound()

  const techs = (() => { try { return JSON.parse(project.technologies || '[]') } catch { return [] } })()
  const color = categoryColors[project.category] || '#7B3EFF'

  return (
    <>
      <section style={{ paddingTop: '8rem', paddingBottom: '4rem', background: 'linear-gradient(135deg, #0A001F 0%, #12002B 100%)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          <Link href="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#A066FF', textDecoration: 'none', fontFamily: 'Cairo, sans-serif', marginBottom: '2rem' }}>
            <ArrowRight size={16} /> العودة للأعمال
          </Link>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: `${color}15`, border: `1px solid ${color}30`, borderRadius: '1rem', padding: '0.3rem 0.875rem', marginBottom: '1.5rem', marginRight: '1rem' }}>
            <span style={{ color, fontSize: '0.82rem', fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>{project.category}</span>
          </div>
          <h1 style={{ fontFamily: 'Cairo, sans-serif', color: 'white', fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
            {project.title}
          </h1>
          <p style={{ color: '#B8B8C7', fontSize: '1.1rem', fontFamily: 'Cairo, sans-serif' }}>{project.description}</p>
        </div>
      </section>

      <section style={{ padding: '4rem 0', background: '#0A001F' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          {/* Project Image */}
          <div style={{
            height: '400px', borderRadius: '1.5rem', marginBottom: '3rem',
            background: `linear-gradient(135deg, ${color}20, ${color}05)`,
            border: `1px solid ${color}25`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: '5rem' }}>
              {project.category === 'مواقع' ? '🌐' : project.category === 'تطبيقات' ? '📱' : project.category === 'متاجر' ? '🛒' : '🎨'}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
            <div>
              {project.details && (
                <div style={{ marginBottom: '2rem' }}>
                  <h2 style={{ color: 'white', fontWeight: 700, fontFamily: 'Cairo, sans-serif', marginBottom: '1rem' }}>عن المشروع</h2>
                  <p style={{ color: '#B8B8C7', lineHeight: 1.9, fontFamily: 'Cairo, sans-serif' }}>{project.details}</p>
                </div>
              )}
              {project.problem && (
                <div style={{ marginBottom: '2rem' }}>
                  <h2 style={{ color: 'white', fontWeight: 700, fontFamily: 'Cairo, sans-serif', marginBottom: '1rem' }}>التحدي</h2>
                  <p style={{ color: '#B8B8C7', lineHeight: 1.9, fontFamily: 'Cairo, sans-serif' }}>{project.problem}</p>
                </div>
              )}
              {project.solution && (
                <div style={{ marginBottom: '2rem' }}>
                  <h2 style={{ color: 'white', fontWeight: 700, fontFamily: 'Cairo, sans-serif', marginBottom: '1rem' }}>الحل</h2>
                  <p style={{ color: '#B8B8C7', lineHeight: 1.9, fontFamily: 'Cairo, sans-serif' }}>{project.solution}</p>
                </div>
              )}
              {project.result && (
                <div>
                  <h2 style={{ color: 'white', fontWeight: 700, fontFamily: 'Cairo, sans-serif', marginBottom: '1rem' }}>النتيجة</h2>
                  <p style={{ color: '#B8B8C7', lineHeight: 1.9, fontFamily: 'Cairo, sans-serif' }}>{project.result}</p>
                </div>
              )}
            </div>
            <div>
              <div className="card-dark" style={{ padding: '2rem', borderRadius: '1rem', marginBottom: '1.5rem' }}>
                <h3 style={{ color: 'white', fontWeight: 700, fontFamily: 'Cairo, sans-serif', marginBottom: '1rem' }}>التقنيات المستخدمة</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {techs.length > 0 ? techs.map((tech: string) => (
                    <span key={tech} style={{
                      padding: '0.25rem 0.75rem', borderRadius: '1rem',
                      background: `${color}15`, border: `1px solid ${color}30`,
                      color, fontSize: '0.85rem', fontFamily: 'Cairo, sans-serif',
                    }}>{tech}</span>
                  )) : (
                    <p style={{ color: '#B8B8C7', fontSize: '0.9rem', fontFamily: 'Cairo, sans-serif' }}>غير محدد</p>
                  )}
                </div>
              </div>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ textDecoration: 'none', width: '100%', justifyContent: 'center', display: 'flex', marginBottom: '0.75rem' }}>
                  <ExternalLink size={18} /> عرض المشروع
                </a>
              )}
              <Link href="/contact" className="btn-primary" style={{ textDecoration: 'none', width: '100%', justifyContent: 'center', display: 'flex' }}>
                <MessageSquare size={18} /> تنفيذ مشروع مشابه
              </Link>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){section > div > div:last-child{grid-template-columns:1fr !important;}}`}</style>
      </section>
    </>
  )
}
