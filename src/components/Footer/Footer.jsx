import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import Logo from '../common/Logo';
import { BRAND_CONFIG } from '../../data/homeData';
import { useLanguage } from '../../context/LanguageContext';
import './Footer.css';

export default function Footer() {
  const { t, lang } = useLanguage();
  const currentYear = new Date().getFullYear();
  const { address, addressUrl, phones, socials, workingHours } = BRAND_CONFIG.contact;

  const quickLinks = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.cars, path: '/cars' },
    { name: t.nav.spareParts, path: '/spare-parts' },
    { name: t.nav.maintenance, path: '/maintenance' },
    { name: t.nav.about, path: '/about' },
    { name: t.nav.contact, path: '/contact' }
  ];

  const servicesLinks = [
    { name: 'Car Import', path: '/cars?filter=import' },
    { name: 'Car Sales', path: '/cars' },
    { name: 'Spare Parts', path: '/spare-parts' },
    { name: 'Maintenance & Repair', path: '/maintenance' },
    { name: 'Computer Diagnostics', path: '/maintenance' },
    { name: 'OEM Parts Sourcing', path: '/spare-parts' }
  ];

  return (
    <footer className="boo-footer">
      {/* Top Footer */}
      <div className="container boo-footer-top">
        <div className="boo-footer-grid">
          {/* Col 1: Brand Info */}
          <div className="boo-footer-col boo-footer-brand-col">
            <div className="boo-footer-logo">
              <Logo size="footer" />
            </div>
            <p className="boo-footer-about">
              {t.footer.aboutCompany}
            </p>

            <div className="boo-footer-badge">
              <ShieldCheck size={16} />
              <span>Certified Automotive Sourcing & Care</span>
            </div>

            {/* Social Placeholders */}
            <div className="boo-footer-socials">
              <a
                href={socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="boo-social-link"
                title="WhatsApp"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href={socials.facebook}
                className="boo-social-link"
                title="Facebook"
                aria-label="Facebook"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href={socials.instagram}
                className="boo-social-link"
                title="Instagram"
                aria-label="Instagram"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={socials.email}
                className="boo-social-link"
                title="Email"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="boo-footer-col">
            <h4 className="boo-footer-title">{t.footer.quickLinks}</h4>
            <ul className="boo-footer-nav">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="boo-footer-link">
                    <ArrowRight size={13} className="nav-arrow" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="boo-footer-col">
            <h4 className="boo-footer-title">{t.footer.services}</h4>
            <ul className="boo-footer-nav">
              {servicesLinks.map((s, idx) => (
                <li key={idx}>
                  <Link to={s.path} className="boo-footer-link">
                    <ArrowRight size={13} className="nav-arrow" />
                    <span>{s.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Info & Branches */}
          <div className="boo-footer-col boo-footer-contact-col">
            <h4 className="boo-footer-title">{t.footer.contactInfo}</h4>
            <div className="boo-footer-contacts">
              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                  {lang === 'ar' ? 'فروعنا في مصر:' : 'Our Branches in Egypt:'}
                </span>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.82rem' }}>
                  {(BRAND_CONFIG.contact.branches || []).map((b) => (
                    <li key={b.id}>
                      <a
                        href={b.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--footer-text, #c2d8eb)', display: 'flex', alignItems: 'flex-start', gap: '0.35rem', lineHeight: '1.4' }}
                      >
                        <MapPin size={13} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span><strong>{lang === 'ar' ? b.cityAr : b.cityEn}:</strong> {lang === 'ar' ? b.addressAr : b.addressEn}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="boo-contact-phones">
                {phones.map((p, idx) => (
                  <a
                    key={idx}
                    href={`tel:${p.raw}`}
                    className="boo-contact-phone-item"
                  >
                    <Phone size={14} className="contact-icon" />
                    <span>{p.display}</span>
                  </a>
                ))}
              </div>

              <div className="boo-footer-hours">
                <span className="hours-label">Operating Hours:</span>
                <span className="hours-val">{workingHours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="boo-footer-bottom">
        <div className="container boo-footer-bottom-inner">
          <p className="boo-copyright">
            &copy; {currentYear} {BRAND_CONFIG.fullName}. {t.footer.rights}
          </p>
          <div className="boo-footer-bottom-links">
            <span>Official Automotive Platform</span>
            <span className="dot">•</span>
            <span>Shebin El-Kom, Menoufia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
