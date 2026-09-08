import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Check, X, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { lang } = useLanguage();

  if (!product) return null;

  const rawImage = product.images && product.images.length > 0 
    ? (typeof product.images[0] === 'string' ? product.images[0] : product.images[0]?.url) 
    : product.image;
  const mainImage = rawImage || 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80';

  const isInStock = product.inStock !== undefined
    ? Boolean(product.inStock)
    : (product.stock === undefined || Number(product.stock) > 0 || Number(product.stockCount) > 0);

  return (
    <div className="boo-ecom-card">
      {/* Product Image & Stock Badge */}
      <div className="boo-ecom-card-img-wrap">
        <Link to={`/spare-parts/${product.id || product._id || product.sku}`} aria-label={`View ${product.name}`}>
          <img
            src={mainImage}
            alt={product.name}
            className="boo-ecom-card-img"
            loading="lazy"
          />
        </Link>
        <span
          className={`boo-ecom-stock-badge ${
            isInStock ? 'stock-in' : 'stock-out'
          }`}
        >
          {isInStock ? (
            <>
              <Check size={12} />
              <span>{lang === 'ar' ? 'متوفر بالمخزن' : 'In Stock'}</span>
            </>
          ) : (
            <>
              <X size={12} />
              <span>{lang === 'ar' ? 'غير متوفر' : 'Out of Stock'}</span>
            </>
          )}
        </span>
      </div>

      {/* Body Information */}
      <div className="boo-ecom-card-body">
        <div className="boo-ecom-meta-row">
          <span className="boo-ecom-category">{product.categoryName || product.category}</span>
          <span className="boo-ecom-sku">SKU: {product.sku}</span>
        </div>

        <Link to={`/spare-parts/${product.id || product._id || product.sku}`}>
          <h3 className="boo-ecom-title">{product.name}</h3>
        </Link>

        {product.model && (
          <p className="boo-ecom-model">{product.model}</p>
        )}

        {/* Price Row */}
        <div className="boo-ecom-price-row">
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
              {lang === 'ar' ? 'السعر' : 'Price'}
            </span>
            <span className="boo-ecom-price">
              {product.price?.toLocaleString()} EGP
            </span>
          </div>
          {product.brand && (
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '600' }}>
              {product.brand.split('/')[0]}
            </span>
          )}
        </div>

        {/* Action Buttons: Add to Cart & View Details */}
        <div className="boo-ecom-card-actions">
          <Link
            to={`/spare-parts/${product.id || product._id || product.sku}`}
            className="btn btn-outline btn-sm"
            style={{ padding: '0.55rem 0.75rem' }}
          >
            <Eye size={14} />
            <span>{lang === 'ar' ? 'التفاصيل' : 'Details'}</span>
          </Link>

          <button
            type="button"
            className="btn btn-primary btn-sm"
            style={{ padding: '0.55rem 0.75rem' }}
            disabled={!isInStock}
            onClick={() => addToCart(product, 1)}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart size={14} />
            <span>{lang === 'ar' ? 'أضف للسلة' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
