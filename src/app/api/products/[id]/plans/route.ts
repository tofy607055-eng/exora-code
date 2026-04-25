import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all plans for a product
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const plans = await prisma.softwarePlan.findMany({
      where: { softwareId: id },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(plans)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

// POST new plan for a product
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const data = await req.json()
    const plan = await prisma.softwarePlan.create({
      data: { ...data, softwareId: id },
    })
    return NextResponse.json(plan)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
