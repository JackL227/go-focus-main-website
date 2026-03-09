
import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ChannelsBar from '@/components/ChannelsBar';
import HowItWorksSection from '@/components/HowItWorksSection';
import AIInActionSection from '@/components/AIInActionSection';
import IndustryResultsSection from '@/components/IndustryResultsSection';
import SocialProofSection from '@/components/SocialProofSection';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import ChatbotWidget from '@/components/chatbot/ChatbotWidget';
import { Toaster } from '@/components/ui/toaster';
import { trackCustomEvent } from '@/utils/metaPixel';
import { motion, AnimatePresence } from 'framer-motion';

const Index = () => {
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    trackCustomEvent('HomepageView');
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-background text-foreground overflow-x-clip"
      >
        <Navigation />
        <HeroSection />
        <ChannelsBar />
        <HowItWorksSection />
        <AIInActionSection />
        <IndustryResultsSection />
        <SocialProofSection />
        <CallToAction />
        <Footer />
        <Toaster />

        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-4 left-4 z-40"
          >
            <Button
              className="rounded-full p-2 shadow-md bg-foreground text-background hover:bg-foreground/90"
              onClick={scrollToTop}
            >
              <ArrowUp size={20} />
            </Button>
          </motion.div>
        )}

        <ChatbotWidget />
      </motion.main>
    </AnimatePresence>
  );
};

export default Index;
