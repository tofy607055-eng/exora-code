import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <>
      <section style={{ paddingTop: '8rem', paddingBottom: '4rem', background: 'linear-gradient(135deg, #0A001F 0%, #12002B 100%)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
          <h1 style={{ color: 'white', fontWeight: 900, fontSize: '2.5rem', fontFamily: 'Cairo, sans-serif' }}>سياسة الخصوصية</h1>
          <p style={{ color: '#B8B8C7', fontFamily: 'Cairo, sans-serif', marginTop: '0.5rem' }}>آخر تحديث: يناير 2025</p>
        </div>
      </section>
      <section style={{ padding: '4rem 0', background: '#0A001F' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem', color: '#B8B8C7', fontFamily: 'Cairo, sans-serif', lineHeight: 2 }}>
          {[
            { title: '1. جمع البيانات', text: 'نجمع المعلومات التي تقدمها طوعاً عبر نموذج التواصل، وتشمل: الاسم، البريد الإلكتروني، رقم الجوال، ونوع الخدمة المطلوبة.' },
            { title: '2. استخدام البيانات', text: 'نستخدم البيانات المجمعة للرد على استفساراتك، تقديم خدماتنا، وتحسين تجربتك معنا. لن نبيع أو نشارك بياناتك مع أطراف ثالثة.' },
            { title: '3. حماية المعلومات', text: 'نتخذ إجراءات أمنية مناسبة لحماية معلوماتك من الوصول غير المصرح به أو الكشف أو التعديل أو الإتلاف.' },
            { title: '4. ملفات الارتباط (Cookies)', text: 'قد يستخدم موقعنا ملفات الارتباط لتحسين تجربة التصفح. يمكنك تعطيل الكوكيز من إعدادات متصفحك.' },
            { title: '5. التواصل معنا', text: 'لأي استفسارات حول سياسة الخصوصية، تواصل معنا عبر: hello@exoracode.com' },
          ].map(s => (
            <div key={s.title} style={{ marginBottom: '2rem' }}>
              <h2 style={{ color: 'white', fontWeight: 700, fontFamily: 'Cairo, sans-serif', marginBottom: '0.75rem', fontSize: '1.2rem' }}>{s.title}</h2>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
