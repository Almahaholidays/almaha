import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const EventsSection: React.FC = () => {
  const weddingArrangements = `We offer personalized wedding arrangement services set in some of Oman’s most stunning locations from desert landscapes to mountain and coastal venues. Our team handles every detail, including décor, catering, and logistics, ensuring a seamless and unforgettable celebration. Whether you're planning an intimate gathering or a large ceremony, we bring your dream wedding to life with style and care.`;

  const [targetRef, entry] = useIntersectionObserver({
    threshold: 0.1, // Trigger when 10% of the section is visible
    freezeOnceVisible: true, // Only animate once
  });

  const isVisible = entry?.isIntersecting;

  return (
    <section
      ref={targetRef as React.RefObject<HTMLElement>}
      className={`py-24 bg-white text-black transition-opacity duration-1000 ease-out ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-semibold text-center mb-20">Special Events & Wedding Arrangements</h2>
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 items-center">
          <div>
            <img src="https://via.placeholder.com/800x600/F0F0F0/86868B?text=Elegant+Event+Venue" alt="Wedding Event" className="rounded-xl shadow-lg w-full h-auto object-cover" />
          </div>
          <div>
            <h3 className="text-4xl font-bold mb-6">Crafting Unforgettable Moments</h3>
            <p className="text-gray-dark leading-relaxed text-lg mb-8">{weddingArrangements}</p>
            <button className="bg-black text-white text-lg font-medium px-8 py-3 rounded-full hover:bg-gray-dark transition-all duration-300 shadow-lg">
              Plan Your Event
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;