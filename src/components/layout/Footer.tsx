import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-dark text-white overflow-hidden">
      {/* Purple ambient — top left */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: '45vw', height: '45vw', borderRadius: '50%',
        background: 'radial-gradient(circle, #4e3779 0%, transparent 65%)',
        opacity: 0.25, filter: 'blur(70px)',
        transform: 'translate(-20%, -20%)', pointerEvents: 'none',
      }} />
      {/* Red ambient — bottom right */}
      <div style={{
        position: 'absolute', bottom: 0, right: 0,
        width: '30vw', height: '30vw', borderRadius: '50%',
        background: 'radial-gradient(circle, #e3261d 0%, transparent 65%)',
        opacity: 0.15, filter: 'blur(70px)',
        transform: 'translate(15%, 15%)', pointerEvents: 'none',
      }} />
      {/* Gradient top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, #4e3779 0%, #e3261d 100%)',
        opacity: 0.8,
      }} />
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Column */}
          <div>
            <img
              src={`${import.meta.env.BASE_URL}logo/almaha_logo1.png`}
              alt="Al Maha Tourism"
              className="h-20 mb-6 object-contain"
            />
            <p className="text-neutral-300 leading-relaxed mb-6">
              Discover the extraordinary beauty and rich heritage of Oman with expertly crafted tours and unforgettable experiences.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/al-maha-rent-a-car/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition-colors duration-300"
                style={{ transition: 'background-color 0.3s' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(227, 38, 29, 1)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-neutral-300 hover:text-[#e3261d] transition-colors duration-250">Home</Link></li>
              <li><Link to="/about" className="text-neutral-300 hover:text-[#e3261d] transition-colors duration-250">About Us</Link></li>
              <li><Link to="/destinations" className="text-neutral-300 hover:text-[#e3261d] transition-colors duration-250">Destinations</Link></li>
              <li><Link to="/services" className="text-neutral-300 hover:text-[#e3261d] transition-colors duration-250">Experiences</Link></li>
              <li><Link to="/contact" className="text-neutral-300 hover:text-[#e3261d] transition-colors duration-250">Contact</Link></li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4 className="font-display text-lg font-bold mb-6">Popular Destinations</h4>
            <ul className="space-y-3">
              <li><Link to="/destinations/muscat" className="text-neutral-300 hover:text-[#e3261d] transition-colors duration-250">Muscat</Link></li>
              <li><Link to="/destinations/wahiba-sands" className="text-neutral-300 hover:text-[#e3261d] transition-colors duration-250">Wahiba Sands</Link></li>
              <li><Link to="/destinations/nizwa" className="text-neutral-300 hover:text-[#e3261d] transition-colors duration-250">Nizwa</Link></li>
              <li><Link to="/destinations/salalah" className="text-neutral-300 hover:text-[#e3261d] transition-colors duration-250">Salalah</Link></li>
              <li><Link to="/destinations/jebel-akhdar" className="text-neutral-300 hover:text-[#e3261d] transition-colors duration-250">Jebel Akhdar</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-[#e3261d] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-neutral-300">Muscat, Sultanate of Oman</span>
              </li>
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-[#e3261d] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-neutral-300">salessupport@almahaholidays.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-[#e3261d] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-neutral-300">+968 9803 6952</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-neutral-400 text-sm">
              &copy; 2026 Al Maha Holidays. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-neutral-400 hover:text-[#e3261d] transition-colors duration-250">Privacy Policy</a>
              <a href="#" className="text-neutral-400 hover:text-[#e3261d] transition-colors duration-250">Terms of Service</a>
              <a href="#" className="text-neutral-400 hover:text-[#e3261d] transition-colors duration-250">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;