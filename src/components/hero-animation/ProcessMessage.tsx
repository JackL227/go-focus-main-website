
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 bg-[#1A1F2C]/80 backdrop-blur-sm border border-[#2A2F3C] px-6 py-3 rounded-lg shadow-lg z-20"
        >
          <span className="text-white font-medium">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProcessMessage;
