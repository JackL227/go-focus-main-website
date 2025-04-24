
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import FluidAnimation from './FluidAnimation';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import BookingWidget from './BookingWidget';
import AIAgentDemo from './AIAgentDemo';
import FlowAnimationCanvas from './flow-animation';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const { user } = useAuth();
  const [showAgentDemo, setShowAgentDemo] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDemoClick = () => {
    setShowAgentDemo(true);
  };

  // Animation variants for text elements
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1, 
      y: 0,
      transition: { 
        delay: custom * 0.2,
        duration: 0.8,
        ease: [0.21, 0.45, 0.15, 1.00]
      }
    })
  };
  
  // Animation variants for the animation container
  const animationContainerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        delay: 0.5,
        duration: 1,
        ease: [0.21, 0.45, 0.15, 1.00]
      }
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center pt-24 pb-0 overflow-hidden" 
      aria-label="Hero section"
      style={{ 
        perspective: '1000px',
      }}
    >
      <div 
        className="absolute inset-0"
        style={{ 
          transform: `translateY(${scrollY * 0.15}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <FluidAnimation />
      </div>
      
      <div 
        className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background z-[1]" 
        style={{ 
          background: `linear-gradient(180deg, rgba(7, 16, 32, 0.6) 0%, rgba(7, 16, 32, 0.8) 50%, rgba(7, 16, 32, 0.95) 100%)` 
        }}
      />
      
      <div 
        className="container-custom relative z-10 py-16"
        style={{ 
          transform: `translateY(${scrollY * -0.05}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Column: Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <motion.span 
                className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-[#3B82F6]/20 to-[#2563EB]/20 backdrop-blur-sm shadow-sm border border-foreground/10 text-primary text-sm font-medium"
                initial="hidden"
                animate="visible"
                custom={0}
                variants={textVariants}
                aria-label="Company type"
              >
                Performance-Based AI Agentic Systems
              </motion.span>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                initial="hidden"
                animate="visible"
                custom={1}
                variants={textVariants}
                aria-label="Main headline"
              >
                AI Agents That Convert Leads Into Revenue — 
                <span className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] bg-clip-text text-transparent">While You Sleep.</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-foreground/90"
                initial="hidden"
                animate="visible"
                custom={2}
                variants={textVariants}
                aria-label="Subheadline"
              >
                <span className="block mt-2 text-[#3B82F6]/90">
                  Built for Trading Mentors, Med Spas and Fitness Influencers — our AI responds to DMs, books qualified calls and revives cold leads without you lifting a finger.
                </span>
              </motion.p>
            </div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial="hidden"
              animate="visible"
              custom={3}
              variants={textVariants}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1E40AF] text-white group relative overflow-hidden transition-all duration-300 hover:shadow-glow" 
                onClick={handleDemoClick} 
                aria-label="See AI agent demo"
              >
                <span className="relative z-10 flex items-center">
                  🎯 See AI Agent in Action
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6] via-[#2563EB] to-[#1E40AF] opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
              
              <BookingWidget 
                size="lg"
                variant="outline"
                className="border-[#3B82F6]/60 text-[#3B82F6] hover:bg-[#3B82F6]/10 hover:border-[#3B82F6] transition-all duration-300"
              >
                💡 Book a Demo
              </BookingWidget>
            </motion.div>
          </div>
          
          {/* Right Column: Animation Container */}
          <motion.div 
            className="relative h-[500px] lg:h-[600px]"
            initial="hidden"
            animate="visible"
            variants={animationContainerVariants}
            style={{
              transform: `translateY(${scrollY * -0.02}px) rotateY(${scrollY * 0.01}deg)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <div className="absolute inset-0 overflow-hidden rounded-2xl border border-[#3B82F6]/20 shadow-lg">
              <FlowAnimationCanvas />
              
              {/* Overlay gradient for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-tr from-background/40 to-transparent"></div>
              
              {/* Animated particles and glowing elements */}
              <div className="absolute top-1/4 right-1/3 w-8 h-8 bg-[#3B82F6]/30 rounded-full blur-xl animate-pulse-soft"></div>
              <div className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-[#2563EB]/20 rounded-full blur-xl animate-pulse-soft" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-1/2 right-1/4 w-10 h-10 bg-[#1E40AF]/20 rounded-full blur-lg animate-pulse-soft" style={{animationDelay: '2s'}}></div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {showAgentDemo && <AIAgentDemo onClose={() => setShowAgentDemo(false)} />}
    </section>
  );
};

export default HeroSection;
