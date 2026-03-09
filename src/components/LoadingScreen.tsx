
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const minDisplayTime = 800;

    // Safety timeout: Ensure loading screen disappears after 2.5 seconds max
    const safetyTimeout = setTimeout(() => {
      cleanupAndFinish();
    }, 2500);

    // Simulate progress (fast fill)
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + (Math.random() * 18 + 5);
      });
    }, 80);

    const cleanupAndFinish = () => {
      clearTimeout(safetyTimeout);
      clearInterval(interval);
      setProgress(100);

      const timeElapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minDisplayTime - timeElapsed);

      setTimeout(() => {
        setIsLoading(false);
        if (onLoadingComplete) {
          onLoadingComplete();
        }
      }, remainingTime);
    };

    // Try to load resources, but don't block on them indefinitely
    Promise.all([
      document.fonts.ready.catch(() => { }),
      new Promise(resolve => setTimeout(resolve, minDisplayTime)) // Minimum wait
    ]).then(() => {
      cleanupAndFinish();
    });

    return () => {
      clearTimeout(safetyTimeout);
      clearInterval(interval);
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
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
                src="/lovable-uploads/856246fc-384e-4f3b-b0de-1a21af8dbc2d.png"
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
