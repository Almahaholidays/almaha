import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface ServiceData {
  title: string;
  subtitle: string;
  hero: string;
  description: string;
  features: string[];
  highlights: { title: string; description: string }[];
  duration: string;
  difficulty: string;
  groupSize: string;
  includes: string[];
  gallery: string[];
}

const serviceData: Record<string, ServiceData> = {
  'trekking-tour': {
    title: 'Trekking Tour',
    subtitle: '1-9 Day Mountain Adventures',
    hero: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1920&q=80',
    description: 'Discover Oman\'s stunning landscapes on guided treks from 1 to 9 days. Hike through dramatic mountains, hidden wadis, and ancient villages. With expert local guides, each journey blends adventure, culture, and natural beauty for an unforgettable experience.',
    features: [
      'Professional mountain guides',
      'All camping equipment included',
      'Traditional Omani meals',
      'Small group sizes (max 12)',
      'Multiple difficulty levels'
    ],
    highlights: [
      { title: 'Jebel Shams', description: 'Trek to Oman\'s highest peak at 3,009 meters' },
      { title: 'Wadi Bani Awf', description: 'Explore dramatic canyons and crystal pools' },
      { title: 'Snake Canyon', description: 'Navigate thrilling rock formations' }
    ],
    duration: '1-9 Days',
    difficulty: 'Moderate to Challenging',
    groupSize: '4-12 People',
    includes: ['Expert guides', 'Camping gear', 'All meals', '4x4 transfers', 'Permits'],
    gallery: [
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80'
    ]
  },
  'canyoning-caving': {
    title: 'Canyoning & Caving',
    subtitle: 'Extreme Adventure Exploration',
    hero: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=1920&q=80',
    description: 'Dive into adventure with a thrilling 1-day canyoning and caving experience. Explore hidden caves, rappel down waterfalls, and navigate through narrow gorges. Perfect for adrenaline seekers, this guided tour showcases Oman\'s wild side in a safe and unforgettable way.',
    features: [
      'Professional safety equipment',
      'Certified adventure guides',
      'Waterproof gear provided',
      'Technical rope skills training',
      'Small groups for safety'
    ],
    highlights: [
      { title: 'Snake Canyon', description: 'Rappel through stunning rock formations' },
      { title: 'Al Hoota Cave', description: 'Explore spectacular underground chambers' },
      { title: 'Wadi Shab', description: 'Canyon through turquoise pools' }
    ],
    duration: 'Full Day (8-10 hours)',
    difficulty: 'Challenging',
    groupSize: '4-8 People',
    includes: ['Safety equipment', 'Expert guides', 'Lunch & water', 'Transportation', 'Insurance'],
    gallery: [
      'https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=800&q=80',
      'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80',
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&q=80'
    ]
  },
  'culture-tour': {
    title: 'Culture Tour',
    subtitle: 'Heritage & Traditions',
    hero: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=1920&q=80',
    description: 'Immerse yourself in Oman\'s rich heritage with a 1-day culture tour. Visit historic forts, traditional markets, and ancient villages, guided by local experts. Discover the stories, architecture, and traditions that define Omani culture all in a single unforgettable day.',
    features: [
      'UNESCO World Heritage sites',
      'Local Omani guide',
      'Traditional lunch included',
      'Souk shopping experience',
      'Photography opportunities'
    ],
    highlights: [
      { title: 'Nizwa Fort', description: 'Explore Oman\'s most impressive fort' },
      { title: 'Traditional Souq', description: 'Experience authentic market culture' },
      { title: 'Old Villages', description: 'Walk through ancient settlements' }
    ],
    duration: 'Full Day (8 hours)',
    difficulty: 'Easy',
    groupSize: '2-15 People',
    includes: ['Cultural guide', 'Entrance fees', 'Traditional lunch', 'Transportation', 'Water'],
    gallery: [
      'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800&q=80',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80'
    ]
  },
  'car-rental': {
    title: 'Car Rental',
    subtitle: 'Flexible Mobility Solutions',
    hero: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=80',
    description: 'We offer reliable car rental services with a range of vehicles including compact cars, SUVs, and 4x4s – perfect for exploring Oman at your own pace. All vehicles are well-maintained and available with optional insurance, GPS, and 24/7 support.',
    features: [
      'Wide range of vehicles',
      'Flexible rental periods',
      '24/7 roadside assistance',
      'Optional GPS & insurance',
      'Airport pickup/drop-off'
    ],
    highlights: [
      { title: 'Compact Cars', description: 'Ideal for city exploration' },
      { title: '4x4 Vehicles', description: 'Perfect for desert and mountain adventures' },
      { title: 'Luxury SUVs', description: 'Premium comfort for families' }
    ],
    duration: 'Flexible (Daily/Weekly/Monthly)',
    difficulty: 'Self-Guided',
    groupSize: 'Any',
    includes: ['Full tank', 'Insurance options', 'GPS available', '24/7 support', 'Delivery service'],
    gallery: [
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80'
    ]
  },
  'luxury-tour': {
    title: 'Luxury Tour',
    subtitle: '5-Star Premium Experience',
    hero: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=80',
    description: 'This exclusive tour invites guests to discover the breathtaking beauty of Oman through a thoughtfully curated journey that balances leisure, light adventure, and authentic hospitality. Designed for travelers who seek relaxation and memorable experiences with luxurious 5-star accommodations throughout.',
    features: [
      '5-star hotel accommodations',
      'Private tour guide',
      'Gourmet dining experiences',
      'Luxury vehicle transfers',
      'Exclusive access to sites'
    ],
    highlights: [
      { title: 'Desert Under Stars', description: 'Luxury camping in Wahiba Sands' },
      { title: 'Coastal Retreats', description: 'Premium beachfront resorts' },
      { title: 'Mountain Escapes', description: 'Exclusive mountain lodges' }
    ],
    duration: '5-10 Days',
    difficulty: 'Easy to Moderate',
    groupSize: '2-6 People',
    includes: ['5-star hotels', 'All meals', 'Private guide', 'Luxury transfers', 'Spa treatments'],
    gallery: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80'
    ]
  },
  'adventure-tour': {
    title: 'Adventure Tour',
    subtitle: 'Thrilling Multi-Activity Experience',
    hero: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
    description: 'We specialize in providing unique and thrilling adventure experiences for people of all ages. With multiple facilities across Oman, we offer both adventure and city tours with mountain climbing, guided tours, first climbing gym in Oman, and professional equipment.',
    features: [
      'Multi-activity adventures',
      'Professional climbing gym',
      'High-end bikes & gear',
      'Team building programs',
      'Expert instruction'
    ],
    highlights: [
      { title: 'Mountain Climbing', description: 'Scale Oman\'s dramatic peaks' },
      { title: 'Indoor Climbing Gym', description: 'First climbing facility in Oman' },
      { title: 'Multi-Day Expeditions', description: 'Combined adventure activities' }
    ],
    duration: '1-7 Days',
    difficulty: 'Moderate to Extreme',
    groupSize: '4-10 People',
    includes: ['All equipment', 'Professional guides', 'Meals', 'Accommodation', 'Training'],
    gallery: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&q=80',
      'https://images.unsplash.com/photo-1476611338391-6f395a0ebc7b?w=800&q=80'
    ]
  }
};

