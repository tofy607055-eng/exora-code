'use client'
import { useLang } from '@/lib/lang-context'
import { Globe } from 'lucide-react'

export default function LangToggle() {
  const { lang, toggle } = useLang()
  return (
    <button
      onClick={toggle}
      title={lang === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.4rem',
        padding: '0.4rem 0.875rem', borderRadius: '1.5rem',
        background: 'rgba(123,62,255,0.12)', border: '1px solid rgba(123,62,255,0.25)',
        color: '#A066FF', cursor: 'pointer', fontWeight: 700,
        fontSize: '0.85rem', transition: 'all 0.2s', fontFamily: 'Cairo, sans-serif',
      }}
    >
      <Globe size={15} />
      {lang === 'ar' ? 'EN' : 'عربي'}
    </button>
  )
}
