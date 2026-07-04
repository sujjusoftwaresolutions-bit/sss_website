import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Smartphone, BrainCircuit, Cloud, Server, ChevronRight, Code } from 'lucide-react';
import { fetchServices } from '../utils/api';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

const techStackIcons = ['React', 'Node.js', 'Express', 'MongoDB', 'Python', 'Flask', 'TensorFlow', 'YOLOv8', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'GitHub'];

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchServices();
      if (data && data.success) {
        // We augment the mock data from backend with UI specific properties
        const augmentedData = data.data.map((srv, idx) => ({
          ...srv,
          icon: idx % 3 === 0 ? <Layout className="w-10 h-10 text-brand-gold" /> : (idx % 2 === 0 ? <BrainCircuit className="w-10 h-10 text-brand-gold" /> : <Smartphone className="w-10 h-10 text-brand-gold" />),
          image: `https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80`,
          technologies: ['React', 'Node.js', 'MongoDB']
        }));
        setServices(augmentedData);
      } else {
        // Fallback static data if backend is unreachable
        setServices([
          { id: 1, title: 'Software Development', description: 'End-to-end custom software solutions.', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80', icon: <Code className="w-10 h-10 text-brand-gold" />, technologies: ['MERN Stack', 'Next.js'] },
          { id: 2, title: 'AI Solutions', description: 'Intelligent AI-powered applications.', image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=800&q=80', icon: <BrainCircuit className="w-10 h-10 text-brand-gold" />, technologies: ['Python', 'TensorFlow', 'YOLOv8'] },
          { id: 3, title: 'Cloud Solutions', description: 'Scalable deployment and infrastructure.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80', icon: <Cloud className="w-10 h-10 text-brand-gold" />, technologies: ['AWS', 'Render', 'Vercel'] }
        ]);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="w-full bg-brand-bg relative overflow-hidden">
      <SEO 
        title="Our Services" 
        description="Explore the premium software development, AI solutions, and technical training services offered by SUJJU Software Solutions." 
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-brand-navy text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-[#0f3d82] to-brand-navy" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-gold/10 via-transparent to-transparent opacity-50" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto mb-10 flex justify-center"
            style={{ width: 'clamp(180px, 20vw, 220px)' }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <div 
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)',
                  filter: 'blur(15px)',
                }}
              />
              <img 
                src="/logo.jpeg" 
                alt="SUJJU Software Solutions"
                className="relative z-10 w-full h-auto object-contain rounded-2xl"
                style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}
              />
            </motion.div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6 font-outfit tracking-tight"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-light-gold">Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 font-inter max-w-2xl mx-auto"
          >
            Premium technological solutions designed to scale your business and empower the next generation.
          </motion.p>
        </div>
      </section>

      {/* Services List (Alternating Layout) */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-brand-navy border-t-brand-gold rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-32">
            {services.map((service, idx) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col lg:flex-row items-center gap-16 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="w-full lg:w-1/2 relative group">
                  <div className="absolute -inset-4 bg-brand-gold/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                </div>

                <div className="w-full lg:w-1/2">
                  <div className="w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center mb-6">
                    {service.icon}
                  </div>
                  <h2 className="text-3xl font-bold text-brand-navy mb-4 font-outfit">{service.title}</h2>
                  <p className="text-gray-600 font-inter text-lg leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  <div className="mb-8">
                    <h4 className="font-bold text-brand-navy mb-3 font-outfit">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-brand-bg border border-brand-gold/30 text-brand-navy text-sm font-bold rounded-full font-inter">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link to="/contact">
                    <button className="flex items-center gap-2 text-brand-gold font-bold font-inter hover:text-brand-navy transition-colors group">
                      Discuss Your Project <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Technology Showcase */}
      <section className="py-24 bg-brand-navy text-white text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-bold mb-4 font-outfit">Technologies We Master</h2>
          <div className="w-20 h-1 bg-brand-gold mx-auto rounded-full mb-16" />
          
          <div className="flex flex-wrap justify-center gap-4">
            {techStackIcons.map((tech, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="px-6 py-3 glass-dark border border-white/20 rounded-lg hover:border-brand-gold hover:text-brand-gold transition-colors font-bold font-inter cursor-default"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
