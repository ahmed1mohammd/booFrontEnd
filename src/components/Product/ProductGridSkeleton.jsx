import React from 'react';

export default function ProductGridSkeleton({ count = 6 }) {
  return (
    <div className="grid-3" style={{ width: '100%' }}>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="boo-ecom-card"
          style={{ padding: '0', pointerEvents: 'none' }}
        >
          <div className="skeleton-box" style={{ height: '210px', width: '100%' }} />
          <div style={{ padding: '1.35rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className="skeleton-box" style={{ height: '14px', width: '80px' }} />
              <div className="skeleton-box" style={{ height: '14px', width: '60px' }} />
            </div>
            <div className="skeleton-box" style={{ height: '20px', width: '85%' }} />
            <div className="skeleton-box" style={{ height: '14px', width: '60%' }} />
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="skeleton-box" style={{ height: '24px', width: '100px' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginTop: '0.5rem' }}>
              <div className="skeleton-box" style={{ height: '36px', width: '100%' }} />
              <div className="skeleton-box" style={{ height: '36px', width: '100%' }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
