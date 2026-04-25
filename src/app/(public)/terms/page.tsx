export default function TermsPage() {
  return (
    <>
      <section style={{ paddingTop: '8rem', paddingBottom: '4rem', background: 'linear-gradient(135deg, #0A001F 0%, #12002B 100%)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
          <h1 style={{ color: 'white', fontWeight: 900, fontSize: '2.5rem', fontFamily: 'Cairo, sans-serif' }}>الشروط والأحكام</h1>
          <p style={{ color: '#B8B8C7', fontFamily: 'Cairo, sans-serif', marginTop: '0.5rem' }}>آخر تحديث: يناير 2025</p>
        </div>
      </section>
      <section style={{ padding: '4rem 0', background: '#0A001F' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem', color: '#B8B8C7', fontFamily: 'Cairo, sans-serif', lineHeight: 2 }}>
          {[
            { title: '1. شروط استخدام الموقع', text: 'باستخدامك لهذا الموقع، فإنك توافق على هذه الشروط والأحكام. إذا لم توافق عليها، يرجى عدم استخدام الموقع.' },
            { title: '2. حقوق الملكية الفكرية', text: 'جميع المحتويات الموجودة في الموقع من نصوص وصور وتصاميم هي ملك لإكسورا كود ومحمية بموجب قوانين حقوق الملكية الفكرية.' },
            { title: '3. حدود المسؤولية', text: 'لا تتحمل إكسورا كود المسؤولية عن أي أضرار مباشرة أو غير مباشرة ناتجة عن استخدام خدماتنا خارج نطاق الاتفاقية المبرمة.' },
            { title: '4. شروط الخدمات', text: 'تبدأ الخدمة بعد الاتفاق على المتطلبات وسداد الدفعة الأولى. التعديلات خارج نطاق المشروع تخضع لتسعير إضافي.' },
            { title: '5. التعديلات', text: 'تحتفظ إكسورا كود بحق تعديل هذه الشروط في أي وقت. سيتم إخطار المستخدمين بأي تغييرات جوهرية.' },
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
