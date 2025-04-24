
import React from 'react';
import FlowAnimationCanvas from './flow-animation';
import { useIsMobile } from '@/hooks/use-mobile';

const FlowAnimation = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full h-full min-h-[300px] md:min-h-[500px]">
      <FlowAnimationCanvas isMobile={isMobile} />
    </div>
  );
};

export default FlowAnimation;
