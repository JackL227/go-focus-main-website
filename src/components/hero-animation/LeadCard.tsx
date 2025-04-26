
import React from 'react';
import { motion } from 'framer-motion';
import { CircleCheck } from 'lucide-react';
import { ANIMATION_SETTINGS } from './constants';

interface LeadCardProps {
  index: number;
  isAbsorbed?: boolean;
  onComplete?: () => void;
  position?: {x: number, y: number};
  depth?: number; // 0-1 value controlling parallax effect
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
  depth = 0.5,
  staggerDelay = 0.8,
  isConverted = false,
  name,
  action,
  exitRight = false
}: LeadCardProps) => {
  const customEasing = [0.4, 0, 0.2, 1];
  
  // Scale factor based on depth (closer items are bigger)
  const scaleBase = 0.9 + (depth * 0.2); // Scale between 0.9 and 1.1
  
  // Speed factor based on depth (closer items move faster)
  const durationBase = 4.5 - (depth * 1.5); // Duration between 3.0 and 4.5
  
  // Vertical wobble - more pronounced for closer items
  const wobbleAmount = 5 + (depth * 10); // Wobble between 5px and 15px
  
  return (
    <motion.div
      className={`absolute ${
        isConverted 
          ? 'rounded-xl p-3 bg-[#1F1F22]/90 backdrop-blur-sm border border-[#2d2d2d]/50 shadow-lg flex items-center min-w-[220px] z-20' 
          : 'w-20 h-10 rounded-full bg-[#1F1F22]/90 backdrop-blur-sm flex items-center justify-center shadow-md'
      }`}
      initial={{ 
        x: position?.x ?? -350, 
        y: position?.y ?? 0,
        scale: isConverted ? 0.1 : scaleBase, 
        opacity: 0.5,
        rotate: Math.random() * 4 - 2,
        zIndex: isConverted ? 25 : Math.floor(depth * 30) // Z-index based on depth
      }}
      animate={
        exitRight
          ? {
              x: ANIMATION_SETTINGS.NAME_CARD_END_X,
              y: position?.y ?? 0,
              scale: 0.9,
              opacity: [0.9, 0.6, 0],
              rotate: [0, 2, 5],
              zIndex: 15,
              transition: {
                duration: 6,
                ease: customEasing,
                opacity: {
                  times: [0, 0.7, 1],
                  duration: 6
                },
                rotate: {
                  times: [0, 0.5, 1],
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
                rotate: [-5, 2, 0],
                zIndex: 25,
                transition: {
                  duration: 0.8,
                  delay: 0.2,
                  ease: customEasing,
                  scale: {
                    times: [0, 0.6, 1],
                    duration: 0.8
                  },
                  rotate: {
                    times: [0, 0.7, 1],
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
                  filter: "brightness(1.5)",
                  transition: {
                    duration: 0.8,
                    ease: [0.19, 1.0, 0.22, 1.0] // Exaggerated ease-out for absorption
                  }
                }
              : {
                  x: 0,
                  y: [position?.y ?? 0, (position?.y ?? 0) + wobbleAmount, (position?.y ?? 0) - wobbleAmount/2, position?.y ?? 0],
                  scale: [scaleBase, scaleBase * 0.97, scaleBase * 0.94],
                  opacity: [0.9, 0.85, 0.8],
                  rotate: [Math.random() * 3 - 1.5, Math.random() * 3 - 1.5, 0],
                  zIndex: Math.floor(depth * 30),
                  transition: {
                    duration: durationBase,
                    delay: index * staggerDelay,
                    ease: customEasing,
                    y: {
                      times: [0, 0.3, 0.7, 1],
                      repeat: 0,
                      duration: durationBase
                    },
                    scale: {
                      times: [0, 0.5, 1],
                      duration: durationBase
                    },
                    opacity: {
                      times: [0, 0.5, 1],
                      duration: durationBase
                    },
                    rotate: {
                      times: [0, 0.5, 1],
                      duration: durationBase
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
          ? '0 4px 16px rgba(0, 0, 0, 0.3), 0 0 4px rgba(0, 245, 160, 0.2)' 
          : '0 2px 8px rgba(0, 0, 0, 0.25), 0 0 3px rgba(0, 245, 160, 0.15)',
        transform: `perspective(1000px) translateZ(${depth * 10}px)`,
      }}
      whileHover={{
        scale: isConverted ? 1.03 : scaleBase * 1.05,
        transition: { duration: 0.2 }
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
        <div className="flex items-center justify-center w-full h-full relative overflow-hidden">
          <span className="text-white/90 text-xs font-medium relative z-10">Lead</span>
          {/* Shimmer effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{
              x: ['120%', '-120%'],
            }}
            transition={{
              x: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
                repeatDelay: Math.random() * 5 + 2
              }
            }}
          />
        </div>
      )}
    </motion.div>
  );
};

export default LeadCard;
