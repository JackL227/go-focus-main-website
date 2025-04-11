
import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import MentorSection from '@/components/MentorSection';
import ProgramSection from '@/components/ProgramSection';
import TestimonialSection from '@/components/TestimonialSection';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <MentorSection />
      <ProgramSection />
      <TestimonialSection />
      <CallToAction />
      <Footer />
    </main>
  );
};

export default Index;
