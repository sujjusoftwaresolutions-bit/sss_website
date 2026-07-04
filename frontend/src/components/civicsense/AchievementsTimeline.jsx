import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Star } from 'lucide-react';

const achievements = [
  {
    event: 'SAAVISHKAR 2K26',
    college: 'Vijaya Institute of Technology for Women',
    students: 'UPPU CHANDRASEKHAR (22HP1A4438), CH PRASANTH (22HP1A4451)',
    prizes: [
      { text: 'First Prize – Project Expo (CSE Department)', type: 'first' },
      { text: 'Second Prize – Project Expo (CSE-AIML)', type: 'second' },
      { text: 'Second Prize – Technical Quiz (CSE-Data Science)', type: 'second' },
      { text: 'Second Prize – PPT Presentation (ECE Department)', type: 'second' }
    ]
  },
  {
    event: 'VG-TECHNOTSAV 2K26',
    college: 'Vikas College',
    students: 'U. Chandrasekhar, A. Merlin',
    prizes: [
      { text: 'First Prize – Project Expo', type: 'first' }
    ]
  },
  {
    event: 'SRUJANA 2026',
    college: 'Yalamanchili Janardhana Rao DMS College of Engineering',
    prizes: [
      { text: 'Second Prize – Project Expo', type: 'second' }
    ]
  },
  {
    event: "ASIST AAHWAN '26",
    college: 'ASIST',
    prizes: [
      { text: 'First Prize – Power Coding Contest', type: 'first' },
      { text: 'Second Prize – Paper Presentation', type: 'second' }
    ]
  },
  {
    event: 'NOVUM 2K26',
    college: 'NOVUM',
    prizes: [
      { text: 'First Prize – Coding Contest', type: 'first' },
      { text: 'Second Prize – Paper Presentation', type: 'second' }
    ]
  },
  {
    event: 'DHANUSH 2K26 & PRAKALP',
    college: 'Various Institutions',
    prizes: [
      { text: 'Second Prize – Project Expo (DHANUSH)', type: 'second' },
      { text: 'Third Prize – Project Expo (PRAKALP)', type: 'third' }
    ]
  }
];

const getTrophyIcon = (type) => {
  switch (type) {
    case 'first': return <Trophy className="text-yellow-400" size={24} />;
    case 'second': return <Medal className="text-gray-300" size={24} />;
    case 'third': return <Award className="text-amber-600" size={24} />;
    default: return <Star className="text-blue-400" size={24} />;
  }
};

const AchievementsTimeline = () => {
  return (
    <section className="py-24 bg-brand-bg relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-brand-navy mb-4 font-outfit"
          >
            Project Achievements
          </motion.h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full mb-6" />
          <p className="text-gray-600 font-inter text-lg">
            Recognized across prestigious institutions for technical excellence and innovation.
          </p>
        </div>

        <div className="relative border-l-4 border-brand-gold/30 ml-4 md:ml-0 md:pl-0">
          {achievements.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`mb-12 relative ${index % 2 === 0 ? 'md:ml-auto md:w-1/2 md:pl-10 pl-8' : 'md:mr-auto md:w-1/2 md:pr-10 md:text-right pl-8 md:pl-0'}`}
            >
              {/* Timeline Dot */}
              <div className={`absolute top-4 w-6 h-6 rounded-full bg-brand-gold border-4 border-brand-bg shadow-md 
                ${index % 2 === 0 ? '-left-[15px] md:-left-[15px]' : '-left-[15px] md:auto md:-right-[15px]'}`} 
              />
              
              <div className="glass bg-white p-6 rounded-2xl shadow-lg border border-brand-gold/10 hover:shadow-brand-gold/20 transition-shadow">
                <h3 className="text-2xl font-bold text-brand-navy mb-1 font-outfit">{item.event}</h3>
                <p className="text-brand-gold font-bold text-sm mb-3 font-inter">{item.college}</p>
                
                {item.students && (
                  <div className="mb-4 p-3 bg-brand-navy/5 rounded-lg border border-brand-navy/10">
                    <p className="text-xs font-bold text-brand-navy uppercase tracking-wider mb-1">Presented By:</p>
                    <p className="text-sm text-gray-700 font-inter">{item.students}</p>
                  </div>
                )}

                <ul className={`space-y-3 ${index % 2 !== 0 ? 'md:flex md:flex-col md:items-end' : ''}`}>
                  {item.prizes.map((prize, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 w-fit">
                      {getTrophyIcon(prize.type)}
                      <span className="font-bold text-gray-800 text-sm font-inter">{prize.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsTimeline;
