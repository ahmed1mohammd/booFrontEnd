import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Clock, XCircle, Package, ShoppingBag, ArrowRight, ShieldCheck, RefreshCw, Loader2 } from 'lucide-react';
import { ordersApi } from '../api/ordersApi';
import { useLanguage } from '../context/LanguageContext';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order_id') || searchParams.get('orderId') || 'BOO-10025';
  const queryStatus = searchParams.get('status') || searchParams.get('paymentStatus');
  const navigate = useNavigate();
  const { lang } = useLanguage();

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [verifiedStatus, setVerifiedStatus] = useState('pending');

  useEffect(() => {
    // Authoritative verification with backend
    const verifyAndLoadOrder = async () => {
      try {
        setLoading(true);
        // Call backend verification
        const verifiedData = await ordersApi.verifyPayment(orderId);
        if (verifiedData?.paymentStatus) {
          setVerifiedStatus(verifiedData.paymentStatus);
        } else if (queryStatus === 'success' || queryStatus === 'paid') {
          setVerifiedStatus('paid');
        } else if (queryStatus === 'pending') {
          setVerifiedStatus('pending');
        }

        const res = await ordersApi.getOrder(orderId);
        if (res.success || res.id) {
          const ord = res.order || res;
          setOrder(ord);
          if (ord.paymentStatus) {
            setVerifiedStatus(ord.paymentStatus);
          }
        }
      } catch (e) {
        console.error('Error verifying order', e);
      } finally {
        setLoading(false);
      }
    };

    verifyAndLoadOrder();
  }, [orderId, queryStatus]);

  if (loading) {
    return (
      <div className="section" style={{ minHeight: '65vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <Loader2 size={40} color="var(--primary)" className="animate-spin" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ color: 'var(--heading)' }}>Verifying Payment Status with Gateway...</h3>
          <p style={{ color: 'var(--text-muted)' }}>جاري التحقق من حالة الدفع مع بوابة فواتيرك...</p>
        </div>
      </div>
    );
  }

  const isPaid = verifiedStatus === 'paid';
  const isFailed = verifiedStatus === 'failed';
  const isPending = !isPaid && !isFailed; // pending or unpaid (e.g. Fawry code issued)

  const customerName = order?.customer?.name || 'Valued Customer';
  const customerPhone = order?.customer?.phone || '01122559066';
  const totalAmount = order?.pricing?.total ? `${order.pricing.total.toLocaleString()} EGP` : '1,600 EGP';
  const addressFormatted = order?.shippingAddress
    ? `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.governorate}`
    : 'Menoufia, Egypt';

  return (
    <div className="boo-payment-success-page">
      <div className="section" style={{ backgroundColor: 'var(--bg-main)', minHeight: '75vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div
            className="boo-page-card"
            style={{
              maxWidth: '680px',
              margin: '0 auto',
              borderRadius: 'var(--radius-lg)',
              textAlign: 'center',
              boxShadow: '0 12px 36px rgba(28, 61, 90, 0.08)'
            }}
          >
            {/* Status Icon */}
            {isPaid && (
              <div
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(126, 194, 75, 0.15)',
                  color: 'var(--hover-green)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto',
                  border: '3px solid rgba(126, 194, 75, 0.4)'
                }}
              >
                <CheckCircle2 size={52} />
              </div>
            )}

            {isPending && (
              <div
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(234, 179, 8, 0.15)',
                  color: '#d97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto',
                  border: '3px solid rgba(234, 179, 8, 0.4)'
                }}
              >
                <Clock size={52} />
              </div>
            )}

            {isFailed && (
              <div
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  color: '#dc2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto',
                  border: '3px solid rgba(239, 68, 68, 0.4)'
                }}
              >
                <XCircle size={52} />
              </div>
            )}

            {/* Status Badge */}
            {isPaid && (
              <span className="section-badge badge-green" style={{ marginBottom: '0.75rem' }}>
                Payment Verified / تم تأكيد الدفع
              </span>
            )}
            {isPending && (
              <span className="section-badge" style={{ marginBottom: '0.75rem', backgroundColor: '#fef3c7', color: '#b45309' }}>
                Pending Payment / في انتظار السداد وتحت المراجعة
              </span>
            )}
            {isFailed && (
              <span className="section-badge" style={{ marginBottom: '0.75rem', backgroundColor: '#fee2e2', color: '#b91c1c' }}>
                Payment Failed / فشلت عملية الدفع
              </span>
            )}

            {/* Status Title */}
            <h1 style={{ fontSize: '2.1rem', marginBottom: '0.5rem', color: 'var(--heading)' }}>
              {isPaid && (lang === 'ar' ? 'تم الدفع بنجاح' : 'Payment Successful')}
              {isPending && (lang === 'ar' ? 'تم استلام الطلب - في انتظار الدفع' : 'Order Received - Pending Payment')}
              {isFailed && (lang === 'ar' ? 'تعذر إتمام عملية الدفع' : 'Payment Unsuccessful')}
            </h1>

            {/* Description / Instructions */}
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: '1.6' }}>
              {isPaid &&
                (lang === 'ar'
                  ? 'تم تأكيد طلبك وسداد القيمة بنجاح، ويجري الآن تجهيز الشحنة من المخزن للتوصيل.'
                  : 'Your order has been confirmed successfully and is being prepared by our warehouse team.')}

              {isPending &&
                (lang === 'ar'
                  ? 'تم تسجيل طلبك بنجاح. إذا قمت بإصدار كود فوري/أمان/كاش، يرجى إتمام السداد بالرقم المرجعي. سيتم تحديث حالة الطلب أوتوماتيكياً فور دفع الكود.'
                  : 'Your order has been received. If a payment reference code (Fawry/Cash) was issued, please complete payment. Your order status will update automatically upon payment.')}

              {isFailed &&
                (lang === 'ar'
                  ? 'لم تتم عملية الدفع أو تم إلغاؤها. يمكنك إعادة المحاولة الآن أو التواصل مع فريق الدعم.'
                  : 'Payment attempt was not completed or was canceled. You may retry payment now.')}
            </p>

            {/* Order Quick Summary Card */}
            <div
              style={{
                backgroundColor: 'var(--bg-sidebar)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
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
                    Order Number / رقم الطلب
                  </span>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary)' }}>
                    {order?.id || orderId}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
                    Total Amount / الإجمالي
                  </span>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: '800', color: 'var(--heading)' }}>
                    {totalAmount}
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', fontSize: '0.875rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Customer Name:</span>
                  <strong style={{ color: 'var(--heading)' }}>{customerName}</strong>
                </div>

                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Phone:</span>
                  <strong style={{ color: 'var(--heading)' }}>{customerPhone}</strong>
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>Delivery Address:</span>
                  <strong style={{ color: 'var(--heading)' }}>{addressFormatted}</strong>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to={`/order/${order?.id || orderId}`} className="btn btn-primary btn-lg">
                <Package size={18} />
                <span>{lang === 'ar' ? 'عرض تفاصيل وتتبع الطلب' : 'View Order Details & Tracking'}</span>
                <ArrowRight size={18} />
              </Link>

              {isFailed && (
                <Link to="/checkout" className="btn btn-warning btn-lg">
                  <RefreshCw size={18} />
                  <span>{lang === 'ar' ? 'إعادة محاولة الدفع' : 'Retry Payment'}</span>
                </Link>
              )}

              <Link to="/spare-parts" className="btn btn-outline btn-lg">
                <ShoppingBag size={18} />
                <span>{lang === 'ar' ? 'متابعة التسوق' : 'Continue Shopping'}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
