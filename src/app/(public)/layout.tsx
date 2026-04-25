import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import ScrollToTop from '@/components/ScrollToTop'
import PageTransition from '@/components/PageTransition'
import PageViewTracker from '@/components/PageViewTracker'
import SpotlightEffect from '@/components/SpotlightEffect'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SpotlightEffect />
      <PageViewTracker />
      <Navbar />
      <PageTransition>
        <main style={{ minHeight: '100vh' }}>{children}</main>
      </PageTransition>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  )
}
