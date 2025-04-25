
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProcessMessageProps {
  message: string;
  isVisible: boolean;
}

const ProcessMessage = ({ message, isVisible }: ProcessMessageProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 bg-[#1A1F2C]/80 backdrop-blur-sm border border-[#2A2F3C] px-6 py-3 rounded-lg shadow-lg z-30"
        >
          <span className="text-white font-medium flex items-center">
            {message}
            <motion.div 
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="ml-2 w-1.5 h-1.5 bg-blue-400 rounded-full"
            />
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProcessMessage;
