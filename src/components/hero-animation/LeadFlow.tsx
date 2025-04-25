
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface LeadFlowProps {
  onLeadProcessed: () => void;
  maxVisibleLeads: number;
}

const LeadFlow = ({ onLeadProcessed, maxVisibleLeads }: LeadFlowProps) => {
  const isMobile = useIsMobile();
  const [leads, setLeads] = useState<Array<{ id: number }>>([]);
  const isMountedRef = useRef(true);

  useEffect(() => {
    // Initialize with staggered leads
    setLeads(Array.from({ length: maxVisibleLeads }, (_, i) => ({ id: i })));

    const interval = setInterval(() => {
      if (!isMountedRef.current) return;
      
      onLeadProcessed();
      setLeads(prev => {
        const newLeads = [...prev];
        newLeads.push({ id: Date.now() });
        if (newLeads.length > maxVisibleLeads) {
          newLeads.shift();
        }
        return newLeads;
      });
    }, 2000); // Trigger every 2 seconds

    return () => {
      isMountedRef.current = false;
      clearInterval(interval);
    };
  }, [maxVisibleLeads, onLeadProcessed]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence>
        {leads.map((lead, index) => (
          <motion.div
            key={lead.id}
            initial={{ 
              x: isMobile ? -100 : -200,
              y: isMobile ? index * 30 : 0,
              opacity: 1,
              scale: 1
            }}
            animate={{ 
              x: isMobile ? 0 : 200,
              y: isMobile ? index * 30 : 0,
              opacity: [1, 0.8, 0],
              scale: [1, 0.8, 0.3]
            }}
            exit={{ 
              x: isMobile ? 100 : 400,
              opacity: 0,
              scale: 0.2
            }}
            transition={{
              duration: 4,
              ease: "easeInOut"
            }}
            style={{ 
              position: 'absolute',
              left: '20%',
              top: isMobile ? 'auto' : '50%',
              bottom: isMobile ? '20%' : 'auto',
              transform: `translateY(${isMobile ? '0' : '-50%'})`,
              zIndex: 20 - index
            }}
            onAnimationComplete={() => {
              if (index === 0) {
                onLeadProcessed();
              }
            }}
          >
            <div className="bg-[#2e2e2e] text-white px-6 py-3 rounded-md shadow-lg whitespace-nowrap">
              Lead
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default LeadFlow;
