
import React from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface LeadCardProps {
  index: number;
  isAbsorbed?: boolean;
  onComplete?: () => void;
}

const LeadCard = ({ 
  index, 
  isAbsorbed = false,
  onComplete 
}: LeadCardProps) => {
  const isMobile = useIsMobile();
  const maxX = typeof window !== 'undefined' ? window.innerWidth / 2 : 500;
  
  // Calculate scale and opacity based on position
  const startScale = 1;
  const endScale = 0.3;
  
  // Size variants for visual diversity
  const sizes = ['w-16 h-8', 'w-20 h-10', 'w-24 h-12'];
  const randomSize = sizes[index % sizes.length];
  
  // Stagger the starting positions
  const initialDelay = index * 0.8;
  
  const cardAnimationProps = {
    initial: { 
      x: -maxX - 100, 
      y: isMobile ? index * 20 - 60 : index * 15 - 45,
      scale: startScale, 
      opacity: 0,
      rotateY: 0,
      rotate: (index % 3 - 1) * 5,
    },
    animate: isAbsorbed 
      ? { 
          x: 0, 
          y: 0, 
          scale: 0.1, 
          opacity: 0,
          rotateY: 45,
          rotate: 0,
          transition: { 
            duration: 0.5, 
            ease: "easeInOut" 
          }
        } 
      : { 
          x: maxX * 0.7, 
          y: isMobile ? index * 20 - 60 : index * 15 - 45, 
          scale: endScale, 
          opacity: 0.7,
          rotateY: 20,
          rotate: (index % 3 - 1) * 3,
          transition: { 
            duration: 6, 
            delay: initialDelay,
            ease: "linear" 
          }
        }
  };

  return (
    <motion.div
      className={`absolute ${randomSize} rounded-lg bg-[#2b2b2b] shadow-lg border border-[#3a3a3a] flex items-center justify-center z-10`}
      style={{
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      {...cardAnimationProps}
      onAnimationComplete={() => {
        if (!isAbsorbed && onComplete) {
          onComplete();
        }
      }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-white text-sm font-medium">Lead</span>
      </div>
      
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
    </motion.div>
  );
};

export default LeadCard;
