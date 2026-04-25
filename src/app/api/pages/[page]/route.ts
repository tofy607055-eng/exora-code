import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/api-auth'

// GET /api/pages/[page] - get all settings for a page (admin only)
export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ page: string }> }
) {
  const unauth = await requireAuth()
  if (unauth) return unauth

  const { page } = await params
  const items = await prisma.setting.findMany({
    where: { key: { startsWith: `page_${page}_` } },
  })
  const obj: Record<string, string> = {}
  items.forEach(s => { obj[s.key.replace(`page_${page}_`, '')] = s.value })
  return NextResponse.json(obj)
}

// POST /api/pages/[page] - save all settings for a page (admin only)
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ page: string }> }
) {
  const unauth = await requireAuth()
  if (unauth) return unauth

  const { page } = await params
  const body = await req.json()

  for (const [field, value] of Object.entries(body)) {
    const key = `page_${page}_${field}`
    await prisma.setting.upsert({
      where: { key },
      update: { value: String(value) },
      create: { key, value: String(value) },
    })
  }

  return NextResponse.json({ success: true })
}
