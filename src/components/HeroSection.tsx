
import React, { useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import BookingWidget from './BookingWidget';
import AIAgentDemo from './AIAgentDemo';
import HeroAnimation from './hero-animation/HeroAnimation';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroSection = () => {
  const { user } = useAuth();
  const [showAgentDemo, setShowAgentDemo] = useState(false);
  const isMobile = useIsMobile();
  
  const handleDemoClick = () => {
    setShowAgentDemo(true);
  };
  
  return (
    <section 
      className="relative min-h-screen flex flex-col items-center pt-20 md:pt-24 pb-12 md:pb-16 overflow-hidden" 
      aria-label="Hero section"
    >
      <div className="container-custom relative z-10 pt-6 md:pt-8">
        <div className="flex flex-col items-center max-w-4xl mx-auto text-center mb-6 md:mb-8">
          <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
            <h1 aria-label="Main headline" className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-gradient-primary py-[20px] md:py-[35px]">
              AI Agents That Convert Leads Into Revenue — 
              <span className="text-primary">While You Sleep.</span>
            </h1>
            
            <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-foreground/90 animate-fade-in [animation-delay:500ms]`} aria-label="Subheadline">
              <span className="block mt-2 text-primary/90">AI powered systems that automate your lead generation, client follow-up, and call booking processes, helping you scale efficiently.</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in [animation-delay:700ms] mb-4 md:mb-6 justify-center w-full max-w-md mx-auto">
            <Button 
              size={isMobile ? "default" : "lg"}
              className="bg-primary hover:bg-primary/90 text-background group relative overflow-hidden transition-all duration-300 hover:shadow-glow w-full"
              onClick={handleDemoClick}
              aria-label="See AI agent demo"
            >
              <span className="relative z-10 flex items-center">
                See AI Agent in Action
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
            
            <BookingWidget 
              size={isMobile ? "default" : "lg"}
              variant="outline" 
              className="border-primary/60 text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300 w-full"
            >
              Get My Personalised Demo
            </BookingWidget>
          </div>
        </div>
        
        {/* Enhanced Hero Animation Container with increased height for mobile */}
        <div className="relative mx-auto w-full max-w-5xl bg-transparent">
          <HeroAnimation />
        </div>
      </div>
      
      {showAgentDemo && <AIAgentDemo onClose={() => setShowAgentDemo(false)} initialNiche="trading" />}
    </section>
  );
};

export default HeroSection;
