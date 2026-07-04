import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const CivicHero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Parallax and Neural Network simulation with GSAP
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const x = (window.innerWidth / 2 - e.pageX) / 40;
      const y = (window.innerHeight / 2 - e.pageY) / 40;
      
      gsap.to('.hero-bg', {
        x: x,
        y: y,
        duration: 1,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-brand-navy flex items-center justify-center pt-20">
      {/* AI Theme Background */}
      <div className="hero-bg absolute inset-0 -inset-x-20 -inset-y-20 opacity-30 z-0">
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-brand-navy/60 backdrop-blur-[2px]" />
      </div>

      {/* Animated gradient light */}
      <div className="absolute inset-0 z-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-gold/30 via-brand-navy/10 to-transparent" />

      {/* Floating Particles Simulation */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative mx-auto mb-8 flex justify-center"
          style={{ width: 'clamp(200px, 22vw, 240px)' }}
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            <div 
              className="absolute inset-0 rounded-3xl"
              style={{
                background: 'radial-gradient(circle, rgba(212,175,55,0.5) 0%, transparent 70%)',
                filter: 'blur(15px)',
              }}
            />
            <img 
              src="/logo.jpeg" 
              alt="SUJJU Software Solutions"
              className="relative z-10 w-full h-auto object-contain rounded-2xl"
              style={{ filter: 'drop-shadow(0 10px 25px rgba(212,175,55,0.4))' }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-block px-6 py-2 rounded-full glass border border-brand-gold/30 text-brand-gold font-bold text-sm uppercase tracking-widest mb-8 shadow-[0_0_15px_rgba(212,175,55,0.2)]"
        >
          Flagship Project
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 font-outfit tracking-tight"
        >
          CivicSense <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-light-gold">AI</span>
        </motion.h1>

        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-2xl md:text-3xl text-gray-200 mb-8 font-inter font-light"
        >
          AI-Powered Smart Civic Intelligence Platform
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-4xl mx-auto font-inter leading-relaxed glass-dark p-6 rounded-2xl border border-white/5"
        >
          An intelligent MERN Stack platform that leverages Artificial Intelligence, Computer Vision, GPS, and Machine Learning to detect, validate, monitor, and resolve civic issues efficiently through real-time collaboration between citizens and authorities.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <button className="px-8 py-4 bg-brand-gold text-brand-navy font-bold text-lg rounded-full hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all duration-300 relative overflow-hidden group">
            <span className="relative z-10">Explore Features</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </button>
          
          <button className="px-8 py-4 bg-transparent border-2 border-brand-gold text-brand-gold font-bold text-lg rounded-full hover:bg-brand-gold hover:text-brand-navy transition-colors duration-300">
            View Project Workflow
          </button>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-brand-gold rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-brand-gold rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default CivicHero;
