import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import VehicleCard from './VehicleCard';
import { FEATURED_CARS } from '../../data/homeData';
import { useLanguage } from '../../context/LanguageContext';
import './FeaturedCars.css';

export default function FeaturedCars({ cars = FEATURED_CARS, onSelectCar }) {
  const { t } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filterOptions = [
    { id: 'all', label: 'All Inventory' },
    { id: 'Sedan', label: 'Sedan' },
    { id: 'SUV', label: 'SUV' },
    { id: 'Coupé', label: 'Coupé' }
  ];

  const filteredCars = selectedFilter === 'all'
    ? cars
    : cars.filter((c) => c.bodyType === selectedFilter);

  return (
    <section className="section boo-cars-section" id="cars">
      <div className="container">
        {/* Section Header */}
        <div className="boo-cars-header-row">
          <div className="section-header text-left">
            <span className="section-badge">
              <Sparkles size={13} />
              {t.cars.badge}
            </span>
            <h2 className="section-title">
              {t.cars.title}
            </h2>
            <p className="section-subtitle">
              {t.cars.subtitle}
            </p>
          </div>

          {/* Quick Filter Tabs */}
          <div className="boo-cars-filters" role="tablist">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                role="tab"
                aria-selected={selectedFilter === opt.id}
                className={`boo-filter-tab ${selectedFilter === opt.id ? 'is-active' : ''}`}
                onClick={() => setSelectedFilter(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="grid-3 boo-cars-grid">
          {filteredCars.slice(0, 6).map((car) => (
            <VehicleCard
              key={car.id}
              car={car}
              onViewDetails={onSelectCar}
            />
          ))}
        </div>

        {/* Explore All Inventory Banner */}
        <div className="boo-cars-bottom-cta">
          <Link to="/cars" className="btn btn-secondary btn-lg">
            <span>{t.cars.allCars}</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
