import React from 'react';
import { ShieldCheck, Lock, FileText, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BRAND_CONFIG } from '../data/homeData';

export default function LegalNoticePage() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const email = BRAND_CONFIG.contact.email || 'boo@booinvestment.online';

  return (
    <div className="boo-legal-page">
      {/* Page Banner / Header */}
      <div className="boo-page-header">
        <div className="container">
          <span className="section-badge" style={{ backgroundColor: 'rgba(0, 174, 239, 0.2)', color: '#FFFFFF' }}>
            <ShieldCheck size={14} />
            {isAr ? 'البيانات القانونية والخصوصية' : 'Legal & Privacy'}
          </span>
          <h1 style={{ color: '#FFFFFF', marginBottom: '0.75rem' }}>
            {isAr ? 'الإشعار القانوني وسياسة الخصوصية' : 'Legal Notice & Privacy Policy'}
          </h1>
          <p style={{ color: '#c2d8eb', maxWidth: '680px', margin: 0, fontSize: '1.05rem', lineHeight: '1.6' }}>
            {isAr
              ? 'تلتزم شركة BOO بحماية خصوصية بياناتك وتوفير أعلى مستويات الشفافية في الخدمات والتصرفات القانونية.'
              : 'BOO is committed to protecting your personal privacy and maintaining full legal transparency across all services and operations.'}
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="section" style={{ backgroundColor: 'var(--bg-main, #0b131f)', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          
          {/* Quick Contact Card */}
          <div style={{
            backgroundColor: 'var(--bg-sidebar, #121e2f)',
            border: '1px solid var(--border, rgba(255, 255, 255, 0.08))',
            borderRadius: 'var(--radius-md, 12px)',
            padding: '1.5rem 2rem',
            marginBottom: '3rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 174, 239, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary, #00aeef)'
              }}>
                <Mail size={24} />
              </div>
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted, #8ea0b5)', display: 'block' }}>
                  {isAr ? 'للتواصل والاستفسارات القانونية:' : 'Legal & Compliance Contact:'}
                </span>
                <a
                  href={`mailto:${email}`}
                  style={{
                    color: 'var(--primary, #00aeef)',
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    textDecoration: 'none'
                  }}
                >
                  {email}
                </a>
              </div>
            </div>

            <div style={{ fontSize: '0.9rem', color: 'var(--text-main, #d9e6f2)' }}>
              <strong>{BRAND_CONFIG.fullName}</strong> — Shebin El-Kom, Menoufia, Egypt
            </div>
          </div>

          {/* Section 1: Legal Notice / الإشعار القانوني */}
          <div style={{
            backgroundColor: 'var(--bg-sidebar, #121e2f)',
            border: '1px solid var(--border, rgba(255, 255, 255, 0.08))',
            borderRadius: 'var(--radius-lg, 16px)',
            padding: '2.5rem',
            marginBottom: '2.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
              <FileText size={24} color="var(--primary, #00aeef)" />
              <h2 style={{ fontSize: '1.6rem', color: '#FFFFFF', margin: 0 }}>
                {isAr ? 'أولاً: الإشعار القانوني (Legal Notice)' : '1. Legal Notice'}
              </h2>
            </div>

            <div style={{ color: 'var(--text-main, #d9e6f2)', lineHeight: '1.8', fontSize: '1rem' }}>
              <h3 style={{ color: 'var(--primary, #00aeef)', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                {isAr ? '1.1 معلومات المنشأة والموقع' : '1.1 Entity & Platform Information'}
              </h3>
              <p>
                {isAr
                  ? `يتم تشغيل وتقديم كافة الخدمات والمنتجات المعروضة عبر موقع BOO بواسطة ${BRAND_CONFIG.fullName} المسجلة في جمهورية مصر العربية.`
                  : `All services, products, and platform operations displayed on this website are operated and maintained by ${BRAND_CONFIG.fullName}, registered in the Arab Republic of Egypt.`}
              </p>

              <h3 style={{ color: 'var(--primary, #00aeef)', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                {isAr ? '1.2 حقوق الملكية الفكرية' : '1.2 Intellectual Property Rights'}
              </h3>
              <p>
                {isAr
                  ? 'جميع المواد والشعارات والنصوص والتصاميم والصور وقواعد البيانات وحقوق التأليف والنشر الموجودة على هذا الموقع هي ملك حصري لشركة BOO أو محتواة برخصة قانونية. يُحظر تماماً نسخ أو إعادة توزيع أي جزء من المحتوى دون إذن كتابي مسبق.'
                  : 'All logos, text, designs, product media, graphic elements, software code, and intellectual property displayed on this site are the exclusive property of BOO or used under legitimate authorization. Unauthorized copying, distribution, or reproduction is strictly prohibited.'}
              </p>

              <h3 style={{ color: 'var(--primary, #00aeef)', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                {isAr ? '1.3 إخلاء المسؤولية ودقة قطع الغيار' : '1.3 Disclaimer & Parts Compatibility'}
              </h3>
              <p>
                {isAr
                  ? 'تسعى BOO جاهدة لتقديم معلومات وتوافقات دقيقة لقطع الغيار والصيانة بناءً على رقم الشاسي (VIN) ومواصفات المصنّع الأصلي. تقع على عاتق العميل مسؤولية التأكد من التوافق الدقيق قبل التركيب النهائي عبر فنيين معتمدين.'
                  : 'BOO works diligently to verify all component specifications, OEM compatibility, and catalog descriptions. Vehicle owners are advised to verify exact fitment using their Vehicle Identification Number (VIN) or through our certified technical staff prior to installation.'}
              </p>
            </div>
          </div>

          {/* Section 2: Privacy Policy / سياسة الخصوصية */}
          <div style={{
            backgroundColor: 'var(--bg-sidebar, #121e2f)',
            border: '1px solid var(--border, rgba(255, 255, 255, 0.08))',
            borderRadius: 'var(--radius-lg, 16px)',
            padding: '2.5rem',
            marginBottom: '2.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
              <Lock size={24} color="var(--primary, #00aeef)" />
              <h2 style={{ fontSize: '1.6rem', color: '#FFFFFF', margin: 0 }}>
                {isAr ? 'ثانياً: سياسة الخصوصية (Privacy Policy)' : '2. Privacy Policy'}
              </h2>
            </div>

            <div style={{ color: 'var(--text-main, #d9e6f2)', lineHeight: '1.8', fontSize: '1rem' }}>
              <h3 style={{ color: 'var(--primary, #00aeef)', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                {isAr ? '2.1 البيانات التي نجمعها' : '2.1 Information We Collect'}
              </h3>
              <p>
                {isAr
                  ? 'نحن نجمع البيانات الشخصية الضرورية لإتمام الطلبات وصيانة السيارات فقط، وتشمل: الاسم، رقم الهاتف، عنوان التوصيل، عنوان البريد الإلكتروني، وبيانات السيارة (مثل موديل السيارة ورقم الشاسي).'
                  : 'We collect personal information necessary to process orders, confirm bookings, and manage delivery. This includes your name, phone number, shipping address, email address, and vehicle identifiers (e.g., model year and VIN).'}
              </p>

              <h3 style={{ color: 'var(--primary, #00aeef)', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                {isAr ? '2.2 كيفية استخدام البيانات' : '2.2 How We Use Your Data'}
              </h3>
              <ul style={{ paddingLeft: isAr ? '0' : '1.5rem', paddingRight: isAr ? '1.5rem' : '0', margin: '0.5rem 0' }}>
                <li>{isAr ? 'معالجة وتنفيذ طلبات شراء قطع الغيار والإكسسوارات.' : 'Fulfilling purchase orders and parts delivery.'}</li>
                <li>{isAr ? 'تأكيد مواعيد حجز الصيانة والاتصال بالعميل.' : 'Scheduling and confirming workshop servicing appointments.'}</li>
                <li>{isAr ? 'إرسال الفواتير وتحديثات حالة الشحن والتسليم.' : 'Sending order updates, invoices, and shipping tracking status.'}</li>
                <li>{isAr ? 'تقديم الدعم الفني واستشارات الأجزاء المخصصة.' : 'Providing technical customer support and custom sourcing inquiries.'}</li>
              </ul>

              <h3 style={{ color: 'var(--primary, #00aeef)', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                {isAr ? '2.3 حماية البيانات وعدم المشاركة' : '2.3 Data Protection & Non-Disclosure'}
              </h3>
              <p>
                {isAr
                  ? 'نحن نلتزم بعدم بيع أو تأجير أو مشاركة بياناتك الشخصية مع أي طرف ثالث لأغراض تسويقية. يتم مشاركة البيانات فقط مع شركات الشحن والتوصيل المعتمدة لإتمام التوصيل، أو وفقًا للمتطلبات القانونية والأنظمة المعمول بها.'
                  : 'We strictly protect your personal information and guarantee that data is never rented or sold to third parties for marketing purposes. Data is only shared with authorized logistics and shipping partners to complete your deliveries or when required by governing laws.'}
              </p>

              <h3 style={{ color: 'var(--primary, #00aeef)', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                {isAr ? '2.4 حقوق العميل وحذف البيانات' : '2.4 Your Rights & Data Requests'}
              </h3>
              <p>
                {isAr
                  ? `يحق لك في أي وقت الطلب للوصول إلى بياناتك الشخصية أو تعديلها أو طلب حذفها بالكامل من سجلاتنا عبر التواصل معنا مباشرة عبر البريد الإلكتروني الرسمي: ${email}`
                  : `You have full right to inspect, update, or request complete deletion of your stored personal profile at any time by contacting us directly at our official email: ${email}`}
              </p>
            </div>
          </div>

          {/* Section 3: Contact Box */}
          <div style={{
            backgroundColor: 'rgba(0, 174, 239, 0.08)',
            border: '1px solid rgba(0, 174, 239, 0.25)',
            borderRadius: 'var(--radius-md, 12px)',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#FFFFFF', marginBottom: '0.5rem' }}>
              {isAr ? 'هل لديك أي أسئلة بشأن الإشعار القانوني أو سياسة الخصوصية؟' : 'Questions Regarding Legal Notice or Privacy Policy?'}
            </h3>
            <p style={{ color: 'var(--text-muted, #8ea0b5)', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
              {isAr
                ? 'فريقنا التنفيذي والقانوني متاح للرد على كافة الاستفسارات.'
                : 'Our legal and support management team is ready to address any queries.'}
            </p>
            <a
              href={`mailto:${email}`}
              className="btn btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
                padding: '0.75rem 1.75rem',
                borderRadius: '6px',
                fontWeight: '600'
              }}
            >
              <Mail size={16} />
              <span>{email}</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
