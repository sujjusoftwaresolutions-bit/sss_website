import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, FileText, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

const courses = [
  {
    id: 1,
    title: 'Full Stack Development using MERN stack',
    duration: '3 Months',
    description: 'Master MongoDB, Express.js, React, and Node.js to build dynamic, full-stack web applications from scratch.',
    brochureUrl: 'https://drive.google.com/drive/folders/1hrd2PC5sR768r8qTLIZgsGCw8vLmsJ1U?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto', // Link to Google Drive folder
    joinUrl: 'https://forms.gle/A8MHtY21MTPKnkLDA',     // Redirects to Google Form
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 2,
    title: 'Cybersecurity',
    duration: '3 Months',
    description: 'Learn ethical hacking, network security, and vulnerability assessment to protect systems from modern cyber threats.',
    brochureUrl: 'https://drive.google.com/drive/folders/1hrd2PC5sR768r8qTLIZgsGCw8vLmsJ1U?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto', 
    joinUrl: 'https://forms.gle/A8MHtY21MTPKnkLDA',     
    color: 'from-red-500 to-pink-600',
  },
  {
    id: 3,
    title: 'Data Analytics using Python',
    duration: '3 Months',
    description: 'Dive deep into data manipulation, visualization, and statistical analysis using Python, Pandas, and Matplotlib.',
    brochureUrl: 'https://drive.google.com/drive/folders/1hrd2PC5sR768r8qTLIZgsGCw8vLmsJ1U?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto', 
    joinUrl: 'https://forms.gle/A8MHtY21MTPKnkLDA',     
    color: 'from-green-500 to-emerald-600',
  },
  {
    id: 4,
    title: 'Mobile App Development',
    duration: '3 Months',
    description: 'Design and develop cross-platform mobile applications that provide seamless user experiences on iOS and Android.',
    brochureUrl: 'https://drive.google.com/drive/folders/1hrd2PC5sR768r8qTLIZgsGCw8vLmsJ1U?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto', 
    joinUrl: 'https://forms.gle/A8MHtY21MTPKnkLDA',     
    color: 'from-purple-500 to-violet-600',
  },
  {
    id: 5,
    title: 'IoT Embedding and Systems',
    duration: '3 Months',
    description: 'Explore the Internet of Things, embedded C programming, and microcontroller interfacing to build smart connected devices.',
    brochureUrl: 'https://drive.google.com/drive/folders/1hrd2PC5sR768r8qTLIZgsGCw8vLmsJ1U?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto', 
    joinUrl: 'https://forms.gle/A8MHtY21MTPKnkLDA',     
    color: 'from-orange-500 to-amber-600',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 12 },
  },
};

const Internships = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-transparent pt-[120px] pb-24 px-4 md:px-8"
    >
      <SEO 
        title="Internships | SUJJU Software Solutions"
        description="Launch your career with our specialized 3-month internship programs in MERN stack, Cybersecurity, Data Analytics, Mobile App Development, and IoT."
      />

      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-outfit font-extrabold text-white mb-6"
          >
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-[#F4C542]">Internships</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Gain hands-on experience and industry-relevant skills with our intensive 3-month training programs designed to accelerate your career.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {courses.map((course) => (
            <motion.div
              key={course.id}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col h-full relative overflow-hidden group"
            >
              {/* Animated background gradient on hover */}
              <div className={`absolute inset-0 pointer-events-none bg-gradient-to-br ${course.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${course.color} bg-opacity-20 flex shrink-0 shadow-lg`}>
                  <BookOpen className="text-white w-6 h-6" />
                </div>
                <h3 className="text-2xl font-outfit font-bold text-white leading-tight">
                  {course.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 text-brand-gold font-semibold mb-4 bg-brand-gold/10 w-fit px-3 py-1 rounded-full text-sm">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>

              <p className="text-gray-400 flex-1 mb-8">
                {course.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <a
                  href={course.brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-white border border-white/20 hover:bg-white/10 transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  View Brochure
                </a>
                <a
                  href={course.joinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-brand-navy shadow-[0_4px_15px_rgba(212,175,55,0.3)] transition-transform hover:scale-[1.02] active:scale-95"
                  style={{ background: 'linear-gradient(135deg, #F4C542 0%, #D4AF37 100%)' }}
                >
                  Join Now
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Internships;
