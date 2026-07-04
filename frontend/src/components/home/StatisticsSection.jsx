import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const Counter = ({ from = 0, to, duration = 2, suffix = '' }) => {
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            // Check if it's a number like 100+
            nodeRef.current.textContent = Math.floor(value) + suffix;
          }
        },
      });
      setHasAnimated(true);
      return () => controls.stop();
    }
  }, [from, to, inView, duration, suffix, hasAnimated]);

  return <span ref={nodeRef} className="tabular-nums">{from}{suffix}</span>;
};

const stats = [
  { value: 100, suffix: '+', label: 'Students Trained' },
  { value: 20, suffix: '+', label: 'Workshops Conducted' },
  { value: 15, suffix: '+', label: 'Project Awards', isString: 'Multiple' }, 
  { value: 100, suffix: '%', label: 'Professional Client Services' },
];

const StatisticsSection = () => {
  return (
    <section className="py-20 bg-brand-navy relative overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
           style={{ backgroundImage: 'linear-gradient(90deg, #D4AF37 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
           
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center px-4"
            >
              <div className="text-4xl md:text-5xl font-bold text-brand-gold mb-2 font-outfit">
                {stat.isString ? (
                  <Counter from={0} to={stat.value} duration={2} suffix={stat.suffix} /> // Will animate to 15+ then we can optionally just show the string, but let's stick to numbers for stats if possible, or handle string gracefully.
                ) : (
                  <Counter from={0} to={stat.value} duration={2} suffix={stat.suffix} />
                )}
                {stat.isString && <span className="block text-2xl mt-1 text-white">Multiple</span>}
              </div>
              <p className="text-gray-300 font-inter text-sm md:text-base font-medium uppercase tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
