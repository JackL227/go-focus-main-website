
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
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

const SALES_UPDATES = [
  { name: "Beyoncé", action: "has enrolled into the mentorship" },
  { name: "Samantha K", action: "has enrolled into the mentorship" },
  { name: "John D", action: "scheduled a demo call" },
  { name: "Sarah M", action: "confirmed booking" }
];

const FlowAnimation = () => {
  const isMobile = useIsMobile();
  const [currentMessage, setCurrentMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [leads, setLeads] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [salesUpdates, setSalesUpdates] = useState<Array<{ id: number; update: { name: string; action: string } }>>([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Create new lead
      const newLead = {
        id: Date.now(),
        x: -300,
        y: Math.random() * 300 - 150
      };
      
      setLeads(prev => [...prev.slice(-8), newLead]);
      
      // Add sales update
      const newUpdate = {
        id: Date.now(),
        update: SALES_UPDATES[Math.floor(Math.random() * SALES_UPDATES.length)]
      };
      setSalesUpdates(prev => [...prev.slice(-2), newUpdate]);
      
      // Trigger message
      const randomMessage = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
      setCurrentMessage(randomMessage);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
      
      // Clean up old leads and updates
      setLeads(prev => prev.filter(lead => Date.now() - lead.id < 5000));
      setSalesUpdates(prev => prev.filter(update => Date.now() - update.id < 5000));
    }, 3000);

    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <div className="relative w-full h-[600px] bg-black overflow-hidden flex items-center justify-center">
      {/* Center Logo */}
      <CenterLogo onLeadProcess={() => {}} />
      
      {/* Process Message */}
      <ProcessMessage message={currentMessage} isVisible={showMessage} />
      
      {/* Floating Leads */}
      {leads.map((lead) => (
        <motion.div
          key={lead.id}
          initial={{ 
            x: lead.x, 
            y: lead.y, 
            scale: 1, 
            opacity: 1,
            rotateX: 0,
            rotateY: 0,
            z: 0
          }}
          animate={{
            x: 300,
            y: 0,
            scale: 0.3,
            opacity: 0.2,
            rotateX: Math.random() * 45,
            rotateY: Math.random() * 45,
            z: -100
          }}
          transition={{
            duration: 4,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
          style={{
            position: 'absolute',
            perspective: 1000,
            transformStyle: 'preserve-3d'
          }}
        >
          <LeadCard size={lead.id % 2 === 0 ? 'lg' : 'md'} />
        </motion.div>
      ))}

      {/* Sales Updates */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 space-y-4 z-20">
        {salesUpdates.map((update, index) => (
          <AutomatedSalesCard
            key={update.id}
            name={update.update.name}
            action={update.update.action}
            delay={index * 0.2}
          />
        ))}
      </div>
    </div>
  );
};

export default FlowAnimation;
