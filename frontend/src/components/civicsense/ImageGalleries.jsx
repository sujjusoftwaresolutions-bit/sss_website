import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCards, Navigation } from 'swiper/modules';
import { X, ZoomIn, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';

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

const ImageGalleries = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    setIsZoomed(false);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

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
    <section className="py-24 bg-brand-navy relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-outfit">Project Galleries</h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full mb-6" />
          <p className="text-gray-400 font-inter text-lg max-w-2xl mx-auto">
            A visual journey of CivicSense AI's development, presentations, and achievements across various institutions.
          </p>
        </div>

        {/* Carousel Showcase for Highlights */}
        <div className="mb-24 flex justify-center w-full">
          {/* Increased container size significantly */}
          <div className="w-full max-w-4xl lg:max-w-5xl h-[450px] md:h-[650px] lg:h-[750px]">
            <Swiper
              effect={'cards'}
              grabCursor={true}
              navigation={true}
              modules={[EffectCards, Autoplay, Navigation]}
              autoplay={{ delay: 4000 }}
              cardsEffect={{
                slideShadows: true,
                perSlideOffset: 18, // Reduced overlapping by increasing offset distance
                perSlideRotate: 2,
              }}
              className="w-full h-full pb-10" 
            >
              {galleryImages.map((img, idx) => (
                <SwiperSlide key={img.id} className="rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl bg-[#0a1930] cursor-pointer" onClick={() => openLightbox(idx)}>
                  <img src={img.url} alt={img.alt} className="w-full h-full object-contain p-2" />
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/90 to-transparent">
                    <span className="text-brand-gold font-bold font-outfit text-xl block mb-2">{img.category}</span>
                    <span className="text-white font-inter text-lg">{img.alt}</span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Masonry/Grid - Changed to 2 columns on desktop for much larger images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {galleryImages.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              // Premium hover effects added
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                boxShadow: "0 20px 40px rgba(212,175,55,0.2)",
                borderColor: "rgba(212,175,55,0.6)"
              }}
              className="relative group rounded-3xl overflow-hidden cursor-pointer aspect-[4/3] bg-[#0a1930] border border-white/10 transition-all duration-300"
              onClick={() => openLightbox(idx)}
            >
              <img 
                src={img.url} 
                alt={img.alt} 
                className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100" 
              />
              <div className="absolute inset-0 bg-brand-navy/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm">
                <ZoomIn className="text-brand-gold w-16 h-16 mb-4" />
                <span className="text-brand-gold font-bold font-outfit text-xl mb-2">{img.category}</span>
                <span className="text-white font-semibold font-inter text-2xl">{img.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Premium Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/98 flex items-center justify-center p-2 md:p-8 backdrop-blur-xl"
          >
            {/* Top Controls */}
            <div className="absolute top-6 right-6 flex items-center gap-4 z-50">
              <button 
                onClick={() => setIsZoomed(!isZoomed)}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-brand-gold flex items-center justify-center text-white hover:text-brand-navy transition-colors"
                title={isZoomed ? "Zoom Out" : "Zoom In"}
              >
                {isZoomed ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
              </button>
              <button 
                onClick={closeLightbox}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-red-500 flex items-center justify-center text-white transition-colors"
                title="Close"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 hover:bg-brand-gold flex items-center justify-center text-white hover:text-brand-navy transition-colors z-50 group"
            >
              <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 hover:bg-brand-gold flex items-center justify-center text-white hover:text-brand-navy transition-colors z-50 group"
            >
              <ChevronRight className="w-8 h-8 md:w-10 md:h-10 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Main Image Container */}
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`w-full h-full flex items-center justify-center cursor-pointer ${isZoomed ? 'overflow-auto items-start py-20' : ''}`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img 
                src={galleryImages[currentIndex].url} 
                alt={galleryImages[currentIndex].alt} 
                className={`transition-all duration-300 rounded-xl shadow-[0_0_50px_rgba(212,175,55,0.15)] ${isZoomed ? 'w-[150%] max-w-none h-auto' : 'w-[95%] h-[95%] object-contain'}`}
              />
            </motion.div>

            {/* Image Info Footer */}
            {!isZoomed && (
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white bg-black/70 px-8 py-4 rounded-full backdrop-blur-md border border-white/10 shadow-2xl"
              >
                <div className="font-bold text-brand-gold text-lg mb-1">{galleryImages[currentIndex].category}</div>
                <div className="font-inter text-gray-200">{galleryImages[currentIndex].alt}</div>
                <div className="text-gray-400 text-sm mt-2">{currentIndex + 1} / {galleryImages.length}</div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default ImageGalleries;
