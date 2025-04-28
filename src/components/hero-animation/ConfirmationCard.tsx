
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface ConfirmationCardProps {
  name: string;
  action: string;
  delay: number;
  path: 'straight' | 'up' | 'down';
}

const ConfirmationCard: React.FC<ConfirmationCardProps> = ({ name, action, delay, path }) => {
  // Define different paths for the cards
  const pathVariants = {
    straight: { y: 0 },
    up: { y: -40 },
    down: { y: 40 }
  };
  
  // Entry animation with path variation
  const variants = {
    initial: { 
      x: '-10vw', 
      opacity: 0,
      scale: 0.7,
      ...pathVariants[path]
    },
    animate: { 
      x: 0, 
      opacity: 1,
      scale: 1,
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        damping: 10,
        delay: delay * 0.001
      }
    },
    exit: {
      x: '10vw',
      opacity: 0,
      transition: { duration: 0.7 }
    }
  };

  return (
    <motion.div
      className="bg-white/95 backdrop-blur-sm border border-green-200 shadow-md rounded-lg p-4 w-[180px] md:w-[220px]"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
    >
      <div className="flex items-center gap-3">
        <div className="shrink-0">
          <CheckCircle className="h-5 w-5 text-green-500" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-800">{name}</h4>
          <p className="text-xs text-gray-600">{action}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ConfirmationCard;
