import type { Metadata } from 'next'
import PortfolioClient from './PortfolioClient'

export const metadata: Metadata = {
  title: 'أعمالنا | مشاريع برمجية في عدن اليمن | إكسورا كود',
  description: 'تصفح مشاريع إكسورا كود — شركة برمجة يمنية في عدن متخصصة في تطوير المواقع والتطبيقات وتصميم UI/UX.',
  keywords: 'أعمال برمجية يمن, مشاريع تطوير عدن, معرض أعمال يمني, إكسورا كود, اكسورا, بورتفوليو برمجة عربي',
  openGraph: { title: 'أعمالنا | إكسورا كود — عدن، اليمن', locale: 'ar_YE' },
}

export default function PortfolioPage() {
  return <PortfolioClient />
}
