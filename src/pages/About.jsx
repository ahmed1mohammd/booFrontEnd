import React from 'react';
import { Award, ShieldCheck, CheckCircle, Users, Layers, Sparkles, MapPin, Phone } from 'lucide-react';
import { ABOUT_DATA, BRAND_CONFIG, WHY_CHOOSE_BOO } from '../data/homeData';
import { useLanguage } from '../context/LanguageContext';

export default function AboutPage() {
  const { lang, t } = useLanguage();

  return (
    <div className="boo-about-page">
      {/* Page Header */}
      <div style={{ backgroundColor: 'var(--bg-dark)', color: '#FFFFFF', padding: '4rem 0 3.5rem 0' }}>
        <div className="container">
          <span className="section-badge" style={{ backgroundColor: 'rgba(0,174,239,0.2)', color: '#FFFFFF' }}>
            <Sparkles size={13} />
            {lang === 'ar' ? 'عن الشركة' : 'About BOO'}
          </span>
          <h1 style={{ color: '#FFFFFF', marginBottom: '0.75rem' }}>
            {lang === 'ar' ? 'حلول سيارات متكاملة برؤية عصرية' : 'Your Trusted Automotive Partner'}
          </h1>
          <p style={{ color: '#c2d8eb', maxWidth: '650px', margin: 0, fontSize: '1.05rem' }}>
            {lang === 'ar'
              ? 'تأسست شركة BOO لتقديم منظومة شاملة تشمل استيراد وبيع السيارات وقطع الغيار الأصلية وخدمات الصيانة المعتمدة.'
              : 'BOO provides integrated automotive solutions including car import, vehicle sales, genuine spare parts, and professional maintenance.'}
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="section" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', marginBottom: '4.5rem' }}>
            <div>
              <span className="section-badge badge-green">Our Vision & Commitment</span>
              <h2 style={{ marginBottom: '1.25rem' }}>Integrated Automotive Excellence Across Egypt</h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-main)', lineHeight: '1.7', marginBottom: '1rem' }}>
                At BOO, we understand that purchasing and maintaining a vehicle requires absolute trust, technical transparency, and premium service.
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.65', marginBottom: '1.75rem' }}>
                We bridge international automotive markets with local vehicle owners, offering custom vehicle import directly to your doorstep, a carefully vetted inventory of certified cars, guaranteed OEM spare parts, and a high-tech maintenance center equipped for complex diagnostics.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
                {ABOUT_DATA.stats.map((st, i) => (
                  <div key={i} style={{ backgroundColor: 'var(--bg-sidebar)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>
                      {st.value}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                      {st.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                <img
                  src={ABOUT_DATA.image}
                  alt="BOO Automotive Showroom"
                  style={{ width: '100%', height: '440px', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>

          {/* Pillars Section */}
          <div style={{ marginBottom: '4rem' }}>
            <div className="section-header">
              <span className="section-badge">Core Pillars</span>
              <h2>Why Drivers Rely On BOO</h2>
              <p>Everything you need for seamless vehicle ownership under one trusted brand.</p>
            </div>

            <div className="grid-4">
              {WHY_CHOOSE_BOO.map((item) => (
                <div key={item.id} className="boo-why-card card">
                  <h3 className="boo-why-title">{item.title}</h3>
                  <p className="boo-why-desc">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
