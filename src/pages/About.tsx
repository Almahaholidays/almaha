import React from 'react';
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

/* ─────────────────────────────────────────────
   Shared primitives
───────────────────────────────────────────── */
const Arrow: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

/* ─────────────────────────────────────────────
   1 · HERO
   Full-screen split: text left, portrait image right
───────────────────────────────────────────── */
const Hero: React.FC = () => (
  <section className="relative min-h-screen overflow-hidden bg-primary-dark">
    {/* Background — subtle texture on the left */}
    <div className="absolute inset-0">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/90 to-primary-dark/60" />
    </div>

    {/* Right portrait image — visible on md+ */}
    <div className="absolute right-0 top-0 bottom-0 w-[45%] hidden lg:block overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1583309219338-c2ec0a6c3b46?w=900&q=80"
        alt="Oman landscape"
        className="w-full h-full object-cover"
      />
      {/* Gradient bleeding into dark left */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/30 to-transparent" />
      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 to-transparent" />

      {/* Floating "Est. 1999" badge */}
      <div className="absolute bottom-16 right-10 text-right">
        <p className="text-white/25 text-[10px] tracking-[0.4em] uppercase font-medium mb-1">Established</p>
        <p className="font-display text-6xl font-black text-white/10 leading-none select-none">1999</p>
      </div>
    </div>

    {/* Content */}
    <div className="relative h-full min-h-screen flex items-center z-10">
      <div className="container mx-auto px-6 lg:px-12 pt-32 pb-20">
        <div className="max-w-2xl">

          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-8 animate-slide-up opacity-0">
            <div className="w-8 h-px" style={{ backgroundColor: 'rgba(227, 38, 29, 0.6)' }} />
            <span className="text-[10px] font-bold tracking-[0.45em] uppercase" style={{ color: '#e3261d' }}>
              Al Maha Tourism — Our Story
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-8 animate-slide-up opacity-0">
            Crafting<br />
            <span className="italic font-normal text-white/30">Unforgettable</span><br />
            Journeys
          </h1>

          {/* Divider */}
          <div className="w-12 h-0.5 bg-[#e3261d] mb-8 animate-fade-up opacity-0" />

          {/* Tagline */}
          <p className="text-white/55 text-lg md:text-xl leading-relaxed max-w-lg mb-12 animate-fade-up opacity-0">
            For over 25 years, we have guided travellers through Oman's most extraordinary landscapes —
            with expertise, passion, and an uncompromising commitment to authenticity.
          </p>

          {/* CTA row */}
          {/* <div className="flex flex-col sm:flex-row gap-4 animate-fade-delayed opacity-0">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 bg-primary-orange text-white text-sm font-semibold px-8 py-4 rounded-full hover:bg-opacity-90 transition-all duration-300 shadow-[0_8px_30px_rgba(255,157,0,0.4)] hover:shadow-[0_12px_40px_rgba(255,157,0,0.55)] w-fit"
            >
              Start Your Journey
              <Arrow className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
            </Link>
            <a
              href="#story"
              className="inline-flex items-center gap-3 border border-white/20 bg-white/5 backdrop-blur-sm text-white text-sm font-semibold px-8 py-4 rounded-full hover:bg-white/10 hover:border-white/35 transition-all duration-300 w-fit"
            >
              Our Story
            </a>
          </div> */}
        </div>
      </div>
    </div>

    {/* Bottom scroll cue */}
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
      <span className="text-white/30 text-[9px] tracking-[0.3em] uppercase font-medium">Scroll</span>
      <svg className="w-4 h-4 text-white/35" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   2 · STATS STRIP
   Dark bar — 4 numbers, no cards
───────────────────────────────────────────── */
const StatsStrip: React.FC = () => (
  <section className="bg-[#111111]">
    <div className="container mx-auto px-6 max-w-6xl">
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/8">
        {[
          { value: '25+', label: 'Years of Excellence', sub: 'Est. 1999' },
          { value: '50K+', label: 'Happy Travellers', sub: 'Worldwide' },
          { value: '100+', label: 'Tour Packages', sub: 'Curated Experiences' },
          { value: '4.9★', label: 'Average Rating', sub: 'Google · TripAdvisor' },
        ].map((s, idx) => (
          <div key={s.label} className="px-8 py-10 md:py-12 group">
            <p className={`font-display text-4xl md:text-5xl font-bold text-white leading-none mb-2 transition-colors duration-400 ${idx % 2 === 0 ? 'group-hover:text-[#4e3779]' : 'group-hover:text-[#e3261d]'}`}>
              {s.value}
            </p>
            <p className="text-[11px] font-bold tracking-[0.2em] text-white/60 uppercase mb-1">{s.label}</p>
            <p className="text-white/25 text-[10px] tracking-[0.15em] uppercase">{s.sub}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   3 · OUR STORY
   Two-column: editorial text left + offset image right
───────────────────────────────────────────── */
const OurStory: React.FC = () => {
  const [ref, entry] = useIntersectionObserver({ threshold: 0.1, freezeOnceVisible: true });
  const visible = !!entry?.isIntersecting;

  return (
    <section id="story" ref={ref as React.RefObject<HTMLElement>} className="py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: text */}
          <div className={`transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center gap-5 mb-8">
              <div className="flex-1 h-px bg-neutral-200" />
              <span className="text-[10px] font-bold tracking-[0.4em] text-[#e3261d] uppercase whitespace-nowrap">Our Story</span>
              <div className="flex-1 h-px bg-neutral-200" />
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark leading-[1.0] mb-6">
              Born from a<br />
              <span className="italic font-normal text-neutral-400">love of Oman</span>
            </h2>

            <div className="w-10 h-0.5 bg-[#4e3779] mb-8" />

            {/* Timeline narrative */}
            <div className="space-y-0">
              {[
                { year: '2010', text: 'Founded in Muscat with a single jeep and a profound belief that Oman\'s wonders deserved to be shared with the world. Our first guests were three adventurous travellers from Germany.' },
                { year: '2015', text: 'Expanded into cultural heritage tours, deep-desert expeditions, and coastal cruises. Our team grew to 25 passionate local guides, each an expert in their region.' },
                { year: '2020', text: 'Launched luxury and bespoke itinerary services, welcoming guests from over 40 countries. Recognised by the Omani Tourism Authority for sustainable practices.' },
                { year: 'Today', text: 'Over 50,000 travellers have trusted us with their most treasured memories. We remain a family business — guided by the same values that started it all.' },
              ].map((item, i) => (
                <div
                  key={item.year}
                  className={`flex gap-6 pb-8 transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                  style={{ transitionDelay: visible ? `${(i + 1) * 100}ms` : '0ms' }}
                >
                  {/* Year + vertical line */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <span className={`font-display text-[11px] font-bold tracking-widest mb-2 whitespace-nowrap ${i % 2 === 0 ? 'text-[#4e3779]' : 'text-[#e3261d]'}`}>{item.year}</span>
                    {i < 3 && <div className="flex-1 w-px bg-neutral-200 min-h-[2rem]" />}
                  </div>
                  {/* Text */}
                  <p className="text-neutral-500 text-base leading-relaxed pt-0.5">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image with offset accent frame */}
          <div className={`relative transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-14'}`}>
            <div className="relative pb-8 pl-8">
              {/* Accent frame */}
              <div className="absolute bottom-0 left-0 right-8 top-8 rounded-2xl bg-[#e3261d]/10" />

              <div className="relative z-10 rounded-2xl overflow-hidden aspect-[4/5] shadow-[0_30px_70px_rgba(0,0,0,0.14)]">
                <img
                  src="https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800&q=80"
                  alt="Al Maha Tourism"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Overlay badge */}
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-medium mb-2">Est. 2010 · Muscat, Oman</p>
                  <div className="flex items-end gap-2.5">
                    <span className="font-display text-4xl font-bold text-white leading-none">50K+</span>
                    <span className="text-white/55 text-sm mb-0.5">Happy Travellers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   4 · MISSION & VISION
   Full-width editorial split — no boxed cards
───────────────────────────────────────────── */
const MissionVision: React.FC = () => {
  const [ref, entry] = useIntersectionObserver({ threshold: 0.1, freezeOnceVisible: true });
  const visible = !!entry?.isIntersecting;

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="overflow-hidden">
      <div className={`grid grid-cols-1 lg:grid-cols-2 transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

        {/* Mission — dark panel */}
        <div className="bg-primary-dark px-12 md:px-16 py-24 lg:py-32 flex flex-col justify-center relative overflow-hidden">
          {/* Giant decorative letter */}
          <span className="absolute -right-4 -top-6 font-display text-[14rem] font-black text-white/[0.03] select-none leading-none pointer-events-none">
            M
          </span>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-8 h-px bg-[#e3261d]/50" />
              <span className="text-[10px] font-bold tracking-[0.4em] text-[#e3261d] uppercase">Our Mission</span>
            </div>

            {/* Icon */}
            <div className="w-14 h-14 rounded-xl bg-[#e3261d]/10 border border-[#e3261d]/20 flex items-center justify-center mb-8">
              <svg className="w-6 h-6 text-[#e3261d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>

            <h3 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Authentic.<br />
              <span className="italic font-normal text-white/30">Transformative.</span>
            </h3>

            <div className="w-8 h-0.5 bg-[#e3261d] mb-8" />

            <p className="text-white/50 text-lg leading-relaxed max-w-md">
              To provide authentic, sustainable, and transformative travel experiences that connect our guests with Oman's rich heritage, stunning landscapes, and warm hospitality — while actively supporting the local communities we work within.
            </p>
          </div>
        </div>

        {/* Vision — light panel */}
        <div className="bg-[#F7F5F2] px-12 md:px-16 py-24 lg:py-32 flex flex-col justify-center relative overflow-hidden">
          {/* Giant decorative letter */}
          <span className="absolute -right-4 -top-6 font-display text-[14rem] font-black text-neutral-900/[0.04] select-none leading-none pointer-events-none">
            V
          </span>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-8 h-px bg-[#4e3779]/50" />
              <span className="text-[10px] font-bold tracking-[0.4em] text-[#4e3779] uppercase">Our Vision</span>
            </div>

            {/* Icon */}
            <div className="w-14 h-14 rounded-xl bg-primary-dark/8 border border-primary-dark/10 flex items-center justify-center mb-8">
              <svg className="w-6 h-6 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>

            <h3 className="font-display text-4xl md:text-5xl font-bold text-primary-dark leading-tight mb-6">
              Leading Oman<br />
              <span className="italic font-normal text-neutral-400">to the world.</span>
            </h3>

            <div className="w-8 h-0.5 bg-[#4e3779] mb-8" />

            <p className="text-neutral-500 text-lg leading-relaxed max-w-md">
              To be the leading tourism company in Oman, recognised globally for excellence in service, innovation in travel experiences, and our commitment to preserving Oman's natural and cultural treasures for generations to come.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   5 · WHY CHOOSE US - Interactive Hexagon Grid
───────────────────────────────────────────── */
const values = [
  {
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    title: 'Expert Local Guides',
    desc: 'Our certified guides bring stories and places to life with deep local knowledge, fluency in multiple languages, and a passion for sharing the real Oman — beyond the tourist trail.',
    color: 'from-[#4e3779] to-[#6b4ea8]',
    gradient: 'bg-gradient-to-br from-[#4e3779]/10 to-[#6b4ea8]/10'
  },
  {
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    title: 'Safety First',
    desc: 'Every tour operates under international safety standards with comprehensive insurance, first-aid trained staff, and emergency protocols — so you can explore fearlessly.',
    color: 'from-[#e3261d] to-[#f87171]',
    gradient: 'bg-gradient-to-br from-[#e3261d]/10 to-[#f87171]/10'
  },
  {
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'Guaranteed Best Value',
    desc: 'Transparent pricing with zero hidden fees. We believe exceptional experiences should be accessible — and we stand behind every dirham with our best-value guarantee.',
    color: 'from-[#4e3779] to-[#6b4ea8]',
    gradient: 'bg-gradient-to-br from-[#4e3779]/10 to-[#6b4ea8]/10'
  },
  {
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    title: '24/7 Dedicated Support',
    desc: 'Your journey doesn\'t follow business hours and neither do we. Our support team is available around the clock in multiple languages, wherever your adventure takes you.',
    color: 'from-[#e3261d] to-[#f87171]',
    gradient: 'bg-gradient-to-br from-[#e3261d]/10 to-[#f87171]/10'
  },
  {
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'Sustainable Tourism',
    desc: 'We operate with a genuine commitment to Oman\'s environment and communities — minimising impact, supporting local businesses, and preserving the landscapes that make this country extraordinary.',
    color: 'from-[#4e3779] to-[#6b4ea8]',
    gradient: 'bg-gradient-to-br from-[#4e3779]/10 to-[#6b4ea8]/10'
  },
  {
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    title: 'Personalised Service',
    desc: 'No two travellers are the same. Every itinerary we create is tailored around you — your pace, your interests, your idea of the perfect journey through Oman.',
    color: 'from-[#e3261d] to-[#f87171]',
    gradient: 'bg-gradient-to-br from-[#e3261d]/10 to-[#f87171]/10'
  },
];

const WhyChooseUs: React.FC = () => {
  const [ref, entry] = useIntersectionObserver({ threshold: 0.05, freezeOnceVisible: true });
  const visible = !!entry?.isIntersecting;
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative py-32 bg-gradient-to-b from-white via-neutral-50 to-white overflow-hidden">
      {/* Floating background orbs */}
      <div
        className="absolute top-20 right-10 w-96 h-96 rounded-full blur-3xl"
        style={{
          transform: `translateY(${scrollY * 0.05}px)`,
          background: 'radial-gradient(circle, rgba(78, 55, 121, 0.05) 0%, transparent 70%)'
        }}
      />
      <div
        className="absolute bottom-20 left-10 w-96 h-96 rounded-full blur-3xl"
        style={{
          transform: `translateY(${-scrollY * 0.05}px)`,
          background: 'radial-gradient(circle, rgba(227, 38, 29, 0.05) 0%, transparent 70%)'
        }}
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* LEFT: Content */}
          <div className="lg:col-span-5">
            <div className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* Section intro */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-px bg-gradient-to-r from-[#4e3779] to-[#e3261d]" />
                  <span className="text-[10px] font-bold tracking-[0.4em] text-[#4e3779] uppercase whitespace-nowrap">Why Choose Us</span>
                </div>

                <h3 className="font-display text-4xl md:text-5xl font-black text-primary-dark leading-tight mb-6">
                  Why choose<br />
                  <span className="text-[#e3261d] italic font-light">Al Maha</span>
                </h3>
              </div>

              {/* Dynamic Content based on hover */}
              <div className="relative">
                <div className={`transition-all duration-700 ease-in-out ${activeIndex !== null ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}>
                  {activeIndex !== null && (
                    <div>
                      {/* Number & Title */}
                      <div className="mb-6">
                        <div className="flex items-baseline gap-4 mb-4">
                          <span
                            className="font-display text-7xl font-black leading-none transition-all duration-700"
                            style={{
                              background: activeIndex % 2 === 0
                                ? 'linear-gradient(135deg, #4e3779, #6b4ea8)'
                                : 'linear-gradient(135deg, #e3261d, #f87171)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text'
                            }}
                          >
                            {String(activeIndex + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <h4 className="font-display text-3xl font-bold text-primary-dark mb-6 transition-all duration-700">
                          {values[activeIndex].title}
                        </h4>
                      </div>

                      {/* Full Description */}
                      <p className="text-neutral-600 text-lg leading-relaxed transition-all duration-700">
                        {values[activeIndex].desc}
                      </p>

                      {/* Accent Line */}
                      <div className="mt-8 h-1 w-20 transition-all duration-700"
                        style={{
                          background: activeIndex % 2 === 0
                            ? 'linear-gradient(90deg, #4e3779, #6b4ea8)'
                            : 'linear-gradient(90deg, #e3261d, #f87171)'
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className={`transition-all duration-700 ease-in-out ${activeIndex === null ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}>
                  <p className="text-neutral-500 text-lg leading-relaxed mb-6">
                    Six principles that guide every decision we make and every experience we create. Our commitment to excellence sets us apart.
                  </p>
                  <div className="p-6 bg-gradient-to-br from-[#4e3779]/5 to-[#e3261d]/5 border-l-4 border-[#4e3779]">
                    <p className="text-sm text-neutral-600">
                      Hover over the features to explore what makes Al Maha Tourism different
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Features List */}
          <div className="lg:col-span-7">
            <div className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '200ms' }}>
              <div className="space-y-3">
          {values.map((value, i) => (
            <div
              key={value.title}
              className={`group relative bg-white border-l-4 overflow-hidden transition-all duration-700 ease-in-out hover:translate-x-1 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
              style={{
                transitionDelay: `${i * 80}ms`,
                borderLeftColor: i % 2 === 0 ? '#4e3779' : '#e3261d'
              }}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Animated gradient overlay on hover */}
              <div className={`absolute inset-0 ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

              {/* Sliding glow bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"
                style={{
                  background: i % 2 === 0
                    ? 'linear-gradient(to bottom, #4e3779, #6b4ea8, #4e3779)'
                    : 'linear-gradient(to bottom, #e3261d, #f87171, #e3261d)'
                }}
              />

              {/* Content wrapper */}
              <div className="relative p-6">
                {/* Background number */}
                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-7xl transition-all duration-700 select-none leading-none"
                  style={{
                    color: activeIndex === i
                      ? (i % 2 === 0 ? 'rgba(78, 55, 121, 0.08)' : 'rgba(227, 38, 29, 0.08)')
                      : 'rgba(0, 0, 0, 0.03)',
                    transform: activeIndex === i ? 'translateY(-50%) scale(1.05)' : 'translateY(-50%) scale(1)'
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="relative z-10 flex items-center gap-6">
                  {/* Feature text */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-primary-dark transition-all duration-700">
                      {value.title}
                    </h3>
                    <p className="text-neutral-500 text-sm mt-1 leading-relaxed line-clamp-1 transition-colors duration-700">
                      {value.desc}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <svg
                      className="w-5 h-5 transition-all duration-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{
                        color: activeIndex === i ? (i % 2 === 0 ? '#4e3779' : '#e3261d') : 'rgba(0, 0, 0, 0.2)',
                        transform: activeIndex === i ? 'translateX(4px)' : 'translateX(0)'
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
                <div className="flex-1 h-px bg-gradient-to-r from-[#4e3779]/40 via-[#e3261d]/20 to-transparent" />
                <span className="text-[10px] font-bold tracking-[0.3em] text-[#4e3779]/60 uppercase">
                  Premium Service
                </span>
                <div className="flex-1 h-px bg-gradient-to-l from-[#e3261d]/40 via-[#4e3779]/20 to-transparent" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   6 · MEET THE TEAM
   Single cinematic group photo with caption strip
───────────────────────────────────────────── */
const team = [
  { name: 'Ahmed Al-Balushi',  role: 'Founder & CEO',            specialty: 'Desert & Luxury Expeditions' },
  { name: 'Fatima Al-Rashidi', role: 'Head of Operations',        specialty: 'Guest Experience & Logistics' },
  { name: 'Khalid Al-Habsi',   role: 'Chief Experience Officer',  specialty: 'Adventure & Cultural Design' },
];

const MeetTheTeam: React.FC = () => {
  const [ref, entry] = useIntersectionObserver({ threshold: 0.05, freezeOnceVisible: true });
  const visible = !!entry?.isIntersecting;

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-28 bg-[#111111] overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* ── Header ── */}
        <div className={`mb-14 transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-5 mb-10">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-[10px] font-bold tracking-[0.4em] text-[#e3261d] uppercase whitespace-nowrap">
              The People
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-end">
            <h2 className="font-display text-5xl md:text-6xl font-bold text-white leading-[1.0]">
              The Team<br />
              <span className="italic font-normal text-white/25">Behind Al Maha</span>
            </h2>
            <p className="text-white/40 text-lg leading-relaxed max-w-md lg:pb-1">
              One shared mission. Over 40 combined years guiding travellers through the wonders of Oman.
            </p>
          </div>
        </div>

        {/* ── Cinematic group photo ── */}
        <div
          className={`transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: visible ? '120ms' : '0ms' }}
        >
          {/* Photo wrapper */}
          <div className="relative overflow-hidden rounded-3xl aspect-[16/7] group">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80"
              alt="The Al Maha Tourism team"
              className="w-full h-full object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
            />

            {/* Gradient: bottom-heavy for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
            {/* Side vignette */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

            {/* Top red accent line */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#e3261d]/80 to-transparent" />

            {/* Bottom-left: "Al Maha Team" wordmark */}
            <div className="absolute bottom-0 inset-x-0 p-7 md:p-10 flex items-end justify-between gap-6">
              <div>
                <p className="text-[9px] font-bold tracking-[0.45em] text-[#e3261d] uppercase mb-2">
                  Est. 2010 · Muscat, Oman
                </p>
                <p className="font-display text-2xl md:text-3xl font-bold text-white leading-tight">
                  The Al Maha Team
                </p>
              </div>

              {/* Bottom-right: quick stat */}
              <div className="flex-shrink-0 text-right hidden sm:block">
                <p className="font-display text-4xl md:text-5xl font-black text-white/10 leading-none select-none">
                  41+
                </p>
                <p className="text-white/25 text-[9px] tracking-[0.25em] uppercase mt-0.5">
                  Combined Years
                </p>
              </div>
            </div>
          </div>

          {/* ── Caption / member strip ── */}
          <div
            className={`mt-4 rounded-2xl border border-white/8 bg-white/[0.03] px-6 md:px-8 py-5 transition-all duration-700 ease-out
              ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: visible ? '300ms' : '0ms' }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

              {/* Left: individual credits */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-0 sm:divide-x sm:divide-white/8">
                {team.map((member) => (
                  <div key={member.name} className="sm:px-6 first:pl-0 last:pr-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e3261d] flex-shrink-0" />
                      <p className="text-white text-sm font-semibold leading-none">{member.name}</p>
                    </div>
                    <p className="text-white/35 text-[10px] tracking-[0.12em] uppercase pl-3.5">{member.role}</p>
                    <p className="text-white/20 text-[9px] leading-snug pl-3.5 mt-0.5">{member.specialty}</p>
                  </div>
                ))}
              </div>

              {/* Right: live indicator */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e3261d] animate-pulse" />
                <span className="text-white/25 text-[10px] tracking-[0.3em] uppercase font-bold">
                  Al Maha Tourism
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Collective team quote ── */}
        <div
          className={`mt-20 pt-16 border-t border-white/8 text-center transition-all duration-700 ease-out
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: visible ? '450ms' : '0ms' }}
        >
          <span className="font-display text-6xl text-[#e3261d]/30 leading-none select-none block mb-4">"</span>

          <p className="font-display text-2xl md:text-3xl lg:text-4xl italic font-normal text-white/40 leading-relaxed max-w-3xl mx-auto">
            We don't just plan tours. We open doors to the real Oman — the one that stays with you long after you return home.
          </p>

          <div className="flex items-center justify-center gap-5 mt-10">
            <div className="w-12 h-px bg-white/10" />
            <span className="text-white/20 text-[10px] tracking-[0.35em] uppercase font-bold">The Al Maha Team</span>
            <div className="w-12 h-px bg-white/10" />
          </div>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-10 mt-12">
            {[
              { value: '41+', label: 'Combined Years' },
              { value: '50K+', label: 'Journeys Crafted' },
              { value: '4.9★', label: 'Average Rating' },
            ].map((s, i, arr) => (
              <React.Fragment key={s.label}>
                <div className="text-center">
                  <p className="font-display text-3xl font-bold text-white leading-none">{s.value}</p>
                  <p className="text-white/25 text-[9px] tracking-[0.25em] uppercase mt-1.5">{s.label}</p>
                </div>
                {i < arr.length - 1 && <div className="w-px h-8 bg-white/10" />}
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   7 · CTA
   Full-width dark with parallax bg
───────────────────────────────────────────── */
const CTA: React.FC = () => {
  const [ref, entry] = useIntersectionObserver({ threshold: 0.15, freezeOnceVisible: true });
  const visible = !!entry?.isIntersecting;

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative py-36 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=1920&q=80')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/65" />

      <div className={`relative container mx-auto px-6 max-w-6xl transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* Left */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-white/20" />
              <span className="text-[10px] font-bold tracking-[0.4em] text-[#e3261d] uppercase">Start Your Journey</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.0] mb-6">
              Your Oman<br />
              <span className="italic font-normal text-white/30">story awaits.</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed max-w-md">
              From a single afternoon in Muscat to a two-week grand traverse of the country — our team is ready to build your perfect journey.
            </p>
          </div>

          {/* Right: action panels */}
          <div className="flex flex-col gap-4">
            <Link
              to="/contact"
              className="group flex items-center justify-between gap-4 bg-[#e3261d] hover:bg-[#c01f18] rounded-2xl px-8 py-7 transition-all duration-300 shadow-[0_8px_40px_rgba(227,38,29,0.35)] hover:shadow-[0_12px_50px_rgba(227,38,29,0.5)]"
            >
              <div>
                <p className="text-[9px] font-bold tracking-[0.3em] text-white/70 uppercase mb-1">Get in Touch</p>
                <p className="text-white font-display text-2xl font-bold">Plan Your Trip</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors duration-300">
                <Arrow className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform duration-300" />
              </div>
            </Link>

            <Link
              to="/"
              className="group flex items-center justify-between gap-4 border border-white/15 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/25 rounded-2xl px-8 py-7 transition-all duration-300"
            >
              <div>
                <p className="text-[9px] font-bold tracking-[0.3em] text-white/40 uppercase mb-1">Explore</p>
                <p className="text-white font-display text-2xl font-bold">Our Destinations</p>
              </div>
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:border-white/40 transition-colors duration-300">
                <Arrow className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
            </Link>

            {/* Trust micro-strip */}
            <div className="flex items-center gap-6 pt-2 border-t border-white/10">
              {[{ v: '50K+', l: 'Travellers' }, { v: '4.9★', l: 'Rated' }, { v: '25+', l: 'Years' }].map((s, i, arr) => (
                <React.Fragment key={s.l}>
                  <div>
                    <p className="font-display text-xl font-bold text-white leading-none">{s.v}</p>
                    <p className="text-white/30 text-[9px] tracking-[0.2em] uppercase mt-1">{s.l}</p>
                  </div>
                  {i < arr.length - 1 && <div className="w-px h-6 bg-white/10" />}
                </React.Fragment>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   Page root
───────────────────────────────────────────── */
const About: React.FC = () => (
  <div>
    <Hero />
    <StatsStrip />
    <OurStory />
    <MissionVision />
    <WhyChooseUs />
    <MeetTheTeam />
    <CTA />
  </div>
);

export default About;
