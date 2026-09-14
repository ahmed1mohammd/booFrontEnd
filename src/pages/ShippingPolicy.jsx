import React from 'react';
import { Truck, MapPin, Clock, ShieldCheck, HelpCircle, PackageCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BRAND_CONFIG } from '../data/homeData';

export default function ShippingPolicy() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const email = BRAND_CONFIG.contact.email || 'boo@booinvestment.online';

  return (
    <div className="boo-shipping-policy-page">
      {/* Header Banner */}
      <div className="boo-page-header">
        <div className="container">
          <span className="section-badge" style={{ backgroundColor: 'rgba(0, 174, 239, 0.2)', color: '#FFFFFF' }}>
            <Truck size={14} />
            {isAr ? 'سياسات المتجر' : 'Store Policies'}
          </span>
          <h1 style={{ color: '#FFFFFF', marginBottom: '0.75rem' }}>
            {isAr ? 'سياسة التوصيل والشحن' : 'Shipping & Delivery Policy'}
          </h1>
          <p style={{ color: '#c2d8eb', maxWidth: '680px', margin: 0, fontSize: '1.05rem', lineHeight: '1.6' }}>
            {isAr
              ? 'نضمن لك شحن وتوصيل قطع الغيار والإكسسوارات بسرعة وأمان لجميع محافظات جمهورية مصر العربية.'
              : 'We guarantee fast and secure shipping of spare parts and accessories across all Egyptian governorates.'}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="section" style={{ backgroundColor: 'var(--bg-main, #0b131f)', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '960px' }}>

          {/* Quick Info Grid */}
          <div className="grid-3" style={{ marginBottom: '3rem', gap: '1.25rem' }}>
            <div style={{
              backgroundColor: 'var(--bg-sidebar, #121e2f)',
              border: '1px solid var(--border, rgba(255, 255, 255, 0.08))',
              borderRadius: 'var(--radius-md, 12px)',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                backgroundColor: 'rgba(0, 174, 239, 0.15)', color: 'var(--primary, #00aeef)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto'
              }}>
                <MapPin size={24} />
              </div>
              <h4 style={{ color: '#FFFFFF', margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>
                {isAr ? 'تغطية شاملة' : 'Nationwide Delivery'}
              </h4>
              <p style={{ color: 'var(--text-muted, #8ea0b5)', fontSize: '0.88rem', margin: 0 }}>
                {isAr ? 'التوصيل لجميع المحافظات والمناطق في مصر.' : 'Shipping to all governorates across Egypt.'}
              </p>
            </div>

            <div style={{
              backgroundColor: 'var(--bg-sidebar, #121e2f)',
              border: '1px solid var(--border, rgba(255, 255, 255, 0.08))',
              borderRadius: 'var(--radius-md, 12px)',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                backgroundColor: 'rgba(126, 194, 75, 0.15)', color: 'var(--hover-green, #7ec24b)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto'
              }}>
                <Clock size={24} />
              </div>
              <h4 style={{ color: '#FFFFFF', margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>
                {isAr ? 'توصيل سريع' : 'Fast Shipping'}
              </h4>
              <p style={{ color: 'var(--text-muted, #8ea0b5)', fontSize: '0.88rem', margin: 0 }}>
                {isAr ? 'خلال 24-48 ساعة داخل القاهرة والدلتا.' : '24-48 hrs in Cairo & Delta region.'}
              </p>
            </div>

            <div style={{
              backgroundColor: 'var(--bg-sidebar, #121e2f)',
              border: '1px solid var(--border, rgba(255, 255, 255, 0.08))',
              borderRadius: 'var(--radius-md, 12px)',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                backgroundColor: 'rgba(230, 81, 0, 0.15)', color: 'var(--secondary, #ff8c00)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto'
              }}>
                <PackageCheck size={24} />
              </div>
              <h4 style={{ color: '#FFFFFF', margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>
                {isAr ? 'معاينة الشحنة' : 'Inspect Upon Delivery'}
              </h4>
              <p style={{ color: 'var(--text-muted, #8ea0b5)', fontSize: '0.88rem', margin: 0 }}>
                {isAr ? 'إمكانية فحص القطع قبل التوقيع والاستلام.' : 'Verify items before accepting delivery.'}
              </p>
            </div>
          </div>

          {/* Detailed Policy Sections */}
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
                <MapPin size={20} />
                <span>{isAr ? '1. نطاق التوصيل والمناطق المخدومة' : '1. Delivery Coverage & Service Areas'}</span>
              </h3>
              <p style={{ color: 'var(--text-main, #d9e6f2)', lineHeight: '1.8', fontSize: '0.98rem' }}>
                {isAr
                  ? 'نقوم بشحن قطع الغيار وإكسسوارات السيارات إلى جميع محافظات جمهورية مصر العربية (القاهرة الكبرى، الجيزة، المنوفية وشبين الكوم، الإسكندرية، محافظات الدلتا، القناة، والصعيد). يتم الشحن عبر أسطولنا الخاص بالشركة أو عبر شركات الشحن السريع المعتمدة.'
                  : 'We ship automotive spare parts and accessories to all governorates across the Arab Republic of Egypt (Greater Cairo, Giza, Menoufia & Shebin El-Kom, Alexandria, Delta, Canal cities, and Upper Egypt) via our internal fleet and certified express shipping partners.'}
              </p>
            </div>

            {/* Section 2 */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: 'var(--primary, #00aeef)', fontSize: '1.25rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={20} />
                <span>{isAr ? '2. مواعيد ومدة التوصيل المتوقعة' : '2. Estimated Delivery Timeframes'}</span>
              </h3>
              <ul style={{ color: 'var(--text-main, #d9e6f2)', lineHeight: '1.8', fontSize: '0.98rem', paddingLeft: isAr ? 0 : '1.25rem', paddingRight: isAr ? '1.25rem' : 0 }}>
                <li>
                  <strong>{isAr ? 'محافظة المنوفية والدلتا والقاهرة الكبرى:' : 'Menoufia, Delta & Greater Cairo:'}</strong> {isAr ? 'خلال 24 إلى 48 ساعة عمل من تأكيد الطلب.' : 'Within 24 to 48 business hours from order confirmation.'}
                </li>
                <li>
                  <strong>{isAr ? 'الإسكندرية ومحافظات القناة:' : 'Alexandria & Canal Governorates:'}</strong> {isAr ? 'خلال 2 إلى 3 أيام عمل.' : 'Within 2 to 3 business days.'}
                </li>
                <li>
                  <strong>{isAr ? 'محافظات الصعيد والمناطق النائية:' : 'Upper Egypt & Remote Areas:'}</strong> {isAr ? 'خلال 3 إلى 5 أيام عمل.' : 'Within 3 to 5 business days.'}
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: 'var(--primary, #00aeef)', fontSize: '1.25rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Truck size={20} />
                <span>{isAr ? '3. تكاليف ورسوم الشحن' : '3. Shipping Fees & Calculation'}</span>
              </h3>
              <p style={{ color: 'var(--text-main, #d9e6f2)', lineHeight: '1.8', fontSize: '0.98rem' }}>
                {isAr
                  ? 'يتم حساب رسوم الشحن تلقائياً في صفحة الدفع بناءً على المحافظة والوزن الإجمالي للطلب. يتم توضيح تكلفة الشحن بوضوح قبل إتمام عملية الدفع.'
                  : 'Shipping costs are automatically calculated during checkout based on destination governorate and total weight. Shipping fees are clearly itemized before order finalization.'}
              </p>
            </div>

            {/* Section 4 */}
            <div style={{ marginBottom: '1rem' }}>
              <h3 style={{ color: 'var(--primary, #00aeef)', fontSize: '1.25rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={20} />
                <span>{isAr ? '4. التغليف الآمن ومعاينة الشحنة' : '4. Packaging Safety & Inspection'}</span>
              </h3>
              <p style={{ color: 'var(--text-main, #d9e6f2)', lineHeight: '1.8', fontSize: '0.98rem' }}>
                {isAr
                  ? 'تلتزم شركة BOO بأعلى معايير التغليف لحماية قطع الغيار الحساسة (مثل الزجاج، الفوانيس، المواد الإلكترونية، والزيوت). يحق للعميل معاينة الشحنة ظاهرياً بحضور مندوب التوصيل قبل التوقيع على الاستلام للتأكد من خلوها من التلف الظاهري.'
                  : 'BOO adheres to strict packaging standards to safeguard sensitive components (such as glass, headlights, sensors, and fluids). Customers are allowed to inspect the exterior condition of the package in the presence of the delivery agent before signing acceptance.'}
              </p>
            </div>

          </div>

          {/* Help Box */}
          <div style={{
            backgroundColor: 'rgba(0, 174, 239, 0.08)',
            border: '1px solid rgba(0, 174, 239, 0.25)',
            borderRadius: 'var(--radius-md, 12px)',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#FFFFFF', marginBottom: '0.5rem' }}>
              {isAr ? 'هل لديك أي استفسار بشأن شحنتك؟' : 'Have Questions About Your Shipment?'}
            </h3>
            <p style={{ color: 'var(--text-muted, #8ea0b5)', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
              {isAr ? 'فريق خدمة العملاء جاهز لمساعدتك وتتبع طلبك مباشرة.' : 'Our support team is ready to assist with real-time shipment updates.'}
            </p>
            <a
              href={`mailto:${email}`}
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <HelpCircle size={16} />
              <span>{isAr ? 'تواصل معنا' : 'Contact Support'}</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
