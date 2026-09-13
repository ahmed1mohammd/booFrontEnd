import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Search, Globe, Menu, X, ArrowRight, PhoneCall, ShoppingBag } from 'lucide-react';
import Logo from '../common/Logo';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

export default function Navbar({ onOpenSearch }) {
  const { t, lang, toggleLang } = useLanguage();
  const { cartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll listener for sticky navbar background transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent background scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.spareParts, path: '/spare-parts' },
    { name: t.nav.accessories, path: '/accessories' },
    { name: t.nav.maintenance, path: '/maintenance' },
    { name: t.nav.about, path: '/about' },
    { name: t.nav.contact, path: '/contact' }
  ];

  return (
    <header className={`boo-navbar-wrapper ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container boo-navbar-container">
        {/* Brand Official Logo */}
        <div className="boo-navbar-brand">
          <Logo size="navbar" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="boo-navbar-menu" aria-label="Main Navigation">
          <ul className="boo-nav-list">
            {navLinks.map((link) => (
              <li key={link.path} className="boo-nav-item">
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `boo-nav-link ${isActive ? 'is-active' : ''}`
                  }
                  end={link.path === '/'}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Side Actions: Search, Cart, Language Switcher, CTA */}
        <div className="boo-navbar-actions">
          {/* Quick Search Button */}
          <button
            type="button"
            className="boo-action-icon-btn"
            onClick={onOpenSearch}
            title={t.nav.searchPlaceholder}
            aria-label="Search"
          >
            <Search size={19} />
          </button>

          {/* Cart Icon Link with Count Badge */}
          <Link
            to="/cart"
            className="boo-action-icon-btn"
            title="Shopping Cart"
            aria-label={`Shopping Cart with ${cartCount} items`}
            style={{ position: 'relative' }}
          >
            <ShoppingBag size={19} />
            {cartCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  backgroundColor: 'var(--secondary)',
                  color: '#FFFFFF',
                  fontSize: '0.7rem',
                  fontWeight: '800',
                  borderRadius: '9999px',
                  minWidth: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 4px',
                  lineHeight: 1,
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }}
              >
                {cartCount}
              </span>
            )}
          </Link>

          {/* Language Switcher */}
          <button
            type="button"
            className="boo-lang-switcher"
            onClick={toggleLang}
            title="Switch Language"
            aria-label="Toggle language between English and Arabic"
          >
            <Globe size={16} />
            <span className="lang-label">{lang === 'en' ? 'العربية' : 'EN'}</span>
          </button>

          {/* Contact Us CTA Button (Desktop) */}
          <Link to="/contact" className="btn btn-primary btn-sm boo-navbar-cta desktop-only-btn">
            <span>{t.nav.contactUsCTA}</span>
            <ArrowRight size={15} />
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            className="boo-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`boo-mobile-drawer ${mobileMenuOpen ? 'is-open' : ''}`}>
        <div className="boo-mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)} />
        <div className="boo-mobile-drawer-content">
          <div className="boo-mobile-drawer-header">
            <Logo size="sm" linkable={false} />
            <button
              type="button"
              className="boo-mobile-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="boo-mobile-nav">
            <ul className="boo-mobile-list">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `boo-mobile-link ${isActive ? 'is-active' : ''}`
                    }
                    end={link.path === '/'}
                  >
                    <span>{link.name}</span>
                    <ArrowRight size={16} className="arrow" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="boo-mobile-footer">
            <Link to="/contact" className="btn btn-primary btn-lg boo-mobile-cta">
              <PhoneCall size={18} />
              <span>{t.nav.contactUsCTA}</span>
            </Link>

            <div className="boo-mobile-lang-row">
              <span>{lang === 'en' ? 'Language / اللغة:' : 'اللغة / Language:'}</span>
              <button
                type="button"
                className="boo-lang-switcher"
                onClick={toggleLang}
              >
                <Globe size={16} />
                <span>{lang === 'en' ? 'العربية (AR)' : 'English (EN)'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
