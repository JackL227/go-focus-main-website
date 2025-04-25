
import React from 'react';
import { motion } from 'framer-motion';

interface ProcessingLogoProps {
  isProcessing: boolean;
}

const ProcessingLogo = ({ isProcessing }: ProcessingLogoProps) => {
  return (
    <div className="relative z-10">
      <motion.div className="relative w-[230px] h-[230px] sm:w-[280px] sm:h-[280px]">
        {/* Blue gradient glow */}
        <div className="absolute inset-0 rounded-full">
          <div className="absolute inset-0 bg-gradient-to-r from-[#001b48] to-[#0133ff] rounded-full opacity-40 blur-[80px]" />
        </div>
        
        {/* Inner glow */}
        <div className="absolute inset-[30%] rounded-full opacity-70 blur-[30px] bg-gradient-to-r from-[#0133ff] to-[#001b48]" />
        
        {/* Logo image */}
        <motion.img
          src="/lovable-uploads/b8745b56-c4dc-436f-b09b-b7945d41015f.png"
          alt="Go Focus AI Logo"
          className="w-full h-full object-contain relative z-10 p-16"
          animate={{
            filter: ['drop-shadow(0 0 8px rgba(1, 51, 255, 0.4))', 'drop-shadow(0 0 12px rgba(1, 51, 255, 0.6))', 'drop-shadow(0 0 8px rgba(1, 51, 255, 0.4))']
          }}
          transition={{
            duration: 3,
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
