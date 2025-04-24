
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import FluidAnimation from './FluidAnimation';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import BookingWidget from './BookingWidget';
import AIAgentDemo from './AIAgentDemo';

const HeroSection = () => {
  const { user } = useAuth();
  const [showAgentDemo, setShowAgentDemo] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);

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
    <section className="relative min-h-screen flex items-center pt-24 pb-0 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <FluidAnimation />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background z-[1]"></div>
      
      <div className="container-custom relative z-10 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-8 w-80 h-80 bg-[#00E676]/10 rounded-full blur-3xl" />
          
          <div className="text-center mb-12">
            <span className={`inline-block px-4 py-2 rounded-full bg-background/40 backdrop-blur-sm shadow-sm border border-foreground/20 text-primary text-sm font-medium mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
              Performance-Based AI Automation Agency
            </span>
            
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'} leading-tight`}>
              Double Your Sales Calls With 
              <span className="text-primary relative">
                <span className="relative z-10"> AI Precision</span>
                <span className="absolute bottom-2 left-0 h-3 w-full bg-primary/20 -z-0"></span>
              </span>
            </h1>
            
            <p className={`text-xl text-foreground/90 mb-8 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'} max-w-3xl mx-auto`}>
              Our custom-trained AI agents respond, qualify, and book high-value clients 24/7 while you focus on closing deals and scaling your business.
              <span className="block mt-2 text-primary/90 text-lg">Built for Trading Mentors, Med Spas and Fitness Influencers — our AI responds to DMs, books qualified calls and revives cold leads without you lifting a finger.</span>
            </p>
            
            <div className={`flex flex-col sm:flex-row justify-center gap-4 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-background group flex items-center shadow-lg shadow-primary/20 animate-shadow-pulse" 
                onClick={handleDemoClick}
              >
                <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-background/20">
                  <Play size={12} className="ml-0.5 text-background" />
                </span>
                See AI Agent in Action
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <BookingWidget
                size="lg"
                variant="outline"
                className="border-primary/60 text-primary hover:bg-primary/10 shadow-lg"
              >
                📅 Book a Demo Call
              </BookingWidget>
            </div>
          </div>
          
          {showAgentDemo && <AIAgentDemo onClose={() => setShowAgentDemo(false)} />}
          
          <div className={`text-center mt-12 transition-all duration-700 delay-800 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0'}`}>
            <button onClick={scrollToHowItWorks} className="flex flex-col items-center justify-center text-foreground/70 hover:text-primary transition-colors">
              <span className="text-sm mb-2">Learn how it works</span>
              <ChevronDown className="h-6 w-6 animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
