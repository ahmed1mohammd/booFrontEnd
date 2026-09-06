import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import EmptyState from '../components/common/EmptyState';
import { useLanguage } from '../context/LanguageContext';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, subtotal, shipping, total, clearCart } = useCart();
  const { lang } = useLanguage();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="section" style={{ minHeight: '65vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <EmptyState
            title="Your cart is empty"
            description="Explore our high-performance genuine spare parts catalog and add items to your cart."
            actionText="Browse Spare Parts"
            actionLink="/spare-parts"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="boo-cart-page">
      {/* Header Banner */}
      <div style={{ backgroundColor: 'var(--bg-dark)', color: '#FFFFFF', padding: '3.5rem 0 3rem 0' }}>
        <div className="container">
          <h1 style={{ color: '#FFFFFF', marginBottom: '0.5rem' }}>Shopping Cart</h1>
          <p style={{ color: '#c4d7e8', margin: 0 }}>
            Review your selected automotive spare parts before proceeding to secure checkout.
          </p>
        </div>
      </div>

      <div className="section" style={{ backgroundColor: 'var(--bg-main)', paddingTop: '2.5rem' }}>
        <div className="container">
          <div className="boo-cart-layout">
            {/* Left Column: Cart Items List */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '2rem',
                boxShadow: 'var(--shadow-xs)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '1.25rem',
                  borderBottom: '2px solid var(--border)',
                  marginBottom: '0.5rem'
                }}
              >
                <h2 style={{ fontSize: '1.35rem', margin: 0 }}>Cart Items ({cartItems.length})</h2>
                <button
                  type="button"
                  onClick={clearCart}
                  style={{ fontSize: '0.85rem', color: '#ef4444', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <Trash2 size={14} />
                  <span>Clear Cart</span>
                </button>
              </div>

              {/* Items List */}
              <div className="boo-cart-items-list">
                {cartItems.map((item) => (
                  <div key={item.id} className="boo-cart-item">
                    {/* Thumbnail */}
                    <img src={item.image} alt={item.name} className="boo-cart-item-img" />

                    {/* Name & SKU */}
                    <div>
                      <Link to={`/spare-parts/${item.id}`} className="boo-cart-item-title">
                        {item.name}
                      </Link>
                      <div className="boo-cart-item-sku">SKU: {item.sku}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '700', marginTop: '0.25rem' }}>
                        {item.price?.toLocaleString()} EGP each
                      </div>
                    </div>

                    {/* Quantity Controls [-] N [+] */}
                    <div>
                      <div className="boo-qty-selector" style={{ transform: 'scale(0.95)' }}>
                        <button
                          type="button"
                          className="boo-qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="boo-qty-value">{item.quantity}</span>
                        <button
                          type="button"
                          className="boo-qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="boo-cart-item-total" style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Total</span>
                      <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', fontSize: '1.1rem', color: 'var(--heading)' }}>
                        {(item.price * item.quantity).toLocaleString()} EGP
                      </span>
                    </div>

                    {/* Remove Action */}
                    <button
                      type="button"
                      className="boo-cart-remove-btn"
                      onClick={() => removeFromCart(item.id)}
                      title="Remove item"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Continue Shopping Link */}
              <div style={{ marginTop: '2rem' }}>
                <Link
                  to="/spare-parts"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', color: 'var(--primary)', fontSize: '0.95rem' }}
                >
                  <ArrowLeft size={16} />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="boo-summary-box">
              <h3 className="boo-summary-title">Order Summary</h3>

              <div className="boo-summary-row">
                <span>Subtotal</span>
                <strong>{subtotal.toLocaleString()} EGP</strong>
              </div>

              <div className="boo-summary-row">
                <span>Shipping</span>
                <strong>{shipping > 0 ? `${shipping.toLocaleString()} EGP` : 'Free'}</strong>
              </div>

              <div className="boo-summary-row total-row">
                <span>Total</span>
                <span style={{ color: 'var(--primary)' }}>{total.toLocaleString()} EGP</span>
              </div>

              <button
                type="button"
                className="btn btn-primary btn-lg"
                style={{ width: '100%', marginTop: '1.5rem' }}
                onClick={() => navigate('/checkout')}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </button>

              <div style={{ marginTop: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldCheck size={16} color="var(--secondary)" />
                  <span>Official Fawaterk Payment Gateway Protection</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Truck size={16} color="var(--primary)" />
                  <span>Fast delivery directly to your doorstep</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
