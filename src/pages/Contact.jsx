import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { BRAND_CONFIG } from '../data/homeData';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { lang, t } = useLanguage();
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') === 'import' ? 'Car Import' : 'General Inquiry';

  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: initialType,
    message: ''
  });

  const { address, addressUrl, phones, workingHours, socials } = BRAND_CONFIG.contact;

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="boo-contact-page">
      {/* Page Header */}
      <div style={{ backgroundColor: 'var(--bg-dark)', color: '#FFFFFF', padding: '4rem 0 3.5rem 0' }}>
        <div className="container">
          <span className="section-badge" style={{ backgroundColor: 'rgba(0,174,239,0.2)', color: '#FFFFFF' }}>
            <Sparkles size={13} />
            {lang === 'ar' ? 'تواصل معنا' : 'Get in Touch'}
          </span>
          <h1 style={{ color: '#FFFFFF', marginBottom: '0.75rem' }}>
            {lang === 'ar' ? 'نحن هنا لمساعدتك في كل ما يخص سيارتك' : 'Contact BOO Automotive'}
          </h1>
          <p style={{ color: '#c2d8eb', maxWidth: '650px', margin: 0, fontSize: '1.05rem' }}>
            {lang === 'ar'
              ? 'تفضل بزيارة معرضنا ومركز الصيانة في شبين الكوم أو تواصل معنا هاتفياً وعبر واتساب.'
              : 'Visit our showroom and service facility in Shebin El-Kom, or connect with our customer advisors directly.'}
          </p>
        </div>
      </div>

      <div className="section" style={{ backgroundColor: 'var(--bg-main)' }}>
        <div className="container">
          <div className="grid-2" style={{ gap: '3.5rem', alignItems: 'flex-start' }}>
            {/* Left: Contact Info Cards */}
            <div>
              <span className="section-badge badge-green">Direct Channels</span>
              <h2 style={{ marginBottom: '1.5rem' }}>Visit or Reach Out to Us</h2>

              {/* Physical Location Card */}
              <div
                style={{
                  backgroundColor: 'var(--bg-sidebar)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-start'
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    backgroundColor: 'var(--primary-light)',
                    color: 'var(--primary)',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 style={{ marginBottom: '0.35rem' }}>Headquarters & Service Center</h4>
                  <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-main)', fontWeight: '600' }}>
                    {address}
                  </p>
                  <a
                    href={addressUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.875rem' }}
                  >
                    Open in Google Maps &rarr;
                  </a>
                </div>
              </div>

              {/* Phones Card */}
              <div
                style={{
                  backgroundColor: 'var(--bg-sidebar)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                  marginBottom: '1.5rem'
                }}
              >
                <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Phone size={18} color="var(--primary)" />
                  <span>Official Direct Lines</span>
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {phones.map((p, idx) => (
                    <a
                      key={idx}
                      href={`tel:${p.raw}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.75rem 1rem',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-sm)',
                        fontWeight: '700',
                        color: 'var(--text-main)'
                      }}
                    >
                      <span style={{ fontSize: '1.05rem', color: 'var(--heading)' }}>{p.display}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>Call Now &rarr;</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* WhatsApp Fast Channel */}
              <div
                style={{
                  backgroundColor: 'var(--secondary-light)',
                  border: '1px solid rgba(126, 194, 75, 0.4)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}
              >
                <div>
                  <h4 style={{ color: 'var(--hover-green)', marginBottom: '0.25rem' }}>Fast WhatsApp Support</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-main)' }}>Chat with customer service directly.</p>
                </div>
                <a
                  href={socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                >
                  <MessageCircle size={16} />
                  <span>Start Chat</span>
                </a>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '2.5rem',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <h3 style={{ fontSize: '1.65rem', marginBottom: '0.5rem' }}>Send Us a Message</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>
                Fill in your details and our team will get back to you within 24 hours.
              </p>

              {formSent ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--secondary-light)',
                      color: 'var(--hover-green)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.25rem auto'
                    }}
                  >
                    <CheckCircle2 size={36} />
                  </div>
                  <h4>Message Sent Successfully!</h4>
                  <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    Thank you, {formData.name}. Our automotive representative will contact you on {formData.phone} shortly.
                  </p>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setFormSent(false)}
                    style={{ marginTop: '1.5rem' }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="booking-form">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      placeholder="e.g. Mahmoud Ali"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number (WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      className="form-input"
                      placeholder="011xxxxxxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Inquiry Subject *</label>
                    <select
                      className="form-select"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Car Import">Car Import Consultation</option>
                      <option value="Car Purchase">Car Purchase / Showroom</option>
                      <option value="Spare Parts">Spare Parts Order</option>
                      <option value="Maintenance">Maintenance & Service</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Message *</label>
                    <textarea
                      rows={4}
                      required
                      className="form-textarea"
                      placeholder="Please let us know how we can help you..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: '0.75rem' }}>
                    <Send size={18} />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
