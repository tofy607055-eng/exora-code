'use client'
import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const handler = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])
  if (!show) return null
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed', bottom: '6rem', left: '1.5rem', zIndex: 40,
        width: '2.75rem', height: '2.75rem', borderRadius: '50%',
        background: 'rgba(123,62,255,0.2)', border: '1px solid rgba(123,62,255,0.4)',
        color: '#A066FF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.3s', backdropFilter: 'blur(10px)',
      }}
    >
      <ArrowUp size={18} />
    </button>
  )
}
