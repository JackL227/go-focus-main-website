import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import LeadCard from './LeadCard';
import CenterLogo from './CenterLogo';

// Constants for the animation
const LEAD_COUNT = 15;

// Create a more natural curved path with various Y positions
const generateLeadPositions = () => {
  const positions = [];
  for (let i = 0; i < LEAD_COUNT; i++) {
    // Create a curved path effect by varying Y coordinates more at the edges
    const xPos = -350 - Math.random() * 100;
    const yOffset = Math.random() * 300 - 150; // More vertical spread
    positions.push({ x: xPos, y: yOffset });
  }
  return positions;
};

const LEAD_POSITIONS = generateLeadPositions();

const NAMES = [
  'Beyoncé', 'Samantha K', 'Michael J', 'Taylor S', 
  'Drake', 'Emma W', 'Justin B', 'Rihanna',
  'Leonardo D', 'Ariana G', 'John D', 'Sarah M',
  'Robert P', 'Emily B', 'Chris H'
];

const ACTIONS = [
  'booked a mentorship session',
  'scheduled a strategy call',
  'joined the client roster',
  'requested a consultation',
  'enrolled in premium plan'
];

const HeroAnimation = () => {
  const isMobile = useIsMobile();
  const [processingLead, setProcessingLead] = useState(false);
  const [leads, setLeads] = useState<Array<{
    id: number;
    removed: boolean;
    absorbed: boolean;
    convertedLead?: { name: string; action: string };
    size: 'sm' | 'md' | 'lg';
    rotate: number;
    position?: {x: number, y: number};
  }>>([]);
  
  const getRandomName = useCallback(() => 
    NAMES[Math.floor(Math.random() * NAMES.length)], []);
    
  const getRandomAction = useCallback(() => 
    ACTIONS[Math.floor(Math.random() * ACTIONS.length)], []);

  const processLead = useCallback((leadId: number) => {
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
    }, 300); // Reduced to 300ms for quicker disappearance
  }, [getRandomName, getRandomAction]);

  useEffect(() => {
    const sizeOptions: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
    
    // Initialize leads with their positions
    const initialLeads = LEAD_POSITIONS.map((position, i) => ({
      id: i,
      removed: false,
      absorbed: false,
      size: sizeOptions[Math.floor(Math.random() * sizeOptions.length)],
      rotate: Math.random() * 16 - 8,
      position
    }));
    
    setLeads(initialLeads);
    
    // Continuously generate new leads
    const leadInterval = setInterval(() => {
      // Create a new random position with more variety
      const randomPosition = {
        x: -350 - Math.random() * 150,
        y: Math.random() * 300 - 150
      };
      
      const randomSize = sizeOptions[Math.floor(Math.random() * sizeOptions.length)];
      
      const newLead = {
        id: Date.now(),
        removed: false,
        absorbed: false,
        size: randomSize,
        rotate: Math.random() * 16 - 8,
        position: randomPosition
      };
      
      setLeads(prev => {
        const filteredLeads = prev.filter(lead => !lead.removed);
        return [...filteredLeads, newLead].slice(-20);
      });
    }, 800); // Appear every ~0.8 seconds as requested
    
    return () => clearInterval(leadInterval);
  }, []);

  // Process leads one by one
  useEffect(() => {
    if (!processingLead && leads.length > 0) {
      const leadToProcess = leads.find(lead => !lead.absorbed && !lead.removed);
      if (leadToProcess) {
        const processingDelay = 1500 + (leads.indexOf(leadToProcess) * 500);
        setTimeout(() => {
          processLead(leadToProcess.id);
        }, processingDelay);
      }
    }
  }, [leads, processingLead, processLead]);

  return (
    <div className="relative w-full h-[600px] bg-[#010101] overflow-hidden flex items-center justify-center">
      <CenterLogo processingLead={processingLead} onLeadProcess={() => {}} />
      
      <AnimatePresence>
        {leads.map((lead) => (
          !lead.removed && (
            <React.Fragment key={lead.id}>
              {!lead.convertedLead ? (
                <LeadCard 
                  index={leads.indexOf(lead)}
                  isAbsorbed={lead.absorbed}
                  size={lead.size}
                  rotate={lead.rotate}
                  staggerDelay={0.2}
                  position={lead.position}
                  onComplete={() => processLead(lead.id)}
                />
              ) : (
                <LeadCard 
                  index={leads.indexOf(lead)}
                  size="md"
                  position={{ x: 350, y: lead.position?.y || 0 }}
                  staggerDelay={0.1}
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
