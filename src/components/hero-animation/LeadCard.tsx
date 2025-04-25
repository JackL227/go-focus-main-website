
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
  // Updated size classes for perfectly circular shape
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-24 h-24'
  };
  
  const cardSize = sizeClasses[size];

  return (
    <motion.div
      className={`absolute ${
        isConverted 
          ? 'rounded-lg p-3 bg-[#1F1F22] border border-[#2d2d2d]/50' 
          : `${cardSize} rounded-full flex items-center justify-center bg-[#1A1A1D] border border-[#2d2d2d]/50`
      } shadow-lg`}
      initial={{ 
        x: position?.x ?? (isConverted ? 0 : -350), 
        y: position?.y ?? 0,
        scale: isConverted ? 0 : 1, 
        opacity: isConverted ? 0 : 1,
        rotate: rotate ?? (Math.random() * 16 - 8)
      }}
      animate={
        isConverted 
          ? {
              x: position?.x ?? 350,
              y: position?.y ?? 0,
              scale: 1,
              opacity: 1,
              rotate: 0,
              transition: {
                duration: 3.5,
                delay: staggerDelay,
                ease: [0.34, 1.56, 0.64, 1]
              }
            }
          : isAbsorbed 
            ? { 
                x: 0, 
                y: 0, 
                scale: 0, 
                opacity: 0,
                rotate: 0,
                transition: { 
                  duration: 0.8, 
                  ease: [0.43, 0.13, 0.23, 0.96]
                }
              } 
            : { 
                x: 0, 
                y: 0, 
                scale: 0.7,
                opacity: 1,
                transition: { 
                  duration: 2.8,
                  delay: index * staggerDelay,
                  ease: [0.34, 1.56, 0.64, 1]
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
        <div className="flex items-center space-x-2 whitespace-nowrap">
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
