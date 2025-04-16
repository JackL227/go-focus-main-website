
import React, { useRef, useEffect } from 'react';
import FlowAnimation from './FlowAnimation';

const AnimationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <section id="animation-section" className="relative min-h-[80vh] py-24 flex items-center">
      <div className="absolute inset-0 bg-gradient-to-b from-[#081020] to-[#0A1A30] z-0"></div>
      
      <div ref={sectionRef} className="container-custom relative z-10 opacity-0 transition-opacity duration-700">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            See How Your <span className="text-primary">AI Agent</span> Works
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Your AI agent handles inquiries 24/7, qualifying leads and booking appointments 
            while you focus on delivering exceptional service.
          </p>
        </div>
        
        <div className="relative h-[550px] md:h-[600px] mt-8 overflow-hidden rounded-xl border border-primary/20 bg-background/5 shadow-xl">
          <FlowAnimation />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-background/0 text-center">
            <p className="text-sm md:text-base font-medium text-primary">
              AI-powered automation converts more leads with less effort
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimationSection;
