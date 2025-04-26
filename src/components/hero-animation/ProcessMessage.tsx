
import React from 'react';
import { motion } from 'framer-motion';

interface ProcessMessageProps {
  message: string;
}

const ProcessMessage = ({ message }: ProcessMessageProps) => {
  return (
    <motion.div
      className="absolute top-14 sm:top-20 left-1/2 transform -translate-x-1/2 z-40 bg-primary/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/30"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.3,
        ease: "easeOut"
      }}
    >
      <div className="flex items-center space-x-2">
        <div className="flex space-x-1">
          <motion.span 
            className="block w-1.5 h-1.5 rounded-full bg-primary"
            animate={{ y: [0, -3, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: 0
            }}
          />
          <motion.span 
            className="block w-1.5 h-1.5 rounded-full bg-primary"
            animate={{ y: [0, -3, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: 0.2
            }}
          />
          <motion.span 
            className="block w-1.5 h-1.5 rounded-full bg-primary"
            animate={{ y: [0, -3, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: 0.4
            }}
          />
        </div>
        <span className="text-xs font-medium text-primary">{message}</span>
      </div>
    </motion.div>
  );
};

export default ProcessMessage;
