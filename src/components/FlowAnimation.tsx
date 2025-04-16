
import React from 'react';
import FlowAnimationCanvas from './flow-animation/FlowAnimationCanvas';

const FlowAnimation = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full h-full flex-1">
        <FlowAnimationCanvas />
      </div>
    </div>
  );
};

export default FlowAnimation;
