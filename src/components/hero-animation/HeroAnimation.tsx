
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import LeadCard from './LeadCard';
import CenterLogo from './CenterLogo';
import ProcessMessage from './ProcessMessage';
import OutputCard from './OutputCard';
import { useHeroAnimation } from '@/hooks/use-hero-animation';

const HeroAnimation = () => {
  const isMobile = useIsMobile();
  const { 
    processingLead, 
    processMessage, 
    leads, 
    outputCards 
  } = useHeroAnimation(isMobile);
  
  return (
    <div 
      className="relative w-full h-[280px] md:h-[350px] lg:h-[420px] overflow-hidden mt-6 mb-8" 
      aria-label="AI agent animation showing leads being converted into customers"
    >
      {/* Center logo for lead absorption */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <CenterLogo processingLead={processingLead} />
      </div>
      
      {/* Processing message display */}
      {processMessage && (
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
          <ProcessMessage message={processMessage} />
        </div>
      )}
      
      {/* Animated lead cards */}
      <AnimatePresence>
        {leads.map((lead) => (
          <LeadCard
            key={lead.id}
            index={leads.indexOf(lead)}
            isAbsorbed={lead.absorbed}
            position={lead.position}
            depth={lead.depth}
            speed={lead.speed}
            opacity={lead.opacity}
            scale={lead.scale}
            exitRight={lead.exitRight}
            isConverted={false}
          />
        ))}
      </AnimatePresence>
      
      {/* Output cards (conversions) */}
      <div className={`absolute ${isMobile ? 'bottom-4 right-4' : 'top-1/2 right-8 -translate-y-1/2'} z-20`}>
        <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'flex-col space-y-3'} max-w-[280px]`}>
          <AnimatePresence>
            {outputCards.map((card, index) => (
              <OutputCard
                key={card.id}
                name={card.name}
                action={card.action}
                index={index}
                isMobile={!!isMobile}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default HeroAnimation;
