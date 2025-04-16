
import React from 'react';
import FluidAnimation from './FluidAnimation';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center">
      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden">
        <FluidAnimation />
      </div>
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/80 z-[1]"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="absolute -top-16 -left-16 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          
          <span className="inline-block px-4 py-2 rounded-full bg-background/40 backdrop-blur-sm shadow-sm text-primary text-sm font-medium mb-6 opacity-0 animate-fade-in [animation-delay:100ms] border border-foreground/20">
            Exclusively For Trading Mentors
          </span>
          
          <h1 className="text-primary mb-6 opacity-0 animate-fade-in [animation-delay:300ms] leading-tight">
            Drowning in DMs? <span className="text-foreground">Stop Losing High-Ticket Trading Clients</span>
          </h1>
          
          <p className="text-xl text-foreground mb-8 opacity-0 animate-fade-in [animation-delay:600ms]">
            Our AI agent qualifies leads, books calls, and speaks in your voice—saving you hours while scaling your trading mentorship business.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 opacity-0 animate-fade-in [animation-delay:900ms]">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-foreground">
              Book Your Free Strategy Call
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              See How It Works
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
