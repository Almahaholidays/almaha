import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface Experience {
  title: string;
  description: string;
  image: string;
}

interface DestinationData {
  title: string;
  tag: string;
  region: string;
  bestSeason: string;
  distanceFromMuscat: string;
  toursCount: string;
  heroImage: string;
  tagline: string;
  about: string;
  highlights: { title: string; detail: string }[];
  experiences: Experience[];
  gallery: string[];
}

/* ─────────────────────────────────────────────
   Destination data
───────────────────────────────────────────── */
const destinations: Record<string, DestinationData> = {
  muscat: {
    title: 'Muscat',
    tag: 'City Life',
    region: 'Muscat Governorate',
    bestSeason: 'Oct – Apr',
    distanceFromMuscat: 'Capital City',
    toursCount: '40+',
    heroImage: 'https://images.unsplash.com/photo-1601890976279-0b4ff3233938?w=1920&q=80',
    tagline: 'Where ancient Arabia meets the modern world along a glittering coastline.',
    about:
      'Muscat is one of the most captivating capitals in the Arab world — a city that balances grandeur and intimacy. Nestled between the rugged Hajar Mountains and the turquoise waters of the Gulf of Oman, it offers a seamless fusion of heritage and contemporary life. From the gilded domes of the Sultan Qaboos Grand Mosque to the labyrinthine alleys of Mutrah Souq, every corner tells a story centuries in the making.',
    highlights: [
      { title: 'Sultan Qaboos Grand Mosque', detail: 'One of the largest mosques in the world, a masterpiece of Islamic architecture' },
      { title: 'Mutrah Souq', detail: 'A centuries-old market brimming with frankincense, silver jewellery, and textiles' },
      { title: 'Royal Opera House', detail: 'The Gulf\'s premier performing arts venue set in a stunning Moorish complex' },
      { title: 'Muscat Corniche', detail: 'A sweeping seafront promenade framing the dramatic Al Hajar mountain backdrop' },
    ],
    experiences: [
      {
        title: 'Old Muscat & Mutrah Heritage Walk',
        description: 'Wander through the ancient lanes of Old Muscat, past the whitewashed Al Alam Palace and centuries-old Portuguese forts before descending into the aromatic maze of Mutrah Souq. A living museum where traders still exchange frankincense resin by weight.',
        image: '/destinations/Muscat5.webp',
      },
      {
        title: 'Royal Opera House Evening',
        description: 'An architectural jewel of the Gulf, the Royal Opera House hosts world-class performances in an exquisitely crafted Moorish setting. Arrive early to stroll the manicured gardens and take in the illuminated facade before the curtain rises.',
        image: '/destinations/Muscat3.jpeg',
      },
      {
        title: 'Coastal Sunset Cruise',
        description: 'Board a traditional dhow and sail along Muscat\'s dramatic coastline as the sun descends behind the mountains. Dolphins frequently escort the vessel while the city\'s white skyline glows gold — one of Oman\'s most unforgettable moments.',
        image: '/destinations/Muscat6.jpg',
      },
    ],
    gallery: [
      '/destinations/Muscat1.jpeg',
      '/destinations/Muscat2.jpeg',
      '/destinations/Muscat3.jpeg',
      '/destinations/Muscat4.jpeg',
    ],
  },

  'wahiba-sands': {
    title: 'Wahiba Sands',
    tag: 'Desert Adventure',
    region: 'Al Sharqiyah',
    bestSeason: 'Nov – Mar',
    distanceFromMuscat: '~180 km',
    toursCount: '25+',
    heroImage: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=1920&q=80',
    tagline: 'An ocean of golden dunes stretching to the horizon beneath a sky of a thousand stars.',
    about:
      'The Wahiba Sands — known locally as Ramlat Al Wahiba — is one of Oman\'s most extraordinary natural landscapes. Rolling dunes rise up to 100 metres, shifting their colours from copper at dawn to deep amber at dusk. This is not a barren wasteland; Bedouin tribes have called it home for millennia, and their warm hospitality and ancient knowledge of the desert remain very much alive. Here, silence is not empty — it is profound.',
    highlights: [
      { title: 'Dune Bashing', detail: 'Exhilarating 4x4 rides over the tallest dunes with expert drivers' },
      { title: 'Bedouin Camp Nights', detail: 'Sleep beneath a canopy of stars in authentic desert camps' },
      { title: 'Camel Trekking', detail: 'Slow, meditative journeys through corridors of golden sand' },
      { title: 'Sunrise Dune Walk', detail: 'Climb the ridge as first light paints the desert in rose and gold' },
    ],
    experiences: [
      {
        title: 'Dune Bashing & Sunset Drive',
        description: 'Strap in as a skilled local driver navigates the dramatic crests and valleys of the Wahiba dunes in a powerful 4x4. The heart-stopping descents and sweeping ridge drives culminate at a high dune point just in time for sunset — nature\'s most spectacular show in the Arabian desert.',
        image: '/destinations/wahiba5.jpeg',
      },
      {
        title: 'Authentic Bedouin Camp Experience',
        description: 'Spend a night in a traditional Bedouin-style camp deep within the sands. Share slow-brewed Omani coffee and dates, listen to desert stories, enjoy a stargazing session with minimal light pollution, and drift to sleep with the sound of nothing but wind over dunes.',
        image: '/destinations/wahiba3.jpeg',
      },
      {
        title: 'Camel Trek at Dawn',
        description: 'The oldest form of desert travel remains the most soulful. At first light, mount a camel and sway gently through the cool morning sands as the sun climbs and the world slowly warms around you. This is the Wahiba Sands at its most timeless.',
        image: '/destinations/wahiba2.jpeg',
      },
    ],
    gallery: [
      '/destinations/wahiba2.jpeg',
      '/destinations/wahiba1.jpeg',
      '/destinations/wahiba3.jpeg',
      '/destinations/wahiba4.jpeg',
    ],
  },

  nizwa: {
    title: 'Nizwa',
    tag: 'Heritage',
    region: 'Ad Dakhiliyah',
    bestSeason: 'Oct – Mar',
    distanceFromMuscat: '~165 km',
    toursCount: '18+',
    heroImage: '/destinations/Nizwa2.jpeg',
    tagline: 'The ancient cultural heartland of Oman — where forts, souqs, and traditions endure.',
    about:
      'Nizwa served as the capital of Oman for centuries and remains the country\'s cultural soul. Dominated by its monumental 17th-century round fort — the largest in Oman — the city sits in a fertile valley surrounded by date palms and mountain ranges. The Friday livestock market, where goats and cattle are traded exactly as they were a thousand years ago, is one of the most visceral and authentic experiences in the entire Arabian Peninsula.',
    highlights: [
      { title: 'Nizwa Fort', detail: 'The most visited heritage site in Oman — a colossal round tower with panoramic views' },
      { title: 'Friday Goat Market', detail: 'One of the oldest and most authentic livestock markets in Arabia' },
      { title: 'Al Hamra & Misfat', detail: 'Beautifully preserved mud-brick villages clinging to the mountain edge' },
      { title: 'Silver & Khanjar Souq', detail: 'Intricate Omani silverwork and the iconic ceremonial dagger' },
    ],
    experiences: [
      {
        title: 'Nizwa Fort & Old Souq Immersion',
        description: 'Climb the massive cylindrical tower of Nizwa Fort for sweeping views over the palm groves and city, then descend into the adjacent souq — one of Oman\'s most evocative markets — where the smell of frankincense mingles with silver, spices, and traditional Omani textiles.',
        image: '/destinations/Nizwa2.jpeg',
      },
      {
        title: 'Friday Goat Market at Dawn',
        description: 'Arrive early to witness one of Arabia\'s oldest rituals: a livestock auction conducted entirely in the traditional way, with men in dishdashas haggling over goats and cattle as the morning mist lifts over the date palms. A photographer\'s dream and a historian\'s delight.',
        image: '/destinations/nizwa5.webp',
      },
      {
        title: 'Al Hamra & Misfat Village Walk',
        description: 'Explore the abandoned multi-storey mud-brick architecture of Al Hamra — frozen in time for over four centuries — before continuing to Misfat Al Abriyeen, a living village where cool falaj irrigation channels flow through terraced gardens of bananas, figs, and pomegranates.',
        image: '/destinations/nizwa6.jpg',
      },
    ],
    gallery: [
      '/destinations/Nizwa1.jpeg',
      '/destinations/Nizwa2.jpeg',
      '/destinations/Nizwa3.jpeg',
      '/destinations/Nizwa4.jpeg',
    ],
  },

  salalah: {
    title: 'Salalah',
    tag: 'Coastal Beauty',
    region: 'Dhofar',
    bestSeason: 'Jun – Sep (Khareef)',
    distanceFromMuscat: '~1,000 km',
    toursCount: '22+',
    heroImage: 'https://cdn.pixabay.com/photo/2020/07/06/13/33/wadi-5377073_1280.jpg',
    tagline: 'Arabia\'s tropical secret — where monsoon mists turn the desert lush and green each summer.',
    about:
      'Salalah is unlike anywhere else in Arabia. Each summer, the Khareef monsoon rolls in from the Indian Ocean, transforming the Dhofar region into a landscape of extraordinary green: cascading waterfalls, mist-draped plateaux, and frankincense trees glistening with moisture. Outside the monsoon, Salalah reveals pristine white-sand beaches, ancient incense trading ports, and a distinct Dhofari culture that sets it apart from the rest of Oman.',
    highlights: [
      { title: 'Khareef Waterfalls', detail: 'Seasonal waterfalls tumbling from the green Dhofar escarpment' },
      { title: 'Land of Frankincense', detail: 'UNESCO World Heritage site — ancient incense trade routes' },
      { title: 'Al Mughsail Blowholes', detail: 'Dramatic coastal geology where the sea erupts through rock vents' },
      { title: 'White Sand Beaches', detail: 'Pristine, uncrowded stretches of Arabian Sea coastline' },
    ],
    experiences: [
      {
        title: 'Khareef Waterfall & Green Mountain Drive',
        description: 'During the monsoon months of June to September, the Dhofar escarpment becomes a different world entirely. Drive through cloud forests, stop at Ayn Khor and Darbat waterfalls, and witness the extraordinary spectacle of Arabia in full tropical bloom — a phenomenon found nowhere else in the region.',
        image: '/destinations/Salalah1.jpeg',
      },
      {
        title: 'Frankincense Trail & Ancient Ports',
        description: 'Follow the UNESCO-listed frankincense trail through the ancient ports of Sumhuram and Khor Rori — once among the wealthiest trading cities on earth. The air here still carries the scent of the same resin that was worth more than gold in antiquity, harvested from wild Boswellia trees on the surrounding hills.',
        image: '/destinations/Salalah3.jpeg',
      },
      {
        title: 'Al Mughsail Beach & Blowholes',
        description: 'A dramatic stretch of undeveloped coastline where limestone arches and sea caves punctuate a long white beach. Walk the headland path above the blowholes and feel the earth shudder as waves drive columns of spray skyward — one of Oman\'s most visceral natural spectacles.',
        image: '/destinations/Salalah5.jpg',
      },
    ],
    gallery: [
      '/destinations/Salalah1.jpeg',
      '/destinations/Salalah2.jpeg',
      '/destinations/Salalah3.jpeg',
      '/destinations/Salalah4.jpeg',
    ],
  },

  'jebel-akhdar': {
    title: 'Jebel Akhdar',
    tag: 'Mountains',
    region: 'Ad Dakhiliyah',
    bestSeason: 'Mar – Nov',
    distanceFromMuscat: '~150 km',
    toursCount: '15+',
    heroImage: '/destinations/Jebelakhdar.jpeg',
    tagline: 'The "Green Mountain" — rose gardens, ancient terraces, and cool air 2,000 metres above Oman.',
    about:
      'Jebel Akhdar — Arabic for "Green Mountain" — rises dramatically to over 2,000 metres on the Al Hajar range and offers a climate and landscape utterly unlike the Omani lowlands below. Ancient terraced villages cling to vertiginous cliffs, their falaj irrigation systems distributing mountain spring water to gardens of damask roses, pomegranates, apricots, and walnuts. The rose harvest each spring produces the prized Omani rose water that has graced tables and temples for centuries.',
    highlights: [
      { title: 'Damask Rose Terraces', detail: 'Ancient terraced gardens famous for Oman\'s celebrated rose water' },
      { title: 'Wadi Bani Habib', detail: 'A ghostly abandoned village perched on the edge of a dramatic precipice' },
      { title: 'Jebel Shams Viewpoint', detail: 'Oman\'s "Grand Canyon" — a gorge over 1,000 metres deep' },
      { title: 'Balcony Walk', detail: 'A legendary cliff-edge trail above the vast Wadi Ghul canyon' },
    ],
    experiences: [
      {
        title: 'Rose Harvest & Village Life',
        description: 'Each spring (March to May), the terraced villages of Ash Sharayjah and Al Ayn fill with the scent of damask roses harvested at dawn before the heat destroys the petals. Walk the ancient stone terraces with local farmers and learn how rose water — Oman\'s most prized export — has been distilled by hand for over a thousand years.',
        image: '/destinations/Jebelakhdar4.jpg',
      },
      {
        title: 'Wadi Bani Habib Village Exploration',
        description: 'Pick your way through the haunting abandoned ruins of Wadi Bani Habib — a once-thriving village of multi-storey stone houses now standing empty on a clifftop ledge. A few families have returned, making it a rare encounter between past and present, ruin and renewal.',
        image: '/destinations/Jebelakhdar3.jpeg',
      },
      {
        title: 'Jebel Shams Balcony Walk',
        description: 'The Balcony Walk is one of Oman\'s most celebrated hikes — a path that winds along the sheer rim of Wadi Ghul with views plunging over a kilometre to the canyon floor. The scale is staggering, the light extraordinary, and the silence of the high mountain complete.',
        image: '/destinations/Jebelakhdar2.jpeg',
      },
    ],
    gallery: [
      '/destinations/Jebelakhdar.jpeg',
      '/destinations/Jebelakhdar1.jpeg',
      '/destinations/Jebelakhdar2.jpeg',
      '/destinations/Jebelakhdar3.jpeg',
    ],
  },

  sur: {
    title: 'Sur',
    tag: 'Coastal Heritage',
    region: 'Al Sharqiyah',
    bestSeason: 'Oct – Apr',
    distanceFromMuscat: '~200 km',
    toursCount: '12+',
    heroImage: 'https://cdn.pixabay.com/photo/2021/01/30/12/30/oman-5963720_1280.jpg',
    tagline: 'A proud maritime city where ancient dhow builders and nesting sea turtles share the same shore.',
    about:
      'Sur has sailed to the edges of the known world and back. For centuries, its master shipbuilders constructed the great wooden dhows that connected Oman to East Africa, India, and Persia — and they still do today. The dhow building yard on the creek remains one of the last active traditional shipyards on earth. But Sur\'s other marvel lies just south at Ras Al Jinz: one of the largest green turtle nesting grounds in the Indian Ocean, where hundreds of ancient creatures emerge from the sea each night under protective darkness.',
    highlights: [
      { title: 'Dhow Building Yard', detail: 'Watch craftsmen construct wooden dhows using techniques unchanged for centuries' },
      { title: 'Ras Al Jinz Turtle Reserve', detail: 'Witness green sea turtles nesting — one of the world\'s great natural events' },
      { title: 'Sur Lagoon', detail: 'A serene tidal lagoon with flamingos, herons, and traditional fishing boats' },
      { title: 'Blue Lagoon', detail: 'Translucent turquoise waters perfect for snorkelling and swimming' },
    ],
    experiences: [
      {
        title: 'Traditional Dhow Yard Visit',
        description: 'Step into a living piece of history at Sur\'s active dhow building yard, where master craftsmen shape vast planks of teak by hand using traditional adzes, caulking mallets, and centuries of inherited knowledge. The vessels they build — some over 30 metres in length — are still commissioned by Gulf navies and collectors worldwide.',
        image: '/destinations/sur5.webp',
      },
      {
        title: 'Ras Al Jinz Turtle Nesting Night',
        description: 'In the dark hours before and after midnight, green sea turtles weighing up to 200kg haul themselves from the sea to excavate nests in the sand. Guided by reserve rangers in total darkness, you stand metres away from a creature that has made this journey for 100 million years — a privilege beyond words.',
        image: '/destinations/sur6.jpg',
      },
      {
        title: 'Sur Lagoon & Blue Lagoon Kayak',
        description: 'Paddle across the glassy surface of Sur\'s tidal lagoon at dawn, where flamingos wade in the shallows and traditional wooden boats lie at anchor. Continue by road to the Blue Lagoon — a hidden inlet of extraordinarily clear turquoise water where the sea floor is visible at ten metres depth.',
        image: '/destinations/sur7.jpg',
      },
    ],
    gallery: [
      '/destinations/sur1.jpeg',
      '/destinations/sur2.jpeg',
      '/destinations/sur3.jpeg',
      '/destinations/sur4.jpeg',
    ],
  },
};

