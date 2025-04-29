
import React, { useEffect, lazy, Suspense } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import LoadingScreen from '@/components/LoadingScreen';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import ChatbotWidget from '@/components/chatbot/ChatbotWidget';
import { Toaster } from '@/components/ui/toaster';

// Lazy load non-critical components
const HowItWorksSection = lazy(() => import('@/components/HowItWorksSection'));
const IndustryResultsSection = lazy(() => import('@/components/IndustryResultsSection'));
const SocialProofSection = lazy(() => import('@/components/SocialProofSection'));
const CallToAction = lazy(() => import('@/components/CallToAction'));
const Footer = lazy(() => import('@/components/Footer'));

const Index = () => {
  const [showScrollTop, setShowScrollTop] = React.useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    // Use passive event listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <>
      <LoadingScreen />
      <main className="min-h-screen bg-gradient-to-b from-[#050A14] to-[#0A1428] text-foreground overflow-x-hidden">
        <Navigation />
        <HeroSection />
        
        <Suspense fallback={<div className="h-32 w-full flex justify-center items-center">Loading...</div>}>
          <HowItWorksSection />
          <IndustryResultsSection />
          <SocialProofSection />
          <CallToAction />
          <Footer />
        </Suspense>
        
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
    </>
  );
};

export default Index;
