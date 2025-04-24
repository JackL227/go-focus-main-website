
import React, { useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import BookingWidget from './BookingWidget';
import AIAgentDemo from './AIAgentDemo';
import HeroAnimation from './HeroAnimation';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const { user } = useAuth();
  const [showAgentDemo, setShowAgentDemo] = useState(false);

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

  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row items-center overflow-hidden">
      {/* Content Section */}
      <div className="flex-1 w-full lg:w-1/2 p-8 lg:p-16 z-10">
        <motion.span 
          className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-[#3B82F6]/20 to-[#2563EB]/20 backdrop-blur-sm border border-foreground/10 text-primary text-sm font-medium mb-6"
          initial="hidden"
          animate="visible"
          custom={0}
          variants={textVariants}
        >
          New: Focus Analytics Feature
        </motion.span>

        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          initial="hidden"
          animate="visible"
          custom={1}
          variants={textVariants}
        >
          AI-Powered Focus Tools for{' '}
          <span className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] bg-clip-text text-transparent">
            Peak Productivity
          </span>
        </motion.h1>

        <motion.p 
          className="text-xl text-foreground/90 mb-8"
          initial="hidden"
          animate="visible"
          custom={2}
          variants={textVariants}
        >
          Eliminate distractions and maximize your output with intelligent focus assistance tailored to your workflow
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 mb-8"
          initial="hidden"
          animate="visible"
          custom={3}
          variants={textVariants}
        >
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1E40AF] text-white group relative overflow-hidden transition-all duration-300 hover:shadow-glow" 
            onClick={handleDemoClick}
          >
            <span className="relative z-10 flex items-center">
              🎯 See AI Agent in Action
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>

          <BookingWidget 
            size="lg"
            variant="outline"
            className="border-[#3B82F6]/60 text-[#3B82F6] hover:bg-[#3B82F6]/10 hover:border-[#3B82F6] transition-all duration-300"
          >
            💡 Book a Demo
          </BookingWidget>
        </motion.div>

        <motion.div
          className="flex items-center gap-2 text-sm text-foreground/60"
          initial="hidden"
          animate="visible"
          custom={4}
          variants={textVariants}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#3B82F6" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
          </svg>
          Used by 10,000+ professionals
        </motion.div>
      </div>

      {/* Animation Section */}
      <div className="flex-1 w-full lg:w-1/2 h-[500px] lg:h-screen relative">
        <HeroAnimation />
      </div>

      {showAgentDemo && <AIAgentDemo onClose={() => setShowAgentDemo(false)} />}
    </section>
  );
};

export default HeroSection;
