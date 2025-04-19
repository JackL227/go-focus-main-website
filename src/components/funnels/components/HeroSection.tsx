
import React from 'react';
import BookingWidget from '../../BookingWidget';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  headline: string;
  subheadline: string;
  colorScheme: {
    button: string;
    glow: string;
  };
}

const HeroSection: React.FC<HeroSectionProps> = ({
  headline,
  subheadline,
  colorScheme,
}) => {
  return (
    <section className="relative min-h-[90vh] flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-b from-background/10 to-background/5 opacity-10"></div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/95 to-background z-[1]"></div>
      
      <div className="container-custom relative z-10 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12 rounded-xl overflow-hidden shadow-2xl animate-entrance transition-all duration-700">
            <div className="aspect-video bg-black/5 flex items-center justify-center">
              <p className="text-foreground/50">Video Coming Soon</p>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-entrance">
            {headline}
          </h1>
          
          <p className="text-xl text-foreground/90 mb-8 animate-entrance max-w-3xl mx-auto">
            {subheadline}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-entrance">
            <BookingWidget 
              className={`text-white group text-lg px-7 py-3 w-full sm:w-auto ${colorScheme.button} ${colorScheme.glow}`}
            >
              <span className="whitespace-normal">Book My Strategy Call Now</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 animate-pulse-soft" />
            </BookingWidget>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
