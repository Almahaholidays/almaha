import React from 'react';
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

/* ── Shared arrow ── */
const Arrow: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

/* ── Tag pill with red dot ── */
const TagPill: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 text-white text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full">
    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: '#e3261d' }} />
    {label}
  </span>
);

interface Destination {
  title: string;
  description: string;
  image: string;
  tag: string;
  slug: string;
}

/* ── Reusable card inner layers (image + overlays + top row + bottom content) ── */
const CardInner: React.FC<{
  destination: Destination;
  index: number;
  titleSize?: string;
  padding?: string;
  showDescription?: boolean;     // always show description (hero card)
  horizontalGradient?: boolean;  // for the full-width wide card
}> = ({
  destination,
  index,
  titleSize = 'text-2xl md:text-3xl',
  padding = 'p-6',
  showDescription = false,
  horizontalGradient = false,
}) => (
  <>
    {/* Image */}
    <div
      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
      style={{ backgroundImage: `url('${destination.image}')` }}
    />

    {/* Gradient overlays */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
    {horizontalGradient && (
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
    )}

    {/* Top row: tag + index number */}
    <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
      <TagPill label={destination.tag} />
      <span className="font-display text-white/20 text-base font-bold tabular-nums">
        {String(index + 1).padStart(2, '0')}
      </span>
    </div>

    {/* Bottom content */}
    <div className={`absolute bottom-0 left-0 right-0 ${padding}`}>
      {/* Growing red line */}
      <div className="w-6 h-0.5 mb-3 group-hover:w-12 transition-all duration-500" style={{ backgroundColor: '#e3261d' }} />

      <h3 className={`font-display ${titleSize} font-bold text-white leading-tight mb-2`}>
        {destination.title}
      </h3>

      <p className={`text-white/55 text-sm leading-relaxed mb-4 max-w-lg
        ${showDescription
          ? 'opacity-60 group-hover:opacity-100'
          : 'opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0'}
        transition-all duration-500`
      }>
        {destination.description}
      </p>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
        <span className="text-[12px] font-bold tracking-widest uppercase text-[#e3261d]">
          Discover
        </span>
        <Arrow className="w-3.5 h-3.5 text-[#e3261d]" />
      </div>
    </div>
  </>
);

const DestinationsSection: React.FC = () => {
  const [sectionRef, sectionEntry] = useIntersectionObserver({ threshold: 0.06, freezeOnceVisible: true });

  const isVisible = sectionEntry?.isIntersecting;

  const destinations: Destination[] = [
    {
      title: 'Muscat',
      description: 'The vibrant capital blending modernity with ancient Arabian charm — where grand mosques meet a glittering coastline.',
      image: 'https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=900&q=80',
      tag: 'City Life',
      slug: 'muscat',
    },
    {
      title: 'Wahiba Sands',
      description: 'Endless golden dunes and authentic Bedouin experiences beneath a star-filled desert sky.',
      image: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=900&q=80',
      tag: 'Desert Adventure',
      slug: 'wahiba-sands',
    },
    {
      title: 'Nizwa',
      description: 'Historic forts and traditional souks in the cultural heartland of Oman.',
      image: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=900&q=80',
      tag: 'Heritage',
      slug: 'nizwa',
    },
    {
      title: 'Salalah',
      description: 'Tropical paradise with misty monsoons, frankincense groves, and pristine beaches.',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=900&q=80',
      tag: 'Coastal Beauty',
      slug: 'salalah',
    },
    {
      title: 'Jebel Akhdar',
      description: 'Terraced rose gardens and cool mountain retreats high above the Omani plains.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80',
      tag: 'Mountains',
      slug: 'jebel-akhdar',
    },
    {
      title: 'Sur',
      description: 'Ancient shipbuilding traditions meet pristine coastline where sea turtles nest each night.',
      image: 'https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=900&q=80',
      tag: 'Coastal Heritage',
      slug: 'sur',
    },
  ];

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-28 bg-[#111111] overflow-hidden"
    >
      <div className="container mx-auto px-6">

        {/* ── Section Header ── */}
        <div className={`mb-16 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Eyebrow with flanking lines */}
          <div className="flex items-center gap-5 mb-10">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase whitespace-nowrap" style={{ color: '#4e3779' }}>
              Explore Oman
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Two-column split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-end">
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.0]">
              Oman's<br />
              <span className="italic font-normal text-white/30">Stunning Wonders</span>
            </h2>

            <div className="lg:pb-2 flex flex-col justify-between gap-8">
              <p className="text-white/45 text-lg leading-relaxed max-w-md">
                Discover the diverse landscapes and rich heritage that make
                Oman truly extraordinary — from golden desert dunes to misty mountain peaks.
              </p>
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-white font-display text-3xl font-bold leading-none">6</p>
                  <p className="text-white/25 text-[10px] tracking-[0.25em] uppercase mt-1">Destinations</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <p className="text-white font-display text-3xl font-bold leading-none">15+</p>
                  <p className="text-white/25 text-[10px] tracking-[0.25em] uppercase mt-1">Years Experience</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <p className="text-white font-display text-3xl font-bold leading-none">500+</p>
                  <p className="text-white/25 text-[10px] tracking-[0.25em] uppercase mt-1">Happy Travellers</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-12 gap-3 md:gap-4">

          {/* ROW 1: Video Card (col-8) with text overlay */}
          <Link to="/destinations" className={`col-span-12 md:col-span-8 group relative overflow-hidden rounded-2xl h-[440px] md:h-[520px] cursor-pointer ${
            isVisible ? 'opacity-100 animate-zoom-in' : 'opacity-0'
          }`}>
            {/* Video Background */}
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            >
              <source src={`${import.meta.env.BASE_URL}videos/bgv1.mp4`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Darker gradient overlays for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/30" />
            <div className="absolute inset-0 bg-black/20" />

            {/* Top row: tag + index number */}
            <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
              <TagPill label="Discover Oman" />
              <span className="font-display text-white/20 text-base font-bold tabular-nums">
                01
              </span>
            </div>

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
              {/* Growing red line */}
              <div className="w-6 h-0.5 mb-3 group-hover:w-12 transition-all duration-500" style={{ backgroundColor: '#e3261d' }} />

              <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-2">
                Explore Oman's Beauty
              </h3>

              <p className="text-white/60 text-sm leading-relaxed mb-4 max-w-lg opacity-60 group-hover:opacity-100 transition-all duration-500">
                Experience the breathtaking landscapes and rich cultural heritage of the Arabian Peninsula.
              </p>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                <span className="text-[12px] font-bold tracking-widest uppercase text-[#e3261d]">
                  Discover
                </span>
                <Arrow className="w-3.5 h-3.5 text-[#e3261d]" />
              </div>
            </div>
          </Link>

          {/* ROW 1: Wahiba Sands (col-4) */}
          <Link to={`/destinations/${destinations[1].slug}`} className={`col-span-12 md:col-span-4 group relative overflow-hidden rounded-2xl h-[360px] md:h-[520px] cursor-pointer ${
            isVisible ? 'opacity-100 animate-zoom-in animate-delay-200' : 'opacity-0'
          }`}>
            <CardInner
              destination={destinations[1]}
              index={0}
              titleSize="text-3xl md:text-4xl"
              padding="p-6 md:p-8"
            />
          </Link>

          {/* ROW 2: Nizwa (col-4) */}
          <Link to={`/destinations/${destinations[2].slug}`} className={`col-span-12 md:col-span-4 group relative overflow-hidden rounded-2xl h-[300px] cursor-pointer ${
            isVisible ? 'opacity-100 animate-zoom-in animate-delay-300' : 'opacity-0'
          }`}>
            <CardInner destination={destinations[2]} index={1} />
          </Link>

          {/* ROW 2: Salalah (col-4) */}
          <Link to={`/destinations/${destinations[3].slug}`} className={`col-span-12 md:col-span-4 group relative overflow-hidden rounded-2xl h-[300px] cursor-pointer ${
            isVisible ? 'opacity-100 animate-zoom-in animate-delay-400' : 'opacity-0'
          }`}>
            <CardInner destination={destinations[3]} index={2} />
          </Link>

          {/* ROW 2: Jebel Akhdar (col-4) */}
          <Link to={`/destinations/${destinations[4].slug}`} className={`col-span-12 md:col-span-4 group relative overflow-hidden rounded-2xl h-[300px] cursor-pointer ${
            isVisible ? 'opacity-100 animate-zoom-in animate-delay-500' : 'opacity-0'
          }`}>
            <CardInner destination={destinations[4]} index={3} />
          </Link>

          {/* ROW 3: Muscat (col-6) */}
          <Link to={`/destinations/${destinations[0].slug}`} className={`col-span-12 md:col-span-6 group relative overflow-hidden rounded-2xl h-[300px] cursor-pointer ${
            isVisible ? 'opacity-100 animate-zoom-in animate-delay-600' : 'opacity-0'
          }`}>
            <CardInner destination={destinations[0]} index={4} />
          </Link>

          {/* ROW 3: Sur (col-6) */}
          <Link to={`/destinations/${destinations[5].slug}`} className={`col-span-12 md:col-span-6 group relative overflow-hidden rounded-2xl h-[300px] cursor-pointer ${
            isVisible ? 'opacity-100 animate-zoom-in animate-delay-700' : 'opacity-0'
          }`}>
            <CardInner destination={destinations[5]} index={5} />
          </Link>

        </div>

      </div>
    </section>
  );
};

export default DestinationsSection;
