
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
              opacity: [0.4, 0.5, 0.4]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        {/* Inner glow */}
        <motion.div 
          className="absolute inset-[30%] rounded-full opacity-70 blur-[30px] bg-gradient-to-r from-[#0247FF] to-[#001b48]"
          animate={{
            opacity: [0.65, 0.75, 0.65]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Logo image */}
        <img
          src="/lovable-uploads/b8745b56-c4dc-436f-b09b-b7945d41015f.png"
          alt="Go Focus AI Logo"
          className="w-full h-full object-contain relative z-10 p-16"
          style={{ filter: 'drop-shadow(0 0 10px rgba(2, 71, 255, 0.6))' }}
        />
      </motion.div>
    </div>
  );
};

export default ProcessingLogo;
