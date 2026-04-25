import { prisma } from '@/lib/prisma'
import FAQClient from './FAQClient'

const DEFAULT_FAQS = [
  {
    id: 'd1',
    question: 'كم يستغرق تطوير موقع ويب احترافي؟',
    answer: 'يعتمد الوقت على حجم المشروع وتعقيده. الموقع التعريفي البسيط يستغرق من أسبوعين إلى ثلاثة أسابيع، بينما المشاريع المتكاملة قد تحتاج من شهر إلى ثلاثة أشهر. نحدد الجدول الزمني الدقيق في بداية كل مشروع.',
    order: 0,
    visible: true,
  },
  {
    id: 'd2',
    question: 'هل تقدمون دعماً فنياً بعد إطلاق المشروع؟',
    answer: 'نعم، جميع باقاتنا تشمل فترة دعم مجانية بعد الإطلاق. الباقة الأساسية تشمل شهراً، والأعمال ثلاثة أشهر، والشركات سنة كاملة مع تحديثات دورية.',
    order: 1,
    visible: true,
  },
  {
    id: 'd3',
    question: 'هل يمكنني تعديل محتوى موقعي بنفسي؟',
    answer: 'بالتأكيد! نبني لوحة تحكم سهلة الاستخدام تتيح لك إضافة وتعديل وحذف أي محتوى في موقعك بدون أي خبرة تقنية.',
    order: 2,
    visible: true,
  },
  {
    id: 'd4',
    question: 'ما هي تقنيات التطوير التي تستخدمونها؟',
    answer: 'نستخدم أحدث التقنيات: Next.js وReact للواجهة الأمامية، Node.js وPrisma للخلفية، وقواعد بيانات PostgreSQL وMongoDB. نختار التقنية المناسبة لكل مشروع.',
    order: 3,
    visible: true,
  },
  {
    id: 'd5',
    question: 'كيف تتم عملية الدفع والتسعير؟',
    answer: 'نعتمد نظام دفع على مراحل: 40% عند بدء المشروع، 40% عند تسليم النسخة الأولى، و20% عند الإطلاق النهائي. الأسعار شفافة وبلا رسوم مخفية.',
    order: 4,
    visible: true,
  },
  {
    id: 'd6',
    question: 'هل تعملون مع عملاء من خارج المملكة؟',
    answer: 'نعم! نعمل مع عملاء من جميع أنحاء العالم العربي وخارجه. فريقنا يعمل عن بُعد بكفاءة عالية مع توفير قنوات تواصل واضحة ومنتظمة.',
    order: 5,
    visible: true,
  },
]

async function getFAQs() {
  try {
    const faqs = await prisma.fAQ.findMany({
      where: { visible: true },
      orderBy: { order: 'asc' },
    })
    return faqs.length > 0 ? faqs : DEFAULT_FAQS
  } catch {
    return DEFAULT_FAQS
  }
}

export default async function FAQSection() {
  const faqs = await getFAQs()
  return <FAQClient faqs={faqs} />
}
