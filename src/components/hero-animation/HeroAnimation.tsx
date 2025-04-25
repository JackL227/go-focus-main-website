
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import LeadCard from './LeadCard';
import CenterLogo from './CenterLogo';

// Reduced constants for slower, cleaner animation
const LEAD_COUNT = 4; // Reduced from 8 to 4
const LEAD_GENERATION_INTERVAL = 2000; // Increased from 1200 to 2000ms
const PROCESSING_DELAY_BASE = 2000; // Increased from 1200 to 2000ms
const STAGGER_DELAY = 0.3; // Increased for slower flow

const generateLeadPositions = () => {
  const positions = [];
  for (let i = 0; i < LEAD_COUNT; i++) {
    const xPos = -350;
    const yOffset = Math.random() * 160 - 80; // Reduced vertical spread
    positions.push({ x: xPos, y: yOffset });
  }
  return positions;
};

const LEAD_POSITIONS = generateLeadPositions();

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
  const [processingLead, setProcessingLead] = useState(false);
  const [leads, setLeads] = useState<Array<{
    id: number;
    removed: boolean;
    absorbed: boolean;
    convertedLead?: { name: string; action: string };
    position?: {x: number, y: number};
  }>>([]);
  
  const animationActive = useRef(true);
  
  const getRandomName = useCallback(() => 
    NAMES[Math.floor(Math.random() * NAMES.length)], []);
    
  const getRandomAction = useCallback(() => 
    ACTIONS[Math.floor(Math.random() * ACTIONS.length)], []);

  // Process lead and convert to name card
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
      
      // Longer delay before generating new lead
      setTimeout(() => {
        if (animationActive.current) {
          addNewLead();
        }
      }, 1000);
      
    }, 1500);
  }, [getRandomName, getRandomAction]);

  const addNewLead = useCallback(() => {
    if (!animationActive.current) return;
    
    const randomPosition = LEAD_POSITIONS[Math.floor(Math.random() * LEAD_POSITIONS.length)];
    
    const newLead = {
      id: Date.now(),
      removed: false,
      absorbed: false,
      position: randomPosition
    };
    
    setLeads(prev => {
      const filteredLeads = prev.filter(lead => !lead.removed);
      return [...filteredLeads, newLead].slice(-4); // Keep max 4 active leads
    });
  }, []);

  useEffect(() => {
    animationActive.current = true;
    
    // Start with fewer initial leads
    const initialLeads = LEAD_POSITIONS.slice(0, 2).map((position, i) => ({
      id: i,
      removed: false,
      absorbed: false,
      position
    }));
    
    setLeads(initialLeads);
    
    const leadInterval = setInterval(() => {
      if (animationActive.current) {
        addNewLead();
      }
    }, LEAD_GENERATION_INTERVAL);
    
    return () => {
      animationActive.current = false;
      clearInterval(leadInterval);
    };
  }, [addNewLead]);

  useEffect(() => {
    if (!processingLead && leads.length > 0 && animationActive.current) {
      const leadToProcess = leads.find(lead => !lead.absorbed && !lead.removed);
      if (leadToProcess) {
        const processingDelay = PROCESSING_DELAY_BASE + (leads.indexOf(leadToProcess) * 600);
        setTimeout(() => {
          processLead(leadToProcess.id);
        }, processingDelay);
      }
    }
  }, [leads, processingLead, processLead]);

  return (
    <div className="relative w-full h-[600px] overflow-hidden flex items-center justify-center">
      <CenterLogo 
        processingLead={processingLead}
        onLeadProcess={() => {}}
      />
      
      <AnimatePresence>
        {leads.map((lead) => (
          !lead.removed && (
            <React.Fragment key={lead.id}>
              {!lead.convertedLead ? (
                <LeadCard 
                  index={leads.indexOf(lead)}
                  isAbsorbed={lead.absorbed}
                  staggerDelay={STAGGER_DELAY}
                  position={lead.position}
                  onComplete={() => processLead(lead.id)}
                />
              ) : (
                <LeadCard 
                  index={leads.indexOf(lead)}
                  position={{ x: 0, y: lead.position?.y || 0 }}
                  staggerDelay={STAGGER_DELAY}
                  isConverted={true}
                  name={lead.convertedLead.name}
                  action={lead.convertedLead.action}
                />
              )}
            </React.Fragment>
          )
        ))}
      </AnimatePresence>
    </div>
  );
};

export default HeroAnimation;
