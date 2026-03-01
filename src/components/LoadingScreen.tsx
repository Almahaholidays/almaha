import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Start exit animation after 3 seconds
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 3000);

    // Complete animation after fade out
    const completeTimer = setTimeout(() => {
      onLoadingComplete();
    }, 3500);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadingComplete]);

  return (
    <div className={`fixed inset-0 z-[9999] bg-white overflow-hidden transition-all duration-700 ${isExiting ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}>
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-orange-50/30"></div>

      {/* Animated decorative circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-orange/5 rounded-full blur-3xl animate-pulse-gentle"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border-2 border-primary-orange/10 rounded-full animate-rotate-slow"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-primary-orange/5 rounded-full animate-rotate-reverse"></div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary-orange/20 rounded-full animate-float-gentle"
            style={{
              left: `${15 + i * 10}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-8 left-8 opacity-0 animate-corner-tl">
        <div className="w-16 h-16 border-l-2 border-t-2 border-primary-orange/30 rounded-tl-lg"></div>
      </div>
      <div className="absolute top-8 right-8 opacity-0 animate-corner-tr">
        <div className="w-16 h-16 border-r-2 border-t-2 border-primary-orange/30 rounded-tr-lg"></div>
      </div>
      <div className="absolute bottom-8 left-8 opacity-0 animate-corner-bl">
        <div className="w-16 h-16 border-l-2 border-b-2 border-primary-orange/30 rounded-bl-lg"></div>
      </div>
      <div className="absolute bottom-8 right-8 opacity-0 animate-corner-br">
        <div className="w-16 h-16 border-r-2 border-b-2 border-primary-orange/30 rounded-br-lg"></div>
      </div>

      {/* Main Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center relative">
          {/* Background decorative elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none">
            {/* Top star */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-0 animate-star-appear">
              <svg className="w-6 h-6 text-primary-orange/40" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z"/>
              </svg>
            </div>

            {/* Bottom star */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-0 animate-star-appear" style={{ animationDelay: '0.3s' }}>
              <svg className="w-6 h-6 text-primary-orange/40" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z"/>
              </svg>
            </div>

            {/* Left ornament */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 animate-side-ornament-left">
              <div className="flex items-center space-x-1">
                <div className="w-8 h-px bg-primary-orange/30"></div>
                <div className="w-1.5 h-1.5 bg-primary-orange/40 rounded-full"></div>
              </div>
            </div>

            {/* Right ornament */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 animate-side-ornament-right">
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-primary-orange/40 rounded-full"></div>
                <div className="w-8 h-px bg-primary-orange/30"></div>
              </div>
            </div>
          </div>

          {/* Logo */}
          <div className="mb-6 animate-slide-up opacity-0 relative z-10">
            <h1 className="font-display text-6xl md:text-7xl font-bold text-primary-dark mb-3 animate-letter-spacing">
              AL MAHA
            </h1>
            <div className="h-0.5 w-0 mx-auto bg-primary-orange rounded-full animate-line-grow"></div>
          </div>

          {/* Subtitle */}
          <div className="animate-fade-up opacity-0 relative z-10">
            <p className="text-neutral-600 text-lg tracking-widest font-medium">
              TOURISM
            </p>
          </div>

          {/* Tagline */}
          <div className="mt-8 animate-fade-delayed opacity-0 relative z-10">
            <p className="text-neutral-500 text-sm italic">
              Discover the Extraordinary
            </p>
          </div>

          {/* Animated icon */}
          <div className="mt-10 flex justify-center opacity-0 animate-icon-appear">
            <div className="animate-bounce-soft">
              <svg className="w-8 h-8 text-primary-orange/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
