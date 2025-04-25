import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import LeadCard from './LeadCard';
import ProcessingLogo from './ProcessingLogo';

const LEAD_COUNT = 15;
const MOBILE_LEAD_COUNT = 8;

const generateLeadPositions = (isMobile: boolean) => {
  const positions = [];
  const count = isMobile ? MOBILE_LEAD_COUNT : LEAD_COUNT;
  
  for (let i = 0; i < count; i++) {
    const xPos = -350 - Math.random() * 100;
    const yOffset = Math.sin(i * 0.5) * 100;
    positions.push({ x: xPos, y: yOffset });
  }
  return positions;
};

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
    }, 600);
  }, [getRandomName, getRandomAction]);

  useEffect(() => {
    const sizeOptions: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
    
    const initialLeads = generateLeadPositions(isMobile).map((position, i) => ({
      id: i,
      removed: false,
      absorbed: false,
      size: sizeOptions[Math.floor(Math.random() * sizeOptions.length)],
      rotate: Math.random() * 12 - 6,
      position
    }));
    
    setLeads(initialLeads);
    
    const leadInterval = setInterval(() => {
      const randomPosition = {
        x: -350 - Math.random() * 150,
        y: Math.sin(Date.now() * 0.001) * 100
      };
      
      const randomSize = sizeOptions[Math.floor(Math.random() * sizeOptions.length)];
      
      const newLead = {
        id: Date.now(),
        removed: false,
        absorbed: false,
        size: randomSize,
        rotate: Math.random() * 12 - 6,
        position: randomPosition
      };
      
      setLeads(prev => {
        const filteredLeads = prev.filter(lead => !lead.removed);
        return [...filteredLeads, newLead].slice(-(isMobile ? MOBILE_LEAD_COUNT : LEAD_COUNT));
      });
    }, 700);
    
    return () => clearInterval(leadInterval);
  }, [isMobile]);

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
    <div className="relative w-full h-[600px] bg-[#050A14] overflow-hidden flex items-center justify-center">
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
                  staggerDelay={0.05}
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
