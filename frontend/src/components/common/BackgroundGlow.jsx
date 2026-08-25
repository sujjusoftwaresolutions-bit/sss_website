import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSEmblem from './AnimatedSEmblem';

const BackgroundGlow = ({ showSEmblem = true, opacity = 0.35 }) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Ambient gradient lighting */}
      <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-gradient-to-b from-brand-navy/50 via-brand-gold/10 to-transparent rounded-full blur-[140px]" />
      <div className="absolute top-[35%] -left-[10%] w-[700px] h-[700px] bg-sky-500/10 rounded-full blur-[160px]" />
      <div className="absolute bottom-[10%] -right-[10%] w-[800px] h-[800px] bg-brand-gold/10 rounded-full blur-[180px]" />

      {/* Cyber Grid Matrix Lines */}
      <div 
        className="absolute inset-0 opacity-[0.05]" 
        style={{
          backgroundImage: `linear-gradient(to right, #D4AF37 1px, transparent 1px), linear-gradient(to bottom, #D4AF37 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Futuristic Glowing Animated "S" Emblem in the Background */}
      {showSEmblem && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center z-0">
          <AnimatedSEmblem opacity={opacity} />
        </div>
      )}

      {/* Floating Ambient Glowing Sparks */}
      <motion.div
        animate={{ y: [0, -40, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-3 h-3 rounded-full bg-brand-gold blur-xs shadow-[0_0_15px_#D4AF37]"
      />
      <motion.div
        animate={{ y: [0, 50, 0], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-2/3 left-1/5 w-3.5 h-3.5 rounded-full bg-sky-400 blur-xs shadow-[0_0_15px_#38bdf8]"
      />
    </div>
  );
};

export default BackgroundGlow;
