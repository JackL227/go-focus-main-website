
import React, { useState } from 'react';
import { CheckCircle, ArrowRight, Mail, User, MessageSquare, Shield } from 'lucide-react';
import { Button } from './ui/button';
import BookingWidget from './BookingWidget';

const CallToAction = () => {
  const [showBookingWidget, setShowBookingWidget] = useState(false);
  
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
              <p className="text-lg mb-8 text-foreground/90">
                Our AI agents work around the clock to engage leads, qualify prospects, and book calls while you focus on growing your business.
              </p>
              
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
              
              <div className="flex flex-col sm:flex-row gap-4">
                <BookingWidget 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-background group flex items-center"
                >
                  🚀 Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </BookingWidget>
              </div>
            </div>
            
            <div className="bg-background/60 backdrop-blur-sm rounded-lg p-6 border border-foreground/10 shadow-lg">
              <h3 className="font-bold text-xl mb-4">What Our Clients Say</h3>
              
              <div className="space-y-6">
                <div className="bg-background/40 rounded p-4 border border-foreground/10">
                  <p className="italic mb-3">"The AI agent has increased our booking rate by 35% and handles inquiries even when we're asleep!"</p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-sm text-foreground/70">Trading Mentor</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-background/40 rounded p-4 border border-foreground/10">
                  <p className="italic mb-3">"Our med spa now books 28% more consultations thanks to the 24/7 availability of the AI assistant."</p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Dr. Michael Chen</p>
                      <p className="text-sm text-foreground/70">Med Spa Owner</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
