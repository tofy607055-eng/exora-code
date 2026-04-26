'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, ArrowLeft } from 'lucide-react'

export default function AnnouncementBar() {
  const [text, setText]         = useState('')
  const [link, setLink]         = useState('/contact')
  const [visible, setVisible]   = useState(false)
  const [dismissed, setDismiss] = useState(false)

  useEffect(() => {
    // Check if user already dismissed this message
    const key = 'exora_ann_dismissed'
    const savedText = localStorage.getItem(key)

    fetch('/api/announcement')
      .then(r => r.json())
      .then(d => {
        if (d.active === 'true' && d.text) {
          setText(d.text)
          if (d.link) setLink(d.link)
          // Show only if not dismissed for this exact message
          if (savedText !== d.text) {
            setVisible(true)
          }
        }
      })
      .catch(() => {})
  }, [])

  const dismiss = () => {
    localStorage.setItem('exora_ann_dismissed', text)
    setDismiss(true)
    setTimeout(() => setVisible(false), 400)
  }

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, right: 0, left: 0,
        zIndex: 100,
        background: 'linear-gradient(90deg, #4a00b4 0%, #7B3EFF 40%, #9b30ff 70%, #4a00b4 100%)',
        backgroundSize: '200% auto',
        animation: dismissed
          ? 'slideUpOut 0.4s ease forwards'
          : 'slideDownIn 0.4s ease forwards, shimmerBg 4s linear infinite',
        boxShadow: '0 2px 20px rgba(123,62,255,0.4)',
        overflow: 'hidden',
      }}
    >
      {/* Moving shine */}
      <div style={{
        position: 'absolute', top: 0, left: '-100%',
        width: '60%', height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
        animation: 'shineSweep 3s linear infinite',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: '0 1rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '0.875rem', height: '40px', position: 'relative',
      }}>
        {/* Pulsing dot */}
        <span style={{
          width: 8, height: 8, borderRadius: '50%',
          background: '#ff4d4d',
          boxShadow: '0 0 0 0 rgba(255,77,77,0.6)',
          animation: 'pulseDot 1.5s ease-in-out infinite',
          flexShrink: 0,
        }} />

        {/* Message */}
        <Link
          href={link}
          style={{
            color: 'white',
            fontFamily: 'Cairo, sans-serif',
            fontSize: 'clamp(0.78rem, 2vw, 0.9rem)',
            fontWeight: 700,
            textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}
        >
          {text}
          <ArrowLeft size={14} style={{ flexShrink: 0, opacity: 0.8 }} />
        </Link>

        {/* Close */}
        <button
          onClick={dismiss}
          style={{
            position: 'absolute', left: '1rem',
            background: 'rgba(255,255,255,0.15)',
            border: 'none', borderRadius: '50%',
            width: 24, height: 24,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'white', flexShrink: 0,
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.28)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
          aria-label="إغلاق"
        >
          <X size={13} />
        </button>
      </div>

      <style>{`
        @keyframes slideDownIn   { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slideUpOut    { from { transform: translateY(0); opacity: 1; } to { transform: translateY(-100%); opacity: 0; } }
        @keyframes shineSweep    { to { left: 150%; } }
        @keyframes shimmerBg     { to { background-position: 200% center; } }
        @keyframes pulseDot {
          0%,100% { box-shadow: 0 0 0 0 rgba(255,77,77,0.6); }
          50%      { box-shadow: 0 0 0 5px rgba(255,77,77,0); }
        }
      `}</style>
    </div>
  )
}
