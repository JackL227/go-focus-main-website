
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHeroAnimation } from '@/hooks/use-hero-animation';
import { useIsMobile } from '@/hooks/use-mobile';
import CenterLogo from './hero-animation/CenterLogo';
import LeadCard from './hero-animation/LeadCard';
import OutputCard from './hero-animation/OutputCard';
import ProcessMessage from './hero-animation/ProcessMessage';

const AnimationSection = () => {
  const isMobile = useIsMobile();
  const { 
    leads,
    outputCards,
    processingLead,
    processMessage
  } = useHeroAnimation(isMobile);
  
  return (
    <div 
      className="relative w-full h-[300px] md:h-[380px] overflow-hidden mt-4 mb-10 z-0" 
      aria-label="AI agent animation showing leads being converted into bookings"
    >
      {/* Left side - Lead cards */}
      <div className="absolute left-0 top-0 bottom-0 w-1/3 flex items-center justify-center">
        <AnimatePresence>
          {leads.filter(lead => !lead.absorbed && !lead.removed).map((lead) => (
            <LeadCard 
              key={lead.id}
              position={lead.position || { x: 0, y: 0, originalY: 0 }}
              depth={lead.depth}
              opacity={lead.opacity}
              scale={lead.scale}
              absorbed={lead.absorbed}
              removed={lead.removed}
            />
          ))}
        </AnimatePresence>
      </div>
      
      {/* Center - GoFocus.ai logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <CenterLogo processingLead={processingLead} />
        {processingLead && processMessage && (
          <ProcessMessage message={processMessage} />
        )}
      </div>
      
      {/* Right side - Output cards */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 flex flex-col items-center justify-center">
        <AnimatePresence>
          {outputCards.map((card, index) => (
            <OutputCard
              key={card.id}
              name={card.name}
              action={card.action}
              index={index}
              isMobile={isMobile}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AnimationSection;
