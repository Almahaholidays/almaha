import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Start exit animation after 2.5 seconds
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2500);

    // Complete animation after fade out
    const completeTimer = setTimeout(() => {
      onLoadingComplete();
    }, 3200);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadingComplete]);

  return (
    <div className={`fixed inset-0 z-[9999] bg-white overflow-hidden transition-all duration-700 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
      {/* Subtle gradient background with brand colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-neutral-50 to-[#e3261d]/5"></div>

      {/* Animated decorative circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#e3261d]/5 rounded-full blur-3xl animate-pulse-gentle"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-[#e3261d]/10 rounded-full animate-rotate-slow"></div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-[#e3261d]/20 rounded-full animate-float-gentle"
            style={{
              left: `${20 + i * 12}%`,
              top: `${25 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${5 + (i % 2)}s`,
            }}
          />
        ))}
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-8 left-8 opacity-0 animate-corner-tl">
        <div className="w-16 h-16 border-l-2 border-t-2 border-[#e3261d]/30 rounded-tl-lg"></div>
      </div>
      <div className="absolute top-8 right-8 opacity-0 animate-corner-tr">
        <div className="w-16 h-16 border-r-2 border-t-2 border-[#e3261d]/30 rounded-tr-lg"></div>
      </div>
      <div className="absolute bottom-8 left-8 opacity-0 animate-corner-bl">
        <div className="w-16 h-16 border-l-2 border-b-2 border-[#e3261d]/30 rounded-bl-lg"></div>
      </div>
      <div className="absolute bottom-8 right-8 opacity-0 animate-corner-br">
        <div className="w-16 h-16 border-r-2 border-b-2 border-[#e3261d]/30 rounded-br-lg"></div>
      </div>

      {/* Main Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center relative">
          {/* Background decorative elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none">
            {/* Left ornament */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 animate-side-ornament-left">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-px bg-[#e3261d]/30"></div>
                <div className="w-2 h-2 bg-[#e3261d]/40 rounded-full"></div>
              </div>
            </div>

            {/* Right ornament */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 animate-side-ornament-right">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#e3261d]/40 rounded-full"></div>
                <div className="w-12 h-px bg-[#e3261d]/30"></div>
              </div>
            </div>
          </div>

          {/* Logo Image */}
          <div className="mb-8 animate-slide-up opacity-0 relative z-10 flex justify-center">
            <img
              src={`${import.meta.env.BASE_URL}almaha_logo1.png`}
              alt="Al Maha Tourism"
              className="h-24 md:h-32 object-contain animate-logo-scale"
            />
          </div>

          {/* Animated divider line */}
          <div className="flex justify-center mb-6">
            <div className="h-0.5 w-0 bg-[#e3261d] rounded-full animate-line-grow"></div>
          </div>

          {/* Tagline */}
          <div className="animate-fade-delayed opacity-0 relative z-10">
            <p className="text-neutral-500 text-sm md:text-base italic tracking-wide">
              Discover the Extraordinary
            </p>
          </div>

          {/* Loading animation */}
          <div className="mt-12 flex justify-center opacity-0 animate-icon-appear">
            <div className="flex gap-1.5">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-[#e3261d] rounded-full animate-bounce-dots"
                  style={{
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
