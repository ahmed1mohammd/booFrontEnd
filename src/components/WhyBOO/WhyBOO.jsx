import React from 'react';
import { Award, Users, Layers, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { WHY_CHOOSE_BOO } from '../../data/homeData';
import { useLanguage } from '../../context/LanguageContext';
import './WhyBOO.css';

export default function WhyBOO({ reasons = WHY_CHOOSE_BOO }) {
  const { t } = useLanguage();

  const getReasonIcon = (iconName) => {
    switch (iconName) {
      case 'Award':
        return <Award size={30} />;
      case 'Users':
        return <Users size={30} />;
      case 'Layers':
        return <Layers size={30} />;
      case 'HeartHandshake':
        return <HeartHandshake size={30} />;
      default:
        return <Award size={30} />;
    }
  };

  return (
    <section className="section section-sidebar boo-why-section" id="why-boo">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">
            {t.why.badge}
          </span>
          <h2 className="section-title">
            {t.why.title}
          </h2>
          <p className="section-subtitle">
            {t.why.subtitle}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid-4 boo-why-grid">
          {reasons.map((item, idx) => (
            <div key={item.id} className="boo-why-card card">
              <div className="boo-why-icon-wrap">
                {getReasonIcon(item.icon)}
              </div>
              <h3 className="boo-why-title">{item.title}</h3>
              <p className="boo-why-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
