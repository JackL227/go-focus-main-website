
import React from 'react';
import { motion } from 'framer-motion';

interface ProcessingLogoProps {
  isProcessing: boolean;
}

const ProcessingLogo = ({ isProcessing }: ProcessingLogoProps) => {
  return (
    <div className="relative z-10">
      <motion.div
        className="relative w-[230px] h-[230px] sm:w-[280px] sm:h-[280px]"
        animate={{
          scale: isProcessing ? [1, 1.08, 1] : [1, 1.05, 1],
        }}
        transition={{
          duration: isProcessing ? 1.2 : 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Blue gradient glow */}
        <div className="absolute inset-0 rounded-full opacity-40 blur-[80px] bg-gradient-to-r from-[#347bff] to-[#1a90ff]" />
        
        {/* Secondary glow */}
        <motion.div 
          className="absolute inset-0 rounded-full opacity-60 blur-[50px] bg-gradient-to-r from-[#347bff] to-[#1a90ff]"
          animate={{
            opacity: isProcessing ? [0.6, 0.8, 0.6] : [0.5, 0.6, 0.5]
          }}
          transition={{
            duration: isProcessing ? 0.8 : 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Inner glow */}
        <div className="absolute inset-[30%] rounded-full opacity-70 blur-[30px] bg-gradient-to-r from-[#347bff] to-[#1a90ff]" />
        
        {/* Logo image */}
        <motion.img
          src="/lovable-uploads/0db53fba-cb8c-4536-b39c-c16764554733.png"
          alt="Logo"
          className="w-full h-full object-contain p-16 relative z-20"
          animate={{
            scale: isProcessing ? [1, 1.05, 1] : [1, 1.02, 1],
            filter: isProcessing
              ? ['drop-shadow(0 0 12px rgba(52, 123, 255, 0.6))', 'drop-shadow(0 0 20px rgba(52, 123, 255, 0.9))', 'drop-shadow(0 0 12px rgba(52, 123, 255, 0.6))']
              : ['drop-shadow(0 0 8px rgba(52, 123, 255, 0.4))', 'drop-shadow(0 0 12px rgba(52, 123, 255, 0.6))', 'drop-shadow(0 0 8px rgba(52, 123, 255, 0.4))']
          }}
          transition={{
            duration: isProcessing ? 1 : 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
};

export default ProcessingLogo;
