
import React, { useRef } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import { ANIMATION_SETTINGS } from './constants';

interface LeadCardProps {
  index: number;
  isAbsorbed?: boolean;
  onComplete?: () => void;
  position?: {
    x: number;
    y: number;
    originalY?: number;
  };
  depth?: number; // 0-1 value controlling parallax effect
  speed?: number; // Movement speed multiplier
  opacity?: number; // Opacity based on depth
  scale?: number; // Scale based on depth
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
  speed = 1,
  opacity = 1,
  scale = 1,
  staggerDelay = 0.8,
  isConverted = false,
  name,
  action,
  exitRight = false
}: LeadCardProps) => {
  const { 
    OSCILLATION_AMPLITUDE, 
    OSCILLATION_SPEED, 
    SUCTION_EFFECT_RADIUS,
    SUCTION_EFFECT_STRENGTH,
    DEPTH_Z_RANGE,
    LEAD_SCALE_START,
    LEAD_SCALE_END,
    ABSORPTION_DURATION
  } = ANIMATION_SETTINGS;
  
  const elementRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef(Math.random() * 100); // Random starting time for oscillation
  const positionRef = useRef({ x: position?.x || -350, y: position?.y || 0 });
  const originalY = position?.originalY || position?.y || 0;
  
  // Custom path animation using useAnimationFrame
  useAnimationFrame((time) => {
    if (elementRef.current && !isAbsorbed && !isConverted && !exitRight) {
      timeRef.current += 0.01 * OSCILLATION_SPEED * speed;
      
      // Base movement towards center
      const baseX = positionRef.current.x + (0.6 * speed);
      positionRef.current.x = baseX;
      
      // Vertical oscillation (sine wave)
      const oscillationY = Math.sin(timeRef.current) * OSCILLATION_AMPLITUDE * depth;
      const baseY = originalY + oscillationY;
      positionRef.current.y = baseY;
      
      // Calculate distance from center for suction effect
      const distanceFromCenter = Math.sqrt(baseX * baseX + baseY * baseY);
      let suctionX = baseX;
      let suctionY = baseY;
      
      // Apply suction effect when close to center
      if (distanceFromCenter < SUCTION_EFFECT_RADIUS) {
        const suctionPower = 1 - (distanceFromCenter / SUCTION_EFFECT_RADIUS);
        const pullStrength = suctionPower * SUCTION_EFFECT_STRENGTH;
        
        // Calculate pull direction toward center (0,0)
        suctionX = baseX - (baseX * pullStrength * 0.025);
        suctionY = baseY - (baseY * pullStrength * 0.025);
      }
      
      // Apply final position
      elementRef.current.style.transform = `
        translate3d(${suctionX}px, ${suctionY}px, ${depth * DEPTH_Z_RANGE}px)
        scale(${scale - (Math.max(0, (1 - distanceFromCenter / 200)) * 0.3)})
      `;
      
      // Update opacity based on distance to create fade effect near center
      if (distanceFromCenter < 100) {
        const fadeOpacity = Math.max(0.1, distanceFromCenter / 100);
        elementRef.current.style.opacity = `${fadeOpacity * opacity}`;
      }
    }
  });

  // Dynamic glow effect based on depth
  const glowIntensity = depth * 0.15; // More depth = more glow
  const cardGlow = `0 0 ${8 + depth * 10}px rgba(0, 245, 160, ${glowIntensity})`;
  
  return (
    <motion.div
      ref={elementRef}
      className={`absolute ${
        isConverted 
          ? 'rounded-xl p-3 bg-[#1F1F22]/90 backdrop-blur-sm border border-[#2d2d2d]/50 shadow-lg flex items-center min-w-[220px] z-20' 
          : 'w-20 h-10 rounded-full bg-[#1F1F22]/90 backdrop-blur-sm flex items-center justify-center shadow-md'
      }`}
      initial={{ 
        x: position?.x ?? -350, 
        y: position?.y ?? 0,
        scale: isConverted ? 0.1 : scale * LEAD_SCALE_START,
        opacity: opacity * 0.6,
        rotate: Math.random() * 4 - 2,
        zIndex: isConverted ? 25 : Math.floor(depth * DEPTH_Z_RANGE)
      }}
      animate={
        exitRight
          ? {
              x: 400,
              y: position?.y ?? 0,
              scale: [0.9, 0.95, 0.9],
              opacity: [0.9, 0.7, 0],
              rotate: [0, 2, 4],
              zIndex: 15,
              transition: {
                duration: 5,
                ease: "easeOut",
                opacity: { times: [0, 0.7, 1], duration: 5 },
                scale: { times: [0, 0.5, 1], duration: 5 },
                rotate: { times: [0, 0.5, 1], duration: 5 }
              }
            }
          : isConverted 
            ? {
                x: ANIMATION_SETTINGS.NAME_CARD_START_X,
                y: position?.y ?? 0,
                scale: [0.1, 1.15, 1],
                opacity: 1,
                rotate: [-2, 1, 0],
                zIndex: 25,
                transition: {
                  duration: 1.2,
                  delay: ANIMATION_SETTINGS.RESULT_EMERGENCE_DELAY / 1000,
                  ease: "backOut",
                  scale: { times: [0, 0.7, 1], duration: 1.2 },
                  rotate: { times: [0, 0.7, 1], duration: 1.2 }
                }
              }
            : isAbsorbed 
              ? { 
                  x: 0,
                  y: 0,
                  scale: [LEAD_SCALE_END * scale, 0.05],
                  opacity: [opacity, 0],
                  rotate: 0,
                  zIndex: 20,
                  filter: "brightness(1.5)",
                  transition: {
                    duration: ABSORPTION_DURATION,
                    ease: [0.6, 0.01, 0.05, 0.95]
                  }
                }
              : {}
      }
      style={{
        boxShadow: isConverted 
          ? '0 4px 16px rgba(0, 0, 0, 0.3), 0 0 8px rgba(0, 245, 160, 0.2)' 
          : `0 2px 8px rgba(0, 0, 0, 0.25), ${cardGlow}`,
        willChange: 'transform, opacity',
      }}
    >
      {isConverted ? (
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <div className="w-4 h-4 text-primary shrink-0">✓</div>
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
