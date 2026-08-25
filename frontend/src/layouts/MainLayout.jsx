import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackgroundGlow from '../components/common/BackgroundGlow';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen bg-[#050B14] text-white overflow-x-hidden relative">
      {/* Background S Emblem is active on ALL pages EXCEPT the Home page */}
      <BackgroundGlow showSEmblem={!isHomePage} opacity={0.14} />

      <Navbar />

      <main className="flex-grow pt-[80px] relative z-10">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
