
import React from 'react';
import BookingWidget from '../../BookingWidget';
import { ArrowRight } from 'lucide-react';

interface CtaSectionProps {
  colorScheme: {
    button: string;
    glow: string;
  };
  urgencyText?: string;
}

const CtaSection: React.FC<CtaSectionProps> = ({ colorScheme, urgencyText }) => {
  return (
    <section id="cta" className="py-16 bg-background/95">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center animate-entrance">
          <h2 className="text-3xl font-bold mb-6">Let's Talk Strategy — Reserve Your Spot Below</h2>
          <p className="text-lg mb-8">We'll analyze your current funnel and show you exactly how our AI can transform your lead conversion.</p>
          
          <div className="max-w-lg mx-auto mb-8">
            <BookingWidget 
              className={`w-full text-white group text-lg px-7 py-4 ${colorScheme.button} ${colorScheme.glow}`}
            >
              <span className="whitespace-normal">Book My Strategy Call Now</span>
              <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1 animate-pulse-soft" />
            </BookingWidget>
          </div>
          
          {urgencyText && (
            <p className="text-red-500 font-semibold mt-6 animate-pulse-soft">{urgencyText}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
