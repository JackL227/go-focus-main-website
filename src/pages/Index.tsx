
import React, { useEffect, useState } from 'react';
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
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (isScrolling) return;
    
    setIsScrolling(true);
    
    // Smooth scroll with easing
    const scrollStep = -window.scrollY / 20;
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
        setIsScrolling(false);
      }
    }, 15);
    
    // Fallback to native smooth scroll if the custom animation fails
    setTimeout(() => {
      clearInterval(scrollInterval);
      if (window.scrollY !== 0) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
      setTimeout(() => setIsScrolling(false), 500);
    }, 500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#050A14] to-[#0A1428] text-foreground overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <AnimationSection />
      <HowItWorksSection />
      <IndustryResultsSection />
      <SocialProofSection />
      <CallToAction />
      <Footer />
      
      {/* Enhanced scroll to top button with animations */}
      {showScrollTop && (
        <Button 
          onClick={scrollToTop}
          disabled={isScrolling}
          className={`fixed bottom-6 right-6 rounded-full w-12 h-12 bg-primary hover:bg-primary/90 
            shadow-lg shadow-primary/20 z-50 flex items-center justify-center transition-all duration-300
            ${isScrolling ? 'opacity-70' : 'opacity-100 hover:transform hover:scale-110 hover:shadow-xl'}`}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} className={`${isScrolling ? 'animate-bounce' : ''}`} />
          
          {/* Ripple effect */}
          <span className="absolute inset-0 rounded-full animate-ripple bg-primary/40"></span>
        </Button>
      )}
    </main>
  );
};

export default Index;
