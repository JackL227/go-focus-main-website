
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
    initial: { opacity: 0, y: 20, scale: 0.95, rotate: -3 },
    animate: { opacity: 1, y: 0, scale: 1, rotate: 0 },
    exit: { opacity: 0, y: -20, scale: 0.95, rotate: 3 }
  } : {
    initial: { opacity: 0, x: 50, scale: 0.95, rotate: -5 },
    animate: { opacity: 1, x: 0, scale: 1, rotate: 0 },
    exit: { opacity: 0, x: -50, scale: 0.95, rotate: 5 }
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
        bg-[#1F1F22]/90 backdrop-blur-sm rounded-lg p-4 border border-[#2d2d2d]/50 shadow-lg
        hover:border-primary/30 hover:shadow-[0_0_15px_rgba(0,245,160,0.15)] transition-all duration-300
        ${isMobile ? 'min-w-[200px] flex-shrink-0' : 'w-full mb-3'}
      `}
      whileHover={{ 
        scale: 1.03,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2), 0 0 10px rgba(0, 245, 160, 0.2)'
      }}
    >
      <div className="flex items-center space-x-2">
        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
          <CircleCheck className="w-3 h-3 text-primary shrink-0" />
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
