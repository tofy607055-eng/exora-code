import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const DEFAULTS = {
  hero_texts: JSON.stringify([
    'تصنع الفرق',
    'تُغيّر اللعبة',
    'تبني مستقبلك',
    'تتجاوز التوقعات',
    'تخدم عملاءك',
  ]),
  hero_animation: 'fadeUp',
  hero_duration: '3',
}

export async function GET() {
  try {
    const rows = await prisma.setting.findMany({
      where: { key: { in: ['hero_texts', 'hero_animation', 'hero_duration'] } },
    })
    const map: Record<string, string> = {}
    rows.forEach(r => { map[r.key] = r.value })
    return NextResponse.json({
      texts: JSON.parse(map.hero_texts ?? DEFAULTS.hero_texts),
      animation: map.hero_animation ?? DEFAULTS.hero_animation,
      duration: Number(map.hero_duration ?? DEFAULTS.hero_duration),
    })
  } catch {
    return NextResponse.json({
      texts: JSON.parse(DEFAULTS.hero_texts),
      animation: DEFAULTS.hero_animation,
      duration: 3,
    })
  }
}

export async function PUT(req: Request) {
  try {
    const { texts, animation, duration } = await req.json()
    await Promise.all([
      prisma.setting.upsert({ where: { key: 'hero_texts' }, create: { key: 'hero_texts', value: JSON.stringify(texts) }, update: { value: JSON.stringify(texts) } }),
      prisma.setting.upsert({ where: { key: 'hero_animation' }, create: { key: 'hero_animation', value: animation }, update: { value: animation } }),
      prisma.setting.upsert({ where: { key: 'hero_duration' }, create: { key: 'hero_duration', value: String(duration) }, update: { value: String(duration) } }),
    ])
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
