import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const TagPill: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 text-white text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full">
    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: '#e3261d' }} />
    {label}
  </span>
);

const experiences = [
  {
    tag: 'Desert',
    title: 'Desert Safari',
    description: 'Dune bashing, camel riding, and stargazing across the vast Arabian desert with expert Bedouin guides.',
    count: '25+ Tours',
    image: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=900&q=80',
  },
  {
    tag: 'Heritage',
    title: 'Heritage Tours',
    description: `Ancient forts, traditional souks, and UNESCO World Heritage sites in Oman's cultural heartland.`,
    count: '18+ Sites',
    image: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=900&q=80',
  },
  {
    tag: 'Mountains',
    title: 'Mountain Trekking',
    description: 'Dramatic wadis and hidden villages through the rugged Hajar mountain ranges.',
    count: '30+ Trails',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80',
  },
  {
    tag: 'Coastal',
    title: 'Water Sports',
    description: `Crystal-clear waters, vibrant coral reefs, and thrilling beach adventures along Oman's coastline.`,
    count: '15+ Activities',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=900&q=80',
  },
  {
    tag: 'Wellness',
    title: 'Wellness Retreats',
    description: `Traditional hammams, spa treatments, and mindful escapes amid Oman's serene landscapes.`,
    count: '12+ Retreats',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=80',
  },
  {
    tag: 'Culture',
    title: 'Cultural Immersion',
    description: 'Local traditions, crafts, cuisine, and authentic Omani hospitality across the country.',
    count: '20+ Experiences',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80',
  },
];

