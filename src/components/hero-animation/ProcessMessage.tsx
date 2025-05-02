
import React from 'react';
import { motion } from 'framer-motion';

interface ProcessMessageProps {
  message: string;
}

const ProcessMessage = ({ message }: ProcessMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full flex items-center shadow-md border border-primary/20"
      aria-live="polite"
      role="status"
    >
      <span className="flex space-x-1 mr-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2 w-2 bg-primary rounded-full inline-block"
            animate={{ y: ["0%", "-50%", "0%"] }}
            transition={{
              duration: 0.9, // Slowed down to 0.9 seconds
              repeat: Infinity,
              repeatType: "loop",
              delay: i * 0.3, // Increased delay between dots
              ease: "easeInOut"
            }}
          />
        ))}
      </span>
      <span className="text-sm font-medium text-foreground">{message}</span>
    </motion.div>
  );
};

export default ProcessMessage;
