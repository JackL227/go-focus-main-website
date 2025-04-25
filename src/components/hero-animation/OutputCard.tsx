
import React from 'react';
import { motion } from 'framer-motion';
import { CircleCheck } from 'lucide-react';

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
      className={`
        bg-[#1F1F22] rounded-lg p-4 border border-[#2d2d2d]/50 shadow-lg
        ${isMobile ? 'min-w-[200px] flex-shrink-0' : 'w-full mb-3'}
      `}
    >
      <div className="flex items-center space-x-2">
        <CircleCheck className="w-4 h-4 text-green-400 shrink-0" />
        <div className="text-sm font-medium">
          <span className="text-white">{name} </span>
          <span className="text-gray-300 text-xs">{action}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default OutputCard;
