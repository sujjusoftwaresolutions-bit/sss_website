import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Cpu, CheckCircle2, Maximize2, X, Sparkles, BookOpen, ArrowRight, ShieldCheck, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const ALL_WORKSHOP_PHOTOS = [
  { id: 1, url: '/workshops/aliet_1.jpg', title: 'Interactive Technical Lecture', category: 'Lectures & Labs', venue: 'ALIET Vijayawada', date: 'August 4, 2026', desc: 'Expert mentors delivering live technical concepts, AI architecture, and project engineering fundamentals.' },
  { id: 2, url: '/workshops/aliet_2.jpg', title: 'Valedictory Certificate Awarding', category: 'Certificates', venue: 'ALIET Seminar Hall', date: 'August 8, 2026', desc: 'Awarding official certificates of completion with faculty members at ALIET.' },
  { id: 3, url: '/workshops/aliet_3.jpg', title: 'IoT & Breadboard Hardware Showcase', category: 'Project Prototypes', venue: 'Embedded Systems Lab', date: 'August 5, 2026', desc: 'Student teams demonstrating microcontroller circuit prototypes and sensor wiring.' },
  { id: 4, url: '/workshops/aliet_4.jpg', title: 'Practical Coding & Debugging Session', category: 'Lectures & Labs', venue: 'IT Computer Lab', date: 'August 5, 2026', desc: 'Step-by-step practical code implementation under expert mentor supervision.' },
  { id: 5, url: '/workshops/aliet_5.jpg', title: 'Computer Laboratory Overview', category: 'Lectures & Labs', venue: 'ALIET Vijayawada', date: 'August 5, 2026', desc: 'Full view of engineering students engaged in hands-on computer lab training.' },
  { id: 6, url: '/workshops/aliet_6.jpg', title: 'Hardware Circuit Assembly Team', category: 'Project Prototypes', venue: 'Hardware Prototyping Lab', date: 'August 5, 2026', desc: 'Students assembling sensor circuit boards and microcontroller modules.' },
  { id: 7, url: '/workshops/aliet_7.jpg', title: 'Seminar Presentation & Mentorship', category: 'Lectures & Labs', venue: 'Lecture Hall', date: 'August 4, 2026', desc: 'Interactive seminar session introducing real-world software architecture.' },
  { id: 8, url: '/workshops/aliet_8.jpg', title: 'Certificate Distribution Ceremony', category: 'Certificates', venue: 'ALIET Auditorium', date: 'August 8, 2026', desc: 'Recognizing student achievements with faculty and industry mentors.' },
  { id: 9, url: '/workshops/aliet_9.jpg', title: 'Faculty Hardware Inspection', category: 'Project Prototypes', venue: 'Project Lab', date: 'August 5, 2026', desc: 'Students presenting working hardware prototype to department faculty.' },
  { id: 10, url: '/workshops/aliet_10.jpg', title: 'Student Project Defense on Laptop', category: 'Project Prototypes', venue: 'Evaluation Desk', date: 'August 5, 2026', desc: 'Live demonstration of web system and IoT sensor data pipeline.' },
  { id: 11, url: '/workshops/aliet_11.jpg', title: 'Academic Excellence Certificate Award', category: 'Certificates', venue: 'ALIET Seminar Hall', date: 'August 8, 2026', desc: 'Distributing certificates to top performing workshop participants.' },
  { id: 12, url: '/workshops/aliet_12.jpg', title: 'Female Student Hardware Demo', category: 'Project Prototypes', venue: 'IoT Testing Lab', date: 'August 5, 2026', desc: 'Team demonstrating working circuit design and sensor code execution.' },
  { id: 13, url: '/workshops/aliet_13.jpg', title: 'Medal & Certificate Distribution', category: 'Certificates', venue: 'Main Stage', date: 'August 8, 2026', desc: 'Honoring top project builders with medals and certificates of merit.' },
  { id: 14, url: '/workshops/aliet_14.jpg', title: 'Faculty Certificate Honors', category: 'Certificates', venue: 'Seminar Hall', date: 'August 8, 2026', desc: 'Faculty members presenting completion certificates to student teams.' },
  { id: 15, url: '/workshops/aliet_15.jpg', title: 'Team Certificate Recognition', category: 'Certificates', venue: 'ALIET Event Hall', date: 'August 8, 2026', desc: 'Student group receiving certificates of completion.' },
  { id: 16, url: '/workshops/aliet_16.jpg', title: 'Live Sensor Telemetry Demo', category: 'Project Prototypes', venue: 'IT Lab', date: 'August 5, 2026', desc: 'Explaining sensor telemetry code logic to faculty mentor.' },
  { id: 17, url: '/workshops/aliet_17.jpg', title: 'Microcontroller Circuit Review', category: 'Project Prototypes', venue: 'Breadboard Testing Desk', date: 'August 5, 2026', desc: 'Students explaining circuit wiring and breadboard connections.' },
  { id: 18, url: '/workshops/aliet_18.jpg', title: 'Medal Presentation Ceremony', category: 'Certificates', venue: 'Valedictory Podium', date: 'August 8, 2026', desc: 'Awarding medals to workshop prize winners.' },
];