const ExperiencesSection: React.FC = () => {
  const [headerRef, headerEntry] = useIntersectionObserver({ threshold: 0.2, freezeOnceVisible: true });
  const [stripRef, stripEntry] = useIntersectionObserver({ threshold: 0.1, freezeOnceVisible: true });
  const [ctaRef, ctaEntry] = useIntersectionObserver({ threshold: 0.4, freezeOnceVisible: true });

  const headerVisible = !!headerEntry?.isIntersecting;
  const stripVisible = !!stripEntry?.isIntersecting;
  const ctaVisible = !!ctaEntry?.isIntersecting;

  return (
    <section className="py-28 bg-[#F7F5F2] overflow-hidden">
      <style>{`
        .exp-strip .exp-card {
          flex: 1 1 0%;
          min-width: 64px;
          transition: flex 0.65s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .exp-strip:has(.exp-card:hover) .exp-card:not(:hover) {
          flex: 0.35 1 0%;
        }
        .exp-strip .exp-card:hover {
          flex: 4 1 0%;
        }
      `}</style>

      <div className="container mx-auto px-6 max-w-6xl">

        {/* ── Section Header ── */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`mb-16 transition-all duration-700 ease-out ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Eyebrow with flanking lines */}
          <div className="flex items-center gap-5 mb-10">
            <div className="flex-1 h-px bg-neutral-300/60" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase whitespace-nowrap" style={{ color: '#4e3779' }}>
              Experiences
            </span>
            <div className="flex-1 h-px bg-neutral-300/60" />
          </div>

          {/* Two-column split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-end">
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-primary-dark leading-[1.0]">
              Unforgettable<br />
              <span className="italic font-normal text-neutral-400">Adventures</span>
            </h2>
            <div className="lg:pb-2 flex flex-col gap-6">
              <p className="text-neutral-500 text-lg leading-relaxed max-w-md">
                From adrenaline-pumping activities to serene cultural escapes,
                discover what makes Oman truly extraordinary.
              </p>
              <div className="flex items-center gap-8">
                <div>
                  <p className="font-display text-3xl font-bold text-primary-dark leading-none">6</p>
                  <p className="text-neutral-400 text-[10px] tracking-[0.25em] uppercase mt-1">Experience Types</p>
                </div>
                <div className="w-px h-10 bg-neutral-300" />
                <div>
                  <p className="font-display text-3xl font-bold text-primary-dark leading-none">100+</p>
                  <p className="text-neutral-400 text-[10px] tracking-[0.25em] uppercase mt-1">Unique Tours</p>
                </div>
                <div className="w-px h-10 bg-neutral-300" />
                <div>
                  <p className="font-display text-3xl font-bold text-primary-dark leading-none">25+</p>
                  <p className="text-neutral-400 text-[10px] tracking-[0.25em] uppercase mt-1">Years</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Accordion Strip ── */}
        <div
          ref={stripRef as React.RefObject<HTMLDivElement>}
          className={`transition-all duration-700 ease-out ${stripVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >

          {/* Desktop: horizontal accordion */}
          <div className="exp-strip hidden md:flex gap-2 h-[580px] rounded-3xl overflow-hidden">
            {experiences.map((exp, i) => (
              <div
                key={exp.title}
                className="exp-card group relative overflow-hidden cursor-pointer"
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${exp.image}')` }}
                />
                {/* Base gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />
                {/* Side gradient (reinforces text legibility on expand) */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* ── Collapsed state ── */}
                <div className="absolute inset-0 flex flex-col items-center justify-between py-8 group-hover:opacity-0 transition-opacity duration-250 pointer-events-none">
                  <span className="font-display text-white/15 text-5xl font-black select-none tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 w-px bg-white/10 my-3" />
                  <span
                    className="font-bold text-[9px] tracking-[0.35em] text-white/30 uppercase whitespace-nowrap"
                    style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                  >
                    {exp.tag}
                  </span>
                </div>

                {/* ── Expanded state ── */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 transition-all duration-500 delay-100 pointer-events-none">
                  {/* Top row */}
                  <div className="flex items-start justify-between">
                    <TagPill label={exp.tag} />
                    <span className="font-display text-white/15 text-base font-bold tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Bottom content */}
                  <div>
                    <div className="w-6 h-0.5 mb-4 group-hover:w-14 transition-all duration-500 delay-200" style={{ backgroundColor: '#e3261d' }} />
                    <h3 className="font-display text-3xl font-bold text-white leading-tight mb-3">
                      {exp.title}
                    </h3>
                    <p className="text-white/55 text-sm leading-relaxed mb-5 max-w-[280px]">
                      {exp.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: '#e3261d' }}>
                          Explore
                        </span>
                        <svg
                          className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300 delay-300"
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                          style={{ color: '#e3261d' }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                      <span className="text-white/25 text-[10px] tracking-widest uppercase">
                        {exp.count}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Red sweep line along bottom on hover */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-700 delay-150" style={{ backgroundColor: '#e3261d' }} />
              </div>
            ))}
          </div>

          {/* Mobile: 2-col grid fallback */}
          <div className="md:hidden grid grid-cols-2 gap-3">
            {experiences.map((exp) => (
              <div key={exp.title} className="group relative overflow-hidden rounded-xl h-[200px] cursor-pointer">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${exp.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute top-3 left-3">
                  <TagPill label={exp.tag} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="w-5 h-0.5 mb-2" style={{ backgroundColor: '#e3261d' }} />
                  <h3 className="font-display text-base font-bold text-white leading-tight">{exp.title}</h3>
                  <span className="text-[9px] font-bold tracking-widest uppercase mt-1 block" style={{ color: '#e3261d' }}>
                    {exp.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div
          ref={ctaRef as React.RefObject<HTMLDivElement>}
          className={`mt-14 pt-12 border-t border-neutral-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-all duration-700 ease-out ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div>
            <p className="text-[10px] font-bold tracking-[0.35em] uppercase mb-2" style={{ color: '#4e3779' }}>
              Ready to Explore
            </p>
            <p className="font-display text-2xl lg:text-3xl font-bold text-primary-dark">
              Find the experience made for you
            </p>
          </div>

          <button className="group flex items-center gap-4 flex-shrink-0">
            <span className="text-[13px] font-bold tracking-wide text-neutral-500 group-hover:text-primary-dark transition-colors duration-300 uppercase">
              View All Experiences
            </span>
            <div className="w-12 h-12 rounded-full flex items-center justify-center transition-shadow duration-300" style={{ backgroundColor: '#e3261d', boxShadow: '0 6px 24px rgba(227, 38, 29, 0.35)' }}>
              <svg className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </button>
        </div>

      </div>
    </section>
  );
};

export default ExperiencesSection;
