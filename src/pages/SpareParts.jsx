import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Sparkles, Filter, Cpu, Disc, Sliders, Zap, Check, AlertCircle } from 'lucide-react';
import ProductCard from '../components/Product/ProductCard';
import ProductGridSkeleton from '../components/Product/ProductGridSkeleton';
import CarLoader from '../components/common/CarLoader';
import EmptyState from '../components/common/EmptyState';
import ErrorState from '../components/common/ErrorState';
import { productsApi } from '../api/productsApi';
import { useLanguage } from '../context/LanguageContext';

export default function SparePartsPage() {
  const { lang } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const urlCategory = searchParams.get('category') || 'all';
  const urlSearch = searchParams.get('search') || '';

  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(urlCategory);
  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(urlSearch);
  const [sortBy, setSortBy] = useState('featured');

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load Categories on mount
  useEffect(() => {
    productsApi.getCategories().then((res) => {
      if (res.success) setCategories(res.data);
    });
  }, []);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Sync category changes with URL
  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    const newParams = new URLSearchParams(searchParams);
    if (catId === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', catId);
    }
    setSearchParams(newParams);
  };

  // Fetch products when category, search, or sort changes (Max 3s cap)
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Force max 3.0s loading duration cap
      const timeoutCap = new Promise((resolve) => setTimeout(() => resolve({ timeout: true }), 3000));
      const fetchReq = productsApi.getSpareParts({
        category: activeCategory,
        search: debouncedSearch,
        sort: sortBy
      });

      const res = await Promise.race([fetchReq, timeoutCap]);
      if (res && res.success) {
        setProducts(res.data);
      } else if (res && res.timeout) {
        // Fallback after 3s cap
        const fastRes = await fetchReq;
        if (fastRes?.success) setProducts(fastRes.data);
      }
    } catch (err) {
      setError(err.message || 'Unable to load spare parts catalog.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [activeCategory, debouncedSearch, sortBy]);

  return (
    <div className="boo-spare-parts-store">
      {/* 1. Store Header & Search */}
      <section className="boo-store-hero">
        <div className="container">
          <span className="section-badge" style={{ backgroundColor: 'rgba(0,174,239,0.2)', color: '#FFFFFF' }}>
            <Sparkles size={13} />
            {lang === 'ar' ? 'المتجر الإلكتروني لقطع الغيار' : 'OEM Spare Parts Marketplace'}
          </span>
          <h1 className="boo-store-hero-title">
            {lang === 'ar' ? 'قطع الغيار' : 'Spare Parts'}
          </h1>
          <p className="boo-store-hero-sub">
            {lang === 'ar'
              ? 'اعثر على قطع الغيار المناسبة لسيارتك بأعلى معايير الجودة والضمان.'
              : 'Find the right parts for your vehicle.'}
          </p>

          {/* Large Search Bar */}
          <div className="boo-store-search-box">
            <Search size={22} className="boo-store-search-icon" />
            <input
              type="text"
              className="boo-store-search-input"
              placeholder={
                lang === 'ar'
                  ? 'ابحث عن قطع الغيار (اسم القطعة، كود SKU، الماركة)...'
                  : 'Search for spare parts...'
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search spare parts catalog"
            />
          </div>
        </div>
      </section>

      {/* 2. Main Catalog Body */}
      <div className="section" style={{ backgroundColor: 'var(--bg-main)', paddingTop: '2rem' }}>
        <div className="container">
          {/* Category Filter Pills Bar (Horizontal scroll on mobile) */}
          <div className="boo-store-cats-bar" role="tablist" aria-label="Product Categories">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              const hasCount = cat.count !== undefined && cat.count !== null && (typeof cat.count === 'string' || Number(cat.count) > 0);
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  className={`boo-store-cat-pill ${isActive ? 'is-active' : ''}`}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  <span>{cat.name}</span>
                  {hasCount ? (
                    <span style={{ opacity: 0.8, fontSize: '0.82rem', marginInlineStart: '0.35rem', fontWeight: '600' }}>
                      ({cat.count})
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Controls / Stats Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.75rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Showing <strong>{products.length}</strong> available parts
              {debouncedSearch && ` matching "${debouncedSearch}"`}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: '600' }}>Sort by:</label>
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.875rem', width: 'auto' }}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* 3. Product Grid / Skeletons / States */}
          {loading ? (
            <CarLoader
              text={lang === 'ar' ? 'جاري تجهيز قطع الغيار المعتمدة' : 'Loading OEM Spare Parts'}
              subtext={lang === 'ar' ? 'يتم فحص مخزون السيرفر والأسعار المحدثة...' : 'Connecting to live inventory & pricing...'}
            />
          ) : error ? (
            <ErrorState
              title="Unable to load spare parts."
              message={error}
              onRetry={fetchProducts}
            />
          ) : products.length === 0 ? (
            <EmptyState
              title="No spare parts found matching your search."
              description="Try adjusting your keywords, choosing another category, or contact our VIN specialists."
              actionText="Reset Filters"
              actionLink="/spare-parts"
            />
          ) : (
            <div className="grid-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
