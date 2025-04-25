
import React from 'react';
import { motion } from 'framer-motion';
import { CircleCheck } from 'lucide-react';
import { ANIMATION_SETTINGS } from './constants';

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
  staggerDelay = 0.8,
  isConverted = false,
  name,
  action,
  exitRight = false
}: LeadCardProps) => {
  const customEasing = [0.4, 0, 0.2, 1];
  
  return (
    <motion.div
      className={`absolute ${
        isConverted 
          ? 'rounded-xl p-3 bg-[#1F1F22] border border-[#2d2d2d]/50 shadow-lg flex items-center min-w-[220px]' 
          : 'w-20 h-10 rounded-full bg-[#1F1F22] flex items-center justify-center shadow-md'
      }`}
      initial={{ 
        x: position?.x ?? -350, 
        y: position?.y ?? 0,
        scale: isConverted ? 0.1 : 1, 
        opacity: 0.5,
        rotate: Math.random() * 4 - 2,
        zIndex: isConverted ? 25 : 20
      }}
      animate={
        exitRight
          ? {
              x: ANIMATION_SETTINGS.NAME_CARD_END_X,
              y: position?.y ?? 0,
              scale: 0.9,
              opacity: [0.9, 0.6, 0],
              rotate: 0,
              zIndex: 15,
              transition: {
                duration: 6,
                ease: customEasing,
                opacity: {
                  times: [0, 0.7, 1],
                  duration: 6
                }
              }
            }
          : isConverted 
            ? {
                x: ANIMATION_SETTINGS.NAME_CARD_START_X,
                y: position?.y ?? 0,
                scale: [0.1, 1.1, 1],
                opacity: 1,
                rotate: 0,
                zIndex: 25,
                transition: {
                  duration: 0.8,
                  delay: 0.2,
                  ease: customEasing,
                  scale: {
                    times: [0, 0.6, 1],
                    duration: 0.8
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
                  zIndex: 15,
                  transition: {
                    duration: 2,
                    ease: customEasing
                  }
                }
              : {
                  x: 0,
                  y: 0,
                  scale: [1, 0.95, 0.9],
                  opacity: [0.9, 0.8, 0.7],
                  zIndex: 20,
                  transition: {
                    duration: 4.5,
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
        boxShadow: isConverted 
          ? '0 4px 12px rgba(0, 0, 0, 0.25)' 
          : '0 2px 8px rgba(0, 0, 0, 0.2)',
        transform: isConverted ? 'translateZ(0)' : 'translateZ(0)'
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

