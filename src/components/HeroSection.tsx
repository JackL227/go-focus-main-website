
import React, { useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import BookingWidget from './BookingWidget';
import AIAgentDemo from './AIAgentDemo';
import FlowAnimation from './FlowAnimation';

const HeroSection = () => {
  const { user } = useAuth();
  const [showAgentDemo, setShowAgentDemo] = useState(false);
  
  const handleDemoClick = () => {
    setShowAgentDemo(true);
  };
  
  return (
    <section 
      className="relative min-h-screen flex flex-col items-center pt-24 pb-0 overflow-hidden bg-[#010101]" 
      aria-label="Hero section"
    >
      <div className="container-custom relative z-10 pt-8 pb-0">
        <div className="flex flex-col items-center max-w-4xl mx-auto text-center">
          <div className="space-y-6 mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold opacity-0 animate-fade-in [animation-delay:300ms] leading-tight" aria-label="Main headline">
              AI Agents That Convert Leads Into Revenue — 
              <span className="text-primary">While You Sleep.</span>
            </h1>
            
            <p className="text-xl text-foreground/90 opacity-0 animate-fade-in [animation-delay:500ms]" aria-label="Subheadline">
              <span className="block mt-2 text-primary/90">AI-powered lead conversion for Trading Mentors, Med Spas and Fitness Influencers — automatically booking calls and reviving leads.</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in [animation-delay:700ms] mb-6">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-background group relative overflow-hidden transition-all duration-300 hover:shadow-glow" 
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
              size="lg" 
              variant="outline" 
              className="border-primary/60 text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300"
            >
              Start for Free
            </BookingWidget>
          </div>
        </div>
      </div>
      
      {/* Flow Animation - the enhanced hero animation */}
      <div className="w-full relative z-10 mt-8">
        <FlowAnimation />
      </div>
      
      {/* Glass divider */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#010101] to-transparent z-[2]" />
      
      {showAgentDemo && <AIAgentDemo onClose={() => setShowAgentDemo(false)} />}
    </section>
  );
};

export default HeroSection;
