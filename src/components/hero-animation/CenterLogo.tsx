
import React from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface CenterLogoProps {
  processingLead?: boolean;
}

const CenterLogo = ({ processingLead = false }: CenterLogoProps) => {
  const isMobile = useIsMobile();
  
  // Scale down logo size for mobile
  const logoSize = isMobile ? 
    { width: "180px", height: "180px" } : 
    { width: "230px", height: "230px" };
    
  return (
    <div className="absolute left-1/2 -translate-x-1/2 z-30">
      <motion.div
        className="relative"
        style={logoSize}
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
          className="absolute inset-[-15%] rounded-full opacity-5 blur-[40px]" // Reduced opacity and blur
          animate={{
            opacity: processingLead ? [0.05, 0.07, 0.05] : [0.04, 0.06, 0.04] // Very subtle opacity animation
          }}
          transition={{
            duration: processingLead ? 1.5 : 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-primary/50 to-[#00D9F5]/50 rounded-full" /> {/* Reduced opacity in gradient colors */}
        </motion.div>
        
        {/* Minimal pulsing effect with reduced intensity */}
        <motion.div 
          className="absolute inset-[-8%] rounded-full" // Reduced size
          animate={{
            opacity: processingLead ? [0.10, 0.14, 0.10] : [0.08, 0.12, 0.08] // Subtler opacity
          }}
          transition={{
            duration: processingLead ? 1 : 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-primary/40 to-[#00D9F5]/40 rounded-full opacity-25 blur-[15px]" // Reduced opacity and blur
            animate={{
              scale: processingLead ? [1, 1.02, 1] : [1, 1.01, 1], // Subtler scale
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
          className="absolute inset-[18%] rounded-full opacity-35 blur-[6px]" // Reduced blur and opacity
          style={{
            background: 'linear-gradient(135deg, rgba(0,110,218,0.5), rgba(0,217,245,0.4))' // Directional gradient for depth
          }}
          animate={{
            opacity: processingLead ? [0.35, 0.45, 0.35] : [0.3, 0.4, 0.3], // Subtler opacity
            scale: processingLead ? [0.98, 1.01, 0.98] : [0.99, 1.01, 0.99], // Subtler scale
          }}
          transition={{
            duration: processingLead ? 0.9 : 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        {/* Logo image with subtle inset effect */}
        <div className="absolute inset-0 flex items-center justify-center p-12 sm:p-14 z-50">
          <img
            src="/lovable-uploads/856246fc-384e-4f3b-b0de-1a21af8dbc2d.png"
            alt="Go Focus AI Logo"
            className="w-full h-full object-contain"
            style={{ 
              transform: 'translateZ(0)', // Force GPU acceleration
              backfaceVisibility: 'hidden', // Prevent flickering
              filter: 'drop-shadow(0 0 1px rgba(0,0,0,0.05))' // Very subtle shadow for depth
            }}
          />
        </div>

        {/* Very subtle processing ripple effects */}
        {processingLead && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border border-primary/10" // Thinner border, lower opacity
              initial={{ scale: 0.9, opacity: 0.5 }}
              animate={{ scale: 1.3, opacity: 0 }}
              transition={{
                duration: 1.2, // Slower for smoother effect
                ease: "easeInOut", // Smoother easing
                repeat: Infinity,
                repeatDelay: 0.3
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-primary/8" // Even lower opacity for second ring
              initial={{ scale: 0.9, opacity: 0.3 }}
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