/* ── Reusable animated section wrapper ── */
const AnimatedSection: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const [ref, entry] = useIntersectionObserver({ threshold: 0.1, freezeOnceVisible: true });
  const visible = entry?.isIntersecting ?? false;
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
};

/* ── Small label above headings ── */
const EyebrowLabel: React.FC<{ children: React.ReactNode; light?: boolean }> = ({ children, light }) => (
  <span className={`inline-flex items-center gap-2 text-xs font-bold tracking-[0.3em] uppercase mb-4 ${light ? 'text-[#e3261d]/80' : 'text-[#4e3779]'}`}>
    <span className="w-6 h-px bg-current" />
    {children}
  </span>
);

const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? serviceData[slug] : null;
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) setScrollProgress((window.scrollY / total) * 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-dark">
        <div className="text-center px-6">
          <EyebrowLabel light>404 Error</EyebrowLabel>
          <h1 className="font-display text-5xl font-black text-white mb-6">Service Not Found</h1>
          <Link to="/" className="btn-primary">Return Home</Link>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Duration', value: service.duration },
    { label: 'Difficulty', value: service.difficulty },
    { label: 'Group Size', value: service.groupSize },
    { label: 'Includes', value: `${service.includes.length} Items` },
  ];

  return (
    <div className="bg-white overflow-x-hidden">

      {/* ── Reading Progress Bar ── */}
      <div
        className="fixed top-0 left-0 h-[3px] z-50 transition-none rounded-r-full"
        style={{
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #4e3779 0%, #e3261d 100%)'
        }}
      />

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-end bg-primary-dark overflow-hidden">

        {/* Background image with layered gradients */}
        <div className="absolute inset-0">
          <img
            src={service.hero}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          {/* bottom-up dark fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/55 to-primary-dark/10" />
          {/* left dark vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/70 via-transparent to-transparent" />
        </div>

        {/* Breadcrumb */}
        <div className="absolute top-28 left-0 right-0 z-10">
          <div className="container mx-auto px-6 lg:px-16">
            <nav className="flex items-center gap-2 text-white/40 text-xs tracking-wide">
              <Link to="/" className="hover:text-white/80 transition-colors">Home</Link>
              <span className="text-white/20">/</span>
              <Link to="/services" className="hover:text-white/80 transition-colors">Experiences</Link>
              <span className="text-white/20">/</span>
              <span className="text-[#e3261d]">{service.title}</span>
            </nav>
          </div>
        </div>

        {/* Main hero content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-16 pb-16 pt-48">
          <div className="max-w-3xl">
            <EyebrowLabel light>{service.subtitle}</EyebrowLabel>

            <h1 className="font-display font-black text-white leading-[0.92] tracking-tighter mb-8"
              style={{ fontSize: 'clamp(3.5rem, 9vw, 7.5rem)' }}>
              {service.title}
            </h1>

            <p className="text-white/60 text-lg leading-relaxed max-w-xl mb-10">
              {service.description}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 text-white font-bold rounded-full hover:bg-white transition-all duration-300 text-sm"
                style={{
                  background: 'linear-gradient(135deg, #4e3779, #e3261d)'
                }}
              >
                Book This Experience
                <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center px-7 py-3.5 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-white/40 font-semibold transition-all duration-300 text-sm backdrop-blur-sm"
              >
                View All Experiences
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar — sits at the very bottom of the hero */}
        <div className="relative z-10 border-t border-white/8">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className={`py-7 px-6 group hover:bg-white/5 transition-colors duration-300 ${i < stats.length - 1 ? 'border-r border-white/8' : ''}`}
                >
                  <p className="text-[10px] font-bold tracking-[0.25em] uppercase mb-1.5"
                    style={{
                      color: i % 2 === 0 ? '#FF9D00' : '#e3261d'
                    }}>
                    {stat.label}
                  </p>
                  <p className="text-white font-semibold text-sm leading-snug">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          HIGHLIGHTS — Diagonal Journey
      ══════════════════════════════ */}
      <section className="py-28 md:py-36 bg-neutral-50 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-16">

          {/* Section header */}
          <AnimatedSection className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-24">
            <div>
              <EyebrowLabel>Highlights</EyebrowLabel>
              <h2 className="font-display font-black text-primary-dark leading-tight"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                What Awaits<br />You
              </h2>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs md:text-right">
              Each highlight is curated to deliver the most authentic and memorable Omani experience.
            </p>
          </AnimatedSection>

          {/* Diagonal Stepping Stones Layout */}
          <div className="relative">
            {/* Connection Path - Diagonal Line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" style={{ zIndex: 0 }}>
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4e3779" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#e3261d" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#4e3779" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <path
                d={`M ${service.highlights.length > 0 ? '120' : '0'} 80 Q 300 120, 480 180 T 840 280`}
                stroke="url(#pathGradient)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="8 8"
                className="animate-dash"
              />
            </svg>

            <div className="space-y-16 lg:space-y-0">
              {service.highlights.map((highlight, index) => (
                <AnimatedSection key={index}>
                  <div
                    className={`relative flex items-start gap-8 lg:gap-12 ${
                      index % 2 === 0
                        ? 'flex-row lg:ml-0'
                        : 'flex-row-reverse lg:ml-auto lg:mr-0 lg:max-w-4xl'
                    }`}
                    style={{
                      transitionDelay: `${index * 150}ms`,
                    }}
                  >
                    {/* Number Circle - Connection Point */}
                    <div className="relative flex-shrink-0 group">
                      {/* Pulsing ring */}
                      <div
                        className="absolute inset-0 w-20 h-20 rounded-full animate-ping opacity-20"
                        style={{
                          backgroundColor: index % 2 === 0 ? 'rgba(78, 55, 121, 0.2)' : 'rgba(227, 38, 29, 0.2)'
                        }}
                      />

                      {/* Outer ring */}
                      <div
                        className="relative w-20 h-20 rounded-full border-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                        style={{
                          background: index % 2 === 0
                            ? 'linear-gradient(135deg, rgba(78, 55, 121, 0.2), rgba(78, 55, 121, 0.05))'
                            : 'linear-gradient(135deg, rgba(227, 38, 29, 0.2), rgba(227, 38, 29, 0.05))',
                          borderColor: index % 2 === 0 ? 'rgba(78, 55, 121, 0.3)' : 'rgba(227, 38, 29, 0.3)'
                        }}
                      >
                        {/* Inner circle */}
                        <div
                          className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-500"
                          style={{
                            backgroundColor: 'white'
                          }}
                        >
                          <span
                            className="font-black text-2xl group-hover:text-white transition-colors duration-500"
                            style={{
                              color: index % 2 === 0 ? '#4e3779' : '#e3261d'
                            }}
                          >
                            {index + 1}
                          </span>
                        </div>
                      </div>

                      {/* Vertical connector for mobile */}
                      {index < service.highlights.length - 1 && (
                        <div
                          className="absolute top-20 left-1/2 -translate-x-1/2 w-0.5 h-16 lg:hidden"
                          style={{
                            background: index % 2 === 0
                              ? 'linear-gradient(to bottom, rgba(78, 55, 121, 0.3), transparent)'
                              : 'linear-gradient(to bottom, rgba(227, 38, 29, 0.3), transparent)'
                          }}
                        />
                      )}
                    </div>

                    {/* Content Block */}
                    <div className={`flex-1 ${index % 2 === 0 ? '' : 'lg:text-right'}`}>
                      {/* Floating label */}
                      <div className={`inline-flex items-center gap-2 mb-3 ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}>
                        <div
                          className="h-px w-8"
                          style={{
                            backgroundColor: index % 2 === 0 ? 'rgba(78, 55, 121, 0.4)' : 'rgba(227, 38, 29, 0.4)'
                          }}
                        />
                        <span
                          className="text-[10px] font-bold tracking-[0.3em] uppercase"
                          style={{
                            color: index % 2 === 0 ? 'rgba(78, 55, 121, 0.6)' : 'rgba(227, 38, 29, 0.6)'
                          }}
                        >
                          Stop {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Title with gradient underline */}
                      <div className="relative inline-block mb-4">
                        <h3 className="font-display text-3xl md:text-4xl font-black text-primary-dark leading-tight mb-2 relative z-10">
                          {highlight.title}
                        </h3>
                        {/* Dynamic underline */}
                        <div
                          className="absolute bottom-0 left-0 w-0 h-1 group-hover:w-full transition-all duration-700"
                          style={{
                            background: index % 2 === 0
                              ? 'linear-gradient(to right, #4e3779, transparent)'
                              : 'linear-gradient(to right, #e3261d, transparent)'
                          }}
                        />
                      </div>

                      <p className="text-neutral-600 text-base leading-relaxed max-w-md">
                        {highlight.description}
                      </p>

                      {/* Accent line */}
                      <div className={`mt-6 h-px w-24 bg-gradient-to-r ${index % 2 === 0 ? 'from-neutral-200 to-transparent' : 'from-transparent to-neutral-200 lg:ml-auto'}`} />
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          PACKAGE DETAILS — Magazine Split
      ══════════════════════════════ */}
      <section className="py-28 md:py-36 bg-primary-dark overflow-hidden">
        <div className="container mx-auto px-6 lg:px-16">

          {/* Large centered heading */}
          <AnimatedSection className="text-center mb-20">
            <EyebrowLabel light>Package Details</EyebrowLabel>
            <h2 className="font-display font-black text-white leading-[0.9]"
              style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}>
              Everything<br />
              <span className="italic font-light text-[#e3261d]">You Need</span>
            </h2>
          </AnimatedSection>

          {/* Asymmetric Magazine Layout */}
          <div className="relative">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

              {/* LEFT: Vertical Text + Includes List */}
              <div className="lg:col-span-5 space-y-12">

                {/* Vertical "What's Included" text (desktop only) */}
                <div className="hidden lg:block relative h-40">
                  <div className="absolute left-0 top-0 origin-top-left rotate-0">
                    <h3 className="font-display font-black text-8xl text-white/5 tracking-tighter leading-none select-none whitespace-nowrap"
                      style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                      WHAT'S INCLUDED
                    </h3>
                  </div>
                </div>

                {/* Includes content */}
                <AnimatedSection>
                  <div className="space-y-8">
                    {/* Mobile/Tablet heading */}
                    <div className="lg:hidden">
                      <EyebrowLabel light>What's Included</EyebrowLabel>
                      <h3 className="font-display text-4xl font-black text-white leading-tight">
                        Every detail<br />covered.
                      </h3>
                    </div>

                    {/* Desktop heading */}
                    <div className="hidden lg:block">
                      <h3 className="font-display text-5xl font-black text-white leading-tight mb-4">
                        Every detail<br />covered.
                      </h3>
                      <div
                        className="w-16 h-1 rounded-full"
                        style={{ background: 'linear-gradient(90deg, #FF9D00, #e3261d)' }}
                      />
                    </div>

                    {/* List with staggered animation */}
                    <div className="space-y-0 border-l-2 pl-8 py-4" style={{ borderColor: 'rgba(255, 157, 0, 0.3)' }}>
                      {service.includes.map((item, i) => (
                        <div
                          key={i}
                          className="group relative py-4 transition-all duration-300 hover:pl-2"
                          style={{ animationDelay: `${i * 100}ms` }}
                        >
                          {/* Connection dot */}
                          <div
                            className="absolute -left-[33px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary-dark border-2 group-hover:scale-150 transition-all duration-300"
                            style={{
                              borderColor: i % 2 === 0 ? '#FF9D00' : '#e3261d',
                              backgroundColor: 'transparent'
                            }}
                          />

                          {/* Item text */}
                          <div className="flex items-start gap-3">
                            <svg
                              className="w-5 h-5 flex-shrink-0 mt-0.5 opacity-60 group-hover:opacity-100 transition-opacity"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              style={{ color: i % 2 === 0 ? '#FF9D00' : '#e3261d' }}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-white/70 group-hover:text-white font-medium transition-colors text-base leading-relaxed">
                              {item}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              {/* RIGHT: Features in Expanding Accordion Style */}
              <div className="lg:col-span-7">
                <AnimatedSection>
                  <div className="space-y-6">
                    {/* Section intro */}
                    <div className="mb-8">
                      <EyebrowLabel light>Key Features</EyebrowLabel>
                      <h3 className="font-display text-4xl md:text-5xl font-black text-white leading-tight">
                        Why choose<br />
                        <span className="italic font-light" style={{
                          background: 'linear-gradient(135deg, #FF9D00, #e3261d)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}>Al Maha</span>
                      </h3>
                    </div>

                    {/* Feature blocks with number indicators */}
                    <div className="space-y-3">
                      {service.features.map((feature, i) => (
                        <div
                          key={i}
                          className="group relative bg-white/5 backdrop-blur-sm border-l-4 border-white/10 rounded-r-2xl overflow-hidden transition-all duration-500 hover:translate-x-2"
                          style={{
                            borderLeftColor: i % 2 === 0 ? 'rgba(255, 157, 0, 0.3)' : 'rgba(227, 38, 29, 0.3)'
                          }}
                        >
                          {/* Animated gradient overlay on hover */}
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                              background: i % 2 === 0
                                ? 'linear-gradient(to right, rgba(255, 157, 0, 0), rgba(255, 157, 0, 0.1), rgba(255, 157, 0, 0))'
                                : 'linear-gradient(to right, rgba(227, 38, 29, 0), rgba(227, 38, 29, 0.1), rgba(227, 38, 29, 0))'
                            }}
                          />

                          {/* Sliding glow bar */}
                          <div
                            className="absolute left-0 top-0 bottom-0 w-1 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"
                            style={{
                              background: i % 2 === 0
                                ? 'linear-gradient(to bottom, #FF9D00, #ffb84d)'
                                : 'linear-gradient(to bottom, #e3261d, #f87171)'
                            }}
                          />

                          {/* Content wrapper */}
                          <div className="relative p-6">
                            {/* Background number with rotation */}
                            <span
                              className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-7xl group-hover:scale-110 transition-all duration-500 select-none leading-none"
                              style={{
                                color: i % 2 === 0
                                  ? 'rgba(255, 157, 0, 0.08)'
                                  : 'rgba(227, 38, 29, 0.08)'
                              }}
                            >
                              {String(i + 1).padStart(2, '0')}
                            </span>

                            <div className="relative z-10 flex items-center gap-5">
                              {/* Icon circle with pulse */}
                              <div className="relative flex-shrink-0">
                                {/* Pulse ring */}
                                <div
                                  className="absolute inset-0 w-12 h-12 rounded-xl opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-500"
                                  style={{
                                    backgroundColor: i % 2 === 0 ? '#FF9D00' : '#e3261d'
                                  }}
                                />

                                {/* Main circle */}
                                <div
                                  className="relative w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500"
                                  style={{
                                    borderColor: i % 2 === 0 ? 'rgba(255, 157, 0, 0.3)' : 'rgba(227, 38, 29, 0.3)'
                                  }}
                                >
                                  <svg
                                    className="w-5 h-5 group-hover:text-white transition-colors duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    style={{
                                      color: i % 2 === 0 ? '#FF9D00' : '#e3261d'
                                    }}
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </div>
                              </div>

                              {/* Feature text */}
                              <span className="text-white/70 group-hover:text-white font-semibold text-base md:text-lg transition-all duration-300 group-hover:tracking-wide">
                                {feature}
                              </span>

                              {/* Arrow indicator with double animation */}
                              <div className="ml-auto flex items-center gap-1">
                                <svg
                                  className="w-5 h-5 text-white/20 group-hover:translate-x-2 transition-all duration-500"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  style={{
                                    color: i % 2 === 0 ? 'rgba(255, 157, 0, 0.5)' : 'rgba(227, 38, 29, 0.5)'
                                  }}
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                                {/* Second arrow appears on hover */}
                                <svg
                                  className="w-5 h-5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-500 delay-100"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  style={{
                                    color: i % 2 === 0 ? '#FF9D00' : '#e3261d'
                                  }}
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom decorative element */}
                    <div className="pt-8 flex items-center gap-4">
                      <div
                        className="flex-1 h-px"
                        style={{
                          background: 'linear-gradient(to right, rgba(255, 157, 0, 0.4), rgba(227, 38, 29, 0.1), transparent)'
                        }}
                      />
                      <span
                        className="text-[10px] font-bold tracking-[0.3em] uppercase"
                        style={{
                          background: 'linear-gradient(135deg, #FF9D00, #e3261d)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}
                      >
                        Premium Service
                      </span>
                      <div
                        className="flex-1 h-px"
                        style={{
                          background: 'linear-gradient(to left, rgba(227, 38, 29, 0.4), rgba(255, 157, 0, 0.1), transparent)'
                        }}
                      />
                    </div>
                  </div>
                </AnimatedSection>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          GALLERY — Magazine layout
      ══════════════════════════════ */}
      <section className="py-28 md:py-36 bg-neutral-50">
        <div className="container mx-auto px-6 lg:px-16">

          <AnimatedSection className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <EyebrowLabel>Gallery</EyebrowLabel>
              <h2 className="font-display font-black text-primary-dark leading-tight"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                A Glimpse of<br />the Experience
              </h2>
            </div>
            <p className="text-neutral-400 text-sm max-w-[220px] md:text-right leading-relaxed">
              Every frame captures the spirit of Oman's untamed beauty.
            </p>
          </AnimatedSection>

          {/* Magazine grid: 1 large left + 2 stacked right */}
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">

              {/* Large feature image */}
              <div className="md:col-span-2 group relative overflow-hidden rounded-2xl aspect-[4/3]">
                <img
                  src={service.gallery[0]}
                  alt={`${service.title} 1`}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-5 left-5 text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <p className="font-bold text-base leading-tight">{service.title}</p>
                  <p className="text-white/60 text-xs mt-0.5">Photo 01</p>
                </div>
                {/* Corner tag */}
                <span className="absolute top-4 left-4 px-3 py-1 bg-white/10 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-white/20">
                  Featured
                </span>
              </div>

              {/* Two stacked smaller images */}
              <div className="flex flex-col gap-4 md:gap-5">
                {service.gallery.slice(1).map((img, i) => (
                  <div key={i} className="group relative overflow-hidden rounded-2xl flex-1 min-h-[200px]">
                    <img
                      src={img}
                      alt={`${service.title} ${i + 2}`}
                      className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-500">
                      <p className="font-bold text-sm leading-tight">{service.title}</p>
                      <p className="text-white/60 text-xs mt-0.5">Photo {String(i + 2).padStart(2, '0')}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════
          CTA — Split layout
      ══════════════════════════════ */}
      <section className="relative bg-primary-dark overflow-hidden">
        <div className="grid md:grid-cols-2">

          {/* Left — Text */}
          <div className="relative z-10 flex flex-col justify-center px-8 md:px-16 lg:px-20 py-24 md:py-32">
            <EyebrowLabel light>Start Your Journey</EyebrowLabel>

            <h2 className="font-display font-black text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
              Ready for an<br />
              <span className="text-[#e3261d]">Unforgettable</span><br />
              Adventure?
            </h2>

            <p className="text-white/50 text-base leading-relaxed max-w-sm mb-10">
              Book your {service.title} today and experience the magic of Oman like never before.
            </p>

            <div className="flex flex-wrap gap-3 mb-16">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 text-white font-bold rounded-full hover:bg-white transition-all duration-300 text-sm"
                style={{
                  background: 'linear-gradient(135deg, #4e3779, #e3261d)'
                }}
              >
                Book This Experience
                <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center px-7 py-3.5 rounded-full border border-white/15 text-white/50 hover:text-white hover:border-white/30 font-semibold text-sm transition-all duration-300"
              >
                All Experiences
              </Link>
            </div>

            {/* Trust strip */}
            <div className="flex gap-10 pt-8 border-t border-white/8">
              {[['500+', 'Happy Travelers'], ['15+', 'Yrs Experience'], ['4.9★', 'Avg Rating']].map(([val, label], i) => (
                <div key={label}>
                  <p
                    className="text-2xl font-black leading-none"
                    style={{
                      color: i % 2 === 0 ? '#FF9D00' : '#e3261d'
                    }}
                  >
                    {val}
                  </p>
                  <p className="text-white/35 text-xs mt-1.5 tracking-wide">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Image */}
          <div className="relative min-h-[360px] md:min-h-0 overflow-hidden">
            <img
              src={service.hero}
              alt={service.title}
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
            {/* Gradient bleed into the left panel */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/20 to-transparent" />
            {/* Subtle bottom vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 to-transparent" />

            {/* Floating service badge */}
            <div className="absolute bottom-8 right-8 bg-white/8 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-white max-w-[200px]">
              <p className="text-[#e3261d] text-[10px] font-bold tracking-widest mb-1">SERVICE</p>
              <p className="font-display font-bold text-lg leading-tight">{service.title}</p>
              <p className="text-white/40 text-xs mt-1">{service.subtitle}</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default ServiceDetail;
