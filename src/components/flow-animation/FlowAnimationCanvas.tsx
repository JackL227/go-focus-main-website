
import React from 'react';
import { useFlowAnimation } from './hooks/useFlowAnimation';

const FlowAnimationCanvas = () => {
  const canvasRef = useFlowAnimation();
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-0"
    />
  );
};

export default FlowAnimationCanvas;
