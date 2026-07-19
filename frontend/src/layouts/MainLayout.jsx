import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#050B14] text-white overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-[80px]">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
