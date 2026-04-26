import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Public endpoint — no auth required so the bar loads for all visitors
export async function GET() {
  try {
    const settings = await prisma.setting.findMany({
      where: { key: { in: ['announcement_active', 'announcement_text', 'announcement_link'] } },
    })
    const map: Record<string, string> = {}
    settings.forEach(s => { map[s.key] = s.value })

    return NextResponse.json({
      active: map['announcement_active'] || 'false',
      text:   map['announcement_text']   || '',
      link:   map['announcement_link']   || '/contact',
    }, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30' },
    })
  } catch {
    return NextResponse.json({ active: 'false', text: '', link: '/contact' })
  }
}
