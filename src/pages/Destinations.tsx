import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const destinations = [
  {
    slug: 'muscat',
    title: 'Muscat',
    tag: 'City Life',
    region: 'Muscat Governorate',
    highlights: '40+ Tours',
    bestFor: 'Culture, Architecture, Coastline',
    description: 'The vibrant capital blending modernity with ancient Arabian charm — where grand mosques meet a glittering coastline.',
    image: 'https://images.unsplash.com/photo-1601890976279-0b4ff3233938?w=1200&q=80',
  },
  {
    slug: 'wahiba-sands',
    title: 'Wahiba Sands',
    tag: 'Desert',
    region: 'Al Sharqiyah',
    highlights: '25+ Tours',
    bestFor: 'Dunes, Bedouin Life, Stargazing',
    description: 'Endless golden dunes and authentic Bedouin experiences beneath a star-filled desert sky.',
    image: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=1200&q=80',
  },
  {
    slug: 'nizwa',
    title: 'Nizwa',
    tag: 'Heritage',
    region: 'Ad Dakhiliyah',
    highlights: '18+ Tours',
    bestFor: 'Forts, Souqs, Old Villages',
    description: 'Historic forts and traditional souks in the cultural heartland of Oman.',
    image: '/destinations/Nizwa2.jpeg',
  },
  {
    slug: 'salalah',
    title: 'Salalah',
    tag: 'Coastal',
    region: 'Dhofar',
    highlights: '22+ Tours',
    bestFor: 'Monsoon, Beaches, Frankincense',
    description: 'Tropical paradise with misty monsoons, frankincense groves, and pristine beaches.',
    image: 'https://cdn.pixabay.com/photo/2020/07/06/13/33/wadi-5377073_1280.jpg',
  },
  {
    slug: 'jebel-akhdar',
    title: 'Jebel Akhdar',
    tag: 'Mountains',
    region: 'Ad Dakhiliyah',
    highlights: '15+ Tours',
    bestFor: 'Rose Gardens, Trekking, Wadis',
    description: 'Terraced rose gardens and cool mountain retreats high above the Omani plains.',
    image: '/destinations/Jebelakhdar.jpeg',
  },
  {
    slug: 'sur',
    title: 'Sur',
    tag: 'Coastal',
    region: 'Al Sharqiyah',
    highlights: '12+ Tours',
    bestFor: 'Dhow Building, Sea Turtles, Lagoon',
    description: 'Ancient shipbuilding traditions meet pristine coastline where sea turtles nest each night.',
    image: 'https://cdn.pixabay.com/photo/2021/01/30/12/30/oman-5963720_1280.jpg',
  },
];

const ALL = 'All';
const filterTabs = [ALL, 'City Life', 'Desert', 'Heritage', 'Coastal', 'Mountains'];

/* ─────────────────────────────────────────────
   Shared arrow
───────────────────────────────────────────── */
const Arrow: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

