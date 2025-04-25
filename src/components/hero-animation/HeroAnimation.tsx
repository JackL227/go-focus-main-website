import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import LeadCard from './LeadCard';
import CenterLogo from './CenterLogo';

// Constants for the animation - reduced count and slowed down timing
const LEAD_COUNT = 8; // Reduced from 15 to 8 for fewer cards
const LEAD_GENERATION_INTERVAL = 1200; // Slowed down from 600ms to 1200ms
const PROCESSING_DELAY_BASE = 1200; // Slowed down processing
const STAGGER_DELAY = 0.1; // Increased for slower flow

// Create a more natural curved path with various Y positions
const generateLeadPositions = () => {
  const positions = [];
  for (let i = 0; i < LEAD_COUNT; i++) {
    // Create a curved path effect by varying Y coordinates
    const xPos = -350 - Math.random() * 150;
    const yOffset = Math.random() * 240 - 120; // Reduced vertical spread for consistency
    positions.push({ x: xPos, y: yOffset });
  }
  return positions;
};

// Predefined datasets for consistent animation
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
  
  const animationActive = useRef(true);
  
  // Use memoized functions to prevent unnecessary re-renders
  const getRandomName = useCallback(() => 
    NAMES[Math.floor(Math.random() * NAMES.length)], []);
    
  const getRandomAction = useCallback(() => 
    ACTIONS[Math.floor(Math.random() * ACTIONS.length)], []);
    
  const getRandomSize = useCallback(() => {
    const sizeOptions: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
    return sizeOptions[Math.floor(Math.random() * sizeOptions.length)];
  }, []);

  // Process a lead and create a converted lead - ALL leads now go behind the logo
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
    
    // Mark lead as removed after it's been absorbed
    setTimeout(() => {
      setLeads(prev => 
        prev.map(lead => 
          lead.id === leadId 
            ? { ...lead, removed: true }
            : lead
        )
      );
      setProcessingLead(false);
      
      // Generate a new lead after processing with a longer delay
      setTimeout(() => {
        addNewLead();
      }, 600); // Increased delay between new leads
      
    }, 1000); // Longer timeout for more visible absorption
  }, [getRandomName, getRandomAction]);

  // Add a new lead with random properties
  const addNewLead = useCallback(() => {
    if (!animationActive.current) return;
    
    const randomPosition = {
      x: -350 - Math.random() * 150,
      y: Math.random() * 240 - 120
    };
    
    const newLead = {
      id: Date.now(),
      removed: false,
      absorbed: false,
      size: getRandomSize(),
      rotate: Math.random() * 12 - 6, // Reduced rotation for subtler movement
      position: randomPosition
    };
    
    setLeads(prev => {
      // Keep fewer active leads for cleaner animation
      const filteredLeads = prev.filter(lead => !lead.removed);
      return [...filteredLeads, newLead].slice(-12); // Reduced max active leads
    });
  }, [getRandomSize]);

  // Initialize leads
  useEffect(() => {
    animationActive.current = true;
    
    // Initialize with fewer leads for a cleaner start
    const initialLeads = LEAD_POSITIONS.slice(0, 5).map((position, i) => ({
      id: i,
      removed: false,
      absorbed: false,
      size: getRandomSize(),
      rotate: Math.random() * 12 - 6,
      position
    }));
    
    setLeads(initialLeads);
    
    // Continuously generate new leads at slower interval
    const leadInterval = setInterval(() => {
      addNewLead();
    }, LEAD_GENERATION_INTERVAL);
    
    return () => {
      animationActive.current = false;
      clearInterval(leadInterval);
    };
  }, [getRandomSize, addNewLead]);

  // Process leads one by one with a slower cadence
  useEffect(() => {
    if (!processingLead && leads.length > 0 && animationActive.current) {
      const leadToProcess = leads.find(lead => !lead.absorbed && !lead.removed);
      if (leadToProcess) {
        // Calculate a dynamic processing delay based on lead position in the array
        // This creates a more natural flow
        const processingDelay = PROCESSING_DELAY_BASE + (leads.indexOf(leadToProcess) * 400);
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
                  size={lead.size}
                  rotate={lead.rotate}
                  staggerDelay={STAGGER_DELAY}
                  position={lead.position}
                  onComplete={() => processLead(lead.id)}
                />
              ) : (
                <LeadCard 
                  index={leads.indexOf(lead)}
                  size="md"
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
