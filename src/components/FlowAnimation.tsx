
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import LeadCard from './hero-animation/LeadCard';
import ProcessingLogo from './hero-animation/ProcessingLogo';
import AutomatedSalesCard from './hero-animation/AutomatedSalesCard';

const LEAD_POSITIONS = [
  { x: -350, y: -120 },
  { x: -320, y: -80 },
  { x: -300, y: -40 },
  { x: -280, y: 0 },
  { x: -260, y: 40 },
  { x: -240, y: 80 },
  { x: -220, y: 120 },
  { x: -300, y: 160 },
  { x: -280, y: -160 },
  { x: -260, y: -200 },
];

const NAMES = [
  'Beyoncé', 'Samantha K', 'Michael J', 'Taylor S', 
  'Drake', 'Emma W', 'Justin B', 'Rihanna',
  'Leonardo D', 'Ariana G'
];

const ACTIONS = [
  'has enrolled into the mentorship',
  'booked a strategy call',
  'joined the waitlist',
  'scheduled a demo',
  'requested consultation'
];

const FlowAnimation = () => {
  const isMobile = useIsMobile();
  const [processingLead, setProcessingLead] = useState(false);
  const [leads, setLeads] = useState<Array<{
    id: number;
    removed: boolean;
    absorbedByLogo: boolean;
    size: 'sm' | 'md' | 'lg';
    rotate: number;
    position?: {x: number, y: number};
  }>>([]);
  const [salesUpdates, setSalesUpdates] = useState<Array<{
    id: number;
    name: string;
    action: string;
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
          ? { ...lead, absorbedByLogo: true }
          : lead
      )
    );
    
    setTimeout(() => {
      const newSalesUpdate = {
        id: Date.now(),
        name: getRandomName(),
        action: getRandomAction(),
      };
      
      setSalesUpdates(prev => {
        const updatedList = [...prev, newSalesUpdate];
        return updatedList.slice(-3);
      });
      
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
      size: sizeOptions[Math.floor(Math.random() * sizeOptions.length)] as 'sm' | 'md' | 'lg',
      rotate: Math.random() * 16 - 8,
      position
    }));
    
    setLeads(initialLeads);
    
    setSalesUpdates([
      { id: 1, name: "Beyoncé", action: "has enrolled into the mentorship" },
      { id: 2, name: "Samantha K", action: "booked a strategy call" }
    ]);
    
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
        return [...filteredLeads, newLead].slice(-15);
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
        {leads.map((lead, index) => (
          !lead.removed && (
            <LeadCard 
              key={lead.id}
              index={index}
              isAbsorbed={lead.absorbedByLogo}
              size={lead.size}
              rotate={lead.rotate}
              staggerDelay={0.2}
              position={lead.position}
              onComplete={() => processLead(lead.id)}
            />
          )
        ))}
      </AnimatePresence>
      
      <div className={`
        absolute 
        ${isMobile ? 'bottom-10 left-0 right-0 px-4' : 'right-10 top-1/2 -translate-y-1/2'} 
        z-20
      `}>
        <div className="bg-[#1A1B1F]/90 backdrop-blur-sm p-4 rounded-xl border border-[#2A2F3C]/30">
          <h3 className="text-white text-lg font-medium mb-2">
            Automated <span className="text-gray-400">Sales Process</span>
          </h3>
          
          <div className="space-y-3">
            <AnimatePresence>
              {salesUpdates.map((update, index) => (
                <AutomatedSalesCard
                  key={update.id}
                  name={update.name}
                  action={update.action}
                  delay={0.2 + (index * 0.15)}
                  index={index}
                  isRight={!isMobile}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowAnimation;
