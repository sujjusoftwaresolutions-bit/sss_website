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
          ? 'bg-[#050B14]/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-white/5'
          : 'bg-transparent'
      }`}
      style={{ height: isScrolled ? '60px' : '80px' }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 h-full flex justify-between items-center">

        {/* ─── Logo ───────────────────────────────────────── */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <motion.img
            src="/logo.jpeg"
            alt="SUJJU Software Solutions Logo"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1, y: [0, -3, 0] }}
            whileHover={{ scale: 1.05 }}
            transition={{ opacity: { duration: 0.5 }, scale: { duration: 0.3 }, y: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}
            className="rounded-lg shadow-lg transition-all duration-300"
            style={{
              height: isScrolled ? 'clamp(32px, 4vw, 38px)' : 'clamp(36px, 4vw, 48px)',
              width: 'auto',
              objectFit: 'contain',
              filter: isScrolled
                ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
                : 'drop-shadow(0 0 12px rgba(212,175,55,0.4))',
            }}
          />
          <div className="flex flex-col leading-tight">
            <span
              className={`font-outfit font-extrabold tracking-tight transition-colors duration-300 text-white`}
              style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 800, letterSpacing: '0.5px' }}
            >
              SUJJU Software
            </span>
            <span
              className={`font-inter font-semibold transition-colors duration-300 text-brand-gold`}
              style={{ fontSize: 'clamp(9px, 1.2vw, 12px)', letterSpacing: '0.18em', textTransform: 'uppercase' }}
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
                  isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                }`}
                style={{
                  fontSize: 17,
                  fontWeight: 600,
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
              className={`relative px-6 py-2.5 rounded-full font-outfit font-bold overflow-hidden group transition-all duration-300 text-brand-navy`}
              style={{
                fontSize: 15,
                background: 'linear-gradient(135deg, #F4C542 0%, #D4AF37 100%)',
                boxShadow: '0 4px 20px rgba(212,175,55,0.3)',
              }}
            >
              <span className="relative z-10">Get in Touch</span>
              <div className="absolute inset-0 bg-white/30 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            </motion.button>
          </Link>
        </nav>

        {/* ─── Mobile Menu Toggle ─────────────────────────── */}
        <button
          className={`lg:hidden p-2 rounded-xl transition-colors duration-300 text-white hover:bg-white/10`}
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={32} />
        </button>
      </div>

      {/* ─── Mobile Menu Overlay ────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] lg:hidden bg-[#050B14] flex flex-col"
          >
            {/* Mobile Menu Header */}
            <div className="flex justify-between items-center px-6 md:px-8 h-[72px] md:h-[90px] border-b border-white/10 shrink-0">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                <img 
                  src="/logo.jpeg" 
                  alt="SUJJU Logo"
                  className="h-[36px] rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                />
              </Link>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 text-white hover:bg-white/10 rounded-full transition-colors bg-white/5"
                aria-label="Close menu"
              >
                <X size={32} />
              </button>
            </div>

            {/* Mobile Menu Links */}
            <div className="flex-1 overflow-y-auto py-10 px-6 flex flex-col justify-center gap-6 md:gap-8">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block font-outfit text-[32px] md:text-[40px] font-bold text-center transition-colors duration-200 ${
                      location.pathname === link.path
                        ? 'text-brand-gold'
                        : 'text-white hover:text-brand-gold'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 px-4"
              >
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <button
                    className="w-full py-5 rounded-full font-outfit font-bold text-brand-navy text-[20px] shadow-[0_4px_20px_rgba(212,175,55,0.4)] active:scale-95 transition-transform"
                    style={{ background: 'linear-gradient(135deg, #F4C542 0%, #D4AF37 100%)' }}
                  >
                    Get in Touch
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
