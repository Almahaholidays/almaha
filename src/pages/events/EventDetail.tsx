import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface EventData {
  title: string;
  fullName: string;
  tagline: string;
  hero: string;
  description: string;
  longDescription: string;
  features: { icon: string; title: string; description: string }[];
  packages: { name: string; price: string; features: string[]; recommended?: boolean }[];
  timeline: { step: string; title: string; description: string }[];
  highlights: string[];
  gallery: string[];
  testimonials: { name: string; role: string; content: string; avatar: string }[];
}

const eventData: Record<string, EventData> = {
  'mice': {
    title: 'MICE',
    fullName: 'Meetings, Incentives, Conferences & Exhibitions',
    tagline: 'Where Business Meets Excellence',
    hero: '/mice/mice2.jpeg',
    description: 'Transform your corporate events into memorable experiences with our world-class venues, seamless logistics, and professional event management services.',
    longDescription: 'From intimate board meetings to large-scale international conferences, we provide comprehensive MICE solutions that elevate your corporate events. Our expert team handles everything from venue selection and technical setup to catering and entertainment, ensuring your event runs flawlessly while you focus on your business objectives.',
    features: [
      { icon: '01', title: 'Premium Venues', description: 'State-of-the-art conference facilities with the latest technology and stunning Omani architecture' },
      { icon: '02', title: 'Event Planning', description: 'Dedicated event managers who handle every detail from concept to execution' },
      { icon: '03', title: 'Catering Excellence', description: 'International and local cuisine options with customizable menus for all dietary needs' },
      { icon: '04', title: 'Team Building', description: 'Unique activities that combine Omani culture with modern team-building concepts' },
    ],
    packages: [
      { name: 'Starter', price: '$2,500', features: ['Up to 50 attendees', 'Half-day venue', 'Basic AV equipment', 'Coffee breaks', 'Event coordinator'] },
      { name: 'Professional', price: '$5,000', features: ['Up to 150 attendees', 'Full-day venue', 'Premium AV & tech', 'Catered lunch', 'Team activities', 'Photography'], recommended: true },
      { name: 'Enterprise', price: 'Custom', features: ['Unlimited attendees', 'Multi-day events', 'Full production', 'VIP services', 'Entertainment', 'Brand customization'] },
    ],
    timeline: [
      { step: '01', title: 'Consultation', description: 'We discuss your objectives, audience, and vision for the event' },
      { step: '02', title: 'Planning', description: 'Our team creates a detailed plan with venue, schedule, and logistics' },
      { step: '03', title: 'Execution', description: 'Flawless event delivery with on-site support and coordination' },
      { step: '04', title: 'Follow-up', description: 'Post-event analysis and support for future engagements' },
    ],
    highlights: [
      'Hosted 500+ successful corporate events',
      'Award-winning event management team',
      'Partnerships with top Omani venues',
      '24/7 support during your event',
      'Custom branding and production services'
    ],
    gallery: [
      '/mice/mice2.jpeg',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
      'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80',
    ],
    testimonials: [
      { name: 'Sarah Johnson', role: 'Director, TechCorp', content: 'Outstanding service! Our annual conference was seamlessly executed. The team handled everything professionally.', avatar: 'https://i.pravatar.cc/150?img=1' },
      { name: 'Ahmed Al-Balushi', role: 'CEO, Oman Logistics', content: 'Best MICE partner in Oman. They understand both international standards and local culture perfectly.', avatar: 'https://i.pravatar.cc/150?img=13' },
    ],
  },
  'fit': {
    title: 'FIT',
    fullName: 'Free Independent Traveler',
    tagline: 'Your Journey, Your Way',
    hero: '/fit/SoloCamelRide.jpg',
    description: 'Explore Oman at your own pace with our personalized itineraries, flexible schedules, and tailored experiences designed just for you.',
    longDescription: 'Freedom meets expertise with our FIT services. Whether you\'re a solo adventurer or traveling with family, we craft bespoke journeys that reflect your interests and pace. From hidden gems to iconic landmarks, experience Oman your way with our expert guidance and full flexibility.',
    features: [
      { icon: '01', title: 'Custom Itineraries', description: 'Personalized day-by-day plans based on your interests, pace, and preferences' },
      { icon: '02', title: 'Private Transport', description: 'Comfortable vehicles with professional drivers who know the best routes' },
      { icon: '03', title: 'Personal Guide', description: 'Expert local guides available on-demand to enrich your experience' },
      { icon: '04', title: 'Total Flexibility', description: 'Change plans on the fly - your schedule, your rules' },
    ],
    packages: [
      { name: 'Explorer', price: '$150/day', features: ['Solo or couple', 'Private transport', 'Flexible itinerary', 'Hotel bookings', 'Basic guidance'] },
      { name: 'Adventurer', price: '$250/day', features: ['Up to 4 people', 'Private guide', 'Premium transport', 'Handpicked stays', 'Activity bookings', 'Local experiences'], recommended: true },
      { name: 'Luxury', price: 'Custom', features: ['Any group size', 'Concierge service', 'Luxury vehicles', '5-star accommodations', 'VIP access', 'Fine dining'] },
    ],
    timeline: [
      { step: '01', title: 'Discovery', description: 'Tell us about your travel style, interests, and dream Oman experiences' },
      { step: '02', title: 'Customization', description: 'We design a unique itinerary with flexibility built in' },
      { step: '03', title: 'Adventure', description: 'Travel at your pace with our support available 24/7' },
      { step: '04', title: 'Memories', description: 'Return home with unforgettable stories and experiences' },
    ],
    highlights: [
      'Completely personalized travel experiences',
      'Access to exclusive locations',
      'Flexible booking and cancellation',
      'Local insights from expert guides',
      '24/7 concierge support'
    ],
    gallery: [
      '/fit/Solo.jpg',
      '/fit/SoloCamelRide.jpg',
      '/fit/SoloCampfire.jpg',
      '/fit/SoloCooking.jpg',
    ],
    testimonials: [
      { name: 'Emma Williams', role: 'Travel Blogger', content: 'The flexibility was amazing! Changed my plans multiple times and they adapted seamlessly. Discovered places I never would have found alone.', avatar: 'https://i.pravatar.cc/150?img=5' },
      { name: 'Marco Rodriguez', role: 'Photographer', content: 'Perfect for my photography needs. They took me to stunning locations at the best times of day. True professionals.', avatar: 'https://i.pravatar.cc/150?img=12' },
    ],
  },
  'group': {
    title: 'GROUP',
    fullName: 'Group Tours & Travel',
    tagline: 'Share the Adventure',
    hero: '/group/GroupCampfire.jpg',
    description: 'Join fellow adventurers on curated group journeys that blend camaraderie, culture, and unforgettable moments across Oman.',
    longDescription: 'Experience the joy of shared discovery with our expertly guided group tours. Meet like-minded travelers, share incredible moments, and enjoy the benefits of group travel while exploring Oman\'s treasures. Our small group sizes ensure personal attention and authentic connections.',
    features: [
      { icon: '01', title: 'Small Groups', description: 'Maximum 12 travelers for intimate experiences and personal connections' },
      { icon: '02', title: 'Expert Leaders', description: 'Professional tour leaders with deep knowledge of Omani culture and history' },
      { icon: '03', title: 'All-Inclusive', description: 'Accommodations, meals, transport, and activities included in one price' },
      { icon: '04', title: 'Social Experience', description: 'Connect with fellow travelers and create lifelong friendships' },
    ],
    packages: [
      { name: 'Weekend Explorer', price: '$800', features: ['3 days / 2 nights', '8-12 travelers', 'Twin-share hotels', 'All meals included', 'Transport & guide'] },
      { name: 'Week Adventure', price: '$2,200', features: ['7 days / 6 nights', '6-10 travelers', 'Premium hotels', 'All meals & drinks', 'Activities included', 'Airport transfers'], recommended: true },
      { name: 'Grand Tour', price: '$4,500', features: ['14 days / 13 nights', '4-8 travelers', 'Luxury stays', 'Gourmet dining', 'Premium activities', 'VIP experiences'] },
    ],
    timeline: [
      { step: '01', title: 'Choose Tour', description: 'Select from our curated group departures throughout the year' },
      { step: '02', title: 'Book & Prepare', description: 'Secure your spot and receive detailed pre-trip information' },
      { step: '03', title: 'Travel Together', description: 'Meet your group and embark on an unforgettable journey' },
      { step: '04', title: 'Stay Connected', description: 'Join our alumni community and plan reunion trips' },
    ],
    highlights: [
      'Carefully curated itineraries',
      'Small group sizes for better experience',
      'Solo traveler friendly',
      'All-inclusive pricing',
      'Expert local guides'
    ],
    gallery: [
      '/group/GroupCamel.jpg',
      '/group/GroupCampfire.jpg',
      '/group/GroupCar.jpg',
      '/group/GroupLunch.jpg',
    ],
    testimonials: [
      { name: 'Lisa Chen', role: 'Teacher, Solo Traveler', content: 'As a solo traveler, I felt welcomed and safe. Made amazing friends and the itinerary was perfect!', avatar: 'https://i.pravatar.cc/150?img=9' },
      { name: 'David & Martha Klein', role: 'Retired Couple', content: 'Best group tour we\'ve ever done! Small size meant we got to know everyone. The guide was exceptional.', avatar: 'https://i.pravatar.cc/150?img=8' },
    ],
  },
  'wedding': {
    title: 'WEDDING',
    fullName: 'Destination Weddings',
    tagline: 'Say "I Do" in Paradise',
    hero: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80',
    description: 'Celebrate your special day in paradise with stunning venues, exquisite planning, and magical moments that last a lifetime.',
    longDescription: 'Your dream wedding awaits in Oman. From intimate beach ceremonies to grand desert celebrations, we orchestrate every detail of your perfect day. Our experienced wedding planners work with you to create a celebration that reflects your love story against Oman\'s breathtaking backdrops.',
    features: [
      { icon: '01', title: 'Stunning Venues', description: 'Beachfront, desert, mountain, and luxury hotel venues across Oman' },
      { icon: '02', title: 'Full Planning', description: 'Complete wedding coordination from engagement to honeymoon' },
      { icon: '03', title: 'Cultural Fusion', description: 'Blend your traditions with Omani hospitality and charm' },
      { icon: '04', title: 'Photography', description: 'Professional photographers capturing every precious moment' },
    ],
    packages: [
      { name: 'Intimate', price: '$8,000', features: ['Up to 30 guests', 'Boutique venue', 'Basic décor', 'Catering', 'Photography', 'Legal support'] },
      { name: 'Celebration', price: '$18,000', features: ['Up to 100 guests', 'Premium venue', 'Full decoration', 'Gourmet catering', 'Photo & video', 'Entertainment', 'Guest coordination'], recommended: true },
      { name: 'Luxury', price: 'Custom', features: ['Unlimited guests', 'Exclusive venues', 'Designer décor', 'Michelin-style dining', 'Celebrity entertainment', 'Multi-day events', 'Concierge services'] },
    ],
    timeline: [
      { step: '01', title: 'Vision', description: 'Share your dream wedding - we listen to every detail' },
      { step: '02', title: 'Design', description: 'We create a comprehensive plan with mood boards and timelines' },
      { step: '03', title: 'Coordination', description: 'Handle all vendors, guests, and logistics leading up to the day' },
      { step: '04', title: 'Celebration', description: 'Relax and enjoy your perfect day while we manage everything' },
    ],
    highlights: [
      'Over 200 weddings successfully planned',
      'Access to Oman\'s most exclusive venues',
      'Partnerships with top vendors',
      'Legal and visa assistance',
      'Honeymoon planning included'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
    ],
    testimonials: [
      { name: 'Sophia & James', role: 'Newlyweds', content: 'Our wedding was absolutely magical! Every detail was perfect. Our guests are still talking about it months later.', avatar: 'https://i.pravatar.cc/150?img=10' },
      { name: 'Layla & Omar', role: 'Married in Muscat', content: 'They beautifully blended our two cultures. The planning was stress-free and the day exceeded our wildest dreams.', avatar: 'https://i.pravatar.cc/150?img=20' },
    ],
  },
};

