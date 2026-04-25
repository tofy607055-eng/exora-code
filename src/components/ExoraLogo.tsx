/**
 * ExoraLogo — شعار نظيف ومقروء
 * E: مستطيلات | x: حرف X بزاوية 45° | o: حلقة دائرية
 */
export default function ExoraLogo({ height = 36 }: { height?: number }) {
  // viewBox 120 × 44 — نسبة عرض 2.73:1
  const w = Math.round(height * (120 / 44))
  return (
    <svg
      width={w}
      height={height}
      viewBox="0 0 120 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="إكسورا كود"
      style={{ display: 'block', flexShrink: 0, overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="exo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>

      {/* ══ E ══ — عمود رأسي + 3 أشرطة أفقية */}
      <rect x="2"  y="4"  width="5"  height="36" rx="2.5" fill="white" />
      <rect x="2"  y="4"  width="20" height="5.5" rx="2.5" fill="white" />
      <rect x="2"  y="19.5" width="15" height="5" rx="2.5" fill="white" />
      <rect x="2"  y="34.5" width="20" height="5.5" rx="2.5" fill="white" />

      {/* ══ X ══ — مركزه (50, 22)، ذراعان متقاطعان */}
      {/* ذراع \ من (36,8) إلى (64,36) */}
      <line x1="37" y1="8" x2="63" y2="36"
        stroke="url(#exo-g)" strokeWidth="7"
        strokeLinecap="round" />
      {/* ذراع / من (63,8) إلى (37,36) */}
      <line x1="63" y1="8" x2="37" y2="36"
        stroke="url(#exo-g)" strokeWidth="7"
        strokeLinecap="round" />

      {/* ══ O ══ — حلقة دائرية مركزها (97, 22) */}
      <circle cx="97" cy="22" r="15.5"
        stroke="white" strokeWidth="5.5" fill="none" />
    </svg>
  )
}
