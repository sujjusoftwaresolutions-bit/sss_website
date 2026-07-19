import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { submitContact } from '../utils/api';
import SEO from '../components/SEO';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      await submitContact(formData);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message || 'Failed to send message. Please try again later.');
    }
    
    // Reset status after 5 seconds
    setTimeout(() => {
      setStatus('idle');
    }, 5000);
  };

  return (
    <div className="w-full bg-brand-bg relative overflow-hidden">
      <SEO 
        title="Contact Us" 
        description="Get in touch with SUJJU Software Solutions. We are here to help you transform your ideas into intelligent digital solutions." 
      />
      
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-navy/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      {/* Header */}
      <div className="pt-32 pb-16 text-center max-w-4xl mx-auto px-6 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold text-heading mb-6 font-outfit tracking-tight"
        >
          Let's Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-light-gold">Together</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 font-inter"
        >
          Have a project in mind or want to learn more about our training programs? We'd love to hear from you.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Contact Information Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:w-1/3 space-y-8"
          >
            <div className="glass p-8 rounded-2xl bg-white shadow-xl">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative mx-auto mb-8 flex justify-center"
                style={{ width: 180 }}
              >
                <div 
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)',
                    filter: 'blur(10px)',
                  }}
                />
                <img 
                  src="/logo.jpeg" 
                  alt="SUJJU Software Solutions"
                  className="relative z-10 w-full h-auto object-contain rounded-xl"
                  style={{ filter: 'drop-shadow(0 4px 15px rgba(0,0,0,0.1))' }}
                />
              </motion.div>
              <h3 className="text-2xl font-bold text-heading font-outfit">Chandrasekhar Uppu</h3>
              <p className="text-brand-gold font-bold text-sm mb-6 uppercase tracking-wider">Founder, SUJJU Software Solutions</p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#050B14] rounded-lg flex items-center justify-center text-white shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-heading font-inter text-sm mb-1">Office Address</h4>
                    <p className="text-sm text-muted leading-relaxed font-inter">
                      2nd Floor, Mahalakshmi Complex-2,<br/>Near Apsara Theatre, Vijayawada,<br/>Andhra Pradesh
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#050B14] rounded-lg flex items-center justify-center text-white shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-heading font-inter text-sm mb-1">Phone</h4>
                    <p className="text-sm text-muted font-inter">+91 9440420820</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#050B14] rounded-lg flex items-center justify-center text-white shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-heading font-inter text-sm mb-1">Email</h4>
                    <p className="text-sm text-muted font-inter">info@sujjusoftware.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#050B14] rounded-lg flex items-center justify-center text-white shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-heading font-inter text-sm mb-1">Business Hours</h4>
                    <p className="text-sm text-muted font-inter">Mon - Sat: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100 flex gap-4">
                <a href="https://wa.me/918885856060" target="_blank" rel="noopener noreferrer" className="flex-1 px-4 py-3 bg-[#25D366] text-white rounded-lg flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors shadow-lg font-bold">
                  WhatsApp
                </a>
                <a href="tel:+919440420820" className="flex-1 px-4 py-3 bg-brand-navy text-white rounded-lg flex items-center justify-center gap-2 hover:bg-opacity-90 transition-colors shadow-lg font-bold">
                  Call Now
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:w-2/3"
          >
            <div className="glass-dark bg-[#081225] border-white/5 p-8 md:p-12 rounded-2xl shadow-xl h-full">
              <h3 className="text-3xl font-bold text-heading mb-8 font-outfit">Send us a Message</h3>
              
              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6 p-4 bg-green-500/10 text-green-400 rounded-lg flex items-center gap-3 border border-green-500/20">
                    <CheckCircle className="shrink-0" />
                    <p className="font-inter font-medium">Your message has been sent successfully. We will get back to you soon!</p>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6 p-4 bg-red-500/10 text-red-400 rounded-lg flex items-center gap-3 border border-red-500/20">
                    <AlertCircle className="shrink-0" />
                    <p className="font-inter font-medium">{errorMessage}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-body mb-2 font-inter">Full Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all bg-white text-on-light font-inter" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-body mb-2 font-inter">Email Address *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all bg-white text-on-light font-inter" placeholder="john@example.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-body mb-2 font-inter">Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all bg-white text-on-light font-inter" placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-body mb-2 font-inter">Subject *</label>
                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all bg-white text-on-light font-inter" placeholder="How can we help you?" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-body mb-2 font-inter">Your Message *</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows="5" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all bg-white text-on-light font-inter resize-none" placeholder="Tell us about your project..."></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-brand-navy text-white rounded-lg font-bold text-lg hover:bg-brand-gold hover:text-brand-navy transition-colors flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {status === 'loading' ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Google Maps Embed */}
      <div className="w-full h-[400px] grayscale hover:grayscale-0 transition-all duration-700">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15301.696349942621!2d80.6121404099499!3d16.505030222046804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35f00155555555%3A0x1234567890abcdef!2sApsara%20Theatre%2C%20Vijayawada!5e0!3m2!1sen!2sin!4v1689000000000!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="SUJJU Software Solutions Location"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
