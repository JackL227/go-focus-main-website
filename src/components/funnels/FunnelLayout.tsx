import React from 'react';
import { ArrowRight, Calendar, Shield } from "lucide-react";
import BookingWidget from "../BookingWidget";
import { Script } from '../ui/script';
import NameCardTimeline from './NameCardTimeline';
import RealTimeResults from './RealTimeResults';

interface FunnelLayoutProps {
  niche: 'trading' | 'medspa' | 'fitness';
  headline: string;
  subheadline: string;
  benefits: string[];
  metrics: {
    title: string;
    value: string | number;
    description: string;
  }[];
  realtimeStats: {
    title: string;
    value: number;
    icon: string;
    description: string;
  }[];
  guaranteeText: string;
  urgencyText?: string;
  ctaText: string;
  hasCountdown?: boolean;
  showSocialProof?: boolean;
  vslSection?: React.ReactNode;
}

const FunnelLayout: React.FC<FunnelLayoutProps> = ({
  headline,
  subheadline,
  benefits,
  realtimeStats,
  guaranteeText,
  urgencyText,
  ctaText,
  vslSection
}) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Meta Pixel Script */}
      <Script>
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '12345678901234567');
          fbq('track', 'PageView');
        `}
      </Script>

      {/* Hero Section with Headline and VSL */}
      <section className="pt-12 pb-6 bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-8 animate-entrance">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{headline}</h1>
            <p className="text-xl text-foreground/80">{subheadline}</p>
          </div>
          {vslSection}
        </div>
      </section>
      
      {/* Name Card Timeline */}
      <NameCardTimeline />
      
      {/* CTA & Limited Time Offer Section */}
      <section className="py-8 bg-background">
        <div className="container-custom">
          <div className="max-w-xl mx-auto text-center">
            <div className="mb-6 animate-entrance">
              <div className="inline-block bg-red-500/10 border border-red-500/30 rounded-lg px-6 py-3">
                <p className="text-xl font-semibold text-red-400 animate-pulse-soft">
                  {urgencyText}
                </p>
              </div>
            </div>
            
            <div className="animate-entrance">
              <BookingWidget 
                className="text-white group text-lg px-7 py-4 bg-primary hover:bg-primary/90 shadow-glow animate-button-pop"
              >
                <span className="whitespace-normal">{ctaText}</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 animate-pulse-soft" />
              </BookingWidget>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-background/95">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10 animate-entrance">What You Get</h2>
            
            <div className="grid md:grid-cols-2 gap-6 stagger-animation">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="glass-card p-5 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <div className="flex items-start">
                    <div className={`p-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white mr-3 animate-pulse-soft`}>
                      <Check className="h-4 w-4" />
                    </div>
                    <p className="text-lg">{benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Real-Time Results Section */}
      <RealTimeResults stats={realtimeStats} />

      {/* Guarantee Section */}
      <section className="py-12 bg-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto glass-card p-8 rounded-lg animate-entrance">
            <div className="flex flex-col sm:flex-row items-center mb-4">
              <Shield className="h-12 w-12 text-primary mr-4 flex-shrink-0 animate-pulse-soft" />
              <h2 className="text-2xl font-bold text-center sm:text-left">Our Risk-Free Guarantee</h2>
            </div>
            <p className="text-lg mb-6 text-center sm:text-left">{guaranteeText}</p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 bg-background/95">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center animate-entrance">
            <h2 className="text-3xl font-bold mb-6">Ready To Automate Your Lead Generation?</h2>
            <div className="flex flex-col items-center">
              <div className="max-w-lg w-full">
                <BookingWidget 
                  className="w-full text-white group text-lg px-7 py-4 bg-primary hover:bg-primary/90 shadow-glow animate-button-pop"
                >
                  <Calendar className="h-5 w-5 mr-2 animate-pulse-soft" />
                  <span className="whitespace-normal">{ctaText}</span>
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1 animate-pulse-soft" />
                </BookingWidget>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-background border-t border-foreground/10">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <img 
                  src="/lovable-uploads/65599be5-2766-4e8b-ad1f-126661cb6124.png" 
                  alt="GoFocus Logo" 
                  className="h-24 w-auto" 
                />
                <p className="text-sm text-foreground/70 mt-2">AI Agents for Lead Qualification & Booking</p>
              </div>
              
              <div className="text-sm text-foreground/70">
                <p className="text-center md:text-right">
                  <span className="border-r border-foreground/30 pr-2 mr-2">Privacy Policy</span>
                  <span className="border-r border-foreground/30 pr-2 mr-2">Terms of Service</span>
                  <span>
                    <a href="mailto:support@gofocus.ai">Contact</a>
                  </span>
                </p>
                <p className="mt-1 text-center md:text-right">
                  <a href="tel:+15145667802">(514) 566-7802</a>
                </p>
                <p className="mt-1">© {new Date().getFullYear()} Go Focus AI. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FunnelLayout;
