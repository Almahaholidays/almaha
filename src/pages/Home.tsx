import React from 'react';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import EventsTypeSection from '../components/home/EventsTypeSection';
import ServicesSection from '../components/home/ServicesSection';
// import AdventureSection from '../components/home/AdventureSection';
import DestinationsSection from '../components/home/DestinationsSection';
// import ExperiencesSection from '../components/home/ExperiencesSection';
import ClientsSection from '../components/home/ClientsSection';
import ReviewsSection from '../components/home/ReviewsSection';
// import ContactUsSection from '../components/home/ContactUsSection';

const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      {/* <AdventureSection /> */}
      <EventsTypeSection />
      <DestinationsSection />
      {/* <ExperiencesSection /> */}
      <ClientsSection />
      <ReviewsSection />
      {/* <ContactUsSection /> */}
    </>
  );
};

export default Home;