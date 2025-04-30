
import React from 'react';
import { useGsapHeroAnimation } from '@/hooks/use-gsap-hero-animation';
import CenterLogo from './CenterLogo';

const HeroAnimation = () => {
  const { containerRef, logoRef } = useGsapHeroAnimation();
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[340px] md:h-[400px] overflow-hidden mt-6 mb-8 bg-transparent" 
      aria-label="AI agent animation showing leads being converted into bookings"
    >
      {/* Center - GoFocus.ai logo */}
      <div 
        ref={logoRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <CenterLogo processingLead={true} />
      </div>
    </div>
  );
};

export default HeroAnimation;
