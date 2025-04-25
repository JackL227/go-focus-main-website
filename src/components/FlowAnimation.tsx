
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import LeadCard from './hero-animation/LeadCard';
import CenterLogo from './hero-animation/CenterLogo';
import ProcessMessage from './hero-animation/ProcessMessage';
import AutomatedSalesCard from './hero-animation/AutomatedSalesCard';

// Messages for the animation
const MESSAGES = [
  "📈 Lead Captured",
  "✨ New Opportunity Created",
  "🎯 Lead Qualified",
  "📅 Demo Scheduled",
  "🤝 Deal Closed"
];

// Names for sales updates - more diverse and realistic list
const NAMES = [
  "John D", "Sarah M", "Michael T", "Emma R", "Daniel P", 
  "Lisa W", "Thomas B", "Ashley K", "Robert J", "Jennifer L",
  "Alex H", "Sophia G", "William F", "Olivia N", "James C"
];

// Actions for sales updates
const ACTIONS = [
  "has enrolled into the mentorship",
  "has scheduled a demo call",
  "confirmed booking",
  "purchased premium plan",
  "joined the program",
  "signed up for coaching",
  "requested a strategy session",
  "converted from cold lead",
  "completed onboarding"
];

const FlowAnimation = () => {
  const isMobile = useIsMobile();
  const [currentMessage, setCurrentMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [processingLead, setProcessingLead] = useState(false);
  const [leads, setLeads] = useState<Array<{ 
    id: number; 
    removed: boolean;
    absorbedByLogo: boolean;
  }>>([]);
  const [salesUpdates, setSalesUpdates] = useState<Array<{
    id: number;
    name: string;
    action: string;
    initialDelay: number;
  }>>([]);

  // Generate random values
  const getRandomName = useCallback(() => {
    return NAMES[Math.floor(Math.random() * NAMES.length)];
  }, []);
  
  const getRandomAction = useCallback(() => {
    return ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
  }, []);
  
  const getRandomMessage = useCallback(() => {
    return MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
  }, []);

  // Process a lead when it reaches the logo
  const processLead = useCallback(() => {
    setProcessingLead(true);
    
    // Show processing message
    const message = getRandomMessage();
    setCurrentMessage(message);
    setShowMessage(true);
    
    // Create new sales update
    const newSalesUpdate = {
      id: Date.now(),
      name: getRandomName(),
      action: getRandomAction(),
      initialDelay: 0.2
    };
    
    setTimeout(() => {
      setSalesUpdates(prev => {
        const updatedList = [...prev, newSalesUpdate];
        return updatedList.slice(Math.max(0, updatedList.length - 8));
      });
      
      setShowMessage(false);
      setProcessingLead(false);
    }, 800);
  }, [getRandomMessage, getRandomName, getRandomAction]);

  // Initialize and manage lead generation
  useEffect(() => {
    // Generate initial leads
    const initialLeadCount = isMobile ? 8 : 12;
    const initialLeads = Array(initialLeadCount).fill(0).map((_, i) => ({
      id: i,
      removed: false,
      absorbedByLogo: false
    }));
    setLeads(initialLeads);
    
    // Initial sales updates
    setSalesUpdates([
      { id: 1, name: getRandomName(), action: getRandomAction(), initialDelay: 0 },
      { id: 2, name: getRandomName(), action: getRandomAction(), initialDelay: 0.3 }
    ]);
    
    // Generate new leads periodically
    const leadInterval = setInterval(() => {
      const newLead = { 
        id: Date.now(), 
        removed: false,
        absorbedByLogo: false
      };
      
      setLeads(prev => {
        const filteredLeads = prev.filter(lead => !lead.removed);
        return [...filteredLeads, newLead].slice(-15); // Keep up to 15 leads
      });
    }, 2000); // Generate new lead every 2 seconds
    
    return () => clearInterval(leadInterval);
  }, [isMobile, getRandomName, getRandomAction]);

  // Process leads that reach the logo
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
          
          // Remove the lead after absorption animation
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
      <CenterLogo 
        onLeadProcess={processLead} 
        processingLead={processingLead} 
      />
      
      <ProcessMessage 
        message={currentMessage} 
        isVisible={showMessage} 
      />
      
      <AnimatePresence>
        {leads.map((lead, index) => (
          !lead.removed && (
            <LeadCard 
              key={lead.id}
              index={index}
              isAbsorbed={lead.absorbedByLogo}
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
        z-20 transition-all duration-300
      `}>
        <div className={`
          bg-[#1A1F2C]/60 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-[#2A2F3C]/30
          ${isMobile ? 'w-full overflow-x-auto flex flex-row space-x-3 scrollbar-hide' : 'w-[300px]'}
        `}>
          <h3 className={`
            text-white text-lg md:text-xl font-medium 
            ${isMobile ? 'hidden' : 'mb-2'} 
          `}>
            Automated <span className="text-gray-400">Sales Process</span>
          </h3>
          
          <div className={`
            ${isMobile ? 'flex flex-row space-x-3 py-2 px-1' : 'space-y-3 mt-4'}
          `}>
            <AnimatePresence>
              {salesUpdates.map((update, index) => (
                <AutomatedSalesCard
                  key={update.id}
                  name={update.name}
                  action={update.action}
                  delay={update.initialDelay + (index * 0.15)}
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
