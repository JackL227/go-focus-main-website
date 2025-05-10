
import React, { useState, useEffect } from 'react';
import { useGsapHeroAnimation } from '@/hooks/use-gsap-hero-animation';
import CenterLogo from './CenterLogo';
import { useIsMobile } from '@/hooks/use-mobile';
import LeadCard from './LeadCard';
import OutputCard from './OutputCard';
import { motion, AnimatePresence } from 'framer-motion';
import { CONVERSION_TYPES } from './constants';

const HeroAnimation = () => {
  const { containerRef, logoRef } = useGsapHeroAnimation();
  const isMobile = useIsMobile();
  const [visibleLeads, setVisibleLeads] = useState<{id: number, text: string, status: 'waiting' | 'moving' | 'absorbed'}[]>([]);
  const [visibleOutputs, setVisibleOutputs] = useState<{name: string, action: string, index: number}[]>([]);
  
  // Mobile-specific animation using Framer Motion instead of GSAP for better mobile performance
  useEffect(() => {
    if (!isMobile) return; // Only run for mobile
    
    const leadTexts = ["New Lead", "Potential Client", "Website Visitor", "Prospect", "New Contact"];
    const nameTexts = ["Michael B.", "Sarah T.", "John D.", "Emma L.", "Robert K.", "Lisa M."];
    
    let leadCounter = 0;
    let outputCounter = 0;
    let interval: NodeJS.Timeout;
    let cleanupTimeouts: NodeJS.Timeout[] = [];
    
    const createLeadCard = () => {
      const id = leadCounter++;
      const leadText = leadTexts[Math.floor(Math.random() * leadTexts.length)];
      
      setVisibleLeads(prev => [...prev, { id, text: leadText, status: 'waiting' }]);
      
      // After a delay, change status to 'moving'
      const movingTimeout = setTimeout(() => {
        setVisibleLeads(prev => 
          prev.map(lead => lead.id === id ? { ...lead, status: 'moving' } : lead)
        );
      }, 1000);
      cleanupTimeouts.push(movingTimeout);
      
      // After another delay, change status to 'absorbed' and create output
      const absorbedTimeout = setTimeout(() => {
        setVisibleLeads(prev => 
          prev.map(lead => lead.id === id ? { ...lead, status: 'absorbed' } : lead)
        );
        
        // After absorption, remove the lead and create output
        const removeTimeout = setTimeout(() => {
          setVisibleLeads(prev => prev.filter(lead => lead.id !== id));
          createOutputCard();
        }, 800);
        cleanupTimeouts.push(removeTimeout);
      }, 2500);
      cleanupTimeouts.push(absorbedTimeout);
    };
    
    const createOutputCard = () => {
      const idx = outputCounter++;
      const name = nameTexts[Math.floor(Math.random() * nameTexts.length)];
      const action = CONVERSION_TYPES[Math.floor(Math.random() * CONVERSION_TYPES.length)];
      
      setVisibleOutputs(prev => [...prev, { name, action, index: idx }]);
      
      // Remove the output card after animation completes
      const removeOutputTimeout = setTimeout(() => {
        setVisibleOutputs(prev => prev.filter(output => output.index !== idx));
      }, 5000);
      cleanupTimeouts.push(removeOutputTimeout);
    };
    
    // Start the animation cycle
    interval = setInterval(() => {
      createLeadCard();
    }, 3000); // Slower interval for mobile
    
    return () => {
      clearInterval(interval);
      cleanupTimeouts.forEach(timeout => clearTimeout(timeout));
      setVisibleLeads([]);
      setVisibleOutputs([]);
    };
  }, [isMobile]);
  
  return (
    <div 
      ref={containerRef}
      className={`relative w-full ${isMobile ? 'h-[340px]' : 'h-[340px] md:h-[400px]'} overflow-hidden mt-4 mb-6 bg-transparent`}
      aria-label="AI agent animation showing leads being converted into bookings"
    >
      {/* Center - GoFocus.ai logo */}
      <div 
        ref={logoRef}
        className={`absolute inset-0 flex items-center justify-center pointer-events-none ${isMobile ? 'scale-90' : ''}`}
      >
        <CenterLogo processingLead={true} />
      </div>
      
      {/* Mobile-specific animation elements using Framer Motion for better mobile performance */}
      {isMobile && (
        <>
          {/* Lead cards container - positioned on left side */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-start justify-center gap-4 pl-2 w-[45%]">
            <AnimatePresence>
              {visibleLeads.map(lead => (
                <LeadCard 
                  key={lead.id} 
                  id={lead.id} 
                  text={lead.text}
                  status={lead.status}
                  delay={lead.id * 0.2}
                />
              ))}
            </AnimatePresence>
          </div>
          
          {/* Output cards container - positioned on right side */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-end justify-center gap-4 pr-2 w-[45%]">
            <AnimatePresence>
              {visibleOutputs.map((output, idx) => (
                <OutputCard 
                  key={`${output.name}-${output.index}`}
                  name={output.name}
                  action={output.action}
                  index={idx} 
                  isMobile={true}
                />
              ))}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
};

export default HeroAnimation;
