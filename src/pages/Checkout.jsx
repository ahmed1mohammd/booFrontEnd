import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  CreditCard,
  Lock,
  ArrowRight,
  AlertCircle,
  Truck,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { EGYPTIAN_GOVERNORATES } from '../data/sparePartsProducts';
import { ordersApi } from '../api/ordersApi';
import EmptyState from '../components/common/EmptyState';
import { useLanguage } from '../context/LanguageContext';

export default function Checkout() {
  const { cartItems, subtotal, shipping, total, clearCart } = useCart();
  const { lang } = useLanguage();
  const navigate = useNavigate();

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [governorate, setGovernorate] = useState('Cairo (القاهرة)');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');

  // Validation Errors
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

  if (cartItems.length === 0) {
    return (
      <div className="section" style={{ minHeight: '65vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <EmptyState
            title="Your cart is empty"
            description="You need to add products to your cart before proceeding to checkout."
            actionText="Browse Spare Parts"
            actionLink="/spare-parts"
          />
        </div>
      </div>
    );
  }

  // Egyptian Phone Validator (010, 011, 012, 015 + 8 digits)
  const validateEgyptianPhone = (num) => {
    const cleaned = num.replace(/\s+/g, '').replace(/[-+]/g, '');
    const egRegex = /^(010|011|012|015)[0-9]{8}$/;
    const egWithCode = /^201[0125][0-9]{8}$/;
    return egRegex.test(cleaned) || egWithCode.test(cleaned);
  };

  const validateEmail = (val) => {
    if (!val || val.trim() === '') return true; // Optional
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = 'Please enter your full name (at least 3 characters).';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!validateEgyptianPhone(phone.trim())) {
      newErrors.phone = 'Please enter a valid Egyptian mobile number (e.g. 011xxxxxxxx, 010xxxxxxxx).';
    }

    if (email.trim() && !validateEmail(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!governorate) {
      newErrors.governorate = 'Please select a governorate.';
    }

    if (!city.trim()) {
      newErrors.city = 'City / District is required.';
    }

    if (!address.trim()) {
      newErrors.address = 'Detailed delivery address is required.';
    } else if (address.trim().length < 8) {
      newErrors.address = 'Please provide a complete street and building address.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);

      const orderPayload = {
        customer: {
          name: fullName,
          phone,
          email: email || null
        },
        shippingAddress: {
          governorate,
          city,
          address
        },
        items: cartItems
      };

      // 1. Send checkout data to backend
      const result = await ordersApi.createOrder(orderPayload);

      if (result.success && result.paymentUrl) {
        // Clear cart now that order is securely logged
        clearCart();

        // 2. Redirect to payment URL returned by the backend (Fawaterk secure flow)
        if (result.paymentUrl.startsWith('http')) {
          window.location.href = result.paymentUrl;
        } else {
          navigate(result.paymentUrl);
        }
      } else {
        throw new Error('Could not initiate payment session.');
      }
    } catch (err) {
      setApiError(err.message || 'Unable to process checkout. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="boo-checkout-page">
      {/* Header */}
      <div style={{ backgroundColor: 'var(--bg-dark)', color: '#FFFFFF', padding: '3.5rem 0 3rem 0' }}>
        <div className="container">
          <h1 style={{ color: '#FFFFFF', marginBottom: '0.5rem' }}>Checkout & Delivery</h1>
          <p style={{ color: '#c4d7e8', margin: 0 }}>
            Enter your delivery information. Payment will be handled via Fawaterk secure gateway.
          </p>
        </div>
      </div>

      <div className="section" style={{ backgroundColor: 'var(--bg-main)', paddingTop: '2.5rem' }}>
        <div className="container">
          {apiError && (
            <div
              style={{
                backgroundColor: '#fee2e2',
                border: '1px solid #ef4444',
                color: '#991b1b',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}
            >
              <AlertCircle size={20} />
              <span>{apiError}</span>
            </div>
          )}

          <form onSubmit={handleCheckoutSubmit} noValidate>
            <div className="boo-checkout-layout">
              {/* Left Column: Customer Information & Delivery Address */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '2.25rem',
                  boxShadow: 'var(--shadow-xs)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.75rem' }}>
                  <Truck size={22} color="var(--primary)" />
                  <h2 style={{ fontSize: '1.4rem', margin: 0 }}>Customer & Delivery Information</h2>
                </div>

                {/* Full Name */}
                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                  <label htmlFor="fullName">Full Name (الاسم بالكامل) *</label>
                  <input
                    id="fullName"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Ahmed Mahmoud"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({ ...errors, fullName: null });
                    }}
                    style={{ borderColor: errors.fullName ? '#ef4444' : 'var(--border)' }}
                    required
                  />
                  {errors.fullName && <div className="boo-form-error">{errors.fullName}</div>}
                </div>

                {/* Phone & Email Row */}
                <div className="grid-2" style={{ marginBottom: '1.25rem' }}>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number (رقم الهاتف) *</label>
                    <input
                      id="phone"
                      type="tel"
                      className="form-input"
                      placeholder="011xxxxxxxx / 010xxxxxxxx"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors({ ...errors, phone: null });
                      }}
                      style={{ borderColor: errors.phone ? '#ef4444' : 'var(--border)' }}
                      required
                    />
                    {errors.phone && <div className="boo-form-error">{errors.phone}</div>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address (البريد الإلكتروني - اختياري)</label>
                    <input
                      id="email"
                      type="email"
                      className="form-input"
                      placeholder="name@example.com (Optional)"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: null });
                      }}
                      style={{ borderColor: errors.email ? '#ef4444' : 'var(--border)' }}
                    />
                    {errors.email && <div className="boo-form-error">{errors.email}</div>}
                  </div>
                </div>

                {/* Governorate & City Row */}
                <div className="grid-2" style={{ marginBottom: '1.25rem' }}>
                  <div className="form-group">
                    <label htmlFor="governorate">Governorate (المحافظة) *</label>
                    <select
                      id="governorate"
                      className="form-select"
                      value={governorate}
                      onChange={(e) => {
                        setGovernorate(e.target.value);
                        if (errors.governorate) setErrors({ ...errors, governorate: null });
                      }}
                      style={{ borderColor: errors.governorate ? '#ef4444' : 'var(--border)' }}
                      required
                    >
                      {EGYPTIAN_GOVERNORATES.map((gov) => (
                        <option key={gov} value={gov}>
                          {gov}
                        </option>
                      ))}
                    </select>
                    {errors.governorate && <div className="boo-form-error">{errors.governorate}</div>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="city">City / District (المدينة / الحي) *</label>
                    <input
                      id="city"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Shebin El-Kom / Nasr City"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        if (errors.city) setErrors({ ...errors, city: null });
                      }}
                      style={{ borderColor: errors.city ? '#ef4444' : 'var(--border)' }}
                      required
                    />
                    {errors.city && <div className="boo-form-error">{errors.city}</div>}
                  </div>
                </div>

                {/* Detailed Address */}
                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                  <label htmlFor="address">Detailed Address (العنوان بالتفصيل) *</label>
                  <textarea
                    id="address"
                    rows={3}
                    className="form-textarea"
                    placeholder="Street name, building number, floor, apartment number, prominent landmark..."
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      if (errors.address) setErrors({ ...errors, address: null });
                    }}
                    style={{ borderColor: errors.address ? '#ef4444' : 'var(--border)' }}
                    required
                  />
                  {errors.address && <div className="boo-form-error">{errors.address}</div>}
                </div>

                {/* Payment Gateway Notice */}
                <div
                  style={{
                    backgroundColor: 'var(--bg-sidebar)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '1.15rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.85rem'
                  }}
                >
                  <Lock size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                    <strong>Fawaterk Secure Payment:</strong> Next step will redirect you to Fawaterk's certified PCI-DSS payment gateway (Credit Cards, Meeza, Fawry, Vodafone Cash).
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary & Action */}
              <div className="boo-summary-box">
                <h3 className="boo-summary-title">Your Order</h3>

                {/* Products List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem', maxHeight: '240px', overflowY: 'auto' }}>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.875rem',
                        gap: '0.75rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: '42px', height: '42px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--border)' }}
                        />
                        <div>
                          <div style={{ fontWeight: '700', color: 'var(--heading)' }}>
                            {item.name}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            Qty: {item.quantity} × {item.price?.toLocaleString()} EGP
                          </div>
                        </div>
                      </div>

                      <div style={{ fontWeight: '700', fontFamily: 'var(--font-heading)', color: 'var(--heading)' }}>
                        {(item.price * item.quantity).toLocaleString()} EGP
                      </div>
                    </div>
                  ))}
                </div>

                {/* Calculation Rows */}
                <div className="boo-summary-row">
                  <span>Subtotal</span>
                  <strong>{subtotal.toLocaleString()} EGP</strong>
                </div>

                <div className="boo-summary-row">
                  <span>Shipping</span>
                  <strong>{shipping.toLocaleString()} EGP</strong>
                </div>

                <div className="boo-summary-row total-row">
                  <span>Total</span>
                  <span style={{ color: 'var(--primary)' }}>{total.toLocaleString()} EGP</span>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', marginTop: '1.5rem' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Connecting to Gateway...</span>
                    </>
                  ) : (
                    <>
                      <span>Continue to Payment</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

                <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                  🔒 256-bit Encrypted Checkout
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
