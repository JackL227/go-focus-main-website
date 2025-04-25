
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
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5, delay }}
      className="bg-[#1A1F2C] rounded-lg p-4 border border-[#2A2F3C] shadow-lg w-[280px]"
    >
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <div className="text-sm">
          <span className="text-white font-medium">{name}</span>
          <span className="text-gray-400 ml-1">{action}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default AutomatedSalesCard;
