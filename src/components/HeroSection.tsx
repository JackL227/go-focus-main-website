
import React from 'react';
import FluidAnimation from './FluidAnimation';
import { Button } from './ui/button';
import { ArrowRight, Calendar, CheckCircle, DollarSign } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center">
      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden">
        <FluidAnimation />
      </div>
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/90 z-[1]"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="absolute -top-16 -left-16 w-32 h-32 bg-[#ffb347]/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-[#ffb347]/20 rounded-full blur-3xl" />
          
          <span className="inline-block px-4 py-2 rounded-full bg-[#ffb347]/10 backdrop-blur-sm shadow-sm text-[#ffd700] text-sm font-medium mb-6 opacity-0 animate-fade-in [animation-delay:100ms] border border-[#ffd700]/30">
            Smart Lead Qualification for Trading Mentors
          </span>
          
          <h1 className="text-[#ffd700] mb-6 opacity-0 animate-fade-in [animation-delay:300ms] leading-tight">
            Let AI <span className="text-foreground">Qualify & Convert Your Trading Leads</span>
          </h1>
          
          <p className="text-xl text-foreground mb-8 opacity-0 animate-fade-in [animation-delay:600ms]">
            Our AI agent autonomously qualifies leads, books calls, and speaks in your voice—saving you hours while scaling your trading mentorship business.
          </p>
          
          <div className="flex flex-wrap justify-center gap-5 mb-12 opacity-0 animate-fade-in [animation-delay:800ms]">
            <div className="flex items-center space-x-2 text-[#ffb347]">
              <CheckCircle className="h-5 w-5" />
              <span>Lead Qualification</span>
            </div>
            <div className="flex items-center space-x-2 text-[#ffb347]">
              <Calendar className="h-5 w-5" />
              <span>Automated Scheduling</span>
            </div>
            <div className="flex items-center space-x-2 text-[#ffb347]">
              <DollarSign className="h-5 w-5" />
              <span>Higher Conversion</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 opacity-0 animate-fade-in [animation-delay:900ms]">
            <Button size="lg" className="bg-[#ffb347] hover:bg-[#ffb347]/90 text-background group">
              Book Your Free Strategy Call
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="border-[#ffb347] text-[#ffb347] hover:bg-[#ffb347]/10">
              See How It Works
            </Button>
          </div>
        </div>
      </div>
      
      {/* Outcome indicators - visible on larger screens */}
      <div className="absolute bottom-10 left-0 right-0 z-10 hidden md:flex justify-center gap-8">
        <div className="relative px-6 py-3 bg-background/40 backdrop-blur-md rounded-lg border border-[#ffb347]/20 flex items-center space-x-2 animate-pulse-soft">
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#ffb347] rounded-full"></div>
          <CheckCircle className="h-4 w-4 text-[#ffb347]" />
          <span className="text-sm text-[#ffb347]">Qualified Leads</span>
        </div>
        
        <div className="relative px-6 py-3 bg-background/40 backdrop-blur-md rounded-lg border border-[#ffb347]/20 flex items-center space-x-2 animate-pulse-soft">
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#ffb347] rounded-full"></div>
          <Calendar className="h-4 w-4 text-[#ffb347]" />
          <span className="text-sm text-[#ffb347]">Booked Calls</span>
        </div>
        
        <div className="relative px-6 py-3 bg-background/40 backdrop-blur-md rounded-lg border border-[#ffb347]/20 flex items-center space-x-2 animate-pulse-soft">
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#ffb347] rounded-full"></div>
          <DollarSign className="h-4 w-4 text-[#ffb347]" />
          <span className="text-sm text-[#ffb347]">Confirmed Treatments</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
