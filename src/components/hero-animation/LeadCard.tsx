
import React from 'react';
import { motion } from 'framer-motion';
import { CircleCheck } from 'lucide-react';

interface LeadCardProps {
  index: number;
  isAbsorbed?: boolean;
  onComplete?: () => void;
  size?: 'sm' | 'md' | 'lg';
  position?: {x: number, y: number};
  rotate?: number;
  staggerDelay?: number;
  isConverted?: boolean;
  name?: string;
  action?: string;
}

const LeadCard = ({ 
  index, 
  isAbsorbed = false,
  onComplete,
  size = 'md',
  position,
  rotate = 0,
  staggerDelay = 0.2,
  isConverted = false,
  name,
  action
}: LeadCardProps) => {
  const sizeClasses = {
    sm: 'w-16 h-8',
    md: 'w-20 h-10',
    lg: 'w-24 h-12'
  };
  
  const cardSize = sizeClasses[size];
  
  // Define custom easing for smoother animation
  const customEasing = [0.4, 0, 0.2, 1];
  
  // Calculate destination X based on viewport width for responsive flow
  // Use a larger value to ensure cards have more time to be visible
  const destinationX = typeof window !== 'undefined' ? 
    Math.min(1000, window.innerWidth * 0.9) : 900; 

  return (
    <motion.div
      className={`absolute ${isConverted ? 'rounded-lg p-3 bg-[#1F1F22] border border-[#2d2d2d]/50 shadow-lg' : `${cardSize} rounded-pill bg-[#1F1F22]`} flex items-center justify-center ${isConverted ? 'shadow-[0_4px_20px_rgba(255,255,255,0.15)]' : ''}`}
      initial={{ 
        x: position?.x ?? (isConverted ? 0 : -350), 
        y: position?.y ?? 0,
        scale: isConverted ? 0.1 : 1, 
        opacity: isConverted ? 0 : 0.3, // Start with lower opacity for smoother entry
        rotate: rotate ?? (Math.random() * 16 - 8),
        zIndex: isConverted ? 20 : 5 // All regular cards start at lower z-index
      }}
      animate={
        isConverted 
          ? {
              // When converted, move across screen
              x: destinationX,
              y: [0, -15, 0, 15, 0], // Add more pronounced floating vertical motion
              scale: [1, 0.98, 0.9], // Gradually scale down more subtly
              opacity: [1, 0.9, 0], // Fade out as it moves
              rotate: 0,
              zIndex: 20, // Converted cards appear above
              transition: {
                duration: 6.5, // Much longer duration for slower flow
                delay: staggerDelay * 1.5, // More staggered for distinct cards
                ease: customEasing,
                y: { // Custom y-axis floating animation
                  repeat: 3,
                  duration: 6.5,
                  ease: "easeInOut"
                }
              }
            }
          : isAbsorbed 
            ? { 
                // When absorbed, go to center and behind logo
                x: 0, 
                y: 0, 
                scale: 0.1, 
                opacity: 0,
                rotate: 0,
                zIndex: 1, // Lower z-index to go behind the logo
                transition: { 
                  duration: 0.8, // Slower absorption
                  ease: customEasing
                }
              } 
            : { 
                // Normal state, flowing to center
                x: 0, 
                y: 0, 
                scale: 0.8,
                opacity: 1,
                zIndex: 5,
                transition: { 
                  duration: 3.2, // Slower initial movement
                  delay: index * staggerDelay * 1.5, // More staggered
                  ease: customEasing 
                }
              }
      }
      onAnimationComplete={() => {
        if (!isAbsorbed && !isConverted && onComplete) {
          onComplete();
        }
      }}
    >
      {isConverted ? (
        <div className="flex items-center space-x-2">
          <CircleCheck className="w-4 h-4 text-green-400 shrink-0" />
          <div className="text-xs font-medium">
            <span className="text-white">{name} </span>
            <span className="text-gray-300 text-[10px]">{action}</span>
          </div>
        </div>
      ) : (
        <span className="text-white/90 text-xs font-medium">Lead</span>
      )}
    </motion.div>
  );
};

export default LeadCard;
