
import { useState, useEffect } from 'react';

export type LeadCard = {
  id: number;
  text: string;
  status: 'waiting' | 'moving' | 'absorbed';
  delay: number;
};

export type ConfirmationCard = {
  id: number;
  name: string;
  action: string;
  delay: number;
  path: 'straight' | 'up' | 'down';
};

const LEAD_TEXTS = ['New Lead', 'Potential Client', 'Inquiry', 'Prospect', 'New Contact'];
const NAMES = ['Sarah M.', 'Michael R.', 'Emma W.', 'James L.', 'Lisa K.', 'David P.'];
const ACTIONS = [
  'booked a call',
  'scheduled consultation',
  'joined program',
  'enrolled in course',
  'requested demo',
  'started free trial'
];
const PATHS: ('straight' | 'up' | 'down')[] = ['straight', 'up', 'down'];

export const useHeroTransformAnimation = () => {
  const [leadCards, setLeadCards] = useState<LeadCard[]>([]);
  const [confirmations, setConfirmations] = useState<ConfirmationCard[]>([]);
  const [processingLead, setProcessingLead] = useState(false);
  const [animationActive, setAnimationActive] = useState(true);
  
  // Initialize with some lead cards
  useEffect(() => {
    if (!animationActive) return;
    
    // Create initial lead cards
    const initialLeads: LeadCard[] = [
      {
        id: 1,
        text: LEAD_TEXTS[Math.floor(Math.random() * LEAD_TEXTS.length)],
        status: 'waiting',
        delay: 0
      },
      {
        id: 2,
        text: LEAD_TEXTS[Math.floor(Math.random() * LEAD_TEXTS.length)],
        status: 'waiting',
        delay: 0
      },
      {
        id: 3,
        text: LEAD_TEXTS[Math.floor(Math.random() * LEAD_TEXTS.length)],
        status: 'waiting',
        delay: 0
      }
    ];
    
    setLeadCards(initialLeads);
    
    return () => {
      setAnimationActive(false);
    };
  }, []);
  
  // Process leads periodically
  useEffect(() => {
    if (!animationActive) return;
    
    const processLead = () => {
      setLeadCards(current => {
        const waitingLeads = current.filter(lead => lead.status === 'waiting');
        if (waitingLeads.length === 0) return current;
        
        // Find first waiting lead
        const leadToProcess = waitingLeads[0];
        
        // Update its status to moving
        return current.map(lead => 
          lead.id === leadToProcess.id ? { ...lead, status: 'moving', delay: Date.now() } : lead
        );
      });
      
      // Indicate processing state for center logo
      setProcessingLead(true);
      
      // After delay, mark lead as absorbed and create confirmation card
      setTimeout(() => {
        const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
        const randomAction = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
        const randomPath = PATHS[Math.floor(Math.random() * PATHS.length)];
        
        setLeadCards(current => {
          const movingLead = current.find(lead => lead.status === 'moving');
          if (!movingLead) return current;
          
          return current.map(lead => 
            lead.id === movingLead.id ? { ...lead, status: 'absorbed' } : lead
          );
        });
        
        // Create a new confirmation card
        setConfirmations(current => [
          ...current.slice(-2), // Keep only last 3 cards
          {
            id: Date.now(),
            name: randomName,
            action: randomAction,
            delay: 0,
            path: randomPath
          }
        ]);
        
        // End processing state
        setProcessingLead(false);
        
        // Remove absorbed lead and add a new one
        setTimeout(() => {
          setLeadCards(current => {
            // Filter out absorbed leads
            const activeLeads = current.filter(lead => lead.status !== 'absorbed');
            
            // Add a new lead if needed
            if (activeLeads.length < 3) {
              return [
                ...activeLeads,
                {
                  id: Date.now(),
                  text: LEAD_TEXTS[Math.floor(Math.random() * LEAD_TEXTS.length)],
                  status: 'waiting',
                  delay: 0
                }
              ];
            }
            
            return activeLeads;
          });
        }, 500);
      }, 2000);
    };
    
    // Start processing loop
    const interval = setInterval(() => {
      processLead();
    }, 4000);
    
    return () => {
      clearInterval(interval);
    };
  }, [animationActive]);
  
  return {
    leadCards,
    confirmations,
    processingLead
  };
};
