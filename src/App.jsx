import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import TopContactBar from './components/Header/TopContactBar';
import Navbar from './components/Header/Navbar';
import Footer from './components/Footer/Footer';
import SearchModal from './components/common/SearchModal';
import ServiceBookingModal from './components/common/ServiceBookingModal';
import QuickCartToast from './components/Cart/QuickCartToast';

// Pages
import Home from './pages/Home';
import AccessoriesPage from './pages/Accessories';
import SparePartsPage from './pages/SpareParts';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
import OrderDetails from './pages/OrderDetails';
import MaintenancePage from './pages/Maintenance';
import AboutPage from './pages/About';
import Contact from './pages/Contact';

// Contexts & Styles
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import './styles/global.css';
import './styles/responsive.css';
import './styles/ecommerce.css';

// Component to scroll to top on route changes
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
}

function MainApp() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [bookingService, setBookingService] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  const handleOpenBooking = (service) => {
    setBookingService(service);
    setBookingOpen(true);
  };

  return (
    <div className="boo-app-layout">
      <ScrollToTop />

      {/* 1. TOP CONTACT BAR (Slim information layer) */}
      <TopContactBar />

      {/* 2. MAIN NAVBAR (Sticky navigation layer) */}
      <Navbar onOpenSearch={() => setSearchOpen(true)} />

      {/* Page Routing */}
      <main className="boo-main-content">
        <Routes>
          {/* Main Website Routes */}
          <Route
            path="/"
            element={<Home onOpenBooking={handleOpenBooking} />}
          />

          {/* Accessories */}
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/accessories/:id" element={<ProductDetails />} />

          {/* E-Commerce Spare Parts Routes */}
          <Route path="/spare-parts" element={<SparePartsPage />} />
          <Route path="/spare-parts/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/failed" element={<PaymentFailed />} />
          <Route path="/order/:id" element={<OrderDetails />} />

          {/* General Service & Info Routes */}
          <Route
            path="/maintenance"
            element={<MaintenancePage onOpenBooking={handleOpenBooking} />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<Contact />} />

          {/* Fallback */}
          <Route
            path="*"
            element={<Home onOpenBooking={handleOpenBooking} />}
          />
        </Routes>
      </main>

      {/* 3. GLOBAL FOOTER */}
      <Footer />

      {/* Floating Cart Toast Feedback */}
      <QuickCartToast />

      {/* Shared Interactive Modals */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      <ServiceBookingModal
        service={bookingService}
        isOpen={bookingOpen}
        onClose={() => {
          setBookingOpen(false);
          setBookingService(null);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <Router>
          <MainApp />
        </Router>
      </CartProvider>
    </LanguageProvider>
  );
}
