
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
  staggerDelay = 0.1, // Reduced from 0.2 to 0.1 for smoother flow
  isConverted = false,
  name,
  action
}: LeadCardProps) => {
  const sizeClasses = {
    sm: 'w-16 h-16', // Made circular with equal width/height
    md: 'w-20 h-20', // Made circular with equal width/height
    lg: 'w-24 h-24'  // Made circular with equal width/height
  };
  
  const cardSize = sizeClasses[size];

  return (
    <motion.div
      className={`absolute ${isConverted 
        ? 'rounded-lg p-3 bg-[#1F1F22] border border-[#2d2d2d]/50 shadow-lg' 
        : `${cardSize} rounded-full bg-[#1A1A1D] shadow-lg`} flex items-center justify-center`}
      initial={{ 
        x: position?.x ?? (isConverted ? 0 : -350), 
        y: position?.y ?? 0,
        scale: isConverted ? 0.1 : 1, 
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
                duration: 2.5,
                delay: staggerDelay,
                ease: "easeOut"
              }
            }
          : isAbsorbed 
            ? { 
                x: 0, 
                y: 0, 
                scale: 0.3, // Smaller scale for better absorption effect
                opacity: 0,
                rotate: 0,
                filter: "blur(2px)", // Add blur for absorption effect
                transition: { 
                  duration: 0.3, // Faster absorption (300ms)
                  ease: "easeInOut" 
                }
              } 
            : { 
                x: 0, 
                y: 0, 
                scale: [1, 0.8, 0.6],
                opacity: [1, 0.8, 0.5],
                transition: { 
                  duration: 5, // Increased to 5s for total travel duration
                  delay: index * staggerDelay,
                  ease: "easeOut",
                  times: [0, 0.7, 1]
                }
              }
      }
      onAnimationComplete={() => {
        if (!isAbsorbed && !isConverted && onComplete) {
          onComplete();
        }
      }}
      style={{
        boxShadow: isConverted 
          ? '0 4px 10px rgba(0,0,0,0.3)' 
          : '0 4px 8px rgba(0,0,0,0.5)'
      }}
    >
      {isConverted ? (
        <div className="flex items-center space-x-2">
          <CircleCheck className="w-4 h-4 text-green-400 shrink-0" />
          <div className="text-xs font-medium">
            <span className="text-white font-semibold">{name} </span>
            <span className="text-gray-300 text-[10px]">{action}</span>
          </div>
        </div>
      ) : (
        <span className="text-white text-xs font-semibold">Lead</span>
      )}
    </motion.div>
  );
};

export default LeadCard;
