
import React from 'react';
import { motion } from 'framer-motion';

interface LeadCardProps {
  scale?: number;
  opacity?: number;
  x?: number;
  y?: number;
  rotate?: number;
  rotateY?: number;
  size?: 'sm' | 'md' | 'lg';
  delay?: number;
}

const LeadCard = ({ 
  scale = 1, 
  opacity = 1, 
  x = 0, 
  y = 0, 
  rotate = 0, 
  rotateY = 0,
  size = 'md',
  delay = 0
}: LeadCardProps) => {
  const sizeClasses = {
    sm: 'w-16 h-8',
    md: 'w-24 h-12',
    lg: 'w-32 h-16'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} rounded-lg bg-[#1e1e1e] shadow-inner border border-[#2A2F3C] flex items-center justify-center`}
      style={{
        x,
        y,
        scale,
        opacity,
        rotate,
        rotateY,
        transformStyle: 'preserve-3d',
        boxShadow: '0 4px 8px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1)',
      }}
      initial={{ scale, opacity, x, y, rotate, rotateY }}
      animate={{ 
        scale, 
        opacity, 
        x, 
        y, 
        rotate, 
        rotateY,
      }}
      transition={{
        duration: 1.5,
        delay,
        ease: [0.23, 0.13, 0.23, 0.96]
      }}
    >
      <div className="w-full h-full flex items-center justify-center text-sm text-white font-medium p-2">
        <span className="whitespace-nowrap overflow-hidden text-ellipsis">Lead</span>
      </div>
    </motion.div>
  );
};

export default LeadCard;
