import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Brain, Users, GraduationCap, MonitorPlay, Settings } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: 'Industry-Focused Development',
    description: 'We build scalable, production-ready software solutions tailored for modern business requirements.',
    icon: <Code size={32} className="text-brand-gold" />
  },
  {
    title: 'AI-Powered Solutions',
    description: 'Integrating state-of-the-art Artificial Intelligence and Machine Learning models to automate and predict.',
    icon: <Brain size={32} className="text-brand-gold" />
  },
  {
    title: 'Client-Based Software',
    description: 'Delivering precise, high-performance applications based on exact client specifications and goals.',
    icon: <Settings size={32} className="text-brand-gold" />
  },
  {
    title: 'Internship Programs',
    description: 'Bridging the gap between academia and industry with real-world project experience.',
    icon: <Users size={32} className="text-brand-gold" />
  },
  {
    title: 'Training with Certification',
    description: 'Comprehensive technical training programs certified to boost career trajectories.',
    icon: <GraduationCap size={32} className="text-brand-gold" />
  },
  {
    title: 'Modern Technology Workshops',
    description: 'Hands-on workshops covering the latest frameworks, tools, and MERN stack practices.',
    icon: <MonitorPlay size={32} className="text-brand-gold" />
  }
];

const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const el = sectionRef.current;
    
    gsap.fromTo(
      el.querySelector('.section-title'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
        }
      }
    );

    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el.querySelector('.cards-container'),
          start: 'top 85%',
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[#050B14] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-navy/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 section-title">
          <p className="text-brand-gold font-bold text-sm uppercase tracking-[0.2em] mb-2 font-inter">
            CORE FEATURES
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-outfit">Why Choose Us</h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-inter">
            We combine technical excellence with industry insight to deliver solutions that matter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 cards-container">
          {features.map((feature, index) => (
            <div 
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="glass-dark p-8 rounded-2xl group hover-glow relative overflow-hidden transition-all duration-300 transform hover:-translate-y-2 bg-[#081225] border border-white/5"
            >
              {/* Hover gradient background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-16 h-16 bg-[#050B14] border border-white/5 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 font-outfit relative z-10">
                {feature.title}
              </h3>
              
              <p className="text-gray-400 font-inter text-sm leading-relaxed relative z-10">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
