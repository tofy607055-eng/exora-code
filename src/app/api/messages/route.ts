import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/api-auth'

export async function GET() {
  const unauth = await requireAuth()
  if (unauth) return unauth

  const messages = await prisma.message.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(messages)
}
