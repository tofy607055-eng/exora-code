import type { Metadata } from 'next'
import './globals.css'
import { LangProvider } from '@/lib/lang-context'
import { ToastProvider } from '@/components/ToastProvider'

const KEYWORDS = [
  // ── Brand Names (إكسورا بكل كتاباتها) ──
  'إكسورا', 'اكسورا', 'إكسورا كود', 'اكسورا كود',
  'إكسورا عدن', 'اكسورا عدن', 'إكسورا اليمن', 'اكسورا اليمن',
  'exora', 'exora code', 'exoracode', 'exora aden', 'exora yemen',

  // ── تطوير مواقع ── اليمن وعدن
  'تطوير مواقع اليمن', 'تطوير مواقع عدن', 'تطوير مواقع في اليمن', 'تطوير مواقع في عدن',
  'برمجة مواقع اليمن', 'برمجة مواقع عدن', 'برمجة مواقع في اليمن',
  'مواقع إلكترونية اليمن', 'مواقع إلكترونية عدن', 'موقع إلكتروني عدن',
  'تصميم مواقع اليمن', 'تصميم مواقع عدن', 'تصميم موقع عدن',
  'انشاء موقع اليمن', 'انشاء موقع عدن', 'إنشاء موقع إلكتروني عدن',
  'web development yemen', 'web design aden', 'website yemen',

  // ── تطوير تطبيقات ── اليمن وعدن
  'تطوير تطبيقات اليمن', 'تطوير تطبيقات عدن', 'برمجة تطبيقات اليمن',
  'تطبيقات جوال اليمن', 'تطبيقات موبايل عدن', 'تطبيق اندرويد اليمن',
  'تطبيق ios اليمن', 'تطبيق جوال عدن', 'برمجة تطبيق موبايل اليمن',
  'app development yemen', 'mobile app aden',

  // ── برمجة عامة ── اليمن وعدن
  'برمجة اليمن', 'برمجة عدن', 'مبرمج يمني', 'مبرمج عدن',
  'شركة برمجة اليمن', 'شركة برمجة عدن', 'شركة برمجة يمنية',
  'شركة تقنية اليمن', 'شركة تقنية عدن', 'شركة تقنية يمنية',
  'خدمات برمجة اليمن', 'خدمات برمجية يمنية',

  // ── تصميم ──
  'تصميم UI UX اليمن', 'تصميم واجهات اليمن', 'مصمم يمني',
  'تصميم جرافيك اليمن', 'تصميم هوية بصرية اليمن', 'تصميم شعار اليمن',
  'ui ux designer yemen',

  // ── متاجر إلكترونية ──
  'متجر إلكتروني اليمن', 'متجر إلكتروني عدن', 'انشاء متجر اليمن',
  'متجر أونلاين اليمن', 'تجارة إلكترونية اليمن', 'e-commerce yemen',

  // ── أنظمة وحلول ──
  'نظام إدارة اليمن', 'نظام erp اليمن', 'نظام pos اليمن',
  'برنامج محاسبة اليمن', 'برنامج مبيعات اليمن', 'برنامج إدارة مطعم اليمن',
  'نظام نقاط البيع عدن', 'حلول رقمية اليمن', 'حلول برمجية يمنية',
  'saas yemen', 'software yemen',

  // ── SEO وتسويق ──
  'seo اليمن', 'تحسين محركات البحث اليمن', 'تسويق رقمي اليمن',
  'تسويق إلكتروني عدن', 'إدارة مواقع التواصل اليمن',
  'digital marketing yemen',

  // ── استضافة وخوادم ──
  'استضافة مواقع اليمن', 'دومين اليمن', 'خادم اليمن',

  // ── مصطلحات تقنية مع اليمن ──
  'next.js اليمن', 'react اليمن', 'flutter اليمن', 'laravel اليمن',
  'php اليمن', 'python اليمن', 'javascript مبرمج يمني',
  'full stack يمني', 'backend developer yemen', 'frontend developer yemen',

  // ── أنواع المشاريع ──
  'بورتفوليو موقع اليمن', 'موقع شركة اليمن', 'موقع مطعم عدن',
  'موقع عقارات اليمن', 'موقع صحة اليمن', 'موقع تعليمي اليمن',
  'منصة تعليمية يمنية', 'تطبيق توصيل عدن', 'تطبيق حجز يمني',

  // ── عدن تحديداً ──
  'مبرمج عدن', 'شركة برمجة عدن', 'تقنية عدن', 'ديجيتال عدن',
  'خدمات رقمية عدن', 'تطوير رقمي عدن', 'برنامج عدن',
  'موقع احترافي عدن', 'تصميم احترافي عدن',

  // ── كلمات عامة بدون موقع ──
  'إكسورا كود للبرمجة', 'اكسورا للتطوير', 'افضل شركة برمجة',
  'أفضل مبرمج عربي', 'تطوير رقمي احترافي', 'برمجة احترافية',
  'شركة برمجة موثوقة', 'مشاريع برمجية ناجحة',

  // ── خدمات المنتجات ──
  'برامج saas عربية', 'برامج إدارة عربية', 'حلول تقنية للشركات',
  'تحويل رقمي اليمن', 'digital transformation yemen',

  // ── مجتمع المطورين ──
  'مجتمع مطورين اليمن', 'مطورين يمنيين', 'مطور يمني محترف',
].join(', ')

