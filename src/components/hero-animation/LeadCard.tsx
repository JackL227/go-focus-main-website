
import React from 'react';
import { motion } from 'framer-motion';

interface LeadCardProps {
  scale?: number;
  opacity?: number;
  x?: number;
  y?: number;
  rotate?: number;
  size?: 'sm' | 'md' | 'lg';
}

const LeadCard = ({ scale = 1, opacity = 1, x = 0, y = 0, rotate = 0, size = 'md' }: LeadCardProps) => {
  const sizeClasses = {
    sm: 'w-16 h-8',
    md: 'w-24 h-12',
    lg: 'w-32 h-16'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} rounded-lg bg-background/20 backdrop-blur-sm border border-primary/20 shadow-lg`}
      style={{
        x,
        y,
        scale,
        opacity,
        rotate,
        transformStyle: 'preserve-3d',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}
    >
      <div className="w-full h-full flex items-center justify-center text-sm text-foreground/80 font-medium p-2">
        <span className="whitespace-nowrap overflow-hidden text-ellipsis">Lead Card</span>
      </div>
    </motion.div>
  );
};

export default LeadCard;
