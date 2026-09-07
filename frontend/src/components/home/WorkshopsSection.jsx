import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Cpu, ChevronRight, X, Maximize2, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FEATURED_HOME_PHOTOS = [
  {
    id: 1,
    url: '/workshops/aliet_1.jpg',
    title: 'Interactive Technical Lecture',
    caption: 'Engaging engineering students in advanced AI, software, and embedded concepts.',
    tag: 'Aug 4, 2026 • Lecture Hall',
  },
  {
    id: 2,
    url: '/workshops/aliet_3.jpg',
    title: 'IoT & Hardware Prototype Showcase',
    caption: 'Student teams demonstrating microcontroller circuit prototypes and sensor wiring.',
    tag: 'Project Highlights',
  },
  {
    id: 3,
    url: '/workshops/aliet_2.jpg',
    title: 'Certificate Awarding Ceremony',
    caption: 'Awarding official certificates of completion with faculty members at ALIET.',
    tag: 'Aug 8, 2026 • Ceremony',
  },
  {
    id: 4,
    url: '/workshops/aliet_4.jpg',
    title: 'Practical Coding & Debugging Session',
    caption: 'Step-by-step practical code implementation under expert mentor supervision.',
    tag: 'Aug 5, 2026 • IT Lab',
  },
];

const WorkshopsSection = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <section id="workshops" className="py-24 bg-[#050B14] relative overflow-hidden border-t border-white/5">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-4">
              <Cpu size={14} className="text-brand-gold" />
              <span className="text-xs font-inter font-bold text-brand-gold uppercase tracking-[0.2em]">
                COLLEGE WORKSHOPS & TRAINING
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-outfit leading-tight">
              Empowering Students with <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-brand-gold via-amber-200 to-brand-light-gold bg-clip-text text-transparent">
                Real-World Tech Skills
              </span>
            </h2>
          </div>

          <Link
            to="/workshops"
            className="inline-flex items-center gap-2 text-brand-gold font-outfit font-bold hover:text-amber-200 transition-colors group"
          >
            <span>Explore All 18 Workshop Photos</span>
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Featured Workshop Overview Banner */}
        <div className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 mb-12 backdrop-blur-xl relative overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-4 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-md bg-brand-gold text-brand-navy font-outfit font-extrabold text-xs uppercase tracking-wide">
                  RECENT HIGHLIGHT
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-300 font-inter">
                  <Calendar size={14} className="text-brand-gold" />
                  August 3rd – 8th, 2026 (6 Days)
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-outfit leading-snug">
                6-Day Intensive Technical Workshop at ALIET
              </h3>

              <div className="flex items-center gap-2 text-gray-300 text-sm font-inter">
                <MapPin size={16} className="text-brand-gold shrink-0" />
                <span>Andhra Loyola Institute of Engineering and Technology, Vijayawada</span>
              </div>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-inter">
                SUJJU Software Solutions successfully conducted an intensive 6-day hands-on technical workshop at ALIET. Students built working IoT hardware prototypes, AI models, and full-stack web applications with live mentor evaluation and certificate awards.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 shrink-0">
              <Link
                to="/workshops"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#F4C542] to-[#D4AF37] text-brand-navy font-outfit font-bold text-sm shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:scale-[1.02] active:scale-95 transition-all"
              >
                View Full Workshop Page
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 font-outfit font-semibold text-sm transition-all"
              >
                Host Workshop at Your College
              </Link>
            </div>
          </div>
        </div>

        {/* Home Page Featured 4 Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {FEATURED_HOME_PHOTOS.map((img) => (
            <motion.div
              key={img.id}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedImg(img)}
              className="group relative bg-[#0a152e] border border-white/10 rounded-2xl overflow-hidden cursor-pointer shadow-xl flex flex-col"
            >
              <div className="aspect-[4/3] w-full overflow-hidden relative bg-black">
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                
                <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  <Maximize2 size={14} />
                </div>

                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-brand-gold/90 text-brand-navy font-outfit font-bold text-[10px] uppercase">
                  {img.tag}
                </span>
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-white text-sm font-outfit font-bold line-clamp-1 group-hover:text-brand-gold transition-colors">
                    {img.title}
                  </h4>
                  <p className="text-gray-400 text-xs font-inter line-clamp-2 mt-1">{img.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button Banner */}
        <div className="text-center pt-4">
          <Link
            to="/workshops"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/5 hover:bg-brand-gold hover:text-brand-navy border border-brand-gold/30 text-brand-gold font-outfit font-bold text-sm transition-all shadow-lg group"
          >
            <span>View All 18 ALIET Workshop Photos</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#0a152e] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setSelectedImg(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-white/20 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="max-h-[70vh] bg-black flex items-center justify-center">
                <img
                  src={selectedImg.url}
                  alt={selectedImg.title}
                  className="max-h-[70vh] w-auto object-contain"
                />
              </div>

              <div className="p-6 bg-[#0a152e]">
                <span className="inline-block px-2.5 py-1 rounded bg-brand-gold text-brand-navy font-outfit font-bold text-xs uppercase mb-2">
                  {selectedImg.tag}
                </span>
                <h3 className="text-xl font-bold text-white font-outfit mb-1">{selectedImg.title}</h3>
                <p className="text-gray-300 text-sm font-inter">{selectedImg.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WorkshopsSection;
