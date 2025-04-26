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
  
  const processLead = useCallback((leadId: number) => {
    if (!animationActive.current) return;
    
    setProcessingLead(true);
    
    const messages = [
      'Converting lead...',
      'Scheduling call...',
      'Booking appointment...',
      'Qualifying lead...',
    ];
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
        
        return prev.map(lead => lead.id === leadId ? {
          ...lead,
          removed: true
        } : lead);
      });
      
      setProcessingLead(false);
      setProcessMessage('');
      
      setTimeout(() => {
        if (animationActive.current) {
          addNewLead();
        }
      }, 800);
    }, PROCESSING_DELAY_BASE);
  }, [getRandomName, getRandomAction, isMobile]);
  
  const addNewLead = useCallback(() => {
    if (!animationActive.current) return;
    
    const positions = generateLeadPositions(isMobile ? MOBILE_LEAD_COUNT : LEAD_COUNT);
    const randomIndex = Math.floor(Math.random() * positions.length);
    const basePosition = positions[randomIndex];
    
    const verticalVariation = Math.random() * 40 - 20;
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
  
  useEffect(() => {
    animationActive.current = true;
    
    const initialPosition = generateLeadPositions(1)[0];
    const verticalVariation = Math.random() * 30 - 15;
    
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
    
    const setupNextLeadInterval = () => {
      const randomInterval = LEAD_GENERATION_INTERVAL + (Math.random() * 1000 - 500);
      
      leadInterval.current = setTimeout(() => {
        if (animationActive.current) {
          addNewLead();
          setupNextLeadInterval();
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
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent animate-pulse-soft"></div>
      </div>
      
      <CenterLogo 
        processingLead={processingLead}
        onLeadProcess={() => {}}
      />
      
      {processMessage && (
        <ProcessMessage message={processMessage} />
      )}
      
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
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background opacity-40"></div>
        <div className="absolute left-0 right-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
      </div>
    </div>
  );
};

export default HeroAnimation;
