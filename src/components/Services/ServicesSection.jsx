import React from 'react';
import { Link } from 'react-router-dom';
import { Cog, Sparkles, Package, Wrench, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SERVICES_LIST } from '../../data/homeData';
import { useLanguage } from '../../context/LanguageContext';
import './ServicesSection.css';

export default function ServicesSection({ services = SERVICES_LIST }) {
  const { t, lang } = useLanguage();

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Cog':
        return <Cog size={32} />;
      case 'Sparkles':
        return <Sparkles size={32} />;
      case 'Package':
        return <Package size={32} />;
      case 'Wrench':
        return <Wrench size={32} />;
      default:
        return <Sparkles size={32} />;
    }
  };

  return (
    <section className="section boo-services-section" id="services">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">
            {t.services.sectionBadge}
          </span>
          <h2 className="section-title">
            {t.services.sectionTitle}
          </h2>
          <p className="section-subtitle">
            {t.services.sectionSubtitle}
          </p>
        </div>

        {/* 3 Service Cards Grid */}
        <div className="grid-3 boo-services-grid">
          {services.map((service, index) => (
            <div key={service.id} className="boo-service-card card">
              <div className="boo-service-icon-wrap">
                {getIcon(service.icon)}
                <span className="boo-service-num">0{index + 1}</span>
              </div>

              <h3 className="boo-service-title">{service.title}</h3>
              <p className="boo-service-desc">{service.description}</p>

              {service.features && (
                <ul className="boo-service-features">
                  {service.features.map((feat, i) => (
                    <li key={i}>
                      <CheckCircle2 size={14} className="feat-check" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="boo-service-footer">
                <Link to={service.link} className="boo-service-link">
                  <span>{t.services.learnMore}</span>
                  <ArrowRight size={16} className="link-arrow" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
