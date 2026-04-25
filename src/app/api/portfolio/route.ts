import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/api-auth'

// Public: anyone can browse published projects
export async function GET() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
  })
  return NextResponse.json(projects)
}

// Protected: only admin can create
export async function POST(req: NextRequest) {
  const unauth = await requireAuth()
  if (unauth) return unauth

  const body = await req.json()
  const project = await prisma.project.create({ data: body })
  return NextResponse.json(project)
}
