import type { Metadata } from 'next'
import Link from 'next/link'
import { Target, Eye, Heart, Users, Zap, Award, ArrowLeft, Code2, Globe, Shield } from 'lucide-react'
import HeroBackground from '@/components/HeroBackground'

export const metadata: Metadata = {
  title: 'من نحن | إكسورا كود — شركة برمجة يمنية في عدن',
  description: 'تعرف على إكسورا كود — شركة برمجة يمنية متخصصة في تطوير المواقع والتطبيقات من عدن، اليمن.',
  keywords: 'إكسورا كود, اكسورا, شركة برمجة يمنية, مبرمج يمني, تطوير مواقع عدن',
  openGraph: { title: 'من نحن | إكسورا كود — عدن، اليمن', locale: 'ar_YE' },
}

const stats = [
  { num: '120+', label: 'مشروع منجز', color: '#7B3EFF', icon: <Award size={22} /> },
  { num: '95+',  label: 'عميل سعيد',  color: '#4ECDC4', icon: <Users size={22} /> },
  { num: '5+',   label: 'سنوات خبرة', color: '#FFD93D', icon: <Zap size={22} /> },
  { num: '100%', label: 'رضا العملاء', color: '#FF6B6B', icon: <Heart size={22} /> },
]

const values = [
  { icon: <Target size={24} />, title: 'رؤيتنا', desc: 'أن نكون الشريك الرقمي الأول للشركات في المنطقة العربية من خلال حلول تقنية تُحدث فارقاً حقيقياً.', color: '#7B3EFF' },
  { icon: <Eye size={24} />,    title: 'رسالتنا', desc: 'تطوير منتجات رقمية استثنائية تجمع بين التصميم الجميل والوظيفة العملية لمساعدة عملائنا على النمو.',  color: '#4ECDC4' },
  { icon: <Heart size={24} />,  title: 'قيمنا',   desc: 'الاحترافية، الابتكار، الشفافية، التميز في الجودة، والشراكة الحقيقية مع كل عميل في كل مرحلة.',  color: '#FF6B6B' },
]

const capabilities = [
  { icon: <Globe size={18} />,  label: 'مواقع احترافية',      color: '#7B3EFF' },
  { icon: <Code2 size={18} />,  label: 'تطبيقات جوال',        color: '#4ECDC4' },
  { icon: <Zap size={18} />,    label: 'حلول SaaS مخصصة',    color: '#FFD93D' },
  { icon: <Shield size={18} />, label: 'أنظمة إدارة آمنة',   color: '#FF6B6B' },
  { icon: <Users size={18} />,  label: 'تجربة مستخدم متميزة', color: '#A066FF' },
  { icon: <Award size={18} />,  label: 'تسليم في الموعد',     color: '#6BCB77' },
]

const team = [
  { name: 'محمد العلي',   role: 'مؤسس ومدير تنفيذي',   color: '#7B3EFF', skills: ['استراتيجية', 'قيادة', 'رؤية'] },
  { name: 'سارة الأحمد',  role: 'مديرة تصميم UI/UX',    color: '#4ECDC4', skills: ['Figma', 'Branding', 'UX'] },
  { name: 'خالد المطيري', role: 'مطور Full Stack',        color: '#FFD93D', skills: ['React', 'Node.js', 'DB'] },
  { name: 'نورة السالم',  role: 'مديرة مشاريع',          color: '#FF6B6B', skills: ['Agile', 'Scrum', 'Planning'] },
]

