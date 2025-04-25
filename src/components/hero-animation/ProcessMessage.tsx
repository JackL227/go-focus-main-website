
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
          className="absolute top-1/4 left-1/2 -translate-x-1/2 bg-background/40 backdrop-blur-sm border border-primary/20 px-6 py-3 rounded-lg"
        >
          <span className="text-primary font-medium">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProcessMessage;
