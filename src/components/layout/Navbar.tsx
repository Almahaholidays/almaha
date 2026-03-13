import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const services = [
  {
    label: 'Trekking Tour',
    href: '/services/trekking-tour',
    description: "Explore Oman's stunning mountain ranges and ancient trails",
    highlight: '1-9 Day Adventures',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 20l6-10 4 6 3-4 5 8H3z" />
      </svg>
    ),
  },
  {
    label: 'Canyoning & Caving',
    href: '/services/canyoning-caving',
    description: 'Discover hidden caves and dramatic canyon landscapes',
    highlight: 'Extreme Exploration',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.5 4-4 6-4 10a4 4 0 0 0 8 0c0-4-2.5-6-4-10z" />
        <path strokeLinecap="round" d="M12 13v4" />
      </svg>
    ),
  },
  {
    label: 'Culture Tour',
    href: '/services/culture-tour',
    description: "Immerse yourself in Oman's rich cultural heritage",
    highlight: 'Heritage & Traditions',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M4 21V10M20 21V10M2 10l10-7 10 7" />
        <rect x="9" y="14" width="6" height="7" rx="0.5" />
      </svg>
    ),
  },
  {
    label: 'Car Rental',
    href: '/services/car-rental',
    description: 'Premium vehicles for your journey across Oman',
    highlight: 'Flexible Mobility',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 17H3v-5l2-5h14l2 5v5h-2M5 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm10 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" />
      </svg>
    ),
  },
  {
    label: 'Luxury Tour',
    href: '/services/luxury-tour',
    description: 'Indulge in exclusive 5-star experiences across Oman',
    highlight: '5-Star Experience',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    label: 'Adventure Tour',
    href: '/services/adventure-tour',
    description: 'Push your limits with thrilling outdoor adventures',
    highlight: 'Thrilling Experiences',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
      </svg>
    ),
  },
];

