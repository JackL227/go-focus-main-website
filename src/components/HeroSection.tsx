
import React from 'react';
import FluidAnimation from './FluidAnimation';
import { Button } from './ui/button';
import { ArrowDown, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const scrollToAnimation = () => {
    const animationSection = document.getElementById('animation-section');
    if (animationSection) {
      animationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <>
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
            
            <div className="mt-16 opacity-0 animate-fade-in [animation-delay:1200ms]">
              <Button 
                variant="ghost" 
                onClick={scrollToAnimation}
                className="text-foreground/60 hover:text-foreground hover:bg-background/20"
              >
                Explore The System
                <ArrowDown className="ml-2 h-4 w-4 animate-bounce" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Flow Animation Section */}
      <section id="animation-section" className="min-h-[90vh] relative flex flex-col items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <FlowAnimationCanvas />
        </div>
        
        <div className="container relative z-10 text-center">
          <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-primary mb-6 opacity-0 animate-fade-in [animation-delay:300ms]">
              Convert <span className="text-[#ffc107]">Trading Leads</span> Into <span className="text-[#4caf50]">High-Ticket Clients</span>
            </h2>
            <p className="text-lg text-foreground mb-8">
              Our AI system automates lead qualification and booking, directing only the best prospects to your calendar—letting you focus on closing deals.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="glass-card p-6 flex flex-col items-center text-center hover-lift">
                <div className="feature-icon-wrapper mb-4">
                  <div className="w-6 h-6 text-[#4caf50]">✓</div>
                </div>
                <h3 className="text-lg font-medium mb-2">Qualified Leads</h3>
                <p className="text-sm text-foreground/80">
                  AI filters out time-wasters and identifies serious traders ready to invest.
                </p>
              </div>
              
              <div className="glass-card p-6 flex flex-col items-center text-center hover-lift">
                <div className="feature-icon-wrapper mb-4">
                  <div className="w-6 h-6 text-[#ff9800]">📅</div>
                </div>
                <h3 className="text-lg font-medium mb-2">Booked Calls</h3>
                <p className="text-sm text-foreground/80">
                  Automated scheduling that syncs with your calendar while you sleep.
                </p>
              </div>
              
              <div className="glass-card p-6 flex flex-col items-center text-center hover-lift">
                <div className="feature-icon-wrapper mb-4">
                  <div className="w-6 h-6 text-[#ffc107]">💰</div>
                </div>
                <h3 className="text-lg font-medium mb-2">Confirmed Treatments</h3>
                <p className="text-sm text-foreground/80">
                  Close deals with pre-qualified clients ready to commit to your program.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
