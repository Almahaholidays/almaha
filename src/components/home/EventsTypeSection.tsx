import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface EventItem {
  title: string;
  fullName: string;
  image: string;
  slug: string;
}

const events: EventItem[] = [
  {
    title: 'MICE',
    fullName: 'Meetings & Conferences',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80',
    slug: 'mice',
  },
  {
    title: 'FIT',
    fullName: 'Independent Travel',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80',
    slug: 'fit',
  },
  {
    title: 'GROUP',
    fullName: 'Group Adventures',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80',
    slug: 'group',
  },
  {
    title: 'WEDDING',
    fullName: 'Destination Wedding',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
    slug: 'wedding',
  },
];

const EventsTypeSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [sectionRef, sectionEntry] = useIntersectionObserver({ threshold: 0.1, freezeOnceVisible: true });
  const visible = !!sectionEntry?.isIntersecting;

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative overflow-hidden flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap lg:h-screen lg:min-h-[600px] lg:max-h-[1000px]"
      style={{ background: 'linear-gradient(135deg, #0d091f 0%, #1a1a2e 40%, #1a0a0a 100%)' }}
    >
      {/* Purple glow — left */}
      <div style={{
        position: 'absolute', top: '20%', left: '-5%',
        width: '40vw', height: '40vw', borderRadius: '50%',
        background: 'radial-gradient(circle, #4e3779 0%, transparent 65%)',
        opacity: 0.28, filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0,
      }} />
      {/* Red glow — right */}
      <div style={{
        position: 'absolute', bottom: '10%', right: '-5%',
        width: '28vw', height: '28vw', borderRadius: '50%',
        background: 'radial-gradient(circle, #e3261d 0%, transparent 65%)',
        opacity: 0.18, filter: 'blur(70px)', pointerEvents: 'none', zIndex: 0,
      }} />
      {/* Bottom gradient accent line */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '2px', zIndex: 20,
        background: 'linear-gradient(90deg, #4e3779 0%, #e3261d 100%)',
        opacity: 0.7,
      }} />
      {events.map((event, index) => {
        const isHovered = hoveredIndex === index;
        const hasHover = hoveredIndex !== null;

        return (
          <Link
            key={event.slug}
            to={`/events/${event.slug}`}
            className={`
              relative overflow-hidden cursor-pointer
              w-full h-[260px] sm:h-[300px]
              md:w-1/2 md:h-[50vh]
              lg:w-auto lg:h-full
              transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]
              ${visible ? 'opacity-100' : 'opacity-0'}
              ${isHovered ? 'lg:flex-[3]' : hasHover ? 'lg:flex-[0.8]' : 'lg:flex-[1]'}
            `}
            style={{ transitionDelay: visible ? `${index * 100}ms` : '0ms' }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* ── Background image + overlays ── */}
            <div className="absolute inset-0">
              <img
                src={event.image}
                alt={event.fullName}
                className={`w-full h-full object-cover transition-all duration-700
                  ${isHovered ? 'scale-105' : 'scale-100'}
                  ${hasHover && !isHovered ? 'lg:grayscale' : 'grayscale-0'}`}
              />
              {/* Dark gradient overlay */}
              <div className={`absolute inset-0 transition-all duration-500
                ${isHovered
                  ? 'bg-gradient-to-t from-black/90 via-black/40 to-black/20'
                  : 'bg-gradient-to-t from-black/80 via-black/50 to-black/30'}`}
              />
              {/* Red tint on hover */}
              <div className={`absolute inset-0 transition-opacity duration-500
                ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                style={{ backgroundColor: 'rgba(227, 38, 29, 0.20)' }}
              />
            </div>

            {/* ── Dividers ── */}
            {/* Mobile: horizontal line between cards */}
            {index < events.length - 1 && (
              <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20 z-10 block md:hidden" />
            )}
            {/* Tablet: vertical line between columns (only left-column items) */}
            {index % 2 === 0 && (
              <div className="absolute right-0 top-0 bottom-0 w-px bg-white/15 z-10 hidden md:block lg:hidden" />
            )}
            {/* Tablet: horizontal line between rows (only top-row items) */}
            {index < 2 && (
              <div className="absolute bottom-0 left-0 right-0 h-px bg-white/15 z-10 hidden md:block lg:hidden" />
            )}
            {/* Desktop: vertical line between panels */}
            {index < events.length - 1 && (
              <div className="absolute right-0 top-0 bottom-0 w-px bg-white/10 z-10 hidden lg:block" />
            )}

            {/* ── Card content ── */}
            <div className="relative z-10 h-full flex flex-col justify-end p-5 sm:p-6 md:p-7 lg:p-10">

              {/* Ghost number */}
              <span className={`
                absolute top-3 left-3 sm:top-4 sm:left-4 lg:top-8 lg:left-8
                text-[72px] sm:text-[90px] md:text-[110px] lg:text-[180px]
                font-black leading-none text-white/[0.04] select-none
                transition-all duration-500
                ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4'}
              `}>
                0{index + 1}
              </span>

              {/* Title */}
              <div className="relative mb-2.5 md:mb-3 lg:mb-4">
                <h3
                  className={`font-black text-white tracking-tight transition-all duration-500
                    text-3xl sm:text-4xl
                    ${isHovered ? 'lg:text-5xl xl:text-6xl' : 'lg:text-[2.5rem]'}`}
                  style={{ writingMode: isHovered ? 'horizontal-tb' : undefined }}
                >
                  {/* Vertical writing on desktop when not hovered */}
                  <span className={`inline-block transition-all duration-500
                    ${!isHovered ? 'lg:[writing-mode:vertical-rl] lg:rotate-180' : ''}`}
                  >
                    {event.title}
                  </span>
                </h3>
              </div>

              {/* Subtitle
                  — always visible on mobile/tablet
                  — hover-only on desktop                */}
              <div className={`overflow-hidden transition-all duration-500
                max-h-12 opacity-100 mb-4
                md:max-h-14 md:mb-5
                ${isHovered
                  ? 'lg:max-h-20 lg:opacity-100 lg:mb-6'
                  : 'lg:max-h-0 lg:opacity-0 lg:mb-0'}`}
              >
                <p className="text-white/70 text-sm sm:text-base md:text-lg font-light">
                  {event.fullName}
                </p>
              </div>

              {/* CTA
                  — always visible on mobile/tablet
                  — hover-only on desktop                */}
              <div className={`transition-all duration-500
                opacity-100 translate-y-0
                ${isHovered
                  ? 'lg:opacity-100 lg:translate-y-0 lg:delay-100'
                  : 'lg:opacity-0 lg:translate-y-4'}`}
              >
                <span className="inline-flex items-center gap-2 sm:gap-3 font-semibold group/cta" style={{ color: '#e3261d' }}>
                  <span className="text-sm sm:text-base">Explore</span>
                  <span className="flex items-center justify-center
                    w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10
                    rounded-full border transition-all duration-300"
                    style={{ borderColor: 'rgba(227, 38, 29, 0.5)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e3261d';
                      e.currentTarget.style.borderColor = '#e3261d';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '';
                      e.currentTarget.style.borderColor = 'rgba(227, 38, 29, 0.5)';
                    }}>
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover/cta:translate-x-0.5 transition-transform"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </span>
              </div>

              {/* Bottom accent line (desktop hover) */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 transition-all duration-500
                  ${isHovered ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
                style={{ transformOrigin: 'left', backgroundColor: '#e3261d' }}
              />
            </div>
          </Link>
        );
      })}

      {/* ── "Special Events" top label ── */}
      <div className={`absolute top-4 left-4 sm:top-5 sm:left-5 lg:top-8 lg:left-8 z-20 transition-all duration-700
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
      >
        <span className="inline-flex items-center gap-2 sm:gap-3 text-white text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse" style={{ backgroundColor: '#e3261d' }} />
          Our Services
        </span>
      </div>

      {/* ── Counter (desktop only) ── */}
      <div className={`absolute bottom-8 right-8 z-20 transition-all duration-700 delay-300 hidden lg:block
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <span className="text-white/30 text-sm tracking-widest font-light">
          {hoveredIndex !== null ? String(hoveredIndex + 1).padStart(2, '0') : '—'} / 04
        </span>
      </div>
    </section>
  );
};

export default EventsTypeSection;
