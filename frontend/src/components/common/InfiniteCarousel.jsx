import React from 'react';

const HIGHLIGHTS = [
  { id: 1, title: 'ALIET 6-Day Workshop', subtitle: 'Aug 3rd - 8th, 2026', image: '/workshops/aliet_1.jpg' },
  { id: 2, title: 'Certificate Award Ceremony', subtitle: 'ALIET Vijayawada', image: '/workshops/aliet_2.jpg' },
  { id: 3, title: 'Hardware Prototype Showcase', subtitle: 'IoT & Embedded Systems', image: '/workshops/aliet_3.jpg' },
  { id: 4, title: 'Hands-on Technical Lab', subtitle: 'Practical Engineering', image: '/workshops/aliet_4.jpg' },
  { id: 5, title: 'Faculty Project Inspection', subtitle: 'Live Student Defense', image: '/workshops/aliet_9.jpg' },
  { id: 6, title: 'Medal & Certificate Honors', subtitle: 'Valedictory Award', image: '/workshops/aliet_13.jpg' },
  { id: 7, title: 'Team Hardware Prototype', subtitle: 'Circuit Assembly', image: '/workshops/aliet_17.jpg' },
  { id: 8, title: 'AI & Automation', subtitle: 'Enterprise Solutions', image: '/sss1.jpeg' },
  { id: 9, title: 'Smart Cities', subtitle: 'CivicSense AI', image: '/sss2.jpeg' },
];

const InfiniteCarousel = () => {
  // Duplicate array for seamless infinite looping
  const items = [...HIGHLIGHTS, ...HIGHLIGHTS];

  return (
    <div className="relative w-full overflow-hidden py-10 bg-[#050B14]">
      {/* Soft gradient fades on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#050B14] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#050B14] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {items.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="group relative flex-shrink-0 w-[280px] md:w-[350px] mx-4 md:mx-6 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2"
          >
            {/* Card Background / Image */}
            <div className="aspect-[4/3] w-full bg-[#0a152e] rounded-2xl overflow-hidden relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => { e.target.src = '/logo.jpeg'; e.target.style.objectFit = 'contain'; e.target.style.padding = '20px'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
            </div>

            {/* Card Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <p className="text-brand-gold text-xs font-inter font-bold tracking-wider uppercase mb-1 drop-shadow-md">
                {item.subtitle}
              </p>
              <h3 className="text-white text-xl font-outfit font-bold drop-shadow-lg group-hover:text-brand-light-gold transition-colors duration-300">
                {item.title}
              </h3>
            </div>
            
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-brand-gold/40 group-hover:shadow-[0_8px_30px_rgba(212,175,55,0.2)] transition-all duration-300 pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteCarousel;
