import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/api-auth'

export async function GET(req: NextRequest) {
  const showAll = req.nextUrl.searchParams.get('all') === 'true'
  try {
    const products = await prisma.software.findMany({
      where: showAll ? {} : { visible: true },
      include: { plans: { orderBy: { order: 'asc' } } },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(products)
  } catch {
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(req: NextRequest) {
  const unauth = await requireAuth()
  if (unauth) return unauth
  try {
    const data = await req.json()
    const product = await prisma.software.create({ data })
    return NextResponse.json(product)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
