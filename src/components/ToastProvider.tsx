'use client'
import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
}

interface ToastContextValue {
  success: (title: string, message?: string) => void
  error: (title: string, message?: string) => void
  warning: (title: string, message?: string) => void
  info: (title: string, message?: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const icons = {
  success: <CheckCircle size={20} />,
  error: <XCircle size={20} />,
  warning: <AlertCircle size={20} />,
  info: <Info size={20} />,
}

const colors = {
  success: { bg: 'rgba(107,203,119,0.12)', border: 'rgba(107,203,119,0.35)', icon: '#6BCB77', bar: '#6BCB77' },
  error:   { bg: 'rgba(255,107,107,0.12)', border: 'rgba(255,107,107,0.35)', icon: '#FF6B6B', bar: '#FF6B6B' },
  warning: { bg: 'rgba(255,217,61,0.12)',  border: 'rgba(255,217,61,0.35)',  icon: '#FFD93D', bar: '#FFD93D' },
  info:    { bg: 'rgba(123,62,255,0.12)',  border: 'rgba(123,62,255,0.35)',  icon: '#A066FF', bar: '#A066FF' },
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((type: ToastType, title: string, message?: string) => {
    const id = Date.now().toString()
    setToasts(prev => [...prev, { id, type, title, message }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4500)
  }, [])

  const dismiss = (id: string) => setToasts(prev => prev.filter(t => t.id !== id))

  const ctx: ToastContextValue = {
    success: (t, m) => addToast('success', t, m),
    error:   (t, m) => addToast('error',   t, m),
    warning: (t, m) => addToast('warning', t, m),
    info:    (t, m) => addToast('info',    t, m),
  }

  return (
    <ToastContext.Provider value={ctx}>
      {children}

      {/* Toast Container */}
      <div style={{
        position: 'fixed', bottom: '1.5rem', left: '1.5rem',
        zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '0.75rem',
        maxWidth: 'calc(100vw - 3rem)', width: '360px',
        pointerEvents: 'none',
      }}>
        {toasts.map(toast => {
          const c = colors[toast.type]
          return (
            <div key={toast.id} style={{
              background: `rgba(10,0,31,0.95)`,
              border: `1px solid ${c.border}`,
              borderRadius: '0.875rem',
              padding: '1rem 1.25rem',
              backdropFilter: 'blur(20px)',
              boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${c.border}`,
              display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
              pointerEvents: 'all',
              animation: 'toastIn 0.3s cubic-bezier(0.34,1.56,0.64,1)',
              position: 'relative', overflow: 'hidden',
              fontFamily: 'Cairo, sans-serif',
            }}>
              {/* Progress bar */}
              <div style={{
                position: 'absolute', bottom: 0, right: 0, left: 0,
                height: '3px',
                background: `linear-gradient(90deg, ${c.bar}, ${c.bar}80)`,
                animation: 'toastProgress 4.5s linear forwards',
                transformOrigin: 'right',
              }} />
              {/* Icon */}
              <div style={{ color: c.icon, flexShrink: 0, marginTop: '1px' }}>
                {icons[toast.type]}
              </div>
              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ color: 'white', fontWeight: 700, fontSize: '0.9rem', margin: 0, lineHeight: 1.4 }}>
                  {toast.title}
                </p>
                {toast.message && (
                  <p style={{ color: '#B8B8C7', fontSize: '0.82rem', margin: '0.25rem 0 0', lineHeight: 1.5 }}>
                    {toast.message}
                  </p>
                )}
              </div>
              {/* Close */}
              <button
                onClick={() => dismiss(toast.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9090A8', padding: '0.125rem', flexShrink: 0, lineHeight: 1 }}
              >
                <X size={16} />
              </button>
            </div>
          )
        })}
      </div>

      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(-1rem) scale(0.95); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes toastProgress {
          from { transform: scaleX(1); }
          to   { transform: scaleX(0); }
        }
      `}</style>
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