const events = [
  {
    label: 'MICE',
    href: '/events/mice',
    description: 'Meetings, incentives, conferences & exhibitions',
    highlight: 'Business',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    label: 'FIT',
    href: '/events/fit',
    description: 'Free independent traveler packages & tours',
    highlight: 'Popular',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    label: 'Wedding',
    href: '/events/wedding',
    description: 'Dream destination weddings & celebrations',
    highlight: 'Romance',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    label: 'Group',
    href: '/events/group',
    description: 'Large group tours & custom experiences',
    highlight: 'Special',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileEventsOpen, setMobileEventsOpen] = useState(false);
  const lastScrollY = useRef(0);
  const servicesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const eventsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
    setIsEventsOpen(false);
    setMobileServicesOpen(false);
    setMobileEventsOpen(false);
  }, [location]);

  const handleServicesEnter = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
    }
    if (eventsTimeoutRef.current) {
      clearTimeout(eventsTimeoutRef.current);
    }
    setIsEventsOpen(false);
    setIsServicesOpen(true);
  };

  const handleServicesLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 150);
  };

  const handleEventsEnter = () => {
    if (eventsTimeoutRef.current) {
      clearTimeout(eventsTimeoutRef.current);
    }
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
    }
    setIsServicesOpen(false);
    setIsEventsOpen(true);
  };

  const handleEventsLeave = () => {
    eventsTimeoutRef.current = setTimeout(() => {
      setIsEventsOpen(false);
    }, 150);
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const handleHeaderLeave = () => {
    handleServicesLeave();
    handleEventsLeave();
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setMobileServicesOpen(false);
    setMobileEventsOpen(false);
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-500 bg-white ${
          isScrolled || isServicesOpen || isEventsOpen ? 'shadow-xl' : ''
        } ${
          isHidden && !isServicesOpen && !isEventsOpen && !isMenuOpen ? '-top-28' : 'top-0'
        }`}
        onMouseLeave={handleHeaderLeave}
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
              <img
                src={`${import.meta.env.BASE_URL}logo/almaha_logo1.png`}
                alt="Al Maha Tourism"
                className="h-12 md:h-14 object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center justify-center gap-8 flex-1">
              <Link
                to="/"
                className={`relative px-4 py-2 rounded-full font-['Lato'] text-[0.8rem] uppercase tracking-[0.08em] transition-all duration-300 ${
                  location.pathname === '/'
                    ? 'text-black'
                    : 'text-black/60 hover:text-black hover:bg-black/5'
                }`}
              >
                <span>Home</span>
                {location.pathname === '/' && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ backgroundColor: '#e3261d' }} />
                )}
              </Link>

              {/* Services with dropdown trigger */}
              <div className="relative" onMouseEnter={handleServicesEnter}>
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-['Lato'] text-[0.8rem] uppercase tracking-[0.08em] transition-all duration-300 ${
                    isServicesOpen
                      ? 'bg-black/5 text-black'
                      : 'text-black/60 hover:text-black hover:bg-black/5'
                  }`}
                >
                  <span>Our Experiences</span>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    className={`transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`}
                  >
                    <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Events with dropdown trigger */}
              <div className="relative" onMouseEnter={handleEventsEnter}>
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-['Lato'] text-[0.8rem] uppercase tracking-[0.08em] transition-all duration-300 ${
                    isEventsOpen
                      ? 'bg-black/5 text-black'
                      : 'text-black/60 hover:text-black hover:bg-black/5'
                  }`}
                >
                  <span>Our Services</span>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    className={`transition-transform duration-300 ${isEventsOpen ? 'rotate-180' : ''}`}
                  >
                    <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Destinations Link */}
              <Link
                to="/destinations"
                className={`relative px-4 py-2 rounded-full font-['Lato'] text-[0.8rem] uppercase tracking-[0.08em] transition-all duration-300 ${
                  location.pathname === '/destinations'
                    ? 'text-black'
                    : 'text-black/60 hover:text-black hover:bg-black/5'
                }`}
              >
                <span>Destinations</span>
                {location.pathname === '/destinations' && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ backgroundColor: '#e3261d' }} />
                )}
              </Link>

              {navItems.slice(1).map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`relative px-4 py-2 rounded-full font-['Lato'] text-[0.8rem] uppercase tracking-[0.08em] transition-all duration-300 ${
                      isActive
                        ? 'text-black'
                        : 'text-black/60 hover:text-black hover:bg-black/5'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ backgroundColor: '#e3261d' }} />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full text-black transition-colors duration-200 hover:bg-black/5 active:bg-black/10"
              aria-label="Toggle menu"
            >
              <div className="w-5 flex flex-col gap-[5px]">
                <span
                  className={`block h-[1.5px] bg-current transition-all duration-300 origin-center ${
                    isMenuOpen ? 'rotate-45 translate-y-[6.5px]' : ''
                  }`}
                />
                <span
                  className={`block h-[1.5px] bg-current transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0 scale-x-0' : ''
                  }`}
                />
                <span
                  className={`block h-[1.5px] bg-current transition-all duration-300 origin-center ${
                    isMenuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Services Dropdown Panel - Mega Menu */}
        <div
          className={`hidden lg:block w-full bg-white border-t border-black/5 transition-all duration-400 ease-out overflow-hidden`}
          style={{
            maxHeight: isServicesOpen ? '550px' : '0px',
            opacity: isServicesOpen ? 1 : 0,
          }}
          onMouseEnter={handleServicesEnter}
        >
          <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 py-8">
            <div className="flex gap-12">
              {/* Left side - Featured & Quick Info */}
              <div
                className="w-72 flex-shrink-0"
                style={{
                  opacity: isServicesOpen ? 1 : 0,
                  transform: isServicesOpen ? 'translateY(0)' : 'translateY(-10px)',
                  transition: 'opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s',
                }}
              >
                <h3 className="font-['Lato'] text-[0.7rem] font-semibold text-black uppercase tracking-[0.15em] mb-3">
                  Our Experiences
                </h3>
                <p className="font-['Lato'] text-[0.85rem] text-black/50 leading-relaxed mb-6">
                  Complete travel solutions tailored to your needs. Let us handle every detail of your journey.
                </p>

                {/* CTA */}
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-black text-white rounded-full font-['Lato'] text-[0.75rem] uppercase tracking-wider hover:bg-black/80 transition-colors"
                >
                  <span>Get a Quote</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M8 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>

              {/* Center - Services Grid */}
              <div className="flex-1">
                <div className="grid grid-cols-3 gap-2">
                  {services.map((service, index) => (
                    <Link
                      key={service.label}
                      to={service.href}
                      className="group p-4 rounded-xl hover:bg-black/[0.03] transition-all duration-300 border border-transparent hover:border-black/5"
                      style={{
                        opacity: isServicesOpen ? 1 : 0,
                        transform: isServicesOpen ? 'translateY(0)' : 'translateY(-10px)',
                        transition: `opacity 0.3s ease ${0.05 + index * 0.03}s, transform 0.3s ease ${0.05 + index * 0.03}s`,
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-black/5 text-black/40 group-hover:text-white transition-all duration-300 flex-shrink-0"
                          style={{ transition: 'background-color 0.3s, color 0.3s' }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e3261d'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}>
                          {service.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-['Lato'] text-[0.9rem] font-medium text-black/80 group-hover:text-black transition-colors">
                              {service.label}
                            </span>
                          </div>
                          <p className="font-['Lato'] text-[0.75rem] text-black/40 leading-snug">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right side - Contact Info */}
              <div
                className="w-56 flex-shrink-0 border-l border-black/5 pl-8"
                style={{
                  opacity: isServicesOpen ? 1 : 0,
                  transform: isServicesOpen ? 'translateY(0)' : 'translateY(-10px)',
                  transition: 'opacity 0.4s ease 0.15s, transform 0.4s ease 0.15s',
                }}
              >
                <h4 className="font-['Lato'] text-[0.7rem] font-semibold text-black uppercase tracking-[0.15em] mb-4">
                  Call us directly
                </h4>

                <div className="space-y-4">
                  <div>
                    <a href="tel:+96898036952" className="flex items-center gap-2 text-black/80 transition-colors"
                      style={{ transition: 'color 0.3s' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#e3261d'}
                      onMouseLeave={(e) => e.currentTarget.style.color = ''}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                      <span className="font-['Lato'] text-[0.8rem]">+968 9803 6952</span>
                    </a>
                  </div>

                  <div>
                    <h5 className="font-['Lato'] text-[0.65rem] font-semibold text-black/60 uppercase tracking-[0.12em] mb-2">
                      Email us
                    </h5>
                    <a href="mailto:salessupport@almahaholidays.com" className="flex items-center gap-2 text-black/80 transition-colors"
                      style={{ transition: 'color 0.3s' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#e3261d'}
                      onMouseLeave={(e) => e.currentTarget.style.color = ''}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                      <span className="font-['Lato'] text-[0.8rem]">salessupport@almahaholidays.com</span>
                    </a>
                  </div>

                  <div>
                    <h5 className="font-['Lato'] text-[0.65rem] font-semibold text-black/60 uppercase tracking-[0.12em] mb-2">
                      Address
                    </h5>
                    <div className="flex items-start gap-2 text-black/80">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-0.5">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      <span className="font-['Lato'] text-[0.8rem] leading-relaxed">Muscat, Sultanate of Oman</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Events Dropdown Panel */}
        <div
          className={`hidden lg:block w-full bg-white border-t border-black/5 transition-all duration-400 ease-out overflow-hidden`}
          style={{
            maxHeight: isEventsOpen ? '550px' : '0px',
            opacity: isEventsOpen ? 1 : 0,
          }}
          onMouseEnter={handleEventsEnter}
        >
          <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 py-8">
            <div className="flex gap-12">
              {/* Left side - Featured & Quick Info */}
              <div
                className="w-72 flex-shrink-0"
                style={{
                  opacity: isEventsOpen ? 1 : 0,
                  transform: isEventsOpen ? 'translateY(0)' : 'translateY(-10px)',
                  transition: 'opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s',
                }}
              >
                <h3 className="font-['Lato'] text-[0.7rem] font-semibold text-black uppercase tracking-[0.15em] mb-3">
                  Our Services
                </h3>
                <p className="font-['Lato'] text-[0.85rem] text-black/50 leading-relaxed mb-6">
                  Join us for exclusive special events and create unforgettable memories.
                </p>

                {/* CTA */}
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-black text-white rounded-full font-['Lato'] text-[0.75rem] uppercase tracking-wider hover:bg-black/80 transition-colors"
                >
                  <span>Book Now</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M8 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>

              {/* Center - Events Grid */}
              <div className="flex-1">
                <div className="grid grid-cols-3 gap-2">
                  {events.map((event, index) => (
                    <Link
                      key={event.label}
                      to={event.href}
                      className="group p-4 rounded-xl hover:bg-black/[0.03] transition-all duration-300 border border-transparent hover:border-black/5"
                      style={{
                        opacity: isEventsOpen ? 1 : 0,
                        transform: isEventsOpen ? 'translateY(0)' : 'translateY(-10px)',
                        transition: `opacity 0.3s ease ${0.05 + index * 0.03}s, transform 0.3s ease ${0.05 + index * 0.03}s`,
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-black/5 text-black/40 group-hover:text-white transition-all duration-300 flex-shrink-0"
                          style={{ transition: 'background-color 0.3s, color 0.3s' }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4e3779'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}>
                          {event.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-['Lato'] text-[0.9rem] font-medium text-black/80 group-hover:text-black transition-colors">
                              {event.label}
                            </span>
                          </div>
                          <p className="font-['Lato'] text-[0.75rem] text-black/40 leading-snug">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right side - Contact Info */}
              <div
                className="w-56 flex-shrink-0 border-l border-black/5 pl-8"
                style={{
                  opacity: isEventsOpen ? 1 : 0,
                  transform: isEventsOpen ? 'translateY(0)' : 'translateY(-10px)',
                  transition: 'opacity 0.4s ease 0.15s, transform 0.4s ease 0.15s',
                }}
              >
                <h4 className="font-['Lato'] text-[0.7rem] font-semibold text-black uppercase tracking-[0.15em] mb-4">
                  Call us directly
                </h4>

                <div className="space-y-4">
                  <div>
                    <a href="tel:+96898036952" className="flex items-center gap-2 text-black/80 transition-colors"
                      style={{ transition: 'color 0.3s' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#e3261d'}
                      onMouseLeave={(e) => e.currentTarget.style.color = ''}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                      <span className="font-['Lato'] text-[0.8rem]">+968 9803 6952</span>
                    </a>
                  </div>

                  <div>
                    <h5 className="font-['Lato'] text-[0.65rem] font-semibold text-black/60 uppercase tracking-[0.12em] mb-2">
                      Email us
                    </h5>
                    <a href="mailto:salessupport@almahaholidays.com" className="flex items-center gap-2 text-black/80 transition-colors"
                      style={{ transition: 'color 0.3s' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#e3261d'}
                      onMouseLeave={(e) => e.currentTarget.style.color = ''}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                      <span className="font-['Lato'] text-[0.8rem]">salessupport@almahaholidays.com</span>
                    </a>
                  </div>

                  <div>
                    <h5 className="font-['Lato'] text-[0.65rem] font-semibold text-black/60 uppercase tracking-[0.12em] mb-2">
                      Address
                    </h5>
                    <div className="flex items-start gap-2 text-black/80">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-0.5">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      <span className="font-['Lato'] text-[0.8rem] leading-relaxed">Muscat, Sultanate of Oman</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Desktop backdrop overlay when dropdown is open */}
      <div
        className={`hidden lg:block fixed inset-0 bg-black/40 z-40 transition-opacity duration-400 ${
          isServicesOpen || isEventsOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        style={{ top: '0' }}
        onClick={() => { setIsServicesOpen(false); setIsEventsOpen(false); }}
      />

      {/* Mobile Menu — full-screen slide-in panel */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: '#0a0a0a' }}
      >
        {/* Top bar inside menu — logo + close */}
        <div className="flex items-center justify-between px-6 h-20">
          <Link to="/" onClick={closeMenu}>
            <img
              src={`${import.meta.env.BASE_URL}logo/almaha_logo1.png`}
              alt="Al Maha Tourism"
              className="h-10 object-contain brightness-0 invert"
            />
          </Link>
          <button
            onClick={closeMenu}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all duration-200"
            aria-label="Close menu"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable nav content */}
        <nav className="flex flex-col px-6 pb-10 h-[calc(100%-5rem)] overflow-y-auto">

          {/* Primary nav links */}
          <div className="space-y-0 mb-2">

            {/* Home */}
            <Link
              to="/"
              className="flex items-center justify-between py-4 border-b border-white/[0.06] group"
              style={{
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? 'translateX(0)' : 'translateX(30px)',
                transition: 'opacity 0.45s ease 0.05s, transform 0.45s ease 0.05s',
              }}
              onClick={closeMenu}
            >
              <span className={`font-['Lato'] text-[1.6rem] font-bold tracking-[-0.02em] transition-colors duration-200 ${
                location.pathname === '/' ? 'text-white' : 'text-white/40 group-hover:text-white'
              }`}>
                Home
              </span>
              {location.pathname === '/' && (
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#e3261d' }} />
              )}
            </Link>

            {/* Our Experiences — accordion */}
            <div
              style={{
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? 'translateX(0)' : 'translateX(30px)',
                transition: 'opacity 0.45s ease 0.1s, transform 0.45s ease 0.1s',
              }}
            >
              <button
                className="w-full flex items-center justify-between py-4 border-b border-white/[0.06] group"
                onClick={() => { setMobileServicesOpen(!mobileServicesOpen); setMobileEventsOpen(false); }}
              >
                <span className={`font-['Lato'] text-[1.6rem] font-bold tracking-[-0.02em] transition-colors duration-200 ${
                  mobileServicesOpen ? 'text-white' : 'text-white/40 group-hover:text-white'
                }`}>
                  Our Experiences
                </span>
                <svg
                  width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                  className={`text-white/30 flex-shrink-0 transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Accordion content */}
              <div
                className="overflow-hidden transition-all duration-400 ease-in-out"
                style={{ maxHeight: mobileServicesOpen ? `${services.length * 72}px` : '0px' }}
              >
                <div className="py-2 pl-2 space-y-1">
                  {services.map((service) => (
                    <Link
                      key={service.label}
                      to={service.href}
                      className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-white/5 active:bg-white/10 transition-colors duration-200"
                      onClick={closeMenu}
                    >
                      <div className="flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0" style={{ backgroundColor: 'rgba(227,38,29,0.15)', color: '#e3261d' }}>
                        {service.icon}
                      </div>
                      <div>
                        <span className="block font-['Lato'] text-[0.95rem] font-medium text-white/80">
                          {service.label}
                        </span>
                        <span className="block font-['Lato'] text-[0.75rem] text-white/35 mt-0.5">
                          {service.description}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Our Services — accordion */}
            <div
              style={{
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? 'translateX(0)' : 'translateX(30px)',
                transition: 'opacity 0.45s ease 0.15s, transform 0.45s ease 0.15s',
              }}
            >
              <button
                className="w-full flex items-center justify-between py-4 border-b border-white/[0.06] group"
                onClick={() => { setMobileEventsOpen(!mobileEventsOpen); setMobileServicesOpen(false); }}
              >
                <span className={`font-['Lato'] text-[1.6rem] font-bold tracking-[-0.02em] transition-colors duration-200 ${
                  mobileEventsOpen ? 'text-white' : 'text-white/40 group-hover:text-white'
                }`}>
                  Our Services
                </span>
                <svg
                  width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                  className={`text-white/30 flex-shrink-0 transition-transform duration-300 ${mobileEventsOpen ? 'rotate-180' : ''}`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Accordion content */}
              <div
                className="overflow-hidden transition-all duration-400 ease-in-out"
                style={{ maxHeight: mobileEventsOpen ? `${events.length * 72}px` : '0px' }}
              >
                <div className="py-2 pl-2 space-y-1">
                  {events.map((event) => (
                    <Link
                      key={event.label}
                      to={event.href}
                      className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-white/5 active:bg-white/10 transition-colors duration-200"
                      onClick={closeMenu}
                    >
                      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.06] text-white/40 flex-shrink-0">
                        {event.icon}
                      </div>
                      <div>
                        <span className="block font-['Lato'] text-[0.95rem] font-medium text-white/80">
                          {event.label}
                        </span>
                        <span className="block font-['Lato'] text-[0.75rem] text-white/35 mt-0.5">
                          {event.description}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Destinations */}
            <Link
              to="/destinations"
              className="flex items-center justify-between py-4 border-b border-white/[0.06] group"
              style={{
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? 'translateX(0)' : 'translateX(30px)',
                transition: 'opacity 0.45s ease 0.2s, transform 0.45s ease 0.2s',
              }}
              onClick={closeMenu}
            >
              <span className={`font-['Lato'] text-[1.6rem] font-bold tracking-[-0.02em] transition-colors duration-200 ${
                location.pathname === '/destinations' ? 'text-white' : 'text-white/40 group-hover:text-white'
              }`}>
                Destinations
              </span>
              {location.pathname === '/destinations' && (
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#e3261d' }} />
              )}
            </Link>

            {/* Remaining nav items */}
            {navItems.slice(1).map((item, index) => (
              <Link
                key={item.label}
                to={item.href}
                className="flex items-center justify-between py-4 border-b border-white/[0.06] group"
                style={{
                  opacity: isMenuOpen ? 1 : 0,
                  transform: isMenuOpen ? 'translateX(0)' : 'translateX(30px)',
                  transition: `opacity 0.45s ease ${0.25 + index * 0.05}s, transform 0.45s ease ${0.25 + index * 0.05}s`,
                }}
                onClick={closeMenu}
              >
                <span className={`font-['Lato'] text-[1.6rem] font-bold tracking-[-0.02em] transition-colors duration-200 ${
                  location.pathname === item.href ? 'text-white' : 'text-white/40 group-hover:text-white'
                }`}>
                  {item.label}
                </span>
                {location.pathname === item.href && (
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#e3261d' }} />
                )}
              </Link>
            ))}
          </div>

          {/* CTA + Contact — pushed to bottom */}
          <div className="mt-auto pt-8">
            <Link
              to="/contact"
              className="flex items-center justify-center gap-3 w-full py-4 font-['Lato'] text-[0.9rem] font-semibold text-white rounded-full transition-all duration-300 active:scale-[0.98]"
              style={{ backgroundColor: '#e3261d' }}
              onClick={closeMenu}
            >
              <span>Get Started</span>
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none" className="-rotate-45">
                <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>

            <div className="mt-6 flex items-center gap-6 pt-6 border-t border-white/[0.06]">
              <a
                href="mailto:salessupport@almahaholidays.com"
                className="flex items-center gap-2 font-['Lato'] text-[0.8rem] text-white/35 hover:text-white/70 transition-colors duration-200"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                salessupport@almahaholidays.com
              </a>
            </div>
            <div className="mt-3">
              <a
                href="tel:+96898036952"
                className="flex items-center gap-2 font-['Lato'] text-[0.8rem] text-white/35 hover:text-white/70 transition-colors duration-200"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                +968 9803 6952
              </a>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile backdrop — tap to close */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/60 z-30 transition-opacity duration-500 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={closeMenu}
      />
    </>
  );
}
