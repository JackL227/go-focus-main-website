import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import LeadCard from './hero-animation/LeadCard';
import CenterLogo from './hero-animation/CenterLogo';
import ProcessMessage from './hero-animation/ProcessMessage';
import AutomatedSalesCard from './hero-animation/AutomatedSalesCard';

const MESSAGES = [
  "📈 Lead Captured",
  "✨ New Opportunity Created",
  "🎯 Lead Qualified",
  "📅 Demo Scheduled",
  "🤝 Deal Closed"
];

const NAMES = [
  "John D", "Sarah M", "Michael T", "Emma R", "Daniel P", 
  "Lisa W", "Thomas B", "Ashley K", "Robert J", "Jennifer L",
  "Alex H", "Sophia G", "William F", "Olivia N", "James C",
  "David K", "Amanda B", "Ryan M", "Jessica T", "Kevin P",
  "Elena R", "Chris W", "Natalie Z", "Marcus Y", "Zoe X",
  "Brian V", "Tina U", "Peter T", "Heather S", "George R"
];

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
    x: number;
    y: number;
    size: 'sm' | 'md' | 'lg';
    rotate: number;
    rotateY: number;
    rotateZ: number;
    delay: number;
    removed: boolean;
    absorbedByLogo: boolean;
    initialY: number;
  }>>([]);
  
  const [salesUpdates, setSalesUpdates] = useState<Array<{ 
    id: number; 
    name: string;
    action: string;
    initialDelay: number;
  }>>([]);
  
  const getRandomName = useCallback(() => {
    return NAMES[Math.floor(Math.random() * NAMES.length)];
  }, []);
  
  const getRandomAction = useCallback(() => {
    return ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
  }, []);
  
  const getRandomMessage = useCallback(() => {
    return MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
  }, []);
  
  const processLead = useCallback(() => {
    setProcessingLead(true);
    
    const message = getRandomMessage();
    setCurrentMessage(message);
    setShowMessage(true);
    
    const newSalesUpdate = {
      id: Date.now(),
      name: getRandomName(),
      action: getRandomAction(),
      initialDelay: 0.2
    };
    
    setTimeout(() => {
      setSalesUpdates(prev => {
        const updatedList = [...prev, newSalesUpdate].slice(-8);
        return updatedList;
      });
      setShowMessage(false);
      setProcessingLead(false);
    }, 600);
  }, [getRandomMessage, getRandomName, getRandomAction]);
  
  useEffect(() => {
    const generateInitialLeads = () => {
      const farthestX = isMobile ? -220 : -800;
      const count = isMobile ? 15 : 25;
      const initialLeads = [];
      
      for (let i = 0; i < count; i++) {
        const size = ['sm', 'md', 'lg'][Math.floor(Math.random() * 3)] as 'sm' | 'md' | 'lg';
        const yVariation = (Math.random() * 160) - 80;
        
        initialLeads.push({
          id: i,
          x: farthestX + (i * (Math.abs(farthestX) / count)),
          y: yVariation,
          initialY: yVariation,
          size,
          rotate: (Math.random() * 16) - 8,
          rotateY: Math.random() * 25,
          rotateZ: (Math.random() * 16) - 8,
          delay: i * 0.05,
          removed: false,
          absorbedByLogo: false
        });
      }
      return initialLeads;
    };

    setLeads(generateInitialLeads());
    setSalesUpdates([
      { id: 1, name: getRandomName(), action: getRandomAction(), initialDelay: 0 },
      { id: 2, name: getRandomName(), action: getRandomAction(), initialDelay: 0.3 }
    ]);

    const updateLeads = () => {
      setLeads(prev => {
        const newLead = {
          id: Date.now(),
          x: isMobile ? -220 : -800,
          y: (Math.random() * 160) - 80,
          initialY: (Math.random() * 160) - 80,
          size: ['sm', 'md', 'lg'][Math.floor(Math.random() * 3)] as 'sm' | 'md' | 'lg',
          rotate: (Math.random() * 16) - 8,
          rotateY: Math.random() * 25,
          rotateZ: (Math.random() * 16) - 8,
          delay: 0,
          removed: false,
          absorbedByLogo: false
        };

        return prev
          .map(lead => {
            if (lead.removed) return lead;
            
            const maxDist = isMobile ? 220 : 800;
            const progression = Math.min(1, Math.max(0, (lead.x + maxDist) / maxDist));
            const newX = lead.x + (isMobile ? 2 : 3);
            const bezierY = lead.initialY * (1 - Math.pow(progression, 2));
            const rotationIntensity = progression * 0.5 + 0.5;
            
            if (newX >= -20 && !lead.absorbedByLogo) {
              processLead();
              return { ...lead, x: newX, y: bezierY, absorbedByLogo: true, removed: true };
            }
            
            return {
              ...lead,
              x: newX,
              y: bezierY,
              rotate: lead.rotate * rotationIntensity,
              rotateY: lead.rotateY + progression * 5,
              rotateZ: lead.rotateZ * rotationIntensity
            };
          })
          .filter(lead => lead.x < 150)
          .concat(newLead);
      });
    };

    let animationFrameId: number;
    let lastUpdate = 0;
    const fps = 60;
    const interval = 1000 / fps;

    const animate = (timestamp: number) => {
      if (timestamp - lastUpdate >= interval) {
        updateLeads();
        lastUpdate = timestamp;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile, getRandomName, getRandomAction, processLead]);
  
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
        {leads.map((lead, index) => {
          if (lead.removed) return null;
          
          const maxDist = isMobile ? 220 : 800;
          const progress = Math.min(1, Math.max(0, (lead.x + maxDist) / maxDist));
          
          const scale = 1 - (progress * 0.75);
          const opacity = Math.max(0.2, 1 - (progress * 0.8));
          
          const yAdjustment = lead.initialY * (1 - Math.pow(progress, 2));
          
          const zIndex = 20 - Math.floor(progress * 15);
          
          return (
            <motion.div
              key={lead.id}
              initial={{ 
                x: lead.x, 
                y: lead.initialY,
                scale: 1,
                opacity: 1,
                rotateX: 0,
                rotateY: lead.rotateY,
                rotate: lead.rotate,
                filter: 'blur(0px)'
              }}
              animate={{ 
                x: progress < 0.95 ? lead.x : 0,
                y: progress < 0.95 ? yAdjustment : 0,
                scale,
                opacity,
                rotateY: lead.rotateY + (progress * 15),
                rotate: lead.rotate,
                filter: `blur(${progress * 2}px)`
              }}
              exit={{
                scale: 0.2,
                opacity: 0,
                x: 0,
                y: 0,
                filter: 'blur(4px)',
                transition: { duration: 0.3, ease: "easeInOut" }
              }}
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 14,
                mass: progress < 0.9 ? 1 : 0.8,
                duration: 1.5
              }}
              style={{
                position: 'absolute',
                perspective: 1200,
                transformStyle: 'preserve-3d',
                zIndex,
              }}
            >
              <LeadCard 
                size={lead.size} 
                rotate={lead.rotate} 
                rotateY={lead.rotateY} 
                index={index}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>

      <div 
        className={`
          ${isMobile ? 'absolute bottom-10 left-0 right-0 px-4' : 'absolute right-10 top-1/2 -translate-y-1/2'} 
          z-20 transition-all duration-300
        `}
      >
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
