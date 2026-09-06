import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Car, Cog, Wrench } from 'lucide-react';
import { FEATURED_CARS, SAMPLE_PARTS, MAINTENANCE_SERVICES } from '../../data/homeData';
import { useLanguage } from '../../context/LanguageContext';
import './Modals.css';

export default function SearchModal({ isOpen, onClose, onSelectCar }) {
  const { t, lang } = useLanguage();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  const carResults = normalizedQuery
    ? FEATURED_CARS.filter(
        (c) =>
          c.brand.toLowerCase().includes(normalizedQuery) ||
          c.model.toLowerCase().includes(normalizedQuery) ||
          c.bodyType.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const partResults = normalizedQuery
    ? SAMPLE_PARTS.filter(
        (p) =>
          p.name.toLowerCase().includes(normalizedQuery) ||
          p.brand.toLowerCase().includes(normalizedQuery) ||
          p.code.toLowerCase().includes(normalizedQuery) ||
          p.compatibility.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const maintResults = normalizedQuery
    ? MAINTENANCE_SERVICES.filter(
        (m) =>
          m.title.toLowerCase().includes(normalizedQuery) ||
          m.description.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const hasResults = carResults.length > 0 || partResults.length > 0 || maintResults.length > 0;

  return (
    <div className="boo-modal-overlay" onClick={onClose}>
      <div className="boo-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="boo-modal-header">
          <h3 className="boo-modal-title">
            {lang === 'ar' ? 'البحث في شركة BOO' : 'Search BOO Automotive'}
          </h3>
          <button className="boo-modal-close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="boo-modal-body">
          <div className="boo-search-input-wrap">
            <Search size={20} />
            <input
              type="text"
              className="boo-search-input"
              placeholder={t.nav.searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>

          <div className="boo-search-results">
            {query && !hasResults && (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                {lang === 'ar'
                  ? 'لم يتم العثور على نتائج مطابقة.'
                  : 'No matching vehicles, spare parts, or services found.'}
              </div>
            )}

            {!query && (
              <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {lang === 'ar'
                  ? 'اكتب اسم سيارة (Mercedes, BMW)، كود قطعة غيار، أو نوع صيانة...'
                  : 'Type a vehicle name (e.g. Mercedes, BMW), part code, or maintenance service...'}
              </div>
            )}

            {/* Car Results */}
            {carResults.map((car) => (
              <div
                key={car.id}
                className="boo-search-item"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  onClose();
                  onSelectCar ? onSelectCar(car) : navigate('/cars');
                }}
              >
                <img src={car.image} alt={car.model} className="search-item-thumb" />
                <div className="search-item-info">
                  <div className="search-item-type">Vehicle • {car.brand}</div>
                  <div className="search-item-title">{car.model} ({car.year})</div>
                </div>
                <div className="search-item-price">{car.price}</div>
              </div>
            ))}

            {/* Part Results */}
            {partResults.map((part) => (
              <div
                key={part.id}
                className="boo-search-item"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  onClose();
                  navigate(`/spare-parts?code=${part.code}`);
                }}
              >
                <img src={part.image} alt={part.name} className="search-item-thumb" />
                <div className="search-item-info">
                  <div className="search-item-type">Spare Part • {part.brand}</div>
                  <div className="search-item-title">{part.name}</div>
                </div>
                <div className="search-item-price">{part.price}</div>
              </div>
            ))}

            {/* Maintenance Results */}
            {maintResults.map((m) => (
              <div
                key={m.id}
                className="boo-search-item"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  onClose();
                  navigate('/maintenance');
                }}
              >
                <div className="search-item-info">
                  <div className="search-item-type">Maintenance Service</div>
                  <div className="search-item-title">{m.title}</div>
                </div>
                <ArrowRight size={16} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
