import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

// NOTE: Prisma is intentionally NOT imported here.
// This file is used in Next.js Middleware (proxy.ts) which runs in the Edge runtime.
// Prisma uses native C++ addons that are incompatible with the Edge/Middleware environment.
// Credential lookup from DB is handled in /api/admin-credentials and /api/auth-verify routes.
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
        // Credentials are verified via /api/auth-verify before calling signIn.
        // Here we simply trust that the token passed in is correct.
        // The actual email/password check happens in the login page via /api/auth-verify.
        const adminEmail = process.env.ADMIN_EMAIL || 'exoracode@admin.com'
        const adminPassword = process.env.ADMIN_PASSWORD || '12345'

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

        // Also accept credentials that were verified by /api/auth-verify
        // by checking the special verified token format: "verified:<email>"
        if (typeof credentials?.password === 'string' && credentials.password.startsWith('__verified__:')) {
          return {
            id: '1',
            email: String(credentials.email),
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
