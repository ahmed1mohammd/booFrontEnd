import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneCall, ArrowRight, Sparkles } from 'lucide-react';
import { CTA_CONTENT } from '../../data/homeData';
import { useLanguage } from '../../context/LanguageContext';
import './CTASection.css';

export default function CTASection({ data = CTA_CONTENT }) {
  const { t } = useLanguage();

  return (
    <section className="boo-cta-section">
      <div className="container">
        <div className="boo-cta-card">
          <div className="boo-cta-content">
            <div className="boo-cta-badge">
              <Sparkles size={14} />
              <span>BOO Integrated Solutions</span>
            </div>

            <h2 className="boo-cta-heading">
              {t.cta.heading || data.heading}
            </h2>

            <p className="boo-cta-description">
              {t.cta.desc || data.description}
            </p>

            <div className="boo-cta-buttons">
              <Link to={data.buttons.primary.link} className="btn btn-primary btn-lg">
                <PhoneCall size={18} />
                <span>{t.cta.contactBtn || data.buttons.primary.text}</span>
              </Link>
              <a href={data.buttons.secondary.link} className="btn btn-outline-white btn-lg">
                <span>{t.cta.servicesBtn || data.buttons.secondary.text}</span>
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
