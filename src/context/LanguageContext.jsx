import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    nav: {
      home: 'Home',
      cars: 'Cars',
      spareParts: 'Spare Parts',
      maintenance: 'Maintenance',
      about: 'About Us',
      contact: 'Contact',
      contactUsCTA: 'Contact Us',
      searchPlaceholder: 'Search cars, parts, maintenance...'
    },
    topBar: {
      address: '19 El-Galaa El-Bahary Street, Shebin El-Kom, Menoufia',
      callUs: 'Call Us'
    },
    hero: {
      slideCounter: 'Slide',
      exploreCars: 'Explore Cars',
      viewCars: 'View Cars',
      exploreParts: 'Explore Parts',
      bookService: 'Book a Service'
    },
    services: {
      sectionBadge: 'What We Do',
      sectionTitle: 'Our Automotive Services',
      sectionSubtitle: 'Comprehensive vehicle solutions crafted for reliability, performance, and complete driving satisfaction.',
      learnMore: 'Learn More'
    },
    about: {
      badge: 'ABOUT BOO',
      heading: 'Your Trusted Automotive Partner',
      learnMore: 'Learn More About BOO',
      quality: 'Quality',
      qualityDesc: 'Rigorous standards for every vehicle and spare part we supply.',
      reliability: 'Reliability',
      reliabilityDesc: 'Proven track record with transparent guarantees and dependable delivery.',
      service: 'Professional Service',
      serviceDesc: 'Certified automotive engineers and dedicated customer support advisors.'
    },
    cars: {
      badge: 'Our Inventory',
      title: 'Featured Cars',
      subtitle: 'Explore some of our available vehicles selected for high performance and exceptional condition.',
      viewDetails: 'View Details',
      allCars: 'Browse All Inventory',
      zeroKm: 'Zero km',
      filterAll: 'All Makes',
      filterSedan: 'Sedan',
      filterSUV: 'SUV',
      filterCoupe: 'Coupé'
    },
    parts: {
      badge: 'Genuine Parts',
      title: 'Spare Parts & Accessories',
      subtitle: 'Reliable automotive components and OEM parts engineered for durability and peak road safety.',
      browseCTA: 'Browse Spare Parts',
      inquireCTA: 'Request Specific Part',
      inStock: 'In Stock',
      category: 'Category'
    },
    maintenance: {
      badge: 'Service Center',
      title: 'Professional Maintenance & Repair',
      subtitle: 'Keep your vehicle operating with maximum reliability using our certified workshop diagnostics and maintenance.',
      bookCTA: 'Book a Service',
      duration: 'Est. Time'
    },
    why: {
      badge: 'Why Choose Us',
      title: 'Why Choose BOO?',
      subtitle: 'We combine international sourcing capabilities, precision technical engineering, and dedicated customer care.'
    },
    cta: {
      heading: 'Looking for the Right Automotive Solution?',
      desc: 'Whether you need a car, spare parts or professional maintenance, BOO is ready to help.',
      contactBtn: 'Contact Us',
      servicesBtn: 'Explore Services'
    },
    footer: {
      aboutCompany: 'BOO provides integrated automotive solutions including car import, vehicle sales, genuine spare parts, and certified maintenance across Egypt.',
      quickLinks: 'Quick Links',
      services: 'Services',
      contactInfo: 'Contact Information',
      rights: 'All rights reserved.'
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      cars: 'السيارات',
      spareParts: 'قطع الغيار',
      maintenance: 'الصيانة',
      about: 'من نحن',
      contact: 'اتصل بنا',
      contactUsCTA: 'تواصل معنا',
      searchPlaceholder: 'ابحث عن سيارات، قطع غيار، صيانة...'
    },
    topBar: {
      address: '١٩ شارع الجلاء البحري، شبين الكوم، المنوفية',
      callUs: 'اتصل بنا'
    },
    hero: {
      slideCounter: 'شريحة',
      exploreCars: 'استكشف السيارات',
      viewCars: 'عرض السيارات',
      exploreParts: 'استكشف قطع الغيار',
      bookService: 'احجز صيانة'
    },
    services: {
      sectionBadge: 'خدماتنا',
      sectionTitle: 'خدمات السيارات المتكاملة',
      sectionSubtitle: 'حلول سيارات متكاملة صممت لتوفر لك أعلى مستويات الاعتمادية والأداء.',
      learnMore: 'المزيد من التفاصيل'
    },
    about: {
      badge: 'عن شركة BOO',
      heading: 'شريكك الموثوق في عالم السيارات',
      learnMore: 'اعرف المزيد عن BOO',
      quality: 'الجودة',
      qualityDesc: 'أعلى معايير الفحص الدقيق لكل سيارة وقطعة غيار نوفرها.',
      reliability: 'الاعتمادية',
      reliabilityDesc: 'سجل حافل بالثقة مع ضمانات واضحة والتزام تام بمواعيد التسليم.',
      service: 'خدمة احترافية',
      serviceDesc: 'مهندسون وفنيون معتمدون وفريق دعم متخصص في خدمتك دائماً.'
    },
    cars: {
      badge: 'معرض السيارات',
      title: 'السيارات المميزة',
      subtitle: 'استكشف نخبة من أفضل سياراتنا المتاحة بحالة استثنائية وأعلى المواصفات.',
      viewDetails: 'عرض التفاصيل',
      allCars: 'تصفح كل السيارات',
      zeroKm: 'زيرو كم',
      filterAll: 'جميع الماركات',
      filterSedan: 'سيدان',
      filterSUV: 'دفع رباعي SUV',
      filterCoupe: 'كوبيه'
    },
    parts: {
      badge: 'قطع غيار أصلية',
      title: 'قطع الغيار والاكسسوارات',
      subtitle: 'مكونات وقطع غيار أصلية ومضمونة لتحقيق أعلى مستويات الأمان والأداء.',
      browseCTA: 'تصفح قطع الغيار',
      inquireCTA: 'طلب قطعة محددة',
      inStock: 'متوفر',
      category: 'القسم'
    },
    maintenance: {
      badge: 'مركز الخدمة',
      title: 'الصيانة الاحترافية والإصلاح',
      subtitle: 'حافظ على سيارتك في أفضل حالاتها مع خدمات الصيانة المعتمدة وأحدث أجهزة الفحص.',
      bookCTA: 'حجز موعد صيانة',
      duration: 'الوقت المقدر'
    },
    why: {
      badge: 'لماذا BOO',
      title: 'لماذا تختار BOO؟',
      subtitle: 'نجمع بين قدرات الاستيراد العالمي والخبرة الهندسية الدقيقة وخدمة العملاء المتميزة.'
    },
    cta: {
      heading: 'تبحث عن الحل المناسب لسيارتك؟',
      desc: 'سواء كنت تبحث عن استيراد سيارة أو شراء سيارة أو قطع غيار أصلية أو صيانة احترافية، BOO في خدمتك.',
      contactBtn: 'تواصل معنا',
      servicesBtn: 'استكشف الخدمات'
    },
    footer: {
      aboutCompany: 'تقدم شركة BOO حلولاً متكاملة للسيارات تشمل الاستيراد والبيع وتوفير قطع الغيار الأصلية وخدمات الصيانة المعتمدة في مصر.',
      quickLinks: 'روابط سريعة',
      services: 'الخدمات',
      contactInfo: 'بيانات التواصل',
      rights: 'جميع الحقوق محفوظة.'
    }
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = translations[lang] || translations.en;

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
