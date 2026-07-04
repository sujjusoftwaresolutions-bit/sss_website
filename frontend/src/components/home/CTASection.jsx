import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-24 bg-brand-bg relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-navy/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-gold/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass p-12 rounded-3xl border border-brand-gold/20 shadow-2xl bg-white/60 backdrop-blur-xl"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6 font-outfit">
            Ready to Transform Your Ideas?
          </h2>
          
          <p className="text-xl text-gray-600 mb-10 font-inter max-w-2xl mx-auto">
            Whether you need custom software, AI solutions, or industry-level training, we are here to help you achieve your goals.
          </p>
          
          <Link to="/contact">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-brand-gold text-brand-navy font-bold text-lg rounded-full hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Contact Us Today</span>
              <ArrowRight size={20} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
