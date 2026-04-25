import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

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
