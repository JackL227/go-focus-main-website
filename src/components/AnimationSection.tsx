
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
      className="w-full min-h-[500px] md:min-h-[600px] py-16 relative opacity-0"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">
          Our AI-Powered Lead Generation Process
        </h2>
      </div>
      <div className="w-full h-[400px] md:h-[500px]">
        <FlowAnimation />
      </div>
    </section>
  );
};

export default AnimationSection;
