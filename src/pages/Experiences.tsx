import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

/* ─────────────────────────── DATA ─────────────────────────── */

const experiences = [
  {
    slug: 'mice',
    title: 'MICE',
    letter: 'M',
    num: '01',
    fullName: 'Meetings, Incentives, Conferences & Exhibitions',
    tagline: 'Where Business Meets Excellence',
    description:
      'Transform corporate events into memorable experiences with world-class venues, seamless logistics, and professional event management across Oman.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80',
    features: [
      'State-of-the-Art Venues',
      'Dedicated Event Managers',
      'Custom Catering & AV',
      'Team Building Activities',
    ],
    stat: { value: '500+', label: 'Events Hosted' },
    accentImages: [
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
    ],
  },
  {
    slug: 'fit',
    title: 'FIT',
    letter: 'F',
    num: '02',
    fullName: 'Free Independent Traveler',
    tagline: 'Your Journey, Your Way',
    description:
      'Explore Oman at your own pace with personalized itineraries, flexible schedules, and tailored experiences crafted entirely around you.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80',
    features: [
      'Fully Custom Itineraries',
      'Private Transport',
      'Dedicated Personal Guide',
      'Total Scheduling Flexibility',
    ],
    stat: { value: '1,200+', label: 'Solo Journeys' },
    accentImages: [
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80',
    ],
  },
  {
    slug: 'group',
    title: 'GROUP',
    letter: 'G',
    num: '03',
    fullName: 'Group Tours & Travel',
    tagline: 'Share the Adventure',
    description:
      "Join fellow adventurers on curated journeys blending camaraderie, culture, and unforgettable moments across Oman's most iconic landscapes.",
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80',
    features: [
      'Small Groups (max 12)',
      'Expert Tour Leaders',
      'All-Inclusive Packages',
      'Solo Traveler Friendly',
    ],
    stat: { value: '350+', label: 'Group Tours' },
    accentImages: [
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&q=80',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=80',
    ],
  },
  {
    slug: 'wedding',
    title: 'WEDDING',
    letter: 'W',
    num: '04',
    fullName: 'Destination Weddings',
    tagline: 'Say "I Do" in Paradise',
    description:
      'Celebrate your most important day in breathtaking settings — from beachfront vows to desert ceremonies — with flawless end-to-end planning.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
    features: [
      'Exclusive Venue Access',
      'Full Event Coordination',
      'Cultural Fusion Planning',
      'Honeymoon Planning Included',
    ],
    stat: { value: '200+', label: 'Weddings Planned' },
    accentImages: [
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80',
    ],
  },
] as const;

/* ─────────────────────────── PRIMITIVES ─────────────────────────── */

const Arrow: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

/* ─────────────────────────── HERO ─────────────────────────── */

