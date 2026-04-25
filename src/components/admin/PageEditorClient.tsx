'use client'
import { useState, useEffect } from 'react'
import { Save, Check, Eye } from 'lucide-react'

// تعريف حقول كل صفحة
const PAGE_SCHEMAS: Record<string, { label: string; fields: { key: string; label: string; type: 'text' | 'textarea' | 'url' }[] }> = {
  home: {
    label: 'الصفحة الرئيسية',
    fields: [
      { key: 'hero_title', label: 'عنوان الهيرو الرئيسي', type: 'text' },
      { key: 'hero_subtitle', label: 'النص الثانوي في الهيرو', type: 'text' },
      { key: 'hero_cta_primary', label: 'نص الزر الرئيسي', type: 'text' },
      { key: 'hero_cta_secondary', label: 'نص الزر الثانوي', type: 'text' },
      { key: 'stats_projects', label: 'عدد المشاريع (+120)', type: 'text' },
      { key: 'stats_clients', label: 'عدد العملاء (+95)', type: 'text' },
      { key: 'stats_years', label: 'سنوات الخبرة (+5)', type: 'text' },
      { key: 'about_title', label: 'عنوان قسم "من نحن"', type: 'text' },
      { key: 'about_description', label: 'وصف قسم "من نحن"', type: 'textarea' },
    ],
  },
  about: {
    label: 'صفحة من نحن',
    fields: [
      { key: 'hero_title', label: 'عنوان الصفحة', type: 'text' },
      { key: 'hero_subtitle', label: 'النص التعريفي', type: 'textarea' },
      { key: 'mission_title', label: 'عنوان قسم المهمة', type: 'text' },
      { key: 'mission_text', label: 'نص المهمة', type: 'textarea' },
      { key: 'vision_title', label: 'عنوان قسم الرؤية', type: 'text' },
      { key: 'vision_text', label: 'نص الرؤية', type: 'textarea' },
      { key: 'team_title', label: 'عنوان قسم الفريق', type: 'text' },
    ],
  },
  services: {
    label: 'صفحة الخدمات',
    fields: [
      { key: 'hero_title', label: 'عنوان الصفحة', type: 'text' },
      { key: 'hero_subtitle', label: 'النص التعريفي', type: 'textarea' },
      { key: 'cta_title', label: 'عنوان قسم الدعوة', type: 'text' },
      { key: 'cta_subtitle', label: 'نص قسم الدعوة', type: 'text' },
      { key: 'cta_button', label: 'نص زر الدعوة', type: 'text' },
    ],
  },
  pricing: {
    label: 'صفحة التسعير',
    fields: [
      { key: 'hero_title', label: 'عنوان الصفحة', type: 'text' },
      { key: 'hero_subtitle', label: 'النص التعريفي', type: 'textarea' },
      { key: 'cta_title', label: 'عنوان قسم CTA', type: 'text' },
      { key: 'cta_subtitle', label: 'نص قسم CTA', type: 'text' },
      { key: 'cta_button', label: 'نص الزر', type: 'text' },
    ],
  },
  contact: {
    label: 'صفحة التواصل',
    fields: [
      { key: 'hero_title', label: 'عنوان الصفحة', type: 'text' },
      { key: 'hero_subtitle', label: 'النص التعريفي', type: 'textarea' },
      { key: 'email', label: 'البريد الإلكتروني', type: 'text' },
      { key: 'phone', label: 'رقم الهاتف', type: 'text' },
      { key: 'whatsapp', label: 'رابط واتساب', type: 'url' },
      { key: 'address', label: 'العنوان', type: 'text' },
    ],
  },
  products: {
    label: 'صفحة البرامج',
    fields: [
      { key: 'hero_title', label: 'عنوان الصفحة', type: 'text' },
      { key: 'hero_subtitle', label: 'النص التعريفي', type: 'textarea' },
      { key: 'cta_title', label: 'عنوان قسم CTA', type: 'text' },
      { key: 'cta_subtitle', label: 'نص قسم CTA', type: 'text' },
      { key: 'cta_button', label: 'نص الزر', type: 'text' },
    ],
  },
  faq: {
    label: 'صفحة الأسئلة الشائعة',
    fields: [
      { key: 'hero_title', label: 'عنوان الصفحة', type: 'text' },
      { key: 'hero_subtitle', label: 'النص التعريفي', type: 'textarea' },
      { key: 'cta_title', label: 'عنوان قسم CTA', type: 'text' },
      { key: 'cta_subtitle', label: 'نص CTA', type: 'text' },
    ],
  },
  testimonials: {
    label: 'صفحة آراء العملاء',
    fields: [
      { key: 'hero_title', label: 'عنوان الصفحة', type: 'text' },
      { key: 'hero_subtitle', label: 'النص التعريفي', type: 'textarea' },
      { key: 'cta_title', label: 'عنوان قسم CTA', type: 'text' },
      { key: 'cta_subtitle', label: 'نص CTA', type: 'text' },
      { key: 'cta_button', label: 'نص الزر', type: 'text' },
    ],
  },
  privacy: {
    label: 'سياسة الخصوصية',
    fields: [
      { key: 'hero_title', label: 'عنوان الصفحة', type: 'text' },
      { key: 'hero_subtitle', label: 'النص الفرعي', type: 'text' },
      { key: 'last_updated', label: 'تاريخ آخر تحديث', type: 'text' },
      { key: 'content', label: 'محتوى الصفحة (Markdown)', type: 'textarea' },
    ],
  },
  terms: {
    label: 'الشروط والأحكام',
    fields: [
      { key: 'hero_title', label: 'عنوان الصفحة', type: 'text' },
      { key: 'hero_subtitle', label: 'النص الفرعي', type: 'text' },
      { key: 'last_updated', label: 'تاريخ آخر تحديث', type: 'text' },
      { key: 'content', label: 'محتوى الصفحة (Markdown)', type: 'textarea' },
    ],
  },
}

