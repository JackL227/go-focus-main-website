
import React from 'react';
import { motion } from 'framer-motion';

interface ProcessingLogoProps {
  isProcessing?: boolean;
}

const ProcessingLogo = ({ isProcessing }: ProcessingLogoProps) => {
  return (
    <div className="relative z-10">
      <motion.div className="relative w-[230px] h-[230px] sm:w-[280px] sm:h-[280px]">
        {/* Blue gradient glow */}
        <div className="absolute inset-0 rounded-full">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-[#001b48] to-[#0247FF] rounded-full opacity-40 blur-[80px]"
            animate={{
              opacity: isProcessing ? [0.4, 0.6, 0.4] : [0.4, 0.5, 0.4],
              scale: isProcessing ? [1, 1.05, 1] : [1, 1.02, 1]
            }}
            transition={{
              duration: isProcessing ? 3 : 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        {/* Inner glow */}
        <motion.div 
          className="absolute inset-[30%] rounded-full opacity-70 blur-[30px] bg-gradient-to-r from-[#0247FF] to-[#001b48]"
          animate={{
            opacity: isProcessing ? [0.65, 0.85, 0.65] : [0.65, 0.75, 0.65]
          }}
          transition={{
            duration: isProcessing ? 2.5 : 3.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Animated ripple effect */}
        <motion.div 
          className="absolute inset-0 border-4 border-[#0247FF]/30 rounded-full"
          animate={{
            scale: isProcessing ? [1, 1.6, 1] : [1, 1.4, 1],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{
            duration: isProcessing ? 2 : 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Logo image */}
        <img
          src="/lovable-uploads/b8745b56-c4dc-436f-b09b-b7945d41015f.png"
          alt="Go Focus AI Logo"
          className="w-full h-full object-contain relative z-10 p-16"
          style={{ 
            filter: `drop-shadow(0 0 ${isProcessing ? 15 : 10}px rgba(2, 71, 255, ${isProcessing ? 0.8 : 0.6}))`
          }}
        />
        
        {/* Additional ripple for active processing */}
        {isProcessing && (
          <motion.div 
            className="absolute inset-0 border-2 border-[#0247FF]/70 rounded-full"
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.8, 0, 0.8],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default ProcessingLogo;
