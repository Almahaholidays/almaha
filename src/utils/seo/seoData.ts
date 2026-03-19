import { DEFAULT_SEO } from './SEOConfig';

export interface PageSEO {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  ogType?: string;
}

// Static pages
export const PAGE_SEO: Record<string, PageSEO> = {
  home: {
    title: DEFAULT_SEO.defaultTitle,
    description: DEFAULT_SEO.defaultDescription,
    keywords: DEFAULT_SEO.defaultKeywords,
    ogImage: DEFAULT_SEO.defaultOGImage,
    ogType: 'website'
  },

  about: {
    title: 'About Al Maha Holidays | 25+ Years of Oman Adventure Excellence',
    description: 'Established 1999 in Muscat, Oman. Al Maha Holidays & Adventure World offers authentic experiences with expert local guides. Premium tours, trekking, luxury travel & cultural immersion.',
    keywords: 'Al Maha Holidays about, Oman tour operator, Adventure World Oman, Muscat tour company, established 1999, Oman travel experts',
    ogImage: '/logo/almaha_logo1.png',
    ogType: 'website'
  },

  services: {
    title: 'Oman Tour Services | Trekking, Luxury & Adventure | Al Maha Holidays',
    description: 'Explore our 6 signature Oman experiences: Trekking, Canyoning, Cultural Tours, Luxury Tours, Adventure Expeditions & Car Rental. Expert guides, premium service since 1999.',
    keywords: 'Oman tour services, Oman trekking, Oman canyoning, Oman luxury tours, Oman adventure, Oman cultural tours, Oman car rental',
    ogImage: '/logo/almaha_logo1.png',
    ogType: 'website'
  },

  destinations: {
    title: 'Oman Destinations | Discover Muscat, Wahiba Sands, Nizwa & More',
    description: 'Explore 6 stunning Oman destinations: Muscat, Wahiba Sands, Nizwa, Salalah, Jebel Akhdar, Sur. Expert-guided tours to mountains, deserts, coast & heritage sites. Plan your journey.',
    keywords: 'Oman destinations, Muscat Oman, Wahiba Sands, Nizwa Oman, Salalah, Jebel Akhdar, Sur Oman, Oman travel destinations',
    ogImage: '/logo/almaha_logo1.png',
    ogType: 'website'
  },

  experiences: {
    title: 'Oman Adventure Experiences | Custom Tours & Activities | Al Maha',
    description: 'Curated Oman experiences: trekking, canyoning, cultural immersion, desert adventures & luxury tours. Tailored to your interests. 25+ years expertise. Plan your journey.',
    keywords: 'Oman experiences, Oman adventure activities, custom Oman tours, Oman activities, tailored Oman travel',
    ogImage: '/logo/almaha_logo1.png',
    ogType: 'website'
  },

  gallery: {
    title: 'Oman Tourism Photo Gallery | Al Maha Adventures & Landscapes',
    description: 'Browse stunning photos from Al Maha Holidays adventures: Oman mountains, deserts, coastlines, heritage sites & cultural experiences. Visual inspiration for your journey.',
    keywords: 'Oman photos, Oman tourism gallery, Oman landscapes, Oman adventure photos, Oman travel images',
    ogImage: '/logo/almaha_logo1.png',
    ogType: 'website'
  },

  contact: {
    title: 'Contact Al Maha Holidays | Book Your Oman Adventure | Muscat',
    description: 'Contact Al Maha Holidays in Muscat, Oman. Book tours, request quotes, plan custom itineraries. Phone: +968 9803 6952. 25+ years of trusted service.',
    keywords: 'Contact Al Maha Holidays, book Oman tours, Muscat tour operator contact, Oman travel booking',
    ogImage: '/logo/almaha_logo1.png',
    ogType: 'website'
  }
};

// Service-specific SEO
export const SERVICE_SEO: Record<string, PageSEO> = {
  'trekking-tour': {
    title: 'Oman Trekking Tours | 1-9 Day Mountain Adventures | Al Maha',
    description: "Discover Oman's stunning landscapes on guided treks from 1-9 days. Hike Jebel Shams, Wadi Bani Awf & Snake Canyon. Expert guides, camping gear included. Book now.",
    keywords: 'Oman trekking, Jebel Shams trek, Oman mountain hiking, Wadi Bani Awf, Snake Canyon trek, multi-day trekking Oman',
    ogImage: '/experiencesImg/trekkingExp/trekkExp3.jpeg',
    ogType: 'product'
  },

  'canyoning-caving': {
    title: 'Oman Canyoning & Caving | Extreme Adventure Tours | Al Maha',
    description: 'Thrilling 1-day canyoning & caving in Oman. Rappel Snake Canyon, explore Al Hoota Cave, navigate Wadi Shab. Professional gear & certified guides. Adventure awaits.',
    keywords: 'Oman canyoning, Snake Canyon Oman, Al Hoota Cave, Oman adventure sports, caving Oman, rappelling Oman',
    ogImage: '/experiencesImg/canyonningExp/cannyoning1.jpeg',
    ogType: 'product'
  },

  'culture-tour': {
    title: 'Oman Cultural Heritage Tours | Forts, Souqs & Traditions | Al Maha',
    description: 'Immerse in Omani culture: Nizwa Fort, traditional souqs, ancient villages. Full-day guided tours with local experts. Authentic experiences since 1999. Book today.',
    keywords: 'Oman culture tour, Nizwa Fort tours, Oman heritage, traditional Oman souq, Omani traditions, cultural immersion',
    ogImage: '/experiencesImg/cultureExp/culture.jpeg',
    ogType: 'product'
  },

  'car-rental': {
    title: 'Oman Car Rental | 4x4 & Luxury Vehicles | Al Maha Holidays',
    description: 'Premium car rental in Oman: 4x4s, SUVs, luxury vehicles. Airport pickup, GPS, 24/7 support. Flexible daily, weekly, monthly rates. Explore Oman your way.',
    keywords: 'Oman car rental, 4x4 rental Oman, Muscat car rental, Oman vehicle hire, SUV rental Oman, luxury car rental',
    ogImage: '/experiencesImg/carExp/carRental2.jpeg',
    ogType: 'product'
  },

  'luxury-tour': {
    title: 'Oman Luxury Tours | 5-Star Premium Experiences | Al Maha',
    description: 'Exclusive 5-10 day luxury Oman tours. 5-star hotels, private guides, gourmet dining, spa treatments. Desert, coast & mountain escapes. Premium travel redefined.',
    keywords: 'Oman luxury tours, 5-star Oman, luxury travel Oman, premium Oman holidays, exclusive Oman tours, luxury desert camps',
    ogImage: '/experiencesImg/luxuryExp/luxury3.webp',
    ogType: 'product'
  },

  'adventure-tour': {
    title: 'Oman Adventure Tours | Multi-Activity Expeditions | Al Maha',
    description: 'Thrilling 1-7 day adventure tours: mountain climbing, first Oman climbing gym, multi-activity expeditions. Professional equipment, expert instruction. Adrenaline awaits.',
    keywords: 'Oman adventure tours, mountain climbing Oman, climbing gym Oman, adventure expeditions, outdoor activities Oman',
    ogImage: '/experiencesImg/adventureExp/adventureExp4.jpeg',
    ogType: 'product'
  }
};

