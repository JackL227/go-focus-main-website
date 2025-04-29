
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  minimumDisplayTime?: number;
}

const LoadingScreen = ({ minimumDisplayTime = 1200 }: LoadingScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Track load state
    const startTime = Date.now();
    
    // Function to handle when the page is fully loaded
    const handleLoaded = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minimumDisplayTime - elapsedTime);
      
      // Ensure the loader shows for at least the minimum time
      setTimeout(() => setIsLoading(false), remainingTime);
    };

    // Check if the document is already loaded
    if (document.readyState === 'complete') {
      handleLoaded();
    } else {
      window.addEventListener('load', handleLoaded);
      
      // Set a maximum fallback time to hide the loader
      const fallbackTimer = setTimeout(() => setIsLoading(false), 3000);
      
      return () => {
        window.removeEventListener('load', handleLoaded);
        clearTimeout(fallbackTimer);
      };
    }
  }, [minimumDisplayTime]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        >
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="relative w-[180px] h-[180px]">
              {/* Logo with glow effect */}
              <div className="absolute inset-[-20%] rounded-full opacity-30 blur-[80px]">
                <div className="w-full h-full bg-gradient-to-r from-primary to-[#00D9F5] rounded-full" />
              </div>
              
              {/* Logo image */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <img
                  src="/lovable-uploads/856246fc-384e-4f3b-b0de-1a21af8dbc2d.png"
                  alt="Go Focus AI Logo"
                  className="w-full h-full object-contain p-8"
                  style={{ transform: 'translateZ(0)' }}
                />
              </div>
              
              {/* Animated ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-full h-full rounded-full border-t-2 border-r-2 border-primary"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 1.5, 
                    ease: "linear", 
                    repeat: Infinity,
                  }}
                />
              </div>
            </div>
            
            <motion.p 
              className="mt-4 text-foreground/70 text-sm font-medium"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Loading...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