const Hero: React.FC = () => {
  const [ref, entry] = useIntersectionObserver({ threshold: 0.1, freezeOnceVisible: true });
  const visible = !!entry?.isIntersecting;

  return (
    <section className="min-h-screen bg-[#0A0A0A] flex items-center overflow-hidden pt-20">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="container mx-auto px-6 max-w-7xl w-full py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: editorial text ── */}
          <div className={`transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

            {/* Eyebrow */}
            <div className="flex items-center gap-5 mb-10">
              <div className="w-10 h-px bg-primary-orange" />
              <span className="text-[9px] font-bold tracking-[0.45em] text-primary-orange uppercase">
                Al Maha — Special Events
              </span>
            </div>

            {/* Heading */}
            <h1
              className="font-display font-bold text-white leading-[1.0] mb-8"
              style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
            >
              Four ways<br />
              to{' '}
              <span className="italic font-normal text-primary-orange">experience</span><br />
              Oman.
            </h1>

            {/* Description */}
            <p className="text-white/45 text-lg leading-relaxed max-w-[420px] mb-12">
              From intimate destination weddings to large-scale corporate conferences —
              every experience we craft is a testament to Omani excellence.
            </p>

            {/* 4 type grid — anchor links */}
            <div className="grid grid-cols-2 gap-2 max-w-[440px]">
              {experiences.map((exp) => (
                <a
                  key={exp.slug}
                  href={`#${exp.slug}`}
                  className="group flex items-center gap-3 p-4 border border-white/10 hover:border-primary-orange/50 hover:bg-primary-orange/5 transition-all duration-300 rounded-lg"
                >
                  <span className="font-display text-white/20 text-xs font-bold tabular-nums leading-none">
                    {exp.num}
                  </span>
                  <div>
                    <p className="text-white font-bold text-sm tracking-wide leading-none mb-0.5">
                      {exp.title}
                    </p>
                    <p className="text-white/25 text-[9px] tracking-wide uppercase leading-none">
                      {exp.tagline}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: 2×2 photo grid ── */}
          <div
            className={`hidden lg:grid grid-cols-2 gap-2.5 h-[580px] transition-all duration-1000 delay-300 ease-out ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            {experiences.map((exp) => (
              <a
                key={exp.slug}
                href={`#${exp.slug}`}
                className="group relative overflow-hidden rounded-2xl"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${exp.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Orange top sweep on hover */}
                <div className="absolute top-0 left-0 h-0.5 w-0 bg-primary-orange group-hover:w-full transition-all duration-500" />

                {/* Bottom label */}
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-primary-orange text-[9px] font-bold tracking-[0.3em] uppercase mb-1">
                    {exp.num}
                  </p>
                  <p className="font-display text-white font-bold text-xl leading-tight">
                    {exp.title}
                  </p>
                  <p className="text-white/35 text-[10px] tracking-wide mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {exp.tagline}
                  </p>
                </div>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────── STATS STRIP ─────────────────────────── */

const StatsStrip: React.FC = () => {
  const [ref, entry] = useIntersectionObserver({ threshold: 0.3, freezeOnceVisible: true });
  const visible = !!entry?.isIntersecting;

  const stats = [
    { value: '4', label: 'Experience Types' },
    { value: '1,000+', label: 'Events Delivered' },
    { value: '25+', label: 'Years in Oman' },
    { value: '50K+', label: 'Happy Guests' },
  ];

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`bg-[#111111] border-t border-white/5 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center py-10 px-6">
              <p className="font-display text-3xl md:text-4xl font-bold text-white leading-none mb-2">
                {s.value}
              </p>
              <p className="text-white/30 text-[9px] font-bold tracking-[0.3em] uppercase text-center">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────── TYPE NAV ─────────────────────────── */

const TypeNav: React.FC = () => (
  <div className="sticky z-40 bg-white border-b border-neutral-200 shadow-sm" style={{ top: '72px' }}>
    <div className="container mx-auto px-6 max-w-7xl">
      <div className="flex items-stretch overflow-x-auto">
        {experiences.map((exp) => (
          <a
            key={exp.slug}
            href={`#${exp.slug}`}
            className="group flex-shrink-0 flex items-center gap-3 px-6 py-[18px] border-r border-neutral-100 hover:bg-neutral-50 transition-colors duration-200"
          >
            <span className="text-neutral-300 text-[9px] font-bold tabular-nums">{exp.num}</span>
            <div>
              <p className="font-bold text-[10px] tracking-[0.18em] text-neutral-700 group-hover:text-primary-orange transition-colors duration-200 uppercase">
                {exp.title}
              </p>
              <p className="text-neutral-400 text-[9px] tracking-wide hidden sm:block leading-none mt-0.5">
                {exp.tagline}
              </p>
            </div>
          </a>
        ))}
        <Link
          to="/contact"
          className="ml-auto flex-shrink-0 flex items-center gap-2 px-6 py-[18px] bg-primary-orange text-white font-bold text-[10px] tracking-[0.18em] uppercase hover:bg-orange-500 transition-colors duration-200 whitespace-nowrap"
        >
          Get in Touch
          <Arrow className="w-3 h-3" />
        </Link>
      </div>
    </div>
  </div>
);

/* ─────────────────────────── EXPERIENCE SECTION ─────────────────────────── */

type ExpType = typeof experiences[number];

