import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Radio, Activity, LayoutDashboard, Smartphone, Map } from 'lucide-react';
import { Link } from 'react-router-dom';

const futureScope = [
  { icon: <Building2 size={24} />, title: 'Smart City Integration', desc: 'Direct API links with municipal corporation databases.' },
  { icon: <Radio size={24} />, title: 'IoT Sensors', desc: 'Integration with smart bins and traffic cameras for automated triggers.' },
  { icon: <Activity size={24} />, title: 'AI Predictive Maintenance', desc: 'Forecasting infrastructure degradation before it becomes critical.' },
  { icon: <LayoutDashboard size={24} />, title: 'Government Dashboard', desc: 'Centralized command center for state-wide civic issue monitoring.' },
  { icon: <Smartphone size={24} />, title: 'Mobile App Expansion', desc: 'Native iOS and Android applications with AR features.' },
  { icon: <Map size={24} />, title: 'Multi-city Deployment', desc: 'Scaling the architecture to support nationwide reporting.' },
];

const FutureScope = () => {
  return (
    <>
      <section className="py-24 bg-brand-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-4 font-outfit">Future Scope</h2>
            <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full mb-6" />
            <p className="text-gray-600 font-inter text-lg">
              The roadmap for scaling CivicSense AI into a comprehensive smart city ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {futureScope.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:border-brand-gold/50 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-brand-navy/5 rounded-full flex items-center justify-center text-brand-navy group-hover:bg-brand-navy group-hover:text-brand-gold transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold font-outfit text-brand-navy">{item.title}</h3>
                </div>
                <p className="text-gray-600 font-inter text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-brand-navy relative overflow-hidden text-center text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/80 to-brand-navy" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold mb-8 font-outfit tracking-tight"
          >
            Ready to Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-light-gold">Smarter Cities</span> with AI?
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <Link to="/contact">
              <button className="px-10 py-5 bg-brand-gold text-brand-navy font-bold text-lg rounded-full hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all duration-300 transform hover:-translate-y-1">
                Contact Us
              </button>
            </Link>
            <Link to="/services">
              <button className="px-10 py-5 bg-transparent border-2 border-brand-gold text-brand-gold font-bold text-lg rounded-full hover:bg-brand-gold/10 transition-colors duration-300">
                Explore Services
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default FutureScope;
