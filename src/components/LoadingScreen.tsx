
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Get a list of all the critical assets
    const criticalAssets = Array.from(document.querySelectorAll('img[loading="eager"]'));
    const fontFaceSet = document.fonts;
    
    // Mark as complete after minimum display time or when assets are loaded
    const minDisplayTime = 1500; // 1.5 second minimum display time for better UX
    const startTime = Date.now();
    
    // Simulate progress from 0 to 75% (saving the last 25% for actual loading)
    const startProgress = () => {
      let currentProgress = 0;
      
      const interval = setInterval(() => {
        currentProgress += 2;
        if (currentProgress >= 75) {
          clearInterval(interval);
        } else {
          setProgress(currentProgress);
        }
      }, 25);
      
      return interval;
    };
    
    const progressInterval = startProgress();
    
    // Create a promise that resolves when the minimum time has passed
    const minTimePromise = new Promise<void>((resolve) => {
      setTimeout(() => resolve(), minDisplayTime);
    });
    
    // Create a promise that resolves when the fonts are loaded
    const fontsPromise = fontFaceSet.ready;
    
    // Create a promise that resolves when images are loaded
    const imagesPromise = Promise.all(
      criticalAssets.map((img) => {
        if (img instanceof HTMLImageElement) {
          return img.complete 
            ? Promise.resolve() 
            : new Promise<void>((resolve) => {
                img.onload = () => resolve();
                img.onerror = () => resolve(); // Continue even if image fails to load
              });
        }
        return Promise.resolve();
      })
    );
    
    // When all promises are resolved, hide the loading screen
    Promise.all([minTimePromise, fontsPromise, imagesPromise])
      .then(() => {
        clearInterval(progressInterval);
        setProgress(100); // Jump to 100%
        
        const timeElapsed = Date.now() - startTime;
        const additionalDelay = Math.max(0, minDisplayTime - timeElapsed) + 300; // Add 300ms buffer
        
        // Add a small delay before hiding to ensure minimum display time
        setTimeout(() => {
          setIsLoading(false);
          if (onLoadingComplete) {
            onLoadingComplete();
          }
        }, additionalDelay);
      })
      .catch(() => {
        // Fallback in case of errors
        clearInterval(progressInterval);
        setProgress(100);
        
        setTimeout(() => {
          setIsLoading(false);
          if (onLoadingComplete) {
            onLoadingComplete();
          }
        }, Math.max(0, minDisplayTime - (Date.now() - startTime)) + 300);
      });
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 bg-[#050A14] flex items-center justify-center z-50"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <img 
                src="/lovable-uploads/65599be5-2766-4e8b-ad1f-126661cb6124.png" 
                alt="GoFocus.ai" 
                className="w-32 h-auto mb-6" 
                loading="eager"
              />
            </motion.div>
            
            <div className="relative h-1.5 w-48 bg-foreground/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="absolute top-0 left-0 h-full bg-primary rounded-full"
                transition={{ ease: "easeInOut" }}
              />
            </div>
            
            <motion.p 
              className="text-xs text-foreground/70 mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Loading AI-powered systems...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
