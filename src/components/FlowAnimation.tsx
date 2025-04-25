
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
  "💫 Lead Automatically Nurtured",
  "🎯 Book Confirmed",
  "🚀 Automated Sales Flow Launched"
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
        x: isMobile ? -150 : -200,
        y: isMobile ? Math.random() * 200 - 100 : Math.random() * 400 - 200
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
    <div className="relative w-full h-[600px] bg-[#010101] overflow-hidden flex items-center justify-center">
      <CenterLogo onLeadProcess={() => {}} />
      <ProcessMessage message={currentMessage} isVisible={showMessage} />
      
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
            x: 600,
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
