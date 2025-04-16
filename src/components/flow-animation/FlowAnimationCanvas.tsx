
import React from 'react';
import { useFlowAnimation } from './hooks/useFlowAnimation';

const FlowAnimationCanvas = () => {
  const canvasRef = useFlowAnimation();
  
  return (
    <div className="w-full h-full flex justify-center items-center">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default FlowAnimationCanvas;
