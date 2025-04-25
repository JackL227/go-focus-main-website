
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
  "Alex H", "Sophia G", "William F", "Olivia N", "James C"
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
    // Initial lead cards setup to match the screenshot
    const initialLeads = [
      { id: 1, x: isMobile ? -180 : -400, y: isMobile ? -40 : -100, size: 'lg' as const, rotate: -5, rotateY: 15, delay: 0 },
      { id: 2, x: isMobile ? -140 : -320, y: isMobile ? 60 : 60, size: 'md' as const, rotate: 5, rotateY: 10, delay: 0.2 },
      { id: 3, x: isMobile ? -120 : -240, y: isMobile ? -20 : -40, size: 'md' as const, rotate: -3, rotateY: 8, delay: 0.4 },
      { id: 4, x: isMobile ? -100 : -180, y: isMobile ? 30 : 80, size: 'sm' as const, rotate: 4, rotateY: 5, delay: 0.6 },
      { id: 5, x: isMobile ? -80 : -150, y: isMobile ? -40 : -60, size: 'sm' as const, rotate: -2, rotateY: 3, delay: 0.8 },
      { id: 6, x: isMobile ? -60 : -120, y: isMobile ? 10 : 20, size: 'xs' as const, rotate: 0, rotateY: 0, delay: 1 }
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
        x: isMobile ? -180 : -400,
        y: (Math.random() * 160) - 80, // Random Y position within bounds
        size: ['sm', 'md', 'lg'][Math.floor(Math.random() * 3)] as 'sm' | 'md' | 'lg',
        rotate: (Math.random() * 12) - 6, // Random rotation between -6 and 6 degrees
        rotateY: Math.random() * 20, // Random Y rotation for perspective
        delay: 0
      };
      
      setLeads(prev => [...prev.slice(-12), newLead]); // Keep up to 13 leads including the new one
      
      // Show random message
      const randomMessage = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
      setCurrentMessage(randomMessage);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
      
      // Animate leads
      setLeads(prev => 
        prev.map(lead => {
          // If lead is old, move it towards the center logo and reduce opacity/scale
          if (Date.now() - lead.id > 3000) {
            return {
              ...lead,
              x: lead.x + 100, // Move right
              y: lead.y * 0.7,  // Move towards center Y
              rotate: lead.rotate * 0.8, // Reduce rotation
              rotateY: lead.rotateY + 5 // Increase Y rotation for perspective
            };
          }
          return lead;
        }).filter(lead => lead.x < 150) // Remove leads that have gone past center
      );
    }, 3000);
    
    // Sales update interval
    const salesInterval = setInterval(() => {
      // Add new sales update using random name and action
      const newUpdate = {
        id: Date.now(),
        name: getRandomName(),
        action: getRandomAction()
      };
      setSalesUpdates(prev => [...prev.slice(-1), newUpdate]); // Keep most recent update and add new one
    }, 5000);

    return () => {
      clearInterval(leadInterval);
      clearInterval(salesInterval);
    };
  }, [isMobile, getRandomName, getRandomAction]);
  
  return (
    <div className="relative w-full h-[600px] bg-[#010101] overflow-hidden flex items-center justify-center">
      {/* Center Logo */}
      <CenterLogo onLeadProcess={() => {}} />
      
      {/* Process Message */}
      <ProcessMessage message={currentMessage} isVisible={showMessage} />
      
      {/* Floating Leads */}
      <AnimatePresence>
        {leads.map((lead) => (
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
              x: 0, 
              y: 0,
              scale: lead.x < -200 ? 1 : (lead.x < -100 ? 0.75 : 0.5),
              opacity: lead.x < -200 ? 1 : (lead.x < -100 ? 0.75 : 0.5),
              rotateY: lead.rotateY + 15,
              rotate: lead.rotate,
            }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              duration: 2.5,
              delay: lead.delay
            }}
            style={{
              position: 'absolute',
              perspective: 1000,
              transformStyle: 'preserve-3d',
            }}
          >
            <LeadCard 
              size={lead.size} 
              rotate={lead.rotate} 
              rotateY={lead.rotateY} 
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Sales Updates Panel */}
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
