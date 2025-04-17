
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/App';

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handlePrimaryAction = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      // Open modal or redirect to booking page
      window.open('https://calendly.com', '_blank');
    }
  };

  const handleSecondaryAction = () => {
    // Scroll to how it works section
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-36 pb-16 md:pt-44 md:pb-24 container mx-auto px-4 md:px-8">
      {/* Background gradient elements */}
      <div className="absolute top-20 -left-64 w-96 h-96 bg-primary/30 rounded-full filter blur-3xl opacity-20 animate-pulse-soft"></div>
      <div className="absolute bottom-10 -right-64 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl opacity-20 animate-pulse-soft"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-gradient-blue text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          AI Agents That Convert Leads Into Revenue — While You Sleep.
        </h1>
        
        <p className="text-xl md:text-2xl text-foreground/90 mb-8 max-w-3xl mx-auto">
          Go Focus AI builds custom AI closers and voice assistants that respond, qualify, follow-up, and book appointments 24/7.
        </p>
        
        <p className="text-lg text-foreground/70 mb-10">
          Built for Trading Mentors, Med Spas & Vehicle Aesthetic Experts.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <Button 
            size="lg" 
            className="text-md px-8 py-6 bg-primary hover:bg-primary/90"
            onClick={handlePrimaryAction}
          >
            {user ? 'Go to Dashboard' : 'Book a Demo'}
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="text-md px-8 py-6"
            onClick={handleSecondaryAction}
          >
            See How It Works
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        {/* Floating message bubbles */}
        <div className="relative h-32 mt-12 hidden md:block">
          <div className="absolute top-0 left-8 glass-card p-3 rounded-lg max-w-xs animate-float shadow-lg">
            <p className="text-sm">How much is Botox?</p>
          </div>
          
          <div className="absolute top-10 right-16 glass-card p-3 rounded-lg max-w-xs animate-float shadow-lg" style={{ animationDelay: "1.5s" }}>
            <p className="text-sm">What's the cost of this wrap?</p>
          </div>
          
          <div className="absolute bottom-0 left-1/3 glass-card p-3 rounded-lg max-w-xs animate-float shadow-lg" style={{ animationDelay: "1s" }}>
            <p className="text-sm">Is your course beginner-friendly?</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
