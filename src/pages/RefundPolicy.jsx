import React from 'react';
import { RotateCcw, ShieldAlert, CheckCircle2, DollarSign, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BRAND_CONFIG } from '../data/homeData';

export default function RefundPolicy() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const email = BRAND_CONFIG.contact.email || 'boo@booinvestment.online';

  return (
    <div className="boo-refund-policy-page">
      {/* Header Banner */}
      <div className="boo-page-header">
        <div className="container">
          <span className="section-badge" style={{ backgroundColor: 'rgba(0, 174, 239, 0.2)', color: '#FFFFFF' }}>
            <RotateCcw size={14} />
            {isAr ? 'سياسات المتجر' : 'Store Policies'}
          </span>
          <h1 style={{ color: '#FFFFFF', marginBottom: '0.75rem' }}>
            {isAr ? 'سياسة الاسترجاع والإرجاع' : 'Refund & Return Policy'}
          </h1>
          <p style={{ color: '#c2d8eb', maxWidth: '680px', margin: 0, fontSize: '1.05rem', lineHeight: '1.6' }}>
            {isAr
              ? 'نضمن لك حق الاسترجاع والاستبدال لقطع الغيار والإكسسوارات طبقاً لشروط الجودة وقانون حماية المستهلك المصري.'
              : 'Clear return and refund terms for automotive components compliant with Egyptian consumer protection regulations.'}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="section" style={{ backgroundColor: 'var(--bg-main, #0b131f)', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '960px' }}>

          {/* Highlights Grid */}
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
                <RotateCcw size={24} />
              </div>
              <h4 style={{ color: '#FFFFFF', margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>
                {isAr ? '14 يوماً لإرجاع المنتجات' : '14-Day Return Window'}
              </h4>
              <p style={{ color: 'var(--text-muted, #8ea0b5)', fontSize: '0.88rem', margin: 0 }}>
                {isAr ? 'مهلة إرجاع أو استبدال تبدأ من تاريخ الاستلام.' : 'Return or exchange within 14 days of delivery.'}
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
                <CheckCircle2 size={24} />
              </div>
              <h4 style={{ color: '#FFFFFF', margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>
                {isAr ? 'قطع مضمونة وأصلية' : 'Guaranteed Genuine'}
              </h4>
              <p style={{ color: 'var(--text-muted, #8ea0b5)', fontSize: '0.88rem', margin: 0 }}>
                {isAr ? 'ضمان استرجاع كامل في حالة وجود عيب تصنيع.' : 'Full refund if manufacturing defect is verified.'}
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
                <DollarSign size={24} />
              </div>
              <h4 style={{ color: '#FFFFFF', margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>
                {isAr ? 'استرداد سريع للأموال' : 'Prompt Refunds'}
              </h4>
              <p style={{ color: 'var(--text-muted, #8ea0b5)', fontSize: '0.88rem', margin: 0 }}>
                {isAr ? 'رد المبالغ بنفس طريقة الدفع خلال 3-7 أيام عمل.' : 'Refunded via original method in 3-7 days.'}
              </p>
            </div>
          </div>

          {/* Policy Detail Sections */}
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
                <RotateCcw size={20} />
                <span>{isAr ? '1. شروط وإطار الاسترجاع والاستبدال' : '1. Return & Exchange Window'}</span>
              </h3>
              <p style={{ color: 'var(--text-main, #d9e6f2)', lineHeight: '1.8', fontSize: '0.98rem' }}>
                {isAr
                  ? 'يحق لعملاء BOO تقديم طلب إرجاع أو استبدال للمنتجات خلال 14 يوماً من تاريخ استلام الشحنة (أو 30 يوماً في حالة اكتشاف عيب تصنيع غير ظاهر)، وذلك وفقاً لأحكام قانون حماية المستهلك المصري.'
                  : 'BOO customers may initiate return or exchange requests within 14 days from delivery receipt (or 30 days if a hidden manufacturing defect is detected), strictly following Egyptian consumer protection legislation.'}
              </p>
            </div>

            {/* Section 2 */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: 'var(--primary, #00aeef)', fontSize: '1.25rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={20} />
                <span>{isAr ? '2. الاشتراطات الواجب توافرها في القطعة المسترجعة' : '2. Returned Item Eligibility Criteria'}</span>
              </h3>
              <ul style={{ color: 'var(--text-main, #d9e6f2)', lineHeight: '1.8', fontSize: '0.98rem', paddingLeft: isAr ? 0 : '1.25rem', paddingRight: isAr ? '1.25rem' : 0 }}>
                <li>{isAr ? 'أن تكون القطعة بحالتها الأصلية تماماً دون أي آثار تركيب، تجربة، أو خدوش.' : 'Items must be brand new, uninstalled, without installation marks or physical damage.'}</li>
                <li>{isAr ? 'أن تكون العبوة والتغليف الأصلي والملصقات والباركود بحالة سليمة تماماً.' : 'Original packaging, manufacturer boxes, seals, and barcodes must remain fully intact.'}</li>
                <li>{isAr ? 'تقديم رقم الطلب الإلكتروني أو فاتورة الشراء الأصلية.' : 'Order receipt number or digital tax invoice must accompany the return.'}</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: 'var(--primary, #00aeef)', fontSize: '1.25rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldAlert size={20} />
                <span>{isAr ? '3. سياسة قطع الغيار الكهربائية والالكترونية' : '3. Electrical & Electronic Parts Terms'}</span>
              </h3>
              <p style={{ color: 'var(--text-main, #d9e6f2)', lineHeight: '1.8', fontSize: '0.98rem' }}>
                {isAr
                  ? 'قطع الغيار الكهربائية والإلكترونية (مثل الحساسات، الكنترول، والضفائر) تخضع لفحص فني متخصص في مركز صيانة BOO قبل قبول الاسترجاع والتأكد من عدم تعرضها لماس كهربائي أو سوء تركيب من جانب العميل.'
                  : 'Electrical components (sensors, ECUs, modules, wiring harnesses) are subjected to technical diagnosis at BOO service centers prior to return acceptance to verify non-exposure to short-circuiting or erroneous installation.'}
              </p>
            </div>

            {/* Section 4 */}
            <div style={{ marginBottom: '1rem' }}>
              <h3 style={{ color: 'var(--primary, #00aeef)', fontSize: '1.25rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <DollarSign size={20} />
                <span>{isAr ? '4. مصاريف الشحن ورصد الأموال' : '4. Return Shipping Fees & Refund Timeline'}</span>
              </h3>
              <p style={{ color: 'var(--text-main, #d9e6f2)', lineHeight: '1.8', fontSize: '0.98rem' }}>
                {isAr
                  ? 'إذا كان سبب الإرجاع عيب تصنيع أو خطأ في الصنف المرسل من قبلنا، تتحمل BOO كامل مصاريف الشحن والإرجاع. أما إذا كان الإرجاع بناءً على رغبة العميل دون عيب، فيتحمل العميل مصاريف الشحن. يتم رد المبالغ المالية خلال 3 إلى 7 أيام عمل بعد استلام وفحص القطعة.'
                  : 'If returns are caused by a product defect or incorrect shipment by BOO, BOO bears 100% of freight costs. If the return is due to customer choice without product flaw, return shipping is paid by customer. Approved refunds are issued within 3 to 7 business days after inspection.'}
              </p>
            </div>

          </div>

          {/* Help Contact Card */}
          <div style={{
            backgroundColor: 'rgba(0, 174, 239, 0.08)',
            border: '1px solid rgba(0, 174, 239, 0.25)',
            borderRadius: 'var(--radius-md, 12px)',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#FFFFFF', marginBottom: '0.5rem' }}>
              {isAr ? 'ترغب في فتح طلب إرجاع أو استبدال؟' : 'Need to Initiate a Return or Exchange?'}
            </h3>
            <p style={{ color: 'var(--text-muted, #8ea0b5)', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
              {isAr ? 'تواصل مع فريق الدعم الفني وتجهيز رقم طلبك لخدمتك فوراً.' : 'Contact customer support with your order number for instant assistance.'}
            </p>
            <a
              href={`mailto:${email}`}
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <HelpCircle size={16} />
              <span>{isAr ? 'تواصل مع خدمة العملاء' : 'Contact Support'}</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
