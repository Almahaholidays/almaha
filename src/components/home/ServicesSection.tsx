import React from 'react';
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const ServicesSection: React.FC = () => {
  const services = [
    {
      title: "Trekking Tour",
      subtitle: "1-9 Day Adventures",
      description: "Explore Oman's stunning mountain ranges and ancient trails",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
      slug: "trekking-tour"
    },
    {
      title: "Canyoning & Caving",
      subtitle: "Extreme Exploration",
      description: "Discover hidden caves and canyons",
      image: "/cannyoning.jpg",
      slug: "canyoning-caving"
    },
    {
      title: "Culture Tour",
      subtitle: "Heritage & Traditions",
      description: "Immerse yourself in Oman's rich cultural heritage and ancient traditions",
      image: "/culture.jpeg",
      slug: "culture-tour"
    },
    {
      title: "Car Rental",
      subtitle: "Flexible Mobility",
      description: "Premium vehicles for your journey",
      image: "/carAboutUs.jpeg",
      slug: "car-rental"
    },
    {
      title: "Luxury Tour",
      subtitle: "5-Star Experience",
      description: "Indulge in exclusive experiences",
      image: "/AlilaExperiences.webp",
      slug: "luxury-tour"
    },
    {
      title: "Adventure Tour",
      subtitle: "Thrilling Experiences",
      description: "Push your limits with exciting adventures",
      image: "/adventureExperiences.jpeg",
      slug: "adventure-tour"
    },
  ];

  const [ref, entry] = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true,
  });

  const isVisible = entry?.isIntersecting;

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="pt-16 pb-24 bg-neutral-50 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className={`mb-16 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Two-column split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-end">
            <h2 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold text-primary-dark leading-[1.0]">
              Our<br />
              <span className="italic font-normal text-neutral-400">Experiences</span>
            </h2>

            <div className="lg:pb-2 flex flex-col justify-end gap-8 lg:items-end lg:text-right">
              <p className="text-neutral-600 text-lg leading-relaxed max-w-md">
                Curated experiences designed to showcase the best of Oman — from thrilling adventures to luxurious escapes.
              </p>
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-primary-dark font-display text-3xl font-bold leading-none">6+</p>
                  <p className="text-neutral-400 text-[10px] tracking-[0.25em] uppercase mt-1">Experiences</p>
                </div>
                <div className="w-px h-10 bg-neutral-200" />
                <div>
                  <p className="text-primary-dark font-display text-3xl font-bold leading-none">100%</p>
                  <p className="text-neutral-400 text-[10px] tracking-[0.25em] uppercase mt-1">Tailored</p>
                </div>
                <div className="w-px h-10 bg-neutral-200" />
                <div>
                  <p className="text-primary-dark font-display text-3xl font-bold leading-none">24/7</p>
                  <p className="text-neutral-400 text-[10px] tracking-[0.25em] uppercase mt-1">Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Creative Bento Box Layout */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* Large Featured - Trekking */}
          <Link
            to={`/services/${services[0].slug}`}
            className={`col-span-12 md:col-span-8 group relative overflow-hidden rounded-3xl h-[400px] md:h-[500px] ${
              isVisible ? 'opacity-100 animate-zoom-in' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url('${services[0].image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
              <span className="text-sm font-semibold tracking-wider mb-2 block" style={{ color: '#e3261d' }}>{services[0].subtitle}</span>
              <h3 className="font-display text-4xl md:text-6xl font-bold mb-4">{services[0].title}</h3>
              <p className="text-lg md:text-xl text-white/90 mb-6 max-w-xl">{services[0].description}</p>
            </div>
          </Link>

          {/* Tall Right - Canyoning */}
          <Link
            to={`/services/${services[1].slug}`}
            className={`col-span-12 md:col-span-4 group relative overflow-hidden rounded-3xl h-[300px] md:h-[500px] ${
              isVisible ? 'opacity-100 animate-zoom-in animate-delay-200' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url('${services[1].image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
              <span className="text-xs font-semibold tracking-wider mb-2 block" style={{ color: '#4e3779' }}>{services[1].subtitle}</span>
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-3">{services[1].title}</h3>
            </div>
          </Link>

          {/* TEXT CARD 1 */}
          <div className={`col-span-12 md:col-span-8 flex flex-col justify-center items-center p-8 md:p-12 rounded-3xl ${isVisible ? 'opacity-100 animate-zoom-in animate-delay-300' : 'opacity-0'}`}
            style={{ background: 'linear-gradient(135deg, #0d091f 0%, #1e1040 50%, #2a1020 100%)' }}>
            {/* Decorative gradient line */}
            <div style={{ width: 60, height: 2, background: 'linear-gradient(90deg, #4e3779, #e3261d)', marginBottom: 24, borderRadius: 2 }} />
            <h3 className={`font-display text-5xl md:text-7xl lg:text-8xl font-black text-center leading-tight bg-gradient-to-r from-accent-purple via-accent-red to-accent-purple bg-clip-text text-transparent bg-[length:200%_100%] ${isVisible ? 'animate-text-fill' : 'bg-[position:100%_0]'}`}>
              Unforgettable<br />Journeys
            </h3>
          </div>

          {/* Culture Tour */}
          <Link
            to={`/services/${services[2].slug}`}
            className={`col-span-12 md:col-span-4 group relative overflow-hidden rounded-3xl h-[300px] ${
              isVisible ? 'opacity-100 animate-zoom-in animate-delay-400' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url('${services[2].image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <span className="text-xs font-semibold tracking-wider mb-2 block" style={{ color: '#e3261d' }}>{services[2].subtitle}</span>
              <h3 className="font-display text-2xl md:text-3xl font-bold">{services[2].title}</h3>
            </div>
          </Link>

          {/* Car Rental */}
          <Link
            to={`/services/${services[3].slug}`}
            className={`col-span-12 md:col-span-4 group relative overflow-hidden rounded-3xl h-[300px] ${
              isVisible ? 'opacity-100 animate-zoom-in animate-delay-500' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url('${services[3].image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <span className="text-xs font-semibold tracking-wider mb-2 block" style={{ color: '#4e3779' }}>{services[3].subtitle}</span>
              <h3 className="font-display text-2xl md:text-3xl font-bold">{services[3].title}</h3>
            </div>
          </Link>

          {/* Luxury Tour */}
          <Link
            to={`/services/${services[4].slug}`}
            className={`col-span-12 md:col-span-4 group relative overflow-hidden rounded-3xl h-[300px] ${
              isVisible ? 'opacity-100 animate-zoom-in animate-delay-600' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url('${services[4].image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <span className="text-xs font-semibold tracking-wider mb-2 block" style={{ color: '#e3261d' }}>{services[4].subtitle}</span>
              <h3 className="font-display text-2xl md:text-3xl font-bold">{services[4].title}</h3>
            </div>
          </Link>

          {/* TEXT CARD 2 */}
          <div className={`col-span-12 md:col-span-4 flex flex-col justify-center items-center p-6 md:p-8 rounded-3xl ${isVisible ? 'opacity-100 animate-zoom-in animate-delay-700' : 'opacity-0'}`}
            style={{ background: 'linear-gradient(135deg, #1a0f30 0%, #2a1525 100%)' }}>
            <div style={{ width: 40, height: 2, background: 'linear-gradient(90deg, #e3261d, #4e3779)', marginBottom: 20, borderRadius: 2 }} />
            <h3 className={`font-display text-3xl md:text-4xl lg:text-5xl font-black text-center leading-tight bg-gradient-to-r from-accent-red via-accent-purple to-accent-red bg-clip-text text-transparent bg-[length:200%_100%] ${isVisible ? 'animate-text-fill' : 'bg-[position:100%_0]'}`}>
              Expert<br />Local<br />Guides
            </h3>
          </div>

          {/* Last Service - Full Width */}
          <Link
            to={`/services/${services[5].slug}`}
            className={`col-span-12 group relative overflow-hidden rounded-3xl h-[300px] ${
              isVisible ? 'opacity-100 animate-zoom-in animate-delay-800' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url('${services[5].image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="p-8 md:p-12 text-white max-w-2xl">
                <span className="text-sm font-semibold tracking-wider mb-2 block" style={{ color: '#4e3779' }}>{services[5].subtitle}</span>
                <h3 className="font-display text-4xl md:text-5xl font-bold mb-4">{services[5].title}</h3>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;