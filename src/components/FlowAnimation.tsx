
import React, { useState, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import LeadFlow from './hero-animation/LeadFlow';
import CenterLogo from './hero-animation/CenterLogo';
import NameCardsFlow from './hero-animation/NameCardsFlow';

const NAMES = [
  "John D", "Sarah M", "Michael T", "Emma R", "Daniel P", 
  "Lisa W", "Thomas B", "Ashley K", "Robert J", "Jennifer L",
  "Alex H", "Sophia G", "William F", "Olivia N", "James C"
];

const FlowAnimation = () => {
  const isMobile = useIsMobile();
  const [processingLead, setProcessingLead] = useState(false);
  
  const handleLeadProcessed = useCallback(() => {
    setProcessingLead(true);
    setTimeout(() => setProcessingLead(false), 800);
  }, []);
  
  return (
    <div className="relative w-full h-[600px] bg-[#010101] overflow-hidden">
      {/* Lead cards flowing from left */}
      <LeadFlow onLeadProcessed={handleLeadProcessed} maxVisibleLeads={isMobile ? 5 : 7} />
      
      {/* Center logo with glow effect */}
      <CenterLogo isProcessing={processingLead} />
      
      {/* Name cards flowing to the right */}
      <NameCardsFlow 
        names={NAMES} 
        maxVisible={isMobile ? 3 : 5} 
        isProcessing={processingLead} 
      />
    </div>
  );
};

export default FlowAnimation;
