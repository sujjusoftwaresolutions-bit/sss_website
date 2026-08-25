import React from 'react';
import { motion } from 'framer-motion';

const AnimatedSEmblem = ({ 
  className = "w-[420px] h-[420px] sm:w-[580px] sm:h-[580px] lg:w-[750px] lg:h-[750px]", 
  opacity = 0.35,
  interactive = false 
}) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className} ${interactive ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      
      {/* Outer Rotating Cyber Tech Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full border border-dashed border-brand-gold/40"
        style={{ filter: 'drop-shadow(0 0 20px rgba(212,175,55,0.4))' }}
      />

      {/* Middle Counter-Rotating Tech Orbit */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-6 sm:inset-10 rounded-full border border-sky-400/35"
      >
        {/* Orbital Glowing Nodes on the Ring */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-brand-gold shadow-[0_0_20px_#D4AF37]" />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-sky-400 shadow-[0_0_20px_#38bdf8]" />
        <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-brand-light-gold shadow-[0_0_15px_#F4C542]" />
      </motion.div>

      {/* Inner Pulsing Golden Bloom Aura */}
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-10 sm:inset-14 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.45) 0%, rgba(244,197,66,0.2) 50%, transparent 75%)',
          filter: 'blur(40px)',
        }}
      />

      {/* The Crowned 3D Golden "S" Logo with Vivid Floating Animation & Bright Glow */}
      <motion.div
        animate={{ 
          y: [0, -18, 0],
          rotateZ: [-2, 2, -2],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 w-4/5 h-4/5 flex items-center justify-center"
        style={{
          opacity,
          filter: 'drop-shadow(0 0 35px rgba(212,175,55,0.9)) drop-shadow(0 0 75px rgba(244,197,66,0.5))',
        }}
      >
        <img
          src="/s_crown_transparent.png"
          alt="SUJJU Golden S Crown Logo"
          className="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(212,175,55,1)] brightness-110"
        />
      </motion.div>

    </div>
  );
};

export default AnimatedSEmblem;
