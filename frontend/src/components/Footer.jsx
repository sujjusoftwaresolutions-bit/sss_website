import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-navy pt-20 pb-10 text-gray-300 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img
                src="/logo.jpeg"
                alt="SUJJU Software Solutions Logo"
                style={{
                  width: 100,
                  height: 100,
                  objectFit: 'contain',
                  borderRadius: 12,
                  filter: 'drop-shadow(0 0 10px rgba(212,175,55,0.5))',
                }}
              />
              <div className="flex flex-col leading-tight">
                <span className="font-outfit font-extrabold text-white" style={{ fontSize: 28 }}>
                  SUJJU Software
                </span>
                <span className="font-inter font-semibold text-brand-gold/80" style={{ fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                  Solutions
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6 font-inter">
              Transforming Ideas into Intelligent Digital Solutions. We deliver premium software, AI integrations, and professional technical training.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-brand-navy transition-colors font-bold text-xs">
                IN
              </a>
              <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-brand-navy transition-colors font-bold text-xs">
                TW
              </a>
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-brand-navy transition-colors font-bold text-xs">
                FB
              </a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-brand-navy transition-colors font-bold text-xs">
                IG
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 font-outfit">Quick Links</h3>
            <ul className="space-y-3 font-inter text-sm">
              <li><Link to="/about" className="hover:text-brand-gold transition-colors">About Us</Link></li>
              <li><Link to="/civicsense-ai" className="hover:text-brand-gold transition-colors">CivicSense AI</Link></li>
              <li><Link to="/services" className="hover:text-brand-gold transition-colors">Our Services</Link></li>
              <li><Link to="/contact" className="hover:text-brand-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 font-outfit">Services</h3>
            <ul className="space-y-3 font-inter text-sm">
              <li><Link to="/services" className="hover:text-brand-gold transition-colors">Software Development</Link></li>
              <li><Link to="/services" className="hover:text-brand-gold transition-colors">AI Solutions</Link></li>
              <li><Link to="/services" className="hover:text-brand-gold transition-colors">Internship Programs</Link></li>
              <li><Link to="/services" className="hover:text-brand-gold transition-colors">Technical Training</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 font-outfit">Contact Us</h3>
            <ul className="space-y-4 font-inter text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-gold mt-1 shrink-0" />
                <span>2nd Floor, Mahalakshmi Complex-2,<br/>Near Apsara Theatre, Vijayawada,<br/>Andhra Pradesh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-gold shrink-0" />
                <span>+91 9440420820</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-gold shrink-0" />
                <span>info@sujjusoftware.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-inter">
            &copy; {new Date().getFullYear()} SUJJU Software Solutions. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-brand-navy transition-colors"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
