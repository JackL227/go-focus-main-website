
import React from 'react';
import { useHeroTransformAnimation } from '@/hooks/use-hero-transform-animation';
import LeadCard from './LeadCard';
import CenterLogo from './CenterLogo';
import ConfirmationCard from './ConfirmationCard';

const HeroAnimation = () => {
  const { 
    leadCards,
    confirmations,
    processingLead
  } = useHeroTransformAnimation();
  
  return (
    <div 
      className="relative w-full h-[300px] md:h-[380px] overflow-hidden mt-6 mb-8" 
      aria-label="AI agent animation showing leads being converted into bookings"
    >
      {/* Left side - Lead cards */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-10">
        {leadCards.map((lead) => (
          <LeadCard 
            key={lead.id} 
            text={lead.text}
            status={lead.status}
            delay={lead.delay}
          />
        ))}
      </div>
      
      {/* Center - GoFocus.ai logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <CenterLogo processingLead={processingLead} />
      </div>
      
      {/* Right side - Confirmation cards */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-10">
        {confirmations.map((card) => (
          <ConfirmationCard
            key={card.id}
            name={card.name}
            action={card.action}
            delay={card.delay}
            path={card.path}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroAnimation;
