import React from 'react';
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const AboutSection: React.FC = () => {
  const [ref, entry] = useIntersectionObserver({ threshold: 0.1, freezeOnceVisible: true });
  const visible = !!entry?.isIntersecting;

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Content */}
          <div className={`transition-all duration-1000 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>

            {/* Label */}
            <div className="mb-6 flex items-center gap-4">
              <div style={{ width: 32, height: 2, background: 'linear-gradient(90deg, #4e3779, #e3261d)' }} />
              <span className="inline-block px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-full"
                style={{ background: 'linear-gradient(135deg, rgba(78,55,121,0.15), rgba(227,38,29,0.08))', color: '#4e3779', border: '1px solid rgba(78,55,121,0.25)' }}>
                About Us
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-dark mb-6 leading-tight">
              Your Gateway to Oman's Wonders
            </h2>

            {/* Description */}
            <p className="text-neutral-600 text-lg leading-relaxed mb-8">
              At Al Maha Tourism, we craft extraordinary journeys that showcase the magnificent beauty
              and rich heritage of Oman. With over 15 years of expertise, our passionate team combines
              local knowledge with world-class service.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-10">
              {[
                { value: '25+', label: 'Years Experience', color: '#4e3779' },
                { value: '500+', label: 'Happy Clients', color: '#e3261d' },
                { value: '50+', label: 'Destinations', color: '#4e3779' }
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</p>
                  <p className="text-sm text-neutral-500">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              to="/about"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary-dark text-white font-semibold rounded-lg transition-all duration-300 group"
              style={{ transition: 'background-color 0.3s' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e3261d'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
            >
              <span>Learn More</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

          </div>

          {/* Right: Image */}
          <div className={`relative transition-all duration-1000 ease-out delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="relative">
              {/* Purple-red gradient border ring */}
              <div style={{
                position: 'absolute', inset: -3, borderRadius: '1.25rem',
                background: 'linear-gradient(135deg, #4e3779 0%, #e3261d 50%, #FF9D00 100%)',
                opacity: 0.6, zIndex: 0,
              }} />
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80"
                  alt="Al Maha Tourism"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 lg:-left-6 bg-white rounded-xl shadow-xl p-4 border border-neutral-100 z-20 w-32">
                <p className="text-[10px] text-neutral-500 mb-1 text-center">Established</p>
                <p className="text-3xl font-bold text-primary-dark text-center">1999</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;
