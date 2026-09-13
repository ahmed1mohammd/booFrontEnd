import React, { useState, useEffect } from 'react';
import { Award, Users, Layers, HeartHandshake, CheckCircle2, ShieldCheck, Cpu, Wrench, Sparkles, Package } from 'lucide-react';
import { WHY_CHOOSE_BOO } from '../../data/homeData';
import { productsApi } from '../../api/productsApi';
import { useLanguage } from '../../context/LanguageContext';
import './WhyBOO.css';

export default function WhyBOO({ reasons: initialReasons = WHY_CHOOSE_BOO }) {
  const { t } = useLanguage();
  const [reasons, setReasons] = useState(initialReasons);

  useEffect(() => {
    productsApi.getContent().then((res) => {
      if (res.success && res.data?.whyBoo && res.data.whyBoo.length > 0) {
        setReasons(res.data.whyBoo);
      }
    });
  }, []);

  const getReasonIcon = (iconName) => {
    switch (iconName) {
      case 'Award':
      case 'ShieldCheck':
        return <ShieldCheck size={30} />;
      case 'Users':
      case 'HeartHandshake':
        return <HeartHandshake size={30} />;
      case 'Layers':
      case 'Package':
        return <Package size={30} />;
      case 'Cpu':
        return <Cpu size={30} />;
      case 'Wrench':
        return <Wrench size={30} />;
      case 'Sparkles':
        return <Sparkles size={30} />;
      default:
        return <Sparkles size={30} />;
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
