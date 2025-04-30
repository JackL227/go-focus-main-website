
import React from 'react';
import { motion } from 'framer-motion';

interface LeadCardProps {
  // Original properties
  position?: {
    x: number;
    y: number;
    originalY: number;
  };
  depth?: number;
  opacity?: number;
  scale?: number;
  absorbed?: boolean;
  removed?: boolean;

  // New properties from HeroAnimation.tsx
  id?: number;
  text?: string;
  status?: 'absorbed' | 'waiting' | 'moving';
  delay?: number;
}

const LeadCard: React.FC<LeadCardProps> = ({ 
  position, 
  depth = 0.5,
  opacity = 1,
  scale = 1,
  absorbed = false,
  removed = false,
  text = 'New Lead',
  status,
  delay = 0
}) => {
  // Use the text prop if provided, otherwise generate random text based on depth
  const leadText = text || (() => {
    const leadTexts = ['New Lead', 'Potential Client', 'Inquiry', 'Prospect', 'New Contact'];
    return leadTexts[Math.floor(depth * leadTexts.length)];
  })();
  
  // If position is provided, use dynamic styling based on position, depth, and state
  if (position) {
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
  }
  
  // If no position provided, use the new version with status-based animations
  // This handles the HeroAnimation.tsx use case
  const variants = {
    initial: { 
      x: -70, 
      y: 0,
      opacity: 0,
      scale: 0.9 
    },
    waiting: { 
      x: -40, 
      opacity: 1,
      scale: 1,
      transition: { 
        delay: delay * 0.3,
        duration: 0.5,
        ease: "easeOut" 
      }
    },
    moving: { 
      x: 0, 
      opacity: 1,
      scale: 1,
      transition: { 
        delay: delay * 0.1,
        duration: 0.7,
        ease: "easeInOut" 
      }
    },
    absorbed: { 
      x: 40, 
      y: 0,
      opacity: 0,
      scale: 0.5,
      transition: { 
        duration: 0.8,
        ease: [0.4, 0.0, 0.2, 1] 
      }
    }
  };
  
  return (
    <motion.div
      className="mb-3 bg-background/90 backdrop-blur-sm border border-foreground/10 shadow-md rounded-lg p-4 w-[140px] md:w-[160px]"
      variants={variants}
      initial="initial"
      animate={status || "waiting"}
    >
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-primary/80"></div>
        <p className="text-sm font-medium">{leadText}</p>
      </div>
    </motion.div>
  );
};

export default LeadCard;
