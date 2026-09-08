import React, { useState } from 'react';
import { Filter, Search, Sparkles, SlidersHorizontal } from 'lucide-react';
import VehicleCard from '../components/Cars/VehicleCard';
import { FEATURED_CARS } from '../data/homeData';
import { useLanguage } from '../context/LanguageContext';

export default function Cars({ onSelectCar }) {
  const { lang, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedBody, setSelectedBody] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const brands = ['All', 'Mercedes-Benz', 'BMW', 'Porsche', 'Audi', 'Volkswagen', 'Range Rover'];
  const bodyTypes = ['All', 'Sedan', 'SUV', 'Coupé'];

  const filteredCars = FEATURED_CARS.filter((car) => {
    const matchesSearch =
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === 'All' || car.brand === selectedBrand;
    const matchesBody = selectedBody === 'All' || car.bodyType === selectedBody;
    return matchesSearch && matchesBrand && matchesBody;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.rawPrice - b.rawPrice;
    if (sortBy === 'price-high') return b.rawPrice - a.rawPrice;
    if (sortBy === 'year-new') return b.year - a.year;
    return 0;
  });

  return (
    <div className="boo-cars-page">
      {/* Page Header */}
      <div style={{ backgroundColor: 'var(--bg-dark)', color: '#FFFFFF', padding: '4rem 0 3.5rem 0' }}>
        <div className="container">
          <span className="section-badge" style={{ backgroundColor: 'rgba(0,174,239,0.2)', color: '#FFFFFF' }}>
            <Sparkles size={13} />
            {lang === 'ar' ? 'معرض السيارات' : 'Vehicle Showroom'}
          </span>
          <h1 style={{ color: '#FFFFFF', marginBottom: '0.75rem' }}>
            {lang === 'ar' ? 'السيارات المتاحة وخدمات الاستيراد' : 'Available Inventory & Car Import'}
          </h1>
          <p style={{ color: '#c2d8eb', maxWidth: '650px', margin: 0, fontSize: '1.05rem' }}>
            {lang === 'ar'
              ? 'تصفح تشكيلتنا المميزة من السيارات الفاخرة المعتمدة أو اطلب استيراد سيارة أحلامك بمواصفات خاصة.'
              : 'Browse our certified premium vehicles or request custom vehicle sourcing & direct international import.'}
          </p>
        </div>
      </div>

      {/* Filter & Inventory Area */}
      <div className="section" style={{ backgroundColor: 'var(--bg-main)', paddingTop: '2.5rem' }}>
        <div className="container">
          {/* Controls Bar */}
          <div className="boo-cars-controls-bar">
            {/* Search */}
            <div className="boo-cars-search-wrap">
              <Search size={18} className="boo-cars-search-icon" />
              <input
                type="text"
                placeholder={lang === 'ar' ? 'ابحث عن ماركة أو موديل...' : 'Search make, model...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="boo-cars-search-input"
              />
            </div>

            {/* Brand Filter */}
            <div className="boo-cars-filter-group">
              <label style={{ fontSize: '0.85rem', fontWeight: '600', whiteSpace: 'nowrap' }}>
                {lang === 'ar' ? 'الماركة:' : 'Make:'}
              </label>
              <select
                className="form-select"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                style={{ padding: '0.55rem 0.85rem', fontSize: '0.9rem' }}
              >
                {brands.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Body Type */}
            <div className="boo-cars-filter-group">
              <label style={{ fontSize: '0.85rem', fontWeight: '600', whiteSpace: 'nowrap' }}>
                {lang === 'ar' ? 'الهيكل:' : 'Body:'}
              </label>
              <select
                className="form-select"
                value={selectedBody}
                onChange={(e) => setSelectedBody(e.target.value)}
                style={{ padding: '0.55rem 0.85rem', fontSize: '0.9rem' }}
              >
                {bodyTypes.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="boo-cars-filter-group">
              <label style={{ fontSize: '0.85rem', fontWeight: '600', whiteSpace: 'nowrap' }}>
                {lang === 'ar' ? 'الترتيب:' : 'Sort:'}
              </label>
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ padding: '0.55rem 0.85rem', fontSize: '0.9rem' }}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="year-new">Newest Year</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div style={{ marginBottom: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Showing <strong>{filteredCars.length}</strong> vehicles
          </div>

          {/* Vehicles Grid */}
          {filteredCars.length > 0 ? (
            <div className="grid-3">
              {filteredCars.map((car) => (
                <VehicleCard key={car.id} car={car} onViewDetails={onSelectCar} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--bg-alt)', borderRadius: 'var(--radius-md)' }}>
              <h3>No vehicles match your search criteria</h3>
              <p style={{ marginTop: '0.5rem' }}>Try clearing filters or search for another vehicle make.</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedBrand('All');
                  setSelectedBody('All');
                }}
                style={{ marginTop: '1rem' }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
