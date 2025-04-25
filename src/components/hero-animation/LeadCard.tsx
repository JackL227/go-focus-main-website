
import React from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface LeadCardProps {
  index: number;
  isAbsorbed?: boolean;
  onComplete?: () => void;
  size?: 'sm' | 'md' | 'lg';
  rotate?: number;
}

const LeadCard = ({ 
  index, 
  isAbsorbed = false,
  onComplete,
  size = 'md',
  rotate = 0
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
  
  return (
    <motion.div
      className={`absolute ${cardSize} rounded-lg bg-[#1A1F2C]/90 backdrop-blur-sm shadow-lg`}
      initial={{ 
        x: -maxX - 100, 
        y: isMobile ? index * 20 - 60 : index * 15 - 45,
        scale: 1, 
        opacity: 0,
        rotate: rotate
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
            y: isMobile ? index * 20 - 60 : index * 15 - 45, 
            scale: 0.5,
            opacity: 0.8,
            rotate: rotate,
            transition: { 
              duration: 4.5, 
              delay: index * 0.8,
              ease: "easeOut" 
            }
          }}
      onAnimationComplete={() => {
        if (!isAbsorbed && onComplete) {
          onComplete();
        }
      }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-white/90 text-sm font-medium">Lead</span>
      </div>
    </motion.div>
  );
};

export default LeadCard;
