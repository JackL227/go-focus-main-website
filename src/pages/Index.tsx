import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AnimationSection from '@/components/AnimationSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import IndustryResultsSection from '@/components/IndustryResultsSection';
import SocialProofSection from '@/components/SocialProofSection';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
const Index = () => {
  const [showScrollTop, setShowScrollTop] = React.useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return <main className="min-h-screen bg-gradient-to-b from-[#050A14] to-[#0A1428] text-foreground overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <AnimationSection />
      <HowItWorksSection />
      <IndustryResultsSection />
      <SocialProofSection />
      <CallToAction />
      <Footer />
      
      {/* Scroll to top button */}
      {showScrollTop}
    </main>;
};
export default Index;