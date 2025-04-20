
import React from 'react';
import { useCanvasSetup } from './hooks/useCanvasSetup';
import { useAnimationLoop } from './hooks/useAnimationLoop';

interface FlowAnimationCanvasProps {
  isMobile?: boolean;
}

const FlowAnimationCanvas = ({ isMobile = false }: FlowAnimationCanvasProps) => {
  const { canvasRef, ctx, aiNode, panels } = useCanvasSetup(isMobile);
  
  // Always call the hook, but handle null values inside
  useAnimationLoop(canvasRef.current, ctx, aiNode, panels, isMobile);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-0"
    />
  );
};

export default FlowAnimationCanvas;
