
import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, Calendar, Clock, Shield } from "lucide-react";
import BookingWidget from "../BookingWidget";
import { Script } from '../ui/script';
import NameCardTimeline from './NameCardTimeline';
import RealTimeResults from './RealTimeResults';

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
  ctaText: string;
  hasCountdown?: boolean;
  showSocialProof?: boolean;
  vslSection?: React.ReactNode;
}

const FunnelLayout: React.FC<FunnelLayoutProps> = ({
  niche,
  headline,
  subheadline,
  benefits,
  metrics,
  guaranteeText,
  urgencyText,
  ctaText,
  hasCountdown = false,
  vslSection
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
  
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    if (hasCountdown) {
      const interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev.seconds > 0) {
            return { ...prev, seconds: prev.seconds - 1 };
          } else if (prev.minutes > 0) {
            return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
          } else if (prev.hours > 0) {
            return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
          }
          return { hours: 23, minutes: 59, seconds: 59 }; // Reset to 24 hours
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [hasCountdown]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-viewport');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    document.querySelectorAll('.animate-entrance, .stagger-animation').forEach(el => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Meta pixel tracking code would go here
    console.log(`Funnel page loaded: ${niche}`);
  }, [niche]);

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

      {/* VSL Section - Placed at the top of the funnel */}
      {vslSection}
      
      {/* Name Card Timeline Section */}
      <NameCardTimeline />
      
      {/* CTA & Limited Time Offer Section */}
      <section className="pt-2 pb-8 bg-background">
        <div className="container-custom">
          <div className="max-w-xl mx-auto text-center">
            {urgencyText && (
              <div className="mb-4 animate-entrance">
                <div className="inline-block bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2">
                  <p className="text-lg font-semibold text-red-400 animate-pulse-soft">
                    {urgencyText}
                  </p>
                </div>
              </div>
            )}
            
            {hasCountdown && (
              <div className="mb-6 animate-entrance">
                <div className="flex justify-center gap-4">
                  <div className="bg-background/80 backdrop-blur-sm border border-foreground/20 rounded px-3 py-2 w-16">
                    <div className="text-xl font-bold">{String(timeRemaining.hours).padStart(2, '0')}</div>
                    <div className="text-xs text-foreground/70">Hours</div>
                  </div>
                  <div className="bg-background/80 backdrop-blur-sm border border-foreground/20 rounded px-3 py-2 w-16">
                    <div className="text-xl font-bold">{String(timeRemaining.minutes).padStart(2, '0')}</div>
                    <div className="text-xs text-foreground/70">Minutes</div>
                  </div>
                  <div className="bg-background/80 backdrop-blur-sm border border-foreground/20 rounded px-3 py-2 w-16">
                    <div className="text-xl font-bold">{String(timeRemaining.seconds).padStart(2, '0')}</div>
                    <div className="text-xs text-foreground/70">Seconds</div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="animate-entrance">
              <BookingWidget 
                className={`text-white group text-lg px-7 py-3 ${colorScheme.button} ${colorScheme.glow} animate-button-pop`}
              >
                <span className="whitespace-normal">{ctaText}</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 animate-pulse-soft" />
              </BookingWidget>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="py-12 bg-background/95">
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
                    <div className={`p-2 rounded-full bg-gradient-to-r ${colorScheme.accent} text-white mr-3 animate-pulse-soft`}>
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
      <RealTimeResults />

      <section id="guarantee" className="py-12 bg-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto glass-card p-8 rounded-lg animate-entrance">
            <div className="flex flex-col sm:flex-row items-center mb-4">
              <Shield className="h-12 w-12 text-primary mr-4 flex-shrink-0 animate-pulse-soft" />
              <h2 className="text-2xl font-bold text-center sm:text-left">Our Risk-Free Guarantee</h2>
            </div>
            <p className="text-lg mb-6 text-center sm:text-left">{guaranteeText}</p>
            <div className="text-center py-4 border-t border-b border-foreground/10">
              <p className="text-xl font-semibold">No long-term contracts. Cancel anytime.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="final-cta" className="py-12 bg-background/95">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center animate-entrance">
            <h2 className="text-3xl font-bold mb-6">Ready To Automate Your Lead Generation?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">Book your strategy call today and we'll show you exactly how our AI system will transform your business within the next 90 days.</p>
            
            <div className="flex flex-col items-center mb-8">
              <div className="max-w-lg w-full">
                <BookingWidget 
                  className={`w-full text-white group text-lg px-7 py-4 ${colorScheme.button} ${colorScheme.glow} animate-button-pop`}
                >
                  <Calendar className="h-5 w-5 mr-2 animate-pulse-soft" />
                  <span className="whitespace-normal">{ctaText}</span>
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1 animate-pulse-soft" />
                </BookingWidget>
              </div>
              
              {hasCountdown && (
                <div className="mt-6 flex items-center text-red-400">
                  <Clock className="h-4 w-4 mr-2 animate-pulse-soft" />
                  <span className="text-sm font-medium">Limited spots available - Don't miss out!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

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
