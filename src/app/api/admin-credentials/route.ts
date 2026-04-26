import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/api-auth'

// GET: Return current admin email (never return password)
export async function GET() {
  const unauth = await requireAuth()
  if (unauth) return unauth

  try {
    const emailSetting = await prisma.setting.findUnique({ where: { key: 'admin_email' } })
    const currentEmail = emailSetting?.value || process.env.ADMIN_EMAIL || 'exoracode@admin.com'
    const isStoredInDB = !!emailSetting

    return NextResponse.json({ email: currentEmail, isStoredInDB })
  } catch {
    return NextResponse.json({ email: process.env.ADMIN_EMAIL || 'exoracode@admin.com', isStoredInDB: false })
  }
}

// POST: Update admin email and/or password after verifying current password
export async function POST(req: NextRequest) {
  const unauth = await requireAuth()
  if (unauth) return unauth

  const body = await req.json()
  const { currentPassword, newEmail, newPassword } = body

  if (!currentPassword) {
    return NextResponse.json({ error: 'يجب إدخال كلمة السر الحالية' }, { status: 400 })
  }
  if (!newEmail && !newPassword) {
    return NextResponse.json({ error: 'يجب إدخال بريد إلكتروني جديد أو كلمة سر جديدة' }, { status: 400 })
  }

  // Verify current password against DB or env fallback
  const passwordSetting = await prisma.setting.findUnique({ where: { key: 'admin_password' } })
  const storedPassword = passwordSetting?.value || process.env.ADMIN_PASSWORD || '12345'

  if (currentPassword !== storedPassword) {
    return NextResponse.json({ error: 'كلمة السر الحالية غير صحيحة' }, { status: 401 })
  }

  // Apply updates
  if (newEmail) {
    await prisma.setting.upsert({
      where: { key: 'admin_email' },
      update: { value: newEmail },
      create: { key: 'admin_email', value: newEmail },
    })
  }
  if (newPassword) {
    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'كلمة السر الجديدة يجب أن تكون 6 أحرف على الأقل' }, { status: 400 })
    }
    await prisma.setting.upsert({
      where: { key: 'admin_password' },
      update: { value: newPassword },
      create: { key: 'admin_password', value: newPassword },
    })
  }

  return NextResponse.json({ success: true })
}
