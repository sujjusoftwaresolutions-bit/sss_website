import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, GraduationCap, Video } from 'lucide-react';

const WORKSHOP_FEEDBACK = [
  {
    id: 1,
    name: 'K. Arthi Prakash',
    role: 'ALIET Student (25HP1A1201)',
    tag: '6-Day IoT Workshop',
    content: 'Honestly, this workshop felt very different from a regular class. I genuinely enjoyed every session and appreciate the effort put into making it useful, engaging, and comfortable for us. The interactive quizzes gave us a fun way to test what we understood!',
    rating: 5,
  },
  {
    id: 2,
    name: 'L. Gayathri',
    role: 'ALIET Student (25HP1A1205)',
    tag: 'Hands-on IoT Training',
    content: 'The IoT workshop was a really interesting and hands-on learning experience. It helped us understand new IoT concepts in a much more practical way. The friendly and approachable teaching style kept us involved throughout.',
    rating: 5,
  },
  {
    id: 3,
    name: 'U. Likitha Devi',
    role: 'ALIET Student (25HP1A1209)',
    tag: 'IoT & Embedded Projects',
    content: 'The step-by-step explanations helped us understand basic concepts easily and gave us confidence to apply them practically. The team was very patient, supportive, and encouraged us whenever we had doubts.',
    rating: 5,
  },
  {
    id: 4,
    name: 'M. Meenakshi',
    role: 'ALIET Student (25HP1A1212)',
    tag: 'Real-world Practical Lab',
    content: 'I especially liked how theory was connected with real-world practical examples. Whenever we had questions, the team explained the concepts in different ways until we understood them completely!',
    rating: 5,
  },
  {
    id: 5,
    name: 'M. Nissi Niharika',
    role: 'ALIET Student (25HP1A1213)',
    tag: 'Technical Training & Quizzes',
    content: 'The teaching was excellent and easy to follow. The concepts were explained in a simple way, creating a comfortable environment where everyone could participate and share thoughts.',
    rating: 5,
  },
  {
    id: 6,
    name: 'Student Video Feedback 1',
    role: 'ALIET IoT Workshop Participant',
    tag: '📹 Video Review 1',
    content: 'Watch student video feedback on our hands-on IoT & full-stack learning experience.',
    rating: 5,
    isVideo: true,
    videoUrl: '/video5.mp4',
  },
  {
    id: 7,
    name: 'Student Video Feedback 2',
    role: 'Practical Project Workshop Participant',
    tag: '📹 Video Review 2',
    content: 'Watch participant feedback on circuit building and practical lab sessions.',
    rating: 5,
    isVideo: true,
    videoUrl: '/video6.mp4',
  },
  {
    id: 8,
    name: 'Student Video Feedback 3',
    role: 'Technical Training & Mentorship',
    tag: '📹 Video Review 3',
    content: 'Watch student video testimonial on real-world engineering projects and guidance.',
    rating: 5,
    isVideo: true,
    videoUrl: '/video7.mp4',
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-[#050B14] relative overflow-hidden text-white border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none translate-x-1/2" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold font-inter font-bold text-xs uppercase tracking-[0.2em]"
          >
            <GraduationCap size={14} /> STUDENT & CLIENT FEEDBACK
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-outfit"
          >
            Client & Student <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-gold via-amber-200 to-brand-light-gold bg-clip-text text-transparent">
              Success Stories
            </span>
          </motion.h2>
          <p className="text-gray-400 font-inter text-sm sm:text-base">
            Real feedback from engineering students and participants who completed our technical workshops.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WORKSHOP_FEEDBACK.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-brand-gold/40 p-6 sm:p-8 rounded-3xl relative transition-all duration-300 group flex flex-col justify-between backdrop-blur-xl shadow-xl"
            >
              <Quote className="text-white/5 group-hover:text-brand-gold/15 absolute top-6 right-6 w-14 h-14 transition-colors duration-300 pointer-events-none" />
              
              <div className="relative z-10 space-y-4">
                {/* Rating Stars & Tag */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-brand-gold">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="#D4AF37" className="text-brand-gold" />
                    ))}
                  </div>
                  <span className="px-2.5 py-0.5 rounded bg-brand-gold/10 border border-brand-gold/20 text-brand-gold font-inter font-bold text-[10px] uppercase flex items-center gap-1">
                    {item.isVideo && <Video size={12} className="text-brand-gold animate-pulse" />}
                    {item.tag}
                  </span>
                </div>

                {/* Video Player if isVideo is true */}
                {item.isVideo && item.videoUrl && (
                  <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-inner group/video mt-2">
                    <video
                      src={item.videoUrl}
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      className="w-full aspect-video object-cover rounded-2xl"
                    />
                  </div>
                )}
                
                <p className="text-gray-300 font-inter leading-relaxed text-sm sm:text-base italic">
                  "{item.content}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-3 relative z-10">
                <div className="w-11 h-11 bg-gradient-to-br from-brand-gold to-[#B8941F] rounded-full flex items-center justify-center text-[#050B14] font-bold font-outfit text-lg shadow-[0_4px_15px_rgba(212,175,55,0.3)] shrink-0">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-white font-outfit text-base group-hover:text-brand-gold transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-brand-gold/80 text-xs font-inter">{item.role}</p>
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
