import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import BookingWidget from './BookingWidget';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, useScroll, useTransform } from 'framer-motion';
import WorkHubPreview from './WorkHubPreview';

const HeroSection = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Dashboard image: starts small/rounded, expands to full width on scroll
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.85, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.3], [24, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0.4, 0.6], [1, 0.3]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[105vh] md:min-h-[140vh] flex flex-col items-center pt-20 md:pt-36"
      aria-label="Hero section"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/8 rounded-full blur-[120px]" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          className="flex flex-col items-center max-w-4xl mx-auto text-center mb-8 md:mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="section-label mb-8"
          >
            <span>Scale Your AI Agency</span>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6 mb-10">
            <h1 aria-label="Main headline">
              <span className="block text-white">Stop trading time for revenue.</span>
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Start scaling with systems.</span>
            </h1>

            <p className={`mx-auto max-w-2xl text-muted-foreground ${isMobile ? 'text-base' : 'text-lg'} leading-relaxed`} aria-label="Subheadline">
              GoFocus AI helps AI agencies break past plateaus with proven operational systems and done-for-you Meta ads management — so you can sign more clients, retain them longer, and build a business that scales without burning out.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={`${isMobile ? 'flex flex-col space-y-3 w-full max-w-[300px]' : 'flex flex-row gap-3 justify-center'} mb-10 mx-auto`}
          >
            <BookingWidget className="btn-primary min-w-[160px]">
              Book a Strategy Call
              <ArrowRight className="ml-2 h-4 w-4" />
            </BookingWidget>
            <Button
              variant="outline"
              className="btn-secondary min-w-[160px]"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See How It Works
            </Button>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
            <span>Trusted by 30+ AI agency owners</span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
            <span>$2M+ in client revenue generated</span>
          </motion.div>
        </motion.div>

        {/* Scroll-driven WorkHub preview */}
        <motion.div
          style={{ scale, borderRadius, y, opacity }}
          className="sticky top-24 mx-auto w-full max-w-5xl overflow-hidden border border-white/8 shadow-2xl shadow-primary/10"
        >
          <WorkHubPreview />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
