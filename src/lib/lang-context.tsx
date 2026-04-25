'use client'
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { translations, type Lang } from './translations'

interface LangContextType {
  lang: Lang
  t: typeof translations.ar
  toggle: () => void
  isRTL: boolean
}

const LangContext = createContext<LangContextType>({
  lang: 'ar', t: translations.ar, toggle: () => {}, isRTL: true,
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ar')

  useEffect(() => {
    const stored = localStorage.getItem('lang') as Lang | null
    if (stored === 'en' || stored === 'ar') setLang(stored)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    localStorage.setItem('lang', lang)
  }, [lang])

  const toggle = () => setLang(prev => prev === 'ar' ? 'en' : 'ar')

  return (
    <LangContext.Provider value={{ lang, t: translations[lang], toggle, isRTL: lang === 'ar' }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
