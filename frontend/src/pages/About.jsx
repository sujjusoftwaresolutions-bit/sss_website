import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, Shield, GraduationCap, Star, Users, CheckCircle, 
  Code, Server, MonitorPlay, Sparkles, Award, Rocket, Target, HeartHandshake, Compass, Play, Pause, Volume2, VolumeX
} from 'lucide-react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

const stats = [
  { value: '5,000+', label: 'Students Mentored', icon: <GraduationCap className="text-brand-gold w-6 h-6" /> },
  { value: '50+', label: 'Projects Delivered', icon: <Rocket className="text-sky-400 w-6 h-6" /> },
  { value: '100%', label: 'Hands-on Practical', icon: <Award className="text-brand-gold w-6 h-6" /> },
  { value: '24/7', label: 'Dedicated Support', icon: <HeartHandshake className="text-emerald-400 w-6 h-6" /> },
];

const coreValues = [
  { 
    icon: <Lightbulb className="w-7 h-7 text-brand-gold" />, 
    title: 'Innovation First', 
    desc: 'Pushing technological boundaries with modern AI, Machine Learning, and full-stack solutions.' 
  },
  { 
    icon: <Shield className="w-7 h-7 text-sky-400" />, 
    title: 'Integrity & Trust', 
    desc: 'Transparent communication, reliable project execution, and authentic industry certification.' 
  },
  { 
    icon: <GraduationCap className="w-7 h-7 text-emerald-400" />, 
    title: 'Continuous Learning', 
    desc: 'Empowering students and team members with future-ready skills and production insights.' 
  },
  { 
    icon: <Star className="w-7 h-7 text-brand-gold" />, 
    title: 'Engineering Quality', 
    desc: 'Uncompromising standards, clean code architecture, and high-performance scalability.' 
  },
  { 
    icon: <Users className="w-7 h-7 text-indigo-400" />, 
    title: 'Active Collaboration', 
    desc: 'Working closely with colleges, clients, and students to build meaningful impactful technology.' 
  },
  { 
    icon: <CheckCircle className="w-7 h-7 text-brand-light-gold" />, 
    title: 'Outcome-Driven Success', 
    desc: 'Ensuring real career transformations and successful enterprise deployments.' 
  }
];

// ─── AI / Tech Showcase Videos ───
const showcaseVideos = [
  {
    id: 1,
    title: 'AI & Deep Learning Innovation',
    tag: '🤖 AI & Neural Tech',
    desc: 'Intelligent computer vision and machine learning models tailored for real-world automated problem solving.',
    videoUrl: '/video1.mp4',
    poster: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Full-Stack Production Development',
    tag: '⚡ Web & Cloud Stack',
    desc: 'Building responsive, scalable web applications with MERN, Next.js, and cloud deployment pipelines.',
    videoUrl: '/video2.mp4',
    poster: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Hands-on Student Mentorship',
    tag: '🎓 Internship Excellence',
    desc: 'Direct practical training where students build, debug, and ship production-ready applications with industry mentors.',
    videoUrl: '/video3.mp4',
    poster: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'CivicSense AI & Smart Solutions',
    tag: '🏛️ Smart City Tech',
    desc: 'Pioneering automated civic road scanning and municipal intelligence systems with high accuracy AI.',
    videoUrl: '/video4.mp4',
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
  },
];

const roadmapSteps = [
  {
    year: 'Phase 01',
    title: 'Foundational Vision',
    desc: 'Established with the core mission to close the gap between college education and industry engineering standards.'
  },
  {
    year: 'Phase 02',
    title: 'Student Internships & AI Growth',
    desc: 'Expanded into specialized training in MERN stack, Python AI, and verified internship certification programs.'
  },
  {
    year: 'Phase 03',
    title: 'CivicSense AI & Smart Innovations',
    desc: 'Pioneered proprietary civic and municipal AI solutions while expanding enterprise client services across India.'
  },
  {
    year: 'Phase 04',
    title: 'Global Tech & Academic Ecosystem',
    desc: 'Empowering thousands of aspiring engineers with verifiable credentials, real project portfolios, and career launches.'
  }
];

