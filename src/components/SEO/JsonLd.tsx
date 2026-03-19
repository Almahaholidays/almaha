import React from 'react';
import { Helmet } from 'react-helmet-async';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface JsonLdProps {
  type?: 'service' | 'destination' | 'breadcrumb';
  breadcrumbs?: BreadcrumbItem[];
  serviceName?: string;
  serviceDescription?: string;
  servicePrice?: string;
  destinationName?: string;
  destinationDescription?: string;
}

const JsonLd: React.FC<JsonLdProps> = ({
  type = 'breadcrumb',
  breadcrumbs = [],
  serviceName,
  serviceDescription,
  servicePrice,
  destinationName,
  destinationDescription
}) => {
  // Breadcrumb Schema
  const breadcrumbSchema = breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  } : null;

  // Service/Product Schema
  const serviceSchema = serviceName ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": serviceName,
    "description": serviceDescription,
    "brand": {
      "@type": "Brand",
      "name": "Al Maha Holidays"
    },
    "provider": {
      "@type": "TravelAgency",
      "name": "Al Maha Holidays & Adventure World",
      "url": "https://almahaholidays.com"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "OMR",
      "lowPrice": servicePrice || "50",
      "highPrice": "500",
      "availability": "https://schema.org/InStock",
      "url": window.location.href
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "120",
      "bestRating": "5",
      "worstRating": "1"
    }
  } : null;

  // Destination/Place Schema
  const destinationSchema = destinationName ? {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": destinationName,
    "description": destinationDescription,
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "23.588",
      "longitude": "58.383"
    },
    "touristType": ["Adventure", "Culture", "Luxury"],
    "isAccessibleForFree": false
  } : null;

  return (
    <Helmet>
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
      {serviceSchema && type === 'service' && (
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      )}
      {destinationSchema && type === 'destination' && (
        <script type="application/ld+json">
          {JSON.stringify(destinationSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default JsonLd;
