'use client'
/**
 * SpotlightEffect — Injects a physical glow div into every
 * .hover-card and .srv-card element, with per-card mousemove tracking.
 * 
 * Uses MutationObserver to catch dynamically rendered cards.
 * Guaranteed to work regardless of stacking context or z-index.
 */
import { useEffect } from 'react'

const SELECTOR = '.hover-card, .srv-card, .spotlight-card'
const INJECTED_ATTR = 'data-spotlight-ok'

function injectIntoCard(card: HTMLElement) {
  if (card.hasAttribute(INJECTED_ATTR)) return
  card.setAttribute(INJECTED_ATTR, '1')

  // Ensure card is positioned
  const pos = getComputedStyle(card).position
  if (pos === 'static') card.style.position = 'relative'
  card.style.overflow = 'hidden'

  // Create the glow div
  const glow = document.createElement('div')
  glow.setAttribute('data-spotlight-glow', '1')
  glow.style.cssText = `
    position:absolute;
    width:500px; height:500px;
    border-radius:50%;
    background:radial-gradient(circle, var(--spotlight-color,rgba(192,132,252,0.13)) 0%, transparent 68%);
    opacity:0;
    transition:opacity 0.3s ease;
    pointer-events:none;
    z-index:0;
    left:-9999px; top:-9999px;
    transform:translate(-50%,-50%);
    will-change:left,top;
  `
  card.prepend(glow)

  // Raise existing children above the glow
  Array.from(card.children).forEach(child => {
    if (!(child as HTMLElement).hasAttribute('data-spotlight-glow')) {
      (child as HTMLElement).style.position = 'relative';
      (child as HTMLElement).style.zIndex = '1'
    }
  })

  const onMove = (e: MouseEvent) => {
    const r = card.getBoundingClientRect()
    glow.style.left = (e.clientX - r.left) + 'px'
    glow.style.top  = (e.clientY - r.top)  + 'px'
    glow.style.opacity = '1'
  }
  const onLeave = () => { glow.style.opacity = '0' }

  card.addEventListener('mousemove', onMove)
  card.addEventListener('mouseleave', onLeave)
}

export default function SpotlightEffect() {
  useEffect(() => {
    const run = () => {
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach(injectIntoCard)
    }

    // Initial scan (with small delay for SSR hydration)
    run()
    const t1 = setTimeout(run, 300)
    const t2 = setTimeout(run, 800)

    // Watch for dynamically added cards (portals, lazy loads, etc.)
    const observer = new MutationObserver(run)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      observer.disconnect()
    }
  }, [])

  return null
}
