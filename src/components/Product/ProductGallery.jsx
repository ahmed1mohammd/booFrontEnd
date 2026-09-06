import React, { useState } from 'react';

export default function ProductGallery({ images = [], productName = 'Product' }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const displayImages = images.length > 0 ? images : [
    'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=900&q=80'
  ];

  return (
    <div className="boo-pdp-gallery">
      {/* Main Image View */}
      <div className="boo-pdp-main-img-box">
        <img
          src={displayImages[selectedIndex]}
          alt={`${productName} view ${selectedIndex + 1}`}
          className="boo-pdp-main-img"
        />
      </div>

      {/* Thumbnail Bar */}
      {displayImages.length > 1 && (
        <div className="boo-pdp-thumbs">
          {displayImages.map((imgUrl, idx) => (
            <button
              key={idx}
              type="button"
              className={`boo-pdp-thumb-btn ${idx === selectedIndex ? 'is-active' : ''}`}
              onClick={() => setSelectedIndex(idx)}
              aria-label={`Select image ${idx + 1}`}
            >
              <img src={imgUrl} alt={`${productName} thumbnail ${idx + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
