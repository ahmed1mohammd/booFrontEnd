import React, { useState } from 'react';
import { MapPin, Phone, ChevronDown } from 'lucide-react';
import { BRAND_CONFIG } from '../../data/homeData';
import { useLanguage } from '../../context/LanguageContext';
import './TopContactBar.css';

export default function TopContactBar() {
  const { t, lang } = useLanguage();
  const [mobilePhoneOpen, setMobilePhoneOpen] = useState(false);
  const { address, addressUrl, phones } = BRAND_CONFIG.contact;

  return (
    <div className="boo-topbar">
      <div className="container boo-topbar-inner">
        {/* Left: Physical Address / Branches */}
        <div className="boo-topbar-address">
          <a
            href="/contact"
            className="boo-topbar-link"
            title={lang === 'ar' ? 'فروعنا في مصر: شبين الكوم، الإسكندرية، دمياط، العبور' : 'Our Branches: Shebin El-Kom, Alexandria, Damietta, Obour'}
          >
            <MapPin className="boo-topbar-icon" size={14} />
            <span className="boo-topbar-text">
              {lang === 'ar' 
                ? 'فروعنا: شبين الكوم (الرئيسي) • الإسكندرية • دمياط الجديدة • العبور' 
                : 'Branches: Shebin El-Kom (HQ) • Alexandria • New Damietta • Obour'}
            </span>
          </a>
        </div>

        {/* Right: Clickable Phone Numbers (Desktop) */}
        <div className="boo-topbar-phones desktop-only">
          <span className="boo-topbar-phones-label">
            {lang === 'ar' ? 'خدمة العملاء:' : 'Direct Lines:'}
          </span>
          {phones.map((p, idx) => (
            <a
              key={idx}
              href={`tel:${p.raw}`}
              className="boo-topbar-phone-link"
            >
              <Phone size={13} className="phone-icon" />
              <span>{p.display}</span>
            </a>
          ))}
        </div>

        {/* Mobile Compact Contact Trigger */}
        <div className="boo-topbar-mobile mobile-only">
          <button
            className="boo-topbar-mobile-btn"
            onClick={() => setMobilePhoneOpen(!mobilePhoneOpen)}
            aria-expanded={mobilePhoneOpen}
            aria-label="Call BOO automotive numbers"
          >
            <Phone size={13} />
            <span>{lang === 'ar' ? 'اتصل بنا' : 'Call BOO'}</span>
            <ChevronDown size={12} className={`chevron ${mobilePhoneOpen ? 'open' : ''}`} />
          </button>

          {mobilePhoneOpen && (
            <div className="boo-topbar-dropdown">
              <div className="boo-topbar-dropdown-header">
                {lang === 'ar' ? 'اختر رقم للاتصال:' : 'Tap to call directly:'}
              </div>
              {phones.map((p, idx) => (
                <a
                  key={idx}
                  href={`tel:${p.raw}`}
                  className="boo-dropdown-item"
                  onClick={() => setMobilePhoneOpen(false)}
                >
                  <Phone size={14} />
                  <span>{p.display}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
