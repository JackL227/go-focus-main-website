
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
  // Enhanced easing functions for smoother, more natural motion
  const customEasing = [0.34, 0.82, 0.39, 1]; // Smooth out
  const absorptionEasing = [0.54, 0.01, 0.3, 0.99]; // More natural absorption
  
  // Scale based on depth for a more realistic perspective effect
  const scaleBase = ANIMATION_SETTINGS.LEAD_SCALE_START - (depth * 0.4);
  
  // Duration varies slightly based on depth for more natural movement
  const durationBase = ANIMATION_SETTINGS.LEAD_FLOW_DURATION_BASE - (depth * ANIMATION_SETTINGS.LEAD_FLOW_DURATION_VARIATION);
  
  // Subtle wobble for floating effect, increases with depth
  const wobbleAmount = 5 + (depth * 10);

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
        zIndex: isConverted ? 25 : Math.floor(depth * 30)
      }}
      animate={
        exitRight
          ? {
              // Smooth exit to the right with natural easing
              x: ANIMATION_SETTINGS.NAME_CARD_END_X,
              y: position?.y ?? 0,
              scale: [1, 0.95],
              opacity: [1, 0.7, 0],
              rotate: [0, 1, 2],
              zIndex: 15,
              transition: {
                duration: ANIMATION_SETTINGS.EXIT_DURATION,
                ease: customEasing,
                opacity: { times: [0, 0.7, 1], duration: ANIMATION_SETTINGS.EXIT_DURATION },
                scale: { times: [0, 1], duration: ANIMATION_SETTINGS.EXIT_DURATION },
                rotate: { times: [0, 0.5, 1], duration: ANIMATION_SETTINGS.EXIT_DURATION }
              }
            }
          : isConverted 
            ? {
                // Smooth emergence of name card from center
                x: ANIMATION_SETTINGS.NAME_CARD_START_X,
                y: position?.y ?? 0,
                scale: [0.1, 1.05, 1],
                opacity: 1,
                rotate: [-1, 0.5, 0],
                zIndex: 25,
                transition: {
                  duration: 0.9,
                  delay: ANIMATION_SETTINGS.RESULT_EMERGENCE_DELAY / 1000,
                  ease: customEasing,
                  scale: { times: [0, 0.7, 1], duration: 0.9 },
                  rotate: { times: [0, 0.7, 1], duration: 0.9 }
                }
              }
            : isAbsorbed 
              ? { 
                  // Smooth absorption into the center logo
                  x: 0,
                  y: 0,
                  scale: [ANIMATION_SETTINGS.LEAD_SCALE_END, 0.1],
                  opacity: [1, 0],
                  rotate: 0,
                  zIndex: 15,
                  filter: "brightness(1.5)",
                  transition: {
                    duration: ANIMATION_SETTINGS.ABSORPTION_DURATION,
                    ease: absorptionEasing
                  }
                }
              : {
                  // Gradual flow from left to center with natural motion
                  x: 0,
                  y: [
                    position?.y ?? 0, 
                    (position?.y ?? 0) + wobbleAmount, 
                    (position?.y ?? 0) - wobbleAmount/2, 
                    position?.y ?? 0
                  ],
                  scale: [scaleBase, scaleBase * 0.92, ANIMATION_SETTINGS.LEAD_SCALE_END],
                  opacity: [0.95, 0.9, 0.85],
                  rotate: [Math.random() * 3 - 1.5, Math.random() * 2 - 1, 0],
                  zIndex: Math.floor(depth * 30),
                  transition: {
                    duration: durationBase,
                    delay: index * staggerDelay,
                    ease: "easeInOut",
                    y: {
                      times: [0, 0.3, 0.7, 1],
                      repeat: 0,
                      duration: durationBase
                    },
                    scale: {
                      times: [0, 0.6, 1],
                      duration: durationBase,
                      ease: "easeIn" // Gradually accelerate scaling down
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
