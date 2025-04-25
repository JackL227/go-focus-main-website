
import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LeadCard from './LeadCard';
import ProcessingLogo from './ProcessingLogo';

// Increased lead count
const LEAD_COUNT = 20;

// Create a more natural curved path with various Y positions
const generateLeadPositions = () => {
  const positions = [];
  for (let i = 0; i < LEAD_COUNT; i++) {
    // Create a curved path effect with more varied positions
    const xPos = -350 - Math.random() * 150;
    const yOffset = Math.sin(i / 3) * 150 + (Math.random() * 100 - 50);
    positions.push({ x: xPos, y: yOffset });
  }
  return positions;
};

const LEAD_POSITIONS = generateLeadPositions();

const NAMES = [
  'Beyoncé', 'Samantha K', 'Michael J', 'Taylor S', 
  'Drake', 'Emma W', 'Justin B', 'Rihanna',
  'Leonardo D', 'Ariana G', 'John D', 'Sarah M',
  'Robert P', 'Emily B', 'Chris H', 'David M',
  'Sophie R', 'James T', 'Linda K', 'Mark Z'
];

const ACTIONS = [
  'booked a mentorship session',
  'scheduled a strategy call',
  'joined the client roster',
  'requested a consultation',
  'enrolled in premium plan',
  'started their journey',
  'completed onboarding',
  'activated their account'
];

const HeroAnimation = () => {
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
    
    // Convert lead with smoother timing
    setTimeout(() => {
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
      
      // Remove absorbed lead after conversion
      setTimeout(() => {
        setLeads(prev => 
          prev.map(lead => 
            lead.id === leadId 
              ? { ...lead, removed: true }
              : lead
          )
        );
        setProcessingLead(false);
      }, 800);
    }, 200);
  }, [getRandomName, getRandomAction]);

  useEffect(() => {
    const sizeOptions: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
    
    // Initialize leads with curved path positions
    const initialLeads = LEAD_POSITIONS.map((position, i) => ({
      id: i,
      removed: false,
      absorbed: false,
      size: sizeOptions[Math.floor(Math.random() * sizeOptions.length)],
      rotate: Math.random() * 16 - 8,
      position
    }));
    
    setLeads(initialLeads);
    
    // Generate new leads more frequently
    const leadInterval = setInterval(() => {
      const randomPosition = {
        x: -350 - Math.random() * 150,
        y: Math.sin(Date.now() / 1000) * 150 + (Math.random() * 100 - 50)
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
        return [...filteredLeads, newLead].slice(-25);
      });
    }, 600); // Reduced interval for more frequent leads
    
    return () => clearInterval(leadInterval);
  }, []);

  // Process leads one by one with improved timing
  useEffect(() => {
    if (!processingLead && leads.length > 0) {
      const leadToProcess = leads.find(lead => !lead.absorbed && !lead.removed);
      if (leadToProcess) {
        const processingDelay = 1200 + (leads.indexOf(leadToProcess) * 400);
        setTimeout(() => {
          processLead(leadToProcess.id);
        }, processingDelay);
      }
    }
  }, [leads, processingLead, processLead]);

  return (
    <div className="relative w-full h-[600px] bg-[#010101] overflow-hidden flex items-center justify-center">
      <ProcessingLogo isProcessing={processingLead} />
      
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
                  staggerDelay={0.15}
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
