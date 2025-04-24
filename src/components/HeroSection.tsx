
import React, { useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import FluidAnimation from './FluidAnimation';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import BookingWidget from './BookingWidget';
import AIAgentDemo from './AIAgentDemo';
import FlowAnimationCanvas from './flow-animation';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroSection = () => {
  const { user } = useAuth();
  const [showAgentDemo, setShowAgentDemo] = useState(false);
  const isMobile = useIsMobile();
  
  const handleDemoClick = () => {
    setShowAgentDemo(true);
  };
  
  const scrollToHowItWorks = () => {
    const section = document.getElementById('how-it-works');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section className="relative min-h-screen flex items-center pt-16 md:pt-24 pb-0 overflow-hidden" aria-label="Hero section">
      <div className="absolute inset-0">
        <FluidAnimation />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background z-[1]" />
      
      <div className="container-custom relative z-10 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center max-w-7xl mx-auto">
          {/* Left Column: Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="space-y-4 md:space-y-6">
              <span 
                className="inline-block px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-background/40 backdrop-blur-sm shadow-sm border border-foreground/20 text-primary text-xs md:text-sm font-medium opacity-0 animate-fade-in [animation-delay:100ms]"
                aria-label="Company type"
              >
                Performance-Based AI Automation Agency
              </span>
              
              <h1 
                className="text-3xl md:text-5xl lg:text-6xl font-bold opacity-0 animate-fade-in [animation-delay:300ms] leading-tight"
                aria-label="Main headline"
              >
                AI Agents That Convert Leads Into Revenue — 
                <span className="text-primary">While You Sleep.</span>
              </h1>
              
              <p 
                className="text-lg md:text-xl text-foreground/90 opacity-0 animate-fade-in [animation-delay:500ms]"
                aria-label="Subheadline"
              >
                <span className="block mt-2 text-primary/90">
                  {isMobile ? 
                    "Our AI responds to DMs, books qualified calls and revives cold leads 24/7." :
                    "Built for Trading Mentors, Med Spas and Fitness Influencers — our AI responds to DMs, books qualified calls and revives cold leads without you lifting a finger."
                  }
                </span>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start opacity-0 animate-fade-in [animation-delay:700ms]">
              <Button 
                size={isMobile ? "default" : "lg"}
                className="bg-primary hover:bg-primary/90 text-background group relative overflow-hidden transition-all duration-300 hover:shadow-glow"
                onClick={handleDemoClick}
                aria-label="See AI agent demo"
              >
                <span className="relative z-10 flex items-center text-sm md:text-base">
                  🎯 See AI Agent in Action
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
              
              <Button
                size={isMobile ? "default" : "lg"}
                variant="outline"
                className="border-primary/60 text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300 text-sm md:text-base"
                onClick={scrollToHowItWorks}
                aria-label="Learn how it works"
              >
                💡 See How It Works
              </Button>
            </div>
          </div>
          
          {/* Right Column: Animation Container */}
          <div className="relative h-[300px] md:h-[500px] lg:h-[600px] opacity-0 animate-fade-in [animation-delay:900ms]">
            <div className="absolute inset-0">
              <FlowAnimationCanvas isMobile={isMobile} />
            </div>
          </div>
        </div>
      </div>
      
      {showAgentDemo && <AIAgentDemo onClose={() => setShowAgentDemo(false)} />}
    </section>
  );
};

export default HeroSection;
