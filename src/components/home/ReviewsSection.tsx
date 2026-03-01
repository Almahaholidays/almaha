import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

/* ── Star row ── */
const Stars: React.FC<{ count?: number; size?: string }> = ({ count = 5, size = 'w-4 h-4' }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(count)].map((_, i) => (
      <svg key={i} className={`${size}`} fill="currentColor" viewBox="0 0 24 24" style={{ color: '#e3261d' }}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

/* ── Avatar circle ── */
const Avatar: React.FC<{ initial: string; dark?: boolean }> = ({ initial, dark = false }) => (
  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm flex-shrink-0 text-white
    ${dark ? '' : 'bg-primary-dark'}`}
    style={dark ? { backgroundColor: '#e3261d' } : {}}>
    {initial}
  </div>
);

const testimonials = [
  {
    name: 'Sarah Al-Rashidi',
    role: 'Corporate Event Planner',
    trip: 'MICE Event',
    initial: 'S',
    rating: 5,
    review:
      'Al Maha turned our corporate retreat into something truly extraordinary. Every logistical detail was handled with precision — the venues, the transfers, the catering. Our team still talks about it.',
  },
  {
    name: 'James Whitmore',
    role: 'Leisure Traveller, UK',
    trip: 'Adventure Tour',
    initial: 'J',
    rating: 5,
    review:
      `The adventure tour through Wahiba Sands was beyond anything I expected. Our guide's knowledge of the desert was remarkable. An experience I'll carry with me for the rest of my life.`,
  },
  {
    name: 'Fatima Al-Balushi',
    role: 'Honeymoon Traveller',
    trip: 'Luxury Tour',
    initial: 'F',
    rating: 5,
    review:
      `Oman's beauty is truly unlocked with Al Maha. The luxury tour was flawless — pure relaxation and wonder in equal measure. Worth every single moment.`,
  },
];

const ReviewsSection: React.FC = () => {
  const [headerRef, headerEntry] = useIntersectionObserver({ threshold: 0.2, freezeOnceVisible: true });
  const [featuredRef, featuredEntry] = useIntersectionObserver({ threshold: 0.15, freezeOnceVisible: true });
  const [sideRef, sideEntry] = useIntersectionObserver({ threshold: 0.15, freezeOnceVisible: true });

  const headerVisible = !!headerEntry?.isIntersecting;
  const featuredVisible = !!featuredEntry?.isIntersecting;
  const sideVisible = !!sideEntry?.isIntersecting;

  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* ── Header + Aggregate Score ── */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-10 xl:gap-16 items-start mb-14 transition-all duration-700 ease-out ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Left: title */}
          <div>
            <div className="flex items-center gap-5 mb-8">
              <div className="flex-1 h-px bg-neutral-200" />
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase whitespace-nowrap" style={{ color: '#4e3779' }}>
                Client Reviews
              </span>
              <div className="flex-1 h-px bg-neutral-200" />
            </div>

            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-primary-dark leading-[1.0] mb-6">
              Voices of<br />
              <span className="italic font-normal text-neutral-400">Our Travellers</span>
            </h2>

            <p className="text-neutral-500 text-lg leading-relaxed max-w-xl">
              Over 500 travellers have trusted Al Maha to craft their perfect Omani journey.
              Here's what they have to say.
            </p>
          </div>

          {/* Right: aggregate score card */}
          <div className="bg-primary-dark rounded-2xl p-8 text-white">
            {/* Score */}
            <div className="flex items-end gap-3 mb-4">
              <span className="font-display text-7xl font-bold leading-none" style={{ color: '#e3261d' }}>
                4.9
              </span>
              <div className="pb-2">
                <Stars size="w-5 h-5" />
                <p className="text-white/35 text-xs tracking-widest uppercase mt-2">
                  Overall Rating
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/8 mb-6" />

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-white font-display text-2xl font-bold leading-none">500+</p>
                <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mt-1">Happy Travellers</p>
              </div>
              <div>
                <p className="text-white font-display text-2xl font-bold leading-none">15+</p>
                <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mt-1">Years of Service</p>
              </div>
            </div>

            {/* Platform badges */}
            <div className="flex items-center gap-2">
              {['Google', 'TripAdvisor'].map((p) => (
                <span
                  key={p}
                  className="text-white/45 text-[11px] font-semibold px-3 py-1.5 bg-white/6 rounded-full border border-white/10"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Testimonials Grid ── */}
        <div className="grid grid-cols-12 gap-4 md:gap-5">

          {/* Featured card — dark, large (left) */}
          <div
            ref={featuredRef as React.RefObject<HTMLDivElement>}
            className={`col-span-12 lg:col-span-5 bg-primary-dark rounded-2xl p-8 md:p-10 flex flex-col justify-between
              transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
              ${featuredVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
          >
            {/* Decorative blob */}
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-2xl pointer-events-none" style={{ backgroundColor: 'rgba(227, 38, 29, 0.05)' }} />

            {/* Opening quote */}
            <div
              className="font-display font-black leading-none select-none"
              style={{ fontSize: '7rem', marginTop: '-1rem', marginBottom: '-2rem', color: 'rgba(227, 38, 29, 0.25)' }}
              aria-hidden
            >
              "
            </div>

            {/* Review text */}
            <p className="font-display text-xl md:text-2xl italic text-white leading-relaxed flex-1">
              {testimonials[0].review}
            </p>

            {/* Divider */}
            <div className="h-px bg-white/8 my-6" />

            {/* Attribution row */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar initial={testimonials[0].initial} dark />
                <div>
                  <p className="text-white text-sm font-semibold leading-tight">{testimonials[0].name}</p>
                  <p className="text-white/35 text-xs tracking-wide mt-0.5">{testimonials[0].trip}</p>
                </div>
              </div>
              <Stars size="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Two stacked side cards (right) */}
          <div
            ref={sideRef as React.RefObject<HTMLDivElement>}
            className={`col-span-12 lg:col-span-7 flex flex-col gap-4 md:gap-5
              transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] delay-200
              ${sideVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
          >
            {[testimonials[1], testimonials[2]].map((t, i) => (
              <div
                key={t.name}
                className={`flex-1 rounded-2xl p-7 md:p-8 flex flex-col border transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]
                  ${i === 0 ? 'bg-[#F7F5F2] border-neutral-200/60' : 'bg-white border-neutral-200'}`}
              >
                {/* Top: opening quote + stars */}
                <div className="flex items-start justify-between mb-1">
                  <div
                    className="font-display font-black leading-none select-none"
                    style={{ fontSize: '4.5rem', marginTop: '-0.5rem', marginBottom: '-1.5rem', color: 'rgba(227, 38, 29, 0.20)' }}
                    aria-hidden
                  >
                    "
                  </div>
                  <Stars size="w-3.5 h-3.5" />
                </div>

                {/* Review text */}
                <p className="font-display text-lg md:text-xl italic text-primary-dark leading-relaxed flex-1 mb-6">
                  {t.review}
                </p>

                {/* Divider */}
                <div className="h-px bg-neutral-200 mb-5" />

                {/* Attribution */}
                <div className="flex items-center gap-3">
                  <Avatar initial={t.initial} />
                  <div>
                    <p className="text-primary-dark text-sm font-semibold leading-tight">{t.name}</p>
                    <p className="text-neutral-400 text-xs tracking-wide mt-0.5">{t.trip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ── Trust bar ── */}
        <div className={`mt-12 pt-10 border-t border-neutral-100 transition-all duration-700 ease-out delay-300
          ${featuredVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Left: social proof line */}
            <div className="flex items-center gap-4">
              {/* Stacked avatars */}
              <div className="flex -space-x-2.5">
                {['S', 'J', 'F', 'A'].map((l, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-primary-dark border-2 border-white flex items-center justify-center text-white text-[10px] font-bold"
                  >
                    {l}
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full bg-neutral-100 border-2 border-white flex items-center justify-center text-neutral-500 text-[9px] font-bold">
                  500+
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <Stars count={5} size="w-3 h-3" />
                  <span className="text-primary-dark text-xs font-bold">4.9</span>
                </div>
                <p className="text-neutral-400 text-xs mt-0.5">Trusted by 500+ travellers worldwide</p>
              </div>
            </div>

            {/* Right: CTA */}
            <button className="group flex items-center gap-4 flex-shrink-0">
              <span className="text-[13px] font-bold tracking-wide text-neutral-500 group-hover:text-primary-dark transition-colors duration-300 uppercase">
                Read All Reviews
              </span>
              <div className="w-11 h-11 rounded-full bg-primary-dark flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.12)] transition-all duration-300"
                style={{ transition: 'background-color 0.3s, box-shadow 0.3s' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e3261d';
                  e.currentTarget.style.boxShadow = '0 6px 24px rgba(227, 38, 29, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
                }}>
                <svg className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ReviewsSection;
