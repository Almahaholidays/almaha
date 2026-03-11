import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

/* ─────────────────────────── DATA ─────────────────────────── */

interface Photo {
  id: number;
  url: string;
  title: string;
  sub: string;
  category: string;
  aspect: 'portrait' | 'landscape' | 'square';
}

const photos: Photo[] = [
  // Destinations
  { id: 1,  url: 'https://images.unsplash.com/photo-1601890976279-0b4ff3233938?w=900&q=80', title: 'Muscat', sub: 'The Vibrant Capital', category: 'Destinations', aspect: 'portrait' },
  { id: 2,  url: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=900&q=80', title: 'Wahiba Sands', sub: 'Golden Desert Dunes', category: 'Destinations', aspect: 'landscape' },
  { id: 3,  url: '/destinations/NizwaFort.jpg', title: 'Nizwa Fort', sub: 'Cultural Heartland', category: 'Destinations', aspect: 'square' },
  { id: 4,  url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=900&q=80', title: 'Salalah', sub: 'Tropical Paradise', category: 'Destinations', aspect: 'landscape' },
  { id: 5,  url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80', title: 'Jebel Akhdar', sub: 'Mountain Retreat', category: 'Destinations', aspect: 'portrait' },
  { id: 6,  url: 'https://images.unsplash.com/photo-1520454974749-611b7248ffdb?w=900&q=80', title: 'Sur', sub: 'Coastal Heritage', category: 'Destinations', aspect: 'landscape' },

  // Experiences
  { id: 7,  url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=900&q=80', title: 'Trekking Tours', sub: '1–9 Day Adventures', category: 'Experiences', aspect: 'portrait' },
  { id: 8,  url: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=900&q=80', title: 'Canyoning & Caving', sub: 'Extreme Exploration', category: 'Experiences', aspect: 'square' },
  { id: 9,  url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=80', title: 'Wellness Retreats', sub: 'Luxury Escapes', category: 'Experiences', aspect: 'portrait' },
  { id: 10, url: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=900&q=80', title: 'Car Rental', sub: 'Flexible Mobility', category: 'Experiences', aspect: 'landscape' },
  { id: 11, url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&q=80', title: 'Desert Journey', sub: 'Open Road Travel', category: 'Experiences', aspect: 'landscape' },
  { id: 12, url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900&q=80', title: 'Scenic Escapes', sub: 'Adventure Travel', category: 'Experiences', aspect: 'square' },

  // Events
  { id: 13, url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=900&q=80', title: 'MICE Events', sub: 'Corporate Excellence', category: 'Events', aspect: 'landscape' },
  { id: 14, url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80', title: 'Destination Weddings', sub: 'Your Perfect Day', category: 'Events', aspect: 'portrait' },
  { id: 15, url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=900&q=80', title: 'Conferences', sub: 'World-Class Events', category: 'Events', aspect: 'landscape' },
  { id: 16, url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&q=80', title: 'Wedding Ceremony', sub: 'Beachfront Vows', category: 'Events', aspect: 'square' },
  { id: 17, url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900&q=80', title: 'Independent Travel', sub: 'FIT Journeys', category: 'Events', aspect: 'landscape' },
  { id: 18, url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80', title: 'Group Adventures', sub: 'Shared Memories', category: 'Events', aspect: 'portrait' },

  // Moments
  { id: 19, url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80', title: 'Event Night', sub: 'Unforgettable Evenings', category: 'Moments', aspect: 'landscape' },
  { id: 20, url: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=900&q=80', title: 'Cultural Discovery', sub: 'Local Traditions', category: 'Moments', aspect: 'square' },
  { id: 21, url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=900&q=80', title: 'Grand Gathering', sub: 'Special Occasions', category: 'Moments', aspect: 'portrait' },
  { id: 22, url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=900&q=80', title: 'Wedding Bliss', sub: 'Precious Moments', category: 'Moments', aspect: 'landscape' },
  { id: 23, url: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=900&q=80', title: 'Ancient Heritage', sub: 'Timeless Oman', category: 'Moments', aspect: 'portrait' },
  { id: 24, url: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=900&q=80', title: 'Adventure Together', sub: 'Group Experiences', category: 'Moments', aspect: 'square' },
];

const categories = ['All', 'Destinations', 'Experiences', 'Events', 'Moments'];

// const aspectClass: Record<Photo['aspect'], string> = {
//   portrait:  'aspect-[2/3]',
//   landscape: 'aspect-[4/3]',
//   square:    'aspect-square',
// };

/* ─────────────────────────── LIGHTBOX ─────────────────────────── */

const Lightbox: React.FC<{
  photo: Photo;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}> = ({ photo, index, total, onClose, onPrev, onNext }) => (
  <div
    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
    onClick={onClose}
  >
    {/* Close */}
    <button
      onClick={onClose}
      className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-[#e3261d] hover:border-[#e3261d] transition-all duration-300 z-10"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    {/* Counter */}
    <div className="absolute top-6 left-6 z-10">
      <span className="font-display text-white/40 text-sm tabular-nums">
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>

    {/* Prev */}
    <button
      onClick={(e) => { e.stopPropagation(); onPrev(); }}
      className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-[#e3261d] hover:border-[#e3261d] transition-all duration-300 z-10"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    {/* Next */}
    <button
      onClick={(e) => { e.stopPropagation(); onNext(); }}
      className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-[#e3261d] hover:border-[#e3261d] transition-all duration-300 z-10"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>

    {/* Image */}
    <div
      className="relative max-w-5xl max-h-[80vh] mx-16 md:mx-24"
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src={photo.url.replace('w=900', 'w=1400')}
        alt={photo.title}
        className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-[0_30px_80px_rgba(0,0,0,0.8)]"
      />

      {/* Bottom caption */}
      <div className="absolute bottom-0 left-0 right-0 rounded-b-xl p-5 bg-gradient-to-t from-black/90 to-transparent">
        <p className="text-[#e3261d] text-[9px] font-bold tracking-[0.35em] uppercase mb-1">
          {photo.category}
        </p>
        <p className="font-display text-xl font-bold text-white leading-tight">{photo.title}</p>
        <p className="text-white/40 text-xs mt-0.5">{photo.sub}</p>
      </div>
    </div>

    {/* Keyboard hint */}
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
      <span className="text-white/20 text-[9px] tracking-[0.3em] uppercase">
        ← → to navigate · ESC to close
      </span>
    </div>
  </div>
);

/* ─────────────────────────── HERO ─────────────────────────── */

const Hero: React.FC = () => {
  const [ref, entry] = useIntersectionObserver({ threshold: 0.1, freezeOnceVisible: true });
  const visible = !!entry?.isIntersecting;

  const previewPhotos = [photos[0], photos[4], photos[13], photos[6], photos[18], photos[14]];

  return (
    <section className="min-h-screen bg-[#0A0A0A] flex items-center overflow-hidden pt-20">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="container mx-auto px-6 max-w-7xl w-full py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: editorial text ── */}
          <div className={`transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

            <div className="flex items-center gap-5 mb-10">
              <div className="w-10 h-px bg-[#e3261d]" />
              <span className="text-[9px] font-bold tracking-[0.45em] text-[#e3261d] uppercase">
                Al Maha — Photo Library
              </span>
            </div>

            <h1 className="font-display font-bold text-white leading-[1.0] mb-7"
              style={{ fontSize: 'clamp(3.5rem, 8vw, 6.5rem)' }}>
              Visual<br />
              <span className="italic font-normal text-[#e3261d]">Journal</span>
            </h1>

            <p className="text-white/45 text-lg leading-relaxed max-w-[400px] mb-12">
              Every image is a window into the world we've crafted — from golden dunes
              to beachfront vows, from mountain peaks to conference halls.
            </p>

            {/* Stats */}
            <div className="flex items-center gap-8">
              {[
                { v: '24', l: 'Photographs' },
                { v: '4', l: 'Categories' },
                { v: '6', l: 'Destinations' },
              ].map((s, i) => (
                <React.Fragment key={s.l}>
                  {i > 0 && <div className="w-px h-10 bg-white/10" />}
                  <div>
                    <p className="font-display text-3xl font-bold text-white leading-none">{s.v}</p>
                    <p className="text-white/25 text-[9px] tracking-[0.25em] uppercase mt-1">{s.l}</p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* ── Right: 3×2 preview mosaic ── */}
          <div
            className={`hidden lg:grid grid-cols-3 gap-2 h-[600px] transition-all duration-1000 delay-300 ease-out ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            {/* Col 1 — 2 equal rows */}
            <div className="flex flex-col gap-2">
              <div className="flex-1 relative overflow-hidden rounded-xl group">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${previewPhotos[0].url}')` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-0 left-0 right-0 h-0.5 w-0 bg-[#e3261d] group-hover:w-full transition-all duration-500" />
              </div>
              <div className="flex-1 relative overflow-hidden rounded-xl group">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${previewPhotos[1].url}')` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-0 left-0 right-0 h-0.5 w-0 bg-[#e3261d] group-hover:w-full transition-all duration-500" />
              </div>
            </div>

            {/* Col 2 — tall single + small */}
            <div className="flex flex-col gap-2 mt-6">
              <div className="flex-[2] relative overflow-hidden rounded-xl group">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${previewPhotos[2].url}')` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-[#e3261d] text-[8px] font-bold tracking-[0.3em] uppercase mb-0.5">Gallery</p>
                  <p className="font-display text-white font-bold text-sm">{previewPhotos[2].title}</p>
                </div>
                <div className="absolute top-0 left-0 right-0 h-0.5 w-0 bg-[#e3261d] group-hover:w-full transition-all duration-500" />
              </div>
              <div className="flex-1 relative overflow-hidden rounded-xl group">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${previewPhotos[3].url}')` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-0 left-0 right-0 h-0.5 w-0 bg-[#e3261d] group-hover:w-full transition-all duration-500" />
              </div>
            </div>

            {/* Col 3 — small + tall single */}
            <div className="flex flex-col gap-2 -mt-4">
              <div className="flex-1 relative overflow-hidden rounded-xl group">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${previewPhotos[4].url}')` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-0 left-0 right-0 h-0.5 w-0 bg-[#e3261d] group-hover:w-full transition-all duration-500" />
              </div>
              <div className="flex-[2] relative overflow-hidden rounded-xl group">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${previewPhotos[5].url}')` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-[#e3261d] text-[8px] font-bold tracking-[0.3em] uppercase mb-0.5">Gallery</p>
                  <p className="font-display text-white font-bold text-sm">{previewPhotos[5].title}</p>
                </div>
                <div className="absolute top-0 left-0 right-0 h-0.5 w-0 bg-[#e3261d] group-hover:w-full transition-all duration-500" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────── GALLERY PAGE ─────────────────────────── */

const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [displayedCategory, setDisplayedCategory] = useState('All');
  const [transitioning, setTransitioning] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [headerRef, headerEntry] = useIntersectionObserver({ threshold: 0.2, freezeOnceVisible: true });
  const headerVisible = !!headerEntry?.isIntersecting;
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter with fade transition
  const handleFilter = useCallback((cat: string) => {
    if (cat === activeCategory) return;
    setTransitioning(true);
    setTimeout(() => {
      setDisplayedCategory(cat);
      setActiveCategory(cat);
      setTransitioning(false);
    }, 280);
  }, [activeCategory]);

  const filteredPhotos = displayedCategory === 'All'
    ? photos
    : photos.filter((p) => p.category === displayedCategory);

  // Lightbox keyboard + scroll lock
  useEffect(() => {
    if (lightboxIndex === null) return;
    const total = filteredPhotos.length;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => i !== null ? (i === 0 ? total - 1 : i - 1) : null);
      if (e.key === 'ArrowRight') setLightboxIndex((i) => i !== null ? (i === total - 1 ? 0 : i + 1) : null);
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, filteredPhotos.length]);

  return (
    <div className="bg-white">
      <Hero />

      {/* ── Interactive Filter Bar with Morphing Pill ── */}
      <div
        ref={headerRef as React.RefObject<HTMLDivElement>}
        className={`relative z-40 bg-white border-b border-neutral-200 shadow-lg transition-all duration-700 ${
          headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        <div className="container mx-auto px-6 max-w-7xl py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            {/* Category Pills with Morphing Background */}
            <div className="relative flex flex-wrap items-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleFilter(cat)}
                  className={`relative z-10 px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-500 ${
                    activeCategory === cat
                      ? 'text-white'
                      : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  {/* Animated background blob */}
                  {activeCategory === cat && (
                    <span className="absolute inset-0 bg-gradient-to-r from-[#e3261d] to-[#c01f18] rounded-full animate-pulse shadow-lg shadow-[#e3261d]/30" />
                  )}

                  <span className="relative z-10 flex items-center gap-2">
                    {cat}
                    {cat !== 'All' && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        activeCategory === cat ? 'bg-white/20' : 'bg-neutral-100'
                      }`}>
                        {photos.filter((p) => p.category === cat).length}
                      </span>
                    )}
                  </span>
                </button>
              ))}
            </div>

            {/* Animated Count Display */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-50 border border-neutral-200">
                <span className="font-display text-2xl font-black text-[#e3261d] tabular-nums">
                  {filteredPhotos.length}
                </span>
                <span className="text-neutral-400 text-[10px] tracking-wider uppercase">
                  {activeCategory === 'All' ? 'Total' : 'Photos'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Masonry Gallery ── */}
      <div className="relative bg-[#0a0a0a] py-16 md:py-20 overflow-hidden">
        {/* Purple ambient — top left */}
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: '50vw', height: '50vw', borderRadius: '50%',
          background: 'radial-gradient(circle, #4e3779 0%, transparent 65%)',
          opacity: 0.26, filter: 'blur(70px)',
          transform: 'translate(-20%, -20%)', pointerEvents: 'none',
        }} />
        {/* Red ambient — bottom right */}
        <div style={{
          position: 'absolute', bottom: 0, right: 0,
          width: '30vw', height: '30vw', borderRadius: '50%',
          background: 'radial-gradient(circle, #e3261d 0%, transparent 65%)',
          opacity: 0.16, filter: 'blur(70px)',
          transform: 'translate(20%, 20%)', pointerEvents: 'none',
        }} />
        {/* Gradient top line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #4e3779 0%, #e3261d 100%)',
          opacity: 0.7,
        }} />
        <div
          ref={gridRef}
          className={`container mx-auto px-5 lg:px-10 max-w-[1600px] transition-all duration-500 ${
            transitioning ? 'opacity-0 blur-sm' : 'opacity-100 blur-0'
          }`}
        >
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {filteredPhotos.map((photo, idx) => (
              <div
                key={photo.id}
                className="break-inside-avoid mb-4 group relative overflow-hidden rounded-2xl cursor-pointer bg-neutral-900"
                onClick={() => setLightboxIndex(idx)}
                style={{
                  opacity: 0,
                  animation: 'masonryIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards',
                  animationDelay: `${idx * 0.055}s`,
                }}
              >
                {/* Image */}
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-auto block object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  loading="lazy"
                />

                {/* Gradient overlay — always slightly present, deepens on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

                {/* Category badge — slides down on hover */}
                <div className="absolute top-4 left-4 -translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                  <span className="inline-flex items-center text-[9px] font-bold tracking-[0.3em] uppercase text-[#e3261d] bg-black/60 backdrop-blur-md border border-[#e3261d]/30 px-3 py-1.5 rounded-full">
                    {photo.category}
                  </span>
                </div>

                {/* Expand icon — slides down on hover */}
                <div className="absolute top-4 right-4 -translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out delay-75">
                  <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                    </svg>
                  </div>
                </div>

                {/* Bottom info — slides up on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out">
                  <div className="w-7 h-0.5 bg-[#e3261d] mb-3" />
                  <h3 className="font-display text-white font-bold text-[1.05rem] leading-tight">
                    {photo.title}
                  </h3>
                  <p className="text-white/50 text-sm mt-1">{photo.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredPhotos.length === 0 && (
            <div className="py-32 text-center">
              <svg className="w-16 h-16 text-white/10 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="font-display text-2xl font-bold text-white/20 mb-2">No photos found</p>
              <p className="text-white/20 text-sm">Try selecting a different category</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes masonryIn {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* ── CTA Strip ── */}
      <div className="bg-[#111111] py-20">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[9px] font-bold tracking-[0.45em] text-[#e3261d] uppercase mb-3">
              Experience It Live
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
              These moments could be<br />
              <span className="italic font-normal text-white/40">yours to live.</span>
            </h2>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link
              to="/destinations"
              className="group inline-flex items-center gap-4 border border-white/15 px-7 py-4 hover:border-[#e3261d]/50 hover:bg-[#e3261d]/5 transition-all duration-300"
            >
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/60 group-hover:text-white transition-colors duration-300">
                Explore Destinations
              </span>
            </Link>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 bg-[#e3261d] px-7 py-4 text-white font-bold text-[10px] tracking-[0.2em] uppercase hover:bg-[#c01f18] transition-colors duration-300"
            >
              Plan Your Trip
              <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <Lightbox
          photo={filteredPhotos[lightboxIndex]}
          index={lightboxIndex}
          total={filteredPhotos.length}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => i !== null ? (i === 0 ? filteredPhotos.length - 1 : i - 1) : null)}
          onNext={() => setLightboxIndex((i) => i !== null ? (i === filteredPhotos.length - 1 ? 0 : i + 1) : null)}
        />
      )}
    </div>
  );
};

export default Gallery;