// Default values from current site content — shown when DB has no saved value yet
const PAGE_DEFAULTS: Record<string, Record<string, string>> = {
  home: {
    hero_title: 'نبني مستقبلك الرقمي',
    hero_subtitle: 'إكسورا كود شركة تقنية متخصصة في تطوير المنتجات الرقمية. تأسست بهدف واحد: مساعدة الشركات على بناء حضور رقمي يصنع فارقاً حقيقياً.',
    hero_cta_primary: 'ابدأ مشروعك',
    hero_cta_secondary: 'شاهد أعمالنا',
    stats_projects: '120',
    stats_clients: '95',
    stats_years: '5',
    about_title: 'من نحن؟',
    about_description: 'إكسورا كود شركة تقنية رائدة متخصصة في تطوير المنتجات الرقمية والحلول البرمجية المخصصة.',
  },
  about: {
    hero_title: 'نبني مستقبلك الرقمي',
    hero_subtitle: 'إكسورا كود شركة تقنية متخصصة في تطوير المنتجات الرقمية. تأسست بهدف واحد: مساعدة الشركات على بناء حضور رقمي يصنع فارقاً حقيقياً.',
    mission_title: 'مهمتنا',
    mission_text: 'تطوير حلول رقمية مبتكرة تساعد الشركات على النمو والتميز في السوق الرقمي من خلال تقنيات حديثة وفريق متخصص.',
    vision_title: 'رؤيتنا',
    vision_text: 'أن نكون الشريك التقني الأول للشركات في منطقة الشرق الأوسط وأفريقيا.',
    team_title: 'فريقنا',
  },
  services: {
    hero_title: 'خدماتنا المتكاملة',
    hero_subtitle: 'حلول تقنية شاملة تغطي احتياجاتك من التصميم حتى الإطلاق.',
    cta_title: 'جاهز لبدء مشروعك؟',
    cta_subtitle: 'تواصل معنا واحصل على استشارة مجانية',
    cta_button: 'ابدأ الآن',
  },
  contact: {
    hero_title: 'تواصل معنا',
    hero_subtitle: 'نحن هنا للإجابة على استفساراتك',
    email: 'hello@exoracode.com',
    phone: '+967 7X XXX XXXX',
    whatsapp: 'https://wa.me/967XXXXXXXXX',
    address: 'صنعاء، اليمن',
  },
  privacy: {
    hero_title: 'سياسة الخصوصية',
    hero_subtitle: 'نلتزم بحماية خصوصيتك وأمان بياناتك الشخصية',
    last_updated: new Date().toLocaleDateString('ar-SA'),
    content: '## جمع البيانات\nنجمع فقط البيانات الضرورية لتقديم خدماتنا.\n\n## حماية البيانات\nنستخدم أحدث تقنيات التشفير والحماية.\n\n## حقوقك\nيحق لك طلب الاطلاع على بياناتك أو تعديلها أو حذفها.',
  },
  terms: {
    hero_title: 'الشروط والأحكام',
    hero_subtitle: 'يرجى قراءة هذه الشروط بعناية قبل استخدام خدماتنا',
    last_updated: new Date().toLocaleDateString('ar-SA'),
    content: '## قبول الشروط\nباستخدام خدماتنا فأنت توافق على هذه الشروط.\n\n## الخدمات المقدمة\nنقدم خدمات التطوير الرقمي وفق الاتفاق المحدد في عقد الخدمة.\n\n## حقوق الملكية الفكرية\nجميع الأعمال المسلمة تنتقل ملكيتها الكاملة للعميل بعد سداد الدفعة النهائية.',
  },
}

