
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
    <div id="animation-section" className="relative min-h-[80vh] py-24 flex items-center">
      <div className="absolute inset-0 bg-gradient-to-b from-[#081020] to-[#0A1A30] z-0"></div>
      
      <div ref={sectionRef} className="container-custom relative z-10 opacity-0 transition-opacity duration-700">
        <div className="relative h-[550px] md:h-[600px] mt-8">
          <FlowAnimation />
        </div>
      </div>
    </div>
  );
};

export default AnimationSection;
