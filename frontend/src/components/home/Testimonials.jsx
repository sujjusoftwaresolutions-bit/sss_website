import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'College Principal',
    role: 'Engineering Institute',
    content: 'SUJJU Software Solutions delivered an exceptional workshop. Our students gained immense practical knowledge in modern web architectures and AI integrations.',
  },
  {
    name: 'Startup Founder',
    role: 'Tech Startup',
    content: 'Their team built our MVP faster than expected with production-ready code. The quality of their software development services is truly premium.',
  },
  {
    name: 'Former Intern',
    role: 'Software Engineer',
    content: 'The internship program at SUJJU completely transformed my career. Working on real-world projects like CivicSense AI gave me the edge I needed.',
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-brand-navy relative overflow-hidden text-white">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4 font-outfit"
          >
            Client Success Stories
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 h-1 bg-brand-gold mx-auto rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass-dark p-8 rounded-2xl relative"
            >
              <Quote className="text-brand-gold/20 absolute top-6 right-6 w-16 h-16" />
              
              <div className="relative z-10">
                <p className="text-gray-300 font-inter leading-relaxed mb-8 italic">
                  "{item.content}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-gold to-brand-light-gold rounded-full flex items-center justify-center text-brand-navy font-bold font-outfit text-xl">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white font-outfit">{item.name}</h4>
                    <p className="text-brand-gold text-sm font-inter">{item.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
