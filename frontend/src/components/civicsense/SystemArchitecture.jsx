import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Cpu, Server, Database, Smartphone, CheckCircle, XCircle } from 'lucide-react';

const techStack = [
  { category: 'Frontend', items: ['React.js', 'Tailwind CSS', 'Framer Motion'] },
  { category: 'Backend', items: ['Node.js', 'Express.js', 'JWT'] },
  { category: 'Database', items: ['MongoDB Atlas'] },
  { category: 'AI Engine', items: ['Flask', 'TensorFlow', 'YOLOv8'] },
];

const workflowSteps = [
  'Citizen uploads issue',
  'Image Validation',
  'AI Prediction',
  'GPS Capture',
  'MongoDB Storage',
  'Authority Dashboard',
  'Status Update'
];

const SystemArchitecture = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [demoState, setDemoState] = useState('idle'); // idle, processing, success, rejected

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % workflowSteps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const runDemo = (type) => {
    setDemoState('processing');
    setTimeout(() => {
      setDemoState(type);
    }, 1500);
  };

  return (
    <section className="py-24 bg-brand-navy text-white relative overflow-hidden">
      {/* Decorative Network Background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-gold via-brand-navy to-brand-navy" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Technology Stack */}
        <div className="mb-32">
          <h2 className="text-4xl font-bold text-center mb-12 font-outfit">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((tech, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-dark p-6 rounded-2xl border border-brand-gold/20 hover:border-brand-gold/50 transition-colors"
              >
                <h3 className="text-xl font-bold text-brand-gold mb-4 font-outfit">{tech.category}</h3>
                <ul className="space-y-2">
                  {tech.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 font-inter text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* System Architecture & Workflow */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
          {/* Architecture Visualization */}
          <div>
            <h3 className="text-3xl font-bold mb-8 font-outfit">System Architecture</h3>
            <div className="flex flex-col items-center space-y-4">
              <motion.div whileHover={{ scale: 1.05 }} className="w-full max-w-sm glass-dark p-4 rounded-xl flex items-center justify-between border-t-2 border-blue-400">
                <span className="font-bold font-outfit">React Frontend</span>
                <Smartphone className="text-blue-400" />
              </motion.div>
              <ArrowDown className="text-brand-gold animate-bounce" />
              
              <motion.div whileHover={{ scale: 1.05 }} className="w-full max-w-sm glass-dark p-4 rounded-xl flex items-center justify-between border-t-2 border-green-400">
                <span className="font-bold font-outfit">Express Backend</span>
                <Server className="text-green-400" />
              </motion.div>
              <ArrowDown className="text-brand-gold animate-bounce" />
              
              <motion.div whileHover={{ scale: 1.05 }} className="w-full max-w-sm glass-dark p-4 rounded-xl flex items-center justify-between border-t-2 border-purple-400">
                <span className="font-bold font-outfit">Flask AI Service (YOLOv8)</span>
                <Cpu className="text-purple-400" />
              </motion.div>
              <ArrowDown className="text-brand-gold animate-bounce" />
              
              <motion.div whileHover={{ scale: 1.05 }} className="w-full max-w-sm glass-dark p-4 rounded-xl flex items-center justify-between border-t-2 border-green-600">
                <span className="font-bold font-outfit">MongoDB Atlas</span>
                <Database className="text-green-600" />
              </motion.div>
            </div>
          </div>

          {/* Workflow Animation */}
          <div>
            <h3 className="text-3xl font-bold mb-8 font-outfit">Live Workflow</h3>
            <div className="relative pl-8 border-l-2 border-white/20 space-y-8 py-4">
              {workflowSteps.map((step, idx) => (
                <div key={idx} className="relative">
                  {/* Indicator Dot */}
                  <motion.div 
                    animate={{
                      backgroundColor: activeStep >= idx ? '#D4AF37' : '#334155',
                      scale: activeStep === idx ? [1, 1.5, 1] : 1,
                      boxShadow: activeStep === idx ? '0 0 15px #D4AF37' : 'none'
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute -left-[41px] top-1 w-4 h-4 rounded-full border-4 border-brand-navy"
                  />
                  <motion.p 
                    animate={{
                      color: activeStep >= idx ? '#FFFFFF' : '#94A3B8',
                      fontWeight: activeStep === idx ? 'bold' : 'normal'
                    }}
                    className="text-lg font-inter"
                  >
                    {step}
                  </motion.p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive AI Demo */}
        <div className="glass-dark rounded-3xl p-8 md:p-12 border border-white/10 text-center">
          <h3 className="text-3xl font-bold mb-4 font-outfit">Live AI Validation Demo</h3>
          <p className="text-gray-400 mb-8 font-inter max-w-2xl mx-auto">
            Test the simulated YOLOv8 model validation engine. The system automatically rejects irrelevant images (e.g., selfies) and accepts civic issues (e.g., garbage, potholes).
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button 
              onClick={() => runDemo('success')}
              disabled={demoState === 'processing'}
              className="px-6 py-3 bg-brand-navy border border-brand-gold text-brand-gold rounded-lg hover:bg-brand-gold hover:text-brand-navy transition-colors font-bold disabled:opacity-50"
            >
              Upload Valid Issue (Garbage)
            </button>
            <button 
              onClick={() => runDemo('rejected')}
              disabled={demoState === 'processing'}
              className="px-6 py-3 bg-brand-navy border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors font-bold disabled:opacity-50"
            >
              Upload Invalid Image (Selfie)
            </button>
          </div>

          {/* Demo Results Area */}
          <div className="h-40 bg-black/30 rounded-xl flex items-center justify-center overflow-hidden relative border border-white/5">
            <AnimatePresence mode="wait">
              {demoState === 'idle' && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-gray-500 font-inter">
                  Select an option above to run the AI simulation.
                </motion.div>
              )}
              {demoState === 'processing' && (
                <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center text-brand-gold">
                  <div className="w-8 h-8 border-4 border-brand-gold border-t-transparent rounded-full animate-spin mb-2" />
                  <span className="font-bold font-outfit animate-pulse">Running YOLOv8 Detection...</span>
                </motion.div>
              )}
              {demoState === 'success' && (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-green-400">
                  <CheckCircle size={40} className="mb-2" />
                  <span className="font-bold text-xl font-outfit mb-1">Validated Successfully</span>
                  <span className="text-sm font-inter">Predicted Class: <strong>Garbage</strong> | Confidence: <strong>96%</strong></span>
                </motion.div>
              )}
              {demoState === 'rejected' && (
                <motion.div key="rejected" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-red-400">
                  <XCircle size={40} className="mb-2" />
                  <span className="font-bold text-xl font-outfit mb-1">Image Rejected</span>
                  <span className="text-sm font-inter">Reason: No civic issue detected. Please upload a valid image.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SystemArchitecture;
