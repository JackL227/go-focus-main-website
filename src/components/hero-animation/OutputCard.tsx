
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Check } from 'lucide-react';

interface OutputCardProps {
  name: string;
  action: string;
  index: number;
  isMobile: boolean;
}

const OutputCard = ({ name, action, index, isMobile }: OutputCardProps) => {
  const animationProps = isMobile ? {
    initial: { opacity: 0, y: 20, scale: 0.95, rotate: -2 },
    animate: { opacity: 1, y: 0, scale: 1, rotate: 0 },
    exit: { opacity: 0, y: -20, scale: 0.95, rotate: 2 }
  } : {
    initial: { opacity: 0, x: 50, scale: 0.95, rotate: -3 },
    animate: { opacity: 1, x: 0, scale: 1, rotate: 0 },
    exit: { opacity: 0, x: -50, scale: 0.95, rotate: 3 }
  };

  // Determine icon based on action text
  const getIcon = () => {
    if (action.includes('call') || action.includes('consultation') || action.includes('viewing')) {
      return <Calendar className="w-3 h-3 text-primary shrink-0" />;
    } else if (action.includes('course') || action.includes('enrolled') || action.includes('program') || action.includes('academy')) {
      return <BookOpen className="w-3 h-3 text-primary shrink-0" />;
    } else {
      return <Check className="w-3 h-3 text-primary shrink-0" />;
    }
  };

  return (
    <motion.div
      {...animationProps}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        mass: 1,
        duration: 0.8
      }}
      className={`
        bg-[#1F1F22]/90 backdrop-blur-sm rounded-lg p-4 border border-[#2d2d2d]/50 shadow-lg
        hover:border-primary/30 hover:shadow-[0_0_15px_rgba(0,245,160,0.15)] transition-all duration-500
        ${isMobile ? 'min-w-[200px] flex-shrink-0' : 'w-full'}
      `}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      <div className="flex items-center space-x-2">
        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
          {getIcon()}
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