const PAGE_URLS: Record<string, string> = {
  home: '/',
  about: '/about',
  services: '/services',
  products: '/products',
  contact: '/contact',
  faq: '/faq',
  testimonials: '/testimonials',
  privacy: '/privacy',
  terms: '/terms',
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.75rem', borderRadius: '0.625rem',
  background: 'rgba(30,0,64,0.5)', border: '1px solid rgba(123,62,255,0.2)',
  color: 'white', fontFamily: 'Cairo, sans-serif', boxSizing: 'border-box', fontSize: '0.95rem',
}

export default function PageEditorClient({ pageKey }: { pageKey: string }) {
  const schema = PAGE_SCHEMAS[pageKey]
  const [data, setData] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const defaults = PAGE_DEFAULTS[pageKey] ?? {}
    fetch(`/api/pages/${pageKey}`)
      .then(r => r.json())
      .then(d => {
        // Merge: DB values override defaults (if DB is empty, show defaults)
        setData({ ...defaults, ...d })
        setLoading(false)
      })
      .catch(() => { setData(defaults); setLoading(false) })
  }, [pageKey])

  const handleSave = async () => {
    setSaving(true)
    await fetch(`/api/pages/${pageKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (!schema) return (
    <div style={{ color: '#FF6B6B', padding: '2rem' }}>الصفحة غير موجودة في النظام</div>
  )

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ color: 'white', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.25rem' }}>{schema.label}</h1>
          <p style={{ color: '#B8B8C7', fontSize: '0.9rem' }}>تعديل محتوى الصفحة — يُحفظ مباشرة في قاعدة البيانات</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a
            href={PAGE_URLS[pageKey]}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.6rem 1rem', borderRadius: '0.75rem',
              background: 'rgba(123,62,255,0.1)', border: '1px solid rgba(123,62,255,0.2)',
              color: '#A066FF', textDecoration: 'none', fontSize: '0.875rem', fontFamily: 'Cairo, sans-serif',
            }}
          >
            <Eye size={16} /> معاينة الصفحة
          </a>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.65rem 1.25rem', borderRadius: '0.75rem', border: 'none', cursor: 'pointer',
              background: saved ? 'linear-gradient(135deg, #4ECDC4, #44B09A)' : 'linear-gradient(135deg, #7B3EFF, #A066FF)',
              color: 'white', fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: '0.9rem',
            }}
          >
            {saved ? <><Check size={16} /> تم الحفظ</> : <><Save size={16} /> {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}</>}
          </button>
        </div>
      </div>

      {loading ? (
        <p style={{ color: '#B8B8C7', textAlign: 'center', padding: '3rem' }}>جاري التحميل...</p>
      ) : (
        <div className="admin-card" style={{ padding: '2rem', borderRadius: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
            {schema.fields.map(field => (
              <div key={field.key} style={{ gridColumn: field.type === 'textarea' ? '1 / -1' : undefined }}>
                <label style={{ display: 'block', color: '#B8B8C7', fontSize: '0.85rem', marginBottom: '0.4rem', fontFamily: 'Cairo, sans-serif' }}>
                  {field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    rows={5}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    value={data[field.key] || ''}
                    onChange={e => setData({ ...data, [field.key]: e.target.value })}
                    placeholder={`أدخل ${field.label}...`}
                  />
                ) : (
                  <input
                    type={field.type === 'url' ? 'url' : 'text'}
                    style={inputStyle}
                    value={data[field.key] || ''}
                    onChange={e => setData({ ...data, [field.key]: e.target.value })}
                    placeholder={`أدخل ${field.label}...`}
                    dir={field.type === 'url' ? 'ltr' : 'rtl'}
                  />
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2rem', padding: '1rem', borderRadius: '0.75rem', background: 'rgba(78,205,196,0.05)', border: '1px solid rgba(78,205,196,0.15)' }}>
            <p style={{ color: '#4ECDC4', fontSize: '0.85rem', fontFamily: 'Cairo, sans-serif' }}>
              💡 ملاحظة: التغييرات تُحفظ في قاعدة البيانات. إذا كانت الصفحة تعتمد على CSS hardcoded فالتغييرات ستظهر بعد ربط الصفحات بـ API.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
