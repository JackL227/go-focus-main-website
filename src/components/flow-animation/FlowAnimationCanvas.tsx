
import React, { useEffect, useRef } from 'react';
import { useCanvasSetup } from './hooks/useCanvasSetup';
import { useAnimationLoop } from './hooks/useAnimationLoop';

interface FlowAnimationCanvasProps {
  isMobile?: boolean;
}

const FlowAnimationCanvas = ({ isMobile = false }: FlowAnimationCanvasProps) => {
  const { canvasRef, ctx, aiNode, panels } = useCanvasSetup(isMobile);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Always call the hook, but handle null values inside
  useAnimationLoop(canvasRef.current, ctx, aiNode, panels, isMobile);
  
  // Ensure the canvas container has height
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.height = '100%';
      containerRef.current.style.minHeight = '300px';
    }
  }, []);
  
  return (
    <div ref={containerRef} className="relative w-full h-full" style={{ minHeight: '300px' }}>
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-0"
      />
    </div>
  );
};

export default FlowAnimationCanvas;
