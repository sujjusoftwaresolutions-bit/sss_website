import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Database, Phone, Shield, Cloud } from 'lucide-react';

const expertise = [
  {
    title: 'Software Development',
    description: 'End-to-end software development lifecycle management from conceptualization to deployment.',
    icon: <Layout size={28} />
  },
  {
    title: 'AI Solutions',
    description: 'Custom AI and Machine Learning models to give your business a competitive edge.',
    icon: <Server size={28} />
  },
  {
    title: 'Internship Programs',
    description: 'Immersive programs designed to mold students into industry-ready professionals.',
    icon: <Database size={28} />
  },
  {
    title: 'Training',
    description: 'Corporate and academic training covering the latest MERN stack and AI technologies.',
    icon: <Phone size={28} />
  },
  {
    title: 'Workshops',
    description: 'Intensive 2-3 day workshops focused on practical implementations and modern architectures.',
    icon: <Shield size={28} />
  },
  {
    title: 'Technical Consulting',
    description: 'Expert guidance on system architecture, cloud deployment, and scaling strategies.',
    icon: <Cloud size={28} />
  }
];

const ExpertiseSection = () => {
  return (
    <section className="py-24 bg-[#050B14] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-brand-gold font-bold text-sm uppercase tracking-[0.2em] mb-2 font-inter"
          >
            WHAT WE DO
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4 font-outfit"
          >
            Our Expertise
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 h-1 bg-brand-gold mx-auto rounded-full mb-6"
          />
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto font-inter"
          >
            Delivering excellence across a wide spectrum of technological domains.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expertise.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative p-8 bg-[#081225] border border-white/5 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-brand-gold/10 overflow-hidden hover:border-brand-gold/30"
            >
              {/* Gradient Border simulation */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-14 h-14 bg-[#050B14] border border-white/5 rounded-xl shadow-md flex items-center justify-center text-white mb-6 group-hover:text-brand-gold group-hover:-translate-y-2 transition-all duration-300">
                {item.icon}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 font-outfit">
                {item.title}
              </h3>
              
              <p className="text-gray-400 font-inter text-sm leading-relaxed relative z-10">
                {item.description}
              </p>
              
              <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
