
import React from 'react';

interface GuaranteeSectionProps {
  guaranteeText: string;
  urgencyText?: string;
}

const GuaranteeSection: React.FC<GuaranteeSectionProps> = ({
  guaranteeText,
  urgencyText
}) => {
  return (
    <section id="guarantee" className="py-16 bg-background">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto glass-card p-8 rounded-lg animate-entrance">
          <h2 className="text-2xl font-bold mb-4 text-center">What If I Don't Get Results?</h2>
          <p className="text-lg mb-6 text-center">{guaranteeText}</p>
          <div className="text-center py-4 border-t border-b border-foreground/10">
            <p className="text-xl font-semibold">Our Promise: 15 qualified client conversations or your money back.</p>
          </div>
          {urgencyText && (
            <div className="mt-6 text-center">
              <p className="text-lg font-semibold text-red-500 animate-pulse-soft">{urgencyText}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
