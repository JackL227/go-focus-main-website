
import React from 'react';
import FlowAnimation from './FlowAnimation';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center">
      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden">
        <FlowAnimation />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-2xl relative">
          <div className="absolute -top-16 -left-16 w-32 h-32 bg-trader-accent/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-trader-blue/20 rounded-full blur-3xl" />
          
          <span className="inline-block px-4 py-2 rounded-full bg-white/90 shadow-sm text-trader-blue text-sm font-medium mb-6 opacity-0 animate-fade-in [animation-delay:100ms]">
            Exclusively For Trading Mentors
          </span>
          
          <h1 className="text-trader-blue mb-6 opacity-0 animate-fade-in [animation-delay:300ms] leading-tight">
            Drowning in DMs? <span className="text-gradient-green">Stop Losing High-Ticket Trading Clients</span>
          </h1>
          
          <p className="text-xl text-trader-gray-dark mb-8 opacity-0 animate-fade-in [animation-delay:600ms]">
            Our AI agent qualifies leads, books calls, and speaks in your voice—saving you hours while scaling your trading mentorship business.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in [animation-delay:900ms]">
            <Button size="lg" className="bg-trader-accent hover:bg-trader-accent/90 text-white group">
              Book Your Free Strategy Call
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="border-trader-blue text-trader-blue hover:bg-trader-blue/10">
              See How It Works
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
