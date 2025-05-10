import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export interface OutputCardProps {
  name: string;
  index: number;
  isMobile: boolean;
  action?: string;
}

const OutputCard: React.FC<OutputCardProps> = ({ name, index, isMobile, action }) => {
  // Mobile-optimized variants with clear visibility and slower animations
  const mobileVariants = {
    initial: { 
      opacity: 0, 
      x: -20,
      scale: 0.9
    },
    animate: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
      }
    },
    exit: { 
      opacity: 0, 
      x: 50, 
      scale: 0.9,
      transition: {
        duration: 1.2,
      }
    },
  };
  
  // Desktop variants remain the same
  // Calculate unique flow direction for each card (right, diagonally up-right, diagonally down-right)
  const directions = [
    { x: 1, y: -0.5 },  // Diagonal up-right
    { x: 1, y: 0 },     // Straight right
    { x: 1, y: 0.5 }    // Diagonal down-right
  ];
  
  // Choose direction based on card index (cycle through directions)
  const direction = directions[index % directions.length];
  
  // Dynamic positioning for variety and to prevent overlap
  const verticalVariation = index * 6;
  const horizontalVariation = index * (isMobile ? 0 : 12);
  const diagonalOffset = Math.min(index * 5, 15);
  
  // Prevent overlapping by increasing spacing on deeper cards
  const yOffset = isMobile 
    ? index * 10 + verticalVariation 
    : diagonalOffset;
  
  // Create exit animation paths based on direction
  const exitX = isMobile ? 10 : 30 + index * 15;
  const exitY = direction.y * 50;
  
  // Different card variants for smoother animations
  const desktopCardVariants = {
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
      y: exitY, 
      x: exitX, 
      scale: 0.9 
    },
  };

  // Choose appropriate variants based on device type
  const variants = isMobile ? mobileVariants : desktopCardVariants;

  // Mobile-optimized card sizing
  const cardStyle = isMobile ? {
    width: '130px',
    maxWidth: '130px',
  } : {
    width: '220px',
    maxWidth: '100%',
    position: 'relative',
    zIndex: 10 - index,
    margin: isMobile ? '0 auto' : undefined,
    transform: isMobile ? undefined : `translateY(${index * 5}px)`,
  };

  return (
    <motion.div
      className="shadow-lg"
      style={cardStyle}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ 
        duration: isMobile ? 0.7 : 0.35, 
        delay: index * (isMobile ? 0.1 : 0.08),
        ease: "easeOut" 
      }}
      aria-label={`${name} ${action}`}
      layout
    >
      <div className="bg-background/90 backdrop-blur-sm border border-foreground/10 shadow-md rounded-lg p-3">
        <div className="text-primary rounded-lg mb-1 inline-flex">
          <CheckCircle className="h-4 w-4" />
        </div>
        <h3 className="text-xs font-semibold mb-1">{name}</h3>
        <p className="text-[10px] text-foreground/70">{action || 'Lead Qualification'}</p>
      </div>
    </motion.div>
  );
};

export default OutputCard;
