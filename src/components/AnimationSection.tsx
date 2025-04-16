
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
        <div className="relative h-[550px] md:h-[600px] mt-8 overflow-hidden rounded-xl border border-primary/20 bg-background/5 shadow-xl">
          <FlowAnimation />
          
          <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-background/90 to-background/0">
            <div className="flex flex-col md:flex-row justify-center gap-8 items-center text-center">
              <div className="flex-1">
                <div className="inline-block p-2 rounded-full bg-[#00E676]/20 text-[#00E676] mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-medium text-[#00E676]">Qualified</h3>
              </div>
              
              <div className="flex-1">
                <div className="inline-block p-2 rounded-full bg-primary/20 text-primary mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-medium text-primary">Booked Call</h3>
              </div>
              
              <div className="flex-1">
                <div className="inline-block p-2 rounded-full bg-[#FFC107]/20 text-[#FFC107] mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-[#FFC107]">Closed Deal</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationSection;
