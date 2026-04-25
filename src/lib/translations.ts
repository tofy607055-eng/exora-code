export const translations = {
  ar: {
    nav: {
      home: 'الرئيسية', about: 'من نحن', services: 'خدماتنا',
      portfolio: 'أعمالنا', blog: 'المدونة', pricing: 'الأسعار',
      contact: 'تواصل معنا', faq: 'الأسئلة الشائعة',
    },
    hero: {
      badge: 'متاح للمشاريع الجديدة ✨',
      title: 'نبني منتجاتك',
      titleHighlight: 'الرقمية',
      subtitle: 'إكسورا كود — شريكك التقني لبناء مواقع وتطبيقات احترافية تحقق أهدافك وتنمو معك.',
      cta: 'ابدأ مشروعك',
      ctaSecond: 'شاهد أعمالنا',
    },
    common: {
      loading: 'جاري التحميل...',
      send: 'إرسال',
      save: 'حفظ',
      cancel: 'إلغاء',
      delete: 'حذف',
      edit: 'تعديل',
      add: 'إضافة',
      viewAll: 'عرض الكل',
      readMore: 'اقرأ المزيد',
    },
    footer: {
      rights: 'جميع الحقوق محفوظة',
      description: 'نصنع منتجات رقمية تصنع الفرق.',
    },
  },
  en: {
    nav: {
      home: 'Home', about: 'About', services: 'Services',
      portfolio: 'Portfolio', blog: 'Blog', pricing: 'Pricing',
      contact: 'Contact', faq: 'FAQ',
    },
    hero: {
      badge: 'Available for new projects ✨',
      title: 'We build your',
      titleHighlight: 'Digital Products',
      subtitle: 'Exora Code — Your tech partner for building professional websites and apps that achieve your goals.',
      cta: 'Start Your Project',
      ctaSecond: 'View Our Work',
    },
    common: {
      loading: 'Loading...',
      send: 'Send',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      viewAll: 'View All',
      readMore: 'Read More',
    },
    footer: {
      rights: 'All rights reserved',
      description: 'We build digital products that make a difference.',
    },
  },
}

export type Lang = 'ar' | 'en'
export type TranslationKey = typeof translations.ar
