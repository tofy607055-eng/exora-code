import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { path } = await req.json()
    const referrer = req.headers.get('referer') || ''
    const userAgent = req.headers.get('user-agent') || ''
    // Skip admin routes and bots
    if (path?.startsWith('/admin') || path?.startsWith('/api')) {
      return NextResponse.json({ ok: true })
    }
    await prisma.pageView.create({ data: { path: path || '/', referrer, userAgent } })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const days = parseInt(searchParams.get('days') || '30')
    const since = new Date()
    since.setDate(since.getDate() - days)

    const [totalViews, totalContacts, totalSubmitted, viewsByPage, recentViews] = await Promise.all([
      prisma.pageView.count({ where: { createdAt: { gte: since } } }),
      prisma.contactAttempt.count({ where: { createdAt: { gte: since } } }),
      prisma.contactAttempt.count({ where: { submitted: true, createdAt: { gte: since } } }),
      prisma.pageView.groupBy({
        by: ['path'],
        _count: { id: true },
        where: { createdAt: { gte: since } },
        orderBy: { _count: { id: 'desc' } },
        take: 10,
      }),
      prisma.pageView.findMany({
        take: 50, orderBy: { createdAt: 'desc' },
        where: { createdAt: { gte: since } },
        select: { path: true, createdAt: true },
      }),
    ])

    // Views per day (last 7 days)
    const dailyViews = []
    for (let i = 6; i >= 0; i--) {
      const day = new Date()
      day.setDate(day.getDate() - i)
      day.setHours(0, 0, 0, 0)
      const nextDay = new Date(day)
      nextDay.setDate(nextDay.getDate() + 1)
      const count = await prisma.pageView.count({ where: { createdAt: { gte: day, lt: nextDay } } })
      dailyViews.push({ date: day.toLocaleDateString('ar-SA', { weekday: 'short' }), views: count })
    }

    return NextResponse.json({
      totalViews, totalContacts, totalSubmitted,
      conversionRate: totalContacts > 0 ? Math.round((totalSubmitted / totalContacts) * 100) : 0,
      viewsByPage: viewsByPage.map(v => ({ path: v.path, count: v._count.id })),
      dailyViews,
    })
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
