import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Shield, GraduationCap, Star, Users, CheckCircle, Code, Server, Presentation, MonitorPlay } from 'lucide-react';
import SEO from '../components/SEO';

const coreValues = [
  { icon: <Lightbulb />, title: 'Innovation', desc: 'Pushing boundaries with modern tech stacks.' },
  { icon: <Shield />, title: 'Integrity', desc: 'Transparent communication and honest delivery.' },
  { icon: <GraduationCap />, title: 'Learning', desc: 'Continuous growth for our team and our students.' },
  { icon: <Star />, title: 'Quality', desc: 'Uncompromising standards in every line of code.' },
  { icon: <Users />, title: 'Collaboration', desc: 'Working closely with clients to achieve shared goals.' },
  { icon: <CheckCircle />, title: 'Customer Success', desc: 'Your growth is our ultimate metric of success.' }
];

const whyUs = [
  { icon: <Code />, title: 'Industry-Oriented', desc: 'We build what the market actually needs.' },
  { icon: <Users />, title: 'Experienced Mentors', desc: 'Learn from developers who build production apps.' },
  { icon: <MonitorPlay />, title: 'Practical Learning', desc: '100% hands-on approach to technical training.' },
  { icon: <Server />, title: 'Modern Tech Stack', desc: 'MERN, Next.js, Flask, YOLOv8, and cloud deployments.' }
];

const About = () => {
  return (
    <div className="w-full bg-brand-bg relative overflow-hidden">
      <SEO 
        title="About Us" 
        description="Learn about SUJJU Software Solutions, our mission, vision, and core values. We bridge the gap between academia and industry." 
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-brand-navy text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-brand-navy" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto mb-10 flex justify-center"
            style={{ width: 'clamp(180px, 20vw, 220px)' }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <div 
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)',
                  filter: 'blur(15px)',
                }}
              />
              <img 
                src="/logo.jpeg" 
                alt="SUJJU Software Solutions"
                className="relative z-10 w-full h-auto object-contain rounded-2xl"
                style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}
              />
            </motion.div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-6 font-outfit tracking-tight"
          >
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-light-gold">SUJJU Software Solutions</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 font-inter max-w-2xl mx-auto leading-relaxed"
          >
            A modern software company dedicated to delivering innovative solutions while empowering the next generation of technologists through practical industry experience.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-12 rounded-3xl bg-white shadow-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-brand-navy" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-navy/5 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-700" />
            <h2 className="text-3xl font-bold text-brand-navy mb-6 font-outfit">Our Mission</h2>
            <p className="text-[16px] md:text-[17px] lg:text-[18px] text-slate-800 font-medium leading-[1.8] italic">
              "Deliver innovative software solutions while empowering students and organizations through practical technology education."
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-12 rounded-3xl bg-white shadow-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-2 h-full bg-brand-gold" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-gold/10 rounded-tr-full -z-10 group-hover:scale-150 transition-transform duration-700" />
            <h2 className="text-3xl font-bold text-brand-gold mb-6 font-outfit">Our Vision</h2>
            <p className="text-[16px] md:text-[17px] lg:text-[18px] text-slate-800 font-medium leading-[1.8] italic">
              "Become a trusted software and AI company that bridges academia and industry through innovation, quality, and continuous learning."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-navy mb-4 font-outfit">Core Values</h2>
            <div className="w-20 h-1 bg-brand-gold mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-2xl bg-brand-bg hover:bg-brand-navy group transition-colors duration-300 text-center"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-brand-navy mx-auto mb-6 shadow-md group-hover:text-brand-gold transition-colors">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-3 font-outfit group-hover:text-white transition-colors">{value.title}</h3>
                <p className="text-[16px] md:text-[17px] lg:text-[18px] text-slate-800 font-medium leading-[1.8] group-hover:text-gray-100 transition-colors">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Clients Choose Us */}
      <section className="py-24 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-navy mb-4 font-outfit">Why Clients Choose Us</h2>
            <div className="w-20 h-1 bg-brand-gold mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-brand-gold/30 hover:shadow-brand-gold/10 transition-all duration-300"
              >
                <div className="text-brand-gold mb-6">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-brand-navy mb-2 font-outfit">{item.title}</h3>
                <p className="text-[16px] md:text-[17px] lg:text-[18px] text-slate-800 font-medium leading-[1.8]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
