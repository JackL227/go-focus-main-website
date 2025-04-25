
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import LeadCard from './hero-animation/LeadCard';
import ProcessingLogo from './hero-animation/ProcessingLogo';
import ProcessMessage from './hero-animation/ProcessMessage';
import AutomatedSalesCard from './hero-animation/AutomatedSalesCard';

// Fixed positions for lead cards to better match the reference image
const LEAD_POSITIONS = [
  { x: -350, y: -80 },  // Top left
  { x: -300, y: -30 },  // Mid top left
  { x: -250, y: 20 },   // Mid center left
  { x: -200, y: 70 },   // Center left
  { x: -280, y: 120 },  // Lower center left
  { x: -350, y: 150 },  // Bottom left
];

// Names with recognizable celebrities and common names, and consistent enrollment message
const NAMES = [
  'Beyoncé', 'Samantha K', 'Michael J', 'Taylor S', 
  'Drake', 'Emma W', 'Justin B', 'Rihanna'
];

const FlowAnimation = () => {
  const isMobile = useIsMobile();
  const [currentMessage, setCurrentMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [processingLead, setProcessingLead] = useState(false);
  const [leads, setLeads] = useState<Array<{id: number; removed: boolean; absorbedByLogo: boolean; size: string; rotate: number; position?: {x: number, y: number};}>>([]);
  const [salesUpdates, setSalesUpdates] = useState<Array<{id: number; name: string; action: string;}>>([]);

  const getRandomName = useCallback(() => NAMES[Math.floor(Math.random() * NAMES.length)], []);
  const getEnrollmentAction = useCallback(() => "has enrolled into the mentorship", []);
  
  // Process a lead when it reaches the logo
  const processLead = useCallback(() => {
    setProcessingLead(true);
    setShowMessage(true);
    setCurrentMessage("📈 Lead Captured");
    
    const newSalesUpdate = {
      id: Date.now(),
      name: getRandomName(),
      action: getEnrollmentAction(),
    };
    
    setTimeout(() => {
      setSalesUpdates(prev => {
        const updatedList = [...prev, newSalesUpdate];
        return updatedList.slice(Math.max(0, updatedList.length - 2)); // Keep only 2 cards to match reference
      });
      
      setShowMessage(false);
      setProcessingLead(false);
    }, 800);
  }, [getRandomName, getEnrollmentAction]);

  // Initialize and manage leads
  useEffect(() => {
    // Create leads with positions from the reference image
    const initialLeads = Array(12).fill(0).map((_, i) => {
      const sizeOptions = ['sm', 'md', 'lg'];
      const randomSize = sizeOptions[Math.floor(Math.random() * sizeOptions.length)];
      
      // Use predefined positions for some cards, random for others
      const position = i < LEAD_POSITIONS.length 
        ? LEAD_POSITIONS[i] 
        : { 
            x: -350 - Math.random() * 100, 
            y: (Math.random() * 300) - 150
          };
      
      return {
        id: i,
        removed: false,
        absorbedByLogo: false,
        size: randomSize as 'sm' | 'md' | 'lg',
        rotate: (Math.random() * 16 - 8),
        position
      };
    });
    
    setLeads(initialLeads);
    
    // Initialize with Beyoncé and Samantha K as in the reference image
    setSalesUpdates([
      { id: 1, name: "Beyoncé", action: "has enrolled into the mentorship" },
      { id: 2, name: "Samantha K", action: "has enrolled into the mentorship" }
    ]);
    
    // Create new leads over time
    const leadInterval = setInterval(() => {
      const sizeOptions = ['sm', 'md', 'lg'];
      const randomSize = sizeOptions[Math.floor(Math.random() * sizeOptions.length)];
      const randomPosition = { 
        x: -350 - Math.random() * 100, 
        y: (Math.random() * 300) - 150
      };
      
      const newLead = { 
        id: Date.now(), 
        removed: false,
        absorbedByLogo: false,
        size: randomSize as 'sm' | 'md' | 'lg',
        rotate: (Math.random() * 16 - 8),
        position: randomPosition
      };
      
      setLeads(prev => {
        const filteredLeads = prev.filter(lead => !lead.removed);
        return [...filteredLeads, newLead].slice(-15); // Keep a max of 15 leads
      });
    }, 2000);
    
    return () => clearInterval(leadInterval);
  }, [getEnrollmentAction]);

  // Process leads
  useEffect(() => {
    if (!processingLead && leads.length > 0) {
      const leadToProcess = leads.find(lead => !lead.absorbedByLogo && !lead.removed);
      if (leadToProcess) {
        setTimeout(() => {
          setLeads(prev => 
            prev.map(lead => 
              lead.id === leadToProcess.id 
                ? { ...lead, absorbedByLogo: true }
                : lead
            )
          );
          processLead();
          
          setTimeout(() => {
            setLeads(prev => 
              prev.map(lead => 
                lead.id === leadToProcess.id 
                  ? { ...lead, removed: true }
                  : lead
              )
            );
          }, 500);
        }, 2000 + (leads.indexOf(leadToProcess) * 1000));
      }
    }
  }, [leads, processingLead, processLead]);

  return (
    <div className="relative w-full h-[600px] bg-[#010101] overflow-hidden flex flex-col md:flex-row items-center justify-center">
      <ProcessingLogo isProcessing={processingLead} />
      
      <AnimatePresence>
        {leads.map((lead, index) => (
          !lead.removed && (
            <LeadCard 
              key={lead.id}
              index={index}
              isAbsorbed={lead.absorbedByLogo}
              size={lead.size as 'sm' | 'md' | 'lg'}
              rotate={lead.rotate}
              staggerDelay={index * 0.2}
              position={lead.position}
              onComplete={() => {
                setLeads(prev => 
                  prev.map(l => 
                    l.id === lead.id 
                      ? { ...l, absorbedByLogo: true }
                      : l
                  )
                );
                processLead();
              }}
            />
          )
        ))}
      </AnimatePresence>
      
      <div className={`
        ${isMobile ? 'absolute bottom-10 left-0 right-0 px-4' : 'absolute right-10 top-1/2 -translate-y-1/2'} 
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
