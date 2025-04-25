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
  const [activeProcessingId, setActiveProcessingId] = useState<number | null>(null);
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
  const processingQueue = useRef<number[]>([]);
  
  const getRandomName = useCallback(() => 
    NAMES[Math.floor(Math.random() * NAMES.length)], []);
    
  const getRandomAction = useCallback(() => 
    ACTIONS[Math.floor(Math.random() * ACTIONS.length)], []);

  const processNextInQueue = useCallback(() => {
    if (processingQueue.current.length > 0 && !processingLead) {
      const nextLeadId = processingQueue.current[0];
      processingQueue.current = processingQueue.current.slice(1);
      processLead(nextLeadId);
    }
  }, [processingLead]);

  const processLead = useCallback((leadId: number) => {
    if (!animationActive.current) return;
    
    if (processingLead) {
      processingQueue.current.push(leadId);
      return;
    }
    
    setProcessingLead(true);
    setActiveProcessingId(leadId);
    
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
      setActiveProcessingId(null);
      
      setTimeout(() => {
        if (animationActive.current) {
          processNextInQueue();
          addNewLead();
        }
      }, 800);
      
    }, PROCESSING_DELAY_BASE);
  }, [getRandomName, getRandomAction, processNextInQueue]);

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
    const availablePositions = positions.filter(pos => 
      !leads.some(lead => lead.position?.y === pos.y && !lead.removed && !lead.exitRight)
    );
    
    if (availablePositions.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * availablePositions.length);
    const basePosition = availablePositions[randomIndex];
    
    const newLead = {
      id: Date.now(),
      removed: false,
      absorbed: false,
      position: basePosition,
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
  }, [isMobile, leads]);

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
        !lead.absorbed && !lead.removed && !lead.exitRight && !lead.convertedLead && lead.id !== activeProcessingId
      );
      
      if (leadToProcess) {
        const processingDelay = PROCESSING_DELAY_BASE / 2;
        setTimeout(() => {
          processLead(leadToProcess.id);
        }, processingDelay);
      }
    }
  }, [leads, processingLead, processLead, activeProcessingId]);

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
