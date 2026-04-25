'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react'
import ExoraLogo from '@/components/ExoraLogo'

export default function AdminLoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await signIn('credentials', {
      email: form.email, password: form.password, redirect: false,
    })
    if (result?.ok) router.push('/admin/dashboard')
    else setError('بيانات الدخول غير صحيحة')
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0A001F 0%, #12002B 50%, #1A003A 100%)',
      padding: '1.5rem', fontFamily: 'Cairo, sans-serif',
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <ExoraLogo height={52} />
          <h1 style={{ color: 'white', fontWeight: 800, fontSize: '1.5rem' }}>لوحة تحكم إكسورا كود</h1>
          <p style={{ color: '#B8B8C7', fontSize: '0.9rem', marginTop: '0.35rem' }}>قم بتسجيل الدخول للمتابعة</p>
        </div>

        {/* Form */}
        <div style={{ background: 'rgba(30,0,64,0.8)', border: '1px solid rgba(123,62,255,0.25)', borderRadius: '1.25rem', padding: '2.5rem', backdropFilter: 'blur(20px)' }}>
          {error && (
            <div style={{ background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)', borderRadius: '0.75rem', padding: '0.875rem 1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <AlertCircle size={18} color="#FF6B6B" />
              <span style={{ color: '#FF6B6B', fontSize: '0.9rem' }}>{error}</span>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', color: '#B8B8C7', fontSize: '0.9rem', marginBottom: '0.5rem' }}>البريد الإلكتروني</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} color="#7B3EFF" style={{ position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)' }} />
                <input
                  type="email" required value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="exoracode@admin.com"
                  style={{ width: '100%', padding: '0.875rem 1rem 0.875rem 2.75rem', borderRadius: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(123,62,255,0.2)', color: 'white', fontFamily: 'Cairo, sans-serif', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', color: '#B8B8C7', fontSize: '0.9rem', marginBottom: '0.5rem' }}>كلمة المرور</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} color="#7B3EFF" style={{ position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)' }} />
                <input
                  type={showPass ? 'text' : 'password'} required value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  style={{ width: '100%', padding: '0.875rem 2.75rem', borderRadius: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(123,62,255,0.2)', color: 'white', fontFamily: 'Cairo, sans-serif', outline: 'none', boxSizing: 'border-box' }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#B8B8C7', padding: 0 }}>
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.7 : 1, fontSize: '1rem' }}>
              {loading ? 'جاري التحقق...' : 'تسجيل الدخول'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
