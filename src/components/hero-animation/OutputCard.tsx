
import React from 'react';
import { motion } from 'framer-motion';

interface OutputCardProps {
  name: string;
  action: string;
  index: number;
  isMobile: boolean;
}

const OutputCard = ({ name, action, index, isMobile }: OutputCardProps) => {
  // Movement for different layouts
  const animationProps = isMobile ? {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.95 }
  } : {
    initial: { opacity: 0, x: 50, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -50, scale: 0.95 }
  };

  return (
    <motion.div
      {...animationProps}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 25,
        mass: 1,
        duration: 0.5, 
        delay: index * 0.1,
      }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3)",
        transition: { duration: 0.2 } 
      }}
      className={`
        bg-[#1d1d1d] rounded-lg p-4 border border-[#2d2d2d]/50 shadow-lg
        ${isMobile ? 'min-w-[200px] flex-shrink-0' : 'w-full mb-3'}
      `}
    >
      <div className="flex items-center space-x-2">
        <motion.div 
          className="w-2 h-2 rounded-full bg-[#00F5A0]" 
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <div className="text-sm">
          <span className="text-white font-medium">{name} </span>
          <span className="text-gray-400">{action}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default OutputCard;
