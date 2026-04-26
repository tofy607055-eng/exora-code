import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE = 'https://exoracode.netlify.app'
  const now = new Date()

  const staticPages = [
    { url: BASE, changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${BASE}/about`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE}/services`, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE}/portfolio`, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE}/products`, changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${BASE}/blog`, changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${BASE}/contact`, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${BASE}/faq`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE}/testimonials`, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE}/privacy`, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${BASE}/terms`, changeFrequency: 'yearly' as const, priority: 0.3 },
  ]

  let projects: MetadataRoute.Sitemap = []
  let posts: MetadataRoute.Sitemap = []

  try {
    const allProjects = await prisma.project.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } })
    projects = allProjects.map(p => ({ url: `${BASE}/portfolio/${p.slug}`, lastModified: p.updatedAt, changeFrequency: 'monthly' as const, priority: 0.7 }))

    const allPosts = await prisma.blogPost.findMany({ where: { status: 'published' }, select: { slug: true, updatedAt: true } })
    posts = allPosts.map(p => ({ url: `${BASE}/blog/${p.slug}`, lastModified: p.updatedAt, changeFrequency: 'weekly' as const, priority: 0.75 }))
  } catch {}

  return [...staticPages.map(p => ({ ...p, lastModified: now })), ...projects, ...posts]
}
