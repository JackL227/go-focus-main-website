
import React from 'react';
import { motion } from 'framer-motion';

interface LeadCardProps {
  index: number;
  isAbsorbed?: boolean;
  onComplete?: () => void;
  size?: 'sm' | 'md' | 'lg';
  position?: {x: number, y: number};
}

const LeadCard = ({ 
  index, 
  isAbsorbed = false,
  onComplete,
  size = 'md',
  position
}: LeadCardProps) => {
  // Size variants for visual diversity
  const sizeClasses = {
    sm: 'w-16 h-8',
    md: 'w-20 h-10',
    lg: 'w-24 h-12'
  };
  
  const cardSize = sizeClasses[size];

  return (
    <motion.div
      className={`absolute ${cardSize} rounded-lg bg-[#1c1c1e] shadow-lg flex items-center justify-center`}
      initial={{ 
        x: position?.x ?? -350, 
        y: position?.y ?? 0,
        scale: 1, 
        opacity: 1,
        rotate: (Math.random() * 16 - 8)
      }}
      animate={isAbsorbed 
        ? { 
            x: 0, 
            y: 0, 
            scale: 0.1, 
            opacity: 0,
            rotate: 0,
            transition: { 
              duration: 0.5, 
              ease: "easeInOut" 
            }
          } 
        : { 
            x: 0, 
            y: 0, 
            scale: 0.9,
            opacity: 1,
            transition: { 
              duration: 3.5, 
              delay: index * 0.2,
              ease: "easeOut" 
            }
          }}
      onAnimationComplete={() => {
        if (!isAbsorbed && onComplete) {
          onComplete();
        }
      }}
    >
      <span className="text-white/90 text-sm font-medium">Lead</span>
    </motion.div>
  );
};

export default LeadCard;
