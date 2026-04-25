import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

/**
 * Utility: wraps an API handler and ensures the caller is authenticated.
 * Returns 401 JSON response if not signed in.
 */
export async function requireAuth(): Promise<NextResponse | null> {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
  }
  return null
}
