export const DEFAULT_SEO = {
  siteName: 'Al Maha Holidays',
  siteUrl: 'https://almahaholidays.com',
  twitterHandle: '@AlMahaHolidays',
  language: 'en',
  locale: 'en_US',
  themeColor: '#e3261d',

  defaultTitle: 'Al Maha Holidays | Premium Oman Tours & Adventures Since 1999',
  defaultDescription: 'Discover Oman with Al Maha Holidays - 25+ years of premium tours, trekking, luxury experiences & adventure. From Muscat to Wahiba Sands. Book your authentic Omani journey today.',
  defaultKeywords: 'Al Maha Holidays, Oman tours, Oman tourism, Oman adventure, premium Oman tours, Muscat tours, Wahiba Sands, Oman travel',
  defaultOGImage: '/logo/almaha_logo1.png',

  author: 'Al Maha Holidays & Adventure World',
  foundedYear: '1999',
  location: {
    region: 'OM',
    placename: 'Muscat, Oman',
    coordinates: {
      latitude: '23.588',
      longitude: '58.383'
    }
  }
};

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  canonical?: string;
}
