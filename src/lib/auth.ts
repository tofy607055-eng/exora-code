import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'

// Read admin credentials from DB (Setting table), fallback to env vars
async function getAdminCredentials() {
  try {
    const settings = await prisma.setting.findMany({
      where: { key: { in: ['admin_email', 'admin_password'] } },
    })
    const map: Record<string, string> = {}
    settings.forEach(s => { map[s.key] = s.value })
    return {
      email: map['admin_email'] || process.env.ADMIN_EMAIL || 'exoracode@admin.com',
      password: map['admin_password'] || process.env.ADMIN_PASSWORD || '12345',
    }
  } catch {
    // If DB is unreachable, fall back to env vars
    return {
      email: process.env.ADMIN_EMAIL || 'exoracode@admin.com',
      password: process.env.ADMIN_PASSWORD || '12345',
    }
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true, // Required for Netlify/non-Vercel deployments
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email: adminEmail, password: adminPassword } = await getAdminCredentials()

        if (
          credentials?.email === adminEmail &&
          credentials?.password === adminPassword
        ) {
          return {
            id: '1',
            email: adminEmail,
            name: 'مدير إكسورا كود',
            role: 'admin',
          }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as { role?: string }).role
      return token
    },
    async session({ session, token }) {
      if (session.user) (session.user as { role?: string }).role = token.role as string
      return session
    },
  },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
})