/* ── Animated section wrapper ── */
const AnimatedSection: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = '', delay = 0 }) => {
  const [ref, entry] = useIntersectionObserver({ threshold: 0.1, freezeOnceVisible: true });
  const visible = entry?.isIntersecting ?? false;
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const EventDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const event = slug ? eventData[slug] : null;
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null || !event) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => i !== null ? (i === 0 ? event.gallery.length - 1 : i - 1) : null);
      if (e.key === 'ArrowRight') setLightboxIndex((i) => i !== null ? (i === event.gallery.length - 1 ? 0 : i + 1) : null);
    };

    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, event]);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-dark to-black">
        <div className="text-center px-6">
          <h1 className="font-display text-6xl font-black text-white mb-6">404</h1>
          <p className="text-white/60 text-xl mb-8">Event not found</p>
          <Link to="/" className="px-8 py-4 bg-[#e3261d] text-white font-bold rounded-full hover:bg-[#c01f18] transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white overflow-hidden">

      {/* ══════════════════════════════
          IMMERSIVE SPLIT-SCREEN HERO
      ══════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute border-l border-white/20"
              style={{
                left: `${i * 5}%`,
                top: 0,
                bottom: 0,
                transform: `translateY(${Math.sin(scrollY * 0.001 + i) * 10}px)`
              }}
            />
          ))}
        </div>

        {/* Hero Image with Parallax */}
        <div
          className="absolute inset-0"
          style={{
            transform: `scale(${1 + scrollY * 0.0003}) translateY(${scrollY * 0.5}px)`,
            willChange: 'transform'
          }}
        >
          <img
            src={event.hero}
            alt={event.fullName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        {/* Floating Orbs */}
        <div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#e3261d]/20 blur-3xl"
          style={{
            transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
          <div className="max-w-4xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-3 text-white/40 text-sm mb-10">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link to="/services" className="hover:text-white transition-colors">Services</Link>
              <span>/</span>
              <span className="text-[#e3261d]">{event.title}</span>
            </nav>

            {/* Floating Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-8">
              <div className="w-2 h-2 rounded-full bg-[#e3261d] animate-pulse" />
              <span className="text-white text-xs font-black tracking-[0.3em] uppercase">{event.title}</span>
            </div>

            {/* Main Heading with Stagger Animation */}
            <h1 className="font-display font-black text-white leading-[0.88] mb-6 overflow-hidden">
              {event.fullName.split(' ').map((word, idx) => (
                <span
                  key={idx}
                  className="inline-block mr-4 mb-2"
                  style={{
                    fontSize: 'clamp(3rem, 8vw, 7rem)',
                    animation: `slideInUp 0.8s ease-out ${idx * 0.1}s both`
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>

            {/* Tagline */}
            <p className="text-[#e3261d] text-3xl font-light italic mb-8">
              {event.tagline}
            </p>

            {/* Description */}
            <p className="text-white/70 text-xl leading-relaxed max-w-2xl mb-12">
              {event.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="group relative px-10 py-4 bg-[#e3261d] rounded-full font-bold text-white overflow-hidden transition-transform hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Book Now
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#c01f18] to-[#e3261d] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
          <span className="text-white/40 text-xs tracking-wider uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* ══════════════════════════════
          INTERACTIVE FEATURES GRID
      ══════════════════════════════ */}
      <section className="py-32 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #FF6B35 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#e3261d]/10 border border-[#e3261d]/20 mb-6">
              <span className="text-[#e3261d] text-xs font-black tracking-[0.3em] uppercase">Features</span>
            </div>
            <h2 className="font-display text-6xl md:text-7xl font-black text-primary-dark mb-6">
              What We
              <span className="block italic font-light text-neutral-400">Deliver</span>
            </h2>
          </AnimatedSection>

          {/* Features Bento Grid */}
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {event.features.map((feature, idx) => (
              <AnimatedSection key={idx} delay={idx * 100}>
                <div className="group relative h-full">
                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#e3261d] to-[#c01f18] rounded-3xl opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500" />

                  {/* Card */}
                  <div className="relative h-full bg-white rounded-3xl p-10 border-2 border-neutral-100 hover:border-[#e3261d]/30 transition-all duration-500 overflow-hidden">
                    {/* Animated Background Number */}
                    <span
                      className="absolute -right-4 -top-4 font-black text-neutral-50 group-hover:text-[#e3261d]/10 transition-colors duration-500 select-none"
                      style={{ fontSize: '12rem', lineHeight: 1 }}
                    >
                      {feature.icon}
                    </span>

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#e3261d] to-[#c01f18] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                        <span className="text-white font-black text-2xl">{feature.icon}</span>
                      </div>

                      <h3 className="font-display text-3xl font-black text-primary-dark mb-4">
                        {feature.title}
                      </h3>

                      <p className="text-neutral-600 text-lg leading-relaxed">
                        {feature.description}
                      </p>

                      {/* Animated Line */}
                      <div className="mt-6 h-1 w-0 bg-gradient-to-r from-[#e3261d] to-[#c01f18] group-hover:w-24 transition-all duration-700 rounded-full" />
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          DIAGONAL FLOW TIMELINE
      ══════════════════════════════ */}
      <section className="py-32 bg-gradient-to-br from-primary-dark via-neutral-900 to-black relative overflow-hidden">
        {/* Animated Particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#e3261d]/30"
            style={{
              top: `${(i * 137) % 100}%`,
              left: `${(i * 73) % 100}%`,
              animation: `float ${5 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}

        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="text-[#e3261d] text-xs font-black tracking-[0.3em] uppercase">Process</span>
            </div>
            <h2 className="font-display text-6xl md:text-7xl font-black text-white mb-6">
              How It
              <span className="block italic font-light text-white/40">Works</span>
            </h2>
          </AnimatedSection>

          {/* Timeline Steps */}
          <div className="max-w-4xl mx-auto space-y-16">
            {event.timeline.map((step, idx) => (
              <AnimatedSection key={idx} delay={idx * 150}>
                <div className="flex items-start gap-8">
                  {/* Animated Circle */}
                  <div className="relative flex-shrink-0">
                    {/* Pulsing Rings */}
                    <div className="absolute inset-0 w-20 h-20 rounded-full bg-[#e3261d]/20 animate-ping" />
                    <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-[#e3261d]/30" />

                    {/* Main Circle */}
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#e3261d] to-[#c01f18] flex items-center justify-center shadow-2xl shadow-[#e3261d]/50">
                      <span className="font-black text-white text-2xl">{step.step}</span>
                    </div>

                    {/* Connection Line */}
                    {idx < event.timeline.length - 1 && (
                      <div className="absolute top-20 left-10 w-px h-16 bg-gradient-to-b from-[#e3261d]/50 to-transparent" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <h3 className="font-display text-4xl font-black text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
                      {step.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          GALLERY LIGHTBOX
      ══════════════════════════════ */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#e3261d]/10 border border-[#e3261d]/20 mb-6">
              <span className="text-[#e3261d] text-xs font-black tracking-[0.3em] uppercase">Gallery</span>
            </div>
            <h2 className="font-display text-6xl md:text-7xl font-black text-primary-dark mb-6">
              Our Work
            </h2>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 text-[#e3261d] hover:text-[#c01f18] font-bold text-lg transition-colors duration-300"
            >
              View Full Gallery
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </AnimatedSection>

          {/* Gallery Grid */}
          <AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {event.gallery.map((image, idx) => (
                <div
                  key={idx}
                  className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
                  onClick={() => setLightboxIndex(idx)}
                >
                  <img
                    src={image}
                    alt={`Gallery ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Zoom Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl border-2 border-white/40 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════
          TESTIMONIALS
      ══════════════════════════════ */}
      <section className="py-32 bg-gradient-to-br from-primary-dark via-neutral-900 to-black">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="text-[#e3261d] text-xs font-black tracking-[0.3em] uppercase">Testimonials</span>
            </div>
            <h2 className="font-display text-6xl md:text-7xl font-black text-white mb-6">
              Client
              <span className="block italic font-light text-white/40">Stories</span>
            </h2>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {event.testimonials.map((testimonial, idx) => (
              <AnimatedSection key={idx} delay={idx * 150}>
                <div className="group relative h-full">
                  {/* Glow */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#e3261d] to-[#c01f18] rounded-3xl opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500" />

                  {/* Card */}
                  <div className="relative h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 hover:bg-white/10 transition-all duration-500">
                    {/* Quote Icon */}
                    <svg className="w-16 h-16 text-[#e3261d]/30 mb-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>

                    {/* Content */}
                    <p className="text-white text-xl leading-relaxed mb-8 italic">
                      "{testimonial.content}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-[#e3261d]"
                      />
                      <div>
                        <p className="font-bold text-white text-lg">{testimonial.name}</p>
                        <p className="text-white/50">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          CTA SECTION
      ══════════════════════════════ */}
<section className="relative py-40 overflow-hidden bg-primary-dark">
  {/* Subtle Gradient Background (same style as CTASection) */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        transform: `translateY(${scrollY * 0.1}px)`
      }}
    />
  </div>

  {/* Floating Shapes */}
  <div
    className="absolute top-20 right-20 w-32 h-32 border-4 border-white/20 rounded-2xl"
    style={{
      transform: `rotate(${scrollY * 0.05}deg) translateY(${scrollY * 0.2}px)`
    }}
  />
  <div
    className="absolute bottom-20 left-20 w-24 h-24 border-4 border-white/20 rounded-full"
    style={{
      transform: `translateY(${-scrollY * 0.15}px)`
    }}
  />

  <div className="container mx-auto px-6 relative z-10">
    <AnimatedSection className="text-center">
      
      {/* Heading */}
      <h2 className="font-display text-6xl md:text-8xl font-black leading-tight mb-8 text-white">
        Ready to Begin?
      </h2>

      {/* Description */}
      <p className="text-2xl text-white/60 max-w-2xl mx-auto mb-12">
        Let's create an unforgettable {event.title} experience together
      </p>

      {/* Button */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/contact"
          className="group inline-flex items-center justify-center
          bg-[#e3261d] text-white font-bold
          px-12 py-5 rounded-full
          hover:bg-[#c01f18]
          transition-all duration-300
          shadow-lg shadow-[#e3261d]/20
          hover:scale-105 text-lg"
        >
          Get Started
        </Link>
      </div>

    </AnimatedSection>
  </div>
</section>

      {/* ══════════════════════════════
          LIGHTBOX MODAL
      ══════════════════════════════ */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => i !== null ? (i === 0 ? event.gallery.length - 1 : i - 1) : null); }}
            className="absolute left-6 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => i !== null ? (i === event.gallery.length - 1 ? 0 : i + 1) : null); }}
            className="absolute right-6 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image */}
          <img
            src={event.gallery[lightboxIndex]}
            alt={`Gallery ${lightboxIndex + 1}`}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>

    </div>
  );
};

export default EventDetail;