const formatTime = (secs) => {
  if (!secs || isNaN(secs)) return '00:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
};

const VideoCard = ({ video }) => {
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const timeTextRef = useRef(null);
  const playBtnRef = useRef(null);
  const muteBtnRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      if (playBtnRef.current) playBtnRef.current.style.display = 'none';
    } else {
      v.pause();
      if (playBtnRef.current) playBtnRef.current.style.display = 'flex';
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    if (muteBtnRef.current) {
      muteBtnRef.current.innerText = v.muted ? '🔇 Muted' : '🔊 Audio On';
      muteBtnRef.current.className = v.muted
        ? 'absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full backdrop-blur-md text-[11px] font-bold font-inter bg-black/70 text-gray-300 border border-white/20 hover:border-brand-gold cursor-pointer'
        : 'absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full backdrop-blur-md text-[11px] font-bold font-inter bg-brand-gold text-brand-navy border border-brand-gold shadow-[0_0_12px_rgba(212,175,55,0.6)] cursor-pointer';
    }
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;

    // Seamless pre-end loop rewind before browser hits hard ended pause
    if (v.currentTime >= v.duration - 0.15) {
      v.currentTime = 0.01;
      v.play().catch(() => {});
    }

    if (progressRef.current) {
      progressRef.current.style.width = `${(v.currentTime / v.duration) * 100}%`;
    }
    if (timeTextRef.current) {
      timeTextRef.current.innerText = `${formatTime(v.currentTime)} / ${formatTime(v.duration)}`;
    }
  };

  const handleSeek = (e) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    v.currentTime = pos * v.duration;
  };

  return (
    <div className="bg-[#081225]/90 rounded-2xl overflow-hidden border border-white/10 hover:border-brand-gold/50 shadow-xl group transition-all duration-300 flex flex-col">
      {/* Video Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          src={video.videoUrl}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
          onClick={togglePlay}
        />
        
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#081225]/80 via-transparent to-transparent pointer-events-none" />

        {/* Tag Badge */}
        <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-brand-gold/40 text-xs font-bold text-brand-gold font-inter">
          {video.tag}
        </div>

        {/* Mute/Audio Pill Toggle */}
        <button
          ref={muteBtnRef}
          onClick={toggleMute}
          className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full backdrop-blur-md text-[11px] font-bold font-inter bg-black/70 text-gray-300 border border-white/20 hover:border-brand-gold cursor-pointer"
        >
          🔇 Muted
        </button>

        {/* Live Time Counter */}
        <div 
          ref={timeTextRef}
          className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[11px] font-mono font-bold text-gray-200"
        >
          00:00 / 00:08
        </div>

        {/* Center Play Overlay when paused */}
        <button
          ref={playBtnRef}
          onClick={togglePlay}
          style={{ display: 'none' }}
          className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-brand-gold text-brand-navy items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.8)] hover:scale-110 transition-transform z-20 cursor-pointer"
        >
          <Play size={24} className="ml-1 fill-brand-navy" />
        </button>

        {/* Smooth Seamless Timeline Progress Bar */}
        <div 
          onClick={handleSeek}
          className="absolute bottom-0 left-0 right-0 h-2 bg-white/20 cursor-pointer z-20 group/bar hover:h-3 transition-all"
          title="Click to seek video"
        >
          <div 
            ref={progressRef}
            className="h-full bg-gradient-to-r from-brand-gold via-brand-light-gold to-sky-400 relative"
            style={{ width: '0%' }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md opacity-0 group-hover/bar:opacity-100 transition-opacity" />
          </div>
        </div>

      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-xl font-bold text-white mb-2 font-outfit group-hover:text-brand-gold transition-colors">
            {video.title}
          </h3>
          <p className="text-sm text-gray-300 font-inter leading-relaxed">
            {video.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div className="w-full bg-transparent relative overflow-hidden min-h-screen">
      <SEO 
        title="About Us" 
        description="Learn about SUJJU Software Solutions, our mission, vision, and core values. We bridge the gap between academia and industry." 
      />

      {/* ─── Hero Section ─── */}
      <section className="relative pt-32 pb-20 text-white overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-14">
            
            {/* Left Content (clean, no duplicate left logo) */}
            <div className="flex-1 text-center lg:text-left">
              
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/25 mb-6"
              >
                <Sparkles size={16} className="text-brand-gold animate-pulse" />
                <span className="text-brand-gold font-bold text-xs uppercase tracking-[0.2em] font-inter">
                  Innovating Academia & Industry
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-outfit tracking-tight leading-[1.1]"
              >
                About{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-brand-light-gold to-brand-gold">
                  SUJJU Software
                </span>{' '}
                Solutions
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg sm:text-xl text-gray-300 font-inter leading-relaxed max-w-2xl mb-8"
              >
                A premier technology development and training hub dedicated to crafting intelligent AI systems, enterprise software, and transforming aspiring students into industry-ready software engineers.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
              >
                <Link to="/internships">
                  <button className="px-7 py-3.5 rounded-full font-bold font-outfit text-brand-navy bg-gradient-to-r from-brand-light-gold to-brand-gold hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-105 transition-all duration-300 cursor-pointer">
                    Explore Internships →
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="px-7 py-3.5 rounded-full font-bold font-outfit text-white border border-white/20 hover:border-brand-gold hover:text-brand-gold backdrop-blur-md bg-white/5 transition-all duration-300 cursor-pointer">
                    Contact Our Team
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* Right — 3D Holographic Card & Founder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="flex-shrink-0 relative flex flex-col items-center"
            >
              {/* Outer Glowing Hologram Frame */}
              <div className="relative p-1 rounded-3xl bg-gradient-to-b from-brand-gold/40 via-sky-500/20 to-brand-gold/40 shadow-[0_0_50px_rgba(212,175,55,0.25)]">
                <div className="bg-[#081225]/90 backdrop-blur-xl p-8 rounded-[22px] flex flex-col items-center text-center max-w-sm border border-white/10">
                  
                  {/* Founder Image with dual glowing orbit rings */}
                  <div className="relative mb-6">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className="absolute -inset-3 rounded-full border border-dashed border-brand-gold/40"
                    />
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                      className="absolute -inset-1.5 rounded-full border border-sky-400/30"
                    />
                    <img
                      src="/chinnu.jpeg"
                      alt="Uppu Chandra Sekhar – Founder & CEO, SUJJU Software Solutions"
                      className="relative z-10 w-44 h-44 sm:w-48 sm:h-48 object-cover rounded-full border-4 border-brand-gold/70 shadow-2xl"
                    />
                  </div>

                  <h3 className="text-2xl font-bold text-white font-outfit">Uppu Chandra Sekhar</h3>
                  <p className="text-brand-gold font-bold text-xs uppercase tracking-widest font-inter mb-3">
                    Founder &amp; CEO
                  </p>
                  <p className="text-gray-300 text-sm font-inter leading-relaxed">
                    "Our goal is not just to teach code, but to inspire students to build solutions that solve real-world problems."
                  </p>

                  <div className="mt-4 pt-4 border-t border-white/10 w-full flex items-center justify-around text-xs text-gray-400 font-inter">
                    <div>
                      <span className="block text-white font-bold text-sm">Tech Leader</span>
                      <span>Visionary</span>
                    </div>
                    <div className="h-6 w-px bg-white/10" />
                    <div>
                      <span className="block text-brand-gold font-bold text-sm">AI & MERN</span>
                      <span>Architect</span>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── Key Metrics / Impact Ribbon ─── */}
      <section className="relative z-10 py-12 bg-[#081225]/80 border-y border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-4"
              >
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 mb-3">
                  {stat.icon}
                </div>
                <h4 className="text-3xl sm:text-4xl font-bold text-white font-outfit mb-1">{stat.value}</h4>
                <p className="text-xs sm:text-sm text-gray-400 font-inter font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Mission & Vision (Futuristic Dual Cards) ─── */}
      <section className="relative z-10 py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-brand-gold font-bold text-xs uppercase tracking-[0.25em] mb-2 font-inter">OUR PURPOSE</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white font-outfit">Mission & Vision</h2>
          <div className="w-20 h-1 bg-brand-gold mx-auto rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Mission */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="p-10 sm:p-12 rounded-3xl bg-[#081225]/90 border border-brand-gold/30 shadow-2xl relative overflow-hidden group backdrop-blur-xl"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-brand-gold" />
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-brand-gold/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            
            <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center mb-6 text-brand-gold">
              <Target size={28} />
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-outfit">Our Mission</h3>
            <p className="text-gray-300 font-inter text-base sm:text-lg leading-relaxed">
              To deliver groundbreaking, scalable software & AI solutions while actively empowering aspiring developers through experiential learning, real-time code environments, and verified industry credentials.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="p-10 sm:p-12 rounded-3xl bg-[#081225]/90 border border-sky-400/30 shadow-2xl relative overflow-hidden group backdrop-blur-xl"
          >
            <div className="absolute top-0 right-0 w-2 h-full bg-sky-400" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-sky-400/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            
            <div className="w-14 h-14 rounded-2xl bg-sky-400/10 border border-sky-400/30 flex items-center justify-center mb-6 text-sky-400">
              <Compass size={28} />
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-outfit">Our Vision</h3>
            <p className="text-gray-300 font-inter text-base sm:text-lg leading-relaxed">
              To be India’s most trusted technology powerhouse where innovation meets education, bridging the gap between classroom knowledge and cutting-edge software engineering.
            </p>
          </motion.div>

        </div>
      </section>

      {/* ─── Core Values (Interactive 3D Hover Cards) ─── */}
      <section className="relative z-10 py-24 bg-[#060D1A]/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-brand-gold font-bold text-xs uppercase tracking-[0.25em] mb-2 font-inter">WHAT DRIVES US</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-outfit">Our Core Values</h2>
            <div className="w-20 h-1 bg-brand-gold mx-auto rounded-full mb-6" />
            <p className="text-gray-400 font-inter max-w-2xl mx-auto text-base">
              The fundamental principles that guide our technical design, student mentorship, and client engagements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="p-8 rounded-2xl bg-[#081225]/80 border border-white/10 hover:border-brand-gold/50 shadow-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] group transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 rounded-bl-full group-hover:scale-150 transition-transform duration-500" />
                <div className="w-14 h-14 bg-[#050B14] rounded-2xl flex items-center justify-center border border-white/10 mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-outfit group-hover:text-brand-gold transition-colors">{value.title}</h3>
                <p className="text-gray-300 font-inter text-sm sm:text-base leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Company Roadmap / Journey ─── */}
      <section className="relative z-10 py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-brand-gold font-bold text-xs uppercase tracking-[0.25em] mb-2 font-inter">THE JOURNEY</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white font-outfit">Our Growth Roadmap</h2>
          <div className="w-20 h-1 bg-brand-gold mx-auto rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roadmapSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="p-7 rounded-2xl bg-[#081225]/80 border border-white/10 hover:border-brand-gold/40 relative flex flex-col justify-between"
            >
              <div className="mb-4">
                <span className="text-xs font-bold font-inter text-brand-gold px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30">
                  {step.year}
                </span>
                <h4 className="text-xl font-bold text-white font-outfit mt-4 mb-2">{step.title}</h4>
                <p className="text-sm text-gray-300 font-inter leading-relaxed">{step.desc}</p>
              </div>
              <div className="h-1 w-full bg-gradient-to-r from-brand-gold to-sky-400 rounded-full mt-4 opacity-50" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Why Students & Clients Choose Us (AI & Tech Video Showcases) ─── */}
      <section className="relative z-10 py-24 bg-[#081225]/90 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-brand-gold font-bold text-xs uppercase tracking-[0.25em] mb-2 font-inter">THE ADVANTAGE</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-outfit">Why Students &amp; Clients Choose Us</h2>
            <div className="w-20 h-1 bg-brand-gold mx-auto rounded-full mb-4" />
            <p className="text-gray-400 font-inter max-w-2xl mx-auto text-base">
              Experience the power of our modern AI frameworks, production web development, and hands-on student project culture in action.
            </p>
          </div>

          {/* Video Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {showcaseVideos.map((video, idx) => (
              <VideoCard key={video.id} video={video} idx={idx} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
