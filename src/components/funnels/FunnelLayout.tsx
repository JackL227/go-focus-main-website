
import React, { useEffect, useRef } from 'react';
import { ArrowRight, Check } from "lucide-react";
import BookingWidget from "../BookingWidget";

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
  
  // Intersection Observer for animations
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
    
    // Observe all elements with animation classes
    document.querySelectorAll('.animate-entrance, .stagger-animation').forEach(el => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    console.log(`Funnel page loaded: ${niche}`);
  }, [niche]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className={`w-full h-full bg-gradient-to-b ${colorScheme.gradient} opacity-10`}></div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/95 to-background z-[1]"></div>
        
        <div className="container-custom relative z-10 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12 rounded-xl overflow-hidden shadow-2xl animate-entrance transition-all duration-700">
              <div className="aspect-video bg-black/5 flex items-center justify-center">
                <p className="text-foreground/50">Video Coming Soon</p>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-entrance">
              {headline}
            </h1>
            
            <p className="text-xl text-foreground/90 mb-8 animate-entrance max-w-3xl mx-auto">
              {subheadline}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-entrance">
              <BookingWidget 
                className={`text-white group text-lg px-7 py-3 w-full sm:w-auto ${colorScheme.button} ${colorScheme.glow}`}
              >
                <span className="whitespace-normal">Book My Strategy Call Now</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 animate-pulse-soft" />
              </BookingWidget>
            </div>
          </div>
        </div>
      </section>

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

      <section id="testimonials" className="py-16 bg-background">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12 animate-entrance">What Our Clients Say</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="space-y-8 stagger-animation">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="glass-card p-6 rounded-lg">
                  <p className="text-lg mb-4 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-foreground/70">{testimonial.position}, {testimonial.company}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-6 stagger-animation">
              {metrics.map((metric, index) => (
                <div key={index} className="glass-card p-6 rounded-lg">
                  <h3 className="font-bold text-xl mb-2">{metric.title}</h3>
                  <p className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${colorScheme.accent} animate-pulse-soft`}>
                    {metric.value}
                  </p>
                  <p className="text-foreground/70 mt-2">{metric.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-16 bg-background/95">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12 animate-entrance">How It Works</h2>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 stagger-animation">
              <div className="glass-card p-6 rounded-lg text-center">
                <div className="h-16 w-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-gradient-to-r from-primary to-primary/70 text-white text-xl font-bold animate-pulse-soft">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3">We Build Your AI Agent</h3>
                <p>Trained on your exact offer, pricing, and messaging to represent your business perfectly.</p>
              </div>
              
              <div className="glass-card p-6 rounded-lg text-center">
                <div className="h-16 w-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-gradient-to-r from-primary to-primary/70 text-white text-xl font-bold animate-pulse-soft">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3">We Plug It Into Your Lead Funnel</h3>
                <p>Connect with DMs, forms, emails, and more - no lead falls through the cracks.</p>
              </div>
              
              <div className="glass-card p-6 rounded-lg text-center">
                <div className="h-16 w-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-gradient-to-r from-primary to-primary/70 text-white text-xl font-bold animate-pulse-soft">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3">You Get Booked Calls with Qualified Clients</h3>
                <p>Only speak with pre-vetted prospects ready to buy your services.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      <section id="cta" className="py-16 bg-background/95">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center animate-entrance">
            <h2 className="text-3xl font-bold mb-6">Let's Talk Strategy — Reserve Your Spot Below</h2>
            <p className="text-lg mb-8">We'll analyze your current funnel and show you exactly how our AI can transform your lead conversion.</p>
            
            <div className="max-w-lg mx-auto mb-8">
              <BookingWidget 
                className={`w-full text-white group text-lg px-7 py-4 ${colorScheme.button} ${colorScheme.glow}`}
              >
                <span className="whitespace-normal">Book My Strategy Call Now</span>
                <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1 animate-pulse-soft" />
              </BookingWidget>
            </div>
            
            {urgencyText && (
              <p className="text-red-500 font-semibold mt-6 animate-pulse-soft">{urgencyText}</p>
            )}
          </div>
        </div>
      </section>

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
