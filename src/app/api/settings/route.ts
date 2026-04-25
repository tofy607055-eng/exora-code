import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/api-auth'

export async function GET() {
  const unauth = await requireAuth()
  if (unauth) return unauth

  const items = await prisma.setting.findMany()
  const obj: Record<string, string> = {}
  items.forEach(s => { obj[s.key] = s.value })
  return NextResponse.json(obj)
}

export async function POST(req: NextRequest) {
  const unauth = await requireAuth()
  if (unauth) return unauth

  const body = await req.json()
  const updates = Object.entries(body)
  for (const [key, value] of updates) {
    await prisma.setting.upsert({
      where: { key },
      update: { value: String(value) },
      create: { key, value: String(value) },
    })
  }
  return NextResponse.json({ success: true })
}
