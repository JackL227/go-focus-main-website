
import React from 'react';
import { motion } from 'framer-motion';

interface LeadCardProps {
  position: {
    x: number;
    y: number;
    originalY: number;
  };
  depth: number;
  opacity: number;
  scale: number;
  absorbed: boolean;
  removed: boolean;
}

const LeadCard: React.FC<LeadCardProps> = ({ 
  position, 
  depth,
  opacity,
  scale,
  absorbed,
  removed
}) => {
  // Random lead text based on depth for visual diversity
  const leadTexts = ['New Lead', 'Potential Client', 'Inquiry', 'Prospect', 'New Contact'];
  const leadText = leadTexts[Math.floor(depth * leadTexts.length)];

  // Dynamic styling based on position, depth, and state
  const initialY = position.y;
  
  return (
    <motion.div
      className="absolute bg-background/90 backdrop-blur-sm border border-foreground/10 shadow-md rounded-lg p-4 w-[120px] md:w-[160px]"
      initial={{ 
        x: position.x - 30, 
        y: initialY,
        opacity: 0,
        scale: scale * 0.8
      }}
      animate={{ 
        x: absorbed ? '40vw' : position.x,
        y: initialY,
        opacity: removed ? 0 : opacity,
        scale: absorbed ? scale * 0.5 : scale,
      }}
      exit={{
        opacity: 0,
        scale: 0.7,
        transition: { duration: 0.3 }
      }}
      transition={{
        x: absorbed ? { duration: 1.8, ease: [0.4, 0.0, 0.2, 1] } : { duration: 0.5, type: 'spring', stiffness: 100 },
        y: { duration: 0.5, type: 'spring', stiffness: 80 },
        opacity: absorbed ? { times: [0, 0.7, 1], duration: 1.8 } : { duration: 0.5 },
        scale: { duration: 0.5 }
      }}
      style={{
        transformOrigin: '50% 50%',
        zIndex: Math.round(100 - depth * 10)
      }}
    >
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-primary/80"></div>
        <p className="text-sm font-medium">{leadText}</p>
      </div>
    </motion.div>
  );
};

export default LeadCard;
