
import React from 'react';
import { motion } from 'framer-motion';

interface CenterLogoProps {
  onLeadProcess: () => void;
  processingLead: boolean;
}

const CenterLogo = ({ onLeadProcess, processingLead }: CenterLogoProps) => {
  return (
    <div className="absolute left-1/2 -translate-x-1/2">
      <motion.div
        className="relative w-[230px] h-[230px] sm:w-[280px] sm:h-[280px]"
        animate={{
          scale: processingLead ? [1, 1.08, 1] : 1,
        }}
        transition={{
          duration: processingLead ? 1.2 : 0.5,
          ease: "easeInOut",
        }}
      >
        {/* Enhanced primary glow - stronger radial gradient */}
        <div className="absolute inset-0 rounded-full">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-[#00F5A0] to-[#00D9F5] rounded-full opacity-40 blur-[100px]"
            animate={{
              opacity: processingLead ? [0.4, 0.6, 0.4] : [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Intensified inner glow */}
        <motion.div 
          className="absolute inset-[20%] rounded-full opacity-70 blur-[40px]"
          style={{
            background: 'linear-gradient(to right, #00F5A0, #00D9F5)'
          }}
          animate={{
            opacity: processingLead ? [0.7, 0.9, 0.7] : [0.6, 0.8, 0.6]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Pulsing ring effect */}
        <motion.div 
          className="absolute inset-0 border-4 border-[#00F5A0]/30 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Logo image with enhanced glow */}
        <motion.img
          src="/lovable-uploads/b9eb9c06-5b4f-416d-af44-06190fbec508.png"
          alt="Go Focus AI Logo"
          className="w-full h-full object-contain relative z-10 p-16"
          style={{ 
            filter: 'drop-shadow(0 0 15px rgba(0, 245, 160, 0.7))'
          }}
          animate={{
            filter: processingLead 
              ? ['drop-shadow(0 0 15px rgba(0, 245, 160, 0.7))', 'drop-shadow(0 0 25px rgba(0, 245, 160, 0.9))', 'drop-shadow(0 0 15px rgba(0, 245, 160, 0.7))']
              : ['drop-shadow(0 0 10px rgba(0, 245, 160, 0.6))', 'drop-shadow(0 0 20px rgba(0, 245, 160, 0.8))', 'drop-shadow(0 0 10px rgba(0, 245, 160, 0.6))']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
};

export default CenterLogo;
