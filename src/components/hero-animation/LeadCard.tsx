
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
}

const LeadCard = ({ 
  index, 
  isAbsorbed = false,
  onComplete,
  position,
  staggerDelay = 0.3,
  isConverted = false,
  name,
  action
}: LeadCardProps) => {
  // Custom easing for smoother animation
  const customEasing = [0.4, 0, 0.2, 1];
  
  return (
    <motion.div
      className={`absolute ${isConverted ? 'rounded-lg p-3 bg-[#1F1F22] border border-[#2d2d2d]/50 shadow-lg' : 'w-20 h-10 rounded-pill bg-[#1F1F22]'} flex items-center justify-center`}
      initial={{ 
        x: position?.x ?? -350, 
        y: position?.y ?? 0,
        scale: isConverted ? 0.1 : 1, 
        opacity: 0.3,
        rotate: Math.random() * 12 - 6,
        zIndex: isConverted ? 5 : 10
      }}
      animate={
        isConverted 
          ? {
              x: 0, // Stay in center
              y: [0, -10, 0], // Subtle floating motion
              scale: 0.9,
              opacity: [0.9, 0.7],
              rotate: 0,
              zIndex: 5,
              transition: {
                duration: 8, // Slower animation
                delay: staggerDelay,
                ease: customEasing,
                y: {
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut"
                }
              }
            }
          : isAbsorbed 
            ? { 
                x: 0,
                y: 0,
                scale: 0.1,
                opacity: 0,
                rotate: 0,
                zIndex: 1,
                transition: {
                  duration: 1.2, // Slower absorption
                  ease: customEasing
                }
              }
            : {
                x: 0,
                y: 0,
                scale: 0.8,
                opacity: 1,
                zIndex: 10,
                transition: {
                  duration: 4, // Slower initial movement
                  delay: index * staggerDelay,
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
