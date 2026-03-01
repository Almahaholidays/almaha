import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const AdventureSection: React.FC = () => {
  const adventureText = `Adventure World specializes in providing unique and thrilling adventure experiences for people of all ages. With multiple facilities across Oman, we offer both adventure and city tours, ensuring a diverse range of activities to suit all interests. Explore Oman's stunning landscapes and vibrant cities with our mountain climbing and guided tours. Whether you’re an experienced adventurer or a first-time thrill-seeker, Adventure World has something for you.`;

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
        <h2 className="text-5xl font-semibold text-center mb-20">Unforgettable Adventures</h2>
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 items-center">
          <div>
            <img src="https://via.placeholder.com/800x600/F0F0F0/86868B?text=Oman+Adventure+Landscape" alt="Adventure Landscape" className="rounded-xl shadow-lg w-full h-auto object-cover" />
          </div>
          <div>
            <h3 className="text-4xl font-bold mb-6">Your Next Thrill Awaits</h3>
            <p className="text-gray-dark leading-relaxed text-lg mb-8">{adventureText}</p>
            <button className="bg-black text-white text-lg font-medium px-8 py-3 rounded-full hover:bg-gray-dark transition-all duration-300 shadow-lg">
              Explore Adventures
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdventureSection;