import React from 'react';
import { Sparkles, Calendar, Clock, CheckCircle2, ShieldCheck, Wrench, PhoneCall } from 'lucide-react';
import { MAINTENANCE_SERVICES, BRAND_CONFIG } from '../data/homeData';
import { useLanguage } from '../context/LanguageContext';

export default function MaintenancePage({ onOpenBooking }) {
  const { lang, t } = useLanguage();

  return (
    <div className="boo-maintenance-page">
      {/* Page Header */}
      <div className="boo-page-header">
        <div className="container">
          <span className="section-badge" style={{ backgroundColor: 'rgba(0,174,239,0.2)', color: '#FFFFFF' }}>
            <Sparkles size={13} />
            {lang === 'ar' ? 'مركز الصيانة المعتمد' : 'Certified Service Center'}
          </span>
          <h1 style={{ color: '#FFFFFF', marginBottom: '0.75rem' }}>
            {lang === 'ar' ? 'خدمات الصيانة الاحترافية والإصلاح' : 'Professional Maintenance & Engineering Services'}
          </h1>
          <p style={{ color: '#c2d8eb', maxWidth: '650px', margin: 0, fontSize: '1.05rem' }}>
            {lang === 'ar'
              ? 'صيانة دورية، فحص كمبيوتر شامل، وإصلاح ميكانيكي وكهربائي بأيدي مهندسين متخصصين في شبين الكوم.'
              : 'Periodic maintenance, complete computerized diagnostics, and expert mechanical and electrical overhaul in Shebin El-Kom.'}
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="section" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          <div className="grid-3" style={{ marginBottom: '4rem' }}>
            {MAINTENANCE_SERVICES.map((item) => (
              <div key={item.id} className="boo-maint-card card">
                <div className="boo-maint-top">
                  <div className="boo-maint-icon-box">
                    <Wrench size={24} />
                  </div>
                  <div className="boo-maint-duration">
                    <Clock size={13} />
                    <span>{item.duration}</span>
                  </div>
                </div>

                <h3 className="boo-maint-title">{item.title}</h3>
                <p className="boo-maint-desc">{item.description}</p>

                {item.checklist && (
                  <ul className="boo-maint-checklist">
                    {item.checklist.map((point, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={13} className="check-icon" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="boo-maint-footer">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm boo-maint-btn"
                    onClick={() => onOpenBooking && onOpenBooking(item)}
                  >
                    <Calendar size={14} />
                    <span>Book This Service</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Service Guarantee Banner */}
          <div
            className="boo-page-card"
            style={{
              backgroundColor: 'var(--bg-sidebar)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2rem',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ maxWidth: '620px' }}>
              <span className="section-badge badge-green">BOO Service Assurance</span>
              <h3 style={{ fontSize: '1.65rem', marginBottom: '0.65rem' }}>
                All repairs performed with genuine OEM components & certified warranty
              </h3>
              <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                Our workshop is located at 19 El-Galaa El-Bahary Street, Shebin El-Kom. Walk-ins and scheduled appointments welcome.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="tel:01122559066" className="btn btn-primary btn-lg">
                <PhoneCall size={18} />
                <span>Call 01122559066</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
