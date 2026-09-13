import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Package, Cog, Wrench } from 'lucide-react';
import { productsApi } from '../../api/productsApi';
import { useLanguage } from '../../context/LanguageContext';
import './Modals.css';

export default function SearchModal({ isOpen, onClose }) {
  const { t, lang } = useLanguage();
  const [query, setQuery] = useState('');
  const [partResults, setPartResults] = useState([]);
  const [accessoryResults, setAccessoryResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setPartResults([]);
      setAccessoryResults([]);
      return;
    }
  }, [isOpen]);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setPartResults([]);
      setAccessoryResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const [partsRes, accRes] = await Promise.all([
          productsApi.getSpareParts({ search: trimmed, limit: 5 }),
          productsApi.getAccessories({ search: trimmed, limit: 5 })
        ]);
        if (partsRes.success) setPartResults(partsRes.data);
        if (accRes.success) setAccessoryResults(accRes.data);
      } catch (err) {
        console.error('Search error', err);
      } finally {
        setSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const hasResults = partResults.length > 0 || accessoryResults.length > 0;

  const handleGlobalSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onClose();
    navigate(`/spare-parts?search=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="boo-modal-overlay" onClick={onClose}>
      <div className="boo-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="boo-modal-header">
          <h3 className="boo-modal-title">
            {lang === 'ar' ? 'البحث في شركة BOO' : 'Search BOO Store'}
          </h3>
          <button className="boo-modal-close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="boo-modal-body">
          <form className="boo-search-input-wrap" onSubmit={handleGlobalSearch}>
            <Search size={20} />
            <input
              type="text"
              className="boo-search-input"
              placeholder={t.nav.searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </form>

          <div className="boo-search-results">
            {searching && (
              <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)' }}>
                {lang === 'ar' ? 'جاري البحث...' : 'Searching...'}
              </div>
            )}

            {!searching && query && !hasResults && (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                {lang === 'ar'
                  ? 'لم يتم العثور على نتائج مطابقة.'
                  : 'No matching spare parts or accessories found.'}
              </div>
            )}

            {!query && (
              <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {lang === 'ar'
                  ? 'اكتب اسم قطعة غيار، كود القطعة، أو إكسسوار...'
                  : 'Type a spare part name, SKU code, or accessory...'}
              </div>
            )}

            {/* Spare Part Results */}
            {partResults.map((part) => (
              <div
                key={`part-${part.id}`}
                className="boo-search-item"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  onClose();
                  navigate(`/spare-parts/${part.id || part.sku}`);
                }}
              >
                <img src={part.image} alt={part.name} className="search-item-thumb" />
                <div className="search-item-info">
                  <div className="search-item-type">
                    <Cog size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                    Spare Part • {part.brand}
                  </div>
                  <div className="search-item-title">{part.name}</div>
                </div>
                <div className="search-item-price">{part.price?.toLocaleString()} EGP</div>
              </div>
            ))}

            {/* Accessory Results */}
            {accessoryResults.map((acc) => (
              <div
                key={`acc-${acc.id}`}
                className="boo-search-item"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  onClose();
                  navigate(`/accessories/${acc.id || acc.sku}`);
                }}
              >
                <img src={acc.image} alt={acc.name} className="search-item-thumb" />
                <div className="search-item-info">
                  <div className="search-item-type">
                    <Package size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                    Accessory • {acc.brand}
                  </div>
                  <div className="search-item-title">{acc.name}</div>
                </div>
                <div className="search-item-price">{acc.price?.toLocaleString()} EGP</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
