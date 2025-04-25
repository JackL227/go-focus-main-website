
import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import LeadCard from './LeadCard';
import ProcessingLogo from './ProcessingLogo';
import OutputCard from './OutputCard';

const NAMES = [
  'Jayden P', 'Marie L', 'Alex F', 'Tiffany R', 'James B', 
  'Sarah M', 'Michael T', 'Emma R', 'Daniel P', 'Lisa W',
];

const ACTIONS = [
  'booked a strategy call',
  'enrolled into mentorship',
  'joined the waitlist',
  'purchased premium plan',
  'scheduled a demo',
  'requested consultation',
];

const HeroAnimation = () => {
  const isMobile = useIsMobile();
  const [isProcessing, setIsProcessing] = useState(false);
  const [leads, setLeads] = useState<Array<{
    id: number;
    removed: boolean;
    absorbed: boolean;
    size: 'sm' | 'md' | 'lg';
    position?: {x: number, y: number};
  }>>([]);
  const [outputCards, setOutputCards] = useState<Array<{
    id: number;
    name: string;
    action: string;
  }>>([]);
  
  const getRandomName = useCallback(() => {
    return NAMES[Math.floor(Math.random() * NAMES.length)];
  }, []);
  
  const getRandomAction = useCallback(() => {
    return ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
  }, []);
  
  const processLead = useCallback((leadId: number) => {
    setIsProcessing(true);
    
    setLeads(prev => prev.map(lead => 
      lead.id === leadId ? { ...lead, absorbed: true } : lead
    ));
    
    setTimeout(() => {
      const newOutputCard = {
        id: Date.now(),
        name: getRandomName(),
        action: getRandomAction()
      };
      
      setOutputCards(prev => {
        const updatedCards = [...prev, newOutputCard];
        return updatedCards.slice(Math.max(0, updatedCards.length - 3));
      });
      
      setLeads(prev => prev.map(lead => 
        lead.id === leadId ? { ...lead, removed: true } : lead
      ));
      
      setIsProcessing(false);
    }, 800);
  }, [getRandomName, getRandomAction]);
  
  useEffect(() => {
    const sizeOptions: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
    
    const initialLeads = Array(8).fill(0).map((_, i) => {
      const randomSize = sizeOptions[Math.floor(Math.random() * sizeOptions.length)];
      
      return {
        id: i,
        removed: false,
        absorbed: false,
        size: randomSize,
        position: { 
          x: -350 - (Math.random() * 100), 
          y: (Math.random() * 200 - 100)
        }
      };
    });
    
    setLeads(initialLeads);
    
    setOutputCards([
      { id: 1, name: "Jayden P", action: "booked a strategy call" },
      { id: 2, name: "Marie L", action: "enrolled into mentorship" }
    ]);
    
    const leadInterval = setInterval(() => {
      const randomSize = sizeOptions[Math.floor(Math.random() * sizeOptions.length)];
      
      const newLead = { 
        id: Date.now(), 
        removed: false,
        absorbed: false,
        size: randomSize,
        position: { 
          x: -350 - (Math.random() * 100), 
          y: (Math.random() * 200 - 100)
        }
      };
      
      setLeads(prev => {
        const filteredLeads = prev.filter(lead => !lead.removed);
        return [...filteredLeads, newLead].slice(-10);
      });
    }, 2000);
    
    return () => clearInterval(leadInterval);
  }, []);

  useEffect(() => {
    if (!isProcessing && leads.length > 0) {
      const leadToProcess = leads.find(lead => !lead.absorbed && !lead.removed);
      if (leadToProcess) {
        const processingDelay = 2000 + (leads.indexOf(leadToProcess) * 1000);
        setTimeout(() => {
          processLead(leadToProcess.id);
        }, processingDelay);
      }
    }
  }, [leads, isProcessing, processLead]);
  
  return (
    <div className="relative w-full h-[600px] bg-[#010101] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence>
          {leads.map((lead, index) => (
            !lead.removed && (
              <LeadCard 
                key={lead.id}
                index={index}
                isAbsorbed={lead.absorbed}
                size={lead.size}
                position={lead.position}
                onComplete={() => processLead(lead.id)}
              />
            )
          ))}
        </AnimatePresence>
      </div>
      
      <ProcessingLogo isProcessing={isProcessing} />
      
      <div className={`
        absolute ${isMobile ? 'bottom-10 left-0 right-0 px-4' : 'right-10 top-1/2 transform -translate-y-1/2'} 
        z-20
      `}>
        <div className={`
          ${isMobile ? 'w-full bg-[#1A1F2C]/60 backdrop-blur-sm p-4 rounded-xl' : ''}
        `}>
          <h2 className={`
            text-white text-lg md:text-xl font-semibold mb-4 
            ${isMobile ? 'text-center' : ''}
          `}>
            Automated <span className="text-muted">Sales Process</span>
          </h2>
          
          <div className={`
            ${isMobile ? 'flex flex-row space-x-3 overflow-x-auto py-2 scrollbar-hide' : 'space-y-3'}
          `}>
            <AnimatePresence>
              {outputCards.map((card, index) => (
                <OutputCard 
                  key={card.id}
                  name={card.name}
                  action={card.action}
                  index={index}
                  isMobile={isMobile}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroAnimation;