/* ─────────────────────────────────────────────
   1 · HERO
   Full-screen dark with editorial typography
   and live destination index strip
───────────────────────────────────────────── */
const Hero: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);
  const current = active ? destinations.find((d) => d.slug === active) : null;

  return (
    <section className="relative min-h-screen bg-[#0D0D0D] overflow-hidden flex flex-col">

      {/* Background image — swaps on hover of destination index */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out opacity-0"
        style={{
          backgroundImage: current ? `url('${current.image}')` : undefined,
          opacity: current ? 0.18 : 0,
        }}
      />
      {/* Static subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0D0D0D]" />

      {/* ── Main content ── */}
      <div className="relative flex-1 flex flex-col justify-center container mx-auto px-6 lg:px-12 pt-32 pb-20">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: editorial heading */}
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-8 animate-slide-up opacity-0">
              <div className="w-8 h-px bg-[#e3261d]/60" />
              <span className="text-[10px] font-bold tracking-[0.45em] text-[#e3261d] uppercase">
                Al Maha Tourism · 6 Destinations · Oman
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-display text-7xl md:text-8xl lg:text-[9rem] font-bold text-white leading-[0.88] mb-8 animate-slide-up opacity-0">
              Where<br />
              <span className="italic font-normal text-white/20">Will You</span><br />
              Go?
            </h1>

            <div className="w-12 h-0.5 bg-[#e3261d] mb-8 animate-fade-up opacity-0" />

            <p className="text-white/40 text-lg leading-relaxed max-w-sm animate-fade-up opacity-0">
              Six extraordinary corners of Oman. Each one unmistakably itself. Hover a destination to preview — click to explore.
            </p>
          </div>

          {/* Right: destination index — the interactive element */}
          <div className="animate-fade-delayed opacity-0">
            <p className="text-[9px] font-bold tracking-[0.4em] text-white/20 uppercase mb-6">
              — Our Destinations
            </p>

            <div className="flex flex-col">
              {destinations.map((d, i) => (
                <Link
                  key={d.slug}
                  to={`/destinations/${d.slug}`}
                  onMouseEnter={() => setActive(d.slug)}
                  onMouseLeave={() => setActive(null)}
                  className="group flex items-center justify-between gap-6 py-4 border-b border-white/8 hover:border-[#e3261d]/30 transition-all duration-300 hover:pl-3"
                >
                  <div className="flex items-center gap-5 min-w-0">
                    {/* Index */}
                    <span className="font-display text-[11px] font-bold text-white/20 group-hover:text-[#e3261d] transition-colors duration-300 tabular-nums flex-shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {/* Name */}
                    <span className="font-display text-2xl md:text-3xl font-bold text-white/60 group-hover:text-white transition-colors duration-300 leading-none">
                      {d.title}
                    </span>
                    {/* Tag — reveals on hover */}
                    <span className="text-[9px] font-bold tracking-[0.2em] text-[#e3261d] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                      {d.tag}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-white/20 text-[10px] group-hover:text-white/40 transition-colors duration-300 hidden md:block">
                      {d.region}
                    </span>
                    <Arrow className="w-4 h-4 text-white/15 group-hover:text-[#e3261d] group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </Link>
              ))}
            </div>

            {/* Scroll cue */}
            <p className="text-white/15 text-[9px] tracking-[0.3em] uppercase mt-8">
              Or scroll down to browse all destinations ↓
            </p>
          </div>
        </div>
      </div>

      {/* Ghost "06" — decorative */}
      <span className="absolute bottom-0 right-0 font-display text-[22rem] font-black text-white/[0.018] select-none leading-none pointer-events-none hidden lg:block">
        06
      </span>
    </section>
  );
};

