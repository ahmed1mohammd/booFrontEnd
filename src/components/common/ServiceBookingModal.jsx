import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, Phone, Clock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import './Modals.css';

export default function ServiceBookingModal({ service, isOpen, onClose }) {
  const { lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    carModel: '',
    serviceType: service ? service.title : 'Periodic Maintenance',
    preferredDate: '',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="boo-modal-overlay" onClick={onClose}>
      <div className="boo-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="boo-modal-header">
          <h3 className="boo-modal-title">
            {lang === 'ar' ? 'حجز موعد صيانة' : 'Book a Maintenance Service'}
          </h3>
          <button className="boo-modal-close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="boo-modal-body">
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
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
              <h4 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', color: 'var(--heading)' }}>
                {lang === 'ar' ? 'تم استلام طلب الحجز بنجاح!' : 'Booking Request Received!'}
              </h4>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                {lang === 'ar'
                  ? `شكراً ${formData.name}. سيتواصل معك مهندس الصيانة في BOO لتأكيد الموعد.`
                  : `Thank you ${formData.name}. A BOO service advisor will call you shortly on ${formData.phone} to confirm your appointment.`}
              </p>
              <button type="button" className="btn btn-primary" onClick={handleReset}>
                {lang === 'ar' ? 'إغلاق' : 'Done'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="booking-form">
              <div className="form-group">
                <label>{lang === 'ar' ? 'الاسم بالكامل *' : 'Full Name *'}</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder={lang === 'ar' ? 'أدخل اسمك' : 'e.g. Ahmed Hassan'}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>{lang === 'ar' ? 'رقم الهاتف (واتساب) *' : 'Phone / Mobile Number *'}</label>
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
                <label>{lang === 'ar' ? 'ماركة وموديل السيارة *' : 'Car Make & Model *'}</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder={lang === 'ar' ? 'مثال: Mercedes C180 2022' : 'e.g. BMW 320i 2021'}
                  value={formData.carModel}
                  onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>{lang === 'ar' ? 'نوع الخدمة المطلوبة' : 'Service Type'}</label>
                <select
                  className="form-select"
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                >
                  <option value="Periodic Maintenance">Periodic Maintenance</option>
                  <option value="Engine Service">Engine Service</option>
                  <option value="Brake Service">Brake Service</option>
                  <option value="Electrical Diagnostics">Electrical Diagnostics</option>
                  <option value="AC Service">AC Service</option>
                  <option value="General Repair">General Repair</option>
                </select>
              </div>

              <div className="form-group">
                <label>{lang === 'ar' ? 'تاريخ الموعد المفضل' : 'Preferred Date'}</label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: '0.75rem' }}>
                <Calendar size={18} />
                <span>{lang === 'ar' ? 'تأكيد إرسال الطلب' : 'Confirm Service Request'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
