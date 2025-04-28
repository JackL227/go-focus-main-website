
import React from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

export interface OutputCardProps {
  name: string;
  index: number;
  isMobile: boolean;
  action?: string;
}

const OutputCard: React.FC<OutputCardProps> = ({ name, index, isMobile, action }) => {
  // Dynamic positioning for variety and to prevent overlap
  const verticalVariation = index * 6;
  const horizontalVariation = index * (isMobile ? 0 : 12);
  const diagonalOffset = Math.min(index * 5, 15);
  
  // Prevent overlapping by increasing spacing on deeper cards
  const yOffset = isMobile 
    ? index * 10 + verticalVariation 
    : diagonalOffset;
  
  // Different card variants for smoother animations
  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 50 + verticalVariation, 
      x: isMobile ? 0 : -20, 
      scale: 0.9 
    },
    animate: { 
      opacity: 1, 
      y: yOffset, 
      x: isMobile ? 0 : horizontalVariation, 
      scale: 1 - (index * 0.02) // Slight scale reduction for depth
    },
    exit: { 
      opacity: 0, 
      y: 50, 
      x: isMobile ? 10 : 30, 
      scale: 0.9 
    },
  };

  // Mobile sizing adjustments
  const cardWidth = isMobile ? '90%' : '220px';
  const cardMaxWidth = isMobile ? '280px' : '100%';

  return (
    <motion.div
      className="shadow-lg"
      style={{
        width: cardWidth,
        maxWidth: cardMaxWidth,
        position: 'relative',
        zIndex: 10 - index,
        margin: isMobile ? '0 auto' : undefined,
        transform: isMobile ? undefined : `translateY(${index * 5}px)`,
      }}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ 
        duration: 0.35, 
        delay: index * 0.08,
        ease: "easeOut" 
      }}
    >
      <div className="bg-background/90 backdrop-blur-sm border border-foreground/10 shadow-md rounded-lg p-4">
        <div className="bg-primary/10 text-primary rounded-lg p-2 mb-3 inline-flex">
          {/* Icon placeholder */}
        </div>
        <h3 className="text-base font-semibold mb-1">{name}</h3>
        <p className="text-xs text-foreground/70">{action || 'Lead Qualification'}</p>
      </div>
    </motion.div>
  );
};

export default OutputCard;
