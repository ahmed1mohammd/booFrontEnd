import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Disc, Sliders, Zap, Filter, Sparkles, Check, ArrowRight, Search, ShieldCheck } from 'lucide-react';
import { SPARE_PARTS_CATEGORIES, SAMPLE_PARTS } from '../../data/homeData';
import { useLanguage } from '../../context/LanguageContext';
import './SpareParts.css';

export default function SpareParts({
  categories = SPARE_PARTS_CATEGORIES,
  parts = SAMPLE_PARTS,
  onInquirePart
}) {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu size={16} />;
      case 'Disc':
        return <Disc size={16} />;
      case 'Sliders':
        return <Sliders size={16} />;
      case 'Zap':
        return <Zap size={16} />;
      case 'Filter':
        return <Filter size={16} />;
      case 'Sparkles':
        return <Sparkles size={16} />;
      default:
        return <Sparkles size={16} />;
    }
  };

  const filteredParts = activeCategory === 'all'
    ? parts
    : parts.filter((p) => p.category === activeCategory);

  return (
    <section className="section section-alt boo-parts-section" id="spare-parts">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">
            {t.parts.badge}
          </span>
          <h2 className="section-title">
            {t.parts.title}
          </h2>
          <p className="section-subtitle">
            {t.parts.subtitle}
          </p>
        </div>

        {/* Categories Bar */}
        <div className="boo-parts-categories-wrap">
          <div className="boo-parts-categories">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`boo-cat-btn ${activeCategory === cat.id ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.icon && getCategoryIcon(cat.icon)}
                <span>{cat.name}</span>
                <span className="cat-count">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sample Parts Cards Grid */}
        <div className="grid-3 boo-parts-grid">
          {filteredParts.slice(0, 6).map((part) => (
            <div key={part.id} className="boo-part-card card">
              <div className="boo-part-img-box">
                <img
                  src={part.image}
                  alt={part.name}
                  className="boo-part-img"
                  loading="lazy"
                />
                <span className="boo-part-badge">
                  <ShieldCheck size={13} />
                  <span>100% Genuine</span>
                </span>
              </div>

              <div className="boo-part-content">
                <div className="boo-part-meta">
                  <span className="boo-part-brand">{part.brand}</span>
                  <span className="boo-part-code">OEM: {part.code}</span>
                </div>

                <h3 className="boo-part-name">{part.name}</h3>
                <p className="boo-part-compat">
                  <strong>Compatibility:</strong> {part.compatibility}
                </p>

                <div className="boo-part-footer">
                  <div className="boo-part-price-box">
                    <span className="boo-part-price">{part.price}</span>
                    <span className="boo-part-stock">
                      <Check size={12} />
                      <span>{t.parts.inStock}</span>
                    </span>
                  </div>

                  <Link
                    to={`/spare-parts?code=${part.code}`}
                    className="btn btn-primary btn-sm"
                  >
                    <span>{t.parts.inquireCTA}</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="boo-parts-action-banner">
          <div className="boo-parts-banner-text">
            <h4>Looking for a specific part number or VIN search?</h4>
            <p>Our specialists can source any OEM or certified performance component directly.</p>
          </div>
          <Link to="/spare-parts" className="btn btn-secondary btn-lg">
            <span>{t.parts.browseCTA}</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
