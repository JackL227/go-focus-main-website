
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
          scale: processingLead ? [1, 1.02, 1] : [1, 1.01, 1], // Subtler scale animation
        }}
        transition={{
          duration: processingLead ? 0.7 : 5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        {/* Very light outer background for better blending */}
        <motion.div 
          className="absolute inset-[-20%] rounded-full opacity-5 blur-[50px]" // Reduced opacity and blur
          animate={{
            opacity: processingLead ? [0.05, 0.08, 0.05] : [0.03, 0.06, 0.03] // Very subtle opacity animation
          }}
          transition={{
            duration: processingLead ? 1.5 : 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-primary/60 to-[#00D9F5]/60 rounded-full" /> {/* Reduced opacity in gradient colors */}
        </motion.div>
        
        {/* Minimal pulsing effect with reduced intensity */}
        <motion.div 
          className="absolute inset-[-8%] rounded-full" // Reduced size
          animate={{
            opacity: processingLead ? [0.12, 0.16, 0.12] : [0.10, 0.14, 0.10] // Subtler opacity
          }}
          transition={{
            duration: processingLead ? 1 : 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-primary/50 to-[#00D9F5]/50 rounded-full opacity-30 blur-[20px]" // Reduced opacity and blur
            animate={{
              scale: processingLead ? [1, 1.03, 1] : [1, 1.02, 1], // Subtler scale
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
          className="absolute inset-[18%] rounded-full opacity-40 blur-[8px]" // Reduced blur and opacity
          style={{
            background: 'linear-gradient(135deg, rgba(0,110,218,0.6), rgba(0,217,245,0.5))' // Directional gradient for depth
          }}
          animate={{
            opacity: processingLead ? [0.4, 0.5, 0.4] : [0.35, 0.45, 0.35], // Subtler opacity
            scale: processingLead ? [0.97, 1.02, 0.97] : [0.98, 1.01, 0.98], // Subtler scale
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
              filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.05))' // Very subtle shadow for depth
            }}
          />
        </div>

        {/* Very subtle processing ripple effects */}
        {processingLead && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border border-primary/15" // Thinner border, lower opacity
              initial={{ scale: 0.9, opacity: 0.6 }}
              animate={{ scale: 1.3, opacity: 0 }}
              transition={{
                duration: 1.2, // Slower for smoother effect
                ease: "easeInOut", // Smoother easing
                repeat: Infinity,
                repeatDelay: 0.3
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-primary/10" // Even lower opacity for second ring
              initial={{ scale: 0.9, opacity: 0.4 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{
                duration: 1.8, // Slower for smoother effect
                delay: 0.4,
                ease: "easeInOut", // Smoother easing
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
