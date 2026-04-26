import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import ScrollToTop from '@/components/ScrollToTop'
import PageTransition from '@/components/PageTransition'
import PageViewTracker from '@/components/PageViewTracker'
import SpotlightEffect from '@/components/SpotlightEffect'
import AnnouncementBar from '@/components/AnnouncementBar'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnnouncementBar />
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