const ExperienceSection: React.FC<{
  exp: ExpType;
  dark: boolean;
  imageLeft: boolean;
}> = ({ exp, dark, imageLeft }) => {
  const [ref, entry] = useIntersectionObserver({ threshold: 0.07, freezeOnceVisible: true });
  const visible = !!entry?.isIntersecting;

  const bg = dark ? 'bg-[#111111]' : 'bg-[#F7F5F2]';
  const headingColor = dark ? 'text-white' : 'text-primary-dark';
  const textColor = dark ? 'text-white/50' : 'text-neutral-500';
  const lineColor = dark ? 'bg-white/10' : 'bg-neutral-200';
  const featureColor = dark ? 'text-white/40' : 'text-neutral-500';
  const ghostColor = dark ? 'text-white/[0.03]' : 'text-primary-dark/[0.04]';
  const ctaBtnBase = dark
    ? 'bg-white/10 border border-white/15 group-hover:bg-primary-orange group-hover:border-primary-orange'
    : 'bg-primary-dark group-hover:bg-primary-orange border border-transparent';
  const ctaLabelColor = dark
    ? 'text-white/40 group-hover:text-white'
    : 'text-neutral-500 group-hover:text-primary-dark';

  return (
    <section
      id={exp.slug}
      className={`${bg} overflow-hidden`}
      style={{ scrollMarginTop: '148px' }}
    >
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`flex flex-col ${imageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} min-h-[680px] items-stretch`}
      >
        {/* ── Image column ── */}
        <div
          className={`w-full lg:w-[55%] relative overflow-hidden min-h-[380px] lg:min-h-0
            transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
            ${visible
              ? 'opacity-100 translate-x-0'
              : imageLeft
                ? 'opacity-0 -translate-x-12'
                : 'opacity-0 translate-x-12'
            }`}
        >
          {/* Main image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-[1.03]"
            style={{ backgroundImage: `url('${exp.image}')` }}
          />

          {/* Bottom dark vignette for stat legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

          {/* Orange accent line at the very top */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary-orange" />

          {/* Index badge top */}
          <div className="absolute top-7 left-7 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <span className="font-display text-[10px] font-bold text-white">{exp.num}</span>
            </div>
            <span className="text-white/35 text-[9px] tracking-[0.3em] uppercase font-medium">
              Al Maha Events
            </span>
          </div>

          {/* Accent images — small stacked thumbnails bottom-left */}
          <div className="absolute bottom-7 left-7 flex gap-2">
            {exp.accentImages.map((img, i) => (
              <div
                key={i}
                className="w-16 h-16 rounded-lg overflow-hidden border border-white/20 shadow-lg"
              >
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${img}')` }}
                />
              </div>
            ))}
          </div>

          {/* Stat bottom-right */}
          <div className="absolute bottom-7 right-7 text-right">
            <p className="font-display font-black text-white leading-none" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
              {exp.stat.value}
            </p>
            <p className="text-white/40 text-[9px] tracking-[0.3em] uppercase mt-1">
              {exp.stat.label}
            </p>
          </div>
        </div>

        {/* ── Text column ── */}
        <div
          className={`w-full lg:w-[45%] flex flex-col justify-center
            px-8 py-14 lg:px-14 xl:px-20 relative overflow-hidden
            transition-all duration-1000 delay-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {/* Ghost letter */}
          <span
            aria-hidden
            className={`absolute ${imageLeft ? '-right-6' : '-left-6'} top-1/2 -translate-y-1/2
              font-display font-black leading-none select-none pointer-events-none ${ghostColor}`}
            style={{ fontSize: 'clamp(9rem, 18vw, 15rem)' }}
          >
            {exp.letter}
          </span>

          <div className="relative z-10">

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[9px] font-bold tracking-[0.4em] text-primary-orange uppercase">
                {exp.num}
              </span>
              <div className={`h-px w-8 ${lineColor}`} />
              <span className="text-[9px] font-bold tracking-[0.4em] text-primary-orange uppercase">
                {exp.title}
              </span>
            </div>

            {/* Heading */}
            <h2
              className={`font-display font-bold ${headingColor} leading-[1.1] mb-3`}
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.6rem)' }}
            >
              {exp.fullName}
            </h2>

            {/* Tagline */}
            <p className="text-primary-orange text-[13px] italic font-medium tracking-wide mb-7">
              "{exp.tagline}"
            </p>

            {/* Description */}
            <p className={`${textColor} text-[14.5px] leading-relaxed mb-10 max-w-[360px]`}>
              {exp.description}
            </p>

            {/* Features — ruled list */}
            <div className="mb-11">
              <div className={`h-px ${lineColor}`} />
              {exp.features.map((feature) => (
                <React.Fragment key={feature}>
                  <div className="flex items-center gap-4 py-3.5">
                    <span className="w-1 h-1 rounded-full bg-primary-orange flex-shrink-0" />
                    <span className={`text-[10.5px] font-semibold tracking-[0.18em] ${featureColor} uppercase`}>
                      {feature}
                    </span>
                  </div>
                  <div className={`h-px ${lineColor}`} />
                </React.Fragment>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-8">
              <Link
                to={`/events/${exp.slug}`}
                className="group inline-flex items-center gap-4"
              >
                <div
                  className={`w-12 h-12 rounded-full ${ctaBtnBase}
                    flex items-center justify-center transition-all duration-300
                    shadow-[0_4px_20px_rgba(0,0,0,0.2)] group-hover:shadow-[0_4px_20px_rgba(255,157,0,0.35)]`}
                >
                  <Arrow className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform duration-300" />
                </div>
                <span className={`text-[10.5px] font-bold tracking-widest uppercase ${ctaLabelColor} transition-colors duration-300`}>
                  Explore {exp.title}
                </span>
              </Link>

              {/* Divider + contact nudge */}
              <div className={`h-px flex-1 ${lineColor}`} />
              <Link
                to="/contact"
                className={`text-[9px] font-bold tracking-[0.25em] uppercase ${dark ? 'text-white/20 hover:text-primary-orange' : 'text-neutral-400 hover:text-primary-orange'} transition-colors duration-300 whitespace-nowrap`}
              >
                Enquire
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

/* ─────────────────────────── TRUST BAR ─────────────────────────── */

const TrustBar: React.FC = () => {
  const [ref, entry] = useIntersectionObserver({ threshold: 0.3, freezeOnceVisible: true });
  const visible = !!entry?.isIntersecting;

  const items = [
    { icon: '✦', text: '25+ Years of Expertise' },
    { icon: '✦', text: 'Award-Winning Team' },
    { icon: '✦', text: '50,000+ Satisfied Guests' },
    { icon: '✦', text: 'Fully Licensed & Insured' },
    { icon: '✦', text: '24/7 Concierge Support' },
  ];

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`bg-primary-orange py-5 overflow-hidden transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="flex items-center gap-16 animate-none">
        <div className="flex items-center gap-16 flex-shrink-0">
          {[...items, ...items].map((item, i) => (
            <div key={i} className="flex items-center gap-3 flex-shrink-0">
              <span className="text-white/40 text-[10px]">{item.icon}</span>
              <span className="text-white font-bold text-[10px] tracking-[0.25em] uppercase whitespace-nowrap">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────── CTA BANNER ─────────────────────────── */

const CTABanner: React.FC = () => {
  const [ref, entry] = useIntersectionObserver({ threshold: 0.15, freezeOnceVisible: true });
  const visible = !!entry?.isIntersecting;

  return (
    <section className="relative py-36 overflow-hidden bg-[#0A0A0A]">
      {/* Ambient background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')`,
          opacity: 0.1,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />

      {/* Ghost text */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display font-black text-white/[0.025] select-none pointer-events-none leading-none"
        style={{ fontSize: 'clamp(6rem, 18vw, 16rem)' }}
      >
        BEGIN
      </span>

      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`container mx-auto px-6 max-w-5xl text-center relative z-10 transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-5 mb-10">
          <div className="w-10 h-px bg-primary-orange" />
          <span className="text-[9px] font-bold tracking-[0.45em] text-primary-orange uppercase">
            Let's Begin
          </span>
          <div className="w-10 h-px bg-primary-orange" />
        </div>

        {/* Heading */}
        <h2
          className="font-display font-bold text-white leading-[1.0] mb-6"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
        >
          Ready to craft<br />
          <span className="italic font-normal text-primary-orange">your experience?</span>
        </h2>

        <p className="text-white/40 text-lg leading-relaxed max-w-[480px] mx-auto mb-14">
          Our team is ready to design an experience that exceeds every expectation.
          Let's make it happen.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-4 bg-primary-orange px-10 py-4 rounded-sm text-white font-bold text-sm tracking-wide hover:bg-orange-500 transition-colors duration-300"
          >
            Start Planning
            <Arrow className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
          </Link>
          <Link
            to="/"
            className="text-white/40 hover:text-white transition-colors duration-300 text-sm font-bold tracking-wide"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Bottom stats row */}
        <div className="flex items-center justify-center gap-10 mt-20 pt-10 border-t border-white/10">
          {[
            { v: '4', l: 'Categories' },
            { v: '1K+', l: 'Events' },
            { v: '4.9★', l: 'Rating' },
          ].map((s, i) => (
            <React.Fragment key={s.l}>
              {i > 0 && <div className="w-px h-8 bg-white/10" />}
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-white leading-none mb-1">{s.v}</p>
                <p className="text-white/25 text-[9px] tracking-[0.3em] uppercase">{s.l}</p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────── PAGE ─────────────────────────── */

const Experiences: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Hero />
      <StatsStrip />
      <TypeNav />
      {experiences.map((exp, i) => (
        <ExperienceSection
          key={exp.slug}
          exp={exp}
          dark={i % 2 === 0}
          imageLeft={i % 2 === 0}
        />
      ))}
      <TrustBar />
      <CTABanner />
    </div>
  );
};

export default Experiences;
