
import React from 'react';
import { ArrowRight, Calendar } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background text-foreground">
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
      <section className="pt-8 pb-4 bg-background/95">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-4xl mx-auto text-center mb-6 animate-entrance">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              {headline}
            </h1>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              {subheadline}
            </p>
          </div>
          {vslSection}
        </div>
      </section>
      
      {/* Name Card Timeline */}
      <NameCardTimeline />
      
      {/* CTA & Limited Time Offer Section */}
      <section className="py-6 bg-background/95">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="max-w-xl mx-auto text-center space-y-6">
            <div className="animate-entrance bg-primary/10 border border-primary/30 rounded-lg px-6 py-4">
              <h3 className="text-2xl font-bold text-primary mb-2 animate-pulse-soft">
                🚀 Only 8 New Clients Accepted Monthly
              </h3>
              <p className="text-lg text-primary/90">
                6 out of 8 Spots Already Filled!
              </p>
            </div>
            
            <div className="animate-entrance">
              <BookingWidget 
                className="w-full md:w-auto text-white group text-lg px-8 py-4 bg-primary hover:bg-primary/90 shadow-glow animate-button-pop"
              >
                <Calendar className="h-5 w-5 mr-2 animate-pulse-soft" />
                <span className="whitespace-normal">{ctaText}</span>
                <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
              </BookingWidget>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-8 bg-background/90">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 animate-entrance">
              What You Get
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4 stagger-animation">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="glass-card p-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl bg-background/50 border border-foreground/10"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
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
      <section className="py-8 bg-background/95">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="glass-card p-6 rounded-lg animate-entrance bg-background/50 border border-foreground/10">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="h-12 w-12 text-primary flex-shrink-0 animate-pulse-soft">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Our Risk-Free Guarantee</h2>
                <p className="text-lg text-foreground/80">{guaranteeText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 bg-background/90">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center animate-entrance">
            <h2 className="text-3xl font-bold mb-6">Ready To Automate Your Lead Generation?</h2>
            <BookingWidget 
              className="text-white group text-lg px-8 py-4 bg-primary hover:bg-primary/90 shadow-glow animate-button-pop"
            >
              <Calendar className="h-5 w-5 mr-2 animate-pulse-soft" />
              <span className="whitespace-normal">{ctaText}</span>
              <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
            </BookingWidget>
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
