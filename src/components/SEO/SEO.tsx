import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DEFAULT_SEO, SEOData } from '../../utils/seo/SEOConfig';

interface SEOProps extends SEOData {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  canonical?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = DEFAULT_SEO.defaultKeywords,
  ogImage = DEFAULT_SEO.defaultOGImage,
  ogType = 'website',
  noindex = false,
  canonical
}) => {
  const fullTitle = title.includes(DEFAULT_SEO.siteName)
    ? title
    : `${title} | ${DEFAULT_SEO.siteName}`;

  const imageUrl = ogImage.startsWith('http')
    ? ogImage
    : `${DEFAULT_SEO.siteUrl}${ogImage}`;

  // For HashRouter, keep the hash in canonical to match sitemap
  const hashPath = window.location.hash || '#/';
  const canonicalUrl = canonical || `${DEFAULT_SEO.siteUrl}${hashPath}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Author & Robots */}
      <meta name="author" content={DEFAULT_SEO.author} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'} />
      <meta name="language" content={DEFAULT_SEO.language} />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />

      {/* Geographic Tags */}
      <meta name="geo.region" content={DEFAULT_SEO.location.region} />
      <meta name="geo.placename" content={DEFAULT_SEO.location.placename} />
      <meta name="geo.position" content={`${DEFAULT_SEO.location.coordinates.latitude};${DEFAULT_SEO.location.coordinates.longitude}`} />
      <meta name="ICBM" content={`${DEFAULT_SEO.location.coordinates.latitude}, ${DEFAULT_SEO.location.coordinates.longitude}`} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={DEFAULT_SEO.siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content={DEFAULT_SEO.locale} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:creator" content={DEFAULT_SEO.twitterHandle} />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default SEO;
