import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';

const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 8 + 5,
  delay: Math.random() * 4,
}));

const HeroSection = () => {
  const mouseGlowRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!mouseGlowRef.current || !heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      gsap.to(mouseGlowRef.current, {
        x: x - 300,
        y: y - 300,
        duration: 1.2,
        ease: 'power2.out',
      });
    };
    const el = heroRef.current;
    if (el) el.addEventListener('mousemove', handleMouseMove);
    return () => { if (el) el.removeEventListener('mousemove', handleMouseMove); };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-[85vh] sm:h-[90vh] lg:h-screen w-full overflow-hidden bg-[#050B14] select-none"
      aria-label="Hero Section"
    >
      {/* ─── Base Dark Background Gradient ─── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#060e1f] via-[#050B14] to-[#0a152e] z-0" />

      {/* ─── Mouse Glow ─── */}
      <div
        ref={mouseGlowRef}
        className="absolute z-10 pointer-events-none rounded-full hidden md:block"
        style={{
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
        }}
      />

      {/* ─── Floating Particles ─── */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {PARTICLES.map(p => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-brand-gold"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: 0 }}
            animate={{ y: [0, -80, 0], opacity: [0, 0.4, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* ─── Animated Gradient Blob ─── */}
      <motion.div
        animate={{ x: [0, 80, -40, 0], y: [0, -40, 60, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 right-0 z-10 pointer-events-none"
        style={{ width: 700, height: 700, background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 65%)' }}
      />

      {/* ─── Hero Content ─── */}
      <div className="relative z-20 flex flex-col justify-center h-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-20">

        {/* Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.8 }}
          className="mb-5 flex items-center gap-3"
        >
          <div className="h-px w-12 bg-brand-gold" />
          <span className="text-brand-gold font-bold text-sm uppercase tracking-[0.25em] font-inter">
            Software · AI · Training
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.0, ease: 'easeOut' }}
          className="font-outfit font-bold text-white leading-[1.05] tracking-tight mb-5"
          style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}
        >
          Build.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-brand-light-gold to-brand-gold">
            Innovate.
          </span>{' '}
          Transform.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="text-white/90 font-outfit font-bold mb-3 max-w-2xl"
          style={{ fontSize: 'clamp(18px, 2.2vw, 28px)' }}
        >
          SUJJU Software Solutions
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.3 }}
          className="text-gray-400 font-inter mb-10 max-w-2xl leading-relaxed"
          style={{ fontSize: 'clamp(15px, 1.4vw, 20px)' }}
        >
          We develop AI-powered software solutions, modern web applications, internships with certification, technical workshops, and industry-ready training programs that bridge the gap between academia and real-world technology.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          className="flex flex-col sm:flex-row gap-4 mb-8 md:mb-12"
        >
          <Link to="/services" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(212,175,55,0.7)' }}
              whileTap={{ scale: 0.97 }}
              className="relative w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 rounded-full font-bold font-outfit text-brand-navy overflow-hidden group min-h-[48px]"
              style={{
                background: 'linear-gradient(135deg, #F4C542 0%, #D4AF37 50%, #B8941F 100%)',
                fontSize: 'clamp(16px, 1.5vw, 18px)',
                boxShadow: '0 4px 25px rgba(212,175,55,0.4)',
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Services <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/25 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
            </motion.button>
          </Link>

          <Link to="/civicsense-ai" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 rounded-full font-bold font-outfit text-white border-2 border-white/20 backdrop-blur-md hover:border-brand-gold hover:text-brand-gold transition-all duration-300 min-h-[48px]"
              style={{ fontSize: 'clamp(16px, 1.5vw, 18px)', background: 'rgba(255,255,255,0.03)' }}
            >
              CivicSense AI →
            </motion.button>
          </Link>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 right-10 z-30 flex flex-col items-center gap-2 text-white/40"
      >
        <span className="text-xs font-inter tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
