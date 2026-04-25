import Link from 'next/link'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/967000000000"
      target="_blank"
      rel="noopener noreferrer"
      title="تواصل عبر واتساب"
      style={{
        position: 'fixed', bottom: '1.5rem', left: '1.5rem', zIndex: 40,
        width: '3.25rem', height: '3.25rem', borderRadius: '50%',
        background: 'linear-gradient(135deg, #25D366, #128C7E)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', textDecoration: 'none',
        boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
        transition: 'all 0.3s',
      }}
    >
      <MessageCircle size={22} fill="white" />
    </a>
  )
}