export default function AboutPage() {
  return (
    <>
      {/* ══ Hero ══ */}
      <section className="section-hero" style={{ background: 'linear-gradient(135deg, #0A001F 0%, #12002B 100%)' }}>
        <HeroBackground />
        <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
          <div className="badge" style={{ marginBottom: '1.5rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A066FF', display: 'block', boxShadow: '0 0 6px #A066FF' }} />
            من نحن
          </div>
          <h1 className="section-title" style={{ color: 'white', marginBottom: '1.25rem' }}>
            نبني مستقبلك{' '}
            <span className="text-gradient">الرقمي</span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '560px', margin: '0 auto 2.5rem' }}>
            شركة تقنية متخصصة في تطوير المنتجات الرقمية. تأسست بهدف واحد: مساعدة الشركات على بناء حضور رقمي يصنع فارقاً حقيقياً.
          </p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <Link href="/contact" className="btn-primary" style={{ textDecoration: 'none' }}>
              ابدأ مشروعك <ArrowLeft size={16} />
            </Link>
            <Link href="/portfolio" className="btn-outline" style={{ textDecoration: 'none' }}>
              شاهد أعمالنا
            </Link>
          </div>
        </div>
      </section>

      {/* ══ Stats ══ */}
      <section style={{ padding: '0', background: '#0A001F', position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div className="about-stats" style={{ transform: 'translateY(-2rem)', boxShadow: '0 24px 80px rgba(0,0,0,0.4)', borderRadius: '1.5rem', overflow: 'hidden' }}>
            {stats.map((s, i) => (
              <div key={i} style={{ textAlign: 'center', padding: 'clamp(1.25rem, 4vw, 2.5rem) 1rem', background: 'linear-gradient(145deg, rgba(15,0,38,0.95), rgba(10,0,25,0.98))', borderRight: i < stats.length - 1 ? '1px solid rgba(123,62,255,0.1)' : 'none' }}>
                <div style={{ color: s.color, display: 'flex', justifyContent: 'center', marginBottom: '0.5rem', opacity: 0.9 }}>{s.icon}</div>
                <div style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', fontWeight: 900, fontFamily: 'Cairo, sans-serif', background: `linear-gradient(135deg, white, ${s.color})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>
                  {s.num}
                </div>
                <div style={{ color: '#9090A8', fontSize: '0.825rem', fontFamily: 'Cairo, sans-serif', marginTop: '0.4rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .about-stats { display: grid; grid-template-columns: repeat(2, 1fr); background: rgba(123,62,255,0.15); gap: 1px; }
          @media (min-width: 640px) { .about-stats { grid-template-columns: repeat(4, 1fr); } }
        `}</style>
      </section>

      {/* ══ Story ══ */}
      <section className="section" style={{ background: 'linear-gradient(180deg, #0A001F 0%, #12002B 100%)' }}>
        <div className="container">
          <div className="about-story">
            <div>
              <div className="badge" style={{ marginBottom: '1.5rem', background: 'rgba(78,205,196,0.1)', borderColor: 'rgba(78,205,196,0.25)', color: '#4ECDC4' }}>قصتنا</div>
              <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2.25rem)', fontWeight: 900, fontFamily: 'Cairo, sans-serif', color: 'white', marginBottom: '1.25rem', lineHeight: 1.3 }}>
                من شغف بالتقنية إلى{' '}
                <span className="text-gradient">شركة رائدة</span>
              </h2>
              <p style={{ color: '#B8B8C7', lineHeight: 1.9, fontFamily: 'Cairo, sans-serif', marginBottom: '1rem', fontSize: '0.95rem' }}>
                بدأت إكسورا كود من شغف حقيقي بالتقنية والتصميم. أدركنا أن السوق العربي يحتاج إلى شريك تقني يفهم الثقافة المحلية ويقدم حلولاً عالمية المستوى.
              </p>
              <p style={{ color: '#B8B8C7', lineHeight: 1.9, fontFamily: 'Cairo, sans-serif', marginBottom: '2rem', fontSize: '0.95rem' }}>
                اليوم نعمل مع شركات من مختلف القطاعات ونقدم حلولاً رقمية تحقق نتائج قابلة للقياس.
              </p>
              <div className="grid-2" style={{ gap: '0.5rem' }}>
                {capabilities.map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.575rem 0.75rem', borderRadius: '0.625rem', background: `${c.color}0C`, border: `1px solid ${c.color}20` }}>
                    <span style={{ color: c.color, flexShrink: 0 }}>{c.icon}</span>
                    <span style={{ color: '#C8C8D8', fontSize: 'clamp(0.75rem, 2vw, 0.845rem)', fontFamily: 'Cairo, sans-serif' }}>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: 'linear-gradient(145deg, rgba(123,62,255,0.1), rgba(10,0,31,0.7))', border: '1px solid rgba(123,62,255,0.2)', borderRadius: '1.5rem', padding: 'clamp(1.5rem, 5vw, 3rem)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: '3rem', height: '3rem', borderRadius: '1rem', background: 'linear-gradient(135deg, #7B3EFF, #A066FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(123,62,255,0.4)', flexShrink: 0 }}>
                    <Code2 size={20} color="white" />
                  </div>
                  <div>
                    <div style={{ color: 'white', fontWeight: 800, fontFamily: 'Cairo, sans-serif' }}>إكسورا كود</div>
                    <div style={{ color: '#A066FF', fontSize: '0.8rem', fontFamily: 'Cairo, sans-serif' }}>شركة برمجيات متخصصة</div>
                  </div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '0.75rem', padding: '1.125rem', fontFamily: 'monospace', fontSize: 'clamp(0.72rem, 2vw, 0.82rem)', marginBottom: '1.5rem', border: '1px solid rgba(123,62,255,0.15)', overflowX: 'auto' }}>
                  <div style={{ color: '#9090A8', marginBottom: '0.25rem' }}>// ما نؤمن به</div>
                  <div><span style={{ color: '#A066FF' }}>const</span> <span style={{ color: '#4ECDC4' }}>mission</span> <span style={{ color: '#B8B8C7' }}>{`= {`}</span></div>
                  <div style={{ paddingRight: '1rem', color: '#B8B8C7' }}>quality: <span style={{ color: '#6BCB77' }}>"always"</span>,</div>
                  <div style={{ paddingRight: '1rem', color: '#B8B8C7' }}>deadline: <span style={{ color: '#6BCB77' }}>"respected"</span>,</div>
                  <div style={{ paddingRight: '1rem', color: '#B8B8C7' }}>client: <span style={{ color: '#6BCB77' }}>"first"</span>,</div>
                  <div style={{ color: '#B8B8C7' }}>{`}`}</div>
                </div>
                {[
                  { label: 'جودة الكود', val: 98, color: '#7B3EFF' },
                  { label: 'رضا العملاء', val: 100, color: '#4ECDC4' },
                  { label: 'الالتزام بالمواعيد', val: 95, color: '#FFD93D' },
                ].map((bar, i) => (
                  <div key={i} style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                      <span style={{ color: '#B8B8C7', fontSize: '0.8rem', fontFamily: 'Cairo, sans-serif' }}>{bar.label}</span>
                      <span style={{ color: bar.color, fontSize: '0.8rem', fontWeight: 700, fontFamily: 'Cairo, sans-serif' }}>{bar.val}%</span>
                    </div>
                    <div style={{ height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${bar.val}%`, borderRadius: '3px', background: `linear-gradient(90deg, ${bar.color}80, ${bar.color})` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>{`
          .about-story { display: grid; grid-template-columns: 1fr; gap: 2.5rem; }
          @media (min-width: 900px) { .about-story { grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; } }
        `}</style>
      </section>

      {/* ══ Values ══ */}
      <section className="section" style={{ background: 'linear-gradient(180deg, #12002B 0%, #0A001F 100%)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="badge" style={{ marginBottom: '1.25rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A066FF', display: 'block' }} />
              رؤيتنا ورسالتنا
            </div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', fontWeight: 900, fontFamily: 'Cairo, sans-serif', color: 'white', lineHeight: 1.2 }}>
              ما <span className="text-gradient">يحركنا</span>
            </h2>
          </div>
          <div className="grid-3">
            {values.map((v, i) => (
              <div key={i} className="hover-card" style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)', borderRadius: '1.25rem', background: `linear-gradient(145deg, ${v.color}0D, rgba(10,0,31,0.6))`, border: `1px solid ${v.color}22`, position: 'relative', overflow: 'hidden' }}>
                <div style={{ width: '3.25rem', height: '3.25rem', borderRadius: '1rem', background: `${v.color}18`, border: `1px solid ${v.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: v.color, marginBottom: '1.5rem', boxShadow: `0 4px 20px ${v.color}20` }}>{v.icon}</div>
                <h3 style={{ color: 'white', fontWeight: 800, fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', fontFamily: 'Cairo, sans-serif', marginBottom: '0.875rem' }}>{v.title}</h3>
                <p style={{ color: '#B8B8C7', lineHeight: 1.85, fontFamily: 'Cairo, sans-serif', fontSize: '0.9rem' }}>{v.desc}</p>
                <div style={{ position: 'absolute', bottom: 0, left: '20%', right: '20%', height: '2px', background: `linear-gradient(90deg, transparent, ${v.color}, transparent)` }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Team ══ */}
      <section className="section" style={{ background: 'linear-gradient(180deg, #0A001F 0%, #12002B 100%)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="badge" style={{ marginBottom: '1.25rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A066FF', display: 'block' }} />
              الفريق
            </div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', fontWeight: 900, fontFamily: 'Cairo, sans-serif', color: 'white', lineHeight: 1.2 }}>
              العقول <span className="text-gradient">المبدعة</span>
            </h2>
          </div>
          <div className="grid-4">
            {team.map((m, i) => (
              <div key={i} className="hover-card" style={{ borderRadius: '1.25rem', overflow: 'hidden', background: `linear-gradient(145deg, ${m.color}0D, rgba(10,0,31,0.7))`, border: `1px solid ${m.color}22`, textAlign: 'center' }}>
                <div style={{ padding: 'clamp(1.25rem, 4vw, 2rem) 1.25rem 1.25rem' }}>
                  <div style={{ width: 'clamp(3.5rem, 10vw, 5rem)', height: 'clamp(3.5rem, 10vw, 5rem)', borderRadius: '50%', background: `linear-gradient(135deg, ${m.color}, ${m.color}80)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', fontWeight: 900, color: 'white', fontFamily: 'Cairo, sans-serif', boxShadow: `0 8px 28px ${m.color}30` }}>
                    {m.name.charAt(0)}
                  </div>
                  <h3 style={{ color: 'white', fontWeight: 800, fontFamily: 'Cairo, sans-serif', marginBottom: '0.3rem', fontSize: 'clamp(0.9rem, 2.5vw, 1rem)' }}>{m.name}</h3>
                  <p style={{ color: m.color, fontSize: '0.78rem', fontFamily: 'Cairo, sans-serif', fontWeight: 600, marginBottom: '1rem' }}>{m.role}</p>
                  <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {m.skills.map(s => (
                      <span key={s} style={{ padding: '0.2rem 0.5rem', borderRadius: '0.4rem', fontSize: '0.7rem', background: `${m.color}12`, border: `1px solid ${m.color}25`, color: m.color, fontFamily: 'Cairo, sans-serif', fontWeight: 600 }}>{s}</span>
                    ))}
                  </div>
                </div>
                <div style={{ height: '3px', background: `linear-gradient(90deg, transparent, ${m.color}, transparent)` }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="section" style={{ background: '#0A001F' }}>
        <div className="container" style={{ maxWidth: '760px', textAlign: 'center' }}>
          <div style={{ background: 'linear-gradient(145deg, rgba(123,62,255,0.12), rgba(10,0,31,0.6))', border: '1px solid rgba(123,62,255,0.2)', borderRadius: '1.5rem', padding: 'clamp(2rem, 6vw, 3.5rem) clamp(1rem, 4vw, 2rem)' }}>
            <h2 style={{ fontSize: 'clamp(1.35rem, 3.5vw, 2.25rem)', fontWeight: 900, fontFamily: 'Cairo, sans-serif', color: 'white', marginBottom: '1rem', lineHeight: 1.3 }}>
              هل أنت مستعد لبناء <span className="text-gradient">مشروعك؟</span>
            </h2>
            <p style={{ color: '#B8B8C7', fontFamily: 'Cairo, sans-serif', lineHeight: 1.8, marginBottom: '2rem' }}>
              انضم لأكثر من 95 عميل وثقوا بنا في بناء حضورهم الرقمي.
            </p>
            <div className="hero-actions" style={{ justifyContent: 'center' }}>
              <Link href="/contact" className="btn-primary" style={{ textDecoration: 'none' }}>ابدأ مشروعك <ArrowLeft size={16} /></Link>
              <Link href="/portfolio" className="btn-outline" style={{ textDecoration: 'none' }}>شاهد أعمالنا</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
