
import React, { useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import BookingWidget from './BookingWidget';
import ServiceSlideshow from './ServiceSlideshow';
import { useIsMobile } from '@/hooks/use-mobile';

const CallToAction = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="relative bg-gradient-to-b from-background/90 to-background py-20">
      <div className="container-custom relative z-10">
        <div className="bg-background/40 backdrop-blur-lg border border-primary/20 rounded-xl p-8 md:p-12 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 z-0"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-16 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to <span className="text-primary">Transform Your Business</span> with 24/7 AI Support?
              </h2>
              
              <ul className="space-y-4 mb-8">
                {[
                  'Convert more leads with instant 24/7 responses',
                  'Qualify prospects automatically with smart AI conversations',
                  'Book more client calls without manual intervention',
                  'Secure client data with enterprise-grade encryption'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className={`${isMobile ? 'flex flex-col space-y-4' : 'flex flex-row gap-4'}`}>
                <BookingWidget 
                  className="bg-primary hover:bg-primary/90 text-background group flex items-center"
                >
                  Get My Personalised Demo
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </BookingWidget>
                <BookingWidget 
                  variant="outline"
                  className="border-primary/60 text-primary hover:bg-primary/10 hover:border-primary"
                >
                  Speak To An Expert
                </BookingWidget>
              </div>
            </div>
            
            <div className="relative">
              <ServiceSlideshow />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
