
import React from 'react';
import { motion } from 'framer-motion';

interface CenterLogoProps {
  processingLead?: boolean;
}

const CenterLogo = ({ processingLead = false }: CenterLogoProps) => {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 z-30">
      <motion.div
        className="relative w-[230px] h-[230px] sm:w-[260px] sm:h-[260px]"
        animate={{
          scale: processingLead ? [1, 1.03, 1] : [1, 1.01, 1], // Subtler scale animation
        }}
        transition={{
          duration: processingLead ? 0.7 : 5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        {/* Reduced outer glow effect for better integration */}
        <motion.div 
          className="absolute inset-[-35%] rounded-full opacity-10 blur-[70px]" // Reduced opacity and blur
          animate={{
            opacity: processingLead ? [0.1, 0.15, 0.1] : [0.08, 0.12, 0.08] // Subtler opacity animation
          }}
          transition={{
            duration: processingLead ? 1.5 : 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-primary/80 to-[#00D9F5]/80 rounded-full" /> {/* Reduced opacity in gradient colors */}
        </motion.div>
        
        {/* Primary pulsing glow with reduced intensity */}
        <motion.div 
          className="absolute inset-[-12%] rounded-full" // Reduced size
          animate={{
            opacity: processingLead ? [0.18, 0.25, 0.18] : [0.15, 0.20, 0.15] // Subtler opacity
          }}
          transition={{
            duration: processingLead ? 1 : 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-primary/70 to-[#00D9F5]/70 rounded-full opacity-40 blur-[25px]" // Reduced opacity and blur
            animate={{
              scale: processingLead ? [1, 1.04, 1] : [1, 1.02, 1], // Subtler scale
            }}
            transition={{
              duration: processingLead ? 0.8 : 6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        </motion.div>
        
        {/* Inner core with depth effect instead of glow */}
        <motion.div 
          className="absolute inset-[16%] rounded-full opacity-50 blur-[10px]" // Reduced blur and opacity
          style={{
            background: 'linear-gradient(135deg, rgba(0,110,218,0.7), rgba(0,217,245,0.6))' // Directional gradient for depth
          }}
          animate={{
            opacity: processingLead ? [0.5, 0.6, 0.5] : [0.4, 0.5, 0.4], // Subtler opacity
            scale: processingLead ? [0.96, 1.03, 0.96] : [0.98, 1.01, 0.98], // Subtler scale
          }}
          transition={{
            duration: processingLead ? 0.9 : 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        {/* Logo image with subtle inset effect */}
        <div className="absolute inset-0 flex items-center justify-center p-12 sm:p-16 z-50">
          <img
            src="/lovable-uploads/856246fc-384e-4f3b-b0de-1a21af8dbc2d.png"
            alt="Go Focus AI Logo"
            className="w-full h-full object-contain"
            style={{ 
              transform: 'translateZ(0)', // Force GPU acceleration
              backfaceVisibility: 'hidden', // Prevent flickering
              filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.1))' // Very subtle shadow for depth instead of glow
            }}
          />
        </div>

        {/* Subtler processing ripple effects */}
        {processingLead && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border border-primary/20" // Thinner border, lower opacity
              initial={{ scale: 0.9, opacity: 0.7 }}
              animate={{ scale: 1.3, opacity: 0 }}
              transition={{
                duration: 1.2, // Slower for smoother effect
                ease: "power1.out", // Smoother easing
                repeat: Infinity,
                repeatDelay: 0.3
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-primary/15" // Even lower opacity for second ring
              initial={{ scale: 0.9, opacity: 0.5 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{
                duration: 1.8, // Slower for smoother effect
                delay: 0.4,
                ease: "power1.out", // Smoother easing
                repeat: Infinity,
                repeatDelay: 0.2
              }}
            />
          </>
        )}
      </motion.div>
    </div>
  );
};

export default CenterLogo;
