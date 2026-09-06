import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Check, X, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function QuickCartToast() {
  const { toastMessage, dismissToast, cartCount } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="boo-cart-toast">
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: 'var(--secondary)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        <Check size={18} />
      </div>

      <div style={{ flexGrow: 1, minWidth: '180px' }}>
        <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#FFFFFF' }}>
          Added to Cart
        </div>
        <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
          {toastMessage.message}
        </div>
      </div>

      <Link
        to="/cart"
        className="btn btn-primary btn-sm"
        onClick={dismissToast}
        style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
      >
        <span>View Cart ({cartCount})</span>
        <ArrowRight size={13} />
      </Link>

      <button
        type="button"
        onClick={dismissToast}
        style={{ color: '#94a3b8', padding: '0.25rem' }}
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}
