
import React, { useState, useEffect } from 'react';
import FlowAnimation from './flow-animation';
import { useIsMobile } from '@/hooks/use-mobile';

// Sample names for the enrollment messages
const names = [
  "Beyoncé",
  "Samantha K",
  "Michael R",
  "Jennifer L",
  "David M",
  "Sarah P",
  "John D",
  "Emma W"
];

const HeroFlowAnimation: React.FC = () => {
  const isMobile = useIsMobile();
  const [enrolledName, setEnrolledName] = useState("");
  const [showEnrollment, setShowEnrollment] = useState(false);
  
  // Function to cycle through enrollment messages
  useEffect(() => {
    const cycleNames = () => {
      setShowEnrollment(false);
      
      setTimeout(() => {
        const newName = names[Math.floor(Math.random() * names.length)];
        setEnrolledName(newName);
        setShowEnrollment(true);
      }, 500);
    };
    
    cycleNames();
    const nameInterval = setInterval(cycleNames, 5000);
    
    return () => clearInterval(nameInterval);
  }, []);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[550px] overflow-hidden">
      {/* Canvas-based Flow Animation */}
      <div className="absolute inset-0 z-0">
        <FlowAnimation isMobile={isMobile} />
      </div>
      
      {/* Central Logo with Glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 z-10">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-accent 
                        opacity-30 blur-xl animate-pulse"></div>
        <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-primary/80 to-accent/80 
                        opacity-20 blur-md animate-pulse-soft"></div>
        <div className="relative w-full h-full flex items-center justify-center">
          <img 
            src="/lovable-uploads/gofocus-logo.png" 
            alt="Go Focus AI Logo" 
            className="w-4/5 h-4/5 object-contain animate-float"
          />
        </div>
      </div>
      
      {/* Automated Sales Process Card */}
      <div className="absolute top-1/4 right-8 md:right-12 lg:right-16 transform -translate-y-1/2 z-20">
        <div className="bg-background/30 backdrop-blur-sm border border-foreground/10 rounded-xl p-4">
          <h3 className="text-xl md:text-2xl font-semibold mb-2">
            <span className="text-white">Automated</span>{" "}
            <span className="text-gray-400">Sales Process</span>
          </h3>
          
          <div className={`space-y-2 transition-all duration-500 ${showEnrollment ? 'opacity-100' : 'opacity-0'}`}>
            {enrolledName && (
              <div className="bg-background/40 backdrop-blur-sm border border-accent/20 
                            rounded-lg p-3 flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-accent"></div>
                <p className="text-sm text-white">
                  <span className="font-semibold">{enrolledName}</span>
                  <span className="text-gray-400"> has enrolled into the mentorship</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroFlowAnimation;
