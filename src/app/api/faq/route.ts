import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const all = new URL(req.url).searchParams.get('all') === 'true'
  const items = await prisma.fAQ.findMany({
    where: all ? {} : { visible: true },
    orderBy: { order: 'asc' },
  })
  return NextResponse.json(items)
}
export async function POST(req: NextRequest) {
  const body = await req.json()
  const item = await prisma.fAQ.create({ data: body })
  return NextResponse.json(item)
}
