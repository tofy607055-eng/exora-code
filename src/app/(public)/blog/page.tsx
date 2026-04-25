import type { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Calendar, ArrowLeft, BookOpen, Clock } from 'lucide-react'
import HeroBackground from '@/components/HeroBackground'

export const metadata: Metadata = {
  title: 'المدونة التقنية | إكسورا كود — مقالات برمجة عربية',
  description: 'مقالات ونصائح تقنية من فريق إكسورا كود — شركة برمجة يمنية متخصصة في تطوير المواقع والتطبيقات من عدن اليمن.',
  keywords: 'مدونة برمجة عربية, مقالات تقنية, تطوير مواقع اليمن, إكسورا كود, اكسورا, برمجة عدن, نصائح مطورين يمن',
  openGraph: { title: 'المدونة | إكسورا كود — عدن، اليمن', locale: 'ar_YE' },
}

const catColors: Record<string, string> = {
  'تجربة المستخدم': '#7B3EFF', 'تقنية': '#4ECDC4', 'الأداء': '#FFD93D',
  'تصميم': '#FF6B6B', 'برمجة': '#A066FF', 'أعمال': '#6BCB77',
}

const fallbackPosts = [
  {
    id: 'f1', slug: 'beautiful-vs-effective-design', title: 'الفرق بين التصميم الجميل والتصميم الفعّال',
    excerpt: 'التصميم الجميل يجذب العين، لكن التصميم الفعّال يحقق الأهداف. ما الفرق؟',
    category: 'تصميم', author: 'فريق إكسورا', createdAt: new Date(), readTime: '5 دقائق', color: '#FF6B6B',
  },
  {
    id: 'f2', slug: 'why-your-website-needs-speed', title: 'لماذا تحتاج شركتك إلى موقع سريع؟',
    excerpt: 'الموقع البطيء يطرد الزوار ويضر بترتيبك في Google. اكتشف لماذا السرعة أولوية قصوى.',
    category: 'الأداء', author: 'فريق إكسورا', createdAt: new Date(), readTime: '4 دقائق', color: '#FFD93D',
  },
  {
    id: 'f3', slug: 'how-to-choose-right-technology', title: 'كيف تختار التقنية المناسبة لموقعك؟',
    excerpt: 'الاختيار الخاطئ للتقنية قد يكلفك الوقت والمال. تعرف على كيفية اتخاذ القرار الصحيح.',
    category: 'تقنية', author: 'فريق إكسورا', createdAt: new Date(), readTime: '6 دقائق', color: '#4ECDC4',
  },
]

async function getPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      orderBy: { createdAt: 'desc' },
    })
    return posts.length ? posts : fallbackPosts
  } catch { return fallbackPosts }
}

