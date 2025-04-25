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
  "Alex H", "Sophia G", "William F", "Olivia N", "James C",
  "David K", "Amanda B", "Ryan M", "Jessica T", "Kevin P",
  "Elena R", "Chris W", "Natalie Z", "Marcus Y", "Zoe X",
  "Brian V", "Tina U", "Peter T", "Heather S", "George R"
];

// Actions for sales updates - extended with various outcomes
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
  
  // Animation state
  const [currentMessage, setCurrentMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [processingLead, setProcessingLead] = useState(false);
  
  // Data state
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
  
  // Lead processing function
  const processLead = useCallback(() => {
    setProcessingLead(true);
    
    // Show processing message
    const message = getRandomMessage();
    setCurrentMessage(message);
    setShowMessage(true);
    
    // Create new sales update with random name and action
    const newSalesUpdate = {
      id: Date.now(),
      name: getRandomName(),
      action: getRandomAction(),
      initialDelay: 0.2
    };
    
    // After short delay, add the sales update and hide message
    setTimeout(() => {
      setSalesUpdates(prev => {
        // Keep only the most recent 8 updates for performance
        const updatedList = [...prev, newSalesUpdate];
        return updatedList.slice(Math.max(0, updatedList.length - 8));
      });
      
      setShowMessage(false);
      setProcessingLead(false);
    }, 800);
  }, [getRandomMessage, getRandomName, getRandomAction]);
  
  // Initial setup and animation intervals
  useEffect(() => {
    // Generate initial lead cards with staggered positions based on screen size
    const generateInitialLeads = () => {
      const farthestX = isMobile ? -220 : -800;
      const count = isMobile ? 15 : 25;
      const initialLeads = [];
      
      // Generate leads with staggered positioning
      for (let i = 0; i < count; i++) {
        const size = ['sm', 'md', 'lg'][Math.floor(Math.random() * 3)] as 'sm' | 'md' | 'lg';
        const yVariation = (Math.random() * 160) - 80; // -80 to +80 Y variation
        
        // Staggered X position from farthest left to near center
        const xPos = farthestX + (i * (Math.abs(farthestX) / count));
        
        // More pronounced rotation for depth effect
        const rotateY = Math.random() * 25; // 0 to 25 degrees Y rotation
        const rotate = (Math.random() * 16) - 8; // -8 to +8 degrees Z rotation
        
        initialLeads.push({
          id: i,
          x: xPos,
          y: yVariation,
          initialY: yVariation,
          size,
          rotate,
          rotateY,
          rotateZ: rotate,
          delay: i * 0.05, // Staggered animation delay
          removed: false,
          absorbedByLogo: false
        });
      }
      
      return initialLeads;
    };
    
    // Initial leads
    setLeads(generateInitialLeads());
    
    // Initial sales updates
    const initialUpdates = [
      { id: 1, name: getRandomName(), action: getRandomAction(), initialDelay: 0 },
      { id: 2, name: getRandomName(), action: getRandomAction(), initialDelay: 0.3 }
    ];
    setSalesUpdates(initialUpdates);
    
    // Main animation interval - create new leads and process existing ones
    const leadInterval = setInterval(() => {
      // Create a new lead at the far left
      const newLead = {
        id: Date.now(),
        x: isMobile ? -220 : -800,
        y: (Math.random() * 160) - 80, // -80 to +80 Y variation
        initialY: (Math.random() * 160) - 80,
        size: ['sm', 'md', 'lg'][Math.floor(Math.random() * 3)] as 'sm' | 'md' | 'lg',
        rotate: (Math.random() * 16) - 8, // -8 to +8 degrees Z rotation
        rotateY: Math.random() * 25, // 0 to 25 degrees Y rotation
        rotateZ: (Math.random() * 16) - 8,
        delay: 0,
        removed: false,
        absorbedByLogo: false
      };
      
      setLeads(prev => {
        // Keep a reasonable number of leads for performance
        const filteredLeads = prev.filter(lead => !lead.removed).slice(-30);
        return [...filteredLeads, newLead];
      });
      
      // Animate all leads - more gradual scaling and perspective effects
      setLeads(prev => 
        prev.map(lead => {
          if (lead.removed) return lead;
          
          // Calculate progression based on X position (0 at far left, 1 at center)
          const maxDist = isMobile ? 220 : 800;
          const progression = Math.min(1, Math.max(0, (lead.x + maxDist) / maxDist));
          
          // Move right - faster on desktop
          const newX = lead.x + (isMobile ? 10 : 20);
          
          // Dynamic scaling based on progression (closer to center = smaller)
          const targetScale = 1 - progression * 0.75; // Scale from 1.0 to 0.25
          
          // Y position gradually moves toward center with bezier-like curve
          const bezierY = lead.initialY * (1 - Math.pow(progression, 2));
          
          // Rotation increases as it approaches center for 3D effect
          const rotationIntensity = progression * 0.5 + 0.5;
          
          // Check if this lead should be "absorbed" by the logo
          const shouldAbsorb = newX >= -20 && !lead.absorbedByLogo;
          
          if (shouldAbsorb) {
            // Process this lead (trigger conversion animation)
            processLead();
            
            return {
              ...lead,
              x: newX,
              y: bezierY,
              rotate: lead.rotate * rotationIntensity,
              rotateY: lead.rotateY + progression * 5,
              rotateZ: lead.rotateZ * rotationIntensity,
              absorbedByLogo: true,
              removed: true
            };
          }
          
          return {
            ...lead,
            x: newX,
            y: bezierY,
            rotate: lead.rotate * rotationIntensity,
            rotateY: lead.rotateY + progression * 5, // Increase Y rotation for perspective
            rotateZ: lead.rotateZ * rotationIntensity
          };
        }).filter(lead => lead.x < 150) // Remove leads that have gone past center
      );
    }, 1500); // Slightly longer interval for smoother flow

    return () => {
      clearInterval(leadInterval);
    };
  }, [isMobile, getRandomName, getRandomAction, getRandomMessage, processLead]);
  
  return (
    <div className="relative w-full h-[600px] bg-[#010101] overflow-hidden flex flex-col md:flex-row items-center justify-center">
      {/* Center Logo with enhanced glow */}
      <CenterLogo 
        onLeadProcess={processLead} 
        processingLead={processingLead} 
      />
      
      {/* Process Message */}
      <ProcessMessage 
        message={currentMessage} 
        isVisible={showMessage} 
      />
      
      {/* Floating Leads with improved animation */}
      <AnimatePresence>
        {leads.map((lead, index) => {
          if (lead.removed) return null;
          
          // Calculate how far along the journey this lead is (0 = start, 1 = at center)
          const maxDist = isMobile ? 220 : 800;
          const progress = Math.min(1, Math.max(0, (lead.x + maxDist) / maxDist));
          
          // Scale and opacity decrease as leads approach center
          const scale = 1 - (progress * 0.75); // Scale down to 0.25 at center
          const opacity = Math.max(0.2, 1 - (progress * 0.8)); // Fade to 0.2 opacity
          
          // Y position gradually moves toward center with bezier-like curve
          const yAdjustment = lead.initialY * (1 - Math.pow(progress, 2));
          
          // Z-index based on distance for proper overlapping
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
                x: progress < 0.95 ? lead.x : 0, // Move to center at the very end
                y: progress < 0.95 ? yAdjustment : 0, // Move to center Y at the very end
                scale,
                opacity,
                rotateY: lead.rotateY + (progress * 15), // Increase rotation as it approaches
                rotate: lead.rotate,
                filter: `blur(${progress * 2}px)`, // Add blur as it approaches center
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
                mass: progress < 0.9 ? 1 : 0.8, // Snappier at the end
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
                isAbsorbed={lead.absorbedByLogo}
                onComplete={() => {
                  // Process this lead (trigger conversion animation)
                  processLead();
                }}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Sales Updates Panel - responsive layout */}
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
