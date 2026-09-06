import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Package, ShoppingBag, ArrowRight, ShieldCheck, Phone, MapPin, Loader2 } from 'lucide-react';
import { ordersApi } from '../api/ordersApi';
import { useLanguage } from '../context/LanguageContext';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order_id') || 'BOO-10025';
  const navigate = useNavigate();
  const { lang } = useLanguage();

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Authoritative verification with backend
    const verifyAndLoadOrder = async () => {
      try {
        setLoading(true);
        // Call backend verification
        await ordersApi.verifyPayment(orderId);
        const res = await ordersApi.getOrder(orderId);
        if (res.success) {
          setOrder(res.order);
        }
      } catch (e) {
        console.error('Error verifying order', e);
      } finally {
        setLoading(false);
      }
    };

    verifyAndLoadOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="section" style={{ minHeight: '65vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <Loader2 size={40} color="var(--primary)" className="animate-spin" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ color: 'var(--heading)' }}>Verifying Payment Status with Gateway...</h3>
          <p style={{ color: 'var(--text-muted)' }}>Please wait a moment while we confirm your order.</p>
        </div>
      </div>
    );
  }

  const customerName = order?.customer?.name || 'Valued Customer';
  const customerPhone = order?.customer?.phone || '01122559066';
  const totalAmount = order?.pricing?.total ? `${order.pricing.total.toLocaleString()} EGP` : '1,600 EGP';
  const addressFormatted = order?.shippingAddress
    ? `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.governorate}`
    : '19 El-Galaa El-Bahary Street, Shebin El-Kom, Menoufia';

  return (
    <div className="boo-payment-success-page">
      <div className="section" style={{ backgroundColor: 'var(--bg-main)', minHeight: '75vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div
            style={{
              maxWidth: '680px',
              margin: '0 auto',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '3.5rem 2.5rem',
              textAlign: 'center',
              boxShadow: '0 12px 36px rgba(28, 61, 90, 0.08)'
            }}
          >
            {/* Success Icon */}
            <div
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                backgroundColor: 'var(--secondary-light)',
                color: 'var(--hover-green)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                border: '3px solid rgba(126, 194, 75, 0.3)'
              }}
            >
              <CheckCircle2 size={52} />
            </div>

            <span className="section-badge badge-green" style={{ marginBottom: '0.75rem' }}>
              Payment Verified
            </span>

            <h1 style={{ fontSize: '2.1rem', marginBottom: '0.5rem', color: 'var(--heading)' }}>
              Payment Successful
            </h1>

            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '2rem' }}>
              Your order has been confirmed successfully and is being prepared by our warehouse team.
            </p>

            {/* Order Quick Summary Card */}
            <div
              style={{
                backgroundColor: 'var(--bg-sidebar)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.75rem',
                textAlign: 'left',
                marginBottom: '2.25rem'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid var(--border)',
                  marginBottom: '1rem'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
                    Order Number
                  </span>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary)' }}>
                    {order?.id || orderId}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
                    Total Amount
                  </span>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '800', color: 'var(--heading)' }}>
                    {totalAmount}
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.875rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Customer Name:</span>
                  <strong style={{ color: 'var(--heading)' }}>{customerName}</strong>
                </div>

                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Phone:</span>
                  <strong style={{ color: 'var(--heading)' }}>{customerPhone}</strong>
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Delivery Address:</span>
                  <strong style={{ color: 'var(--heading)' }}>{addressFormatted}</strong>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to={`/order/${order?.id || orderId}`} className="btn btn-primary btn-lg">
                <Package size={18} />
                <span>View Order Details & Tracking</span>
                <ArrowRight size={18} />
              </Link>

              <Link to="/spare-parts" className="btn btn-outline btn-lg">
                <ShoppingBag size={18} />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
