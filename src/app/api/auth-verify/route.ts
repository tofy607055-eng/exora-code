import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// This route runs as a regular serverless function (NOT middleware),
// so Prisma's native C++ addons work fine here.
//
// Flow: Login page → POST /api/auth-verify (checks DB) → if OK, calls signIn with verified token
export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ ok: false, error: 'بيانات غير مكتملة' }, { status: 400 })
  }

  try {
    // Read credentials from DB first
    const settings = await prisma.setting.findMany({
      where: { key: { in: ['admin_email', 'admin_password'] } },
    })
    const map: Record<string, string> = {}
    settings.forEach(s => { map[s.key] = s.value })

    const storedEmail = map['admin_email'] || process.env.ADMIN_EMAIL || 'exoracode@admin.com'
    const storedPassword = map['admin_password'] || process.env.ADMIN_PASSWORD || '12345'

    if (email === storedEmail && password === storedPassword) {
      // Return the verified email so the login page can call signIn with env-var credentials
      return NextResponse.json({ ok: true, verifiedEmail: storedEmail, verifiedPassword: storedPassword })
    }

    return NextResponse.json({ ok: false, error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' }, { status: 401 })
  } catch {
    // DB unreachable — fall back to env vars
    const adminEmail = process.env.ADMIN_EMAIL || 'exoracode@admin.com'
    const adminPassword = process.env.ADMIN_PASSWORD || '12345'

    if (email === adminEmail && password === adminPassword) {
      return NextResponse.json({ ok: true, verifiedEmail: adminEmail, verifiedPassword: adminPassword })
    }
    return NextResponse.json({ ok: false, error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' }, { status: 401 })
  }
}
