import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-brand-navy flex items-center justify-center z-50">
      <div className="flex flex-col items-center">

        {/* Spinning ring around logo */}
        <div className="relative" style={{ width: 240, height: 240 }}>
          {/* Outer spinning ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full"
            style={{
              border: '3px solid transparent',
              borderTopColor: '#D4AF37',
              borderRightColor: '#D4AF37',
            }}
          />
          {/* Inner counter-spinning ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
            className="absolute rounded-full"
            style={{
              inset: 8,
              border: '2px solid transparent',
              borderTopColor: 'rgba(212,175,55,0.3)',
              borderLeftColor: 'rgba(212,175,55,0.3)',
            }}
          />

          {/* Golden glow behind logo */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute rounded-full"
            style={{
              inset: 16,
              background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)',
            }}
          />

          {/* Real logo */}
          <motion.img
            src="/logo.jpeg"
            alt="SUJJU Software Solutions"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute rounded-full"
            style={{
              inset: 30,
              width: 180,
              height: 180,
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 30px rgba(212,175,55,0.8))',
            }}
          />
        </div>

        {/* Company Name */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{ fontSize: 32 }}
        >
          SUJJU Software Solutions
        </motion.p>

        {/* Loading dots */}
        <div className="mt-4 flex gap-1.5">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              className="w-2 h-2 rounded-full bg-brand-gold"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