export default async function BlogPage() {
  const posts = await getPosts()
  const featured = posts[0]
  const rest = posts.slice(1)

  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: '7rem', paddingBottom: '4rem', background: 'linear-gradient(135deg, #0A001F 0%, #12002B 100%)', position: 'relative', overflow: 'hidden' }}>
        <HeroBackground />
        <div style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '400px', background: 'radial-gradient(ellipse, rgba(123,62,255,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(123,62,255,0.1)', border: '1px solid rgba(123,62,255,0.25)', borderRadius: '2rem', padding: '0.4rem 1.25rem', marginBottom: '1.5rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A066FF', display: 'block' }} />
            <span style={{ color: '#A066FF', fontSize: '0.85rem', fontFamily: 'Cairo, sans-serif', fontWeight: 600 }}>المدونة</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, fontFamily: 'Cairo, sans-serif', color: 'white', marginBottom: '1.25rem', lineHeight: 1.2 }}>
            أفكار و<span style={{ background: 'linear-gradient(135deg, #7B3EFF, #A066FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>رؤى تقنية</span>
          </h1>
          <p style={{ color: '#B8B8C7', fontSize: '1.05rem', fontFamily: 'Cairo, sans-serif', maxWidth: '500px', margin: '0 auto', lineHeight: 1.8 }}>
            أحدث المقالات والنصائح من فريق إكسورا كود
          </p>
        </div>
      </section>

      {/* Posts */}
      <section style={{ padding: '5rem 0', background: 'linear-gradient(180deg, #12002B 0%, #0A001F 100%)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>

          {/* Featured */}
          {featured && (
            <Link href={`/blog/${(featured as any).slug}`} style={{ textDecoration: 'none', display: 'block', marginBottom: '2rem' }}>
              <div style={{
                borderRadius: '1.25rem', overflow: 'hidden',
                background: `linear-gradient(145deg, ${catColors[(featured as any).category] || '#7B3EFF'}12, rgba(10,0,31,0.8))`,
                border: `1px solid ${catColors[(featured as any).category] || '#7B3EFF'}30`,
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
>
                {/* Image */}
                <div style={{ height: '280px', background: `linear-gradient(135deg, ${catColors[(featured as any).category] || '#7B3EFF'}25, ${catColors[(featured as any).category] || '#7B3EFF'}08)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ fontSize: '5rem', opacity: 0.3 }}><BookOpen size={80} color={catColors[(featured as any).category] || '#7B3EFF'} /></div>
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: `${catColors[(featured as any).category] || '#7B3EFF'}20`, border: `1px solid ${catColors[(featured as any).category] || '#7B3EFF'}40`, color: catColors[(featured as any).category] || '#A066FF', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>
                    مقال مميز ⭐
                  </div>
                </div>
                {/* Content */}
                <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  {(featured as any).category && (
                    <span style={{ color: catColors[(featured as any).category] || '#A066FF', fontSize: '0.8rem', fontFamily: 'Cairo, sans-serif', fontWeight: 700, marginBottom: '1rem', display: 'block' }}>
                      {(featured as any).category}
                    </span>
                  )}
                  <h2 style={{ color: 'white', fontWeight: 900, fontSize: '1.5rem', fontFamily: 'Cairo, sans-serif', marginBottom: '1rem', lineHeight: 1.4 }}>
                    {(featured as any).title}
                  </h2>
                  <p style={{ color: '#B8B8C7', lineHeight: 1.8, fontFamily: 'Cairo, sans-serif', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
                    {(featured as any).excerpt}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#B8B8C7', fontSize: '0.8rem', fontFamily: 'Cairo, sans-serif' }}>
                      <Calendar size={13} />
                      {new Date((featured as any).createdAt).toLocaleDateString('ar-SA')}
                    </span>
                    <span style={{ color: catColors[(featured as any).category] || '#A066FF', fontSize: '0.875rem', fontWeight: 700, fontFamily: 'Cairo, sans-serif', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      اقرأ المقال <ArrowLeft size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {rest.map((post: any) => {
              const color = catColors[post.category] || '#7B3EFF'
              return (
                <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                  <article style={{
                    borderRadius: '1.25rem', overflow: 'hidden',
                    background: `linear-gradient(145deg, ${color}0D, rgba(10,0,31,0.7))`,
                    border: `1px solid ${color}25`, height: '100%',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                  }}
                  className="hover-card">
                    {/* Image area */}
                    <div style={{ height: '160px', background: `linear-gradient(135deg, ${color}20, ${color}06)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                      <BookOpen size={48} color={color} style={{ opacity: 0.25 }} />
                      {post.category && (
                        <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: `${color}20`, border: `1px solid ${color}40`, color, padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.72rem', fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>
                          {post.category}
                        </div>
                      )}
                    </div>
                    {/* Content */}
                    <div style={{ padding: '1.5rem' }}>
                      <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.875rem', color: '#9090A8', fontSize: '0.75rem', fontFamily: 'Cairo, sans-serif' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Calendar size={11} />{new Date(post.createdAt).toLocaleDateString('ar-SA')}
                        </span>
                        {post.readTime && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <Clock size={11} />{post.readTime}
                          </span>
                        )}
                      </div>
                      <h2 style={{ color: 'white', fontWeight: 800, fontSize: '0.975rem', fontFamily: 'Cairo, sans-serif', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                        {post.title}
                      </h2>
                      <p style={{ color: '#9090A8', fontSize: '0.82rem', lineHeight: 1.7, fontFamily: 'Cairo, sans-serif', marginBottom: '1.25rem' }}>
                        {post.excerpt?.slice(0, 90)}...
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${color}20`, paddingTop: '1rem' }}>
                        <span style={{ color, fontSize: '0.8rem', fontWeight: 700, fontFamily: 'Cairo, sans-serif', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          اقرأ المقال <ArrowLeft size={13} />
                        </span>
                        <div style={{ width: '2rem', height: '2px', background: `linear-gradient(90deg, transparent, ${color})`, borderRadius: '1px' }} />
                      </div>
                    </div>
                    <div style={{ height: '2px', background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
                  </article>
                </Link>
              )
            })}
          </div>
        </div>
        <style>{`@media(max-width:1024px){section>div>div[style*="repeat(3, 1fr)"]{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:600px){section>div>div[style*="repeat(3, 1fr)"]{grid-template-columns:1fr!important}}`}</style>
      </section>
    </>
  )
}
