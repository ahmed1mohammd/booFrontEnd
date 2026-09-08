import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Package,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  Phone,
  ArrowLeft,
  Printer,
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';
import OrderTimeline from '../components/Order/OrderTimeline';
import ErrorState from '../components/common/ErrorState';
import { ordersApi } from '../api/ordersApi';
import { useLanguage } from '../context/LanguageContext';

export default function OrderDetails() {
  const { id } = useParams();
  const { lang } = useLanguage();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await ordersApi.getOrder(id);
      if (res.success && res.order) {
        setOrder(res.order);
      } else {
        throw new Error('Order not found.');
      }
    } catch (err) {
      setError(err.message || 'Unable to load order details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="section" style={{ minHeight: '65vh' }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          <div className="skeleton-box" style={{ height: '50px', width: '300px', marginBottom: '2rem' }} />
          <div className="skeleton-box" style={{ height: '120px', width: '100%', marginBottom: '2rem' }} />
          <div className="skeleton-box" style={{ height: '300px', width: '100%' }} />
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="section">
        <div className="container">
          <ErrorState
            title="Unable to load order"
            message={error || 'Could not find details for this order number.'}
            onRetry={fetchOrder}
          />
        </div>
      </div>
    );
  }

  const { customer, shippingAddress, items, pricing, timeline, status, paymentStatus, createdAt } = order;

  return (
    <div className="boo-order-details-page">
      {/* Header */}
      <div className="boo-page-header" style={{ padding: '3.5rem 0 3rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span className="section-badge badge-green" style={{ marginBottom: 0 }}>
                  Order Confirmed
                </span>
                <span style={{ fontSize: '0.85rem', color: '#9cb4c9' }}>
                  Placed on {new Date(createdAt).toLocaleDateString()}
                </span>
              </div>
              <h1 style={{ color: '#FFFFFF', margin: 0, fontSize: '2.25rem' }}>
                Order #{order.id}
              </h1>
            </div>

            <button
              type="button"
              className="btn btn-outline-white btn-sm"
              onClick={() => window.print()}
            >
              <Printer size={16} />
              <span>Print Invoice</span>
            </button>
          </div>
        </div>
      </div>

      <div className="section" style={{ backgroundColor: 'var(--bg-main)', paddingTop: '2.5rem' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          {/* Order Visual Timeline Progression */}
          <div className="boo-page-card" style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', color: 'var(--heading)' }}>
              Order Status & Tracking
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
              Live progress for your automotive parts shipment.
            </p>

            <OrderTimeline timeline={timeline} />
          </div>

          {/* 2-Column Info Grid: Delivery info & Payment Status */}
          <div className="grid-2" style={{ marginBottom: '2.5rem' }}>
            {/* Delivery Information */}
            <div
              style={{
                backgroundColor: 'var(--bg-sidebar)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.75rem'
              }}
            >
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--heading)' }}>
                <MapPin size={18} color="var(--primary)" />
                <span>Delivery Information</span>
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.925rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.78rem' }}>Recipient</span>
                  <strong>{customer?.name}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.78rem' }}>Phone Number</span>
                  <strong>{customer?.phone}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.78rem' }}>Governorate & City</span>
                  <strong>{shippingAddress?.governorate} — {shippingAddress?.city}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.78rem' }}>Full Address</span>
                  <span>{shippingAddress?.address}</span>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div
              style={{
                backgroundColor: 'var(--bg-sidebar)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.75rem'
              }}
            >
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--heading)' }}>
                <ShieldCheck size={18} color="var(--secondary)" />
                <span>Payment Summary</span>
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.925rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Payment Gateway:</span>
                  <strong>Fawaterk Secure</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Payment Status:</span>
                  <span
                    style={{
                      color: paymentStatus === 'successful' || status === 'paid' ? 'var(--hover-green)' : '#dc2626',
                      fontWeight: '700',
                      backgroundColor: 'rgba(126, 194, 75, 0.15)',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '4px'
                    }}
                  >
                    {paymentStatus === 'successful' || status === 'paid' ? 'Successful / Paid' : 'Pending'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Order Total:</span>
                  <strong style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--primary)' }}>
                    {pricing?.total?.toLocaleString()} EGP
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* Ordered Products Table */}
          <div className="boo-page-card" style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem', color: 'var(--heading)' }}>
              Ordered Items
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              {items?.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '1rem',
                    borderBottom: '1px solid var(--gray-100)',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border)' }}
                    />
                    <div>
                      <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1rem' }}>{item.name}</h4>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        SKU: {item.sku} • {item.brand}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      {item.quantity} × {item.unitPrice?.toLocaleString()} EGP
                    </div>
                    <div style={{ fontWeight: '800', fontFamily: 'var(--font-heading)', color: 'var(--heading)' }}>
                      {item.totalPrice?.toLocaleString()} EGP
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div style={{ maxWidth: '320px', marginLeft: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <span>Subtotal</span>
                <span>{pricing?.subtotal?.toLocaleString()} EGP</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <span>Shipping</span>
                <span>{pricing?.shipping?.toLocaleString()} EGP</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '2px solid var(--border)', fontSize: '1.2rem', fontWeight: '800', color: 'var(--heading)' }}>
                <span>Total</span>
                <span style={{ color: 'var(--primary)' }}>{pricing?.total?.toLocaleString()} EGP</span>
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <Link to="/spare-parts" className="btn btn-outline">
              <ArrowLeft size={16} />
              <span>Back to Store</span>
            </Link>

            <Link to="/" className="btn btn-primary">
              <ShoppingBag size={16} />
              <span>Return to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
