
import React from 'react';
import { motion } from 'framer-motion';

interface CenterLogoProps {
  isProcessing: boolean;
}

const CenterLogo = ({ isProcessing }: CenterLogoProps) => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
      <div className="relative w-[200px] h-[200px] sm:w-[240px] sm:h-[240px]">
        {/* Glow effect behind the logo */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            opacity: isProcessing ? [0.7, 1, 0.7] : [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: isProcessing ? 1.2 : 3,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-700/30 to-indigo-500/40 rounded-full blur-[100px]" />
        </motion.div>

        {/* Logo image - clear and not blurred */}
        <motion.div
          className="relative z-10 w-full h-full flex items-center justify-center"
          animate={{
            scale: isProcessing ? [1, 1.05, 1] : [1, 1.02, 1],
          }}
          transition={{
            duration: isProcessing ? 1.2 : 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img
            src="/lovable-uploads/b9eb9c06-5b4f-416d-af44-06190fbec508.png"
            alt="Go Focus AI Logo"
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default CenterLogo;
