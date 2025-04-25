
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

// Names for sales updates - will pick randomly from this list
const NAMES = [
  "John D", "Sarah M", "Michael T", "Emma R", "Daniel P", 
  "Lisa W", "Thomas B", "Ashley K", "Robert J", "Jennifer L",
  "Alex H", "Sophia G", "William F", "Olivia N", "James C",
  "David K", "Amanda B", "Ryan M", "Jessica T", "Kevin P"
];

// Actions for sales updates
const ACTIONS = [
  "has enrolled into the mentorship",
  "has scheduled a demo call",
  "confirmed booking",
  "purchased premium plan"
];

const FlowAnimation = () => {
  const isMobile = useIsMobile();
  const [currentMessage, setCurrentMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [leads, setLeads] = useState<Array<{ 
    id: number; 
    x: number; 
    y: number; 
    size: 'sm' | 'md' | 'lg';
    rotate: number;
    rotateY: number;
    delay: number;
  }>>([]);
  const [salesUpdates, setSalesUpdates] = useState<Array<{ 
    id: number; 
    name: string;
    action: string;
  }>>([]);
  
  // Generate a random name
  const getRandomName = useCallback(() => {
    return NAMES[Math.floor(Math.random() * NAMES.length)];
  }, []);
  
  // Generate a random action
  const getRandomAction = useCallback(() => {
    return ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
  }, []);
  
  useEffect(() => {
    // Initial lead cards setup - more cards with staggered positions
    const initialLeads = [
      { id: 1, x: isMobile ? -220 : -800, y: isMobile ? -80 : -120, size: 'lg' as const, rotate: -8, rotateY: 20, delay: 0 },
      { id: 2, x: isMobile ? -200 : -720, y: isMobile ? 60 : 80, size: 'lg' as const, rotate: 6, rotateY: 18, delay: 0.1 },
      { id: 3, x: isMobile ? -180 : -650, y: isMobile ? -60 : -70, size: 'md' as const, rotate: -5, rotateY: 16, delay: 0.2 },
      { id: 4, x: isMobile ? -160 : -580, y: isMobile ? 30 : 100, size: 'md' as const, rotate: 7, rotateY: 14, delay: 0.3 },
      { id: 5, x: isMobile ? -140 : -520, y: isMobile ? -40 : -90, size: 'md' as const, rotate: -3, rotateY: 12, delay: 0.4 },
      { id: 6, x: isMobile ? -120 : -460, y: isMobile ? 10 : 60, size: 'sm' as const, rotate: 4, rotateY: 10, delay: 0.5 },
      { id: 7, x: isMobile ? -100 : -400, y: isMobile ? -20 : -50, size: 'sm' as const, rotate: -2, rotateY: 8, delay: 0.6 },
      { id: 8, x: isMobile ? -80 : -350, y: isMobile ? 30 : 40, size: 'sm' as const, rotate: 3, rotateY: 6, delay: 0.7 },
      { id: 9, x: isMobile ? -70 : -300, y: isMobile ? -35 : -30, size: 'sm' as const, rotate: -1, rotateY: 4, delay: 0.8 },
      { id: 10, x: isMobile ? -60 : -250, y: isMobile ? 15 : 20, size: 'sm' as const, rotate: 2, rotateY: 2, delay: 0.9 }
    ];
    
    setLeads(initialLeads);
    
    // Initial sales updates
    const initialUpdates = [
      { id: 1, name: "Beyoncé", action: "has enrolled into the mentorship" },
      { id: 2, name: "Samantha K", action: "has enrolled into the mentorship" }
    ];
    
    setSalesUpdates(initialUpdates);
    
    // Animation intervals
    const leadInterval = setInterval(() => {
      // Create new lead with staggered positioning
      const newLead = {
        id: Date.now(),
        x: isMobile ? -220 : -800,
        y: (Math.random() * 200) - 100, // Random Y position within wider bounds
        size: ['sm', 'md', 'lg'][Math.floor(Math.random() * 3)] as 'sm' | 'md' | 'lg',
        rotate: (Math.random() * 16) - 8, // Random rotation between -8 and 8 degrees
        rotateY: Math.random() * 25, // Random Y rotation for more dramatic perspective
        delay: 0
      };
      
      setLeads(prev => [...prev.slice(-15), newLead]); // Keep up to 16 leads including the new one
      
      // Show random message
      const randomMessage = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
      setCurrentMessage(randomMessage);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
      
      // Animate leads - more gradual scaling and movement
      setLeads(prev => 
        prev.map(lead => {
          // Calculate progression based on X position
          const progression = Math.min(1, Math.max(0, (lead.x + 800) / 800)); // 0 at far left, 1 at center
          const newX = lead.x + (isMobile ? 10 : 20); // Move right - faster on desktop
          
          // Dynamic scaling based on progression (closer to center = smaller)
          const targetScale = 1 - progression * 0.7; // Scale from 1.0 to 0.3
          
          // Y position gradually moves toward center
          const targetY = lead.y * (1 - progression * 0.8);
          
          // Rotation increases as it approaches center
          const rotationIntensity = progression * 0.5 + 0.5; // Ranges from 0.5 to 1.0
          
          return {
            ...lead,
            x: newX,
            y: targetY,
            rotate: lead.rotate * rotationIntensity,
            rotateY: lead.rotateY + progression * 3 // Increase Y rotation for perspective
          };
        }).filter(lead => lead.x < 150) // Remove leads that have gone past center
      );
    }, 2000); // Slightly faster interval
    
    // Sales update interval
    const salesInterval = setInterval(() => {
      // Add new sales update using random name and action
      const newUpdate = {
        id: Date.now(),
        name: getRandomName(),
        action: getRandomAction()
      };
      setSalesUpdates(prev => [...prev.slice(-2), newUpdate].slice(-3)); // Keep most recent 3 updates
    }, 4000);

    return () => {
      clearInterval(leadInterval);
      clearInterval(salesInterval);
    };
  }, [isMobile, getRandomName, getRandomAction]);
  
  return (
    <div className="relative w-full h-[600px] bg-[#010101] overflow-hidden flex items-center justify-center">
      {/* Center Logo with enhanced glow */}
      <CenterLogo onLeadProcess={() => {}} />
      
      {/* Process Message */}
      <ProcessMessage message={currentMessage} isVisible={showMessage} />
      
      {/* Floating Leads with improved animation */}
      <AnimatePresence>
        {leads.map((lead) => {
          // Calculate how far along the journey this lead is (0 = start, 1 = at center)
          const progress = Math.min(1, Math.max(0, (lead.x + 800) / 800));
          
          // Scale and opacity decrease as leads approach center
          const scale = 1 - (progress * 0.7); // Scale down to 0.3 at center
          const opacity = Math.max(0.2, 1 - (progress * 0.75)); // Fade to 0.25 opacity
          
          // Y position gradually moves toward center line
          const yAdjustment = lead.y * (1 - progress * 0.8);
          
          return (
            <motion.div
              key={lead.id}
              initial={{ 
                x: lead.x, 
                y: lead.y,
                scale: 1,
                opacity: 1,
                rotateX: 0,
                rotateY: lead.rotateY,
                rotate: lead.rotate,
              }}
              animate={{ 
                x: progress < 0.95 ? lead.x : 0, // Move to center at the very end
                y: progress < 0.95 ? yAdjustment : 0, // Move to center Y at the very end
                scale,
                opacity,
                rotateY: lead.rotateY + (progress * 15), // Increase rotation as it approaches center
                rotate: lead.rotate,
                filter: `blur(${progress * 2}px)`, // Add blur effect as it gets closer
              }}
              exit={{
                scale: 0.2,
                opacity: 0,
                x: 0,
                y: 0,
                transition: { duration: 0.3 }
              }}
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 14,
                mass: progress < 0.9 ? 1 : 0.8, // Make it snappier at the end
                duration: 1.5,
                delay: lead.delay
              }}
              style={{
                position: 'absolute',
                perspective: 1200,
                transformStyle: 'preserve-3d',
                zIndex: 10 - Math.floor(progress * 10), // Cards in front have higher z-index
              }}
            >
              <LeadCard 
                size={lead.size} 
                rotate={lead.rotate} 
                rotateY={lead.rotateY} 
              />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Sales Updates Panel with improved styling and animations */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 z-20">
        <div className="bg-[#1A1F2C]/60 backdrop-blur-sm p-6 rounded-xl border border-[#2A2F3C]/30 w-[300px]">
          <h3 className="text-white text-xl font-medium mb-2">Automated <span className="text-gray-400">Sales Process</span></h3>
          
          <div className="space-y-3 mt-4">
            <AnimatePresence>
              {salesUpdates.map((update, index) => (
                <AutomatedSalesCard
                  key={update.id}
                  name={update.name}
                  action={update.action}
                  delay={index * 0.2}
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
