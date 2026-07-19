import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const FAQS = [
  {
    question: "What programs do you offer?",
    answer: "We offer a variety of programs including high-impact internship programs, expert-led training, and technical workshops in cutting-edge fields like Generative AI, IoT, and embedded systems."
  },
  {
    question: "Do you offer virtual/remote internships?",
    answer: "Yes, we provide flexible remote internship options to accommodate students from different locations, while maintaining the same rigorous IEEE-standard excellence in our training."
  },
  {
    question: "How do your client internships work?",
    answer: "Client internships involve working on real-world projects for our industry partners. You'll gain hands-on experience under the mentorship of senior engineers, contributing directly to production-grade applications."
  },
  {
    question: "Do you provide certificates?",
    answer: "Absolutely. Upon successful completion of any workshop, training program, or internship, you will receive a verifiable certificate that is recognized by our academic and industrial partners."
  },
  {
    question: "Who is eligible for the Academic Projects assistance?",
    answer: "Engineering and computer science students looking for guidance on their final year or mini-projects are eligible. Our R&D team provides mentorship to ensure your project meets industry standards."
  }
];

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(0); // First one open by default

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
      {FAQS.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div 
            key={index} 
            className={`border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-white/5 shadow-lg shadow-brand-navy/20' : 'bg-transparent hover:bg-white/[0.02]'}`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
            >
              <h3 className={`font-outfit text-lg md:text-xl font-semibold transition-colors duration-300 ${isOpen ? 'text-brand-gold' : 'text-white'}`}>
                {faq.question}
              </h3>
              <div 
                className={`flex-shrink-0 ml-4 w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                  isOpen ? 'bg-brand-gold border-brand-gold text-[#050B14] rotate-45' : 'border-white/20 text-white/50 bg-transparent'
                }`}
              >
                <Plus size={20} />
              </div>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="p-6 pt-0 text-gray-400 font-inter leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default FAQAccordion;
