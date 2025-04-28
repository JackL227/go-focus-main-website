
import React from 'react';

interface OutputCardProps {
  name: string;
  text: string; 
  position?: number;
  isActive?: boolean;
}

const OutputCard = ({ name, text, position = 0, isActive = true }: OutputCardProps) => {
  // Calculate the appropriate translation based on position
  const getTransform = () => {
    const baseTranslateX = 100 + (position * 60); // pixels
    const translateY = 20 + (position * 10); // pixels
    
    return `translate(${baseTranslateX}px, ${translateY}px)`;
  };
  
  // Calculate opacity based on position (cards further to the right are more transparent)
  const getOpacity = () => {
    const baseOpacity = 1;
    const fadeRate = 0.15;
    return Math.max(0, baseOpacity - (position * fadeRate));
  };

  return (
    <div
      className={`absolute transition-all duration-500 ease-out`}
      style={{
        transform: getTransform(),
        opacity: isActive ? getOpacity() : 0,
        zIndex: 10 - position,
        pointerEvents: 'none',
      }}
    >
      <div className="bg-[#122042]/90 backdrop-blur-sm border border-[#2A4178]/40 p-3 rounded-lg shadow-lg w-[220px] max-w-[220px]">
        <div className="flex justify-between items-start mb-2">
          <div className="text-xs font-medium text-[#8EACFF]">New Lead</div>
          <div className="bg-green-500/20 text-green-500 text-[10px] px-1.5 py-0.5 rounded-full">
            Appointment Set
          </div>
        </div>
        
        <div className="text-sm font-medium mb-1 text-white truncate">
          {name}
        </div>
        
        <div className="text-xs text-[#A2B8E1] line-clamp-2">
          {text}
        </div>
        
        <div className="mt-2 bg-[#1E3061] h-2 rounded-full overflow-hidden">
          <div className="bg-primary h-full rounded-full w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default OutputCard;
