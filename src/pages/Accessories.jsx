import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Sparkles, Package, SlidersHorizontal, Grid, ShieldCheck } from 'lucide-react';
import ProductCard from '../components/Product/ProductCard';
import ProductGridSkeleton from '../components/Product/ProductGridSkeleton';
import EmptyState from '../components/common/EmptyState';
import ErrorState from '../components/common/ErrorState';
import { productsApi } from '../api/productsApi';
import { useLanguage } from '../context/LanguageContext';

const ACCESSORY_CATEGORIES = [
  { id: 'all', en: 'All Accessories', ar: 'جميع الإكسسوارات', icon: Sparkles },
  { id: 'styling', en: 'Exterior & Body', ar: 'التصميم والمظهر الخارجي', icon: Package },
  { id: 'interior', en: 'Interior Comfort', ar: 'الراحة والمقصورة', icon: Package },
  { id: 'lighting', en: 'Lighting & Electronics', ar: 'الإلكترونيات والإضاءة', icon: Package },
  { id: 'care', en: 'Car Care & Protection', ar: 'العناية والحماية', icon: ShieldCheck }
];

export default function AccessoriesPage() {
  const { lang } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const urlSearch = searchParams.get('search') || '';
  const urlCategory = searchParams.get('category') || 'all';

  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(urlSearch);
  const [activeCategory, setActiveCategory] = useState(urlCategory);
  const [sortBy, setSortBy] = useState('createdAt');

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch accessories from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        search: debouncedSearch,
        sort: sortBy,
        limit: '100'
      };
      if (activeCategory && activeCategory !== 'all') {
        params.category = activeCategory;
      }

      const res = await productsApi.getAccessories(params);
      if (res && res.success) {
        setProducts(res.data || []);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error('Error loading accessories:', err);
      setError(err.message || 'Unable to load accessories catalog.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [debouncedSearch, activeCategory, sortBy]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setDebouncedSearch(searchTerm);
  };

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (catId === 'all') {
        next.delete('category');
      } else {
        next.set('category', catId);
      }
      return next;
    });
  };

  return (
    <div className="boo-accessories-page">
      {/* Store Hero Banner */}
      <section className="boo-store-hero">
        <div className="container">
          <div className="boo-parts-hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', backgroundColor: 'rgba(0,174,239,0.15)', color: 'var(--primary)', padding: '0.4rem 0.9rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: '600', marginBottom: '1rem' }}>
            <Sparkles size={14} />
            <span>{lang === 'ar' ? 'تشكيلة الإكسسوارات الفاخرة' : 'Premium Car Accessories Collection'}</span>
          </div>

          <h1 className="boo-store-hero-title">
            {lang === 'ar' ? 'إكسسوارات السيارات الأصليـة' : 'Authentic Car Accessories'}
          </h1>
          <p className="boo-store-hero-sub">
            {lang === 'ar'
              ? 'ارتقِ بتجربة قيادتك مع أرقى التجهيزات، الإكسسوارات الرياضية، وأنظمة العناية بالسيارات.'
              : 'Upgrade your driving experience with luxury styling, high-performance gadgets, and interior comfort.'}
          </p>

          {/* Search Box */}
          <form className="boo-store-search-box" onSubmit={handleSearchSubmit} role="search">
            <Search size={18} className="boo-store-search-icon" />
            <input
              type="search"
              className="boo-store-search-input"
              placeholder={
                lang === 'ar'
                  ? 'ابحث باسم الإكسسوار، الماركة، أو موديل السيارة...'
                  : 'Search accessories by name, SKU, brand...'
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search accessories"
            />
          </form>
        </div>
      </section>

      {/* Main Catalog Content */}
      <section className="boo-parts-catalog-section" style={{ padding: '2.5rem 0 4rem' }}>
        <div className="container">
          {/* Category Filter Pills */}
          <div className="boo-store-cats-bar" role="tablist" aria-label="Category Filters">
            {ACCESSORY_CATEGORIES.map((cat) => {
              const IconComp = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`boo-store-cat-pill ${isActive ? 'is-active' : ''}`}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  <IconComp size={15} />
                  <span>{lang === 'ar' ? cat.ar : cat.en}</span>
                </button>
              );
            })}
          </div>

          {/* Controls Bar: Results Count & Sort Selector */}
          <div className="boo-parts-toolbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', padding: '1rem 1.25rem', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <div className="boo-parts-results-count" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', color: 'var(--text-main)' }}>
              <Grid size={16} style={{ color: 'var(--primary)' }} />
              {!loading && (
                <span>
                  <strong>{products.length}</strong>{' '}
                  {lang === 'ar' ? 'إكسسوار متاح' : 'accessories available'}
                </span>
              )}
            </div>

            <div className="boo-parts-sort-group" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <SlidersHorizontal size={16} style={{ color: 'var(--text-muted)' }} />
              <label className="sort-label" htmlFor="accessories-sort" style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-muted)' }}>
                {lang === 'ar' ? 'ترتيب:' : 'Sort:'}
              </label>
              <select
                id="accessories-sort"
                className="boo-parts-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ padding: '0.45rem 1rem', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' }}
              >
                <option value="createdAt">{lang === 'ar' ? 'الأحدث' : 'Newest'}</option>
                <option value="price-low">{lang === 'ar' ? 'السعر: من الأرخص' : 'Price: Low to High'}</option>
                <option value="price-high">{lang === 'ar' ? 'السعر: من الأغلى' : 'Price: High to Low'}</option>
                <option value="name">{lang === 'ar' ? 'الاسم' : 'Name'}</option>
              </select>
            </div>
          </div>

          {/* Product Grid / Skeleton / Empty State */}
          {error ? (
            <ErrorState message={error} onRetry={fetchProducts} />
          ) : loading ? (
            <ProductGridSkeleton count={8} />
          ) : products.length === 0 ? (
            <EmptyState
              title={lang === 'ar' ? 'لم يتم العثور على إكسسوارات' : 'No accessories found'}
              message={
                debouncedSearch
                  ? lang === 'ar'
                    ? `لا توجد نتائج تطابق "${debouncedSearch}"`
                    : `No results found matching "${debouncedSearch}"`
                  : lang === 'ar'
                  ? 'لا توجد إكسسوارات متوفرة في هذا القسم حالياً.'
                  : 'No accessories available in this category at the moment.'
              }
            />
          ) : (
            <div className="boo-products-grid">
              {products.map((product) => (
                <ProductCard
                  key={product._id || product.id}
                  product={product}
                  basePath="/accessories"
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

