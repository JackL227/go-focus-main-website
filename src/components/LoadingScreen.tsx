
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoadingScreenProps {
  className?: string;
}

const LoadingScreen = ({ className }: LoadingScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Start fade out after all critical resources are loaded
    const handleLoad = () => {
      // Add a small delay to ensure everything is rendered properly
      setTimeout(() => setIsLoading(false), 1500);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      
      // Fallback timer in case load event doesn't fire
      const timer = setTimeout(() => setIsLoading(false), 3000);
      
      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(timer);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center bg-background",
            className
          )}
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-44 h-44 mb-4 relative"
            >
              <img 
                src="/lovable-uploads/65599be5-2766-4e8b-ad1f-126661cb6124.png" 
                alt="GoFocus Logo" 
                className="w-full h-full object-contain"
              />
              <motion.div
                className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-1 bg-primary rounded-full w-48 overflow-hidden"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
