
import React from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface LeadCardProps {
  index: number;
  isAbsorbed?: boolean;
  onComplete?: () => void;
  size?: 'sm' | 'md' | 'lg';
  rotate?: number;
  staggerDelay?: number;
  position?: {x: number, y: number};
}

const LeadCard = ({ 
  index, 
  isAbsorbed = false,
  onComplete,
  size = 'md',
  rotate = 0,
  staggerDelay = 0,
  position
}: LeadCardProps) => {
  const isMobile = useIsMobile();
  const maxX = typeof window !== 'undefined' ? window.innerWidth / 2 : 500;
  
  // Size variants for visual diversity
  const sizeClasses = {
    sm: 'w-16 h-8',
    md: 'w-20 h-10',
    lg: 'w-24 h-12'
  };
  
  const cardSize = sizeClasses[size];

  // Calculate initial position with more variation
  const initialX = -maxX - (Math.random() * 100) - 50;
  const initialY = isMobile 
    ? index * 15 - 100 + (Math.random() * 40 - 20)
    : (Math.random() * 200 - 100);
  
  const initialRotate = rotate || (Math.random() * 16 - 8);
  
  return (
    <motion.div
      className={`absolute ${cardSize} rounded-lg bg-[#1A1B1F] shadow-lg flex items-center justify-center`}
      initial={{ 
        x: position?.x ?? initialX, 
        y: position?.y ?? initialY,
        scale: 1, 
        opacity: 0,
        rotate: initialRotate
      }}
      animate={isAbsorbed 
        ? { 
            x: 0, 
            y: 0, 
            scale: 0.1, 
            opacity: 0,
            rotate: 0,
            transition: { duration: 0.5, ease: "easeInOut" }
          } 
        : { 
            x: Math.max(0, maxX * 0.5),
            y: position?.y ?? (isMobile ? initialY : initialY), 
            scale: 0.9,
            opacity: 1,
            rotate: initialRotate,
            transition: { 
              duration: 3.5, 
              delay: staggerDelay + (index * 0.2),
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
