import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarCheck,
  Gauge,
  ShieldAlert,
  Zap,
  Wind,
  Wrench,
  CheckCircle2,
  Clock,
  ArrowRight,
  Calendar
} from 'lucide-react';
import { MAINTENANCE_SERVICES } from '../../data/homeData';
import { productsApi } from '../../api/productsApi';
import { useLanguage } from '../../context/LanguageContext';
import './MaintenanceSection.css';

export default function MaintenanceSection({
  services: initialServices = MAINTENANCE_SERVICES,
  onOpenBooking
}) {
  const { t } = useLanguage();
  const [services, setServices] = useState(initialServices);

  useEffect(() => {
    productsApi.getServices().then((res) => {
      if (res.success && res.data.length > 0) {
        setServices(res.data);
      }
    });
  }, []);

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'CalendarCheck':
        return <CalendarCheck size={28} />;
      case 'Gauge':
        return <Gauge size={28} />;
      case 'ShieldAlert':
        return <ShieldAlert size={28} />;
      case 'Zap':
        return <Zap size={28} />;
      case 'Wind':
        return <Wind size={28} />;
      case 'Wrench':
        return <Wrench size={28} />;
      default:
        return <Wrench size={28} />;
    }
  };

  return (
    <section className="section boo-maintenance-section" id="maintenance">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge badge-green">
            {t.maintenance.badge}
          </span>
          <h2 className="section-title">
            {t.maintenance.title}
          </h2>
          <p className="section-subtitle">
            {t.maintenance.subtitle}
          </p>
        </div>

        {/* 6 Maintenance Services Grid */}
        <div className="grid-3 boo-maintenance-grid">
          {services.map((item) => (
            <div key={item.id} className="boo-maint-card card">
              <div className="boo-maint-top">
                <div className="boo-maint-icon-box">
                  {getServiceIcon(item.icon)}
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
                  onClick={() => onOpenBooking ? onOpenBooking(item) : null}
                >
                  <Calendar size={14} />
                  <span>{t.maintenance.bookCTA}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="boo-maint-cta-banner">
          <div className="boo-maint-cta-content">
            <h3 className="boo-maint-cta-title">Need Immediate Vehicle Diagnostics or Emergency Service?</h3>
            <p className="boo-maint-cta-desc">Our Shebin El-Kom workshop is equipped with the latest European computerized diagnostic workstations.</p>
          </div>
          <Link to="/maintenance" className="btn btn-secondary btn-lg">
            <span>{t.maintenance.bookCTA}</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
