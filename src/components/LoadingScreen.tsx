import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2500);

    const completeTimer = setTimeout(() => {
      onLoadingComplete();
    }, 3200);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadingComplete]);

  const r = 100;
  const circumference = 2 * Math.PI * r;
  const angle = -90 + (progress / 100) * 360;
  const angleRad = (angle * Math.PI) / 180;
  const planeX = 110 + r * Math.cos(angleRad);
  const planeY = 110 + r * Math.sin(angleRad);
  const planeRotation = angle - 180;

  return (
    <div
      className={`fixed inset-0 z-[9999] overflow-hidden transition-all duration-700 ease-in-out ${
        isExiting ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
      }`}
      style={{ background: 'linear-gradient(135deg, #0d091f 0%, #1a1530 55%, #0a0a0a 100%)' }}
    >
      {/* Ambient glow behind logo */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(227,38,29,0.14) 0%, rgba(78,55,121,0.09) 45%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Subtle halo glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full pointer-events-none animate-pulse-gentle"
        style={{
          background: 'radial-gradient(circle, rgba(227,38,29,0.08) 0%, transparent 70%)',
          filter: 'blur(16px)',
        }}
      />

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float-gentle pointer-events-none"
          style={{
            width: `${3 + (i % 2)}px`,
            height: `${3 + (i % 2)}px`,
            background: i % 2 === 0 ? 'rgba(227,38,29,0.25)' : 'rgba(78,55,121,0.3)',
            left: `${15 + i * 16}%`,
            top: `${20 + (i % 3) * 22}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${6 + i}s`,
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative h-full flex flex-col items-center justify-center">

        {/* Logo with circular flight path orbiting around it */}
        <div
          className="relative animate-blur-in opacity-0 mb-8 flex items-center justify-center"
          style={{ width: '220px', height: '220px' }}
        >
          <svg
            className="absolute inset-0"
            width="220"
            height="220"
            viewBox="0 0 220 220"
          >
            <defs>
              <linearGradient id="arcGrad" gradientUnits="userSpaceOnUse" x1="110" y1="10" x2="210" y2="110">
                <stop offset="0%" stopColor="#4e3779" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#e3261d" />
              </linearGradient>
              <filter id="planeGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Dashed background orbit track */}
            <circle
              cx="110" cy="110" r={r}
              fill="none"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="1"
              strokeDasharray="2 6"
            />

            {/* Filled progress arc */}
            <circle
              cx="110" cy="110" r={r}
              fill="none"
              stroke="url(#arcGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress / 100)}
              transform="rotate(-90 110 110)"
              style={{ transition: 'stroke-dashoffset 0.1s linear' }}
            />

            {/* Plane orbiting along the arc */}
            <g
              transform={`translate(${planeX}, ${planeY}) rotate(${planeRotation})`}
              filter="url(#planeGlow)"
            >
              <path d="M0,-5.5 L3.5,5.5 L0,3.5 L-3.5,5.5 Z" fill="#FF9D00" />
            </g>
          </svg>

          {/* Logo centered inside the orbit */}
          <img
            src={`${import.meta.env.BASE_URL}almaha_logo1.png`}
            alt="Al Maha Tourism"
            className="h-12 md:h-16 object-contain relative z-10"
            style={{ filter: 'brightness(1.05)' }}
          />
        </div>

        {/* Gradient divider */}
        <div
          className="h-px w-0 rounded-full animate-line-grow mb-7"
          style={{ background: 'linear-gradient(90deg, #4e3779, #e3261d, #FF9D00)' }}
        />

        {/* Tagline */}
        <div className="animate-fade-delayed opacity-0 mb-10">
          <p
            className="text-xs md:text-sm tracking-[0.35em] uppercase font-light"
            style={{
              background: 'linear-gradient(90deg, #FF9D00 0%, #e3261d 50%, #a78bdb 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Discover the Extraordinary
          </p>
        </div>

        {/* Status text */}
        <div className="animate-icon-appear opacity-0">
          <p
            className="text-[10px] tracking-[0.25em] uppercase transition-all duration-500"
            style={{ color: 'rgba(255,255,255,0.2)' }}
          >
            {progress < 100 ? 'En Route' : 'Arrived'}
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoadingScreen;
