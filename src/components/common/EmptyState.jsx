import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function EmptyState({
  title = 'Your cart is empty',
  description = 'Looks like you have not added any spare parts to your cart yet.',
  actionText = 'Browse Spare Parts',
  actionLink = '/spare-parts',
  icon: Icon = ShoppingBag
}) {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '5rem 1.5rem',
        backgroundColor: 'var(--bg-sidebar)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        maxWidth: '600px',
        margin: '0 auto'
      }}
    >
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: 'var(--bg-alt)',
          color: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem auto'
        }}
      >
        <Icon size={36} />
      </div>

      <h3 style={{ fontSize: '1.5rem', marginBottom: '0.65rem', color: 'var(--heading)' }}>
        {title}
      </h3>

      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1rem', lineHeight: '1.6' }}>
        {description}
      </p>

      {actionLink && (
        <Link to={actionLink} className="btn btn-primary btn-lg">
          <span>{actionText}</span>
          <ArrowRight size={18} />
        </Link>
      )}
    </div>
  );
}
