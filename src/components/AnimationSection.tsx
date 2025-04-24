
import React, { useRef, useEffect } from 'react';
import FlowAnimation from './FlowAnimation';
import { useIsMobile } from '@/hooks/use-mobile';

const AnimationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.classList.remove('opacity-0');
        }
      });
    }, {
      threshold: 0.1
    });
    
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
    <section 
      ref={sectionRef}
      className="w-full py-12 md:py-24 opacity-0 transition-opacity duration-1000"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-white">
          How Our AI Works
        </h2>
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-5xl h-[400px] md:h-[600px]">
            <FlowAnimation />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimationSection;
