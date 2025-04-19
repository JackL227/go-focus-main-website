
import React from 'react';
import HeroSection from './components/HeroSection';
import BenefitsSection from './components/BenefitsSection';
import TestimonialsMetricsSection from './components/TestimonialsMetricsSection';
import GuaranteeSection from './components/GuaranteeSection';
import CtaSection from './components/CtaSection';

interface FunnelLayoutProps {
  niche: 'trading' | 'medspa' | 'fitness';
  headline: string;
  subheadline: string;
  benefits: string[];
  testimonials: {
    quote: string;
    author: string;
    position: string;
    company: string;
    rating?: number;
  }[];
  metrics: {
    title: string;
    value: string;
    description: string;
  }[];
  guaranteeText: string;
  urgencyText?: string;
}

const FunnelLayout: React.FC<FunnelLayoutProps> = ({
  niche,
  headline,
  subheadline,
  benefits,
  testimonials,
  metrics,
  guaranteeText,
  urgencyText
}) => {
  const colorSchemes = {
    trading: {
      accent: 'from-blue-500 to-blue-700',
      button: 'bg-blue-600 hover:bg-blue-700',
      secondary: 'border-blue-600 text-blue-600 hover:bg-blue-50',
      gradient: 'from-blue-50 to-blue-100',
      glow: 'shadow-[0_0_20px_rgba(59,130,246,0.6)]'
    },
    medspa: {
      accent: 'from-teal-500 to-teal-700',
      button: 'bg-teal-600 hover:bg-teal-700',
      secondary: 'border-teal-600 text-teal-600 hover:bg-teal-50',
      gradient: 'from-teal-50 to-teal-100',
      glow: 'shadow-[0_0_20px_rgba(20,184,166,0.6)]'
    },
    fitness: {
      accent: 'from-purple-500 to-purple-700',
      button: 'bg-purple-600 hover:bg-purple-700',
      secondary: 'border-purple-600 text-purple-600 hover:bg-purple-50',
      gradient: 'from-purple-50 to-purple-100',
      glow: 'shadow-[0_0_20px_rgba(168,85,247,0.6)]'
    },
  };

  const colorScheme = colorSchemes[niche];
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection 
        headline={headline}
        subheadline={subheadline}
        colorScheme={colorScheme}
      />
      
      <BenefitsSection 
        benefits={benefits}
        colorScheme={colorScheme}
      />
      
      <TestimonialsMetricsSection 
        testimonials={testimonials}
        metrics={metrics}
        colorScheme={colorScheme}
      />
      
      <GuaranteeSection 
        guaranteeText={guaranteeText}
        urgencyText={urgencyText}
      />
      
      <CtaSection 
        colorScheme={colorScheme}
        urgencyText={urgencyText}
      />

      <footer className="py-8 bg-background border-t border-foreground/10">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-bold">Go Focus AI</h2>
                <p className="text-sm text-foreground/70">AI Agents for Lead Qualification & Booking</p>
              </div>
              
              <div className="text-sm text-foreground/70">
                <p>© {new Date().getFullYear()} Go Focus AI. All rights reserved.</p>
                <p>Privacy Policy | Terms of Service</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FunnelLayout;
