
import React from 'react';
import { motion } from 'framer-motion';

interface AutomatedSalesCardProps {
  name: string;
  action: string;
  delay?: number;
  index?: number;
  isRight?: boolean;
  emoji?: string;
}

const EMOJIS = ["🎯", "🚀", "💼", "✨", "📅", "🤝"];

const AutomatedSalesCard = ({ 
  name, 
  action, 
  delay = 0, 
  index = 0,
  isRight = true,
  emoji
}: AutomatedSalesCardProps) => {
  // Random emoji or use provided one
  const cardEmoji = emoji || EMOJIS[index % EMOJIS.length];
  
  // Movement for right side cards vs center cards (for mobile)
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
      initial={animationProps.initial}
      animate={animationProps.animate}
      exit={animationProps.exit}
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
      className="bg-[#1A1F2C]/90 rounded-lg p-4 border border-[#2A2F3C]/50 shadow-lg w-full sm:w-[280px] mb-3"
      style={{ zIndex: 30 - index % 10 }}
    >
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-[#00F5A0] animate-pulse-soft shrink-0" />
        <div className="text-sm">
          <span className="text-white font-semibold">{name} </span>
          <span className="text-gray-400">{action}</span>
          <span className="ml-1">{cardEmoji}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default AutomatedSalesCard;
