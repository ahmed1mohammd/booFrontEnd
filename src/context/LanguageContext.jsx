import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    nav: {
      home: 'Home',
      spareParts: 'Spare Parts',
      accessories: 'Accessories',
      maintenance: 'Maintenance',
      about: 'About Us',
      contact: 'Contact',
      contactUsCTA: 'Contact Us',
      searchPlaceholder: 'Search spare parts, accessories, maintenance...'
    },
    topBar: {
      address: '19 El-Galaa El-Bahary Street, Shebin El-Kom, Menoufia',
      callUs: 'Call Us'
    },
    hero: {
      slideCounter: 'Slide',
      exploreParts: 'Explore Spare Parts',
      exploreAccessories: 'Explore Accessories',
      bookService: 'Book a Service'
    },
    services: {
      sectionBadge: 'What We Do',
      sectionTitle: 'Our Automotive Services',
      sectionSubtitle: 'Specialized spare parts, premium accessories, and certified maintenance crafted for reliability and performance.',
      learnMore: 'Learn More'
    },
    about: {
      badge: 'ABOUT BOO',
      heading: 'Your Trusted Automotive Partner',
      learnMore: 'Learn More About BOO',
      quality: 'Quality',
      qualityDesc: 'Rigorous standards for every spare part, accessory, and service we supply.',
      reliability: 'Reliability',
      reliabilityDesc: 'Proven track record with transparent guarantees and dependable delivery.',
      service: 'Professional Service',
      serviceDesc: 'Certified automotive engineers and dedicated customer support advisors.'
    },
    accessories: {
      badge: 'Premium Accessories',
      title: 'Car Accessories',
      subtitle: 'Elevate your vehicle with premium styling, protection, and high-tech automotive accessories.',
      viewDetails: 'View Details',
      browseCTA: 'Browse Accessories',
      inStock: 'In Stock',
      category: 'Category'
    },
    parts: {
      badge: 'Genuine Parts',
      title: 'Spare Parts',
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
      subtitle: 'We combine genuine components sourcing, precision technical engineering, and dedicated customer care.'
    },
    cta: {
      heading: 'Looking for the Right Automotive Solution?',
      desc: 'Whether you need genuine spare parts, car accessories, or professional maintenance, BOO is ready to help.',
      contactBtn: 'Contact Us',
      servicesBtn: 'Explore Services'
    },
    footer: {
      aboutCompany: 'BOO provides high-quality genuine spare parts, premium car accessories, and certified maintenance services across Egypt.',
      quickLinks: 'Quick Links',
      services: 'Services',
      contactInfo: 'Contact Information',
      rights: 'All rights reserved.',
      legalNotice: 'Legal Notice',
      shippingPolicy: 'Shipping Policy',
      privacyPolicy: 'Privacy Policy',
      refundPolicy: 'Refund & Return Policy',
      trackOrder: 'Track Order'
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      spareParts: 'قطع الغيار',
      accessories: 'الإكسسوارات',
      maintenance: 'الصيانة',
      about: 'من نحن',
      contact: 'اتصل بنا',
      contactUsCTA: 'تواصل معنا',
      searchPlaceholder: 'ابحث عن قطع غيار، إكسسوارات، صيانة...'
    },
    topBar: {
      address: '١٩ شارع الجلاء البحري، شبين الكوم، المنوفية',
      callUs: 'اتصل بنا'
    },
    hero: {
      slideCounter: 'شريحة',
      exploreParts: 'استكشف قطع الغيار',
      exploreAccessories: 'استكشف الإكسسوارات',
      bookService: 'احجز صيانة'
    },
    services: {
      sectionBadge: 'خدماتنا',
      sectionTitle: 'خدماتنا المتخصصة',
      sectionSubtitle: 'قطع غيار أصلية، إكسسوارات متميزة، وخدمات صيانة احترافية معتمدة لأعلى مستويات الاعتمادية والأداء.',
      learnMore: 'المزيد من التفاصيل'
    },
    about: {
      badge: 'عن شركة BOO',
      heading: 'شريكك الموثوق لقطع الغيار والصيانة',
      learnMore: 'اعرف المزيد عن BOO',
      quality: 'الجودة',
      qualityDesc: 'أعلى معايير الجودة والفحص الدقيق لقطع الغيار والإكسسوارات وخدمات الصيانة.',
      reliability: 'الاعتمادية',
      reliabilityDesc: 'سجل حافل بالثقة مع ضمانات واضحة والتزام تام بمواعيد التسليم.',
      service: 'خدمة احترافية',
      serviceDesc: 'مهندسون وفنيون معتمدون وفريق دعم متخصص في خدمتك دائماً.'
    },
    accessories: {
      badge: 'إكسسوارات متميزة',
      title: 'إكسسوارات السيارات',
      subtitle: 'ارتقِ بتجربة قيادتك مع أفضل إكسسوارات العناية والأناقة والحماية والإلكترونيات.',
      viewDetails: 'عرض التفاصيل',
      browseCTA: 'تصفح الإكسسوارات',
      inStock: 'متوفر',
      category: 'القسم'
    },
    parts: {
      badge: 'قطع غيار أصلية',
      title: 'قطع الغيار الأصلية',
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
      subtitle: 'نجمع بين توفير القطع الأصلية والخبرة الهندسية الدقيقة وخدمة العملاء المتميزة.'
    },
    cta: {
      heading: 'تبحث عن القطعة المناسبة أو صيانة لسيارتك؟',
      desc: 'سواء كنت تبحث عن قطع غيار أصلية، إكسسوارات مميزة، أو صيانة احترافية، BOO في خدمتك.',
      contactBtn: 'تواصل معنا',
      servicesBtn: 'استكشف الخدمات'
    },
    footer: {
      aboutCompany: 'تقدم شركة BOO قطع الغيار الأصلية، وإكسسوارات السيارات المتميزة، وخدمات الصيانة المعتمدة في مصر.',
      quickLinks: 'روابط سريعة',
      services: 'الخدمات',
      contactInfo: 'بيانات التواصل',
      rights: 'جميع الحقوق محفوظة.',
      legalNotice: 'الإشعار القانوني',
      shippingPolicy: 'سياسة التوصيل والشحن',
      privacyPolicy: 'سياسة الخصوصية',
      refundPolicy: 'سياسة الاسترجاع والإرجاع',
      trackOrder: 'تتبع الطلب'
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