const WORKSHOP_TRACKS = [
  {
    icon: Cpu,
    title: 'IoT & Embedded Hardware Systems',
    desc: 'Microcontrollers, sensor interfacing, circuit assembly, real-time telemetry, and IoT cloud connectivity.',
  },
  {
    icon: Sparkles,
    title: 'Applied AI & Machine Learning',
    desc: 'Neural networks, computer vision, data preprocessing, model deployment, and real-world AI applications.',
  },
  {
    icon: BookOpen,
    title: 'Full-Stack Web & App Engineering',
    desc: 'React, Node.js, REST APIs, responsive UI design, database schemas, and cloud deployment pipelines.',
  },
];

const Workshops = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [activeTab, setActiveTab] = useState('All');

  const filteredPhotos = activeTab === 'All'
    ? ALL_WORKSHOP_PHOTOS
    : ALL_WORKSHOP_PHOTOS.filter(p => p.category === activeTab);

  return (
    <div className="w-full bg-[#050B14] min-h-screen text-white pt-24 pb-16 relative overflow-hidden">
      <SEO
        title="Technical Workshops | SUJJU Software Solutions"
        description="Hands-on technical workshops, college training programs, and industry certifications by SUJJU Software Solutions."
      />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold font-inter font-bold text-xs uppercase tracking-[0.2em]">
            <Cpu size={14} /> ACADEMIC WORKSHOPS & CERTIFICATION
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-outfit leading-tight tracking-tight">
            Industry-Ready <br />
            <span className="bg-gradient-to-r from-brand-gold via-amber-200 to-brand-light-gold bg-clip-text text-transparent">
              Technical Workshops
            </span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg font-inter leading-relaxed">
            Bridge the gap between theoretical knowledge and real-world technology. We organize hands-on technical workshops, hardware prototyping labs, and AI training programs at top engineering institutions.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a
              href="#gallery-section"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#F4C542] to-[#D4AF37] text-brand-navy font-outfit font-bold text-base shadow-[0_4px_25px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 transition-all"
            >
              View ALIET Workshop Gallery ({ALL_WORKSHOP_PHOTOS.length} Photos)
            </a>
            <Link
              to="/verify-certificate"
              className="px-8 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/15 font-outfit font-semibold text-base flex items-center gap-2 transition-all"
            >
              <ShieldCheck size={18} className="text-brand-gold" />
              Verify Certificate
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Workshop Highlight: ALIET 6-Day Workshop */}
      <section id="gallery-section" className="py-16 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-10 md:p-12 relative overflow-hidden backdrop-blur-2xl shadow-2xl">
          
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
            <div>
              <span className="px-3 py-1 rounded bg-brand-gold text-brand-navy font-outfit font-extrabold text-xs uppercase tracking-wider">
                FEATURED EVENT
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-outfit text-white mt-2">
                6-Day Technical Workshop at ALIET Gallery
              </h2>
            </div>
            
            <div className="flex flex-col sm:items-end text-sm text-gray-300 font-inter">
              <span className="flex items-center gap-2 text-brand-gold font-bold">
                <Calendar size={16} /> August 3rd – 8th, 2026 (6 Days)
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                <MapPin size={14} className="text-brand-gold" /> Andhra Loyola Institute of Engineering and Technology, Vijayawada
              </span>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
              {['All', 'Lectures & Labs', 'Project Prototypes', 'Certificates'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-outfit font-bold transition-all ${
                    activeTab === tab
                      ? 'bg-brand-gold text-brand-navy shadow-md'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <span className="text-xs text-gray-400 font-inter">
              Displaying {filteredPhotos.length} workshop photos
            </span>
          </div>

          {/* Grid Layout for All 18 Gallery Photos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
            {filteredPhotos.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedImg(img)}
                className="group relative bg-[#0a152e] border border-white/10 rounded-2xl overflow-hidden cursor-pointer shadow-xl flex flex-col"
              >
                <div className="aspect-[4/3] w-full overflow-hidden relative bg-black">
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 size={16} />
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-outfit font-bold text-white text-sm mb-1 group-hover:text-brand-gold transition-colors line-clamp-1">
                      {img.title}
                    </h3>
                    <p className="text-gray-400 text-xs font-inter line-clamp-2">{img.desc}</p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400 font-inter">
                    <span>{img.date}</span>
                    <span className="text-brand-gold font-medium">Inspect</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Workshop Key Takeaways */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
              <h4 className="font-outfit font-bold text-brand-gold text-lg">Comprehensive Curriculum</h4>
              <p className="text-xs text-gray-300 font-inter leading-relaxed">
                6 days of intensive instruction covering hardware prototyping, AI algorithms, software engineering principles, and interactive lab sessions.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
              <h4 className="font-outfit font-bold text-brand-gold text-lg">Hardware & Project Prototypes</h4>
              <p className="text-xs text-gray-300 font-inter leading-relaxed">
                Students built physical microcontroller projects, sensor telemetry systems, and working hardware prototypes directly in the lab.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
              <h4 className="font-outfit font-bold text-brand-gold text-lg">Industry Certification</h4>
              <p className="text-xs text-gray-300 font-inter leading-relaxed">
                Every participant completed practical evaluations and received verifiable certificates of completion issued by SUJJU Software Solutions.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Workshop Tracks */}
      <section className="py-16 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-brand-gold font-inter font-bold text-xs uppercase tracking-[0.2em] mb-2">TRAINING PROGRAMS</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-outfit text-white">Our Workshop Specializations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {WORKSHOP_TRACKS.map((track, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 hover:border-brand-gold/40 transition-all duration-300 space-y-4 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform">
                <track.icon size={28} />
              </div>
              <h3 className="text-xl font-bold font-outfit text-white">{track.title}</h3>
              <p className="text-gray-300 text-sm font-inter leading-relaxed">{track.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action for Colleges */}
      <section className="py-16 px-4 sm:px-6 md:px-12 max-w-5xl mx-auto text-center">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-brand-gold/20 via-brand-navy to-brand-gold/10 border border-brand-gold/30 shadow-2xl space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-outfit text-white">
            Want to Host a Workshop at Your College?
          </h2>
          <p className="text-gray-300 text-base font-inter max-w-2xl mx-auto">
            We partner with colleges and engineering institutes to deliver tailored 3-day to 6-day technical workshops with hardware kits, software setups, and certified mentors.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-gold text-brand-navy font-outfit font-extrabold text-base shadow-[0_4px_25px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 transition-all"
            >
              <span>Schedule College Workshop</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#0a152e] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setSelectedImg(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-white/20 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="max-h-[70vh] bg-black flex items-center justify-center">
                <img
                  src={selectedImg.url}
                  alt={selectedImg.title}
                  className="max-h-[70vh] w-auto object-contain"
                />
              </div>

              <div className="p-6 bg-[#0a152e]">
                <div className="flex items-center gap-2 text-brand-gold font-inter text-xs font-bold uppercase mb-1">
                  <span>{selectedImg.venue}</span> • <span>{selectedImg.date}</span>
                </div>
                <h3 className="text-2xl font-bold text-white font-outfit mb-2">{selectedImg.title}</h3>
                <p className="text-gray-300 text-sm font-inter">{selectedImg.desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Workshops;
