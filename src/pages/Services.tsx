import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const services = [
  {
    number: '01',
    title: 'Trekking Tour',
    subtitle: '1–9 Day Adventures',
    description: "Explore Oman's stunning mountain ranges and ancient trails with expert local guides.",
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1400&q=80',
    slug: 'trekking-tour',
    tag: 'Mountains & Trails',
  },
  {
    number: '02',
    title: 'Canyoning & Caving',
    subtitle: 'Extreme Exploration',
    description: 'Discover hidden caves and dramatic canyon landscapes through thrilling guided adventures.',
    image: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=1400&q=80',
    slug: 'canyoning-caving',
    tag: 'Adrenaline',
  },
  {
    number: '03',
    title: 'Culture Tour',
    subtitle: 'Heritage & Traditions',
    description: "Immerse yourself in Oman's rich cultural heritage, ancient forts, and vibrant souqs.",
    image: '/public/culture.jpeg',
    slug: 'culture-tour',
    tag: 'Heritage',
  },
  {
    number: '04',
    title: 'Car Rental',
    subtitle: 'Flexible Mobility',
    description: 'Premium vehicles for your journey across Oman, from rugged 4WDs to luxury sedans.',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1400&q=80',
    slug: 'car-rental',
    tag: 'Mobility',
  },
  {
    number: '05',
    title: 'Luxury Tour',
    subtitle: '5-Star Experience',
    description: 'Indulge in exclusive 5-star experiences across Oman with fully bespoke itineraries.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1400&q=80',
    slug: 'luxury-tour',
    tag: 'Premium',
  },
  {
    number: '06',
    title: 'Adventure Tour',
    subtitle: 'Thrilling Experiences',
    description: "Push your limits with curated outdoor adventures through Oman's dramatic landscapes.",
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80',
    slug: 'adventure-tour',
    tag: 'Outdoors',
  },
];

