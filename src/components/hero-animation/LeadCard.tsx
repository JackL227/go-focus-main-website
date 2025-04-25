
import React from 'react';
import { motion } from 'framer-motion';

interface LeadCardProps {
  scale?: number;
  opacity?: number;
  x?: number;
  y?: number;
  rotate?: number;
  rotateY?: number;
  rotateZ?: number;
  size?: 'sm' | 'md' | 'lg';
  delay?: number;
  index?: number;
}

const LeadCard = ({ 
  scale = 1, 
  opacity = 1, 
  x = 0, 
  y = 0, 
  rotate = 0, 
  rotateY = 0,
  rotateZ = 0,
  size = 'md',
  delay = 0,
  index = 0
}: LeadCardProps) => {
  // Size classes for different card sizes
  const sizeClasses = {
    sm: 'w-14 h-8',
    md: 'w-20 h-10',
    lg: 'w-28 h-14'
  };

  // Slightly randomize the card appearance for more organic look
  const randomRotate = rotate + (Math.random() * 6 - 3);
  const randomY = y + (Math.random() * 10 - 5);

  return (
    <motion.div
      className={`${sizeClasses[size]} rounded-lg bg-[#2b2b2b] shadow-inner border border-[#3a3a3a] flex items-center justify-center`}
      style={{
        x,
        y: randomY,
        scale,
        opacity,
        rotate: randomRotate,
        rotateY,
        rotateZ,
        transformStyle: 'preserve-3d',
        boxShadow: '0 4px 8px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1)',
        zIndex: 20 - index % 10, // Ensure proper stacking
      }}
      initial={{ 
        scale, 
        opacity, 
        x, 
        y: randomY, 
        rotate: randomRotate, 
        rotateY, 
        rotateZ 
      }}
      animate={{ 
        scale, 
        opacity, 
        x, 
        y: randomY, 
        rotate: randomRotate, 
        rotateY, 
        rotateZ
      }}
      transition={{
        type: "spring",
        stiffness: 60,
        damping: 15,
        duration: 1.5,
        delay
      }}
    >
      <div className="w-full h-full flex items-center justify-center text-sm font-medium text-white p-2">
        <span className="whitespace-nowrap overflow-hidden text-ellipsis">Lead</span>
      </div>
    </motion.div>
  );
};

export default LeadCard;
