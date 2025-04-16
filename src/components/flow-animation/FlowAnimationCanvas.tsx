
import React from 'react';
import { useFlowAnimation } from './hooks/useFlowAnimation';

const FlowAnimationCanvas = () => {
  const canvasRef = useFlowAnimation();
  
  return (
    <div className="w-full h-full flex justify-center items-center">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full absolute inset-0 z-0"
        style={{ maxWidth: '100%' }}
      />
    </div>
  );
};

export default FlowAnimationCanvas;
