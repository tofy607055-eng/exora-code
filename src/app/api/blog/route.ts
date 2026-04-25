import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/api-auth'

// Public: only published posts visible
export async function GET() {
  const items = await prisma.blogPost.findMany({
    where: { status: 'published' },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(items)
}

// Protected: only admin can create
export async function POST(req: NextRequest) {
  const unauth = await requireAuth()
  if (unauth) return unauth

  const body = await req.json()
  const item = await prisma.blogPost.create({ data: body })
  return NextResponse.json(item)
}
