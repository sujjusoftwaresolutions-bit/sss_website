import React from 'react';
import HeroSection from '../components/home/HeroSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import StatisticsSection from '../components/home/StatisticsSection';
import ExpertiseSection from '../components/home/ExpertiseSection';
import CivicSensePreview from '../components/home/CivicSensePreview';
import Testimonials from '../components/home/Testimonials';
import CTASection from '../components/home/CTASection';

const Home = () => {
  return (
    <div className="w-full bg-brand-bg">
      <HeroSection />
      <WhyChooseUs />
      <StatisticsSection />
      <ExpertiseSection />
      <CivicSensePreview />
      <Testimonials />
      <CTASection />
    </div>
  );
};

export default Home;
