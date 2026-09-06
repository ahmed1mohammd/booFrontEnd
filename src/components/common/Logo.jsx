import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_CONFIG } from '../../data/homeData';

/**
 * Centralized Logo Component
 * Enforces brand identity rules:
 * - Uses exact official logo: https://i.ibb.co/JjhvXRfD/IMG-20260906-WA0161.jpg
 * - Never distorts proportions
 * - Does not alter colors or styling
 */
export default function Logo({ size = 'md', className = '', linkable = true }) {
  // Height presets maintaining exact natural aspect ratio
  const heightStyles = {
    sm: { height: '36px' },
    navbar: { height: '48px' },
    md: { height: '54px' },
    lg: { height: '72px' },
    footer: { height: '56px' }
  };

  const currentHeight = heightStyles[size] || heightStyles.md;

  const imageElement = (
    <div
      className={`boo-logo-container ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        lineHeight: 0
      }}
    >
      <img
        src={BRAND_CONFIG.logoUrl}
        alt={`${BRAND_CONFIG.name} Official Logo`}
        style={{
          ...currentHeight,
          width: 'auto',
          objectFit: 'contain',
          borderRadius: '4px',
          display: 'block'
        }}
        loading="eager"
      />
    </div>
  );

  if (linkable) {
    return (
      <Link to="/" aria-label={`${BRAND_CONFIG.name} Home`}>
        {imageElement}
      </Link>
    );
  }

  return imageElement;
}
