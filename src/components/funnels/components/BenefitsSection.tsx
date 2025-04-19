
import React from 'react';
import { Check } from 'lucide-react';

interface BenefitsSectionProps {
  benefits: string[];
  colorScheme: {
    accent: string;
  };
}

const BenefitsSection: React.FC<BenefitsSectionProps> = ({ benefits, colorScheme }) => {
  return (
    <section id="benefits" className="py-16 bg-background/95">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 animate-entrance">Key Benefits</h2>
          
          <div className="grid md:grid-cols-3 gap-8 stagger-animation">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="glass-card p-6 rounded-lg"
              >
                <div className="flex items-start">
                  <div className={`p-2 rounded-full bg-gradient-to-r ${colorScheme.accent} text-white mr-3 animate-pulse-soft`}>
                    <Check className="h-5 w-5" />
                  </div>
                  <p className="text-lg">{benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
