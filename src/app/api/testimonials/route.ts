import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const items = await prisma.testimonial.findMany({ where: { visible: true }, orderBy: { createdAt: 'desc' } })
  return NextResponse.json(items)
}
export async function POST(req: NextRequest) {
  const body = await req.json()
  const item = await prisma.testimonial.create({ data: body })
  return NextResponse.json(item)
}
