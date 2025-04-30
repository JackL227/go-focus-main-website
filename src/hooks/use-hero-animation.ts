
import { useState, useEffect, useCallback, useRef } from 'react';

export type AnimationState = {
  processingLead: boolean;
  processMessage: string;
  leads: Lead[];
  outputCards: OutputCard[];
};

export type Lead = {
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

export type OutputCard = {
  id: number;
  name: string;
  action: string;
};

const NAMES = [
  'Sarah M.', 'Michael R.', 'Emma W.', 'James L.', 'Lisa K.', 'David P.',
  'Anna S.', 'John T.', 'Robert Q.', 'Sophia V.'
];

const ACTIONS = [
  'booked a call',
  'scheduled consultation',
  'joined program',
  'enrolled in course',
  'requested demo',
  'started free trial',
  'booked strategy call'
];

// Generate starting positions with a more defined left-side funnel shape
const generateLeadPositions = (count: number, isMobile: boolean): { x: number; y: number; originalY: number }[] => {
  const positions = [];
  const verticalSpacing = isMobile ? 70 : 90;
  const totalHeight = count * verticalSpacing;
  const startY = -totalHeight / 2;
  const startX = isMobile ? -180 : -300;
  
  for (let i = 0; i < count; i++) {
    // Create a funnel shape from the left with more consistent layout
    const baseYPos = startY + (i * verticalSpacing);
    const yVariation = Math.random() * 60 - 30; // Less vertical variation for cleaner flow
    const xVariation = Math.random() * 80 - 10; // More consistent horizontal distance
    
    positions.push({ 
      x: startX + xVariation,
      y: baseYPos + yVariation,
      originalY: baseYPos + yVariation
    });
  }
  
  return positions;
};

export const useHeroAnimation = (isMobile: boolean) => {
  const [state, setState] = useState<AnimationState>({
    processingLead: false,
    processMessage: '',
    leads: [],
    outputCards: []
  });
  
  const animationActive = useRef(true);
  const leadInterval = useRef<NodeJS.Timeout | null>(null);
  const processingInterval = useRef<NodeJS.Timeout | null>(null);
  const lastProcessedTime = useRef(0);
  
  // Get random name and action
  const getRandomName = useCallback(() => 
    NAMES[Math.floor(Math.random() * NAMES.length)], []);
  
  const getRandomAction = useCallback(() => 
    ACTIONS[Math.floor(Math.random() * ACTIONS.length)], []);
  
  // Process a lead and convert it into an output card
  const processLead = useCallback((leadId: number) => {
    if (!animationActive.current) return;
    
    // Ensure we're not processing too many leads at once
    const now = Date.now();
    if (now - lastProcessedTime.current < 2000) return;
    lastProcessedTime.current = now;
    
    // Start processing animation
    setState(prev => ({
      ...prev,
      processingLead: true,
      processMessage: ['Converting lead...', 'Scheduling call...', 'Qualifying lead...'][
        Math.floor(Math.random() * 3)
      ]
    }));
    
    // Mark lead as absorbed
    setState(prev => ({
      ...prev,
      leads: prev.leads.map(lead => lead.id === leadId ? {
        ...lead,
        absorbed: true,
        convertedLead: {
          name: getRandomName(),
          action: getRandomAction()
        }
      } : lead)
    }));
    
    // After absorption delay, create the output card
    setTimeout(() => {
      setState(prev => {
        const processedLead = prev.leads.find(lead => lead.id === leadId);
        let newOutputCards = [...prev.outputCards];
        
        if (processedLead?.convertedLead) {
          // Add the converted lead to output cards
          const maxCards = isMobile ? 3 : 6;
          newOutputCards = [{
            id: Date.now(),
            name: processedLead.convertedLead.name,
            action: processedLead.convertedLead.action
          }, ...prev.outputCards].slice(0, maxCards);
        }
        
        // Mark the lead as removed and update output cards
        return {
          ...prev,
          leads: prev.leads.map(lead => lead.id === leadId ? {
            ...lead,
            removed: true
          } : lead),
          outputCards: newOutputCards,
          processingLead: false,
          processMessage: ''
        };
      });
      
      // Schedule the next lead for processing
      setTimeout(() => {
        if (animationActive.current) {
          const nextLeadToProcess = findNextLeadToProcess();
          if (nextLeadToProcess) {
            processLead(nextLeadToProcess.id);
          }
        }
      }, 800);
    }, 1500); // Slightly faster emergence for smoother flow
  }, [getRandomName, getRandomAction, isMobile]);
  
  // Find a lead that's close to the center to process
  const findNextLeadToProcess = useCallback(() => {
    return state.leads.find(lead => 
      !lead.absorbed && 
      !lead.removed && 
      !lead.exitRight && 
      !lead.convertedLead &&
      lead.position && 
      Math.sqrt(Math.pow(lead.position.x, 2) + Math.pow(lead.position.y, 2)) < 200
    );
  }, [state.leads]);
  
  // Add a new lead to the animation
  const addNewLead = useCallback(() => {
    if (!animationActive.current) return;
    
    // Calculate max visible leads based on screen size
    const maxVisibleLeads = isMobile ? 5 : 8;
    
    // Check if we're already at capacity
    const activeLeads = state.leads.filter(lead => !lead.removed && !lead.absorbed && !lead.exitRight);
    if (activeLeads.length >= maxVisibleLeads) return;
    
    // Generate new lead with consistent positioning
    const positions = generateLeadPositions(1, isMobile);
    const basePosition = positions[0];
    
    // Generate depth parameters with enhanced 3D effect
    const depth = Math.random(); // 0-1 value
    const speed = 0.6 + (depth * 0.8); // Deeper cards move slower
    const opacity = 0.65 + (depth * 0.35); // Deeper cards are more transparent
    const scale = 0.7 + (depth * 0.5); // Deeper cards are smaller
    
    const newLead = {
      id: Date.now(),
      removed: false,
      absorbed: false,
      depth: depth,
      speed: speed,
      position: basePosition,
      exitRight: false,
      opacity: opacity,
      scale: scale
    };
    
    setState(prev => ({
      ...prev,
      leads: [...prev.leads, newLead]
    }));
    
    // Clean up old leads
    setState(prev => {
      const oldLeads = prev.leads.filter(lead => lead.removed && lead.id < Date.now() - 10000);
      if (oldLeads.length > 10) {
        return {
          ...prev,
          leads: prev.leads.filter(lead => !oldLeads.includes(lead))
        };
      }
      return prev;
    });
  }, [state.leads, isMobile]);
  
  // Initialize animation
  useEffect(() => {
    animationActive.current = true;
    
    // Start with a few leads already on screen
    const initialLeadsCount = isMobile ? 3 : 5;
    const initialPositions = generateLeadPositions(initialLeadsCount, isMobile);
    
    const initialLeads = initialPositions.map((pos, idx) => {
      const depth = Math.random();
      const speed = 0.5 + (depth * 0.8);
      const opacity = 0.65 + (depth * 0.35);
      const scale = 0.65 + (depth * 0.55);
      
      return {
        id: Date.now() + idx,
        removed: false,
        absorbed: false,
        depth: depth,
        speed: speed,
        position: pos,
        exitRight: false,
        opacity: opacity,
        scale: scale
      };
    });
    
    setState(prev => ({
      ...prev,
      leads: initialLeads
    }));
    
    // Setup interval to generate new leads
    const setupNextLeadInterval = () => {
      const randomInterval = 2000 + (Math.random() * 1200 - 600);
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
      const leadToProcess = findNextLeadToProcess();
      
      if (leadToProcess) {
        processLead(leadToProcess.id);
      }
      
      // Schedule next processing attempt
      processingInterval.current = setTimeout(() => {
        if (animationActive.current) {
          setupProcessingInterval();
        }
      }, 2200 + Math.random() * 1200);
    };
    
    // Start the first processing after a short delay
    setTimeout(() => {
      setupProcessingInterval();
    }, 1800);
    
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

  return state;
};