// Destination-specific SEO
export const DESTINATION_SEO: Record<string, PageSEO> = {
  muscat: {
    title: 'Muscat Oman Tours | City Life & Coastal Beauty | Al Maha Holidays',
    description: 'Discover Muscat: Sultan Qaboos Grand Mosque, Mutrah Souq, Royal Opera House & coastal cruises. Expert-guided city tours. Book your Muscat adventure today.',
    keywords: 'Muscat tours, Muscat Oman, Sultan Qaboos Mosque, Mutrah Souq Muscat, Royal Opera House, Muscat attractions',
    ogImage: '/destinations/muscatImg/Muscat5.jpeg',
    ogType: 'place'
  },

  'wahiba-sands': {
    title: 'Wahiba Sands Desert Tours | Dune Bashing & Camping | Al Maha',
    description: 'Experience Wahiba Sands: dune bashing, Bedouin camps, camel trekking, stargazing. Authentic desert adventures Nov-Mar. Book guided desert tours today.',
    keywords: 'Wahiba Sands tours, Oman desert tours, dune bashing Oman, Bedouin camps, desert camping Oman, camel trekking',
    ogImage: '/destinations/wahibaImg/wahiba5.jpeg',
    ogType: 'place'
  },

  nizwa: {
    title: 'Nizwa Oman Tours | Heritage Forts & Souqs | Al Maha Holidays',
    description: 'Explore Nizwa: iconic round fort, Friday goat market, Al Hamra villages & silver souqs. Cultural heart of Oman. Book heritage tours Oct-Mar.',
    keywords: 'Nizwa tours, Nizwa Fort, Oman heritage tours, Nizwa souq, Al Hamra, Friday goat market, Nizwa Oman',
    ogImage: '/destinations/nizwaImg/Nizwa2.jpeg',
    ogType: 'place'
  },

  salalah: {
    title: 'Salalah Oman Tours | Tropical Khareef & Beaches | Al Maha',
    description: 'Discover Salalah: Khareef monsoon waterfalls, frankincense trails, Al Mughsail blowholes & pristine beaches. UNESCO heritage. Best Jun-Sep.',
    keywords: 'Salalah tours, Khareef Salalah, Oman beaches, frankincense Oman, Dhofar region, Al Mughsail, Salalah monsoon',
    ogImage: '/destinations/salalahImg/Salalah1.jpeg',
    ogType: 'place'
  },

  'jebel-akhdar': {
    title: 'Jebel Akhdar Oman Tours | Green Mountain & Rose Gardens | Al Maha',
    description: 'Explore Jebel Akhdar: damask rose terraces, Wadi Bani Habib, Jebel Shams Balcony Walk. Cool mountain escapes 2000m high. Mar-Nov tours.',
    keywords: 'Jebel Akhdar tours, Green Mountain Oman, Oman rose gardens, Balcony Walk, Jebel Shams, Wadi Bani Habib',
    ogImage: '/destinations/jebelakhdarImg/Jebelakhdar.jpeg',
    ogType: 'place'
  },

  sur: {
    title: 'Sur Oman Tours | Dhow Building & Turtle Nesting | Al Maha Holidays',
    description: 'Experience Sur: traditional dhow yards, Ras Al Jinz turtle reserve, Blue Lagoon & maritime heritage. Coastal beauty Oct-Apr. Book guided tours.',
    keywords: 'Sur Oman tours, Ras Al Jinz turtles, dhow building Sur, Sur lagoon, turtle nesting Oman, Blue Lagoon Sur',
    ogImage: '/destinations/surImg/sur5.jpeg',
    ogType: 'place'
  }
};

// Helper function to get SEO data
export const getSEOData = (
  page: string,
  slug?: string
): PageSEO => {
  if (slug && SERVICE_SEO[slug]) {
    return SERVICE_SEO[slug];
  }
  if (slug && DESTINATION_SEO[slug]) {
    return DESTINATION_SEO[slug];
  }
  return PAGE_SEO[page] || PAGE_SEO.home;
};
