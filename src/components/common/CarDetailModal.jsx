import React from 'react';
import { X, Phone, MessageCircle, ShieldCheck, Calendar, Gauge, Fuel, Check } from 'lucide-react';
import { BRAND_CONFIG } from '../../data/homeData';
import { useLanguage } from '../../context/LanguageContext';
import './Modals.css';

export default function CarDetailModal({ car, isOpen, onClose }) {
  const { lang } = useLanguage();

  if (!isOpen || !car) return null;

  const handleWhatsApp = () => {
    const text = `Hello BOO Automotive, I am interested in inquiring about ${car.brand} ${car.model} (${car.year}) priced at ${car.price}.`;
    const url = `https://wa.me/201122559066?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="boo-modal-overlay" onClick={onClose}>
      <div className="boo-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="boo-modal-header">
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase' }}>
              {car.brand}
            </span>
            <h3 className="boo-modal-title">{car.model}</h3>
          </div>
          <button className="boo-modal-close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="boo-modal-body">
          <img src={car.image} alt={car.model} className="car-detail-img" />

          <div className="car-detail-specs-grid">
            <div className="car-detail-spec-row">
              <span className="spec-key">Year:</span>
              <span className="spec-val">{car.year}</span>
            </div>
            <div className="car-detail-spec-row">
              <span className="spec-key">Mileage:</span>
              <span className="spec-val">{car.mileage}</span>
            </div>
            <div className="car-detail-spec-row">
              <span className="spec-key">Body Type:</span>
              <span className="spec-val">{car.bodyType}</span>
            </div>
            <div className="car-detail-spec-row">
              <span className="spec-key">Engine:</span>
              <span className="spec-val">{car.engine}</span>
            </div>
            <div className="car-detail-spec-row">
              <span className="spec-key">Transmission:</span>
              <span className="spec-val">{car.transmission}</span>
            </div>
            <div className="car-detail-spec-row">
              <span className="spec-key">Fuel Type:</span>
              <span className="spec-val">{car.fuel}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Asking Price:</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--heading)', fontFamily: 'var(--font-heading)' }}>
                {car.price}
              </div>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--hover-green)', fontWeight: '700', fontSize: '0.85rem' }}>
              <ShieldCheck size={18} />
              <span>BOO Certified Quality</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ flex: 1 }}
              onClick={handleWhatsApp}
            >
              <MessageCircle size={18} />
              <span>{lang === 'ar' ? 'استفسار عبر واتساب' : 'Inquire via WhatsApp'}</span>
            </button>
            <a
              href="tel:01122559066"
              className="btn btn-primary"
              style={{ flex: 1 }}
            >
              <Phone size={18} />
              <span>{lang === 'ar' ? 'اتصال مباشر' : 'Call 01122559066'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
