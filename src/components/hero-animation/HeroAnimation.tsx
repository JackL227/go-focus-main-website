
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import LeadCard from './LeadCard';
import CenterLogo from './CenterLogo';
import { ANIMATION_SETTINGS, generateLeadPositions, CONVERSION_TYPES } from './constants';
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

const NAMES = ['Sarah M.', 'Michael R.', 'Emma W.', 'James L.', 'Lisa K.', 'David P.', 'Anna S.', 'John T.', 
               'Robert Q.', 'Sophia V.', 'Thomas B.', 'Olivia N.', 'William K.', 'Ava D.', 'Alexander C.'];

const HeroAnimation = () => {
  const isMobile = useIsMobile();
  const [processingLead, setProcessingLead] = useState(false);
  const [processMessage, setProcessMessage] = useState('');
  const [leads, setLeads] = useState<Array<{
    id: number;
    removed: boolean;
    absorbed: boolean;
    depth: number; // Controls parallax effect (0-1)
    speed: number; // Controls movement speed (0.5-1.5)
    convertedLead?: {
      name: string;
      action: string;
    };
    position?: {
      x: number;
      y: number;
      originalY: number; // Base position for oscillation
    };
    exitRight?: boolean;
    opacity: number; // Controls transparency based on depth
    scale: number; // Controls size based on depth
  }>>([]);
  
  const [outputCards, setOutputCards] = useState<Array<{
    id: number;
    name: string;
    action: string;
  }>>([]);
  
  const animationActive = useRef(true);
  const leadInterval = useRef<NodeJS.Timeout | null>(null);
  const processingInterval = useRef<NodeJS.Timeout | null>(null);
  const lastProcessedTime = useRef(0);
  
  const getRandomName = useCallback(() => NAMES[Math.floor(Math.random() * NAMES.length)], []);
  
  const getRandomAction = useCallback(() => {
    return CONVERSION_TYPES[Math.floor(Math.random() * CONVERSION_TYPES.length)];
  }, []);
  
  const processLead = useCallback((leadId: number) => {
    if (!animationActive.current) return;
    
    // Ensure we're not processing too many leads at once
    const now = Date.now();
    if (now - lastProcessedTime.current < 2000) return;
    lastProcessedTime.current = now;
    
    setProcessingLead(true);
    const messages = ['Converting lead...', 'Scheduling call...', 'Booking appointment...', 'Qualifying lead...'];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setProcessMessage(randomMessage);
    
    setLeads(prev => prev.map(lead => lead.id === leadId ? {
      ...lead,
      absorbed: true,
      convertedLead: {
        name: getRandomName(),
        action: getRandomAction()
      }
    } : lead));
    
    setTimeout(() => {
      setLeads(prev => {
        const processedLead = prev.find(lead => lead.id === leadId);
        if (processedLead?.convertedLead) {
          setOutputCards(cards => {
            const maxCards = isMobile ? 3 : NAME_CARD_DISPLAY_COUNT;
            const newCards = [{
              id: Date.now(),
              name: processedLead.convertedLead.name,
              action: processedLead.convertedLead.action
            }, ...cards].slice(0, maxCards);
            return newCards;
          });
        }
        return prev.map(lead => lead.id === leadId ? {
          ...lead,
          removed: true
        } : lead);
      });
      setProcessingLead(false);
      setProcessMessage('');
      
      // Schedule the next lead for processing with a slight delay
      setTimeout(() => {
        if (animationActive.current) {
          const nextLeadToProcess = findNextLeadToProcess();
          if (nextLeadToProcess) {
            processLead(nextLeadToProcess.id);
          }
        }
      }, 800);
    }, PROCESSING_DELAY_BASE);
  }, [getRandomName, getRandomAction, isMobile]);
  
  const findNextLeadToProcess = useCallback(() => {
    return leads.find(lead => 
      !lead.absorbed && 
      !lead.removed && 
      !lead.exitRight && 
      !lead.convertedLead);
  }, [leads]);
  
  const addNewLead = useCallback(() => {
    if (!animationActive.current) return;
    
    // Calculate max visible leads based on screen size
    const maxVisibleLeads = isMobile ? MOBILE_LEAD_COUNT : LEAD_COUNT;
    
    // Check if we're already at capacity
    const activeLeads = leads.filter(lead => !lead.removed && !lead.absorbed && !lead.exitRight);
    if (activeLeads.length >= maxVisibleLeads) return;
    
    const positions = generateLeadPositions(1);
    const basePosition = positions[0];
    
    // Generate depth parameters - deeper effect
    const depth = Math.random(); // 0-1 value
    const speed = 0.6 + (depth * 0.9); // Deeper cards move slower
    const opacity = 0.6 + (depth * 0.4); // Deeper cards are more transparent
    const scale = 0.7 + (depth * 0.5); // Deeper cards are smaller
    
    const verticalVariation = Math.random() * 60 - 30;
    const adjustedPosition = {
      x: basePosition.x,
      y: basePosition.y + verticalVariation,
      originalY: basePosition.y + verticalVariation // Store original Y for oscillation
    };
    
    const newLead = {
      id: Date.now(),
      removed: false,
      absorbed: false,
      depth: depth,
      speed: speed,
      position: adjustedPosition,
      exitRight: false,
      opacity: opacity,
      scale: scale
    };
    
    setLeads(prev => [...prev, newLead]);
  }, [leads, isMobile]);
  
  // Initialize animation
  useEffect(() => {
    animationActive.current = true;
    
    // Start with a few leads already on screen
    const initialLeadsCount = isMobile ? 2 : Math.min(4, LEAD_COUNT);
    const initialPositions = generateLeadPositions(initialLeadsCount);
    
    const initialLeads = initialPositions.map((pos, idx) => {
      const depth = Math.random();
      const speed = 0.6 + (depth * 0.9);
      const opacity = 0.6 + (depth * 0.4);
      const scale = 0.7 + (depth * 0.5);
      const verticalVariation = Math.random() * 60 - 30;
      
      return {
        id: Date.now() + idx,
        removed: false,
        absorbed: false,
        depth: depth,
        speed: speed,
        position: {
          x: pos.x + (Math.random() * 100 - 200), // Stagger initial positions
          y: pos.y + verticalVariation,
          originalY: pos.y + verticalVariation
        },
        exitRight: false,
        opacity: opacity,
        scale: scale
      };
    });
    
    setLeads(initialLeads);
    
    // Setup interval to generate new leads
    const setupNextLeadInterval = () => {
      const randomInterval = LEAD_GENERATION_INTERVAL + (Math.random() * 1500 - 750);
      leadInterval.current = setTimeout(() => {
        if (animationActive.current) {
          addNewLead();
          setupNextLeadInterval();
        }
      }, randomInterval);
    };
    
    setupNextLeadInterval();
    
    // Setup interval to process leads
    const setupProcessingInterval = () => {
      processingInterval.current = setTimeout(() => {
        if (animationActive.current) {
          const leadToProcess = findNextLeadToProcess();
          if (leadToProcess) {
            processLead(leadToProcess.id);
          }
          setupProcessingInterval();
        }
      }, 3000 + Math.random() * 2000); // Random interval between 3-5 seconds
    };
    
    // Start the first processing after a short delay
    setTimeout(() => {
      setupProcessingInterval();
    }, 1500);
    
    return () => {
      animationActive.current = false;
      if (leadInterval.current) {
        clearTimeout(leadInterval.current);
      }
      if (processingInterval.current) {
        clearTimeout(processingInterval.current);
      }
    };
  }, [addNewLead, findNextLeadToProcess, processLead, isMobile]);
  
  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden mt-8 mb-12">
      {/* Primary background for the animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background/90 backdrop-blur-sm"></div>
      
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
            staggerDelay={STAGGER_DELAY}
            exitRight={lead.exitRight}
          />
        ))}
      </AnimatePresence>
      
      {/* Output cards (conversions) */}
      <div className={`absolute ${isMobile ? 'bottom-4 left-1/2 -translate-x-1/2' : 'top-1/2 right-8 -translate-y-1/2'} z-20`}>
        <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'flex-col space-y-4'} max-w-[300px]`}>
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