/* ─────────────────────────────────────────────
   Shared Components
───────────────────────────────────────────── */
const AnimatedSection: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = '', onClick }) => {
  const [ref, entry] = useIntersectionObserver({ threshold: 0.1, freezeOnceVisible: true });
  const visible = entry?.isIntersecting ?? false;
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const EyebrowLabel: React.FC<{ children: React.ReactNode; light?: boolean }> = ({ children, light }) => (
  <span className={`inline-flex items-center gap-2 text-xs font-bold tracking-[0.3em] uppercase mb-4 ${light ? 'text-[#e3261d]/80' : 'text-[#e3261d]'}`}>
    <span className="w-6 h-px bg-current" />
    {children}
  </span>
);

const Arrow: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

/* ─────────────────────────────────────────────
   Section: Hero (KEPT AS IS)
───────────────────────────────────────────── */
const HeroSection: React.FC<{ dest: DestinationData }> = ({ dest }) => (
  <section className="relative h-screen overflow-hidden">
    {/* Background image */}
    <div
      className="absolute inset-0 bg-cover bg-center scale-105"
      style={{ backgroundImage: `url('${dest.heroImage}')` }}
    />
    {/* Overlays */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/25" />
    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

    {/* Breadcrumb */}
    <div className="absolute top-28 left-6 lg:left-12 z-10">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-white/45 text-[10px] font-bold tracking-[0.3em] uppercase hover:text-white/80 transition-colors duration-300"
      >
        <svg className="w-3 h-3 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
        Back to Destinations
      </Link>
    </div>

    {/* Content */}
    <div className="relative h-full flex items-end z-10">
      <div className="container mx-auto px-6 lg:px-12 pb-20 md:pb-28">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-6 animate-slide-up opacity-0">
            <div className="w-8 h-px bg-[#e3261d]/60" />
            <span className="text-[10px] font-bold tracking-[0.4em] text-[#e3261d] uppercase">
              {dest.tag}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-7xl md:text-8xl lg:text-[9rem] font-bold text-white leading-[0.9] mb-6 animate-slide-up opacity-0">
            {dest.title}
          </h1>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-xl mb-10 animate-fade-up opacity-0">
            {dest.tagline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-delayed opacity-0">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 bg-[#e3261d] text-white text-sm font-semibold px-8 py-4 rounded-full hover:bg-opacity-90 transition-all duration-300 shadow-[0_8px_30px_rgba(227,38,29,0.4)] hover:shadow-[0_12px_40px_rgba(227,38,29,0.55)] w-fit"
            >
              Plan Your Visit
              <Arrow className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-3 border border-white/30 bg-white/8 backdrop-blur-sm text-white text-sm font-semibold px-8 py-4 rounded-full hover:bg-white/15 hover:border-white/50 transition-all duration-300 w-fit"
            >
              Explore Experiences
            </Link>
          </div>
        </div>
      </div>
    </div>

    {/* Scroll indicator */}
    <div className="absolute bottom-10 right-10 z-10 flex flex-col items-center gap-2 animate-bounce">
      <span className="text-white/35 text-[9px] tracking-[0.3em] uppercase font-medium">Scroll</span>
      <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </section>
);


const AboutSection: React.FC<{ dest: DestinationData }> = ({ dest }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative py-32 bg-gradient-to-b from-white via-neutral-50 to-white overflow-hidden">
      {/* Floating decorative elements */}
      <div
        className="absolute top-20 right-10 w-96 h-96 rounded-full bg-[#e3261d]/5 blur-3xl"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      />
      <div
        className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-[#e3261d]/5 blur-3xl"
        style={{ transform: `translateY(${-scrollY * 0.1}px)` }}
      />

      <div className="container mx-auto px-6 lg:px-16 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* Left: About */}
          <AnimatedSection>
            <div
              className="sticky top-32"
              style={{ transform: `translateY(${scrollY * 0.05}px)` }}
            >
              <EyebrowLabel>About {dest.title}</EyebrowLabel>
              <h2 className="font-display font-black text-primary-dark leading-tight mb-8"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
                Discover the<br />
                <span className="italic font-light text-[#e3261d]">Soul of {dest.title}</span>
              </h2>

              <div className="w-20 h-1 bg-gradient-to-r from-[#e3261d] to-[#c01f18] rounded-full mb-8" />

              <p className="text-neutral-600 text-lg leading-relaxed mb-8">
                {dest.about}
              </p>

              {/* Interactive stats */}
              <div className="grid grid-cols-3 gap-4">
                {['95%', '1000+', '4.9★'].map((stat, i) => (
                  <div key={i} className="group">
                    <div className="bg-white rounded-2xl p-5 border border-neutral-200 hover:border-[#e3261d] hover:shadow-xl transition-all duration-300">
                      <p className="font-display text-3xl font-black text-[#e3261d] group-hover:scale-110 transition-transform">{stat}</p>
                      <p className="text-neutral-400 text-xs mt-1">
                        {i === 0 ? 'Satisfaction' : i === 1 ? 'Visitors' : 'Rating'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Highlights - Interactive Timeline */}
          <AnimatedSection className="lg:pt-16">
            <div className="space-y-0">
              <h3 className="text-sm font-bold tracking-[0.3em] text-[#e3261d] uppercase mb-8">
                Must-See Highlights
              </h3>

              <div className="relative border-l-2 border-[#e3261d]/20 pl-10 space-y-8">
                {dest.highlights.map((h, i) => (
                  <div key={h.title} className="group relative">
                    {/* Connection dot */}
                    <div className="absolute -left-[42px] top-2 w-4 h-4 rounded-full border-2 border-[#e3261d] bg-white group-hover:bg-[#e3261d] group-hover:scale-150 transition-all duration-300" />

                    {/* Glow effect */}
                    <div className="absolute -left-[42px] top-2 w-4 h-4 rounded-full bg-[#e3261d] opacity-0 group-hover:opacity-30 group-hover:scale-[3] transition-all duration-500 blur-md" />

                    {/* Content */}
                    <div className="bg-white rounded-2xl p-6 border border-neutral-100 hover:border-primary-orange/30 hover:shadow-2xl hover:shadow-primary-orange/10 transition-all duration-500 hover:-translate-y-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h4 className="font-display text-xl font-bold text-primary-dark group-hover:text-primary-orange transition-colors">
                          {h.title}
                        </h4>
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#e3261d]/10 flex items-center justify-center text-[#e3261d] text-xs font-bold group-hover:bg-[#e3261d] group-hover:text-white transition-all">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <p className="text-neutral-500 text-sm leading-relaxed">{h.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   Section: Experiences - Immersive Cards with Reveal
───────────────────────────────────────────── */
const ExperiencesSection: React.FC<{ dest: DestinationData }> = ({ dest }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="experiences" className="py-32 bg-primary-dark overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16 max-w-7xl">

        <AnimatedSection className="text-center mb-20">
          <EyebrowLabel light>What To Do</EyebrowLabel>
          <h2 className="font-display font-black text-white leading-tight"
            style={{ fontSize: 'clamp(3rem, 7vw, 5rem)' }}>
            Signature<br />
            <span className="italic font-light text-[#e3261d]">Experiences</span>
          </h2>
        </AnimatedSection>

        {/* Experiences Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {dest.experiences.map((exp, i) => (
            <AnimatedSection key={exp.title}>
              <div
                className="group relative h-[500px] rounded-3xl overflow-hidden cursor-pointer"
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {/* Background image */}
                <img
                  src={exp.image}
                  alt={exp.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                    activeIndex === i ? 'scale-110' : 'scale-100'
                  }`}
                />

                {/* Gradient overlays */}
                <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-500 ${
                  activeIndex === i
                    ? 'from-black via-black/60 to-black/20 opacity-100'
                    : 'from-black/90 via-black/50 to-transparent opacity-100'
                }`} />

                {/* Number */}
                <div className="absolute top-6 right-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xl transition-all duration-500 ${
                    activeIndex === i
                      ? 'bg-[#e3261d] text-white scale-125 rotate-12'
                      : 'bg-white/10 backdrop-blur-sm text-white/60'
                  }`}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="font-display text-2xl md:text-3xl font-black text-white mb-3 transition-all duration-500">
                    {exp.title}
                  </h3>

                  {/* Description - slides up on hover */}
                  <div className={`transition-all duration-500 ${
                    activeIndex === i
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}>
                    <p className="text-white/80 text-sm leading-relaxed mb-6">
                      {exp.description}
                    </p>

                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 bg-white text-primary-dark px-6 py-3 rounded-full font-bold text-sm hover:bg-[#e3261d] hover:text-white transition-all duration-300"
                    >
                      Book Now
                      <Arrow className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Arrow indicator when not hovered */}
                  <div className={`mt-4 transition-all duration-500 ${
                    activeIndex === i ? 'opacity-0' : 'opacity-100'
                  }`}>
                    <div className="flex items-center gap-2 text-white/40 text-xs">
                      <span>Hover to explore</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   Section: Gallery - 3D Tilt Effect
───────────────────────────────────────────── */
const GallerySection: React.FC<{ dest: DestinationData }> = ({ dest }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16 max-w-7xl">

        <AnimatedSection className="text-center mb-16">
          <EyebrowLabel>Visual Journey</EyebrowLabel>
          <h2 className="font-display font-black text-primary-dark leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            {dest.title} Through<br />
            <span className="italic font-light text-[#e3261d]">the Lens</span>
          </h2>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-[#e3261d] hover:text-[#c01f18] font-bold text-lg transition-colors duration-300 mt-6"
          >
            View Full Gallery
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </AnimatedSection>

        {/* Bento Grid */}
        <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[700px]">
          {/* Large left image */}
          <AnimatedSection className="col-span-2 row-span-2 group cursor-pointer" onClick={() => setSelectedImage(0)}>
            <div className="relative h-full rounded-3xl overflow-hidden">
              <img
                src={dest.gallery[0]}
                alt={dest.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-sm font-bold">Featured Gallery</p>
                <p className="text-xs text-white/60">Click to view full size</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Top right */}
          <AnimatedSection className="col-span-2 row-span-1 group cursor-pointer" onClick={() => setSelectedImage(1)}>
            <div className="relative h-full rounded-3xl overflow-hidden">
              <img
                src={dest.gallery[1]}
                alt={dest.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-[#e3261d]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </AnimatedSection>

          {/* Bottom right - split */}
          <AnimatedSection className="col-span-1 row-span-1 group cursor-pointer" onClick={() => setSelectedImage(2)}>
            <div className="relative h-full rounded-3xl overflow-hidden">
              <img
                src={dest.gallery[2]}
                alt={dest.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection className="col-span-1 row-span-1 group cursor-pointer">
            <Link to="/gallery" className="relative h-full rounded-3xl overflow-hidden block">
              <img
                src={dest.gallery[3]}
                alt={dest.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-colors duration-500">
                <div className="text-center text-white">
                  <p className="text-4xl font-black mb-2">+12</p>
                  <p className="text-xs font-bold tracking-wider">MORE PHOTOS</p>
                </div>
              </div>
            </Link>
          </AnimatedSection>
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>
          <img
            src={dest.gallery[selectedImage]}
            alt={dest.title}
            className="max-w-full max-h-full object-contain rounded-2xl"
          />
        </div>
      )}
    </section>
  );
};

/* ─────────────────────────────────────────────
   Section: CTA - Simple & Clean
───────────────────────────────────────────── */
const CTASection: React.FC<{ dest: DestinationData }> = ({ dest }) => {
  return (
    <section className="relative py-32 bg-primary-dark overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <AnimatedSection>
          <div className="text-center space-y-12">
            {/* Main Heading */}
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Ready for <span className="text-[#e3261d]">{dest.title}</span>?
            </h2>

            {/* Description */}
            <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              Our expert local team will craft your perfect {dest.title} itinerary — tailored to your pace, your interests, and your dream.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-3 bg-[#e3261d] text-white text-sm font-bold px-10 py-5 rounded-full hover:bg-[#c01f18] transition-all duration-300 shadow-lg shadow-[#e3261d]/20"
              >
                Plan Your {dest.title} Trip
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/destinations"
                className="inline-flex items-center justify-center px-10 py-5 rounded-full border-2 border-white/30 text-white text-sm font-bold hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                View All Destinations
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   Page root
───────────────────────────────────────────── */
const DestinationDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const dest = slug ? destinations[slug] : null;

  if (!dest) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-dark">
        <div className="text-center px-6">
          <EyebrowLabel light>404 Error</EyebrowLabel>
          <h1 className="font-display text-5xl font-black text-white mb-6">Destination Not Found</h1>
          <Link to="/" className="btn-primary">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <HeroSection dest={dest} />
      <AboutSection dest={dest} />
      <ExperiencesSection dest={dest} />
      <GallerySection dest={dest} />
      <CTASection dest={dest} />
    </div>
  );
};

export default DestinationDetail;
