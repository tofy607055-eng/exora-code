import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { ArrowRight, Calendar, User, Clock, BookOpen, Tag, ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

const catColors: Record<string, string> = {
  'تجربة المستخدم': '#7B3EFF', 'تقنية': '#4ECDC4', 'الأداء': '#FFD93D',
  'تصميم': '#FF6B6B', 'برمجة': '#A066FF', 'أعمال': '#6BCB77',
}

const fallbackPosts: Record<string, any> = {
  'beautiful-vs-effective-design': {
    id: 'f1', slug: 'beautiful-vs-effective-design',
    title: 'الفرق بين التصميم الجميل والتصميم الفعّال',
    excerpt: 'التصميم الجميل يجذب العين، لكن التصميم الفعّال يحقق الأهداف.',
    category: 'تصميم', author: 'فريق إكسورا', createdAt: new Date(), readTime: '5 دقائق',
    content: `## ما هو التصميم الجميل؟\nالتصميم الجميل يعتمد على الجماليات البصرية كالألوان والخطوط والمسافات.\n\n## ما هو التصميم الفعّال؟\nالتصميم الفعّال يركز على تحقيق هدف محدد مثل زيادة المبيعات أو تحسين تجربة المستخدم.\n\n## كيف تجمع بينهما؟\n- ابدأ بتحديد الهدف\n- صمم تجربة المستخدم أولاً\n- أضف الجماليات لتعزيز التجربة\n- اختبر مع مستخدمين حقيقيين`,
  },
  'why-your-website-needs-speed': {
    id: 'f2', slug: 'why-your-website-needs-speed',
    title: 'لماذا تحتاج شركتك إلى موقع سريع؟',
    excerpt: 'الموقع البطيء يطرد الزوار ويضر بترتيبك في Google.',
    category: 'الأداء', author: 'فريق إكسورا', createdAt: new Date(), readTime: '4 دقائق',
    content: `## لماذا السرعة مهمة؟\nدراسات Google أثبتت أن 53% من المستخدمين يغادرون الموقع إذا استغرق أكثر من 3 ثوان.\n\n## تأثير السرعة على SEO\nGoogle تضع سرعة الموقع كعامل ترتيب مباشر منذ 2021.\n\n## كيف تحسن سرعة موقعك؟\n- استخدم CDN\n- ضغط الصور\n- تقليل JavaScript غير الضروري\n- Lazy loading للمحتوى`,
  },
  'how-to-choose-right-technology': {
    id: 'f3', slug: 'how-to-choose-right-technology',
    title: 'كيف تختار التقنية المناسبة لموقعك؟',
    excerpt: 'الاختيار الخاطئ للتقنية قد يكلفك الوقت والمال.',
    category: 'تقنية', author: 'فريق إكسورا', createdAt: new Date(), readTime: '6 دقائق',
    content: `## أسئلة يجب أن تطرحها\nقبل اختيار التقنية اسأل: ما حجم المشروع؟ من سيديره؟ ما ميزانيتك؟\n\n## WordPress\nمناسب للمدونات والمواقع البسيطة التي تحتاج إدارة محتوى سهلة.\n\n## Next.js\nمثالي للمشاريع التقنية المتقدمة التي تحتاج أداءً عالياً وSEO ممتازاً.\n\n## Shopify\nالخيار الأمثل للمتاجر الإلكترونية التي تريد البدء سريعاً.`,
  },
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  let post: any
  try { post = await prisma.blogPost.findFirst({ where: { slug } }) } catch { post = null }
  if (!post) post = fallbackPosts[slug]
  if (!post) return { title: 'مقال | إكسورا كود' }

  return {
    title: `${post.title} | إكسورا كود`,
    description: post.excerpt || post.title,
    keywords: `${post.title}, ${post.category || 'برمجة'}, إكسورا كود, اكسورا, برمجة اليمن, تطوير مواقع عدن`,
    authors: [{ name: post.author || 'فريق إكسورا كود' }],
    openGraph: {
      title: `${post.title} | إكسورا كود`,
      description: post.excerpt || post.title,
      type: 'article',
      locale: 'ar_YE',
      url: `https://exoracode.com/blog/${slug}`,
      siteName: 'إكسورا كود',
      publishedTime: post.createdAt ? new Date(post.createdAt).toISOString() : undefined,
      authors: [post.author || 'فريق إكسورا كود'],
      section: post.category || 'تقنية',
      images: post.imageUrl
        ? [{ url: post.imageUrl, width: 1200, height: 630 }]
        : [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | إكسورا كود`,
      description: post.excerpt || post.title,
    },
    alternates: { canonical: `https://exoracode.com/blog/${slug}` },
  }
}


export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let post: any = null
  try { post = await prisma.blogPost.findFirst({ where: { slug, status: 'published' } }) } catch { post = null }
  if (!post) post = fallbackPosts[slug] ?? null
  if (!post) return notFound()

  const color = catColors[post.category] || '#7B3EFF'

  const related: any[] = await prisma.blogPost.findMany({
    where: { category: post.category ?? undefined, NOT: { id: post.id } },
    take: 3,
  }).catch(() => [])

  return (
    <>
      {/* Article JSON-LD for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.excerpt || post.title,
            author: { '@type': 'Organization', name: post.author || 'فريق إكسورا كود', url: 'https://exoracode.com' },
            publisher: {
              '@type': 'Organization', name: 'إكسورا كود',
              logo: { '@type': 'ImageObject', url: 'https://exoracode.com/logo.png' },
            },
            datePublished: post.createdAt ? new Date(post.createdAt).toISOString() : undefined,
            dateModified:  post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined,
            url: `https://exoracode.com/blog/${post.slug}`,
            mainEntityOfPage: { '@type': 'WebPage', '@id': `https://exoracode.com/blog/${post.slug}` },
            articleSection: post.category || 'تقنية',
            inLanguage: 'ar',
          }),
        }}
      />
      {/* Hero */}
      <section className="section-hero" style={{ background: 'linear-gradient(135deg, #0A001F 0%, #12002B 100%)' }}>

        <div className="container" style={{ maxWidth: '900px', position: 'relative' }}>
          <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#A066FF', textDecoration: 'none', fontFamily: 'Cairo, sans-serif', marginBottom: '1.75rem', fontSize: '0.875rem', fontWeight: 600 }}>
            <ArrowRight size={15} /> العودة للمدونة
          </Link>
          {post.category && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: `${color}15`, border: `1px solid ${color}30`, borderRadius: '1rem', padding: '0.3rem 0.875rem', marginBottom: '1.25rem' }}>
              <Tag size={12} color={color} />
              <span style={{ color, fontSize: '0.82rem', fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>{post.category}</span>
            </div>
          )}
          <h1 style={{ fontFamily: 'Cairo, sans-serif', color: 'white', fontWeight: 900, fontSize: 'clamp(1.5rem, 4vw, 2.75rem)', marginBottom: '1.25rem', lineHeight: 1.3 }}>
            {post.title}
          </h1>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', color: '#9090A8', fontSize: '0.85rem', fontFamily: 'Cairo, sans-serif' }}>
            {post.author && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <User size={14} /> {post.author}
              </span>
            )}
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Calendar size={14} /> {new Date(post.createdAt).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            {post.readTime && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={14} /> {post.readTime}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section" style={{ background: 'linear-gradient(180deg, #12002B 0%, #0A001F 100%)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          {/* Cover */}
          <div style={{
            height: 'clamp(180px, 30vw, 300px)', borderRadius: '1.25rem', marginBottom: '2.5rem',
            background: `linear-gradient(135deg, ${color}20, ${color}06)`,
            border: `1px solid ${color}25`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            <BookOpen size={70} color={color} style={{ opacity: 0.2 }} />
          </div>

          {/* Article body */}
          <div className="blog-body">
            {post.content?.split('\n').map((line: string, i: number) => {
              if (line.startsWith('## ')) return (
                <h2 key={i} style={{ color: 'white', fontWeight: 900, fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', margin: '2rem 0 0.875rem', fontFamily: 'Cairo, sans-serif', borderBottom: `1px solid ${color}25`, paddingBottom: '0.625rem' }}>
                  {line.replace('## ', '')}
                </h2>
              )
              if (line.startsWith('### ')) return (
                <h3 key={i} style={{ color: 'white', fontWeight: 800, fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', margin: '1.5rem 0 0.625rem', fontFamily: 'Cairo, sans-serif' }}>
                  {line.replace('### ', '')}
                </h3>
              )
              if (line.startsWith('- ')) return (
                <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: color, flexShrink: 0, marginTop: '0.6rem' }} />
                  <span style={{ color: '#C8C8D8', fontFamily: 'Cairo, sans-serif', lineHeight: 1.8, fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>{line.replace('- ', '')}</span>
                </div>
              )
              if (line.trim() === '') return <div key={i} style={{ height: '0.625rem' }} />
              return <p key={i} style={{ color: '#C8C8D8', lineHeight: 1.9, fontFamily: 'Cairo, sans-serif', fontSize: 'clamp(0.9rem, 2vw, 1rem)', marginBottom: '0.875rem' }}>{line}</p>
            })}
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div style={{ marginTop: '3.5rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(123,62,255,0.15)' }}>
              <h3 style={{ color: 'white', fontWeight: 800, fontFamily: 'Cairo, sans-serif', marginBottom: '1.5rem', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}>مقالات ذات صلة</h3>
              <div className="grid-3">
                {related.map((r: any) => {
                  const rc = catColors[r.category] || '#7B3EFF'
                  return (
                    <Link key={r.id} href={`/blog/${r.slug}`} className="hover-card" style={{ textDecoration: 'none', padding: '1.25rem', borderRadius: '1rem', background: `${rc}0A`, border: `1px solid ${rc}20`, display: 'block' }}>
                      <h4 style={{ color: 'white', fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem', lineHeight: 1.4 }}>{r.title}</h4>
                      <p style={{ color: '#9090A8', fontSize: '0.78rem', fontFamily: 'Cairo, sans-serif' }}>{r.excerpt?.slice(0, 70)}...</p>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Back link */}
          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(123,62,255,0.1)' }}>
            <Link href="/blog" className="btn-outline" style={{ textDecoration: 'none', display: 'inline-flex' }}>
              <ArrowRight size={16} /> العودة للمدونة
            </Link>
          </div>
        </div>
        <style>{`
          .blog-body { background: rgba(123,62,255,0.03); border: 1px solid rgba(123,62,255,0.1); border-radius: 1.25rem; padding: clamp(1.25rem, 5vw, 3rem); }
        `}</style>
      </section>
    </>
  )
}
