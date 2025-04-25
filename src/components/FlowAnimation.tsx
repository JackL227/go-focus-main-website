
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import LeadCard from './hero-animation/LeadCard';
import ProcessingLogo from './hero-animation/ProcessingLogo';

const LEAD_POSITIONS = [
  { x: -350, y: -200 },
  { x: -330, y: -160 },
  { x: -310, y: -120 },
  { x: -290, y: -80 },
  { x: -270, y: -40 },
  { x: -250, y: 0 },
  { x: -230, y: 40 },
  { x: -210, y: 80 },
  { x: -190, y: 120 },
  { x: -170, y: 160 },
  { x: -150, y: 200 },
  { x: -130, y: -180 },
  { x: -110, y: -140 },
  { x: -90, y: -100 },
  { x: -70, y: -60 }
];

const NAMES = [
  'Beyoncé', 'Samantha K', 'Michael J', 'Taylor S', 
  'Drake', 'Emma W', 'Justin B', 'Rihanna',
  'Leonardo D', 'Ariana G', 'John D', 'Sarah M',
  'Robert P', 'Emily B', 'Chris H'
];

const ACTIONS = [
  'converted lead',
  'booked call',
  'joined waitlist',
  'scheduled demo',
  'requested info'
];

const FlowAnimation = () => {
  const [processingLead, setProcessingLead] = useState(false);
  const [leads, setLeads] = useState<Array<{
    id: number;
    removed: boolean;
    absorbedByLogo: boolean;
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
              absorbedByLogo: true,
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
    }, 800);
  }, [getRandomName, getRandomAction]);

  useEffect(() => {
    const sizeOptions: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
    
    const initialLeads = LEAD_POSITIONS.map((position, i) => ({
      id: i,
      removed: false,
      absorbedByLogo: false,
      size: sizeOptions[Math.floor(Math.random() * sizeOptions.length)],
      rotate: Math.random() * 16 - 8,
      position
    }));
    
    setLeads(initialLeads);
    
    const leadInterval = setInterval(() => {
      const randomPosition = LEAD_POSITIONS[Math.floor(Math.random() * LEAD_POSITIONS.length)];
      const randomSize = sizeOptions[Math.floor(Math.random() * sizeOptions.length)];
      
      const newLead = {
        id: Date.now(),
        removed: false,
        absorbedByLogo: false,
        size: randomSize,
        rotate: Math.random() * 16 - 8,
        position: {
          x: randomPosition.x - Math.random() * 50,
          y: randomPosition.y + (Math.random() * 40 - 20)
        }
      };
      
      setLeads(prev => {
        const filteredLeads = prev.filter(lead => !lead.removed);
        return [...filteredLeads, newLead].slice(-20);
      });
    }, 2000);
    
    return () => clearInterval(leadInterval);
  }, []);

  useEffect(() => {
    if (!processingLead && leads.length > 0) {
      const leadToProcess = leads.find(lead => !lead.absorbedByLogo && !lead.removed);
      if (leadToProcess) {
        const processingDelay = 2000 + (leads.indexOf(leadToProcess) * 800);
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
                  isAbsorbed={lead.absorbedByLogo}
                  size={lead.size}
                  rotate={lead.rotate}
                  staggerDelay={0.2}
                  position={lead.position}
                  onComplete={() => processLead(lead.id)}
                />
              ) : (
                <LeadCard 
                  index={leads.indexOf(lead)}
                  size={lead.size}
                  position={{ x: 350, y: lead.position?.y || 0 }}
                  staggerDelay={0.2}
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

export default FlowAnimation;
