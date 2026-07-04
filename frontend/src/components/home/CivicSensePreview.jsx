import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Map, BarChart, ShieldCheck } from 'lucide-react';

const features = [
  { text: 'AI-Powered Image Validation', icon: <Target size={20} className="text-brand-gold" /> },
  { text: 'Real-Time GPS Location Capture', icon: <Map size={20} className="text-brand-gold" /> },
  { text: 'Predictive Analytics Dashboard', icon: <BarChart size={20} className="text-brand-gold" /> },
  { text: 'Secure JWT Authentication', icon: <ShieldCheck size={20} className="text-brand-gold" /> },
];

const CivicSensePreview = () => {
  return (
    <section className="py-24 bg-brand-bg relative overflow-hidden">
      {/* Dynamic AI Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Image/Preview Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-1/2 w-full relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-brand-gold to-brand-navy rounded-2xl blur-lg opacity-30 animate-pulse" />
            <div className="relative glass rounded-2xl overflow-hidden border border-white/50 shadow-2xl">
              {/* Placeholder for actual CivicSense AI dashboard screenshot */}
              <div className="aspect-[4/3] bg-brand-navy relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay" />
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-brand-gold/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-gold/50">
                    <Target size={32} className="text-brand-gold" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 font-outfit">CivicSense AI Engine</h3>
                  <p className="text-brand-light-gold font-inter">YOLOv8 Object Detection Active</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:w-1/2 w-full"
          >
            <div className="inline-block px-4 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold font-bold text-sm mb-6 uppercase tracking-wider font-inter">
              Flagship Project
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6 font-outfit leading-tight">
              CivicSense AI: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-navy to-brand-gold">
                Smart Civic Intelligence
              </span>
            </h2>
            
            <p className="text-gray-600 text-lg mb-8 font-inter leading-relaxed">
              An intelligent platform enabling citizens and authorities to collaboratively resolve civic issues using Computer Vision, Machine Learning, and Real-Time Data Analytics.
            </p>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + (idx * 0.1) }}
                  className="flex items-center gap-3 text-gray-700 font-inter font-medium bg-white px-4 py-3 rounded-lg shadow-sm"
                >
                  {feature.icon}
                  <span className="text-sm">{feature.text}</span>
                </motion.li>
              ))}
            </ul>
            
            <Link to="/civicsense-ai">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-brand-navy text-white font-bold rounded-lg hover:bg-brand-gold hover:text-brand-navy hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300"
              >
                Explore The Platform
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CivicSensePreview;
