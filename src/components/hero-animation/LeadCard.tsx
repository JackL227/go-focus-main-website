
import React from 'react';
import { motion } from 'framer-motion';
import { CircleCheck } from 'lucide-react';

interface LeadCardProps {
  index: number;
  isAbsorbed?: boolean;
  onComplete?: () => void;
  position?: {x: number, y: number};
  staggerDelay?: number;
  isConverted?: boolean;
  name?: string;
  action?: string;
  exitRight?: boolean;
}

const LeadCard = ({ 
  index, 
  isAbsorbed = false,
  onComplete,
  position,
  staggerDelay = 0.5,
  isConverted = false,
  name,
  action,
  exitRight = false
}: LeadCardProps) => {
  // Custom easing for smoother animation
  const customEasing = [0.4, 0, 0.2, 1];
  
  return (
    <motion.div
      className={`absolute ${
        isConverted 
          ? 'rounded-xl p-3 bg-[#1F1F22] border border-[#2d2d2d]/50 shadow-lg flex items-center' 
          : 'w-20 h-10 rounded-full bg-[#1F1F22] flex items-center justify-center shadow-md'
      }`}
      initial={{ 
        x: position?.x ?? -350, 
        y: position?.y ?? 0,
        scale: isConverted ? 0.1 : 1, 
        opacity: 0.5,
        rotate: Math.random() * 6 - 3, // Reduced rotation for more subtle effect
        zIndex: isConverted ? 15 : 20
      }}
      animate={
        exitRight
          ? {
              x: 350, // Move all the way to the right edge
              y: position?.y ?? 0,
              scale: 0.9,
              opacity: [0.9, 0.2, 0], // Fade out as it moves right
              rotate: 0,
              zIndex: 15,
              transition: {
                duration: 6, // Slower exit animation
                delay: 0.2,
                ease: customEasing,
                opacity: {
                  times: [0, 0.8, 1],
                  duration: 6
                }
              }
            }
          : isConverted 
            ? {
                x: 100, // Position just to the right of logo
                y: position?.y ?? 0, 
                scale: 0.9,
                opacity: 1,
                rotate: 0,
                zIndex: 15,
                transition: {
                  duration: 4.5, // Slower animation for more elegant movement
                  delay: 0.3,
                  ease: customEasing
                }
              }
            : isAbsorbed 
              ? { 
                  x: 0,
                  y: 0,
                  scale: 0.1,
                  opacity: 0,
                  rotate: 0,
                  zIndex: 5, // Behind the logo
                  transition: {
                    duration: 1.3, // Slower absorption
                    ease: customEasing
                  }
                }
              : {
                  x: 0,
                  y: 0,
                  scale: [1, 0.9, 0.8], // Gradually scale down as it approaches the center
                  opacity: [0.9, 0.7, 0.5], // Gradually fade as it approaches the center
                  zIndex: 20,
                  transition: {
                    duration: 4.5, // Slower initial movement
                    delay: index * staggerDelay,
                    ease: customEasing,
                    scale: {
                      times: [0, 0.5, 1],
                      duration: 4.5
                    },
                    opacity: {
                      times: [0, 0.5, 1],
                      duration: 4.5
                    }
                  }
                }
      }
      onAnimationComplete={() => {
        if (!isAbsorbed && !isConverted && !exitRight && onComplete) {
          onComplete();
        }
      }}
      style={{
        boxShadow: isConverted ? '0 4px 12px rgba(0, 0, 0, 0.25)' : '0 2px 8px rgba(0, 0, 0, 0.2)',
        transform: isConverted ? 'translateZ(5px)' : 'translateZ(0)'
      }}
    >
      {isConverted ? (
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <CircleCheck className="w-4 h-4 text-primary shrink-0" />
          </div>
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
