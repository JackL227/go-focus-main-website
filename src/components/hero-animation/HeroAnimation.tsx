
import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import LeadCard from './LeadCard';
import CenterLogo from './CenterLogo';

// Constants for the animation
const LEAD_COUNT = 15;
const LEAD_GENERATION_INTERVAL = 600; // Reduced for smoother flow
const PROCESSING_DELAY_BASE = 800; // Faster processing for continuous flow
const STAGGER_DELAY = 0.05; // Reduced for smoother flow

// Create a more natural curved path with various Y positions
const generateLeadPositions = () => {
  const positions = [];
  for (let i = 0; i < LEAD_COUNT; i++) {
    // Create a curved path effect by varying Y coordinates more at the edges
    const xPos = -350 - Math.random() * 150;
    const yOffset = Math.random() * 300 - 150; // More vertical spread
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

  // Process a lead and create a converted lead
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
      
      // Generate a new lead shortly after processing to maintain flow
      setTimeout(() => {
        addNewLead();
      }, 200);
      
    }, 800); // Shorter timeout for faster recycling
  }, [getRandomName, getRandomAction]);

  // Add a new lead with random properties
  const addNewLead = useCallback(() => {
    if (!animationActive.current) return;
    
    const randomPosition = {
      x: -350 - Math.random() * 150,
      y: Math.random() * 300 - 150
    };
    
    const newLead = {
      id: Date.now(),
      removed: false,
      absorbed: false,
      size: getRandomSize(),
      rotate: Math.random() * 16 - 8,
      position: randomPosition
    };
    
    setLeads(prev => {
      const filteredLeads = prev.filter(lead => !lead.removed);
      return [...filteredLeads, newLead].slice(-20);
    });
  }, [getRandomSize]);

  // Initialize leads
  useEffect(() => {
    animationActive.current = true;
    
    // Initialize leads with their positions
    const initialLeads = LEAD_POSITIONS.map((position, i) => ({
      id: i,
      removed: false,
      absorbed: false,
      size: getRandomSize(),
      rotate: Math.random() * 16 - 8,
      position
    }));
    
    setLeads(initialLeads);
    
    // Continuously generate new leads
    const leadInterval = setInterval(() => {
      addNewLead();
    }, LEAD_GENERATION_INTERVAL);
    
    return () => {
      animationActive.current = false;
      clearInterval(leadInterval);
    };
  }, [getRandomSize, addNewLead]);

  // Process leads one by one
  useEffect(() => {
    if (!processingLead && leads.length > 0 && animationActive.current) {
      const leadToProcess = leads.find(lead => !lead.absorbed && !lead.removed);
      if (leadToProcess) {
        // Calculate a dynamic processing delay based on lead position in the array
        // This creates a more natural flow
        const processingDelay = PROCESSING_DELAY_BASE + (leads.indexOf(leadToProcess) * 300);
        setTimeout(() => {
          processLead(leadToProcess.id);
        }, processingDelay);
      }
    }
  }, [leads, processingLead, processLead]);

  return (
    <div className="relative w-full h-[600px] overflow-hidden flex items-center justify-center">
      <CenterLogo 
        isProcessing={processingLead} 
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
