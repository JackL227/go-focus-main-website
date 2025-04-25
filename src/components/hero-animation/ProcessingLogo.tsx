
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
        {/* Blue gradient glow - primary background radial gradient */}
        <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
          isProcessing ? 'animate-pulse-soft' : ''
        }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-[#001b48] to-[#0133ff] rounded-full opacity-40 blur-[80px]"></div>
        </div>
        
        {/* Secondary glow - more intense when processing */}
        <motion.div 
          className="absolute inset-0 rounded-full opacity-60 blur-[50px]"
          style={{
            background: 'radial-gradient(circle, #0133ff 0%, #001b48 100%)'
          }}
          animate={{
            opacity: isProcessing ? [0.6, 0.8, 0.6] : [0.5, 0.6, 0.5]
          }}
          transition={{
            duration: isProcessing ? 0.8 : 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Inner glow - focused on center */}
        <div className="absolute inset-[30%] rounded-full opacity-70 blur-[30px] bg-gradient-to-r from-[#0133ff] to-[#001b48]" />
        
        {/* Animated ripple effect - faster when processing */}
        <motion.div 
          className="absolute inset-0 border-4 border-[#0133ff]/30 rounded-full"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{
            duration: isProcessing ? 1.5 : 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Processing ripple - only visible when processing */}
        {isProcessing && (
          <motion.div 
            className="absolute inset-0 border-2 border-[#0133ff]/70 rounded-full"
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.8, 0, 0.8],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
        
        {/* Logo image */}
        <motion.img
          src="/lovable-uploads/b8745b56-c4dc-436f-b09b-b7945d41015f.png"
          alt="Go Focus AI Logo"
          className="w-full h-full object-contain relative z-10 p-16"
          animate={{
            scale: isProcessing ? [1, 1.05, 1] : [1, 1.02, 1],
            filter: isProcessing
              ? ['drop-shadow(0 0 12px rgba(1, 51, 255, 0.6))', 'drop-shadow(0 0 20px rgba(1, 51, 255, 0.9))', 'drop-shadow(0 0 12px rgba(1, 51, 255, 0.6))']
              : ['drop-shadow(0 0 8px rgba(1, 51, 255, 0.4))', 'drop-shadow(0 0 12px rgba(1, 51, 255, 0.6))', 'drop-shadow(0 0 8px rgba(1, 51, 255, 0.4))']
          }}
          transition={{
            duration: isProcessing ? 1 : 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ filter: 'drop-shadow(0 0 10px rgba(1, 51, 255, 0.6))' }}
        />
      </motion.div>
    </div>
  );
};

export default ProcessingLogo;
