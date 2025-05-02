
import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import IndustryResultsSection from '@/components/IndustryResultsSection';
import SocialProofSection from '@/components/SocialProofSection';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import ChatbotWidget from '@/components/chatbot/ChatbotWidget';
import { Toaster } from '@/components/ui/toaster';
import MetaPixel from '@/components/MetaPixel';

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
    <main className="min-h-screen bg-gradient-to-b from-[#050A14] to-[#0A1428] text-foreground overflow-x-hidden">
      {/* Meta Pixel tracking */}
      <MetaPixel event="PageView" options={{ page: 'homepage' }} />
      
      <Navigation />
      <HeroSection />
      <HowItWorksSection />
      <IndustryResultsSection />
      <SocialProofSection />
      <CallToAction />
      <Footer />
      <Toaster />
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <Button 
          className="fixed bottom-4 left-4 z-40 rounded-full p-2 shadow-md"
          onClick={scrollToTop}
        >
          <ArrowUp size={24} />
        </Button>
      )}
      
      {/* Chatbot Widget */}
      <ChatbotWidget />
    </main>
  );
};

export default Index;
