import React, { useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import FluidAnimation from './FluidAnimation';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import BookingWidget from './BookingWidget';
import AIAgentDemo from './AIAgentDemo';

const HeroSection = () => {
  const {
    user
  } = useAuth();
  const [showAgentDemo, setShowAgentDemo] = useState(false);
  const handleDemoClick = () => {
    setShowAgentDemo(true);
  };
  const scrollToHowItWorks = () => {
    const section = document.getElementById('how-it-works');
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-0 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <FluidAnimation extendToSection={true} />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/60 to-transparent z-[1]"></div>
      
      <div className="container-custom relative z-10 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-8 w-80 h-80 bg-[#00E676]/10 rounded-full blur-3xl" />
          
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-background/40 backdrop-blur-sm shadow-sm border border-foreground/20 text-primary text-sm font-medium mb-6 opacity-0 animate-fade-in [animation-delay:100ms]">
              Performance-Based AI Automation Agency
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 opacity-0 animate-fade-in [animation-delay:300ms] leading-tight">
              AI Agents That Convert Leads Into Revenue — 
              <span className="text-primary"> While You Sleep.</span>
            </h1>
            
            <p className="text-xl text-foreground/90 mb-8 opacity-0 animate-fade-in [animation-delay:500ms] max-w-3xl mx-auto">
              We help Trading Mentors, Med Spas, and Fitness Coaches convert more leads into revenue using custom-trained AI agents that respond, qualify, and book clients 24/7.
              <span className="block mt-2 text-primary/90">Built for Trading Mentors, Med Spas and Fitness Influencers — our AI responds to DMs, books qualified calls and revives cold leads without you lifting a finger.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 opacity-0 animate-fade-in [animation-delay:700ms]">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-background group flex items-center" onClick={handleDemoClick}>
                🎯 See AI Agent in Action
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <BookingWidget
                size="lg"
                variant="outline"
                className="border-primary/60 text-primary hover:bg-primary/10"
              >
                📅 Book a Demo Call
              </BookingWidget>
              
              {!user && <Link to="/auth">
                  
              </Link>}
            </div>
          </div>
          
          {showAgentDemo && <AIAgentDemo onClose={() => setShowAgentDemo(false)} />}
          
          <div className="text-center mt-8 opacity-0 animate-fade-in [animation-delay:1200ms]">
            <div className="inline-block animate-bounce">
              <ArrowRight className="h-6 w-6 transform rotate-90 text-primary/70" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
