
import React from 'react';
import { useCanvasSetup } from './hooks/useCanvasSetup';
import { useAnimationLoop } from './hooks/useAnimationLoop';

const FlowAnimationCanvas = () => {
  const { canvasRef, ctx, aiNode, panels } = useCanvasSetup();
  
  // Always call the hook, but handle null values inside
  useAnimationLoop(canvasRef.current, ctx, aiNode, panels);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-0"
    />
  );
};

export default FlowAnimationCanvas;
