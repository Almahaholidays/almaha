import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const ContactSection: React.FC = () => {
  const phoneNumber = "+968 9803 6952";
  const email = "salessupport@almahaholidays.com";
  const website = "www.almahatourism.com";

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
        <h2 className="text-5xl font-semibold text-center mb-20">Contact Us</h2>
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          <div>
            <h3 className="text-4xl font-bold mb-6">Get in Touch</h3>
            <p className="text-gray-dark text-lg mb-4"><strong>Phone:</strong> <a href={`tel:${phoneNumber}`} className="text-black hover:underline">{phoneNumber}</a></p>
            <p className="text-gray-dark text-lg mb-4"><strong>Email:</strong> <a href={`mailto:${email}`} className="text-black hover:underline">{email}</a></p>
            <p className="text-gray-dark text-lg mb-8"><strong>Website:</strong> <a href={`http://${website}`} target="_blank" rel="noopener noreferrer" className="text-black hover:underline">{website}</a></p>

            <h3 className="text-4xl font-bold mb-6">Send us a Message</h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-dark text-lg font-medium mb-2">Name</label>
                <input type="text" id="name" name="name" className="w-full p-4 border border-gray-medium rounded-lg bg-gray-light text-black focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-dark text-lg font-medium mb-2">Email</label>
                <input type="email" id="email" name="email" className="w-full p-4 border border-gray-medium rounded-lg bg-gray-light text-black focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent" />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-dark text-lg font-medium mb-2">Message</label>
                <textarea id="message" name="message" rows={6} className="w-full p-4 border border-gray-medium rounded-lg bg-gray-light text-black focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"></textarea>
              </div>
              <button type="submit" className="bg-black text-white text-xl font-medium px-10 py-4 rounded-full hover:bg-gray-dark transition-all duration-300 shadow-lg">
                Send Message
              </button>
            </form>
          </div>
          <div>
            <h3 className="text-4xl font-bold mb-6">Our Location</h3>
            <div className="bg-gray-light h-96 w-full rounded-xl flex items-center justify-center text-gray-dark text-2xl">
              {/* Placeholder for an embedded map */}
              <p>Map Placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;