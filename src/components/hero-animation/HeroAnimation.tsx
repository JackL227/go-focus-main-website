
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import LeadCard from './LeadCard';
import CenterLogo from './CenterLogo';
import { ANIMATION_SETTINGS, generateLeadPositions } from './constants';

const {
  LEAD_COUNT,
  LEAD_GENERATION_INTERVAL,
  PROCESSING_DELAY_BASE,
  CONVERSION_DISPLAY_DURATION,
  STAGGER_DELAY,
  MOBILE_LEAD_COUNT
} = ANIMATION_SETTINGS;

const NAMES = [
  'Sarah M.', 'Michael R.', 'Emma W.', 'James L.',
  'Lisa K.', 'David P.', 'Anna S.', 'John T.'
];

const ACTIONS = [
  'scheduled a call',
  'booked a session',
  'joined program',
  'started trial'
];

const HeroAnimation = () => {
  const isMobile = useIsMobile();
  const [processingLead, setProcessingLead] = useState(false);
  const [leads, setLeads] = useState<Array<{
    id: number;
    removed: boolean;
    absorbed: boolean;
    convertedLead?: { name: string; action: string };
    position?: {x: number, y: number};
    exitRight?: boolean;
  }>>([]);
  
  const animationActive = useRef(true);
  const leadInterval = useRef<NodeJS.Timeout | null>(null);
  
  const getRandomName = useCallback(() => 
    NAMES[Math.floor(Math.random() * NAMES.length)], []);
    
  const getRandomAction = useCallback(() => 
    ACTIONS[Math.floor(Math.random() * ACTIONS.length)], []);

  const processLead = useCallback((leadId: number) => {
    if (!animationActive.current) return;
    
    setProcessingLead(true);
    
    setLeads(prev => 
      prev.map(lead => 
        lead.id === leadId 
          ? { 
              ...lead, 
              absorbed: true,
              convertedLead: {
                name: getRandomName(),
                action: getRandomAction()
              }
            }
          : lead
      )
    );
    
    setTimeout(() => {
      setLeads(prev => 
        prev.map(lead => 
          lead.id === leadId 
            ? { ...lead, removed: true }
            : lead
        )
      );
      setProcessingLead(false);
      
      setTimeout(() => {
        if (animationActive.current) {
          addNewLead();
        }
      }, 800);
      
    }, PROCESSING_DELAY_BASE);
  }, [getRandomName, getRandomAction]);

  const exitNameCardRight = useCallback((leadId: number) => {
    setTimeout(() => {
      setLeads(prev => 
        prev.map(lead => 
          lead.id === leadId 
            ? { ...lead, exitRight: true }
            : lead
        )
      );
      
      setTimeout(() => {
        setLeads(prev => prev.filter(lead => lead.id !== leadId));
      }, 6000);
    }, CONVERSION_DISPLAY_DURATION);
  }, []);

  const addNewLead = useCallback(() => {
    if (!animationActive.current) return;
    
    const positions = generateLeadPositions(isMobile ? MOBILE_LEAD_COUNT : LEAD_COUNT);
    const randomIndex = Math.floor(Math.random() * positions.length);
    const basePosition = positions[randomIndex];
    
    const adjustedPosition = {
      x: basePosition.x,
      y: basePosition.y + (Math.random() * 30 - 15)
    };
    
    const newLead = {
      id: Date.now(),
      removed: false,
      absorbed: false,
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
    setLeads([{
      id: Date.now(),
      removed: false,
      absorbed: false,
      position: initialPosition,
      exitRight: false
    }]);
    
    leadInterval.current = setInterval(() => {
      if (animationActive.current) {
        addNewLead();
      }
    }, LEAD_GENERATION_INTERVAL);
    
    return () => {
      animationActive.current = false;
      if (leadInterval.current) {
        clearInterval(leadInterval.current);
      }
    };
  }, [addNewLead]);

  useEffect(() => {
    if (!processingLead && leads.length > 0 && animationActive.current) {
      const leadToProcess = leads.find(lead => 
        !lead.absorbed && !lead.removed && !lead.exitRight && !lead.convertedLead
      );
      
      if (leadToProcess) {
        const processingDelay = PROCESSING_DELAY_BASE + (leads.indexOf(leadToProcess) * 600);
        setTimeout(() => {
          processLead(leadToProcess.id);
        }, processingDelay);
      }
    }
  }, [leads, processingLead, processLead]);

  useEffect(() => {
    leads.forEach(lead => {
      if (lead.convertedLead && !lead.exitRight && !lead.removed) {
        exitNameCardRight(lead.id);
      }
    });
  }, [leads, exitNameCardRight]);

  return (
    <div className="relative w-full h-[600px] overflow-hidden flex items-center justify-center">
      <CenterLogo 
        processingLead={processingLead}
        onLeadProcess={() => {}}
      />
      
      <AnimatePresence>
        {leads.map((lead) => (
          <React.Fragment key={lead.id}>
            {lead.convertedLead ? (
              <LeadCard 
                index={leads.indexOf(lead)}
                position={lead.position}
                staggerDelay={STAGGER_DELAY}
                isConverted={true}
                name={lead.convertedLead.name}
                action={lead.convertedLead.action}
                exitRight={lead.exitRight}
              />
            ) : (
              <LeadCard 
                index={leads.indexOf(lead)}
                isAbsorbed={lead.absorbed}
                staggerDelay={STAGGER_DELAY}
                position={lead.position}
                onComplete={() => processLead(lead.id)}
              />
            )}
          </React.Fragment>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default HeroAnimation;
