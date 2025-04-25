
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

  return (
    <motion.div
      className={`absolute ${isConverted 
        ? 'rounded-lg p-3 bg-[#1F1F22] border border-[#2d2d2d]/50 shadow-[0_4px_20px_rgba(255,255,255,0.15)]' 
        : `${cardSize} rounded-pill bg-[#1F1F22]`} shadow-lg flex items-center justify-center`}
      initial={{ 
        x: position?.x ?? (isConverted ? 0 : -350), 
        y: position?.y ?? 0,
        scale: isConverted ? 0.1 : 1, 
        opacity: isConverted ? 0 : 1,
        rotate: rotate ?? (Math.random() * 12 - 6)
      }}
      animate={
        isConverted 
          ? {
              x: [null, 1000],
              y: [null, position?.y ?? 0, (position?.y ?? 0) - 20, (position?.y ?? 0) + 20, position?.y ?? 0],
              scale: [null, 1, 0.95, 0.9],
              opacity: [null, 1, 0.8, 0],
              rotate: 0,
              transition: {
                duration: 4.5,
                delay: staggerDelay,
                ease: [0.4, 0, 0.2, 1],
                times: [0, 0.4, 0.7, 1]
              }
            }
          : isAbsorbed 
            ? { 
                x: 0, 
                y: 0, 
                scale: 0.1, 
                opacity: 0,
                rotate: 0,
                transition: { 
                  duration: 0.4, 
                  ease: "easeInOut" 
                }
              } 
            : { 
                x: 0, 
                y: 0, 
                scale: 0.8,
                opacity: 1,
                transition: { 
                  duration: 2,
                  delay: index * staggerDelay,
                  ease: [0.4, 0, 0.2, 1]
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