/* ─────────────────────────────────────────────
   2 · DESTINATION CARD
───────────────────────────────────────────── */
const DestCard: React.FC<{
  dest: typeof destinations[number];
  index: number;
  dimmed: boolean;
  visible: boolean;
  delay: number;
}> = ({ dest, index, dimmed, visible, delay }) => (
  /* Outer div — scroll entrance ONLY (opacity + translateY + stagger delay) */
  <div
    className={`h-full transition-all duration-700 ease-out
      ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
  {/* Inner Link — filter state ONLY (no delay, instant feedback) */}
  <Link
    to={`/destinations/${dest.slug}`}
    className={`group relative overflow-hidden rounded-2xl cursor-pointer block h-full
      transition-all duration-500 ease-out
      ${dimmed
        ? 'opacity-20 scale-[0.97] grayscale pointer-events-none'
        : 'opacity-100 scale-100 grayscale-0'}
    `}
  >
    {/* Image */}
    <div
      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
      style={{ backgroundImage: `url('${dest.image}')` }}
    />

    {/* Gradient overlays */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-b from-black/25 to-transparent" />

    {/* Top row */}
    <div className="absolute top-5 left-5 right-5 flex items-start justify-between z-10">
      {/* Tag pill */}
      <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 text-white text-[9px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full">
        <span className="w-1 h-1 rounded-full bg-[#e3261d] flex-shrink-0" />
        {dest.tag}
      </span>
      {/* Index */}
      <span className="font-display text-white/15 text-sm font-bold tabular-nums">
        {String(index + 1).padStart(2, '0')}
      </span>
    </div>

    {/* Bottom content */}
    <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
      {/* Growing accent line */}
      <div className="w-6 h-0.5 bg-[#e3261d] mb-3 group-hover:w-12 transition-all duration-500" />

      <h3 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight mb-1">
        {dest.title}
      </h3>

      {/* Region — always visible */}
      <p className="text-white/35 text-[10px] tracking-[0.2em] uppercase mb-3">{dest.region}</p>

      {/* Description — slides up on hover */}
      <p className="text-white/55 text-sm leading-relaxed mb-4
        opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0
        transition-all duration-500 max-w-xs">
        {dest.description}
      </p>

      {/* Meta row — fades in */}
      <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
        <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30">
          {dest.bestFor}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold tracking-widest uppercase text-[#e3261d]">Explore</span>
          <Arrow className="w-3.5 h-3.5 text-[#e3261d]" />
        </div>
      </div>
    </div>

    {/* Hover: red border accent */}
    <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#e3261d]/20 rounded-2xl transition-colors duration-500 pointer-events-none" />
  </Link>
  </div>
);

/* ─────────────────────────────────────────────
   3 · GRID SECTION
   Creative asymmetric bento with filter tabs
───────────────────────────────────────────── */
const GridSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState(ALL);
  const [ref, entry] = useIntersectionObserver({ threshold: 0.04, freezeOnceVisible: true });
  const visible = !!entry?.isIntersecting;

  const isDimmed = (dest: typeof destinations[number]) =>
    activeFilter !== ALL && dest.tag !== activeFilter;

  const delays = [0, 80, 160, 80, 160, 240];

  return (
    <section className="py-24 bg-[#F7F5F2] overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1400px]">

        {/* ── Section header ── */}
        <div className={`mb-14 transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
            <div>
              <div className="flex items-center gap-5 mb-6">
                <div className="flex-1 h-px bg-neutral-300/60 max-w-[60px]" />
                <span className="text-[10px] font-bold tracking-[0.4em] text-[#e3261d] uppercase whitespace-nowrap">
                  All Destinations
                </span>
              </div>
              <h2 className="font-display text-5xl md:text-6xl font-bold text-primary-dark leading-[1.0]">
                Choose Your<br />
                <span className="italic font-normal text-neutral-400">Adventure</span>
              </h2>
            </div>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2 lg:pb-2">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-5 py-2.5 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 ${
                    activeFilter === tab
                      ? 'bg-primary-dark text-white shadow-[0_4px_16px_rgba(0,0,0,0.2)]'
                      : 'bg-white border border-neutral-200 text-neutral-500 hover:border-[#e3261d]/30 hover:text-[#e3261d]'
                  }`}
                >
                  {tab}
                  {tab !== ALL && (
                    <span className={`ml-1.5 text-[9px] ${activeFilter === tab ? 'text-white/50' : 'text-neutral-300'}`}>
                      {destinations.filter((d) => d.tag === tab).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Asymmetric bento grid ── */}
        <div ref={ref as React.RefObject<HTMLDivElement>} className="grid grid-cols-12 gap-3 md:gap-4">

          {/* ROW 1 ─ hero left (7) + tall right (5) */}
          <div className="col-span-12 md:col-span-7 h-[420px] md:h-[560px]">
            <DestCard dest={destinations[0]} index={0} dimmed={isDimmed(destinations[0])} visible={visible} delay={delays[0]} />
          </div>
          <div className="col-span-12 md:col-span-5 h-[360px] md:h-[560px]">
            <DestCard dest={destinations[1]} index={1} dimmed={isDimmed(destinations[1])} visible={visible} delay={delays[1]} />
          </div>

          {/* ROW 2 ─ three equal (4 each) */}
          <div className="col-span-12 md:col-span-4 h-[300px] md:h-[360px]">
            <DestCard dest={destinations[2]} index={2} dimmed={isDimmed(destinations[2])} visible={visible} delay={delays[2]} />
          </div>
          <div className="col-span-12 md:col-span-4 h-[300px] md:h-[360px]">
            <DestCard dest={destinations[3]} index={3} dimmed={isDimmed(destinations[3])} visible={visible} delay={delays[3]} />
          </div>
          <div className="col-span-12 md:col-span-4 h-[300px] md:h-[360px]">
            <DestCard dest={destinations[4]} index={4} dimmed={isDimmed(destinations[4])} visible={visible} delay={delays[4]} />
          </div>

          {/* ROW 3 ─ wide finale (12) */}
          <div className="col-span-12 h-[260px]">
            <DestCard dest={destinations[5]} index={5} dimmed={isDimmed(destinations[5])} visible={visible} delay={delays[5]} />
          </div>

        </div>

        {/* Active filter count */}
        {activeFilter !== ALL && (
          <p className="mt-6 text-neutral-400 text-sm text-center">
            Showing{' '}
            <span className="font-bold text-primary-dark">
              {destinations.filter((d) => d.tag === activeFilter).length}
            </span>{' '}
            destination{destinations.filter((d) => d.tag === activeFilter).length !== 1 ? 's' : ''} for{' '}
            <span className="text-[#e3261d] font-bold">{activeFilter}</span>
          </p>
        )}

      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   4 · JOURNEY PLANNER STRIP
   "Not sure where to go?" — recommendation by travel style
───────────────────────────────────────────── */
// const plannerOptions = [
//   { label: 'I love culture & history', slug: 'nizwa', dest: 'Nizwa', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
//   { label: 'I want desert & stars', slug: 'wahiba-sands', dest: 'Wahiba Sands', icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z' },
//   { label: 'I crave mountain air', slug: 'jebel-akhdar', dest: 'Jebel Akhdar', icon: 'M3 20l6-10 4 6 3-4 5 8H3z' },
//   { label: 'I seek coast & sea', slug: 'sur', dest: 'Sur', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
//   { label: 'I want it all', slug: 'muscat', dest: 'Muscat', icon: 'M5 3l14 9-14 9V3z' },
// ];

// const PlannerStrip: React.FC = () => {
//   const [ref, entry] = useIntersectionObserver({ threshold: 0.15, freezeOnceVisible: true });
//   const visible = !!entry?.isIntersecting;
//   const [hovered, setHovered] = useState<string | null>(null);

//   return (
//     <section ref={ref as React.RefObject<HTMLElement>} className="bg-[#111111] py-24 overflow-hidden">
//       <div className="container mx-auto px-6 max-w-6xl">

//         <div className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

//           {/* Header */}
//           <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
//             <div>
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="w-8 h-px bg-white/15" />
//                 <span className="text-[10px] font-bold tracking-[0.4em] text-primary-orange uppercase">
//                   Not Sure Where to Go?
//                 </span>
//               </div>
//               <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-[1.0]">
//                 Find Your<br />
//                 <span className="italic font-normal text-white/25">Perfect Match</span>
//               </h2>
//             </div>
//             <p className="text-white/30 text-base leading-relaxed max-w-xs lg:pb-1">
//               Tell us what excites you — we'll point you straight to the right destination.
//             </p>
//           </div>

//           {/* Recommendation pills */}
//           <div className="flex flex-col gap-0">
//             <div className="h-px bg-white/8" />
//             {plannerOptions.map((opt, i) => (
//               <React.Fragment key={opt.slug}>
//                 <Link
//                   to={`/destinations/${opt.slug}`}
//                   onMouseEnter={() => setHovered(opt.slug)}
//                   onMouseLeave={() => setHovered(null)}
//                   className={`group flex items-center justify-between gap-6 py-5 md:py-6 hover:pl-3 transition-all duration-300
//                     ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
//                   style={{ transitionDelay: visible ? `${i * 60}ms` : '0ms' }}
//                 >
//                   <div className="flex items-center gap-5 min-w-0">
//                     {/* Icon circle */}
//                     <div className={`w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
//                       hovered === opt.slug
//                         ? 'bg-primary-orange border-primary-orange'
//                         : 'border-white/12 bg-white/5'
//                     }`}>
//                       <svg className={`w-4 h-4 transition-colors duration-300 ${hovered === opt.slug ? 'text-white' : 'text-white/30'}`}
//                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={opt.icon} />
//                       </svg>
//                     </div>

//                     {/* Travel style */}
//                     <span className={`font-display text-2xl md:text-3xl font-bold transition-colors duration-300 ${
//                       hovered === opt.slug ? 'text-white' : 'text-white/40'
//                     }`}>
//                       {opt.label}
//                     </span>
//                   </div>

//                   {/* Destination name reveal + arrow */}
//                   <div className="flex items-center gap-3 flex-shrink-0">
//                     <span className={`text-[11px] font-bold tracking-widest uppercase transition-all duration-300 ${
//                       hovered === opt.slug ? 'text-primary-orange opacity-100' : 'text-white/20 opacity-0 md:opacity-100'
//                     }`}>
//                       {opt.dest}
//                     </span>
//                     <div className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
//                       hovered === opt.slug
//                         ? 'bg-primary-orange border-primary-orange'
//                         : 'border-white/12'
//                     }`}>
//                       <Arrow className={`w-3.5 h-3.5 transition-all duration-300 ${
//                         hovered === opt.slug ? 'text-white translate-x-0.5' : 'text-white/25'
//                       }`} />
//                     </div>
//                   </div>
//                 </Link>
//                 <div className={`h-px transition-colors duration-300 ${hovered === opt.slug ? 'bg-primary-orange/20' : 'bg-white/8'}`} />
//               </React.Fragment>
//             ))}
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

/* ─────────────────────────────────────────────
   5 · CTA BANNER
   Full-width parallax dark → contact
───────────────────────────────────────────── */
const CTABanner: React.FC = () => {
  const [ref, entry] = useIntersectionObserver({ threshold: 0.2, freezeOnceVisible: true });
  const visible = !!entry?.isIntersecting;

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=1920&q=80')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/96 via-black/85 to-black/70" />
      <div className="absolute inset-0 bg-[#e3261d]/10" />

      <div className={`relative container mx-auto px-6 max-w-6xl transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">

          {/* Left */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-white/20" />
              <span className="text-[10px] font-bold tracking-[0.4em] text-[#e3261d] uppercase">
                Ready to Book?
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.0]">
              Let's plan your<br />
              <span className="italic font-normal text-white/30">Oman journey.</span>
            </h2>
          </div>

          {/* Right: action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 bg-[#e3261d] text-white text-sm font-semibold px-8 py-4 rounded-full hover:bg-[#c01f18] transition-all duration-300 shadow-[0_8px_30px_rgba(227,38,29,0.4)] hover:shadow-[0_12px_40px_rgba(227,38,29,0.55)]"
            >
              Plan My Trip
              <Arrow className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
            </Link>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-3 border border-white/25 bg-white/8 backdrop-blur-sm text-white text-sm font-semibold px-8 py-4 rounded-full hover:bg-white/15 hover:border-white/40 transition-all duration-300"
            >
              View Gallery
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-3 border border-white/25 bg-white/8 backdrop-blur-sm text-white text-sm font-semibold px-8 py-4 rounded-full hover:bg-white/15 hover:border-white/40 transition-all duration-300"
            >
              About Al Maha
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   Page root
───────────────────────────────────────────── */
const Destinations: React.FC = () => (
  <div>
    <Hero />
    <GridSection />
    {/* <PlannerStrip /> */}
    <CTABanner />
  </div>
);

export default Destinations;
