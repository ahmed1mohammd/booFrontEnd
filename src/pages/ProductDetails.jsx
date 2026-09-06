import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Check,
  X,
  ShieldCheck,
  Truck,
  ArrowLeft,
  Share2,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import ProductGallery from '../components/Product/ProductGallery';
import ProductSpecsTable from '../components/Product/ProductSpecsTable';
import ProductCard from '../components/Product/ProductCard';
import ErrorState from '../components/common/ErrorState';
import { productsApi } from '../api/productsApi';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { lang } = useLanguage();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await productsApi.getSparePart(id);
      if (res.success) {
        setProduct(res.data);
        setRelated(res.related || []);
      }
    } catch (err) {
      setError(err.message || 'Product not found.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setQuantity(1);
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleDecreaseQty = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleIncreaseQty = () => {
    if (product && quantity < (product.stockCount || 10)) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (loading) {
    return (
      <div className="section" style={{ minHeight: '60vh' }}>
        <div className="container">
          <div className="boo-pdp-container">
            <div className="skeleton-box" style={{ height: '420px', width: '100%' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="skeleton-box" style={{ height: '20px', width: '120px' }} />
              <div className="skeleton-box" style={{ height: '36px', width: '90%' }} />
              <div className="skeleton-box" style={{ height: '24px', width: '180px' }} />
              <div className="skeleton-box" style={{ height: '80px', width: '100%' }} />
              <div className="skeleton-box" style={{ height: '100px', width: '100%' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="section">
        <div className="container">
          <ErrorState
            title="Product not found"
            message={error || 'The spare part you requested is not available in our catalog.'}
            onRetry={() => navigate('/spare-parts')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="boo-pdp-page">
      {/* Breadcrumb Bar */}
      <div style={{ backgroundColor: 'var(--bg-sidebar)', borderBottom: '1px solid var(--border)', padding: '0.85rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <Link to="/" style={{ color: 'var(--text-main)', fontWeight: '600' }}>Home</Link>
            <span>/</span>
            <Link to="/spare-parts" style={{ color: 'var(--text-main)', fontWeight: '600' }}>Spare Parts</Link>
            <span>/</span>
            <span style={{ color: 'var(--primary)', fontWeight: '600' }}>{product.categoryName || product.category}</span>
            <span>/</span>
            <span style={{ color: 'var(--heading)' }}>{product.sku}</span>
          </div>
        </div>
      </div>

      {/* Main PDP Grid */}
      <div className="section" style={{ backgroundColor: 'var(--bg-main)', paddingTop: '2.5rem' }}>
        <div className="container">
          <div className="boo-pdp-container">
            {/* Left Column: Image Gallery */}
            <div className="boo-pdp-gallery-col">
              <ProductGallery images={product.images} productName={product.name} />
            </div>

            {/* Right Column: Product Info & Purchase Controls */}
            <div className="boo-pdp-info">
              {/* Badges Row */}
              <div className="boo-pdp-badge-row">
                <span className="section-badge" style={{ marginBottom: 0 }}>
                  {product.categoryName || product.category}
                </span>
                <span
                  className={`boo-ecom-stock-badge ${
                    product.inStock ? 'stock-in' : 'stock-out'
                  }`}
                  style={{ position: 'static' }}
                >
                  {product.inStock ? (
                    <>
                      <Check size={13} />
                      <span>In Stock ({product.stockCount} units available)</span>
                    </>
                  ) : (
                    <>
                      <X size={13} />
                      <span>Out of Stock</span>
                    </>
                  )}
                </span>
              </div>

              {/* Title & SKU */}
              <h1 className="boo-pdp-title">{product.name}</h1>

              <div className="boo-pdp-sku-bar">
                <span>SKU: <strong>{product.sku}</strong></span>
                <span>•</span>
                <span>Brand: <strong>{product.brand}</strong></span>
              </div>

              {/* Price Box */}
              <div className="boo-pdp-price-box">
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', fontWeight: '600' }}>
                    Official Price / السعر
                  </span>
                  <div className="boo-pdp-price-val">
                    {product.price?.toLocaleString()} EGP
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--hover-green)', fontWeight: '700', fontSize: '0.85rem' }}>
                    <ShieldCheck size={16} />
                    <span>BOO Guarantee</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    100% Genuine OEM Certified
                  </div>
                </div>
              </div>

              {/* Short Description */}
              <p className="boo-pdp-short-desc">
                {product.shortDescription || product.description}
              </p>

              {/* Quantity Selector & Add to Cart Button */}
              <div className="boo-pdp-action-row">
                <div className="boo-qty-selector">
                  <button
                    type="button"
                    className="boo-qty-btn"
                    onClick={handleDecreaseQty}
                    disabled={quantity <= 1 || !product.inStock}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="boo-qty-value">{quantity}</span>
                  <button
                    type="button"
                    className="boo-qty-btn"
                    onClick={handleIncreaseQty}
                    disabled={!product.inStock || quantity >= (product.stockCount || 10)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  style={{ flex: 1 }}
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={18} />
                  <span>Add to Cart ({((product.price || 0) * quantity).toLocaleString()} EGP)</span>
                </button>
              </div>

              {/* Service Highlights */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '0.75rem',
                  padding: '1rem',
                  backgroundColor: 'var(--bg-sidebar)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-main)' }}>
                  <Truck size={16} color="var(--primary)" />
                  <span>Express Shipping across Egypt</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-main)' }}>
                  <ShieldCheck size={16} color="var(--secondary)" />
                  <span>VIN Fitment Guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Description & Specifications Details */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '2.5rem',
              marginBottom: '4rem',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--heading)' }}>
                Product Description
              </h2>
              <p style={{ color: 'var(--text-main)', lineHeight: '1.7', fontSize: '1.05rem' }}>
                {product.description}
              </p>
            </div>

            {/* Specifications & Compatibility Table */}
            <ProductSpecsTable specs={product.specs} compatibility={product.compatibility} />

            {/* Bottom Add to Cart CTA */}
            <div
              style={{
                marginTop: '2.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Need this part installed?</span>
                <div style={{ fontWeight: '700', color: 'var(--heading)' }}>
                  Book professional installation at BOO Shebin El-Kom Service Center
                </div>
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart size={18} />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>

          {/* Related / Recommended Spare Parts */}
          {related.length > 0 && (
            <div>
              <div className="section-header text-left" style={{ marginBottom: '2rem' }}>
                <span className="section-badge badge-green">Recommended For You</span>
                <h2>Related Spare Parts</h2>
              </div>
              <div className="grid-3">
                {related.map((rel) => (
                  <ProductCard key={rel.id} product={rel} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
