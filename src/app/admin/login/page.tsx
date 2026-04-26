'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Eye, EyeOff, Lock, Mail, AlertCircle, CheckCircle } from 'lucide-react'
import ExoraLogo from '@/components/ExoraLogo'
import { useToast } from '@/components/ToastProvider'

export default function AdminLoginPage() {
  const toast = useToast()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // Step 1: Verify credentials against DB (which may have updated email/password)
    const verifyRes = await fetch('/api/auth-verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email, password: form.password }),
    })
    const verifyData = await verifyRes.json()

    if (!verifyData.ok) {
      setStatus('error')
      toast.error('فشل تسجيل الدخول', 'البريد الإلكتروني أو كلمة المرور غير صحيحة')
      setTimeout(() => setStatus('idle'), 3000)
      return
    }

    // Step 2: Call NextAuth signIn with the verified (actual stored) credentials
    const result = await signIn('credentials', {
      email: verifyData.verifiedEmail,
      password: verifyData.verifiedPassword,
      redirect: false,
    })

    if (result?.ok) {
      setStatus('success')
      toast.success('تم تسجيل الدخول بنجاح!', 'مرحباً بك في لوحة التحكم')
      window.location.href = '/admin/dashboard'
    } else {
      setStatus('error')
      toast.error('فشل تسجيل الدخول', 'حدث خطأ غير متوقع، يرجى المحاولة مجدداً')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const inp: React.CSSProperties = {
    width: '100%', padding: '0.875rem 1rem 0.875rem 2.75rem',
    borderRadius: '0.75rem', background: 'rgba(255,255,255,0.05)',
    border: `1px solid ${status === 'error' ? 'rgba(255,107,107,0.4)' : 'rgba(123,62,255,0.2)'}`,
    color: 'white', fontFamily: 'Cairo, sans-serif', outline: 'none',
    boxSizing: 'border-box', transition: 'border-color 0.2s',
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0A001F 0%, #12002B 50%, #1A003A 100%)',
      padding: '1.5rem', fontFamily: 'Cairo, sans-serif', position: 'relative',
    }}>
      {/* BG Glow */}
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(123,62,255,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: '420px', position: 'relative' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <ExoraLogo height={52} />
          <h1 style={{ color: 'white', fontWeight: 800, fontSize: 'clamp(1.1rem, 4vw, 1.5rem)', marginTop: '0.75rem' }}>
            لوحة تحكم إكسورا كود
          </h1>
          <p style={{ color: '#B8B8C7', fontSize: '0.875rem', marginTop: '0.35rem' }}>
            قم بتسجيل الدخول للمتابعة
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(30,0,64,0.8)', border: '1px solid rgba(123,62,255,0.25)',
          borderRadius: '1.25rem', padding: 'clamp(1.5rem, 5vw, 2.5rem)',
          backdropFilter: 'blur(20px)',
        }}>
          {/* Status Banner */}
          {status === 'error' && (
            <div style={{ background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)', borderRadius: '0.75rem', padding: '0.875rem 1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', animation: 'shake 0.4s ease' }}>
              <AlertCircle size={18} color="#FF6B6B" />
              <span style={{ color: '#FF6B6B', fontSize: '0.9rem' }}>البريد الإلكتروني أو كلمة المرور غير صحيحة</span>
            </div>
          )}
          {status === 'success' && (
            <div style={{ background: 'rgba(107,203,119,0.1)', border: '1px solid rgba(107,203,119,0.3)', borderRadius: '0.75rem', padding: '0.875rem 1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <CheckCircle size={18} color="#6BCB77" />
              <span style={{ color: '#6BCB77', fontSize: '0.9rem' }}>تم تسجيل الدخول! جاري التوجيه...</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', color: '#B8B8C7', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                البريد الإلكتروني
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} color="#7B3EFF" style={{ position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input
                  type="email" required value={form.email}
                  onChange={e => { setStatus('idle'); setForm({ ...form, email: e.target.value }) }}
                  placeholder="exoracode@admin.com"
                  style={inp}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', color: '#B8B8C7', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                كلمة المرور
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} color="#7B3EFF" style={{ position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input
                  type={showPass ? 'text' : 'password'} required value={form.password}
                  onChange={e => { setStatus('idle'); setForm({ ...form, password: e.target.value }) }}
                  placeholder="••••••••"
                  style={{ ...inp, paddingRight: '2.75rem' }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#B8B8C7', padding: 0 }}>
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              style={{
                width: '100%', padding: '0.9rem', borderRadius: '0.75rem', border: 'none',
                background: status === 'success'
                  ? 'linear-gradient(135deg, #6BCB77, #4ECDC4)'
                  : 'linear-gradient(135deg, #7B3EFF, #A066FF)',
                color: 'white', fontWeight: 800, fontSize: '1rem',
                fontFamily: 'Cairo, sans-serif', cursor: status === 'loading' ? 'wait' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                opacity: status === 'loading' ? 0.8 : 1,
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(123,62,255,0.3)',
              }}
            >
              {status === 'loading' && (
                <div style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              )}
              {status === 'success' && <CheckCircle size={18} />}
              {status === 'loading' ? 'جاري التحقق...' : status === 'success' ? 'تم الدخول!' : 'تسجيل الدخول'}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)}
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
