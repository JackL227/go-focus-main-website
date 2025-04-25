
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import LeadCard from './hero-animation/LeadCard';
import CenterLogo from './hero-animation/CenterLogo';
import ProcessMessage from './hero-animation/ProcessMessage';

const MESSAGES = [
  "📈 Qualified Lead Captured",
  "✅ Sarah enrolled in Mentorship Program",
  "🤖 AI Agent Initiated Follow-up",
  "📅 Demo Call Scheduled",
  "💫 Lead Automatically Nurtured"
];

const FlowAnimation = () => {
  const isMobile = useIsMobile();
  const [currentMessage, setCurrentMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [leads, setLeads] = useState<Array<{ id: number; x: number; y: number }>>([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Create new lead
      const newLead = {
        id: Date.now(),
        x: -100,
        y: isMobile ? Math.random() * 300 : Math.random() * 600 - 300
      };
      
      setLeads(prev => [...prev.slice(-11), newLead]);
      
      // Trigger message
      const randomMessage = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
      setCurrentMessage(randomMessage);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
      
      // Clean up old leads
      setLeads(prev => prev.filter(lead => Date.now() - lead.id < 5000));
    }, 3000);

    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <div className="relative w-full h-screen bg-[#010101] overflow-hidden">
      <CenterLogo onLeadProcess={() => {}} />
      <ProcessMessage message={currentMessage} isVisible={showMessage} />
      
      {leads.map((lead) => (
        <motion.div
          key={lead.id}
          initial={{ x: lead.x, y: lead.y, scale: 1, opacity: 1 }}
          animate={{
            x: 500,
            y: 0,
            scale: 0.3,
            opacity: 0,
            rotateZ: Math.random() * 180 - 90
          }}
          transition={{
            duration: 4,
            ease: "easeInOut"
          }}
          onAnimationComplete={() => {
            setLeads(prev => prev.filter(l => l.id !== lead.id));
          }}
        >
          <LeadCard size={lead.id % 2 === 0 ? 'lg' : 'md'} />
        </motion.div>
      ))}
    </div>
  );
};

export default FlowAnimation;
