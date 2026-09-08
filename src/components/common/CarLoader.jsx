import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './CarLoader.css';

export default function CarLoader({ text, subtext }) {
  const { lang } = useLanguage();

  const defaultText = lang === 'ar' ? 'جاري تحميل قطع الغيار' : 'Loading Spare Parts';
  const defaultSub = lang === 'ar' ? 'فحص المخزون والأسعار المحدثة...' : 'Connecting to live inventory...';

  return (
    <div className="boo-car-loader-container" role="status" aria-live="polite">
      <div className="boo-car-scene">
        {/* Animated Sports Car */}
        <div className="boo-car-vehicle">
          {/* Headlight Beam */}
          <div className="boo-car-beam" />

          {/* Exhaust Smoke */}
          <div className="boo-car-exhaust">
            <span className="smoke-puff" />
            <span className="smoke-puff" />
            <span className="smoke-puff" />
          </div>

          <svg
            viewBox="0 0 140 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', height: '100%', display: 'block' }}
          >
            {/* Aerodynamic Car Body */}
            <path
              d="M10 40 L18 26 Q24 16 38 14 L80 14 Q94 14 104 22 L124 30 Q134 34 136 42 L136 46 Q136 48 132 48 L122 48 Q120 40 110 40 Q100 40 98 48 L46 48 Q44 40 34 40 Q24 40 22 48 L10 48 Q6 48 6 44 L6 42 Q6 40 10 40 Z"
              fill="url(#carBodyGradient)"
              stroke="#00AEEF"
              strokeWidth="1.5"
            />

            {/* Sporty Cabin Windows */}
            <path
              d="M38 17 L78 17 Q86 17 92 23 L104 31 L32 31 Q30 23 38 17 Z"
              fill="url(#glassGradient)"
              stroke="rgba(0,174,239,0.4)"
              strokeWidth="1"
            />

            {/* Window Pillar Divider */}
            <line x1="68" y1="17" x2="68" y2="31" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />

            {/* Cyan Speed Line on Chassis */}
            <path d="M18 36 L128 36" stroke="#7EC24B" strokeWidth="2" strokeLinecap="round" />

            {/* Headlight & Taillight */}
            <circle cx="132" cy="38" r="3" fill="#00AEEF" filter="drop-shadow(0 0 4px #00AEEF)" />
            <rect x="8" y="36" width="3" height="6" rx="1.5" fill="#EF4444" />

            {/* Front Wheel */}
            <g transform="translate(110, 48)">
              <circle cx="0" cy="0" r="10" fill="#1C3D5A" stroke="#00AEEF" strokeWidth="2" />
              <g className="boo-car-wheel">
                <circle cx="0" cy="0" r="5" fill="#FFFFFF" />
                <line x1="-8" y1="0" x2="8" y2="0" stroke="#00AEEF" strokeWidth="1.5" />
                <line x1="0" y1="-8" x2="0" y2="8" stroke="#00AEEF" strokeWidth="1.5" />
              </g>
            </g>

            {/* Rear Wheel */}
            <g transform="translate(34, 48)">
              <circle cx="0" cy="0" r="10" fill="#1C3D5A" stroke="#00AEEF" strokeWidth="2" />
              <g className="boo-car-wheel">
                <circle cx="0" cy="0" r="5" fill="#FFFFFF" />
                <line x1="-8" y1="0" x2="8" y2="0" stroke="#00AEEF" strokeWidth="1.5" />
                <line x1="0" y1="-8" x2="0" y2="8" stroke="#00AEEF" strokeWidth="1.5" />
              </g>
            </g>

            {/* Gradients */}
            <defs>
              <linearGradient id="carBodyGradient" x1="0" y1="0" x2="140" y2="60" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1C3D5A" />
                <stop offset="50%" stopColor="#12283C" />
                <stop offset="100%" stopColor="#0B1A28" />
              </linearGradient>
              <linearGradient id="glassGradient" x1="30" y1="17" x2="105" y2="31" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(0, 174, 239, 0.45)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.75)" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Speed Track / Road */}
        <div className="boo-car-road">
          <div className="boo-car-road-stripes" />
        </div>
      </div>

      {/* Loading Title & Pulsating Dots */}
      <div className="boo-car-loader-text">
        <span>{text || defaultText}</span>
        <span className="loading-dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </div>

      <div className="boo-car-loader-sub">
        {subtext || defaultSub}
      </div>
    </div>
  );
}
