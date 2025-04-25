
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface LeadFlowProps {
  onLeadProcessed: () => void;
  maxVisibleLeads: number;
}

const LeadFlow = ({ onLeadProcessed, maxVisibleLeads }: LeadFlowProps) => {
  const isMobile = useIsMobile();
  const [leads, setLeads] = useState<Array<{
    id: number;
    x: number;
    y: number;
    scale: number;
    opacity: number;
    rotateY: number;
  }>>([]);

  useEffect(() => {
    const createNewLead = () => ({
      id: Date.now(),
      x: isMobile ? -150 : -500,
      y: isMobile ? Math.random() * 100 - 50 : Math.random() * 200 - 100,
      scale: 1,
      opacity: 1,
      rotateY: Math.random() * 15
    });

    // Initialize with staggered leads
    setLeads(Array.from({ length: maxVisibleLeads }, (_, i) => ({
      ...createNewLead(),
      id: i,
      x: (isMobile ? -150 : -500) + (i * 60)
    })));

    const interval = setInterval(() => {
      setLeads(prev => {
        const newLeads = prev.map(lead => {
          const newX = lead.x + 2; // Smoother movement
          
          // When lead reaches logo, trigger processing
          if (newX >= -20 && newX <= 0) {
            onLeadProcessed();
            return { ...lead, opacity: 0, scale: 0.2 };
          }
          
          // Update position and scale based on distance to center
          const progress = Math.min(1, Math.max(0, (lead.x + 500) / 500));
          const newScale = 1 - (progress * 0.75);
          
          return {
            ...lead,
            x: newX,
            scale: newScale,
            opacity: Math.max(0.2, 1 - progress * 0.8)
          };
        });

        // Remove processed leads and add new ones
        const filteredLeads = newLeads.filter(lead => lead.x < 100);
        while (filteredLeads.length < maxVisibleLeads) {
          filteredLeads.unshift(createNewLead());
        }

        return filteredLeads;
      });
    }, 16); // ~60fps for smooth animation

    return () => clearInterval(interval);
  }, [isMobile, maxVisibleLeads, onLeadProcessed]);

  return (
    <div className="absolute inset-0">
      <AnimatePresence>
        {leads.map((lead) => (
          <motion.div
            key={lead.id}
            className="absolute"
            initial={{ x: lead.x, y: lead.y, scale: lead.scale, opacity: 1 }}
            animate={{
              x: lead.x,
              y: lead.y,
              scale: lead.scale,
              opacity: lead.opacity,
              rotateY: lead.rotateY
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 14,
              duration: 0.5
            }}
            style={{ perspective: 1000 }}
          >
            <div className="bg-[#2e2e2e] text-white px-4 py-2 rounded-md shadow-lg">
              Lead
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default LeadFlow;
