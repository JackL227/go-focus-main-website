
import React, { useState, useEffect } from 'react';
import FlowAnimation from './flow-animation';
import { useMobile } from '@/hooks/use-mobile';

// Lead conversion messages that will be displayed
const leadMessages = [
  "📈 Qualified Lead Captured",
  "✅ Ava enrolled in Mentorship Program",
  "🤖 AI Agent Initiated Follow-up",
  "📱 SMS Sequence Launched",
  "📅 Demo Call Scheduled",
  "🔄 Follow-up Email Sent",
  "💰 Payment Processed"
];

// Conversion messages that will be displayed
const conversionMessages = [
  "Book Confirmed",
  "Demo Scheduled",
  "Call Booked",
  "Automated Sales Flow Launched",
  "Lead Converted to Customer"
];

const HeroFlowAnimation: React.FC = () => {
  const isMobile = useMobile();
  const [activeMessage, setActiveMessage] = useState("");
  const [activeConversion, setActiveConversion] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showConversion, setShowConversion] = useState(false);
  
  // Function to randomly select and display messages
  useEffect(() => {
    // Function to cycle messages
    const cycleMessages = () => {
      // Hide current message with fade out
      setShowMessage(false);
      setShowConversion(false);
      
      // Wait for fade out, then change message
      setTimeout(() => {
        // Random message selection
        const newMessage = leadMessages[Math.floor(Math.random() * leadMessages.length)];
        setActiveMessage(newMessage);
        
        // Random conversion message
        if (Math.random() > 0.3) { // 70% chance to show conversion message
          const newConversion = conversionMessages[Math.floor(Math.random() * conversionMessages.length)];
          setActiveConversion(newConversion);
          
          // Show the new conversion message with delay
          setTimeout(() => {
            setShowConversion(true);
          }, 1500);
        }
        
        // Show the new message with fade in
        setTimeout(() => {
          setShowMessage(true);
        }, 300);
      }, 500);
    };
    
    // Initial message
    cycleMessages();
    
    // Set up interval for cycling messages
    const messageInterval = setInterval(cycleMessages, 5000);
    
    // Clean up
    return () => clearInterval(messageInterval);
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
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent to-primary 
                        opacity-30 blur-xl animate-pulse"></div>
        <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-accent/80 to-primary/80 
                        opacity-20 blur-md animate-pulse-soft"></div>
        <div className="relative w-full h-full flex items-center justify-center">
          <img 
            src="/lovable-uploads/gofocus-logo.png" 
            alt="Go Focus AI Logo" 
            className="w-4/5 h-4/5 object-contain animate-float"
          />
        </div>
      </div>
      
      {/* Lead Capture Message */}
      <div 
        className={`absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 
                   px-6 py-3 rounded-full bg-background/30 backdrop-blur-sm border border-foreground/10
                   transition-all duration-500 ${showMessage ? 'opacity-100' : 'opacity-0'}`}
      >
        <p className="text-sm md:text-base font-medium text-white whitespace-nowrap">{activeMessage}</p>
      </div>
      
      {/* Conversion Message */}
      <div 
        className={`absolute bottom-1/4 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20 
                   px-6 py-3 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30
                   transition-all duration-500 ${showConversion ? 'opacity-100' : 'opacity-0'}`}
      >
        <p className="text-sm md:text-base font-medium text-accent whitespace-nowrap">✓ {activeConversion}</p>
      </div>
    </div>
  );
};

export default HeroFlowAnimation;
