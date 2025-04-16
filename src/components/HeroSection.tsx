
import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Play } from 'lucide-react';
import FluidAnimation from './FluidAnimation';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16">
      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden">
        <FluidAnimation />
      </div>
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background/80 z-[1]"></div>
      
      <div className="container-custom relative z-10 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-8 w-80 h-80 bg-[#00E676]/10 rounded-full blur-3xl" />
          
          {/* Hero Content */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-background/40 backdrop-blur-sm shadow-sm border border-foreground/20 text-primary text-sm font-medium mb-6 opacity-0 animate-fade-in [animation-delay:100ms]">
              Performance-Based AI Automation Agency
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 opacity-0 animate-fade-in [animation-delay:300ms] leading-tight">
              AI Agents That Convert Leads Into Revenue — 
              <span className="text-primary"> While You Sleep.</span>
            </h1>
            
            <p className="text-xl text-foreground/90 mb-8 opacity-0 animate-fade-in [animation-delay:500ms] max-w-3xl mx-auto">
              Go Focus AI builds custom AI closers and voice assistants that respond, qualify, follow-up, and book appointments 24/7.
              <span className="block mt-2 text-primary/90">Built for Trading Mentors, Med Spas & Vehicle Aesthetic Experts.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 opacity-0 animate-fade-in [animation-delay:700ms]">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-background group">
                Book a Demo
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary/60 text-primary hover:bg-primary/10 flex items-center">
                <Play className="mr-2 h-4 w-4" />
                See How It Works
              </Button>
            </div>
          </div>
          
          {/* Subtle downward indication */}
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
