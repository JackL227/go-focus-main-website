
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import LeadCard from './hero-animation/LeadCard';
import ProcessingLogo from './hero-animation/ProcessingLogo';
import ProcessMessage from './hero-animation/ProcessMessage';
import AutomatedSalesCard from './hero-animation/AutomatedSalesCard';

const NAMES = [
  'Sarah M', 'Michael T', 'Emma R', 'Daniel P', 
  'Lisa W', 'Thomas B', 'Ashley K', 'Robert J'
];

const ACTIONS = [
  'has enrolled into the mentorship',
  'scheduled a demo call',
  'joined the program',
  'confirmed booking'
];

const FlowAnimation = () => {
  const isMobile = useIsMobile();
  const [currentMessage, setCurrentMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [processingLead, setProcessingLead] = useState(false);
  const [leads, setLeads] = useState<Array<{id: number; removed: boolean; absorbedByLogo: boolean;}>>([]);
  const [salesUpdates, setSalesUpdates] = useState<Array<{id: number; name: string; action: string;}>>([]);

  const getRandomName = useCallback(() => NAMES[Math.floor(Math.random() * NAMES.length)], []);
  const getRandomAction = useCallback(() => ACTIONS[Math.floor(Math.random() * ACTIONS.length)], []);
  
  // Process a lead when it reaches the logo
  const processLead = useCallback(() => {
    setProcessingLead(true);
    setShowMessage(true);
    setCurrentMessage("📈 Lead Captured");
    
    const newSalesUpdate = {
      id: Date.now(),
      name: getRandomName(),
      action: getRandomAction(),
    };
    
    setTimeout(() => {
      setSalesUpdates(prev => {
        const updatedList = [...prev, newSalesUpdate];
        return updatedList.slice(Math.max(0, updatedList.length - 4));
      });
      
      setShowMessage(false);
      setProcessingLead(false);
    }, 800);
  }, [getRandomName, getRandomAction]);

  // Initialize and manage leads
  useEffect(() => {
    const initialLeadCount = 12;
    const initialLeads = Array(initialLeadCount).fill(0).map((_, i) => ({
      id: i,
      removed: false,
      absorbedByLogo: false
    }));
    setLeads(initialLeads);
    
    setSalesUpdates([
      { id: 1, name: getRandomName(), action: getRandomAction() },
      { id: 2, name: getRandomName(), action: getRandomAction() }
    ]);
    
    const leadInterval = setInterval(() => {
      const newLead = { 
        id: Date.now(), 
        removed: false,
        absorbedByLogo: false
      };
      
      setLeads(prev => {
        const filteredLeads = prev.filter(lead => !lead.removed);
        return [...filteredLeads, newLead].slice(-15);
      });
    }, 2000);
    
    return () => clearInterval(leadInterval);
  }, [getRandomName, getRandomAction]);

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
      <ProcessMessage message={currentMessage} isVisible={showMessage} />
      
      <AnimatePresence>
        {leads.map((lead, index) => (
          !lead.removed && (
            <LeadCard 
              key={lead.id}
              index={index}
              isAbsorbed={lead.absorbedByLogo}
              size={index % 2 === 0 ? 'md' : 'sm'}
              rotate={(index % 3 - 1) * 5}
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
        <div className="bg-[#1A1F2C]/90 backdrop-blur-sm p-4 rounded-xl border border-[#2A2F3C]/30">
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
