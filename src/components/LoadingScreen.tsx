
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get a list of all the critical assets
    const criticalAssets = Array.from(document.querySelectorAll('img[loading="eager"]'));
    const fontFaceSet = document.fonts;
    
    // Mark as complete after minimum display time or when assets are loaded
    const minDisplayTime = 1000; // 1 second minimum display time
    const startTime = Date.now();
    
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
        const timeElapsed = Date.now() - startTime;
        const additionalDelay = Math.max(0, minDisplayTime - timeElapsed);
        
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
        setTimeout(() => {
          setIsLoading(false);
          if (onLoadingComplete) {
            onLoadingComplete();
          }
        }, Math.max(0, minDisplayTime - (Date.now() - startTime)));
      });
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 bg-[#050A14] flex items-center justify-center z-50"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <img 
              src="/lovable-uploads/65599be5-2766-4e8b-ad1f-126661cb6124.png" 
              alt="GoFocus.ai" 
              className="w-32 h-auto mb-6" 
              loading="eager"
            />
            <div className="relative h-1 w-40 bg-foreground/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute top-0 left-0 h-full bg-primary rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
