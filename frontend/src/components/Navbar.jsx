import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'CivicSense AI', path: '/civicsense-ai' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.08)] border-b border-gray-200/50'
          : 'bg-transparent'
      }`}
      style={{ height: isScrolled ? 'clamp(72px, 8vw, 80px)' : 'clamp(72px, 8vw, 90px)' }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-8 lg:px-10 h-full flex justify-between items-center">

        {/* ─── Logo ───────────────────────────────────────── */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <motion.img
            src="/logo.jpeg"
            alt="SUJJU Software Solutions Logo"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1, y: [0, -3, 0] }}
            whileHover={{ scale: 1.05 }}
            transition={{ opacity: { duration: 0.5 }, scale: { duration: 0.3 }, y: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}
            className="rounded-xl shadow-lg transition-all duration-300"
            style={{
              height: 'clamp(50px, 6vw, 75px)',
              width: 'auto',
              objectFit: 'contain',
              filter: isScrolled
                ? 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))'
                : 'drop-shadow(0 0 12px rgba(212,175,55,0.6))',
            }}
          />
          <div className="flex flex-col leading-tight">
            <span
              className={`font-outfit font-extrabold tracking-tight transition-colors duration-300 ${
                isScrolled ? 'text-brand-navy' : 'text-white'
              }`}
              style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 800, letterSpacing: '0.5px' }}
            >
              SUJJU Software
            </span>
            <span
              className={`font-inter font-semibold transition-colors duration-300 ${
                isScrolled ? 'text-brand-gold' : 'text-brand-gold/80'
              }`}
              style={{ fontSize: 'clamp(10px, 1.2vw, 14px)', letterSpacing: '0.18em', textTransform: 'uppercase' }}
            >
              Solutions
            </span>
          </div>
        </Link>

        {/* ─── Desktop Navigation ─────────────────────────── */}
        <nav className="hidden lg:flex items-center" style={{ gap: 38 }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative font-outfit transition-colors duration-300 group ${
                  isScrolled
                    ? isActive ? 'text-brand-navy' : 'text-gray-600 hover:text-brand-navy'
                    : isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
                style={{
                  fontSize: 19,
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  lineHeight: 1.5,
                }}
              >
                {link.name}

                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-2 left-0 right-0 h-[3px] bg-brand-gold rounded-full"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}

                {!isActive && (
                  <span className="absolute -bottom-2 left-0 right-0 h-[3px] bg-brand-gold rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                )}
              </Link>
            );
          })}

          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212,175,55,0.5)' }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-8 py-3.5 rounded-full font-outfit font-bold overflow-hidden group transition-all duration-300 ${
                isScrolled ? 'text-white' : 'text-brand-navy'
              }`}
              style={{
                fontSize: 17,
                background: isScrolled
                  ? 'linear-gradient(135deg, #0A2F6B 0%, #1a4a9e 100%)'
                  : 'linear-gradient(135deg, #F4C542 0%, #D4AF37 100%)',
                boxShadow: '0 4px 20px rgba(212,175,55,0.3)',
              }}
            >
              <span className="relative z-10">Get in Touch</span>
              <div className="absolute inset-0 bg-brand-gold/30 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            </motion.button>
          </Link>
        </nav>

        {/* ─── Mobile Menu Toggle ─────────────────────────── */}
        <button
          className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${
            isScrolled ? 'text-brand-navy hover:bg-gray-100' : 'text-white hover:bg-white/10'
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* ─── Mobile Menu ──────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="lg:hidden bg-brand-navy/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block font-outfit py-2 transition-colors duration-200 ${
                      location.pathname === link.path
                        ? 'text-brand-gold font-bold'
                        : 'text-white hover:text-brand-gold'
                    }`}
                    style={{ fontSize: 20, fontWeight: 700, letterSpacing: '0.5px' }}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                <button
                  className="w-full mt-2 py-4 rounded-full font-outfit font-bold text-brand-navy"
                  style={{ fontSize: 18, background: 'linear-gradient(135deg, #F4C542 0%, #D4AF37 100%)' }}
                >
                  Get in Touch
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
