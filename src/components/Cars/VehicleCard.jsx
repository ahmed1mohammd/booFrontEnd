import React from 'react';
import { Gauge, Calendar, Fuel, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function VehicleCard({ car, onViewDetails }) {
  const { t } = useLanguage();

  return (
    <div className="boo-car-card card">
      {/* Card Image & Badge */}
      <div className="boo-car-image-box">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="boo-car-img"
          loading="lazy"
        />
        {car.tags && car.tags[0] && (
          <span className="boo-car-tag">{car.tags[0]}</span>
        )}
        <div className="boo-car-status-indicator">
          <ShieldCheck size={14} />
          <span>BOO Certified</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="boo-car-body">
        <div className="boo-car-header">
          <span className="boo-car-brand">{car.brand}</span>
          <h3 className="boo-car-model">{car.model}</h3>
        </div>

        {/* Specs Grid */}
        <div className="boo-car-specs">
          <div className="boo-spec-item" title="Model Year">
            <Calendar size={14} />
            <span>{car.year}</span>
          </div>
          <div className="boo-spec-item" title="Mileage">
            <Gauge size={14} />
            <span>{car.mileage}</span>
          </div>
          <div className="boo-spec-item" title="Fuel Type">
            <Fuel size={14} />
            <span>{car.fuel}</span>
          </div>
        </div>

        {/* Price & Action Footer */}
        <div className="boo-car-footer">
          <div className="boo-car-price-wrap">
            <span className="boo-car-price-label">Price / السعر</span>
            <span className="boo-car-price">{car.price}</span>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-sm boo-car-btn"
            onClick={() => onViewDetails && onViewDetails(car)}
            aria-label={`View details for ${car.brand} ${car.model}`}
          >
            <span>{t.cars.viewDetails}</span>
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
