
import React from 'react';
import { motion } from 'framer-motion';

interface AutomatedSalesCardProps {
  name: string;
  action: string;
  delay?: number;
}

const AutomatedSalesCard = ({ name, action, delay = 0 }: AutomatedSalesCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.95, transition: { duration: 0.4 } }}
      transition={{ 
        type: "spring", 
        stiffness: 120, 
        damping: 16,
        duration: 0.5, 
        delay,
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 } 
      }}
      className="bg-[#1A1F2C]/90 rounded-lg p-4 border border-[#2A2F3C]/50 shadow-lg w-[280px] mb-3"
    >
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse-soft shrink-0" />
        <div className="text-sm">
          <span className="text-white font-medium">{name} </span>
          <span className="text-gray-400">{action}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default AutomatedSalesCard;
