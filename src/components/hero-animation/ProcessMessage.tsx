
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
          className="absolute z-30 py-1 px-3 rounded-full bg-[#1A1F2C]/90 backdrop-blur-sm border border-[#00F5A0]/30 shadow-md"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <div className="flex items-center space-x-2">
            <div
              className="w-2 h-2 rounded-full bg-[#00F5A0]"
              style={{
                animation: "pulse 1s infinite",
              }}
            />
            <span className="text-white text-sm font-medium">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProcessMessage;