const Services: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const activeImage =
    hoveredIndex !== null ? services[hoveredIndex].image : services[0].image;

  return (
    <div className="bg-white min-h-screen">

      {/* ── Hero ── */}
      <section className="relative min-h-[65vh] bg-[#080808] flex items-end overflow-hidden">

        {/* Ambient glows */}
        <div style={{
          position: 'absolute', bottom: '-10%', left: '-5%',
          width: '55vw', height: '55vw', borderRadius: '50%',
          background: 'radial-gradient(circle, #4e3779 0%, transparent 65%)',
          opacity: 0.30, filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0,
        }} />
        <div style={{
          position: 'absolute', top: '0', right: '0',
          width: '30vw', height: '30vw', borderRadius: '50%',
          background: 'radial-gradient(circle, #e3261d 0%, transparent 65%)',
          opacity: 0.16, filter: 'blur(65px)', pointerEvents: 'none', zIndex: 0,
        }} />
        {/* Bottom gradient accent line */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '2px', zIndex: 20,
          background: 'linear-gradient(90deg, #4e3779 0%, #e3261d 50%, #FF9D00 100%)',
          opacity: 0.7,
        }} />

        {/* Dynamic background — swaps to hovered service image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out"
          style={{ backgroundImage: `url('${activeImage}')`, opacity: 0.18 }}
        />
        {/* Gradient: darken bottom so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/50 via-[#080808]/30 to-[#080808]" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-16 pb-20 pt-44">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">

            {/* Left — headline */}
            <div
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s ease, transform 0.7s ease',
              }}
            >
              <div className="flex items-center gap-4 mb-7">
                <div className="w-8 h-px bg-primary-orange" />
                <span className="text-[10px] font-bold tracking-[0.45em] text-primary-orange uppercase">
                  Al Maha Tourism — Oman
                </span>
              </div>
              <h1
                className="font-display font-bold text-white leading-[1.0]"
                style={{ fontSize: 'clamp(3.2rem, 7.5vw, 7rem)' }}
              >
                Our<br />
                <span className="italic font-normal text-white/35">Experiences</span>
              </h1>
            </div>

            {/* Right — tagline + stats */}
            <div
              className="hidden lg:flex flex-col items-end gap-6 pb-2"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
              }}
            >
              <p className="text-white/35 text-sm leading-relaxed text-right max-w-[280px]">
                Six curated journeys through Oman's most extraordinary landscapes and cultures.
              </p>
              <div className="flex items-center gap-7">
                {[['6', 'Experiences'], ['100%', 'Tailored'], ['24/7', 'Support']].map(([v, l], i) => (
                  <React.Fragment key={l}>
                    {i > 0 && <div className="w-px h-9 bg-white/10" />}
                    <div className="text-right">
                      <p className="font-display text-2xl font-bold text-white leading-none">{v}</p>
                      <p className="text-white/25 text-[9px] tracking-[0.22em] uppercase mt-1.5">{l}</p>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Services List ── */}
      <section className="bg-white">
        {services.map((service, idx) => {
          const isHovered = hoveredIndex === idx;
          return (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              className="relative group flex items-center border-b border-neutral-100 overflow-hidden"
              style={{ minHeight: '96px' }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Background image — revealed on hover */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${service.image}')`,
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.55s ease',
                }}
              />
              {/* Dark scrim over image */}
              <div
                className="absolute inset-0 bg-[#080808]"
                style={{
                  opacity: isHovered ? 0.78 : 0,
                  transition: 'opacity 0.55s ease',
                }}
              />

              {/* Row content */}
              <div
                className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-16 py-7 md:py-8 flex items-center gap-6 md:gap-10"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(12px)',
                  transition: `opacity 0.5s ease ${idx * 0.06}s, transform 0.5s ease ${idx * 0.06}s`,
                }}
              >
                {/* Number */}
                <span
                  className="font-display text-xs font-bold tabular-nums w-10 flex-shrink-0 transition-colors duration-400"
                  style={{ color: isHovered ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.18)' }}
                >
                  {service.number}
                </span>

                {/* Title */}
                <h2
                  className="font-display font-bold leading-none flex-1 transition-colors duration-400"
                  style={{
                    fontSize: 'clamp(1.6rem, 3vw, 3.2rem)',
                    color: isHovered ? '#ffffff' : '#0a0a0a',
                  }}
                >
                  {service.title}
                </h2>

                {/* Description — desktop only */}
                <p
                  className="hidden xl:block text-sm leading-relaxed max-w-[240px] flex-shrink-0 transition-colors duration-400"
                  style={{ color: isHovered ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.35)' }}
                >
                  {service.description}
                </p>

                {/* Tag */}
                <span
                  className="hidden md:inline-flex items-center text-[9px] font-bold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full border flex-shrink-0 transition-all duration-400 whitespace-nowrap"
                  style={{
                    color: isHovered ? '#ff9d00' : 'rgba(0,0,0,0.35)',
                    borderColor: isHovered ? 'rgba(255,157,0,0.35)' : 'rgba(0,0,0,0.1)',
                    background: isHovered ? 'rgba(255,157,0,0.08)' : 'transparent',
                  }}
                >
                  {service.tag}
                </span>

                {/* Arrow */}
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-400"
                  style={{
                    borderColor: isHovered ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                    transform: isHovered ? 'translateX(5px)' : 'translateX(0)',
                  }}
                >
                  <svg
                    className="w-4 h-4 transition-colors duration-400"
                    style={{ color: isHovered ? '#ffffff' : '#0a0a0a' }}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          );
        })}
      </section>

      {/* ── CTA Strip ── */}
      <section className="relative bg-[#080808] py-24 overflow-hidden">
        {/* Purple ambient */}
        <div style={{
          position: 'absolute', top: '50%', left: '-5%',
          width: '45vw', height: '45vw', borderRadius: '50%',
          background: 'radial-gradient(circle, #4e3779 0%, transparent 65%)',
          opacity: 0.28, filter: 'blur(70px)', transform: 'translateY(-50%)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '50%', right: '-5%',
          width: '28vw', height: '28vw', borderRadius: '50%',
          background: 'radial-gradient(circle, #e3261d 0%, transparent 65%)',
          opacity: 0.16, filter: 'blur(70px)', transform: 'translateY(-50%)', pointerEvents: 'none',
        }} />
        <div className="max-w-[1600px] mx-auto px-6 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div
            style={{
              opacity: mounted ? 1 : 0,
              transition: 'opacity 0.7s ease 0.4s',
            }}
          >
            <p className="text-[9px] font-bold tracking-[0.45em] text-primary-orange uppercase mb-3">
              Start your journey
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
              Let's plan your perfect<br />
              <span className="italic font-normal text-white/25">Omani adventure.</span>
            </h2>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link
              to="/destinations"
              className="group inline-flex items-center gap-3 border border-white/10 text-white/50 hover:text-white hover:border-white/25 text-[10px] font-bold tracking-[0.2em] uppercase px-7 py-4 rounded-full transition-all duration-300"
            >
              View Destinations
            </Link>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 bg-primary-orange text-white font-bold text-[10px] tracking-[0.2em] uppercase px-7 py-4 rounded-full hover:bg-orange-500 transition-colors duration-300"
            >
              Get in Touch
              <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;
