import React, { useEffect, useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import LeadCard from './LeadCard';
import CenterLogo from './CenterLogo';
import { ANIMATION_SETTINGS, generateLeadPositions } from './constants';
import ProcessMessage from './ProcessMessage';
import OutputCard from './OutputCard';

const {
  LEAD_COUNT,
  LEAD_GENERATION_INTERVAL,
  PROCESSING_DELAY_BASE,
  CONVERSION_DISPLAY_DURATION,
  STAGGER_DELAY,
  MOBILE_LEAD_COUNT,
  NAME_CARD_DISPLAY_COUNT
} = ANIMATION_SETTINGS;

const NAMES = ['Sarah M.', 'Michael R.', 'Emma W.', 'James L.', 'Lisa K.', 'David P.', 'Anna S.', 'John T.'];
const ACTIONS = ['scheduled a call', 'booked a session', 'joined program', 'started trial'];

const HeroAnimation = () => {
  const isMobile = useIsMobile();
  const [processingLead, setProcessingLead] = useState(false);
  const [processMessage, setProcessMessage] = useState('');
  const [leads, setLeads] = useState<Array<{
    id: number;
    removed: boolean;
    absorbed: boolean;
    depth: number; // Controls parallax effect (0-1)
    convertedLead?: {
      name: string;
      action: string;
    };
    position?: {
      x: number;
      y: number;
    };
    exitRight?: boolean;
  }>>([]);
  
  const [outputCards, setOutputCards] = useState<Array<{
    id: number;
    name: string;
    action: string;
  }>>([]);
  
  const animationActive = useRef(true);
  const leadInterval = useRef<NodeJS.Timeout | null>(null);
  
  const getRandomName = useCallback(() => NAMES[Math.floor(Math.random() * NAMES.length)], []);
  const getRandomAction = useCallback(() => ACTIONS[Math.floor(Math.random() * ACTIONS.length)], []);
  
  // Process lead with enhanced visual feedback
  const processLead = useCallback((leadId: number) => {
    if (!animationActive.current) return;
    
    setProcessingLead(true);
    
    // Show processing message
    const messages = [
      'Converting lead...',
      'Scheduling call...',
      'Booking appointment...',
      'Qualifying lead...',
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setProcessMessage(randomMessage);
    
    // Update lead to absorbed state
    setLeads(prev => prev.map(lead => lead.id === leadId ? {
      ...lead,
      absorbed: true,
      convertedLead: {
        name: getRandomName(),
        action: getRandomAction()
      }
    } : lead));
    
    // After processing delay, finalize the lead transformation
    setTimeout(() => {
      setLeads(prev => {
        const processedLead = prev.find(lead => lead.id === leadId);
        
        // Add the output card if the lead was processed
        if (processedLead?.convertedLead) {
          setOutputCards(cards => {
            // Keep only the most recent cards (based on mobile or desktop)
            const maxCards = isMobile ? 3 : NAME_CARD_DISPLAY_COUNT;
            const newCards = [
              {
                id: Date.now(),
                name: processedLead.convertedLead.name,
                action: processedLead.convertedLead.action
              },
              ...cards
            ].slice(0, maxCards);
            
            return newCards;
          });
        }
        
        // Remove the processed lead
        return prev.map(lead => lead.id === leadId ? {
          ...lead,
          removed: true
        } : lead);
      });
      
      // Reset processing state
      setProcessingLead(false);
      setProcessMessage('');
      
      // Add a new lead after a short delay
      setTimeout(() => {
        if (animationActive.current) {
          addNewLead();
        }
      }, 800);
    }, PROCESSING_DELAY_BASE);
  }, [getRandomName, getRandomAction, isMobile]);
  
  // Add a new lead with enhanced spatial positioning
  const addNewLead = useCallback(() => {
    if (!animationActive.current) return;
    
    const positions = generateLeadPositions(isMobile ? MOBILE_LEAD_COUNT : LEAD_COUNT);
    const randomIndex = Math.floor(Math.random() * positions.length);
    const basePosition = positions[randomIndex];
    
    // Add randomized vertical position for natural look
    const verticalVariation = Math.random() * 30 - 15; // -15px to +15px
    
    // Random depth for parallax effect (0 = furthest, 1 = closest)
    const depth = Math.random();
    
    const adjustedPosition = {
      x: basePosition.x,
      y: basePosition.y + verticalVariation
    };
    
    const newLead = {
      id: Date.now(),
      removed: false,
      absorbed: false,
      depth: depth,
      position: adjustedPosition,
      exitRight: false
    };
    
    setLeads(prev => {
      const activeLeads = prev.filter(lead => !lead.removed && !lead.exitRight);
      const maxVisibleLeads = isMobile ? MOBILE_LEAD_COUNT : LEAD_COUNT;
      
      if (activeLeads.length >= maxVisibleLeads) {
        return prev;
      }
      
      return [...prev, newLead];
    });
  }, [isMobile]);
  
  // Initialize animation
  useEffect(() => {
    animationActive.current = true;
    
    // Start with one lead
    const initialPosition = generateLeadPositions(1)[0];
    const verticalVariation = Math.random() * 20 - 10;
    
    setLeads([{
      id: Date.now(),
      removed: false,
      absorbed: false,
      depth: Math.random(),
      position: {
        x: initialPosition.x,
        y: initialPosition.y + verticalVariation
      },
      exitRight: false
    }]);
    
    // Set up interval for new leads with slightly randomized timing
    const setupNextLeadInterval = () => {
      // Random interval between 3-5 seconds for natural feel
      const randomInterval = LEAD_GENERATION_INTERVAL + (Math.random() * 2000 - 1000);
      
      leadInterval.current = setTimeout(() => {
        if (animationActive.current) {
          addNewLead();
          setupNextLeadInterval(); // Set up the next interval
        }
      }, randomInterval);
    };
    
    setupNextLeadInterval();
    
    return () => {
      animationActive.current = false;
      if (leadInterval.current) {
        clearTimeout(leadInterval.current);
      }
    };
  }, [addNewLead]);
  
  // Process leads when they're ready
  useEffect(() => {
    if (!processingLead && leads.length > 0 && animationActive.current) {
      const leadToProcess = leads.find(lead => !lead.absorbed && !lead.removed && !lead.exitRight && !lead.convertedLead);
      
      if (leadToProcess) {
        const processingDelay = PROCESSING_DELAY_BASE + leads.indexOf(leadToProcess) * 600;
        setTimeout(() => {
          processLead(leadToProcess.id);
        }, processingDelay);
      }
    }
  }, [leads, processingLead, processLead]);
  
  return (
    <div className="relative h-[280px] sm:h-[380px] w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-background/50 to-background/80">
      {/* Subtle gradient background animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent animate-pulse-soft"></div>
      </div>
      
      {/* Center Logo */}
      <CenterLogo 
        processingLead={processingLead}
        onLeadProcess={() => {}}
      />
      
      {/* Processing Message */}
      {processMessage && (
        <ProcessMessage message={processMessage} />
      )}
      
      {/* Lead Cards Animation */}
      <AnimatePresence>
        {leads.map((lead, index) => (
          <LeadCard
            key={lead.id}
            index={index}
            isAbsorbed={lead.absorbed}
            position={lead.position}
            depth={lead.depth}
            isConverted={!!lead.convertedLead}
            name={lead.convertedLead?.name}
            action={lead.convertedLead?.action}
            exitRight={lead.exitRight}
            onComplete={() => processLead(lead.id)}
            staggerDelay={STAGGER_DELAY}
          />
        ))}
      </AnimatePresence>
      
      {/* Output Cards - Name cards showing conversion results */}
      <div className={`absolute ${isMobile ? 'bottom-0 left-0 right-0 flex overflow-x-auto p-4 space-x-3 pb-10' : 'top-1/2 right-8 transform -translate-y-1/2 flex flex-col max-w-[220px]'}`}>
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
      
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background opacity-40"></div>
        <div className="absolute left-0 right-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
      </div>
    </div>
  );
};

export default HeroAnimation;
