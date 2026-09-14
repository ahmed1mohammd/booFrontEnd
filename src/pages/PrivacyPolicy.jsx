import React from 'react';
import { Lock, ShieldCheck, Eye, FileText, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BRAND_CONFIG } from '../data/homeData';

export default function PrivacyPolicy() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const email = BRAND_CONFIG.contact.email || 'boo@booinvestment.online';

  return (
    <div className="boo-privacy-policy-page">
      {/* Header Banner */}
      <div className="boo-page-header">
        <div className="container">
          <span className="section-badge" style={{ backgroundColor: 'rgba(0, 174, 239, 0.2)', color: '#FFFFFF' }}>
            <Lock size={14} />
            {isAr ? 'حماية البيانات' : 'Data Protection'}
          </span>
          <h1 style={{ color: '#FFFFFF', marginBottom: '0.75rem' }}>
            {isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
          </h1>
          <p style={{ color: '#c2d8eb', maxWidth: '680px', margin: 0, fontSize: '1.05rem', lineHeight: '1.6' }}>
            {isAr
              ? 'تلتزم شركة BOO بحماية خصوصية بياناتك الشخصية والمالية وفق أعلى المعايير الأمنية والقوانين المصرية.'
              : 'BOO is committed to protecting your personal and financial privacy under standard encryption and Egyptian regulations.'}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="section" style={{ backgroundColor: 'var(--bg-main, #0b131f)', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '960px' }}>

          <div style={{
            backgroundColor: 'var(--bg-sidebar, #121e2f)',
            border: '1px solid var(--border, rgba(255, 255, 255, 0.08))',
            borderRadius: 'var(--radius-lg, 16px)',
            padding: '2.5rem',
            marginBottom: '2.5rem'
          }}>

            {/* Section 1 */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: 'var(--primary, #00aeef)', fontSize: '1.25rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Eye size={20} />
                <span>{isAr ? '1. البيانات التي نجمعها' : '1. Information We Collect'}</span>
              </h3>
              <p style={{ color: 'var(--text-main, #d9e6f2)', lineHeight: '1.8', fontSize: '0.98rem' }}>
                {isAr
                  ? 'عند استخدام موقع BOO أو الشراء من متجرنا، نجمع البيانات الضرورية فقط لمعالجة الطلبات وتقديم الدعم الفني، وتشمل:'
                  : 'When using BOO or placing orders, we collect essential data required strictly for processing transactions and support:'}
              </p>
              <ul style={{ color: 'var(--text-main, #d9e6f2)', lineHeight: '1.8', fontSize: '0.98rem', paddingLeft: isAr ? 0 : '1.25rem', paddingRight: isAr ? '1.25rem' : 0 }}>
                <li>{isAr ? 'الاسم الثلاثي ورقم الهاتف لتأكيد التوصيل.' : 'Full name and mobile phone number for delivery confirmation.'}</li>
                <li>{isAr ? 'عنوان الشحن المفضل (المحافظة، المدينة، الشارع).' : 'Shipping address (Governorate, City, Detailed address).'}</li>
                <li>{isAr ? 'بيانات المركبة (الموديل، سنة الصنع، ورقم الشاسي VIN عند الطلب لضمان مطابقة القطعة).' : 'Vehicle identification details (Model, Year, VIN code for fitment verification).'}</li>
                <li>{isAr ? 'البريد الإلكتروني لإرسال الفواتير الإلكترونية وتحديثات الشحن.' : 'Email address for digital invoices and shipping notifications.'}</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: 'var(--primary, #00aeef)', fontSize: '1.25rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={20} />
                <span>{isAr ? '2. كيفية استخدام البيانات' : '2. How We Use Your Data'}</span>
              </h3>
              <ul style={{ color: 'var(--text-main, #d9e6f2)', lineHeight: '1.8', fontSize: '0.98rem', paddingLeft: isAr ? 0 : '1.25rem', paddingRight: isAr ? '1.25rem' : 0 }}>
                <li>{isAr ? 'معالجة وتنفيذ طلبات شراء قطع الغيار والإكسسوارات.' : 'Fulfilling purchase orders and logistics dispatch.'}</li>
                <li>{isAr ? 'تأكيد وحجز مواعيد الصيانة والفحص الفني بالمركز.' : 'Scheduling service appointments and workshop bookings.'}</li>
                <li>{isAr ? 'التواصل عند وجود استفسارات فنية أو طلب قطع مخصصة.' : 'Communicating technical assistance or custom part sourcing.'}</li>
                <li>{isAr ? 'تحسين جودة الخدمة وتجربة التسوق.' : 'Improving user experience and service quality.'}</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: 'var(--primary, #00aeef)', fontSize: '1.25rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={20} />
                <span>{isAr ? '3. حماية المعاملات المالية وتأمين البيانات' : '3. Security & Payment Protection'}</span>
              </h3>
              <p style={{ color: 'var(--text-main, #d9e6f2)', lineHeight: '1.8', fontSize: '0.98rem' }}>
                {isAr
                  ? 'تتم جميع المعاملات المالية الإلكترونية بشكل آمن ومشفّر بالكامل عبر بوابة الدفع الإلكتروني المعتمدة (Fawaterk). لا تقوم شركة BOO بتخزين أو حفظ بيانات الكروت البنكية أو أرقام الفيزا على خوادمها.'
                  : 'All electronic payments are processed through encrypted Fawaterk payment gateways. BOO does not store or process payment card credentials or credit card numbers on local servers.'}
              </p>
            </div>

            {/* Section 4 */}
            <div style={{ marginBottom: '1rem' }}>
              <h3 style={{ color: 'var(--primary, #00aeef)', fontSize: '1.25rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Lock size={20} />
                <span>{isAr ? '4. عدم مشاركة البيانات وحقوق العميل' : '4. Non-Disclosure & Your Rights'}</span>
              </h3>
              <p style={{ color: 'var(--text-main, #d9e6f2)', lineHeight: '1.8', fontSize: '0.98rem' }}>
                {isAr
                  ? 'نلتزم مطلقاً بعدم بيع أو تأجير أو مشاركة بياناتك الشخصية مع أي جهات خارجية لأغراض تسويقية. يتم مشاركة بيانات العنوان ورقم الهاتف فقط مع شركات الشحن المعتمدة لإتمام الشحن. يحق لك في أي وقت تعديل أو طلب حذف بياناتك الشخصية بالتواصل معنا.'
                  : 'We strictly guarantee never selling or renting personal data to third parties. Customer address and phone data are shared exclusively with delivery agents to perform shipment. You have full right to modify or request deletion of your account record at any time.'}
              </p>
            </div>

          </div>

          {/* Contact Box */}
          <div style={{
            backgroundColor: 'rgba(0, 174, 239, 0.08)',
            border: '1px solid rgba(0, 174, 239, 0.25)',
            borderRadius: 'var(--radius-md, 12px)',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#FFFFFF', marginBottom: '0.5rem' }}>
              {isAr ? 'هل لديك أي استفسار حول سياسة الخصوصية؟' : 'Questions About Privacy Policy?'}
            </h3>
            <a
              href={`mailto:${email}`}
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem' }}
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
