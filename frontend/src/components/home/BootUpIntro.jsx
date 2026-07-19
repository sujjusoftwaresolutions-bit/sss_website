import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BootUpIntro = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide the boot-up screen after 1.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Give it time to fade out before unmounting or signaling complete
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050B14] font-outfit"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-12 border-4 border-brand-navy border-t-brand-gold rounded-full animate-spin mb-6"></div>
            <h2 className="text-white text-xl md:text-2xl font-bold tracking-widest mb-2">INITIALIZING...</h2>
            <p className="text-brand-gold text-sm font-inter tracking-[0.3em]">SYSTEM V1.0.4</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootUpIntro;
