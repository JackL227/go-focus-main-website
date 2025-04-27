
import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, Calendar, Clock, Users, Award, Shield } from "lucide-react";
import BookingWidget from "../BookingWidget";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Script } from '../ui/script';

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
  testimonials,
  metrics,
  guaranteeText,
  urgencyText,
  ctaText,
  hasCountdown = false,
  showSocialProof = false,
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

  const [currentProofIndex, setCurrentProofIndex] = useState(0);
  const socialProofs = [
    { name: "Alex M.", action: "Booked a call", time: "2 minutes ago" },
    { name: "Sarah L.", action: "Signed up", time: "5 minutes ago" },
    { name: "John D.", action: "Booked a call", time: "12 minutes ago" },
    { name: "Emma W.", action: "Made a purchase", time: "18 minutes ago" },
    { name: "Robert K.", action: "Booked a call", time: "24 minutes ago" }
  ];

  useEffect(() => {
    if (showSocialProof) {
      const interval = setInterval(() => {
        setCurrentProofIndex(prev => (prev + 1) % socialProofs.length);
      }, 4000);
      
      return () => clearInterval(interval);
    }
  }, [showSocialProof]);
  
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
      
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className={`w-full h-full bg-gradient-to-b ${colorScheme.gradient} opacity-10`}></div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/95 to-background z-[1]"></div>
        
        <div className="container-custom relative z-10 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-entrance">
              {headline}
            </h1>
            
            <p className="text-xl text-foreground/90 mb-8 animate-entrance max-w-3xl mx-auto">
              {subheadline}
            </p>
            
            {showSocialProof && (
              <div className="mb-6 animate-entrance bg-background/60 backdrop-blur-sm border border-foreground/10 rounded-lg p-3 max-w-xs mx-auto">
                <p className="text-sm">
                  <span className="font-semibold">{socialProofs[currentProofIndex].name}</span>
                  <span className="mx-1">{socialProofs[currentProofIndex].action}</span>
                  <span className="text-foreground/60 text-xs">{socialProofs[currentProofIndex].time}</span>
                </p>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-entrance">
              <BookingWidget 
                className={`text-white group text-lg px-7 py-3 w-full sm:w-auto ${colorScheme.button} ${colorScheme.glow} animate-button-pop`}
              >
                <span className="whitespace-normal">{ctaText}</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 animate-pulse-soft" />
              </BookingWidget>
            </div>
            
            {hasCountdown && (
              <div className="mt-8 animate-entrance">
                <p className="text-sm text-foreground/70 mb-2">Limited Time Offer Ends In:</p>
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
          </div>
        </div>
      </section>

      <section id="benefits" className="py-16 bg-background/95">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 animate-entrance">What You Get</h2>
            
            <div className="grid md:grid-cols-2 gap-8 stagger-animation">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="glass-card p-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
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

            {/* Mid-page CTA */}
            <div className="mt-12 text-center">
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

      <section id="how-it-works" className="py-16 bg-background">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12 animate-entrance">How It Works</h2>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 stagger-animation">
              <div className="glass-card p-6 rounded-lg text-center transition-all duration-300 hover:scale-105">
                <div className="h-16 w-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-gradient-to-r from-primary to-primary/70 text-white text-xl font-bold animate-pulse-soft">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3">We Build Your AI Agent</h3>
                <p>Trained on your exact offer, pricing, and messaging to represent your business perfectly.</p>
              </div>
              
              <div className="glass-card p-6 rounded-lg text-center transition-all duration-300 hover:scale-105">
                <div className="h-16 w-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-gradient-to-r from-primary to-primary/70 text-white text-xl font-bold animate-pulse-soft">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3">We Connect To Your Lead Flow</h3>
                <p>Seamlessly integrates with all channels - DMs, forms, emails, and website chat.</p>
              </div>
              
              <div className="glass-card p-6 rounded-lg text-center transition-all duration-300 hover:scale-105">
                <div className="h-16 w-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-gradient-to-r from-primary to-primary/70 text-white text-xl font-bold animate-pulse-soft">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3">You Get Pre-Qualified Meetings</h3>
                <p>Only speak with vetted prospects who match your ideal client profile and are ready to buy.</p>
              </div>
            </div>
            
            {/* Mid-page CTA */}
            <div className="mt-12 text-center">
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

      <section id="testimonials" className="py-16 bg-background/95">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12 animate-entrance">Results & Feedback</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="space-y-8 stagger-animation">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Users className="mr-2 h-6 w-6 text-primary" />
                What Our Clients Say
              </h3>
              
              <Carousel className="w-full">
                <CarouselContent>
                  {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index}>
                      <div className="glass-card p-6 rounded-lg h-full">
                        <p className="text-lg mb-4 italic">"{testimonial.quote}"</p>
                        <div>
                          <p className="font-semibold">{testimonial.author}</p>
                          <p className="text-sm text-foreground/70">{testimonial.position}, {testimonial.company}</p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
            
            <div className="space-y-6 stagger-animation">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Award className="mr-2 h-6 w-6 text-primary" />
                Real Results
              </h3>
              
              {metrics.map((metric, index) => (
                <div key={index} className="glass-card p-6 rounded-lg transition-all duration-300 hover:scale-105">
                  <h3 className="font-bold text-xl mb-2">{metric.title}</h3>
                  <p className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${colorScheme.accent} animate-pulse-soft`}>
                    {metric.value}
                  </p>
                  <p className="text-foreground/70 mt-2">{metric.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mid-page CTA */}
          <div className="mt-12 text-center">
            <BookingWidget 
              className={`text-white group text-lg px-7 py-3 ${colorScheme.button} ${colorScheme.glow} animate-button-pop`}
            >
              <span className="whitespace-normal">{ctaText}</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 animate-pulse-soft" />
            </BookingWidget>
          </div>
        </div>
      </section>

      <section id="guarantee" className="py-16 bg-background">
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
            {urgencyText && (
              <div className="mt-6 text-center">
                <div className="inline-block bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2">
                  <p className="text-lg font-semibold text-red-400 animate-pulse-soft">{urgencyText}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="cta" className="py-16 bg-background/95">
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
