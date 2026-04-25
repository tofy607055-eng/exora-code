'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [show, setShow] = useState(true)
  const [progress, setProgress] = useState(0)
  const [prevPath, setPrevPath] = useState(pathname)

  useEffect(() => {
    if (pathname !== prevPath) {
      setShow(false)
      setProgress(30)
      const t1 = setTimeout(() => setProgress(70), 100)
      const t2 = setTimeout(() => setProgress(100), 250)
      const t3 = setTimeout(() => {
        setShow(true)
        setPrevPath(pathname)
        setTimeout(() => setProgress(0), 300)
      }, 300)
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
    }
  }, [pathname, prevPath])

  return (
    <>
      {/* Progress Bar */}
      {progress > 0 && (
        <div style={{
          position: 'fixed', top: 0, right: 0, left: 0, height: '3px', zIndex: 9999,
          background: 'rgba(123,62,255,0.2)',
        }}>
          <div style={{
            height: '100%', width: `${progress}%`,
            background: 'linear-gradient(90deg, #7B3EFF, #A066FF)',
            transition: 'width 0.25s ease',
            boxShadow: '0 0 10px rgba(123,62,255,0.8)',
          }} />
        </div>
      )}
      {/* Page fade */}
      <div style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }}>
        {children}
      </div>
    </>
  )
}
