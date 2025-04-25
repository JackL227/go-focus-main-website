
import React from 'react';
import { motion } from 'framer-motion';

interface CenterLogoProps {
  isProcessing?: boolean;
}

const CenterLogo = ({ isProcessing }: CenterLogoProps) => {
  return (
    <div className="absolute left-1/2 -translate-x-1/2">
      <motion.div className="relative w-[230px] h-[230px] sm:w-[280px] sm:h-[280px]">
        {/* Enhanced primary gradient glow */}
        <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
          isProcessing ? 'animate-pulse-soft' : ''
        }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-[#00F5A0] to-[#00D9F5] rounded-full opacity-50 blur-[100px]"></div>
        </div>
        
        {/* Enhanced secondary glow - more intense when processing */}
        <motion.div 
          className="absolute inset-0 rounded-full opacity-70 blur-[60px]"
          style={{
            background: 'linear-gradient(to right, #00F5A0, #00D9F5)'
          }}
          animate={{
            opacity: isProcessing ? [0.7, 0.9, 0.7] : [0.6, 0.7, 0.6]
          }}
          transition={{
            duration: isProcessing ? 0.8 : 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Enhanced inner glow - focused on center */}
        <div className="absolute inset-[30%] rounded-full opacity-80 blur-[40px] bg-gradient-to-r from-[#00F5A0] to-[#00D9F5]" />
        
        {/* Enhanced animated ripple effect */}
        <motion.div 
          className="absolute inset-0 border-4 border-[#00F5A0]/40 rounded-full"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: isProcessing ? 1.5 : 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Enhanced processing ripple */}
        {isProcessing && (
          <motion.div 
            className="absolute inset-0 border-2 border-[#00F5A0]/80 rounded-full"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.9, 0, 0.9],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
        
        {/* Logo image with enhanced glow */}
        <motion.img
          src="/lovable-uploads/b9eb9c06-5b4f-416d-af44-06190fbec508.png"
          alt="Go Focus AI Logo"
          className="w-full h-full object-contain relative z-10 p-16"
          animate={{
            scale: isProcessing ? [1, 1.05, 1] : [1, 1.02, 1],
            filter: isProcessing
              ? ['drop-shadow(0 0 15px rgba(0, 245, 160, 0.7))', 'drop-shadow(0 0 25px rgba(0, 245, 160, 1))', 'drop-shadow(0 0 15px rgba(0, 245, 160, 0.7))']
              : ['drop-shadow(0 0 10px rgba(0, 245, 160, 0.5))', 'drop-shadow(0 0 15px rgba(0, 245, 160, 0.7))', 'drop-shadow(0 0 10px rgba(0, 245, 160, 0.5))']
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

export default CenterLogo;
