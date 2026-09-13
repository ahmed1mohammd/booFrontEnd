import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle, Award, ArrowRight, Star } from 'lucide-react';
import { ABOUT_DATA } from '../../data/homeData';
import { productsApi } from '../../api/productsApi';
import { useLanguage } from '../../context/LanguageContext';
import './AboutSection.css';

export default function AboutSection({ data: initialData = ABOUT_DATA }) {
  const { t } = useLanguage();
  const [data, setData] = useState(initialData);

  useEffect(() => {
    productsApi.getContent().then((res) => {
      if (res.success && res.data?.about) {
        setData({
          ...initialData,
          ...res.data.about,
          image: res.data.about.image?.url || initialData.image,
          stats: res.data.about.stats?.length > 0 ? res.data.about.stats : initialData.stats,
          trustIndicators: res.data.about.trustIndicators?.length > 0 ? res.data.about.trustIndicators : initialData.trustIndicators
        });
      }
    });
  }, []);

  const getIndicatorIcon = (id) => {
    switch (id) {
      case 'quality':
        return <Award size={20} />;
      case 'reliability':
        return <ShieldCheck size={20} />;
      case 'service':
        return <CheckCircle size={20} />;
      default:
        return <Star size={20} />;
    }
  };

  return (
    <section className="section section-sidebar boo-about-section" id="about">
      <div className="container">
        <div className="boo-about-grid">
          {/* Left Column: Automotive Image & Experience Showcase */}
          <div className="boo-about-visual">
            <div className="boo-about-image-wrapper">
              <img
                src={data.image}
                alt="BOO Automotive Showroom and Service Facility"
                className="boo-about-img"
                loading="lazy"
              />
              <div className="boo-about-floating-card">
                <div className="floating-badge-icon">
                  <Award size={24} />
                </div>
                <div className="floating-badge-content">
                  <span className="floating-badge-title">100% Guaranteed</span>
                  <span className="floating-badge-subtitle">Certified Parts & Maintenance Quality</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Content & Trust Indicators */}
          <div className="boo-about-content">
            <span className="section-badge badge-green">
              {data.label}
            </span>

            <h2 className="boo-about-heading">
              {data.heading}
            </h2>

            <p className="boo-about-lead">
              {data.description}
            </p>

            {data.secondaryText && (
              <p className="boo-about-sub">
                {data.secondaryText}
              </p>
            )}

            {/* Three Trust Indicators */}
            <div className="boo-about-indicators">
              {data.trustIndicators.map((indicator) => (
                <div key={indicator.id} className="boo-indicator-card">
                  <div className="boo-indicator-icon">
                    {getIndicatorIcon(indicator.id)}
                  </div>
                  <div className="boo-indicator-info">
                    <h4 className="boo-indicator-title">{indicator.title}</h4>
                    <p className="boo-indicator-desc">{indicator.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="boo-about-actions">
              <Link to="/about" className="btn btn-primary btn-lg">
                <span>{t.about.learnMore}</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
