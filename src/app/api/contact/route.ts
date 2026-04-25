import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// In-memory rate limiter (IP → timestamps)
const rateLimitMap = new Map<string, number[]>()
const LIMIT = 3        // max 3 submissions
const WINDOW = 60 * 60 * 1000 // per 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const times = (rateLimitMap.get(ip) || []).filter(t => now - t < WINDOW)
  if (times.length >= LIMIT) return true
  rateLimitMap.set(ip, [...times, now])
  return false
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, service, budget, message, website } = body

    // Honeypot check — bots fill the "website" field
    if (website) {
      return NextResponse.json({ success: true }) // Silently ignore
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'الاسم والبريد والرسالة مطلوبة' }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'البريد الإلكتروني غير صحيح' }, { status: 400 })
    }

    // Spam word detection
    const spamWords = ['casino', 'crypto', 'bitcoin', 'click here', 'buy now', 'free money']
    const messageLC = message.toLowerCase()
    if (spamWords.some(w => messageLC.includes(w))) {
      return NextResponse.json({ success: true }) // Silent ignore
    }

    // Rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'لقد أرسلت عدة رسائل. يرجى المحاولة لاحقاً.' }, { status: 429 })
    }

    // Track form submission
    await prisma.contactAttempt.create({ data: { ip, submitted: true } }).catch(() => {})

    const msg = await prisma.message.create({
      data: { name: name.slice(0, 100), email: email.slice(0, 100), phone, service, budget, message: message.slice(0, 2000) },
    })

    return NextResponse.json({ success: true, id: msg.id })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const messages = await prisma.message.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(messages)
  } catch {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 })
  }
}
