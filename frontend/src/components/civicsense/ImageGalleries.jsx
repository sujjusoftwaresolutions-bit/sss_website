import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight, Maximize2, Minimize2, Images } from 'lucide-react';

// Real uploaded CivicSense AI project and event images
const galleryImages = [
  { id: 1, url: '/civicsense/event1.jpeg',   category: 'Events',  alt: 'CivicSense AI – College Technical Event' },
  { id: 2, url: '/civicsense/event2.jpeg',   category: 'Events',  alt: 'CivicSense AI – Project Expo Presentation' },
  { id: 3, url: '/civicsense/event3.jpeg',   category: 'Events',  alt: 'CivicSense AI – Award Ceremony' },
  { id: 4, url: '/civicsense/project1.jpeg', category: 'Project', alt: 'SUJJU Software Solutions – Team' },
  { id: 5, url: '/civicsense/project2.jpeg', category: 'Project', alt: 'CivicSense AI – System Demo' },
  { id: 6, url: '/civicsense/project3.jpeg', category: 'Project', alt: 'CivicSense AI – Development Sprint' },
  { id: 7, url: '/civicsense/project4.jpeg', category: 'Project', alt: 'CivicSense AI – Additional Showcase' },
];

// Duplicate images to fill the pipeline rows nicely
const row1 = [...galleryImages, ...galleryImages, ...galleryImages];
const row2 = [...galleryImages].reverse().concat([...galleryImages].reverse(), [...galleryImages].reverse());

// ─── Pipeline Row Component ──────────────────────────────────────────────────
const PipelineRow = ({ images, direction = 'left', speed = 35, onImageClick }) => {
  const trackRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef(null);
  const posRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const itemWidth = track.scrollWidth / 3; // We tripled the images
    const step = direction === 'left' ? -0.5 : 0.5;

    const animate = () => {
      if (!isPaused) {
        posRef.current += step * (speed / 35);
        if (posRef.current <= -itemWidth) posRef.current = 0;
        if (posRef.current >= 0 && direction === 'right') posRef.current = -itemWidth;
        track.style.transform = `translateX(${posRef.current}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPaused, direction, speed]);

  return (
    <div
      className="overflow-hidden relative py-3"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-[#050B14] to-transparent" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-[#050B14] to-transparent" />

      <div ref={trackRef} className="flex gap-4" style={{ width: 'max-content', willChange: 'transform' }}>
        {images.map((img, idx) => (
          <motion.div
            key={`${img.id}-${idx}`}
            whileHover={{ scale: 1.06, y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={() => onImageClick(img.id - 1)}
            className="relative group flex-shrink-0 w-64 h-44 rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-brand-gold/60 transition-colors duration-300 shadow-lg"
          >
            <img
              src={img.url}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-4">
              <ZoomIn className="text-brand-gold w-8 h-8 mb-2" />
              <span className="text-brand-gold font-bold text-xs uppercase tracking-wider">{img.category}</span>
              <span className="text-white text-xs text-center mt-1 line-clamp-2">{img.alt}</span>
            </div>
            {/* Category badge */}
            <div className="absolute top-2 left-2 bg-brand-gold/90 text-brand-navy text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
              {img.category}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────
const ImageGalleries = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    setIsZoomed(false);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    setIsZoomed(false);
  }, []);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    setIsZoomed(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, nextImage, prevImage]);

  return (
    <section className="py-24 bg-[#050B14] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />

      <div className="relative z-10">

        {/* Header */}
        <div className="text-center mb-16 px-6">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 bg-brand-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-brand-gold/30"
          >
            <Images className="w-8 h-8 text-brand-gold" />
          </motion.div>
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4 font-outfit"
          >
            Project{' '}
            <span className="bg-gradient-to-r from-brand-gold to-yellow-300 bg-clip-text text-transparent">
              Gallery
            </span>
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-gold to-yellow-300 mx-auto rounded-full mb-6" />
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 font-inter text-lg max-w-2xl mx-auto"
          >
            A visual journey of CivicSense AI's development, presentations, and achievements across various institutions.
          </motion.p>
        </div>

        {/* ── PIPELINE BELT LABEL ── */}
        <div className="flex items-center gap-4 px-6 max-w-7xl mx-auto mb-4">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-brand-gold/70 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse inline-block" />
            Live Pipeline
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse inline-block" />
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* ── PIPELINE ROW 1 — scrolls LEFT ── */}
        <div className="mb-2">
          <PipelineRow images={row1} direction="left" speed={30} onImageClick={openLightbox} />
        </div>

        {/* ── PIPELINE CONNECTOR ── */}
        <div className="flex items-center justify-center my-1 relative px-6">
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
          <div className="absolute flex gap-2">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-brand-gold/60 animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
            ))}
          </div>
        </div>

        {/* ── PIPELINE ROW 2 — scrolls RIGHT ── */}
        <div className="mt-2">
          <PipelineRow images={row2} direction="right" speed={25} onImageClick={openLightbox} />
        </div>

        {/* Click hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 text-sm mt-8 px-6"
        >
          Hover to pause · Click any image to view full screen
        </motion.p>

        {/* ── GRID THUMBNAILS ── */}
        <div className="max-w-7xl mx-auto px-6 mt-20">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {galleryImages.map((img, idx) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ scale: 1.05, y: -4 }}
                onClick={() => openLightbox(idx)}
                className="relative group aspect-square rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-brand-gold/60 transition-all duration-300 shadow-lg"
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-3">
                  <ZoomIn className="text-brand-gold w-6 h-6 mb-1" />
                  <span className="text-white text-xs text-center line-clamp-2">{img.alt}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/98 flex items-center justify-center p-2 md:p-8 backdrop-blur-xl"
            onClick={closeLightbox}
          >
            {/* Controls */}
            <div className="absolute top-6 right-6 flex items-center gap-3 z-50" onClick={e => e.stopPropagation()}>
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-brand-gold flex items-center justify-center text-white hover:text-brand-navy transition-colors"
              >
                {isZoomed ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              </button>
              <button
                onClick={closeLightbox}
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-red-500 flex items-center justify-center text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav Arrows */}
            <button
              onClick={e => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-brand-gold flex items-center justify-center text-white hover:text-brand-navy transition-colors z-50"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
            <button
              onClick={e => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-brand-gold flex items-center justify-center text-white hover:text-brand-navy transition-colors z-50"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* Image */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`w-full h-full flex items-center justify-center ${isZoomed ? 'overflow-auto items-start pt-20' : ''}`}
              onClick={e => { e.stopPropagation(); setIsZoomed(!isZoomed); }}
            >
              <img
                src={galleryImages[currentIndex].url}
                alt={galleryImages[currentIndex].alt}
                className={`transition-all duration-300 rounded-2xl shadow-[0_0_60px_rgba(212,175,55,0.2)] ${isZoomed ? 'w-[150%] max-w-none h-auto' : 'max-h-[85vh] max-w-[90vw] object-contain'}`}
              />
            </motion.div>

            {/* Footer */}
            {!isZoomed && (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white bg-black/70 px-8 py-3 rounded-full backdrop-blur-md border border-white/10"
                onClick={e => e.stopPropagation()}
              >
                <div className="font-bold text-brand-gold text-sm mb-0.5">{galleryImages[currentIndex].category}</div>
                <div className="text-gray-200 text-sm">{galleryImages[currentIndex].alt}</div>
                <div className="text-gray-500 text-xs mt-1">{currentIndex + 1} / {galleryImages.length}</div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ImageGalleries;
