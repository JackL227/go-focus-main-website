
import React from 'react';
import { useGsapHeroAnimation } from '@/hooks/use-gsap-hero-animation';
import CenterLogo from './CenterLogo';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroAnimation = () => {
  const { containerRef, logoRef } = useGsapHeroAnimation();
  const isMobile = useIsMobile();
  
  return (
    <div 
      ref={containerRef}
      className={`relative w-full ${isMobile ? 'h-[280px]' : 'h-[340px] md:h-[400px]'} overflow-hidden mt-4 mb-6 bg-transparent`}
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
