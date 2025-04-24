
import React, { useRef, useEffect } from 'react';
import FlowAnimation from './FlowAnimation';
import { useIsMobile } from '@/hooks/use-mobile';

const AnimationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = sectionRef.current;
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <div id="animation-section" className="relative min-h-[500px] py-8 flex items-center -mt-24">
      <div className="absolute inset-0 bg-gradient-to-b from-[#081020] to-[#0A1A30] z-0"></div>
      
      <div ref={sectionRef} className="container-custom relative z-10 opacity-0 transition-opacity duration-700">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          <span className="text-primary">24/7 Lead Conversion</span> in Action
        </h2>
        <p className="text-lg text-center text-foreground/80 max-w-2xl mx-auto mb-8">
          {isMobile 
            ? "See how our AI processes leads and books calls automatically."
            : "Watch how our AI automatically processes inbound leads, qualifies prospects, and books appointments - all while you focus on growing your business."
          }
        </p>
        <div className="relative h-[450px] md:h-[600px]">
          <FlowAnimation />
        </div>
      </div>
    </div>
  );
};

export default AnimationSection;
