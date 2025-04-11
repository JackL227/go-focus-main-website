
import React from 'react';
import FlowAnimation from './FlowAnimation';

const HeroSection = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center">
      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden">
        <FlowAnimation />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-trader-blue mb-6 opacity-0 animate-fade-in [animation-delay:300ms]">
            Transform Market Chaos Into <span className="text-trader-green">Clear Trading Strategy</span>
          </h1>
          
          <p className="text-xl text-trader-gray-dark mb-8 opacity-0 animate-fade-in [animation-delay:600ms]">
            Stop guessing. Start trading with confidence through personalized mentorship, proven risk management, and psychology mastery.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in [animation-delay:900ms]">
            <a href="#contact" className="btn-secondary text-center">
              Book Your Free Strategy Call
            </a>
            <a href="#program" className="btn-primary text-center">
              Explore the Program
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
