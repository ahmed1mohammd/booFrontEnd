import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Pause, Play, Sparkles } from 'lucide-react';
import { HERO_SLIDES } from '../../data/homeData';
import { useLanguage } from '../../context/LanguageContext';
import './HeroCarousel.css';

export default function HeroCarousel({ slides = HERO_SLIDES }) {
  const { lang, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPausedByUser, setIsPausedByUser] = useState(false);
  const totalSlides = slides.length;

  // Touch tracking for mobile swipe
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);
  const carouselContainerRef = useRef(null);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Autoplay timer with pause on hover/interaction
  useEffect(() => {
    if (!isPlaying || isPausedByUser) return;

    const interval = setInterval(() => {
      goToNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [goToNext, isPlaying, isPausedByUser]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        return;
      }
      if (e.key === 'ArrowRight') {
        lang === 'ar' ? goToPrev() : goToNext();
      } else if (e.key === 'ArrowLeft') {
        lang === 'ar' ? goToNext() : goToPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev, lang]);

  // Mobile Touch Handlers
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartXRef.current - touchEndXRef.current;
    const threshold = 50; // min swipe distance in px

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swiped Left
        lang === 'ar' ? goToPrev() : goToNext();
      } else {
        // Swiped Right
        lang === 'ar' ? goToNext() : goToPrev();
      }
    }
  };

  const currentSlide = slides[currentIndex];

  return (
    <section
      className="boo-hero-carousel"
      ref={carouselContainerRef}
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => !isPausedByUser && setIsPlaying(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Automotive Services Carousel"
    >
      {/* Background Slides with subtle smooth crossfade */}
      <div className="boo-hero-slides-wrapper">
        {slides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.id}
              className={`boo-hero-slide ${isActive ? 'is-active' : ''}`}
              aria-hidden={!isActive}
            >
              <div
                className="boo-hero-image-bg"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className="boo-hero-overlay" />
            </div>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="container boo-hero-content-container">
        <div className="boo-hero-caption">
          {/* Service Badge */}
          <div className="boo-hero-badge">
            <Sparkles size={14} />
            <span>{currentSlide.badge}</span>
          </div>

          {/* Heading */}
          <h1 className="boo-hero-title">
            {currentSlide.title}
          </h1>

          {/* Description */}
          <p className="boo-hero-desc">
            {currentSlide.description}
          </p>

          {/* CTAs */}
          <div className="boo-hero-buttons">
            <Link to={currentSlide.ctaLink} className="btn btn-primary btn-lg">
              <span>{currentSlide.ctaText}</span>
              <ArrowRight size={18} />
            </Link>
            {currentSlide.secondaryCtaText && (
              <Link to={currentSlide.secondaryCtaLink} className="btn btn-outline-white btn-lg">
                <span>{currentSlide.secondaryCtaText}</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Carousel Controls: Slide Counter, Prev/Next Arrows, Pagination, Play/Pause */}
      <div className="container boo-hero-controls-bar">
        <div className="boo-hero-controls-left">
          {/* Slide Counter (e.g. 01 / 04) */}
          <div className="boo-hero-counter" aria-live="polite">
            <span className="counter-current">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span className="counter-divider">/</span>
            <span className="counter-total">
              {String(totalSlides).padStart(2, '0')}
            </span>
          </div>

          {/* Pagination Indicators */}
          <div className="boo-hero-dots" role="tablist" aria-label="Slide Selector">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                role="tab"
                aria-selected={idx === currentIndex}
                aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                className={`boo-hero-dot ${idx === currentIndex ? 'is-active' : ''}`}
                onClick={() => goToSlide(idx)}
              >
                <span className="dot-fill" />
              </button>
            ))}
          </div>
        </div>

        <div className="boo-hero-controls-right">
          {/* Play / Pause Toggle */}
          <button
            type="button"
            className="boo-hero-control-btn"
            onClick={() => {
              setIsPausedByUser(!isPausedByUser);
              setIsPlaying(!isPlaying);
            }}
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying && !isPausedByUser ? <Pause size={16} /> : <Play size={16} />}
          </button>

          {/* Prev Arrow */}
          <button
            type="button"
            className="boo-hero-nav-arrow"
            onClick={goToPrev}
            aria-label="Previous Slide"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Next Arrow */}
          <button
            type="button"
            className="boo-hero-nav-arrow"
            onClick={goToNext}
            aria-label="Next Slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
