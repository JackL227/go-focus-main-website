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

  return (
    <main className="min-h-screen bg-[#050A14] text-foreground overflow-x-hidden">
      <div className="relative">
        <Navigation />
        
        <div className="relative">
          <HeroSection />
          <HowItWorksSection />
        </div>
        
        <AnimationSection />
        <IndustryResultsSection />
        <SocialProofSection />
        <CallToAction />
        <Footer />
      </div>
      
      {showScrollTop && (
        <Button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 rounded-full w-12 h-12 bg-primary hover:bg-primary/90 shadow-lg z-50 flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </Button>
      )}
    </main>
  );
};

export default Index;
