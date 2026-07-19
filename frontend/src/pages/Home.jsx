import React, { useState } from 'react';
import HeroSection from '../components/home/HeroSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import StatisticsSection from '../components/home/StatisticsSection';
import ExpertiseSection from '../components/home/ExpertiseSection';
import CivicSensePreview from '../components/home/CivicSensePreview';
import Testimonials from '../components/home/Testimonials';
import CTASection from '../components/home/CTASection';
import BootUpIntro from '../components/home/BootUpIntro';
import InfiniteCarousel from '../components/common/InfiniteCarousel';
import FAQAccordion from '../components/common/FAQAccordion';

const Home = () => {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="w-full bg-[#050B14]">
      {!introDone && <BootUpIntro onComplete={() => setIntroDone(true)} />}
      
      {/* We can still mount HeroSection behind the intro, but animations inside it might start early. 
          Usually it's fine if the intro is just an overlay. */}
      <HeroSection />
      
      <div className="py-12 bg-[#050B14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-8">
          <p className="text-brand-gold font-bold text-sm uppercase tracking-[0.2em] mb-2 font-inter">OUR WORK</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white font-outfit">Project Highlights</h2>
        </div>
        <InfiniteCarousel />
      </div>

      <WhyChooseUs />
      <StatisticsSection />
      <ExpertiseSection />
      <CivicSensePreview />
      <Testimonials />
      
      <div className="py-24 bg-brand-navy/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-brand-gold font-bold text-sm uppercase tracking-[0.2em] mb-2 font-inter">GOT QUESTIONS?</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white font-outfit">Frequently Asked Questions</h2>
          </div>
          <FAQAccordion />
        </div>
      </div>

      <CTASection />
    </div>
  );
};

export default Home;
