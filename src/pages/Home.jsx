import React from 'react';
import HeroCarousel from '../components/Hero/HeroCarousel';
import ServicesSection from '../components/Services/ServicesSection';
import AboutSection from '../components/About/AboutSection';
import FeaturedCars from '../components/Cars/FeaturedCars';
import MaintenanceSection from '../components/Maintenance/MaintenanceSection';
import WhyBOO from '../components/WhyBOO/WhyBOO';
import CTASection from '../components/CTA/CTASection';

export default function Home({ onSelectCar, onOpenBooking }) {
  return (
    <div className="boo-home-page">
      {/* 1. Hero Carousel */}
      <HeroCarousel />

      {/* 2. Services */}
      <ServicesSection />

      {/* 3. About BOO */}
      <AboutSection />

      {/* 4. Featured Cars */}
      <FeaturedCars onSelectCar={onSelectCar} />

      {/* 5. Maintenance */}
      <MaintenanceSection onOpenBooking={onOpenBooking} />

      {/* 6. Why Choose BOO */}
      <WhyBOO />

      {/* 7. CTA */}
      <CTASection />
    </div>
  );
}
