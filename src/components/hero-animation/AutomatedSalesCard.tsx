
import React from 'react';
import { motion } from 'framer-motion';
import { CircleCheck } from 'lucide-react';

interface AutomatedSalesCardProps {
  name: string;
  action: string;
  delay?: number;
  index?: number;
  isRight?: boolean;
}

const AutomatedSalesCard = ({ 
  name, 
  action, 
  delay = 0, 
  index = 0,
  isRight = true
}: AutomatedSalesCardProps) => {
  const animationProps = isRight ? {
    initial: { opacity: 0, x: 40, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: 100, scale: 0.95 }
  } : {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.95 }
  };

  return (
    <motion.div
      {...animationProps}
      transition={{ 
        type: "spring", 
        stiffness: 120, 
        damping: 16,
        duration: 0.5, 
        delay,
      }}
      className="w-full bg-[#1A1B1F] rounded-lg p-3 border border-[#2A2F3C]/50"
    >
      <div className="flex items-center space-x-2">
        <CircleCheck className="w-4 h-4 text-green-400" />
        <div className="text-sm">
          <span className="text-white font-medium">{name} </span>
          <span className="text-gray-300 text-xs">{action}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default AutomatedSalesCard;
