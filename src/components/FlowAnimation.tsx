
import React from 'react';
import FlowAnimationCanvas from './flow-animation';

const FlowAnimation = () => {
  return (
    <div className="w-full h-full relative">
      {/* Add a subtle gradient background for the flow animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050A14]/70 to-[#0A1428] opacity-90"></div>
      <FlowAnimationCanvas />
    </div>
  );
};

export default FlowAnimation;
