import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80',
      title: 'Discover the Magic of Oman',
      subtitle: 'Travelling along winding roads through mountains, beaches, and ancient backwaters',
    },
    {
      image: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=1920&q=80',
      title: 'Ancient Forts & Heritage',
      subtitle: 'Journey through time exploring magnificent forts and cultural treasures',
    },
    {
      image: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=1920&q=80',
      title: 'Desert Adventures Await',
      subtitle: 'Experience the golden dunes and starlit nights of the Arabian desert',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-screen overflow-hidden">

      {/* ── Ambient colour glows (behind everything) ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Purple — bottom-left */}
        <div style={{
          position: 'absolute', bottom: '-10%', left: '-5%',
          width: '60vw', height: '60vw', borderRadius: '50%',
          background: 'radial-gradient(circle, #4e3779 0%, transparent 65%)',
          opacity: 0.30, filter: 'blur(60px)',
        }} />
        {/* Red — top-right */}
        <div style={{
          position: 'absolute', top: '-5%', right: '-5%',
          width: '35vw', height: '35vw', borderRadius: '50%',
          background: 'radial-gradient(circle, #e3261d 0%, transparent 65%)',
          opacity: 0.18, filter: 'blur(70px)',
        }} />
        {/* Gradient accent line at very bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #4e3779 0%, #e3261d 100%)',
          opacity: 0.7,
        }} />
      </div>

      {/* ── Slides ── */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-[8000ms]"
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
          {/* Layered gradient: bottom-heavy + slight left darkening */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
        </div>
      ))}

      {/* ── Hero Content — key forces re-animation on every slide ── */}
      <div className="relative h-full flex items-center z-10">
        <div className="container mx-auto px-6 lg:px-12">
          {/* key={currentSlide} remounts the div → re-triggers CSS animations */}
          <div key={currentSlide} className="max-w-3xl">

            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-7 animate-slide-up opacity-0">
              <div className="w-8 h-px" style={{ backgroundColor: 'rgba(227, 38, 29, 0.6)' }} />
              <span className="text-[10px] font-bold tracking-[0.45em] text-white/70 uppercase">
                Al Maha Tourism — Oman
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.0] mb-6 animate-slide-up opacity-0">
              {slides[currentSlide].title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl lg:text-2xl text-white/70 font-light leading-relaxed mb-10 max-w-xl animate-fade-up opacity-0">
              {slides[currentSlide].subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-delayed opacity-0">
              <Link to="/contact" className="group inline-flex items-center gap-3 text-white text-sm font-semibold px-8 py-4 rounded-full hover:bg-opacity-90 transition-all duration-300 w-fit" style={{ backgroundColor: '#e3261d', boxShadow: '0 8px 30px rgba(227, 38, 29, 0.4)' }}>
                Plan Your Journey
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link to="/destinations" className="inline-flex items-center gap-3 border border-white/30 bg-white/8 backdrop-blur-sm text-white text-sm font-semibold px-8 py-4 rounded-full hover:bg-white/15 hover:border-white/50 transition-all duration-300 w-fit">
                Explore Destinations
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Slide number indicator (top-right) ── */}
      <div className="absolute top-8 right-10 z-20 hidden md:flex items-center gap-3">
        <span className="font-display text-2xl font-bold text-white leading-none">
          {String(currentSlide + 1).padStart(2, '0')}
        </span>
        <div className="flex flex-col gap-1">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-px transition-all duration-500 ${
                i === currentSlide ? 'w-8' : 'w-4 bg-white/30'
              }`}
              style={i === currentSlide ? { backgroundColor: '#e3261d' } : {}}
            />
          ))}
        </div>
        <span className="text-white/30 text-sm font-display">
          {String(slides.length).padStart(2, '0')}
        </span>
      </div>

      {/* ── Bottom bar: indicators + scroll ── */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex items-center justify-between px-6 lg:px-12">

        {/* Slide pill indicators */}
        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? 'w-10'
                  : 'w-2 bg-white/35 hover:bg-white/60'
              }`}
              style={index === currentSlide ? { backgroundColor: '#e3261d' } : {}}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/40 text-[9px] tracking-[0.3em] uppercase font-medium">Scroll</span>
          <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
