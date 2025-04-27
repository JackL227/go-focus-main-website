
import React from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import { BookOpen, Calendar, Check } from 'lucide-react';
import { ANIMATION_SETTINGS } from './constants';

interface OutputCardProps {
  name: string;
  action: string;
  index: number;
  isMobile: boolean;
}

const OutputCard = ({ name, action, index, isMobile }: OutputCardProps) => {
  const elementRef = React.useRef<HTMLDivElement>(null);
  const timeRef = React.useRef(Math.random() * 10); // Random starting time for wave effect
  const { HORIZONTAL_WAVE_AMPLITUDE, HORIZONTAL_WAVE_SPEED } = ANIMATION_SETTINGS;
  
  // Enhanced horizontal wave effect animation with smoother motion
  useAnimationFrame((time) => {
    if (elementRef.current && !isMobile) {
      timeRef.current += 0.01 * HORIZONTAL_WAVE_SPEED;
      const waveY = Math.sin(timeRef.current + index * 0.8) * HORIZONTAL_WAVE_AMPLITUDE;
      elementRef.current.style.transform = `translateY(${waveY}px) scale(1)`;
    }
  });
  
  const animationProps = isMobile ? {
    initial: { opacity: 0, y: 20, scale: 0.95, rotate: -1 },
    animate: { opacity: 1, y: 0, scale: 1, rotate: 0 },
    exit: { opacity: 0, y: -20, scale: 0.95, rotate: 1 }
  } : {
    initial: { opacity: 0, x: 50, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -50, scale: 0.95 }
  };

  // Determine icon based on action text
  const getIcon = () => {
    if (action.includes('call') || action.includes('consultation') || action.includes('viewing')) {
      return <Calendar className="w-3 h-3 text-primary shrink-0" />;
    } else if (action.includes('course') || action.includes('enrolled') || action.includes('program') || action.includes('academy')) {
      return <BookOpen className="w-3 h-3 text-primary shrink-0" />;
    } else {
      return <Check className="w-3 h-3 text-primary shrink-0" />;
    }
  };
  
  // Calculate a "freshness" value that decreases with index for visual hierarchy
  const freshness = 1 - (index * 0.15);
  const glowIntensity = Math.max(0.03, freshness * 0.2);
  
  return (
    <motion.div
      ref={elementRef}
      {...animationProps}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 24,
        mass: 1,
        duration: 0.7
      }}
      className={`
        bg-[#1F1F22]/90 backdrop-blur-md rounded-lg p-4 border border-[#2d2d2d]/50
        hover:border-primary/30 transition-all duration-500
        ${isMobile ? 'min-w-[200px] flex-shrink-0' : 'w-full'}
      `}
      style={{
        boxShadow: `0 4px 16px rgba(0, 0, 0, 0.2), 0 0 ${8 + freshness * 12}px rgba(0, 245, 160, ${glowIntensity})`,
        willChange: 'transform',
      }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: `0 6px 20px rgba(0, 0, 0, 0.25), 0 0 16px rgba(0, 245, 160, ${glowIntensity * 2})`,
        transition: { duration: 0.2 }
      }}
    >
      <div className="flex items-center space-x-2">
        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
          {getIcon()}
        </div>
        <div className="text-sm font-medium">
          <span className="text-white">{name} </span>
          <span className="text-gray-300 text-xs">{action}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default OutputCard;
