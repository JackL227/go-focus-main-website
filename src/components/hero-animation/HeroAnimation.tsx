
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
  RESULT_EMERGENCE_DELAY,
  MOBILE_SCALE_FACTOR
} = ANIMATION_SETTINGS;

const NAMES = ['Sarah M.', 'Michael R.', 'Emma W.', 'James L.', 'Lisa K.', 'David P.', 'Anna S.', 'John T.', 
               'Robert Q.', 'Sophia V.', 'Thomas B.', 'Olivia N.', 'William K.', 'Ava D.', 'Alexander C.'];

type Lead = {
  id: number;
  removed: boolean;
  absorbed: boolean;
  depth: number;
  speed: number;
  position?: {
    x: number;
    y: number;
    originalY: number;
  };
  exitRight?: boolean;
  opacity: number;
  scale: number;
  convertedLead?: {
    name: string;
    action: string;
  };
};

const HeroAnimation = () => {
  const isMobile = useIsMobile();
  const [processingLead, setProcessingLead] = useState(false);
  const [processMessage, setProcessMessage] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
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
  
  // Process a lead and convert it into a name card
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
    
    // Mark the lead as absorbed
    setLeads(prev => prev.map(lead => lead.id === leadId ? {
      ...lead,
      absorbed: true,
      convertedLead: {
        name: getRandomName(),
        action: getRandomAction()
      }
    } : lead));
    
    // After absorption delay, create the output card
    setTimeout(() => {
      setLeads(prev => {
        const processedLead = prev.find(lead => lead.id === leadId);
        if (processedLead?.convertedLead) {
          // Add the converted lead to output cards
          setOutputCards(cards => {
            const maxCards = isMobile ? 3 : 8;
            const newCards = [{
              id: Date.now(),
              name: processedLead.convertedLead.name,
              action: processedLead.convertedLead.action
            }, ...cards].slice(0, maxCards);
            return newCards;
          });
        }
        // Mark the lead as removed
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
    }, RESULT_EMERGENCE_DELAY);
  }, [getRandomName, getRandomAction, isMobile]);
  
  // Find a lead that's close to the center to process
  const findNextLeadToProcess = useCallback(() => {
    return leads.find(lead => 
      !lead.absorbed && 
      !lead.removed && 
      !lead.exitRight && 
      !lead.convertedLead &&
      // Find leads that are close enough to the center to be processed
      lead.position && 
      Math.sqrt(Math.pow(lead.position.x, 2) + Math.pow(lead.position.y, 2)) < 180
    );
  }, [leads]);
  
  // Add a new lead to the animation
  const addNewLead = useCallback(() => {
    if (!animationActive.current) return;
    
    // Calculate max visible leads based on screen size
    const maxVisibleLeads = isMobile ? 5 : 10;
    
    // Check if we're already at capacity
    const activeLeads = leads.filter(lead => !lead.removed && !lead.absorbed && !lead.exitRight);
    if (activeLeads.length >= maxVisibleLeads) return;
    
    const positions = generateLeadPositions(1);
    const basePosition = positions[0];
    
    // Generate depth parameters with enhanced 3D effect
    const depth = Math.random(); // 0-1 value
    const speed = 0.6 + (depth * 0.9); // Deeper cards move slower
    const opacity = 0.6 + (depth * 0.4); // Deeper cards are more transparent
    const scale = 0.7 + (depth * 0.5); // Deeper cards are smaller
    
    // Add more vertical variation for natural flow
    const verticalVariation = Math.random() * 80 - 40;
    const adjustedPosition = {
      x: basePosition.x - (Math.random() * 50), // Add horizontal variance
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
    
    // Clean up old leads to prevent memory buildup
    setLeads(prev => {
      const oldLeads = prev.filter(lead => lead.removed && lead.id < Date.now() - 10000);
      if (oldLeads.length > 10) {
        return prev.filter(lead => !oldLeads.includes(lead));
      }
      return prev;
    });
  }, [leads, isMobile]);
  
  // Initialize animation
  useEffect(() => {
    animationActive.current = true;
    
    // Start with a few leads already on screen with better distribution
    const initialLeadsCount = isMobile ? 3 : 6;
    const initialPositions = generateLeadPositions(initialLeadsCount);
    
    const initialLeads = initialPositions.map((pos, idx) => {
      const depth = Math.random();
      const speed = 0.6 + (depth * 0.9);
      const opacity = 0.6 + (depth * 0.4);
      const scale = 0.7 + (depth * 0.5);
      
      // Create more varied starting positions for a natural feel
      const verticalVariation = Math.random() * 80 - 40;
      const horizontalVariation = Math.random() * 150 - 75;
      
      return {
        id: Date.now() + idx,
        removed: false,
        absorbed: false,
        depth: depth,
        speed: speed,
        position: {
          x: pos.x + horizontalVariation, // More horizontal variance
          y: pos.y + verticalVariation,
          originalY: pos.y + verticalVariation
        },
        exitRight: false,
        opacity: opacity,
        scale: scale
      };
    });
    
    setLeads(initialLeads);
    
    // Setup interval to generate new leads with slight randomness for natural flow
    const setupNextLeadInterval = () => {
      // Randomize interval for more natural flow
      const randomInterval = LEAD_GENERATION_INTERVAL + (Math.random() * 1800 - 900);
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
      // Find leads that are close to the center
      const leadToProcess = findNextLeadToProcess();
      
      if (leadToProcess) {
        processLead(leadToProcess.id);
      }
      
      // Schedule next processing attempt
      processingInterval.current = setTimeout(() => {
        if (animationActive.current) {
          setupProcessingInterval();
        }
      }, 2500 + Math.random() * 1500); // Random interval between 2.5-4 seconds
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
