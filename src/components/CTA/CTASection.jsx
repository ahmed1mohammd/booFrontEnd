import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PhoneCall, ArrowRight, Sparkles } from 'lucide-react';
import { CTA_CONTENT } from '../../data/homeData';
import { productsApi } from '../../api/productsApi';
import { useLanguage } from '../../context/LanguageContext';
import './CTASection.css';

export default function CTASection({ data: initialData = CTA_CONTENT }) {
  const { t } = useLanguage();
  const [data, setData] = useState(initialData);

  useEffect(() => {
    productsApi.getContent().then((res) => {
      if (res.success && res.data?.cta) {
        setData({
          heading: res.data.cta.heading || initialData.heading,
          description: res.data.cta.description || initialData.description,
          buttons: {
            primary: {
              text: res.data.cta.primaryButtonText || initialData.buttons.primary.text,
              link: res.data.cta.primaryButtonLink || initialData.buttons.primary.link
            },
            secondary: {
              text: res.data.cta.secondaryButtonText || initialData.buttons.secondary.text,
              link: res.data.cta.secondaryButtonLink || initialData.buttons.secondary.link
            }
          }
        });
      }
    });
  }, []);

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