export const metadata: Metadata = {
  metadataBase: new URL('https://exoracode.netlify.app'),
  title: {
    default: 'إكسورا كود | شركة تطوير مواقع وتطبيقات في عدن اليمن',
    template: '%s | إكسورا كود',
  },
  description:
    'إكسورا كود — شركة برمجة يمنية متخصصة في تطوير المواقع والتطبيقات والحلول الرقمية. نخدم عملاء من عدن واليمن والوطن العربي. احترافية عالمية بفهم محلي.',
  keywords: KEYWORDS,
  authors: [{ name: 'إكسورا كود', url: 'https://exoracode.netlify.app' }],
  creator: 'إكسورا كود',
  publisher: 'إكسورا كود',
  verification: {
    google: '8FyiYf_UtYlwmtt_3vK0u7B0-l9L-Y1-p0mG9-Kq-M',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    title: 'إكسورا كود | شركة تطوير مواقع وتطبيقات — عدن، اليمن',
    description: 'شركة برمجة يمنية متخصصة في تطوير المواقع والتطبيقات والحلول الرقمية المخصصة.',
    locale: 'ar_YE',
    type: 'website',
    url: 'https://exoracode.netlify.app',
    siteName: 'إكسورا كود',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'إكسورا كود — شركة برمجة عدن اليمن' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'إكسورا كود | برمجة مواقع وتطبيقات — اليمن',
    description: 'شركة برمجة يمنية محترفة. مواقع، تطبيقات، حلول رقمية.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://exoracode.netlify.app',
    languages: { 'ar-YE': 'https://exoracode.netlify.app' },
  },
  category: 'technology',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://exoracode.com',
    name: 'إكسورا كود',
    alternateName: ['اكسورا كود', 'إكسورا', 'اكسورا', 'Exora Code', 'ExoraCode'],
    description: 'شركة برمجة يمنية متخصصة في تطوير المواقع الإلكترونية والتطبيقات والحلول الرقمية.',
    url: 'https://exoracode.com',
    logo: 'https://exoracode.com/logo.png',
    image: 'https://exoracode.com/og-image.png',
    telephone: '+967-000-000-000',
    email: 'hello@exoracode.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'عدن',
      addressLocality: 'عدن',
      addressRegion: 'عدن',
      addressCountry: 'YE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 12.7854,
      longitude: 45.0187,
    },
    areaServed: [
      { '@type': 'Country', name: 'اليمن' },
      { '@type': 'Country', name: 'المملكة العربية السعودية' },
      { '@type': 'Country', name: 'الإمارات العربية المتحدة' },
    ],
    sameAs: ['https://exoracode.com'],
    priceRange: '$$',
    openingHours: 'Mo-Sa 09:00-18:00',
    knowsLanguage: ['ar', 'en'],
    serviceType: [
      'تطوير مواقع إلكترونية', 'تطوير تطبيقات الجوال',
      'تصميم UI/UX', 'حلول برمجية مخصصة',
      'متاجر إلكترونية', 'تحسين محركات البحث',
    ],
    foundingLocation: { '@type': 'Place', name: 'عدن، اليمن' },
    keywords: 'برمجة اليمن, تطوير مواقع عدن, إكسورا كود, اكسورا, شركة برمجة يمنية',
  }

  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="geo.region" content="YE-AD" />
        <meta name="geo.placename" content="عدن، اليمن" />
        <meta name="geo.position" content="12.7854;45.0187" />
        <meta name="ICBM" content="12.7854, 45.0187" />
        <meta name="language" content="Arabic" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LangProvider><ToastProvider>{children}</ToastProvider></LangProvider>
      </body>
    </html>
  )
}
