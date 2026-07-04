import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

// LOGO is ALWAYS first — this is enforced by array order
const slideImages = [
  { src: '/logo.jpeg', isLogo: true },
  { src: '/sss1.jpeg', isLogo: false },
  { src: '/sss2.jpeg', isLogo: false },
  { src: '/sss3.jpeg', isLogo: false },
  { src: '/sss4.jpeg', isLogo: false },
  { src: '/slide5.jpeg', isLogo: false },
  { src: '/slide6.jpeg', isLogo: false },
  { src: '/slide7.jpeg', isLogo: false },
];

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 8 + 5,
  delay: Math.random() * 4,
}));

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0); // Always starts at 0 = logo
  const [isTransitioning, setIsTransitioning] = useState(false);
  const mouseGlowRef = useRef(null);
  const heroRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => goToNext(), 5000);
    return () => clearInterval(timerRef.current);
  }, [currentSlide]);

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

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => goToNext(), 5000);
  };

  const goToSlide = (idx) => {
    if (isTransitioning || idx === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(idx);
    resetTimer();
    setTimeout(() => setIsTransitioning(false), 900);
  };

  const goToNext = () => {
    setIsTransitioning(true);
    setCurrentSlide(prev => (prev + 1) % slideImages.length);
    setTimeout(() => setIsTransitioning(false), 900);
  };

  const goToPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => (prev - 1 + slideImages.length) % slideImages.length);
    resetTimer();
    setTimeout(() => setIsTransitioning(false), 900);
  };

  const current = slideImages[currentSlide];

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-brand-navy select-none"
      aria-label="Hero Section"
    >
      {/* ─── Image Slides ─────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: current.isLogo ? 1 : 1.12 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.2 }, scale: { duration: 8, ease: 'linear' } }}
          className="absolute inset-0 z-0"
        >
          {current.isLogo ? (
            /* ─── LOGO SLIDE: centered logo on dark bg with golden glow ─── */
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#060e1f] via-brand-navy to-[#0d1f42]">
              {/* Outer radial golden glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.12) 0%, transparent 60%)',
                }}
              />
              <motion.img
                src={current.src}
                alt="SUJJU Software Solutions Logo"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                style={{
                  maxWidth: '55%',
                  maxHeight: '55%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 60px rgba(212,175,55,0.5)) drop-shadow(0 0 120px rgba(212,175,55,0.2))',
                }}
              />
            </div>
          ) : (
            /* ─── PHOTO SLIDES: sharp with light overlay ─── */
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${current.src})` }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* ─── Overlays (lighter on logo slide, darker on photos) ─── */}
      <div className={`absolute inset-0 z-10 transition-opacity duration-1000 ${current.isLogo ? 'opacity-0' : 'opacity-100'}`}>
        <div className="absolute inset-0 bg-brand-navy/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/15 to-brand-navy/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/50 via-transparent to-brand-navy/25" />
      </div>

      {/* ─── Mouse Glow ─── */}
      <div
        ref={mouseGlowRef}
        className="absolute z-10 pointer-events-none rounded-full hidden md:block"
        style={{
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(212,175,55,0.10) 0%, transparent 70%)',
        }}
      />

      {/* ─── Floating Particles ─── */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {PARTICLES.map(p => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-brand-gold"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: 0 }}
            animate={{ y: [0, -60, 0], opacity: [0, 0.5, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* ─── Animated Gradient Blob ─── */}
      <motion.div
        animate={{ x: [0, 80, -40, 0], y: [0, -40, 60, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 right-0 z-10 pointer-events-none"
        style={{ width: 700, height: 700, background: 'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 65%)' }}
      />

      {/* ─── Hero Content (always visible) ─── */}
      <div className="relative z-20 flex flex-col justify-end h-full max-w-7xl mx-auto px-6 md:px-12 pb-32">

        {/* Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
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
          transition={{ duration: 0.9, delay: 0.5, ease: 'easeOut' }}
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
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-white/90 font-outfit font-bold mb-3 max-w-2xl"
          style={{ fontSize: 'clamp(18px, 2.2vw, 28px)' }}
        >
          SUJJU Software Solutions
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-gray-300 font-inter mb-10 max-w-2xl leading-relaxed"
          style={{ fontSize: 'clamp(15px, 1.4vw, 20px)' }}
        >
          We develop AI-powered software solutions, modern web applications, internships with certification, technical workshops, and industry-ready training programs that bridge the gap between academia and real-world technology.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-5 mb-12"
        >
          <Link to="/services">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(212,175,55,0.7)' }}
              whileTap={{ scale: 0.97 }}
              className="relative px-10 py-5 rounded-full font-bold font-outfit text-brand-navy overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, #F4C542 0%, #D4AF37 50%, #B8941F 100%)',
                fontSize: 18,
                boxShadow: '0 4px 25px rgba(212,175,55,0.4)',
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Services <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/25 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
            </motion.button>
          </Link>

          <Link to="/civicsense-ai">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-5 rounded-full font-bold font-outfit text-white border-2 border-white/40 backdrop-blur-md hover:border-brand-gold hover:text-brand-gold transition-all duration-300"
              style={{ fontSize: 18, background: 'rgba(255,255,255,0.06)' }}
            >
              CivicSense AI →
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-wrap gap-10"
        >
          {[
            { value: '100+', label: 'Projects' },
            { value: '20+', label: 'College Events' },
            { value: '500+', label: 'Students Trained' },
            { value: '5+', label: 'Years Experience' },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-brand-gold font-bold font-outfit" style={{ fontSize: 28 }}>{stat.value}</div>
              <div className="text-gray-400 font-inter text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ─── Slide Navigation ─── */}
      <button onClick={goToPrev} aria-label="Previous slide"
        className="absolute left-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-brand-gold hover:text-brand-navy hover:border-brand-gold transition-all duration-300">
        <ChevronLeft size={22} />
      </button>
      <button onClick={() => { goToNext(); resetTimer(); }} aria-label="Next slide"
        className="absolute right-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-brand-gold hover:text-brand-navy hover:border-brand-gold transition-all duration-300">
        <ChevronRight size={22} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slideImages.map((_, i) => (
          <button key={i} onClick={() => goToSlide(i)} aria-label={`Go to slide ${i + 1}`} className="transition-all duration-300">
            <motion.div
              animate={{ width: i === currentSlide ? 28 : 8, backgroundColor: i === currentSlide ? '#D4AF37' : 'rgba(255,255,255,0.4)' }}
              transition={{ duration: 0.3 }}
              style={{ height: 8, borderRadius: 4 }}
            />
          </button>
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 right-10 z-30 flex flex-col items-center gap-2 text-white/60"
      >
        <span className="text-xs font-inter tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
