import React, { useState, useRef, useCallback } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface iPadFrameProps {
  children: React.ReactNode;
}

const IPadFrame: React.FC<iPadFrameProps> = ({ children }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = useCallback(() => {
    if (!isFullscreen) {
      frameRef.current?.requestFullscreen?.().catch(() => {
        // Fallback: just toggle the visual state
      });
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
    setIsFullscreen(prev => !prev);
  }, [isFullscreen]);

  // Listen for fullscreen change events
  React.useEffect(() => {
    const handler = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  return (
    <div
      ref={frameRef}
      className={`relative group ${isFullscreen ? 'fixed inset-0 z-[9999] bg-black' : ''}`}
    >
      {/* iPad outer shell */}
      <div
        className={`relative mx-auto transition-all duration-500 ${
          isFullscreen
            ? 'w-full h-full rounded-none'
            : 'rounded-[2rem] md:rounded-[2.5rem]'
        }`}
        style={{
          background: isFullscreen
            ? '#000'
            : 'linear-gradient(145deg, #2a2a2e 0%, #1a1a1e 50%, #0f0f12 100%)',
          boxShadow: isFullscreen
            ? 'none'
            : `
              0 0 0 1px rgba(255,255,255,0.06),
              0 2px 8px rgba(0,0,0,0.4),
              0 8px 32px rgba(0,0,0,0.5),
              inset 0 1px 0 rgba(255,255,255,0.08)
            `,
        }}
      >
        {/* Top bezel with camera */}
        {!isFullscreen && (
          <div className="flex items-center justify-center pt-3 pb-1 md:pt-4 md:pb-1.5">
            {/* Front camera */}
            <div
              className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full"
              style={{
                background: 'radial-gradient(circle at 40% 40%, #3a3a40, #1a1a1e)',
                boxShadow: 'inset 0 0 2px rgba(0,0,0,0.8), 0 0 3px rgba(255,255,255,0.03)',
              }}
            />
          </div>
        )}

        {/* Screen area */}
        <div
          className={`relative overflow-hidden ${
            isFullscreen
              ? 'w-full h-full'
              : 'mx-2 mb-3 md:mx-3 md:mb-4 rounded-lg md:rounded-xl'
          }`}
          style={{
            aspectRatio: isFullscreen ? undefined : '16 / 10',
            boxShadow: isFullscreen
              ? 'none'
              : 'inset 0 0 0 1px rgba(255,255,255,0.04), 0 0 20px rgba(0,0,0,0.3)',
          }}
        >
          {/* Screen content */}
          <div className="absolute inset-0 overflow-hidden bg-[#0a0a0f]">
            {children}
          </div>

          {/* Screen reflection overlay */}
          {!isFullscreen && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.01) 100%)',
              }}
            />
          )}
        </div>

        {/* Bottom bezel - subtle home indicator */}
        {!isFullscreen && (
          <div className="flex items-center justify-center pb-2 md:pb-3">
            <div
              className="w-16 md:w-24 h-1 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.08)',
              }}
            />
          </div>
        )}
      </div>

      {/* Fullscreen toggle button */}
      <AnimatePresence>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleFullscreen}
          className={`absolute z-50 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium
            transition-all duration-200 cursor-pointer backdrop-blur-sm
            ${isFullscreen
              ? 'top-4 right-4 bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              : 'top-5 right-5 md:top-7 md:right-7 bg-black/40 text-white/50 hover:bg-black/60 hover:text-white/80 opacity-0 group-hover:opacity-100'
            }`}
          style={{
            border: '1px solid rgba(255,255,255,0.1)',
          }}
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {isFullscreen ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
          {isFullscreen ? 'Exit' : 'Fullscreen'}
        </motion.button>
      </AnimatePresence>
    </div>
  );
};

export default IPadFrame;
