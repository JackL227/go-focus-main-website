
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AnimationSection from '@/components/AnimationSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import IndustryResultsSection from '@/components/IndustryResultsSection';
import SocialProofSection from '@/components/SocialProofSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { useAuth } from '@/App';
import CallToAction from '@/components/CallToAction';

const Index = () => {
  const [showScrollTop, setShowScrollTop] = React.useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

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

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

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
      
      {/* Scroll to top button */}
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
