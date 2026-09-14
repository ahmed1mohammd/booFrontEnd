import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Package, Search, Truck, Clock, AlertCircle, ArrowRight, MessageCircle, Phone } from 'lucide-react';
import { ordersApi } from '../api/ordersApi';
import OrderTimeline from '../components/Order/OrderTimeline';
import { useLanguage } from '../context/LanguageContext';
import { BRAND_CONFIG } from '../data/homeData';

export default function TrackOrder() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const navigate = useNavigate();

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchedOrder, setSearchedOrder] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = inputQuery.trim();
    if (!query) return;

    setLoading(true);
    setError(null);
    setSearchedOrder(null);

    try {
      // Try retrieving order directly by order ID
      const order = await ordersApi.getOrder(query);
      if (order && order.id) {
        setSearchedOrder(order);
      } else {
        throw new Error(isAr ? 'لم نتمكن من العثور على طلب بهذا الرقم.' : 'Order not found with this number.');
      }
    } catch (err) {
      setError(err.message || (isAr ? 'تعذر العثور على الطلب. يرجى التحقق من الرقم والتأكد من إدخاله بشكل صحيح.' : 'Unable to find order. Please verify the order number.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="boo-track-order-page">
      {/* Header Banner */}
      <div className="boo-page-header">
        <div className="container">
          <span className="section-badge" style={{ backgroundColor: 'rgba(0, 174, 239, 0.2)', color: '#FFFFFF' }}>
            <Package size={14} />
            {isAr ? 'تتبع الشحنة' : 'Order Tracking'}
          </span>
          <h1 style={{ color: '#FFFFFF', marginBottom: '0.75rem' }}>
            {isAr ? 'تتبع حالة طلبك' : 'Track Your Order'}
          </h1>
          <p style={{ color: '#c2d8eb', maxWidth: '680px', margin: 0, fontSize: '1.05rem', lineHeight: '1.6' }}>
            {isAr
              ? 'أدخل رقم الطلب الخاص بك للمتابعة اللحظية لحالة الشحن والتجهيز والتسليم.'
              : 'Enter your order reference code to get real-time shipping status and delivery updates.'}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="section" style={{ backgroundColor: 'var(--bg-main, #0b131f)', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '850px' }}>

          {/* Search Box Card */}
          <div style={{
            backgroundColor: 'var(--bg-sidebar, #121e2f)',
            border: '1px solid var(--border, rgba(255, 255, 255, 0.08))',
            borderRadius: 'var(--radius-lg, 16px)',
            padding: '2.5rem',
            marginBottom: '2.5rem',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)'
          }}>
            <h3 style={{ color: '#FFFFFF', marginBottom: '1.25rem', fontSize: '1.35rem', textAlign: 'center' }}>
              {isAr ? 'البحث عن الطلب' : 'Find Your Order'}
            </h3>

            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 300px', position: 'relative' }}>
                <input
                  type="text"
                  className="input-field"
                  placeholder={isAr ? 'أدخل رقم الطلب (مثال: BOO-1001)' : 'Enter Order Number (e.g., BOO-1001)'}
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.9rem 1.25rem',
                    fontSize: '1rem',
                    borderRadius: 'var(--radius-sm, 8px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border, rgba(255, 255, 255, 0.15))',
                    color: '#FFFFFF'
                  }}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{
                  padding: '0.9rem 2rem',
                  fontSize: '1rem',
                  fontWeight: '700',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  whiteSpace: 'nowrap'
                }}
              >
                {loading ? (
                  <span>{isAr ? 'جاري البحث...' : 'Searching...'}</span>
                ) : (
                  <>
                    <Search size={18} />
                    <span>{isAr ? 'تتبع الطلب' : 'Track Order'}</span>
                  </>
                )}
              </button>
            </form>

            <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted, #8ea0b5)' }}>
              {isAr
                ? 'ملاحظة: يمكنك إيجاد رقم الطلب في رسالة التأكيد الإلكترونية أو الفاتورة.'
                : 'Tip: You can find your order number in your checkout receipt or SMS notification.'}
            </div>
          </div>

          {/* Error Message if search failed */}
          {error && (
            <div style={{
              backgroundColor: 'rgba(220, 38, 38, 0.12)',
              border: '1px solid rgba(220, 38, 38, 0.3)',
              borderRadius: 'var(--radius-md, 12px)',
              padding: '1.5rem',
              marginBottom: '2.5rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem'
            }}>
              <AlertCircle size={24} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ color: '#f87171', margin: '0 0 0.35rem 0', fontSize: '1.05rem' }}>
                  {isAr ? 'تعذر إيجاد الطلب' : 'Order Not Found'}
                </h4>
                <p style={{ color: '#fca5a5', margin: 0, fontSize: '0.92rem', lineHeight: '1.5' }}>
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* Searched Order Result Card */}
          {searchedOrder && (
            <div style={{
              backgroundColor: 'var(--bg-sidebar, #121e2f)',
              border: '1px solid var(--border, rgba(255, 255, 255, 0.08))',
              borderRadius: 'var(--radius-lg, 16px)',
              padding: '2.5rem',
              marginBottom: '2.5rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                <div>
                  <span className="section-badge badge-green" style={{ marginBottom: '0.4rem' }}>
                    {isAr ? 'تم العثور على الطلب' : 'Order Located'}
                  </span>
                  <h2 style={{ color: '#FFFFFF', margin: 0, fontSize: '1.75rem' }}>
                    {isAr ? `طلب رقم #${searchedOrder.id}` : `Order #${searchedOrder.id}`}
                  </h2>
                </div>

                <button
                  onClick={() => navigate(`/order/${searchedOrder.id}`)}
                  className="btn btn-outline-white btn-sm"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <span>{isAr ? 'عرض الفاتورة بالتفصيل' : 'View Full Order Details'}</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Order Timeline Visual */}
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ color: '#FFFFFF', marginBottom: '1rem', fontSize: '1.1rem' }}>
                  {isAr ? 'مراحل تجهيز وشحن الطلب:' : 'Shipment Progress Timeline:'}
                </h4>
                <OrderTimeline timeline={searchedOrder.timeline} />
              </div>

              {/* Quick Info Summary */}
              <div className="grid-2" style={{ gap: '1rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                <div>
                  <span style={{ color: 'var(--text-muted, #8ea0b5)', fontSize: '0.8rem', display: 'block' }}>
                    {isAr ? 'اسم العميل' : 'Recipient Name'}
                  </span>
                  <strong style={{ color: '#FFFFFF', fontSize: '1rem' }}>{searchedOrder.customer?.name}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted, #8ea0b5)', fontSize: '0.8rem', display: 'block' }}>
                    {isAr ? 'عنوان الشحن' : 'Shipping Destination'}
                  </span>
                  <strong style={{ color: '#FFFFFF', fontSize: '1rem' }}>
                    {searchedOrder.shippingAddress?.governorate} — {searchedOrder.shippingAddress?.city}
                  </strong>
                </div>
              </div>
            </div>
          )}

          {/* Customer Support Assistance */}
          <div style={{
            backgroundColor: 'var(--bg-sidebar, #121e2f)',
            border: '1px solid var(--border, rgba(255, 255, 255, 0.08))',
            borderRadius: 'var(--radius-md, 12px)',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#FFFFFF', marginBottom: '0.5rem' }}>
              {isAr ? 'تحتاج إلى مساعدة في تتبع طلبك؟' : 'Need Personal Assistance with Your Order?'}
            </h3>
            <p style={{ color: 'var(--text-muted, #8ea0b5)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              {isAr ? 'تواصل مباشرة مع خدمة العملاء وسنقوم بموافاتك بمكان الشحنة فوراً.' : 'Contact support directly on WhatsApp or Phone for immediate help.'}
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href={BRAND_CONFIG.contact.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <MessageCircle size={18} />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:${BRAND_CONFIG.contact.phones[0]?.raw || '+201000000000'}`}
                className="btn btn-outline"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Phone size={18} />
                <span>{BRAND_CONFIG.contact.phones[0]?.display || 'اتصل بنا'}</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
