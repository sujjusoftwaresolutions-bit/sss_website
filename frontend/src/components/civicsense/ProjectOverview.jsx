import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Clock, ListX, TrendingDown, MessageSquareX, ScanLine, MapPin, BarChart3, ShieldCheck, Server, Search, Smartphone } from 'lucide-react';

const problems = [
  { icon: <ListX />, title: 'Manual Handling', desc: 'Slow, error-prone manual complaint registration and processing.' },
  { icon: <Clock />, title: 'Delayed Response', desc: 'High latency between issue reporting and authority action.' },
  { icon: <TrendingDown />, title: 'Poor Prioritization', desc: 'Inability to accurately prioritize critical civic issues.' },
  { icon: <MessageSquareX />, title: 'Inefficient Communication', desc: 'Lack of transparency and real-time updates for citizens.' }
];

const features = [
  { icon: <ScanLine />, title: 'AI Image Validation', desc: 'Automated filtering of irrelevant uploads using Computer Vision.' },
  { icon: <Search />, title: 'YOLOv8 Detection', desc: 'Real-time object detection for potholes, garbage, and infrastructure damage.' },
  { icon: <MapPin />, title: 'GPS Capture', desc: 'Exact coordinate extraction from EXIF data or device location.' },
  { icon: <BarChart3 />, title: 'Predictive Analytics', desc: 'Data-driven insights to predict recurring civic issues.' },
  { icon: <ShieldCheck />, title: 'JWT Authentication', desc: 'Secure, role-based access control for citizens and authorities.' },
  { icon: <Server />, title: 'Cloud Deployment', desc: 'Scalable infrastructure deployed on Render and Vercel.' }
];

const ProjectOverview = () => {
  return (
    <section className="py-24 bg-brand-bg relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Abstract Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl font-bold text-heading mb-6 font-outfit">Abstract</h2>
          <div className="w-20 h-1 bg-brand-gold mx-auto rounded-full mb-8" />
          <p className="text-xl text-gray-700 max-w-4xl mx-auto font-inter leading-relaxed">
            CivicSense AI is an intelligent web and mobile platform that empowers citizens and authorities to collaboratively detect, report, and resolve civic issues such as potholes, garbage overflow, and streetlight failures through AI-powered automation.
          </p>
        </motion.div>

        {/* Problem Statement */}
        <div className="mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-3xl font-bold text-heading mb-4 font-outfit flex items-center gap-3">
              <AlertCircle className="text-red-500" /> The Problem
            </h3>
            <p className="text-gray-600 font-inter">Traditional complaint systems are failing our modern cities due to:</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problems.map((prob, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-red-500 hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
                  {prob.icon}
                </div>
                <h4 className="text-lg font-bold text-brand-navy mb-2 font-outfit">{prob.title}</h4>
                <p className="text-sm text-gray-600 font-inter">{prob.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Core Features */}
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-3xl font-bold text-heading mb-4 font-outfit text-center">
              Core Features
            </h3>
            <div className="w-20 h-1 bg-brand-gold mx-auto rounded-full mb-8" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-8 rounded-2xl group hover-glow border border-transparent hover:border-brand-gold/30 bg-white/60 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-brand-navy rounded-xl text-brand-gold flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-bold text-heading mb-3 font-outfit">{feature.title}</h4>
                  <p className="text-sm text-gray-600 font-inter leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectOverview;
