import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorState({
  title = 'Unable to load information',
  message = 'An unexpected error occurred while communicating with the service.',
  onRetry
}) {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '4rem 1.5rem',
        backgroundColor: '#fff5f5',
        border: '1px solid #fed7d7',
        borderRadius: 'var(--radius-md)',
        maxWidth: '560px',
        margin: '0 auto'
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: '#fed7d7',
          color: '#e53e3e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem auto'
        }}
      >
        <AlertCircle size={32} />
      </div>

      <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', color: '#9b2c2c' }}>
        {title}
      </h3>

      <p style={{ color: '#742a2a', marginBottom: '1.75rem', fontSize: '0.95rem' }}>
        {message}
      </p>

      {onRetry && (
        <button
          type="button"
          className="btn btn-primary"
          onClick={onRetry}
        >
          <RefreshCw size={16} />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}
