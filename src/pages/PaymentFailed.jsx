import React, { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { AlertTriangle, RefreshCw, ShoppingCart, ArrowLeft, PhoneCall, ShieldAlert } from 'lucide-react';
import { ordersApi } from '../api/ordersApi';
import { useLanguage } from '../context/LanguageContext';

export default function PaymentFailed() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order_id') || 'BOO-10025';
  const reason = searchParams.get('reason') || 'Transaction was declined by card issuing bank.';
  const navigate = useNavigate();
  const { lang } = useLanguage();

  const [retrying, setRetrying] = useState(false);

  const handleRetryPayment = async () => {
    try {
      setRetrying(true);
      const res = await ordersApi.retryPayment(orderId);
      if (res.success && res.paymentUrl) {
        if (res.paymentUrl.startsWith('http')) {
          window.location.href = res.paymentUrl;
        } else {
          navigate(res.paymentUrl);
        }
      }
    } catch (e) {
      navigate('/checkout');
    } finally {
      setRetrying(false);
    }
  };

  return (
    <div className="boo-payment-failed-page">
      <div className="section" style={{ backgroundColor: 'var(--bg-main)', minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div
            style={{
              maxWidth: '620px',
              margin: '0 auto',
              backgroundColor: '#FFFFFF',
              border: '1px solid #fee2e2',
              borderRadius: 'var(--radius-lg)',
              padding: '3.5rem 2.5rem',
              textAlign: 'center',
              boxShadow: '0 12px 36px rgba(220, 38, 38, 0.08)'
            }}
          >
            {/* Warning Icon */}
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#fee2e2',
                color: '#dc2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                border: '3px solid rgba(220, 38, 38, 0.2)'
              }}
            >
              <AlertTriangle size={46} />
            </div>

            <h1 style={{ fontSize: '2rem', marginBottom: '0.65rem', color: '#991b1b' }}>
              Payment Failed
            </h1>

            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '1.75rem', lineHeight: '1.6' }}>
              We couldn't complete your payment. Please try again or use another payment method.
            </p>

            {/* Error Details Box */}
            <div
              style={{
                backgroundColor: '#fff5f5',
                border: '1px solid #fed7d7',
                borderRadius: 'var(--radius-sm)',
                padding: '1.25rem',
                textAlign: 'left',
                marginBottom: '2rem',
                fontSize: '0.875rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#742a2a' }}>Order Reference:</span>
                <strong style={{ color: '#9b2c2c' }}>{orderId}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#742a2a' }}>Status:</span>
                <span style={{ color: '#dc2626', fontWeight: '700' }}>Unpaid / Pending</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={handleRetryPayment}
                disabled={retrying}
              >
                <RefreshCw size={18} className={retrying ? 'animate-spin' : ''} />
                <span>{retrying ? 'Connecting to Fawaterk...' : 'Try Again'}</span>
              </button>

              <Link to="/cart" className="btn btn-outline btn-lg">
                <ShoppingCart size={18} />
                <span>Back to Cart</span>
              </Link>
            </div>

            {/* Help Callout */}
            <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Need assistance? Call our support team at <a href="tel:01122559066" style={{ color: 'var(--primary)', fontWeight: '700' }}>01122559066</a>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
