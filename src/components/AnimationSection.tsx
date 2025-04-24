
import React, { useRef, useEffect } from 'react';
import FlowAnimation from './FlowAnimation';
import { useIsMobile } from '@/hooks/use-mobile';

const AnimationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
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
    const content = contentRef.current;
    
    if (section) {
      observer.observe(section);
    }
    
    if (content) {
      observer.observe(content);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
      if (content) {
        observer.unobserve(content);
      }
    };
  }, []);

  return (
    <div id="animation-section" className="relative min-h-[600px] md:min-h-[700px] py-12 md:py-16 flex items-center -mt-24">
      {/* Enhanced background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#081020] to-[#0A1A30] z-0"></div>
      
      {/* Ambient glow effects */}
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-[#00E676]/5 rounded-full blur-3xl"></div>
      
      <div ref={sectionRef} className="container-custom relative z-10 opacity-0 transition-opacity duration-700">
        <div ref={contentRef} className="text-center mb-8 opacity-0 transition-all duration-500">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="relative">
              <span className="relative z-10">24/7 Lead Conversion</span>
              <span className="absolute bottom-2 left-0 h-3 w-full bg-primary/20 -z-0"></span>
            </span> in Action
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-8">
            {isMobile 
              ? "See how our AI processes leads and books calls automatically."
              : "Watch how our AI automatically processes inbound leads, qualifies prospects, and books appointments - all while you focus on growing your business."
            }
          </p>
        </div>
        
        <div className="relative h-[450px] md:h-[600px] rounded-lg overflow-hidden border border-foreground/5 shadow-2xl" style={{
          background: "linear-gradient(to bottom, rgba(10, 20, 40, 0.8), rgba(5, 10, 25, 0.9))",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.05)"
        }}>
          <FlowAnimation />
        </div>
      </div>
    </div>
  );
};

export default AnimationSection;
